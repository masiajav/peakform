import { expect, test } from '@playwright/test'
import { getMapPillar } from '../../src/lib/overwatch-maps'

for (const slug of ['dorado', 'blizzard-world', 'nepal']) {
  test(`${slug} shows the complete individual revision with matching metadata and no ads`, async ({ page, request }) => {
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
    await expect(page.locator('main time')).toHaveAttribute('datetime', '2026-10-20')
    for (const paragraph of map.intro) await expect(page.locator('main')).toContainText(paragraph)
    for (const phase of map.phases) {
      const section = page.locator('.map-phase').filter({ has: page.getByRole('heading', { name: phase.name, exact: true }) })
      for (const text of [phase.attack, phase.defense, phase.vodReview]) await expect(section).toContainText(text)
    }
    await expect(page.locator('main')).toContainText(map.conclusion!)
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(value => JSON.parse(value))
    const article = schemas.find(item => item['@type'] === 'Article')
    expect(article).toMatchObject({ dateModified: '2026-10-20', author: { name: 'Replaid Lab' } })
    expect(article).not.toHaveProperty('datePublished')
    expect(schemas.find(item => item['@type'] === 'WebPage').dateModified).toBe('2026-10-20')
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
    expect(await page.locator('main').innerText()).not.toMatch(/TITLE SEO|META DESCRIPTION|KEYWORDS PRINCIPALES|minimapa mental|Haz una pregunta|sobre el carga/)
    const xml = await (await request.get('/sitemap.xml')).text()
    expect(xml).toMatch(new RegExp(`/maps/${slug}</loc>\\s*<lastmod>2026-10-20T00:00:00\\.000Z</lastmod>`))
    expect(errors).toEqual([])
  })

  test(`${slug} connects a team example and the free VOD notebook without changing notes`, async ({ page }) => {
    await page.goto(`/maps/${slug}`)
    const hero = slug === 'dorado' ? 'winston' : 'reinhardt'
    await page.locator(`main a[href="/team-comps/${hero}"]`).click()
    await expect(page).toHaveURL(new RegExp(`/team-comps/${hero}$`))
    await page.goBack()
    await page.locator('main a[href="/guides/review-vod-overwatch-espanol#cuaderno-vod"]').click()
    await expect(page.getByRole('region', { name: 'Cuaderno de revisión', exact: true })).toBeVisible()
  })
}
