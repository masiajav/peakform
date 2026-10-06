import { expect, test } from '@playwright/test'

function luminance(rgb: string) {
  const channels = rgb.match(/[\d.]+/g)!.slice(0, 3).map(channel => Number(channel) / 255)
    .map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}

function contrast(foreground: string, background: string) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

for (const [label, path] of [
  ['home', '/'],
  ['legal', '/legal'],
  ['article', '/counters/sombra'],
]) {
  test(`${label}: footer text is legible and links fit on the current viewport`, async ({ page, request }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    expect((await page.goto(path))?.status()).toBe(200)
    const footer = page.locator('.public-footer')
    await footer.scrollIntoViewIfNeeded()
    await expect(footer).toBeVisible()
    const colors = await footer.evaluate(element => ({
      background: getComputedStyle(element).backgroundColor,
      texts: Array.from(element.querySelectorAll('a, p, strong, .public-footer-bottom'))
        .map(text => ({ label: text.textContent, color: getComputedStyle(text).color })),
    }))
    for (const text of colors.texts) expect(contrast(text.color, colors.background), text.label!).toBeGreaterThanOrEqual(4.5)
    const width = page.viewportSize()!.width
    for (const link of await footer.locator('a').all()) {
      const box = await link.boundingBox()
      expect(box).not.toBeNull()
      expect(box!.x).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width).toBeLessThanOrEqual(width)
    }
    for (const link of await footer.locator('.public-footer-column a').all()) {
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(width <= 760 ? 44 : 24)
    }
    for (const href of ['/about', '/contact', '/editorial-methodology', '/privacy', '/legal']) {
      await expect(footer.locator(`a[href="${href}"]`)).toHaveCount(1)
      expect((await request.get(href)).status(), href).toBe(200)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    await expect(page.locator('.ad-slot, ins.adsbygoogle, #adsense-script')).toHaveCount(0)
    expect(errors).toEqual([])
    await footer.screenshot({ path: `reports/public-footer/${label}-${test.info().project.name}.png` })
  })
}

test('footer legal link supports visible keyboard focus and navigation', async ({ page }) => {
  await page.goto('/')
  const footer = page.locator('.public-footer')
  await footer.scrollIntoViewIfNeeded()
  await footer.locator('a[href="/privacy"]').focus()
  await page.keyboard.press('Tab')
  const legal = footer.locator('a[href="/legal"]')
  await expect(legal).toBeFocused()
  const focus = await legal.evaluate(element => {
    const style = getComputedStyle(element)
    return { style: style.outlineStyle, width: parseFloat(style.outlineWidth), color: style.outlineColor }
  })
  expect(focus.style).toBe('solid')
  expect(focus.width).toBeGreaterThanOrEqual(2)
  const background = await footer.evaluate(element => getComputedStyle(element).backgroundColor)
  expect(contrast(focus.color, background)).toBeGreaterThanOrEqual(3)
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/legal$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('TÉRMINOS Y CONDICIONES')
})
