import { expect, test } from '@playwright/test'

for (const route of ['/counters/shion', '/team-comps/shion']) {
  test(`${route} renders the released perks, matching FAQs and replay review`, async ({ page, request }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    expect((await page.goto(route))?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com${route}`)
    await expect(page.locator('main')).toContainText('Survival Instinct')
    await expect(page.locator('main')).toContainText('Sombra Support')
    await expect(page.locator('main')).not.toContainText('kit de DPS anterior')
    const counter = route.startsWith('/counters/')
    const vodHeading = 'Qué mirar en tu repetición'
    const vod = page.locator('main section').filter({ has: page.getByRole('heading', { name: vodHeading, exact: true }) })
    await expect(vod.locator('ol li')).toHaveCount(5)
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(value => JSON.parse(value))
    const article = schemas.find(item => item['@type'] === 'Article')
    expect(article.dateModified).toBe('2026-10-11')
    expect(article.datePublished).toBe(counter ? '2026-06-28' : undefined)
    expect(article.author.name).toBe('Replaid Lab')
    const faq = schemas.find(item => item['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(5)
    for (const item of faq.mainEntity) {
      const detail = page.locator('main details').filter({ hasText: item.name })
      await detail.locator('summary').click()
      await expect(detail.locator('p')).toHaveText(item.acceptedAnswer.text)
    }
    const text = await page.locator('main').innerText()
    expect(text).toContain('Rapid Reload se retiró el 6 de octubre')
    expect(text).not.toMatch(/TITLE SEO|META DESCRIPTION|KEYWORDS PRINCIPALES|Ã|â€|ï¿½/)
    if (counter) {
      await expect(page.locator('.seo-threat-card')).toHaveCount(6)
      expect(text).toContain('no las curas que recibe')
    } else {
      await expect(page.locator('.seo-composition-card')).toHaveCount(3)
      expect(text).toContain('solo corresponde a cola por roles 6v6, no a 5v5')
      expect(text).toContain('no haces ni melee')
      expect(text).toContain('pierdes Suzu')
    }
    const sitemap = await (await request.get('/sitemap.xml')).text()
    expect(sitemap).toMatch(new RegExp(`${route}</loc>\\s*<lastmod>2026-10-11T00:00:00\\.000Z</lastmod>`))
    await expect(page.locator('.ad-slot, ins.adsbygoogle, script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(10, 10, 10)')
    expect(errors).toEqual([])
  })
}

test('Shion navigation connects hero, counter, composition and the current Sombra response', async ({ page }) => {
  await page.goto('/heroes/shion')
  await page.locator('main a[href="/counters/shion"]').first().click()
  await expect(page).toHaveURL(/\/counters\/shion$/)
  await page.getByRole('link', { name: 'Composiciones con Shion', exact: true }).click()
  await expect(page).toHaveURL(/\/team-comps\/shion$/)
  await page.getByRole('link', { name: 'Sombra Support: curación y Weaken', exact: true }).click()
  await expect(page).toHaveURL(/\/counters\/sombra$/)
  await expect(page.locator('main')).toContainText('Cyberspace')
})
