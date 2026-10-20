import { expect, test } from '@playwright/test'

for (const slug of ['hola-1fed9fa4', 'nueva-navegacion-y-herramientas-para-mejorar-en-overwatch', 'vacaciones-merecidas']) {
  test(`${slug} remains readable on the legacy schema without approving indexing or ads`, async ({ page, request }) => {
    const response = await page.goto(`/news/${slug}`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com/news/${slug}`)
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(value => JSON.parse(value))
    const article = schemas.find(item => item['@type'] === 'NewsArticle')
    expect(article.headline).toBe(await page.locator('h1').innerText())
    expect(article.dateModified).toBeTruthy()
    await expect(page.locator('.ad-slot,ins.adsbygoogle,script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    expect((await (await request.get('/sitemap.xml')).text())).not.toContain(`/news/${slug}</loc>`)
  })
}

test('map hub describes its actual guide inventory and keeps article navigation working', async ({ page }) => {
  await page.goto('/maps')
  await expect(page.getByRole('heading', { name: 'Guías por modo de juego', exact: true })).toBeVisible()
  await expect(page.locator('main')).not.toContainText('CATÁLOGO COMPLETO')
  await expect(page.locator('main')).toContainText('30 guías disponibles')
  await expect(page.locator('.maps-hub-grid > a')).toHaveCount(30)
  await page.locator('.maps-hub-grid a[href="/maps/kings-row"]').click()
  await expect(page.locator('h1')).toHaveText("King's Row")
})
