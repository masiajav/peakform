import { expect, test } from '@playwright/test'
import { evergreenGuides } from '../../src/lib/evergreen-guides'

const oldPath = '/guides/como-mejorar-en-overwatch-revisando-vod'
const target = '/guides/review-vod-overwatch-espanol'
const article = evergreenGuides['review-vod-overwatch-espanol']

test('old VOD links use one permanent redirect and preserve query and notebook fragment', async ({ page, request }) => {
  const redirect = await request.get(`${oldPath}?from=old-link`, { maxRedirects: 0 })
  expect(redirect.status()).toBe(308)
  const location = new URL(redirect.headers().location, 'http://127.0.0.1:3011')
  expect(location.pathname).toBe(target)
  expect(location.search).toBe('?from=old-link')
  const response = await page.goto(`${oldPath}?from=old-link#cuaderno-vod`)
  expect(response?.status()).toBe(200)
  await expect(page).toHaveURL(`${target}?from=old-link#cuaderno-vod`)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('h1')).toHaveText(article.h1)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com${target}`)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
  await expect(page.getByRole('region', { name: 'Cuaderno de revisión', exact: true })).toBeVisible()
  await expect(page.locator('main').getByRole('heading', { name: /^(CTA|Enlaces internos)$/i })).toHaveCount(0)
  await expect(page.locator('.ad-slot,ins.adsbygoogle,script[src*="adsbygoogle"]')).toHaveCount(0)
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(text => JSON.parse(text))
  expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'BlogPosting', datePublished: article.publishedAtIso, dateModified: article.modifiedAtIso }))
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).not.toContain(`${oldPath}</loc>`)
  expect(sitemap.match(new RegExp(`${target}</loc>`, 'g'))).toHaveLength(1)
  await page.screenshot({ path: `reports/vod-consolidation/redirect-${test.info().project.name}.png`, fullPage: true })
})

test('VOD search has a usable canonical card, no old card, and still respects a hero filter', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('/guides?q=VOD')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/guides')
  await expect(page.locator(`main a[href="${oldPath}"]`)).toHaveCount(0)
  const card = page.locator(`main a[href="${target}"]`)
  await expect(card).toHaveCount(1)
  await expect(card).toContainText(article.seoDescription)
  const collections = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(text => JSON.parse(text))
  const items = collections.find(item => item['@type'] === 'CollectionPage').mainEntity.itemListElement
  expect(items.filter((item: { url: string }) => item.url.endsWith(target))).toHaveLength(1)
  expect(items.some((item: { url: string }) => item.url.endsWith(oldPath))).toBe(false)
  await card.click()
  await expect(page).toHaveURL(target)
  await expect(page.locator('h1')).toHaveText(article.h1)
  await expect(page.getByRole('region', { name: 'Cuaderno de revisión', exact: true })).toBeVisible()
  await page.goto('/guides?q=VOD&sort=title')
  const titles = await page.locator('main a:has(article) h2').allTextContents()
  expect(titles.length).toBeGreaterThan(0)
  expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b, 'es')))
  await page.goto('/guides?q=VOD&category=Revisi%C3%B3n+de+VOD')
  await expect(page.locator(`main a[href="${target}"]`)).toHaveCount(1)
  await page.goto('/guides?q=VOD&category=Composiciones')
  await expect(page.locator(`main a[href="${target}"]`)).toHaveCount(0)
  await page.goto('/guides?q=VOD&hero=ana')
  await expect(page.locator(`main a[href="${target}"]`)).toHaveCount(0)
  expect(errors).toEqual([])
})
