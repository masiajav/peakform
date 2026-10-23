import { expect, test } from '@playwright/test'
import { getMapPillar, MAP_PILLARS } from '../../src/lib/overwatch-maps'

test('all maps retain real review dates without invented publication history', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text()
  const reviewed = ['blizzard-world', 'dorado', 'kings-row', 'lijiang-tower', 'neon-junction', 'nepal']
  for (const map of MAP_PILLARS) {
    const response = await request.get(`/maps/${map.slug}`)
    expect(response.status()).toBe(200)
    const html = await response.text()
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].flatMap(match => JSON.parse(match[1]))
    const article = schemas.find(item => item['@type'] === 'Article')
    expect(article).not.toHaveProperty('datePublished')
    expect(article.dateModified).toBe(map.updatedAtIso)
    expect(schemas.find(item => item['@type'] === 'WebPage').dateModified).toBe(map.updatedAtIso)
    const robots = [...html.matchAll(/<meta name="robots" content="([^"]+)"/g)].map(match => match[1]).join(',')
    if (reviewed.includes(map.slug)) {
      expect(robots).not.toMatch(/\bnoindex\b/i)
      expect(xml).toMatch(new RegExp(`/maps/${map.slug}</loc>\\s*<lastmod>${map.updatedAtIso}T00:00:00\\.000Z</lastmod>`))
    } else {
      expect(robots).toMatch(/\bnoindex\b/i)
      expect(robots).not.toMatch(/\bnofollow\b/i)
      expect(xml).not.toContain(`/maps/${map.slug}</loc>`)
    }
  }
})

test('pending maps keep their hub links, complete articles and navigation without ads', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('/maps')
  for (const map of MAP_PILLARS) await expect(page.locator(`main .map-hub-card[href="/maps/${map.slug}"]`)).toHaveCount(1)
  await page.locator('main .map-hub-card[href="/maps/circuit-royal"]').click()
  const map = getMapPillar('circuit-royal')!
  await expect(page.locator('h1')).toHaveText(map.name)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/maps/circuit-royal')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
  await expect(page.locator('main')).toContainText(map.intro[0])
  for (const phase of map.phases) await expect(page.getByRole('heading', { name: phase.name, exact: true })).toBeVisible()
  for (const image of await page.locator('main img').all()) await image.evaluate(element => (element as HTMLImageElement).decode())
  await expect(page.locator('.ad-slot,ins.adsbygoogle,script[src*="adsbygoogle"]')).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  expect(errors).toEqual([])
})

test('Neon Junction presents its revised route, visible FAQ and matching metadata without ads', async ({ page }) => {
  const map = getMapPillar('neon-junction')!
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  const response = await page.goto('/maps/neon-junction')
  expect(response?.status()).toBe(200)
  await expect(page.locator('h1')).toHaveText('Neon Junction')
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page).toHaveTitle(`${map.seoTitle} - Replaid Lab`)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', map.seoDescription)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/maps/neon-junction')
  const robots = await page.locator('meta[name="robots"], meta[name="googlebot"]').evaluateAll(tags => tags.map(tag => tag.getAttribute('content') || '').join(','))
  expect(`${robots},${response?.headers()['x-robots-tag'] || ''}`).not.toMatch(/\b(?:noindex|nofollow|none)\b/i)
  await expect(page.locator('main time')).toHaveAttribute('datetime', '2026-10-19')
  await expect(page.getByRole('heading', { name: 'Tren y curva hacia el segundo punto', exact: true })).toBeVisible()
  await expect(page.locator('main')).toContainText('no hay una cantidad fija que debas gastar o guardar')
  await expect(page.getByRole('heading', { name: 'Para tu próxima partida', exact: true })).toBeVisible()
  await expect(page.locator('main')).toContainText(map.conclusion!)
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(value => JSON.parse(value))
  const faq = schemas.find(item => item['@type'] === 'FAQPage')
  expect(faq.mainEntity).toHaveLength(5)
  for (const item of faq.mainEntity) {
    await expect(page.getByRole('heading', { name: item.name, exact: true })).toBeVisible()
    await expect(page.getByText(item.acceptedAnswer.text, { exact: true })).toBeVisible()
  }
  for (const image of await page.locator('main img').all()) await image.evaluate(element => (element as HTMLImageElement).decode())
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  expect(await page.locator('body').evaluate(element => getComputedStyle(element).backgroundColor)).toBe('rgb(10, 10, 10)')
  await expect(page.locator('.ad-slot,ins.adsbygoogle,script[src*="adsbygoogle"]')).toHaveCount(0)
  expect(errors).toEqual([])
})

test('Neon Junction connects its team example and free VOD notebook without old guide aliases', async ({ page }) => {
  await page.goto('/maps/neon-junction')
  await page.locator('main a[href="/team-comps/shion"]').click()
  await expect(page).toHaveURL(/\/team-comps\/shion$/)
  await page.goBack()
  await page.locator('main a[href="/guides/review-vod-overwatch-espanol#cuaderno-vod"]').click()
  await expect(page.getByRole('region', { name: 'Cuaderno de revisión', exact: true })).toBeVisible()
})
