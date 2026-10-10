import { expect, test, type Page } from '@playwright/test'
import { rankedHeroGuides } from '../../src/lib/ranked-hero-guides'
import { hasCurrentStaticEditorialReview } from '../../src/lib/static-editorial-review'

const PUBLIC_ROUTES = [
  '/',
  '/heroes',
  '/heroes/dmon',
  '/heroes/doctrine',
  '/doctrine-support-sombra-roadhog-rework-overwatch',
  '/blizzcon-2026-overwatch-horarios-espana',
  '/overwatch-temporada-4-heroes-of-busan',
  '/dmon-nuevo-heroe-tank-overwatch',
  '/busan-eichenwalde-paraiso-reworks-overwatch',
  '/heroes/shion',
  '/counters/shion',
  '/team-comps/shion',
  '/counters/ana',
  '/team-comps/ana',
  '/counters/genji',
  '/team-comps/genji',
  '/counters/kiriko',
  '/counters/freja',
  '/counters/pharah',
  '/counters/lifeweaver',
  '/counters/juno',
  '/counters/baptiste',
  '/counters/illari',
  '/counters/lucio',
  '/counters/mercy',
  '/counters/orisa',
  '/counters/ramattra',
  '/counters/sigma',
  '/counters/jetpack-cat',
  '/counters/wuyang',
  '/counters/zenyatta',
  '/counters/junker-queen',
  '/counters/mauga',
  '/counters/hazard',
  '/counters/junkrat',
  '/counters/soldier-76',
  '/counters/wrecking-ball',
  '/counters/venture',
  '/counters/vendetta',
  '/counters/anran',
  '/counters/mizuki',
  '/counters/sombra',
  '/team-comps/kiriko',
  '/counters/reinhardt',
  '/team-comps/reinhardt',
  '/counters/dva',
  '/team-comps/dva',
  '/counters/winston',
  '/team-comps/winston',
  '/counters/cassidy',
  '/team-comps/cassidy',
  '/counters/zarya',
  '/counters/tracer',
  '/counters/domina',
  '/team-comps/tracer',
  '/team-comps/zarya',
  '/guides/como-jugar-ana-ranked-overwatch',
  '/guides/como-jugar-kiriko-ranked-overwatch',
  '/guides/como-jugar-genji-ranked-overwatch',
  '/guides/como-jugar-cassidy-ranked-overwatch',
  '/guides/como-jugar-reinhardt-ranked-overwatch',
  '/guides/como-jugar-dva-ranked-overwatch',
  '/guides/como-jugar-winston-ranked-overwatch',
  '/roles/tank',
  '/roles/dps',
  '/roles/support',
  '/counters',
  '/news',
  '/guides/como-usar-ultimates-overwatch',
  '/guides/cuando-cambiar-de-heroe-overwatch',
  '/experts',
  '/about',
  '/contact',
  '/privacy',
  '/legal',
  '/editorial-methodology',
]

const RESTORED_TOPIC_ROUTES = ['/counters/genji', '/counters/kiriko', '/counters/freja', '/counters/pharah', '/counters/lifeweaver', '/counters/juno', '/counters/baptiste', '/counters/illari', '/counters/lucio', '/counters/mercy', '/counters/orisa', '/counters/ramattra', '/counters/sigma', '/counters/jetpack-cat', '/counters/wuyang', '/counters/zenyatta', '/counters/junker-queen', '/counters/mauga', '/counters/hazard', '/counters/junkrat', '/counters/soldier-76', '/counters/wrecking-ball', '/counters/venture', '/counters/vendetta', '/counters/anran', '/counters/mizuki']

for (const route of PUBLIC_ROUTES) {
  test(`${route} is a healthy public page`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text())
    })
    page.on('pageerror', error => errors.push(error.message))
    page.on('response', response => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`)
    })

    const response = await page.goto(route, { waitUntil: 'networkidle' })
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/www\.replaidlab\.com/)
    const title = await page.title()
    expect(title.length).toBeGreaterThan(20)
    expect(title).not.toMatch(/undefined|null/i)

    const bodyBackground = await page.locator('body').evaluate(element => getComputedStyle(element).backgroundColor)
    expect(bodyBackground).not.toBe('rgb(255, 255, 255)')
    const visibleText = await page.locator('body').evaluate(element => (element as HTMLElement).innerText)
    expect(visibleText).not.toMatch(/Ã|Â|â€|ï¿½/)

    const jsonLdBlocks = await page.locator('script[type="application/ld+json"]').allTextContents()
    for (const block of jsonLdBlocks) expect(() => JSON.parse(block)).not.toThrow()

    await assertLoadedImages(page)
    expect(errors).toEqual([])
  })
}

for (const route of ['/guides/como-usar-ultimates-overwatch', '/guides/cuando-cambiar-de-heroe-overwatch']) {
  test(`${route} does not expose implementation notes`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' })
    const articleText = await page.locator('article').innerText()
    expect(articleText).not.toContain('Title SEO')
    expect(articleText).not.toContain('Meta description')
    expect(articleText).not.toContain('Notas para Codex')
    expect(articleText).not.toContain('Keywords principales')
    await expect(page.locator('.ad-slot')).toHaveCount(0)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  })
}

test('sitemap contains only the completed editorial batches', async ({ request }) => {
  const response = await request.get('/sitemap.xml')
  expect(response.status()).toBe(200)
  const xml = await response.text()

  // Legacy publication intent must not substitute for a version-bound review.
  for (const slug of ['shion', 'ana', 'genji', 'kiriko', 'reinhardt', 'dva', 'winston', 'cassidy', 'zarya', 'tracer', 'domina']) {
    if (['genji', 'kiriko'].includes(slug)) expect(xml).toContain(`/counters/${slug}</loc>`)
    else expect(xml).not.toContain(`/counters/${slug}</loc>`)
    if (['ana', 'genji', 'kiriko', 'reinhardt', 'tracer', 'zarya'].includes(slug)) expect(xml).toContain(`/team-comps/${slug}</loc>`)
    else expect(xml).not.toContain(`/team-comps/${slug}`)
  }
  for (const slug of ['freja', 'pharah', 'lifeweaver', 'juno', 'baptiste', 'illari', 'lucio', 'mercy', 'orisa', 'ramattra', 'sigma', 'jetpack-cat', 'wuyang', 'zenyatta', 'junker-queen', 'mauga', 'hazard', 'junkrat', 'soldier-76', 'wrecking-ball', 'venture', 'vendetta', 'anran', 'mizuki']) {
    expect(xml).toContain(`/counters/${slug}</loc>`)
    expect(xml).toMatch(new RegExp(`/counters/${slug}</loc>\\s*<lastmod>2026-10-03T00:00:00\\.000Z</lastmod>`))
  }
  expect(xml).not.toContain('/guides/como-usar-ultimates-overwatch')
  for (const guide of rankedHeroGuides) {
    const path = `/guides/${guide.slug}`
    if (hasCurrentStaticEditorialReview(path, guide)) expect(xml).toContain(`${path}</loc>`)
    else expect(xml).not.toContain(`${path}</loc>`)
  }
  expect(xml).not.toContain('/guides/cuando-cambiar-de-heroe-overwatch')
  expect(xml).toContain('/overwatch-temporada-4-heroes-of-busan')
  expect(xml).toContain('/heroes/ana</loc>')
  expect(xml).toContain('/heroes/dmon</loc>')
  expect(xml).toMatch(/\/heroes\/dmon<\/loc>\s*<lastmod>2026-10-09T00:00:00\.000Z<\/lastmod>/)
  expect(xml).toContain('/dmon-nuevo-heroe-tank-overwatch')
  expect(xml).not.toContain('tier-list-season-2-overwatch-mejores-heroes-rol')
  expect(xml).not.toContain('/counters/doctrine')
  for (const slug of ['como-usar-ultimates-overwatch', 'como-mejorar-en-overwatch-revisando-vod', 'como-mejorar-como-tank-overwatch', 'cuando-cambiar-de-heroe-overwatch', 'como-revisar-cooldowns-overwatch', 'como-elegir-composicion-dive-poke-brawl']) {
    expect(xml).not.toContain(`/guides/${slug}`)
  }
})

for (const route of PUBLIC_ROUTES.filter(path => /^\/(?:counters|team-comps)\//.test(path))) {
  test(`${route} stays readable and follows its individual version approval`, async ({ page, request }) => {
    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('main')).toContainText('Replaid Lab')
    const restored = RESTORED_TOPIC_ROUTES.includes(route) || ['/team-comps/ana', '/team-comps/genji', '/team-comps/kiriko', '/team-comps/reinhardt', '/team-comps/tracer', '/team-comps/zarya'].includes(route)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', restored ? 'index, follow' : 'noindex, follow')
    await expect(page.locator('.ad-slot, ins.adsbygoogle, script[src*="adsbygoogle"]')).toHaveCount(0)
    const sitemap = await (await request.get('/sitemap.xml')).text()
    if (restored) expect(sitemap).toContain(`https://www.replaidlab.com${route}</loc>`)
    else expect(sitemap).not.toContain(`https://www.replaidlab.com${route}</loc>`)
  })
}

for (const slug of ['como-usar-ultimates-overwatch', 'como-mejorar-en-overwatch-revisando-vod', 'como-mejorar-como-tank-overwatch', 'cuando-cambiar-de-heroe-overwatch', 'como-revisar-cooldowns-overwatch', 'como-elegir-composicion-dive-poke-brawl']) {
  test(`${slug} remains accessible in the guide hub while version approval is pending`, async ({ page, request }) => {
    await page.goto('/guides', { waitUntil: 'networkidle' })
    await expect(page.locator(`main a[href="/guides/${slug}"]`).first()).toBeVisible()
    const response = await request.get(`/guides/${slug}`)
    expect(response.status()).toBe(200)
    const html = await response.text()
    expect(html).toMatch(/name="robots" content="noindex, follow"/)
    expect(html).not.toContain('__editorial_review_')
    expect(html).not.toContain('ins class="adsbygoogle"')
  })
}

for (const route of [
  '/counters/shion',
  '/team-comps/shion',
  '/guides/como-usar-ultimates-overwatch',
  '/counters/ana',
  '/team-comps/ana',
  '/counters/genji',
  '/team-comps/genji',
  '/counters/kiriko',
  '/team-comps/kiriko',
  '/counters/reinhardt',
  '/team-comps/reinhardt',
  '/counters/dva',
  '/team-comps/dva',
  '/counters/winston',
  '/team-comps/winston',
  '/counters/cassidy',
  '/team-comps/cassidy',
  '/counters/zarya',
  '/counters/tracer',
  '/counters/domina',
  '/team-comps/tracer',
  '/team-comps/zarya',
  '/guides/como-jugar-ana-ranked-overwatch',
  '/guides/como-jugar-kiriko-ranked-overwatch',
  '/guides/como-jugar-genji-ranked-overwatch',
  '/guides/como-jugar-cassidy-ranked-overwatch',
  '/guides/como-jugar-reinhardt-ranked-overwatch',
  '/guides/como-jugar-dva-ranked-overwatch',
  '/guides/como-jugar-winston-ranked-overwatch',
  '/guides/cuando-cambiar-de-heroe-overwatch',
]) {
  test(`${route} has no broken internal links`, async ({ page, request }) => {
    await page.goto(route, { waitUntil: 'networkidle' })
    const links = await page.locator('main a[href^="/"]').evaluateAll(anchors => Array.from(new Set(
      anchors.map(anchor => (anchor as HTMLAnchorElement).getAttribute('href')).filter(Boolean) as string[]
    )))

    for (const link of links) {
      const response = await request.get(link)
      expect(response.status(), `${route} links to ${link}`).toBeLessThan(400)
    }
  })
}

async function assertLoadedImages(page: Page) {
  const failedImages = await page.locator('img:visible').evaluateAll(images => images
    .filter(image => {
      const rect = image.getBoundingClientRect()
      const isInViewport = rect.bottom > 0 && rect.top < window.innerHeight
      return isInViewport && (image as HTMLImageElement).naturalWidth === 0
    })
    .map(image => (image as HTMLImageElement).src))
  expect(failedImages).toEqual([])
}
