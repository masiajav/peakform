import { expect, test } from '@playwright/test'
import { getTeamCompPillar } from '../../src/lib/seo-clusters'

for (const slug of ['domina', 'jetpack-cat', 'wuyang']) {
  test(`${slug} composition offers the short answer, real revision, matching FAQ and no ads`, async ({ page, request }) => {
    const article = getTeamCompPillar(slug)!
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    expect((await page.goto(`/team-comps/${slug}`))?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(article.h1)
    await expect(page.locator('main header .seo-pillar-intro')).toHaveText(article.quickAnswer!)
    await expect(page.getByRole('heading', { name: `Cómo acompañar a ${article.name}`, exact: true })).toBeVisible()
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com/team-comps/${slug}`)
    await expect(page.locator('main time')).toHaveAttribute('datetime', '2026-10-19')
    await expect(page.locator('main')).toContainText(article.conclusion!)
    const review = page.locator('main section').filter({ has: page.getByRole('heading', { name: 'Qué mirar en tu repetición', exact: true }) })
    await expect(review.locator('li')).toHaveCount(5)
    for (const question of article.vodQuestions!) await expect(review).toContainText(question)
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(value => JSON.parse(value))
    expect(schemas.find(item => item['@type'] === 'Article')).toMatchObject({ dateModified: '2026-10-19', author: { name: 'Replaid Lab' } })
    expect(schemas.find(item => item['@type'] === 'Article')).not.toHaveProperty('datePublished')
    const faq = schemas.find(item => item['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(5)
    for (const item of faq.mainEntity) {
      const detail = page.locator('main details').filter({ hasText: item.name })
      await detail.locator('summary').click()
      await expect(detail.locator('p')).toHaveText(item.acceptedAnswer.text)
    }
    for (const image of await page.locator('main img').all()) await image.evaluate(element => (element as HTMLImageElement).decode())
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    await expect(page.locator('.ad-slot,ins.adsbygoogle,script[src*="adsbygoogle"]')).toHaveCount(0)
    const sitemap = await (await request.get('/sitemap.xml')).text()
    expect(sitemap).toMatch(new RegExp(`/team-comps/${slug}</loc>\\s*<lastmod>2026-10-19T00:00:00\\.000Z</lastmod>`))
    expect(errors).toEqual([])
  })

  test(`${slug} composition reaches its counter, map and free review notebook`, async ({ page }) => {
    const article = getTeamCompPillar(slug)!
    await page.goto(`/team-comps/${slug}`)
    await page.locator(`main a[href="/counters/${slug}"]`).click()
    await expect(page).toHaveURL(new RegExp(`/counters/${slug}$`))
    await page.goBack()
    const map = article.links.find(item => item.href.startsWith('/maps/'))!
    await page.locator(`main a[href="${map.href}"]`).click()
    await expect(page).toHaveURL(new RegExp(map.href + '$'))
    await page.goBack()
    await page.locator('main a[href="/guides/review-vod-overwatch-espanol#cuaderno-vod"]').click()
    await expect(page.getByRole('region', { name: 'Cuaderno de revisión', exact: true })).toBeVisible()
  })
}
