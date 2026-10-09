import { expect, test } from '@playwright/test'
import { COUNTER_HEROES } from '../../src/lib/overwatch-counters'
import { heroTopicHref } from '../../src/lib/topic-links'

test('hero directory shows the full role catalogue before advice, with matching structured data', async ({ page, request }) => {
  await page.goto('/heroes', { waitUntil: 'networkidle' })
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/heroes')
  const heroes = ['tank', 'dps', 'support'].flatMap(role => COUNTER_HEROES.filter(hero => hero.role === role))
  const cards = page.locator('main section[id="tank"] a:has(article), main section[id="dps"] a:has(article), main section[id="support"] a:has(article)')
  await expect(cards).toHaveCount(54)
  const visibleItems = await cards.evaluateAll(links => links.map(link => ({
    name: link.querySelector('h3')?.textContent,
    url: new URL(link.getAttribute('href')!, 'https://www.replaidlab.com').href,
  })))
  expect(visibleItems).toEqual(heroes.map(hero => ({ name: hero.name, url: `https://www.replaidlab.com${heroTopicHref(hero.slug)}` })))
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(text => JSON.parse(text))
  const collection = schemas.find(schema => schema['@type'] === 'CollectionPage')
  expect(collection.mainEntity.numberOfItems).toBe(54)
  expect(collection.mainEntity.itemListElement.map(({ name, url, position }: { name: string; url: string; position: number }) => ({ name, url, position })))
    .toEqual(visibleItems.map((item, index) => ({ ...item, position: index + 1 })))
  expect(await page.locator('main').evaluate(element => Array.from(element.querySelectorAll(':scope > section')).slice(0, 3).map(section => section.id))).toEqual(['tank', 'dps', 'support'])
  await expect(page.locator('#support a[href="/heroes/doctrine"]')).not.toContainText('PREVIEW')
  await expect(page.locator('#support a[href="/guides?hero=sombra"]')).toContainText('Sombra')
  await expect(page.locator('#dps a[href="/guides?hero=sombra"]')).toHaveCount(0)
  const faq = schemas.find(schema => schema['@type'] === 'FAQPage')
  for (const item of faq.mainEntity) {
    await expect(page.locator('main')).toContainText(item.name)
    await expect(page.locator('main')).toContainText(item.acceptedAnswer.text)
  }
  await expect(page.locator('main')).not.toContainText('CÓMO USAR ESTE HUB')
  await expect(page.locator('.ad-slot, ins.adsbygoogle, script[src*="adsbygoogle"]')).toHaveCount(0)
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).toMatch(/\/heroes<\/loc>\s*<lastmod>2026-10-09T00:00:00\.000Z<\/lastmod>/)
  expect(sitemap).toContain('/heroes/doctrine</loc>')
})

test('role anchors and direct hero or filtered guide links preserve their destinations', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('/heroes', { waitUntil: 'networkidle' })
  await page.getByRole('navigation', { name: 'Héroes por rol' }).getByRole('link', { name: 'Support' }).click()
  await expect(page).toHaveURL(/\/heroes#support$/)
  await expect(page.locator('#support-heading')).toBeInViewport()
  await page.locator('#support a[href="/heroes/ana"]').click()
  await expect(page).toHaveURL(/\/heroes\/ana$/)
  await expect(page.locator('h1')).toContainText('Ana')
  await page.goBack({ waitUntil: 'networkidle' })
  await expect(page).toHaveURL(/\/heroes#support$/)
  await expect(page.locator('#support a[href="/heroes/ana"]')).toBeVisible()
  await expect(page.locator('h1')).toHaveText('Todos los héroes,por rol')
  await page.getByRole('navigation', { name: 'Héroes por rol' }).getByRole('link', { name: 'DPS' }).click()
  await expect(page.locator('#dps-heading')).toBeInViewport()
  await page.locator('#dps a[href="/guides?hero=sierra"]').click()
  await expect(page).toHaveURL(/\/guides\?hero=sierra$/)
  await expect(page.locator('h1')).toHaveCount(1)
  await page.goBack({ waitUntil: 'networkidle' })
  await expect(page).toHaveURL(/\/heroes#dps$/)
  await expect(page.locator('#dps a[href="/guides?hero=sierra"]')).toBeVisible()
  await expect(page.locator('h1')).toHaveText('Todos los héroes,por rol')
  expect(errors).toEqual([])
})

test('all catalogue portraits load, internal links respond and compact layouts stay within the viewport', async ({ page, request }) => {
  test.setTimeout(90_000)
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('/heroes', { waitUntil: 'networkidle' })
  await page.screenshot({ path: `reports/heroes-index/header-${test.info().project.name}.png` })
  const portraits = page.locator('#tank img, #dps img, #support img')
  await expect(portraits).toHaveCount(54)
  for (const image of await portraits.all()) {
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true)
  }
  await page.getByRole('navigation', { name: 'Héroes por rol' }).getByRole('link', { name: 'Support' }).click()
  await expect(page.locator('#support-heading')).toBeInViewport()
  await page.screenshot({ path: `reports/heroes-index/support-${test.info().project.name}.png` })
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false)
  const clippedNames = await page.locator('#tank h3, #dps h3, #support h3').evaluateAll(elements => elements.filter(element => element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight).map(element => element.textContent))
  expect(clippedNames).toEqual([])
  const faqContrast = await page.locator('main > section:last-child article p').evaluateAll(elements => {
    const luminance = (color: string) => {
      const values = color.match(/[\d.]+/g)!.slice(0, 3).map(value => Number(value) / 255)
        .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
      return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722
    }
    return elements.map(element => {
      const foreground = luminance(getComputedStyle(element).color)
      const background = luminance(getComputedStyle(element.closest('article')!).backgroundColor)
      return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05)
    })
  })
  expect(faqContrast).toHaveLength(4)
  for (const ratio of faqContrast) expect(ratio).toBeGreaterThanOrEqual(4.5)
  const links = await page.locator('main a[href^="/"]').evaluateAll(elements => Array.from(new Set(elements.map(element => element.getAttribute('href')!))))
  for (const link of links) expect((await request.get(link)).status(), link).toBe(200)
  expect(errors).toEqual([])
})

test('role query variants stay noindex with the catalogue canonical', async ({ page }) => {
  await page.goto('/heroes?role=tank', { waitUntil: 'networkidle' })
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/heroes')
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('.ad-slot, ins.adsbygoogle')).toHaveCount(0)
})
