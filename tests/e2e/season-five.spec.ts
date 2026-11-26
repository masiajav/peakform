import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

const path = '/doctrine-support-sombra-roadhog-rework-overwatch'

async function expectEditorialRevision(page: Page, sitemap: string, route: string) {
  const url = 'https://www.replaidlab.com' + route
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', url)
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text))
  const article = schemas.find(item => item['@type'] === 'Article' && item.url === url)
  expect(article).toMatchObject({
    datePublished: expect.stringMatching(/^2026-11-03(?:T|$)/),
    dateModified: expect.any(String),
    author: { '@type': 'Organization', name: 'Replaid Lab' },
  })
  expect(Date.parse(article.dateModified)).toBeGreaterThanOrEqual(Date.parse(article.datePublished))
  const visibleDate = new Date(article.dateModified).toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' })
  await expect(page.locator('main .game-meta')).toContainText('Actualizado el ' + visibleDate)
  const entry = sitemap.match(/<url>[\s\S]*?<\/url>/g)?.find(item => item.includes(`<loc>${url}</loc>`))
  expect(entry).toContain(`<lastmod>${new Date(article.dateModified).toISOString()}</lastmod>`)
}

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
  expect(article).toMatchObject({ datePublished: '2026-09-12', dateModified: '2026-10-15', author: { name: 'Replaid Lab' } })
  expect(article.headline).toBe((await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim())
  expect(article.description).toBe(await page.locator('meta[name="description"]').getAttribute('content'))
  const faq = schemas.find(item => item['@type'] === 'FAQPage')
  expect(faq.mainEntity).toHaveLength(12)
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

test('the news archive retains the Season 5 announcement after it leaves the game home', async ({ page }) => {
  await page.goto('/news', { waitUntil: 'networkidle' })
  await expect(page.locator('main')).toContainText(/Season 5/i)
  await expect(page.locator('main a[href="' + path + '"]').first()).toBeVisible()

  await page.goto('/overwatch', { waitUntil: 'networkidle' })
  const main = page.locator('main')
  await expect(main.getByRole('link', { name: 'NOTICIAS Y PARCHES' })).toHaveAttribute('href', '/news')
  await expect(main).not.toContainText('Hasta el 2 de noviembre')
  await expect(main).not.toContainText('Doctrine tiene anunciado su estreno')
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
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
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
    await expect(page.locator('main a[href="' + path + '"]').first()).toBeVisible()
    expect((await (await request.get('/sitemap.xml')).text()).includes(route + '</loc>')).toBe(true)
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
    await expect(page.getByRole('heading', { name: 'Qué mirar en tu repetición', exact: true })).toBeVisible()
    await expect(page.locator('main')).toContainText(slug === 'sombra' ? 'No limpia anticuración ni silencia' : 'no crea una barrera')
    await expect(page.locator('ins.adsbygoogle,.ad-slot,script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(sitemap).toMatch(new RegExp(`${route}</loc>\\s*<lastmod>2026-10-10T00:00:00\\.000Z</lastmod>`))
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  }
  expect(sitemap).toContain('/team-comps/doctrine</loc>')
  expect(sitemap).toContain('/counters/sombra</loc>')
  expect(sitemap).toContain('/counters/roadhog</loc>')
})

test('reviewed Season 5 counters show distinct tactical conclusions and link their compositions', async ({ page, request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const slug of ['sombra', 'roadhog']) {
    const route = `/counters/${slug}`
    expect((await page.goto(route, { waitUntil: 'networkidle' }))?.status()).toBe(200)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
    await expect(page.getByRole('heading', {
      name: slug === 'sombra' ? 'Antes de volver a jugar' : 'Qué cambiar en tu próxima partida',
      exact: true,
    })).toBeVisible()
    await expect(page.locator(`main a[href="/team-comps/${slug}"]`)).toBeVisible()
    await expect(page.locator('main')).toContainText(slug === 'sombra' ? 'La zona dura 3 segundos' : 'La absorción dura 2 segundos')
    await expect(page.locator('main')).toContainText(slug === 'sombra' ? 'Hotfix tiene dos cargas' : 'anti no borra todo el efecto')
    await expect(page.locator('main')).toContainText(slug === 'sombra' ? 'preparad otra posición de curación' : 'corta también ese tiro')
    if (slug === 'sombra') {
      await expect(page.locator('main')).toContainText(/40\s*% el daño y la curación/)
      await expect(page.locator('main')).toContainText('Hotfix dura 10 segundos en lugar de 12')
      await expectEditorialRevision(page, sitemap, route)
    } else {
      expect(sitemap).toMatch(new RegExp(`${route}</loc>\\s*<lastmod>2026-10-10T00:00:00\\.000Z</lastmod>`))
    }
    await expect(page.locator('ins.adsbygoogle,.ad-slot,script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  }
})

test('Doctrine patch advice is individually indexable and links between counters and compositions', async ({ page, request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const route of ['/counters/doctrine', '/team-comps/doctrine']) {
    expect((await page.goto(route, { waitUntil: 'networkidle' }))?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
    await expectEditorialRevision(page, sitemap, route)
    await expect(page.locator('main')).toContainText('Impulso velado tiene 10 segundos de recarga base e Imbuir 9')
    await expect(page.locator('main')).toContainText('La reducción de daño del movimiento no es inmunidad')
    if (route === '/counters/doctrine') {
      await expect(page.locator('main')).toContainText(/30\s*% de velocidad de ataque/)
      await expect(page.locator('main')).toContainText(/reduce un 40\s*% el daño/)
    } else {
      await expect(page.getByRole('heading', { name: /6v6: Sigma conserva el frente/ })).toBeVisible()
      await expect(page.locator('main')).toContainText('Liberación tampoco debe usarse como un cleanse')
    }
    await expect(page.locator('main')).not.toContainText('Archivo del trial')
    await expect(page.locator('main')).not.toContainText('balance de estreno pendiente')
    const relatedRoute = route === '/counters/doctrine' ? '/team-comps/doctrine' : '/counters/doctrine'
    await expect(page.locator(`main a[href="${relatedRoute}"]`).first()).toBeVisible()
    await expect(page.locator('ins.adsbygoogle,.ad-slot,script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  }
})
