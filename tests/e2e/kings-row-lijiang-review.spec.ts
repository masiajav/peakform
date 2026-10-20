import { expect, test } from '@playwright/test'
import { getMapPillar } from '../../src/lib/overwatch-maps'

for (const slug of ['kings-row', 'lijiang-tower']) {
  test(`${slug} renders its own route, FAQ, dates and metadata without advertising`, async ({ page, request }) => {
    const map = getMapPillar(slug)!
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    const response = await page.goto(`/maps/${slug}`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(map.name)
    await expect(page).toHaveTitle(`${map.seoTitle} - Replaid Lab`)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', map.seoDescription)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com/maps/${slug}`)
    const robots = await page.locator('meta[name="robots"],meta[name="googlebot"]').evaluateAll(tags => tags.map(tag => tag.getAttribute('content') || '').join(','))
    expect(`${robots},${response?.headers()['x-robots-tag'] || ''}`).not.toMatch(/\b(?:noindex|nofollow|none)\b/i)
    await expect(page.locator('main time')).toHaveAttribute('datetime', '2026-10-19')
    for (const phase of map.phases) await expect(page.getByRole('heading', { name: phase.name, exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Para tu próxima partida', exact: true })).toBeVisible()
    await expect(page.locator('main')).toContainText(map.conclusion!)
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(value => JSON.parse(value))
    expect(schemas.find(item => item['@type'] === 'Article')).toMatchObject({ dateModified: '2026-10-19', author: { name: 'Replaid Lab' } })
    expect(schemas.find(item => item['@type'] === 'Article')).not.toHaveProperty('datePublished')
    const faq = schemas.find(item => item['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(5)
    for (const item of faq.mainEntity) {
      await expect(page.getByRole('heading', { name: item.name, exact: true })).toBeVisible()
      await expect(page.getByText(item.acceptedAnswer.text, { exact: true })).toBeVisible()
    }
    for (const image of await page.locator('main img').all()) await image.evaluate(element => (element as HTMLImageElement).decode())
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    expect(await page.locator('body').evaluate(element => getComputedStyle(element).backgroundColor)).toBe('rgb(10, 10, 10)')
    await expect(page.locator('ins.adsbygoogle,.ad-slot,script[src*="adsbygoogle"]')).toHaveCount(0)
    const xml = await (await request.get('/sitemap.xml')).text()
    expect(xml).toMatch(new RegExp(`/maps/${slug}</loc>\\s*<lastmod>2026-10-19T00:00:00\\.000Z</lastmod>`))
    expect(errors).toEqual([])
  })

  test(`${slug} connects the actual team example and free VOD notebook`, async ({ page }) => {
    await page.goto(`/maps/${slug}`)
    await page.locator('main a[href="/team-comps/reinhardt"]').click()
    await expect(page).toHaveURL(/\/team-comps\/reinhardt$/)
    await page.goBack()
    await page.locator('main a[href="/guides/review-vod-overwatch-espanol#cuaderno-vod"]').click()
    await expect(page.getByRole('region', { name: 'Cuaderno de revisión', exact: true })).toBeVisible()
  })
}
