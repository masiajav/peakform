import { expect, test } from '@playwright/test'

test('Overwatch starts with news and patches rather than recently revised guides', async ({ page, request }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  expect((await page.goto('/overwatch'))?.status()).toBe(200)
  const news = page.getByRole('region', { name: 'Últimas noticias de Overwatch', exact: true })
  await expect(news).toBeVisible()
  await expect(page.locator('main > section').nth(1)).toHaveAttribute('aria-label', 'Últimas noticias de Overwatch')
  await expect(news.getByRole('link', { name: 'Ver noticias', exact: false })).toHaveAttribute('href', '/news')
  const articleLinks = news.locator('a').filter({ has: page.locator('h3') })
  expect(await articleLinks.count()).toBeGreaterThan(0)
  expect(await articleLinks.count()).toBeLessThanOrEqual(3)
  for (const href of await articleLinks.evaluateAll(links => links.map(link => link.getAttribute('href')!))) {
    expect(href).toMatch(/^\/(?:news|patch-notes)\//)
    expect((await request.get(href)).status()).toBe(200)
  }
  await expect(news).not.toContainText('GUÍA')
  await expect(page.getByRole('heading', { name: 'Al día en Overwatch', exact: true })).toHaveCount(0)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/overwatch')
  await expect(page.locator('ins.adsbygoogle,.ad-slot,script[src*="adsbygoogle"]')).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  expect(errors).toEqual([])
  await news.scrollIntoViewIfNeeded()
  await page.screenshot({ path: `reports/news-home-${test.info().project.name}.png` })
})
