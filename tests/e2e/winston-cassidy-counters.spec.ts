import { expect, test } from '@playwright/test'

for (const [slug, terms, mapPath] of [
  ['winston', ['Electric Charge', 'Heavy Landing', 'Chain Lightning', 'Revitalizing Barrier', 'Matriz no bloquea el disparo principal', 'puede conservar Jump Pack'], '/maps/watchpoint-gibraltar'],
  ['cassidy', ['Sharpshooter', 'Bang Bang', 'Giddy Up', 'Rollin’ Round-Up', 'Silver Bullet', 'Hinder', 'sin dar invulnerabilidad'], '/maps/circuit-royal'],
] as const) {
  test(`${slug} counter keeps the reviewed kit, matching visible FAQ and individual index approval`, async ({ page, request }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    expect((await page.goto(`/counters/${slug}`))?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com/counters/${slug}`)
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(value => JSON.parse(value))
    const article = schemas.find(item => item['@type'] === 'Article')
    expect(article).toMatchObject({ dateModified: '2026-10-17', author: { name: 'Replaid Lab' } })
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
    for (const term of ['17 de octubre de 2026', 'Season 5', ...terms]) expect(text).toContain(term)
    expect(text).not.toMatch(/Season 3|TITLE SEO|META DESCRIPTION|KEYWORDS PRINCIPALES|Ã|â€|ï¿½/)
    await expect(page.locator('.seo-threat-card')).toHaveCount(6)
    await expect(page.locator('.seo-pillar-steps li')).toHaveCount(5)
    for (const image of await page.locator('main img').all()) await image.evaluate(element => (element as HTMLImageElement).decode())
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    await expect(page.locator('ins.adsbygoogle,.ad-slot,script[src*="adsbygoogle"]')).toHaveCount(0)
    const xml = await (await request.get('/sitemap.xml')).text()
    expect(xml).toMatch(new RegExp(`/counters/${slug}</loc>\\s*<lastmod>2026-10-17T00:00:00\\.000Z</lastmod>`))
    expect(errors).toEqual([])
  })
  test(`${slug} connects hero, counter, composition, map and VOD notebook`, async ({ page }) => {
    await page.goto(`/heroes/${slug}`)
    await page.locator(`main a[href="/counters/${slug}"]`).first().click()
    await expect(page).toHaveURL(new RegExp(`/counters/${slug}$`))
    await page.locator(`main a[href="/team-comps/${slug}"]`).click()
    await expect(page).toHaveURL(new RegExp(`/team-comps/${slug}$`))
    await page.goBack()
    await page.locator(`main a[href="${mapPath}"]`).click()
    await expect(page).toHaveURL(new RegExp(mapPath + '$'))
    await page.goBack()
    await page.locator('main a[href="/guides/review-vod-overwatch-espanol#cuaderno-vod"]').click()
    await expect(page).toHaveURL(/\/guides\/review-vod-overwatch-espanol#cuaderno-vod$/)
    await expect(page.getByRole('region', { name: 'Cuaderno de revisión', exact: true })).toBeVisible()
  })
}
