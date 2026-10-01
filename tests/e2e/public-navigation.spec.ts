import { expect, test } from '@playwright/test'

test('public navigation exposes every section on narrow screens and supports Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/guides/echo-guia-overwatch-burst-vertical')
  const nav = page.getByRole('navigation', { name: 'Navegación pública', exact: true })
  const toggle = nav.getByRole('button', { name: 'Abrir navegación' })
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(nav.getByRole('link', { name: 'Mapas', exact: true })).toBeHidden()
  await toggle.click()
  await expect(nav.getByRole('button', { name: 'Cerrar navegación' })).toHaveAttribute('aria-expanded', 'true')
  for (const label of ['Héroes', 'Guías', 'Composiciones', 'Pick Lab', 'Mapas', 'Noticias', 'Expertos', 'Discord', 'ENTRAR']) {
    const link = nav.getByRole('link', { name: label, exact: true })
    await expect(link).toBeVisible()
    const box = await link.boundingBox()
    expect(box?.x).toBeGreaterThanOrEqual(0)
    expect((box?.x || 0) + (box?.width || 0)).toBeLessThanOrEqual(390)
  }
  await nav.getByRole('link', { name: 'Mapas', exact: true }).focus()
  await page.keyboard.press('Escape')
  await expect(toggle).toBeFocused()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await toggle.click()
  await nav.getByRole('link', { name: 'Mapas', exact: true }).click()
  await expect(page).toHaveURL(/\/maps$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Abrir navegación' })).toHaveAttribute('aria-expanded', 'false')
})

test('guide text and publication details remain legible on dark surfaces', async ({ page }) => {
  await page.goto('/guides/echo-guia-overwatch-burst-vertical')
  const colors = await page.locator('.guide-detail-main').evaluate(article => {
    return {
      text: getComputedStyle(article.querySelector('header p')!).color,
      details: getComputedStyle(article.querySelector('header div:last-child')!).color,
    }
  })
  // WCAG contrast over the darkest and lightest article surfaces (#0a0a0a/#1a1a1a).
  function luminance(rgb: string) {
    const channels = rgb.match(/[\d.]+/g)!.slice(0, 3).map(channel => Number(channel) / 255)
      .map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
  }
  for (const foreground of Object.values(colors)) {
    for (const background of ['rgb(10, 10, 10)', 'rgb(26, 26, 26)']) {
      expect((luminance(foreground) + 0.05) / (luminance(background) + 0.05)).toBeGreaterThanOrEqual(4.5)
    }
  }
  await expect(page.locator('.guide-detail-main')).toContainText('min de lectura · Con vídeo')
})

test('review mode verifies ownership without executing ad code', async ({ page }) => {
  const adRequests: string[] = []
  page.on('request', request => {
    if (request.url().includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')) adRequests.push(request.url())
  })
  await page.goto('/guides/como-mejorar-en-overwatch', { waitUntil: 'networkidle' })
  await expect(page.locator('meta[name="google-adsense-account"]')).toHaveAttribute('content', 'ca-pub-1234567890123456')
  await expect(page.locator('ins.adsbygoogle, .ad-slot, #adsense-script')).toHaveCount(0)
  expect(adRequests).toEqual([])
})
