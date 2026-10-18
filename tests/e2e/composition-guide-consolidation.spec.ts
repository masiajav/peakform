import { expect, test } from '@playwright/test'
import { evergreenGuides } from '../../src/lib/evergreen-guides'
import { getRankedHeroGuide } from '../../src/lib/ranked-hero-guides'

const oldPath = '/guides/como-elegir-composicion-dive-poke-brawl'
const target = '/guides/composiciones-overwatch-5v5-6v6'
const article = evergreenGuides['composiciones-overwatch-5v5-6v6']

test('the old composition URL leads directly to the current roles and useful team examples', async ({ page, request }) => {
  const redirect = await request.get(oldPath, { maxRedirects: 0 })
  expect(redirect.status()).toBe(308)
  expect(new URL(redirect.headers().location, 'http://127.0.0.1:3011').pathname).toBe(target)
  const response = await page.goto(oldPath)
  expect(response?.status()).toBe(200)
  await expect(page).toHaveURL(target)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('h1')).toHaveText(article.h1)
  await expect(page.locator('main')).toContainText('Sombra y Doctrine son Supports en Season 5')
  await expect(page.locator('main')).toContainText('Sombra no es un tercer DPS')
  await expect(page.locator('main')).toContainText('Peel sin abandonar el frente')
  await expect(page.locator('main')).not.toContainText('DPS: Tracer, Genji, Sombra')
  await expect(page.locator('main').getByRole('heading', { name: /^(CTA|Enlaces internos)$/i })).toHaveCount(0)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com${target}`)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(text => JSON.parse(text))
  expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'BlogPosting', datePublished: article.publishedAtIso, dateModified: article.modifiedAtIso }))
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).not.toContain(`${oldPath}</loc>`)
  expect(sitemap.match(new RegExp(`${target}</loc>`, 'g'))).toHaveLength(1)
  await expect(page.locator('.ad-slot,ins.adsbygoogle,script[src*="adsbygoogle"]')).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
})

test('composition search keeps one current card in the correct category and working destination', async ({ page }) => {
  await page.goto('/guides?q=dive&category=Composiciones')
  await expect(page.locator(`main a[href="${oldPath}"]`)).toHaveCount(0)
  const card = page.locator(`main a[href="${target}"]`)
  await expect(card).toHaveCount(1)
  await expect(card).toContainText(article.seoDescription)
  await expect(card).toContainText('Composiciones')
  await card.click()
  await expect(page).toHaveURL(target)
  await expect(page.locator('h1')).toHaveText(article.h1)
})

test('legacy guide recommendations use the actual editorial summary, not internal-link instructions', async ({ page }) => {
  await page.goto('/guides/como-mejorar-como-support-overwatch')
  const recommendation = page.locator('main a[href="/guides/como-jugar-ana-ranked-overwatch"]:has(p)')
  const editorial = getRankedHeroGuide('como-jugar-ana-ranked-overwatch')!
  await expect(recommendation).toContainText(editorial.title)
  await expect(recommendation).toContainText(editorial.seoDescription)
  await expect(recommendation).not.toContainText('enlaces internos')
})
