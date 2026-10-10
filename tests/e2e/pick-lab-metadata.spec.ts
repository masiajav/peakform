import { expect, test } from '@playwright/test'

test('Pick Lab preserves counter mode without indexing the filtered URL', async ({ page, request }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  expect((await page.goto('/pick-lab'))?.status()).toBe(200)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
  expect((await page.goto('/pick-lab?mode=counters&target=ana'))?.status()).toBe(200)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/pick-lab')
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('main')).toContainText('Ana')
  await expect(page.getByRole('tab', { name: 'Counter rápido', exact: true })).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator('button[title="Ver counters de Ana"]')).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('button[title="Ver counters de Sombra"]')).toContainText('Support')
  await expect(page.locator('button[title="Ver counters de Doctrine"]')).toContainText('Support')
  await expect(page.locator('ins.adsbygoogle, .ad-slot, script[src*="adsbygoogle"]')).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).toContain('https://www.replaidlab.com/pick-lab</loc>')
  expect(sitemap).not.toContain('/pick-lab?')
  expect(errors).toEqual([])
})
