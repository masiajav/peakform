import { expect, test } from '@playwright/test'
import { getTeamCompPillar } from '../../src/lib/seo-clusters'

test('Ana composition explains the teams, FAQ and VOD without ads or stale patch claims', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  const response = await page.goto('/team-comps/ana', { waitUntil: 'networkidle' })
  expect(response?.status()).toBe(200)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/team-comps/ana')
  await expect(page.locator('main')).toContainText('No protege la granada aliada')
  await expect(page.locator('main')).not.toContainText('Parche revisado:')
  await expect(page.getByRole('heading', { name: 'Qué mirar en una pelea perdida' })).toBeVisible()
  const model = getTeamCompPillar('ana')!
  await expect(page).toHaveTitle(`${model.seoTitle} - Replaid Lab`)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', model.seoDescription)
  for (const faq of model.faqs) {
    await page.getByText(faq.question, { exact: true }).click()
    await expect(page.getByText(faq.answer, { exact: true })).toBeVisible()
  }
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(block => JSON.parse(block))
  expect(schemas.find(schema => schema['@type'] === 'FAQPage').mainEntity).toHaveLength(6)
  expect(schemas.find(schema => schema['@type'] === 'Article').dateModified).toBe('2026-10-06')
  expect(await (await page.request.get('/sitemap.xml')).text()).toMatch(/\/team-comps\/ana<\/loc>\s*<lastmod>2026-10-06T00:00:00\.000Z<\/lastmod>/)
  expect(await page.locator('main img').evaluateAll(images => images.every(image =>
    (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await expect(page.locator('script[src*="pagead"], ins.adsbygoogle, .ad-slot-placeholder')).toHaveCount(0)
  for (const link of model.links) expect((await page.request.get(link.href)).status()).toBe(200)
  await page.screenshot({ path: `reports/ana-composition/${test.info().project.name}.png`, fullPage: true })
  await page.getByRole('link', { name: 'Alturas y entradas en Gibraltar', exact: true }).click()
  await expect(page).toHaveURL(/\/maps\/watchpoint-gibraltar$/)
  await expect(page.locator('h1')).toContainText('Gibraltar')
  await page.goBack()
  await expect(page.locator('h1')).toContainText('Composiciones con Ana')
  expect(errors).toEqual([])
})
