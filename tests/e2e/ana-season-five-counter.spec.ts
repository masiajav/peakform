import { expect, test } from '@playwright/test'

test('Ana counter renders Season 5 decisions with matching visible FAQs and metadata', async ({ page, request }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  expect((await page.goto('/counters/ana'))?.status()).toBe(200)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/counters/ana')
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(value => JSON.parse(value))
  const article = schemas.find(item => item['@type'] === 'Article')
  expect(article).toMatchObject({ dateModified: '2026-10-12', datePublished: '2026-06-28', author: { name: 'Replaid Lab' } })
  expect(article.description).toBe(await page.locator('meta[name="description"]').getAttribute('content'))
  const faq = schemas.find(item => item['@type'] === 'FAQPage')
  expect(faq.mainEntity).toHaveLength(5)
  for (const item of faq.mainEntity) {
    const detail = page.locator('main details').filter({ hasText: item.name })
    await detail.locator('summary').click()
    await expect(detail.locator('p')).toHaveText(item.acceptedAnswer.text)
  }
  const text = await page.locator('main').innerText()
  for (const expected of ['Local Anesthetic', 'Speed Serum', 'Biotic Bounce', 'Headhunter', 'Weaken', 'No impide que reciba curación', 'Gibraltar', 'King’s Row', 'Esperança']) expect(text).toContain(expected)
  expect(text).not.toMatch(/Season 3|primer hack|TITLE SEO|META DESCRIPTION|KEYWORDS PRINCIPALES|Ã|â€|ï¿½/)
  await expect(page.locator('.seo-threat-card')).toHaveCount(6)
  await expect(page.locator('.seo-pillar-steps li')).toHaveCount(5)
  for (const img of await page.locator('main img').all()) { await img.evaluate(el => (el as HTMLImageElement).decode()) }
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(10, 10, 10)')
  await expect(page.locator('.ad-slot,ins.adsbygoogle,script[src*="adsbygoogle"]')).toHaveCount(0)
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).toMatch(/\/counters\/ana<\/loc>\s*<lastmod>2026-10-12T00:00:00\.000Z<\/lastmod>/)
  expect(errors).toEqual([])
})

test('Ana navigation connects the hero to counters, compositions and current Sombra', async ({ page }) => {
  await page.goto('/heroes/ana')
  await page.locator('main a[href="/counters/ana"]').first().click()
  await expect(page).toHaveURL(/\/counters\/ana$/)
  await page.getByRole('link', { name: 'Composiciones con Ana', exact: true }).click()
  await expect(page).toHaveURL(/\/team-comps\/ana$/)
  await page.goBack()
  await page.getByRole('link', { name: 'Cómo funciona Sombra Support', exact: true }).click()
  await expect(page).toHaveURL(/\/counters\/sombra$/)
  await expect(page.locator('main')).toContainText('Cyberspace')
})
