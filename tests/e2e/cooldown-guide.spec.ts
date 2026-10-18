import { expect, test } from '@playwright/test'
import { evergreenGuides } from '../../src/lib/evergreen-guides'

const guide = evergreenGuides['como-revisar-cooldowns-overwatch']
const route = `/guides/${guide.slug}`

test('cooldown review keeps its history and explains conditional decisions with matching structured data', async ({ page, request }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  const response = await page.goto(route)
  expect(response?.status()).toBe(200)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('h1')).toHaveText(guide.h1)
  await expect(page).toHaveTitle(`${guide.seoTitle} - Replaid Lab`)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', guide.seoDescription)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com${route}`)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
  await expect(page.locator('time[datetime="2026-06-21"]')).toBeVisible()
  await expect(page.locator('time[datetime="2026-10-18"]')).toBeVisible()
  await expect(page.locator('.guide-video-summary')).toContainText(guide.quickAnswer)
  for (const term of ['Swift Cuts', 'Matrix', 'overtime', 'tu cámara', 'guardar']) await expect(page.locator('main')).toContainText(term)
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text))
  expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'BlogPosting', datePublished: '2026-06-21', dateModified: '2026-10-18', author: { name: 'Replaid Lab', '@type': 'Organization' } }))
  const visible = await page.locator('main').innerText()
  const faqSection = page.locator('main > section').filter({ has: page.getByRole('heading', { name: 'Preguntas frecuentes', exact: true }) })
  await expect(faqSection.locator('article')).toHaveCount(6)
  for (const item of schemas.find(schema => schema['@type'] === 'FAQPage').mainEntity) {
    expect(visible).toContain(item.name)
    expect(visible).toContain(item.acceptedAnswer.text)
    await expect(faqSection.getByRole('heading', { name: item.name, exact: true })).toBeVisible()
  }
  expect(visible).not.toMatch(/No uso Sleep en poke|TITLE SEO|META DESCRIPTION|Enlaces internos|Ã|â€|ï¿½/)
  for (const href of await page.locator('main a[href^="/"]').evaluateAll(links => [...new Set(links.map(link => link.getAttribute('href')!))])) expect((await request.get(href)).status(), href).toBe(200)
  await expect(page.locator('ins.adsbygoogle,.ad-slot,script[src*="adsbygoogle"]')).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  expect(errors).toEqual([])
  expect(await (await request.get('/sitemap.xml')).text()).toMatch(/\/guides\/como-revisar-cooldowns-overwatch<\/loc>\s*<lastmod>2026-10-18T00:00:00\.000Z<\/lastmod>/)
})

test('the current cooldown card works from the guide search and links to the free notebook', async ({ page }) => {
  await page.goto('/guides?q=cooldowns')
  const card = page.locator(`main a[href="${route}"]`).first()
  await expect(card).toContainText(guide.title)
  await expect(card).toContainText(guide.seoDescription)
  await card.click()
  await expect(page).toHaveURL(new RegExp(route + '$'))
  await expect(page.locator('h1')).toHaveText(guide.h1)
  await page.getByRole('link', { name: 'Comparar dos usos en el cuaderno de VOD', exact: true }).click()
  await expect(page.getByRole('region', { name: 'Cuaderno de revisión', exact: true })).toBeVisible()
})
