import { expect, test } from '@playwright/test'
import { reviewedTankGuide as guide } from '../../src/lib/reviewed-ranked-fundamentals'

test('Tank short note redirects permanently to its complete reviewed guide without duplicate discovery', async ({ page, request }) => {
  const source = '/guides/tank-crear-espacio-sin-regalar-vida'
  const target = `/guides/${guide.slug}`
  const redirect = await request.get(source, { maxRedirects: 0 })
  expect(redirect.status()).toBe(308)
  expect(new URL(redirect.headers().location, redirect.url()).pathname).toBe(target)
  const response = await page.goto(source)
  expect(response?.status()).toBe(200)
  await expect(page).toHaveURL(new RegExp(`${target}$`))
  await expect(page.locator('h1')).toHaveText(guide.h1)
  for (const text of [guide.quickAnswer, ...guide.intro, ...guide.sections.flatMap(section => section.body), ...guide.checklist, ...guide.faqs.flatMap(faq => [faq.question, faq.answer])]) await expect(page.locator('main')).toContainText(text)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
  expect(response?.headers()['x-robots-tag'] ?? '').not.toMatch(/noindex|none/i)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com${target}`)
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(block => JSON.parse(block))
  expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'BlogPosting', datePublished: guide.publishedAtIso, dateModified: guide.modifiedAtIso }))
  expect(schemas.find(schema => schema['@type'] === 'FAQPage').mainEntity).toEqual(guide.faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })))
  for (const link of guide.links) expect((await request.get(link.href)).status(), link.href).toBe(200)
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).toContain(`${target}</loc>`)
  expect(sitemap).not.toContain(`${source}</loc>`)
  await expect(page.locator('.ad-slot, ins.adsbygoogle, script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  await page.screenshot({ path: `reports/reviewed-consolidations/tank-final-${test.info().project.name}.png`, fullPage: true })
  await page.goto('/guides?q=tank')
  await expect(page.locator(`a[href="${source}"]`)).toHaveCount(0)
  await expect(page.locator(`a[href="${target}"]`)).toHaveCount(1)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
})
