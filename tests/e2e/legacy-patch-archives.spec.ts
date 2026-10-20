import { expect, test } from '@playwright/test'

const archives = [
  { day: '01', answer: 'Underwatch', details: 'no eran cambios del competitivo' },
  { day: '14', answer: 'Season 2: Cúspide', details: 'Ramattra se incorporó a Estadio' },
  { day: '17', answer: 'Sierra', details: 'no equivale automáticamente a tardar un 30 % más' },
  { day: '23', answer: 'Roadhog, Sombra y Vendetta', details: 'Sombra todavía era DPS' },
  { day: '28', answer: 'actualización de corrección de errores', details: 'evento terminó el 11 de mayo' },
]

for (const archive of archives) {
  test(`April ${archive.day} explains the actual historic update, without ads or indexing`, async ({ page, request }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    const path = `/patch-notes/notas-parche-overwatch-2026-04-${archive.day}`
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('.guide-body')).toContainText(archive.answer)
    await expect(page.locator('.guide-body')).toContainText(archive.details)
    await expect(page.locator('.guide-body')).not.toContainText('En Replaid Lab la guardamos')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com${path}`)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
    await expect(page.locator('.announcement-meta')).toContainText('Revisado el 19 de octubre de 2026')
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(value => JSON.parse(value))
    const article = schemas.find(item => item['@type'] === 'Article')
    expect(article.headline).toBe(await page.locator('h1').innerText())
    expect(article.datePublished.slice(0, 10)).toBe(`2026-04-${archive.day}`)
    expect(article.dateModified).toBe('2026-10-19T19:17:28.000Z')
    await expect(page.locator('.guide-body a[href="https://overwatch.blizzard.com/es-es/news/patch-notes/live/2026/04/"]')).toHaveCount(1)
    for (const href of await page.locator('.guide-body a[href^="/"]').evaluateAll(elements => elements.map(element => element.getAttribute('href')!))) {
      expect((await request.get(href)).status(), href).toBe(200)
    }
    await expect(page.locator('.ad-slot,ins.adsbygoogle,script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    expect((await (await request.get('/sitemap.xml')).text())).not.toContain(`${path}</loc>`)
    expect(errors).toEqual([])
  })
}

test('patch hub lists real summaries from the legacy backend and opens the intended article', async ({ page }) => {
  expect((await page.goto('/patch-notes'))?.status()).toBe(200)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('main article')).toHaveCount(5)
  await expect(page.locator('main')).not.toContainText('sincronización automática')
  await expect(page.locator('main article').first()).toContainText('28 de abril de 2026')
  await page.getByRole('link').filter({hasText: 'Underwatch no era un parche de ranked'}).click()
  await expect(page.locator('.guide-body')).toContainText('ventajas estaban desactivadas')
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
})
