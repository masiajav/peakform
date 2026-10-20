import { expect, test } from '@playwright/test'

function luminance(rgb: string) {
  const values = rgb.match(/[\d.]+/g)!.slice(0, 3).map(value => Number(value) / 255)
    .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722
}

for (const { path, selector } of [
  { path: '/news/nueva-navegacion-y-herramientas-para-mejorar-en-overwatch', selector: '.announcement-meta' },
  { path: '/news/nueva-navegacion-y-herramientas-para-mejorar-en-overwatch', selector: '.announcement-breadcrumb' },
  { path: '/maps', selector: '.map-catalog-heading > span' },
  { path: '/maps/kings-row', selector: '.map-breadcrumb' },
]) {
  test(`${path} ${selector} remains legible on its dark surface`, async ({ page }) => {
    await page.goto(path)
    const colors = await page.locator(selector).evaluate(element => ({
      foreground: getComputedStyle(element).color,
      background: getComputedStyle(document.body).backgroundColor,
    }))
    const foreground = luminance(colors.foreground)
    const background = luminance(colors.background)
    expect((Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05)).toBeGreaterThanOrEqual(4.5)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  })
}
