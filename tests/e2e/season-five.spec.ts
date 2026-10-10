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

test('Sombra counter and composition use the released Support kit', async ({ page, request }) => {
  for (const route of ['/counters/sombra', '/team-comps/sombra']) {
    await page.goto(route, { waitUntil: 'networkidle' })
    await expect(page.locator('main')).toContainText('Sombra')
    await expect(page.locator('main')).toContainText('Support')
    await expect(page.locator('main')).toContainText('Cyberspace')
    await expect(page.locator('main')).toContainText('Hotfix')
    await expect(page.locator('main')).not.toContainText('Encrypted Upload')
    await expect(page.locator('h1')).not.toContainText('Archivo')
    const reviewedComposition = route === '/team-comps/sombra'
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', `${reviewedComposition ? 'index' : 'noindex'}, follow`)
    await expect(page.locator('main a[href="' + path + '"]').first()).toBeVisible()
    expect((await (await request.get('/sitemap.xml')).text()).includes(route + '</loc>')).toBe(reviewedComposition)
  }
})

test('Sombra guide keeps its old video but appears in Support rather than DPS filters', async ({ page }) => {
  const slug = '/guides/sombra-guia-video-overwatch'
  await page.goto(slug, { waitUntil: 'domcontentloaded' })
  await expect(page.locator('main a[href="/roles/support"]').first()).toBeVisible()
  await expect(page.locator('.guide-body')).toContainText('El vídeo de esta página muestra la versión anterior de Sombra como DPS')
  await expect(page.locator('.guide-body')).toContainText('Hotfix')
  await expect(page.locator('iframe')).toHaveCount(1)
  for (const query of ['role=support', 'q=Support']) {
    await page.goto(`/guides?${query}`, { waitUntil: 'domcontentloaded' })
    await expect(page.locator(`main a[href="${slug}"]`)).toHaveCount(1)
    await expect(page.locator(`main a[href="${slug}"]`)).toContainText('Sombra Support')
  }
  await page.goto('/guides?role=dps', { waitUntil: 'domcontentloaded' })
  await expect(page.locator(`main a[href="${slug}"]`)).toHaveCount(0)
})

test('released Sombra and Roadhog compositions publish only the reviewed revisions, without ads', async ({ page, request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const slug of ['sombra', 'roadhog']) {
    const route = `/team-comps/${slug}`
    expect((await page.goto(route, { waitUntil: 'networkidle' }))?.status()).toBe(200)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com' + route)
    await expect(page.locator('.seo-composition-card')).toHaveCount(3)
    await expect(page.locator('.seo-pillar-meta time')).toHaveAttribute('datetime', '2026-10-10')
    await expect(page.locator('main')).not.toContainText('ALINEACIONES ANTERIORES A SEASON 5')
    await expect(page.locator('main')).not.toContainText('no los copies')
    await expect(page.locator('main')).not.toContainText('Encrypted Upload')
    await expect(page.getByRole('heading', { name: 'Qué mirar en una pelea perdida', exact: true })).toBeVisible()
    await expect(page.locator('main')).toContainText(slug === 'sombra' ? 'No limpia anticuración ni silencia' : 'no crea una barrera')
    await expect(page.locator('ins.adsbygoogle,.ad-slot,script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(sitemap).toMatch(new RegExp(`${route}</loc>\\s*<lastmod>2026-10-10T00:00:00\\.000Z</lastmod>`))
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  }
  expect(sitemap).toContain('/team-comps/doctrine</loc>')
  expect(sitemap).not.toContain('/counters/sombra</loc>')
  expect(sitemap).not.toContain('/counters/roadhog</loc>')
})

test('Doctrine launch advice is individually indexable and links between counters and compositions', async ({ page, request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const route of ['/counters/doctrine', '/team-comps/doctrine']) {
    expect((await page.goto(route, { waitUntil: 'networkidle' }))?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com' + route)
    await expect(page.locator('.seo-pillar-meta time')).toHaveAttribute('datetime', '2026-10-10')
    await expect(page.locator('main')).toContainText('30%')
    await expect(page.locator('main')).toContainText('40%')
    await expect(page.locator('main')).not.toContainText('Archivo del trial')
    await expect(page.locator('main')).not.toContainText('balance de estreno pendiente')
    const relatedRoute = route === '/counters/doctrine' ? '/team-comps/doctrine' : '/counters/doctrine'
    await expect(page.locator(`main a[href="${relatedRoute}"]`).first()).toBeVisible()
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text))
    const article = schemas.find(item => item['@type'] === 'Article')
    expect(article).toMatchObject({ dateModified: '2026-10-10', author: { '@type': 'Organization', name: 'Replaid Lab' } })
    expect(article).not.toHaveProperty('datePublished')
    expect(sitemap).toMatch(new RegExp(`${route}</loc>\\s*<lastmod>2026-10-10T00:00:00\\.000Z</lastmod>`))
    await expect(page.locator('ins.adsbygoogle,.ad-slot,script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  }
})
