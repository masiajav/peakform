import { expect, test } from '@playwright/test'

test('public pages inherit large image previews while search filters retain noindex', async ({ page }) => {
  await page.goto('/news', { waitUntil: 'networkidle' })
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
  await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute('content', /max-image-preview:large/)
  await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute('content', /max-snippet:-1/)

  await page.goto('/guides?hero=pharah', { waitUntil: 'networkidle' })
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/guides')
  const googlebot = await page.locator('meta[name="googlebot"]').allTextContents()
  expect(googlebot).toEqual([])
})
