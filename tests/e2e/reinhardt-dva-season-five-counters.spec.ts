import { expect, test } from '@playwright/test'

for (const [slug, terms] of [
  ['reinhardt', ['Crusader’s Resolve', 'Crusader’s Fire', 'Shield Slam', 'Ignited Fury', 'puede cancelar Charge', 'Control Center', 'Circuit Royal']],
  ['dva', ['Bunny Power', 'Extended Boosters', 'Shield System', 'Precision Fusion', 'No ves el medidor', 'sin esperar a que termine Matriz', 'Hollywood', 'Midtown', 'En 6v6']],
] as const) {
  test(`${slug} renders specific Season 5 counter decisions and matching FAQs`, async ({ page, request }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    expect((await page.goto('/counters/' + slug))?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/counters/' + slug)
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(value => JSON.parse(value))
    const article = schemas.find(item => item['@type'] === 'Article')
    expect(article).toMatchObject({ dateModified: '2026-10-12', author: { name: 'Replaid Lab' } })
    expect(article.datePublished).toBeUndefined()
    expect(article.description).toBe(await page.locator('meta[name="description"]').getAttribute('content'))
    const faq = schemas.find(item => item['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(5)
    for (const item of faq.mainEntity) {
      const detail = page.locator('main details').filter({ hasText: item.name })
      await detail.locator('summary').click()
      await expect(detail.locator('p')).toHaveText(item.acceptedAnswer.text)
    }
    const text = await page.locator('main').innerText()
    for (const term of ['12 de octubre de 2026', 'Season 5', ...terms]) expect(text).toContain(term)
    expect(text).not.toMatch(/Season 3|TITLE SEO|META DESCRIPTION|KEYWORDS PRINCIPALES|Ã|â€|ï¿½/)
    await expect(page.locator('.seo-threat-card')).toHaveCount(6)
    await expect(page.locator('.seo-pillar-steps li')).toHaveCount(5)
    for (const image of await page.locator('main img').all()) await image.evaluate(element => (element as HTMLImageElement).decode())
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(10, 10, 10)')
    await expect(page.locator('.ad-slot,ins.adsbygoogle,script[src*="adsbygoogle"]')).toHaveCount(0)
    const xml = await (await request.get('/sitemap.xml')).text()
    expect(xml).toMatch(new RegExp(`/counters/${slug}</loc>\\s*<lastmod>2026-10-12T00:00:00\\.000Z</lastmod>`))
    expect(errors).toEqual([])
  })

  test(`${slug} connects hero, counter, composition and its named map example`, async ({ page }) => {
    await page.goto('/heroes/' + slug)
    await page.locator(`main a[href="/counters/${slug}"]`).first().click()
    await expect(page).toHaveURL(new RegExp(`/counters/${slug}$`))
    await page.locator(`main a[href="/team-comps/${slug}"]`).click()
    await expect(page).toHaveURL(new RegExp(`/team-comps/${slug}$`))
    await page.goBack()
    const href = slug === 'reinhardt' ? '/maps/lijiang-tower' : '/maps/hollywood'
    await page.locator(`main a[href="${href}"]`).click()
    await expect(page).toHaveURL(new RegExp(href + '$'))
    await expect(page.locator('h1')).toHaveCount(1)
  })
}
