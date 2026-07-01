import { expect, test, type Page } from '@playwright/test'

const PUBLIC_ROUTES = [
  '/',
  '/heroes',
  '/heroes/shion',
  '/counters/shion',
  '/team-comps/shion',
  '/counters/ana',
  '/team-comps/ana',
  '/counters/genji',
  '/team-comps/genji',
  '/counters/kiriko',
  '/team-comps/kiriko',
  '/counters/reinhardt',
  '/team-comps/reinhardt',
  '/guides/como-usar-ultimates-overwatch',
  '/guides/cuando-cambiar-de-heroe-overwatch',
  '/experts',
  '/about',
  '/contact',
  '/privacy',
  '/legal',
  '/editorial-methodology',
]

for (const route of PUBLIC_ROUTES) {
  test(`${route} is a healthy public page`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', message => {
      if (message.type() === 'error' && !message.text().startsWith('Failed to load resource')) errors.push(message.text())
    })
    page.on('pageerror', error => errors.push(error.message))
    page.on('response', response => {
      const isLocalAnalytics = response.url().includes('/_vercel/insights/')
      if (response.status() >= 400 && !isLocalAnalytics) errors.push(`${response.status()} ${response.url()}`)
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
  })
}

test('sitemap contains only the completed editorial batches', async ({ request }) => {
  const response = await request.get('/sitemap.xml')
  expect(response.status()).toBe(200)
  const xml = await response.text()

  expect(xml).toContain('/counters/shion')
  expect(xml).toContain('/team-comps/shion')
  expect(xml).toContain('/guides/como-usar-ultimates-overwatch')
  expect(xml).toContain('/counters/ana')
  expect(xml).toContain('/team-comps/ana')
  expect(xml).toContain('/counters/genji')
  expect(xml).toContain('/team-comps/genji')
  expect(xml).toContain('/counters/kiriko')
  expect(xml).toContain('/team-comps/kiriko')
  expect(xml).toContain('/counters/reinhardt')
  expect(xml).toContain('/team-comps/reinhardt')
  expect(xml).toContain('/guides/cuando-cambiar-de-heroe-overwatch')
  expect(xml).not.toContain('tier-list-season-2-overwatch-mejores-heroes-rol')
  expect(xml).not.toContain('/counters/dva')
})

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
