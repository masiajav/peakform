import { expect, test } from '@playwright/test'

const beginner = '/deadlock/guides/como-jugar-deadlock'

test('Deadlock guides follow a beginner route and the landing never advertises an unpublished draft', async ({ page }) => {
  await page.goto('/deadlock/guides', { waitUntil: 'networkidle' })
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/deadlock/guides')
  const cards = page.locator('main .game-content-card')
  const visible = await cards.evaluateAll(links => links.map(link => link.getAttribute('href')))
  const expected = [beginner, ...['elegir-heroe', 'fase-de-lineas', 'economia-almas', 'movimiento-aguante'].map(slug => `/deadlock/guides/${slug}`)].filter(path => visible.includes(path))
  expect(visible.slice(0, expected.length)).toEqual(expected)
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(text => JSON.parse(text))
  const collection = schemas.find(schema => schema['@type'] === 'CollectionPage')
  expect(collection.mainEntity.itemListElement.map((item: { url: string }) => new URL(item.url).pathname)).toEqual(visible)

  await page.goto('/deadlock', { waitUntil: 'networkidle' })
  await expect(page.getByRole('link', { name: 'Soy nuevo' })).toHaveAttribute('href', visible.includes(beginner) ? beginner : '/deadlock/guides')
  await expect(page.getByRole('link', { name: 'Todos los parches' })).toHaveAttribute('href', '/deadlock/patch-notes')
  await expect(page.getByRole('link', { name: 'Todas las noticias' })).toHaveAttribute('href', '/deadlock/news')
  if (!visible.includes(beginner)) await expect(page.locator(`main a[href="${beginner}"]`)).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
})

test('Deadlock guide filters preserve noindex and the clean canonical', async ({ page }) => {
  await page.goto('/deadlock/guides?q=almas', { waitUntil: 'networkidle' })
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex, follow/)
  await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute('content', /noindex, follow/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/deadlock/guides')
  await expect(page.locator('main .game-content-card')).not.toHaveCount(0)
})
