import { expect, test } from '@playwright/test'

const path = '/doctrine-support-sombra-roadhog-rework-overwatch'

test('Season 5 news shows current kits, event dates and matching metadata', async ({ page, request }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  expect((await page.goto(path, { waitUntil: 'networkidle' }))?.status()).toBe(200)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('h1')).toContainText('Overwatch Season 5:')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com' + path)
  const main = page.locator('main')
  for (const text of ['empezó el 6 de octubre de 2026', 'Hotfix', 'Cyberspace', 'Trash Compactor', 'Grímsvötn', 'del 6 de octubre al 2 de noviembre', 'del 6 al 19 de octubre', 'del 9 al 26 de octubre', 'del 29 de octubre al 1 de noviembre', 'ya ha caducado', 'no incluyen monedas']) await expect(main).toContainText(text)
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text))
  const article = schemas.find(item => item['@type'] === 'NewsArticle')
  expect(article).toMatchObject({ datePublished: '2026-09-12', dateModified: '2026-10-09', author: { name: 'Replaid Lab' } })
  expect(article.headline).toBe((await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim())
  expect(article.description).toBe(await page.locator('meta[name="description"]').getAttribute('content'))
  const faq = schemas.find(item => item['@type'] === 'FAQPage')
  expect(faq.mainEntity).toHaveLength(11)
  for (const item of faq.mainEntity) {
    await expect(main).toContainText(item.name)
    await expect(main).toContainText(item.acceptedAnswer.text)
  }
  for (const image of await main.locator('img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true)
  }
  for (const href of new Set(await main.locator('a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute('href')!)))) expect((await request.get(href)).status(), href).toBe(200)
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  await expect(page.locator('ins.adsbygoogle, .ad-slot, script[src*="adsbygoogle"]')).toHaveCount(0)
  expect(errors).toEqual([])
  await page.locator('h1').scrollIntoViewIfNeeded()
  await page.screenshot({ path: `reports/season-five/news-${test.info().project.name}.png` })
})

test('home and news link the current season without advertising the upcoming trial', async ({ page }) => {
  for (const route of ['/', '/news']) {
    await page.goto(route, { waitUntil: 'networkidle' })
    await expect(page.locator('main')).toContainText(/Season 5/i)
    await expect(page.locator('main a[href="' + path + '"]').first()).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Doctrine tiene anunciado su estreno')
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  }
})

test('old Sombra articles warn about the Support rework and stay outside search', async ({ page, request }) => {
  for (const route of ['/counters/sombra', '/team-comps/sombra']) {
    await page.goto(route, { waitUntil: 'networkidle' })
    await expect(page.locator('main')).toContainText('Sombra')
    await expect(page.locator('main')).toContainText('Support')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
    await expect(page.locator('main a[href="' + path + '"]').first()).toBeVisible()
    expect(await (await request.get('/sitemap.xml')).text()).not.toContain(route + '</loc>')
  }
})
