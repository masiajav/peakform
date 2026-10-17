import { expect, test } from '@playwright/test'

test('expert directory explains the price and service scope with matching visible FAQ', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  const response = await page.goto('/experts')
  expect(response?.status()).toBe(200)
  await expect(page.locator('main')).toHaveCount(1)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /precio con comisión/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/experts')
  const blocks = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(block => JSON.parse(block))
  const faq = blocks.find(block => block['@type'] === 'FAQPage')
  expect(faq.mainEntity).toHaveLength(6)
  for (const details of await page.locator('main details').all()) await details.locator('summary').click()
  const text = await page.locator('main').innerText()
  for (const item of faq.mainEntity) {
    expect(text).toContain(item.name)
    expect(text).toContain(item.acceptedAnswer.text)
  }
  expect(text).not.toMatch(/partida completa|verificados|estamos verificando a los primeros/i)
  for (const summary of await page.locator('[data-expert-price]').all()) {
    const priceText = await summary.innerText()
    expect(priceText).toMatch(/Incluye el 20% de comisión|Pedidos pausados|Prueba disponible|Sin ofertas activas/)
  }
  const colors = await page.locator('main').evaluate(element => ({
    background: getComputedStyle(element.closest('[class]')!).getPropertyValue('--surface').trim(),
    textColors: Array.from(element.querySelectorAll('p,[data-expert-price],[data-expert-price] strong')).map(text => getComputedStyle(text).color),
  }))
  const luminance = (channels: number[]) => channels.map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0)
  expect(colors.background).toMatch(/^#[a-f0-9]{6}$/i)
  const background = luminance(colors.background.slice(1).match(/../g)!.map(value => parseInt(value, 16)))
  for (const color of colors.textColors) {
    const foreground = luminance(color.match(/[\d.]+/g)!.slice(0, 3).map(Number))
    expect((foreground + .05) / (background + .05), color).toBeGreaterThanOrEqual(4.5)
  }
  await expect(page.getByRole('link', { name: 'Empezar con el cuaderno de VOD gratuito' })).toHaveAttribute('href', '/guides/review-vod-overwatch-espanol#cuaderno-vod')
  await expect(page.locator('ins.adsbygoogle,.ad-slot,script[src*="adsbygoogle"]')).toHaveCount(0)
  expect(errors).toEqual([])
})

test('expert cards and filters remain usable down to a 320px viewport', async ({ page }) => {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/experts')
    await expect(page.locator('h1')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    const background = await page.locator('body').evaluate(element => getComputedStyle(element).backgroundColor)
    expect(background).not.toBe('rgb(255, 255, 255)')
    await page.screenshot({ path: `reports/expert-directory/${test.info().project.name}-${width}.png`, fullPage: true })
    await page.screenshot({ path: `reports/expert-directory/${test.info().project.name}-${width}-viewport.png` })
  }
  await page.getByRole('link', { name: 'Support', exact: true }).click()
  await expect(page).toHaveURL(/\/experts\?role=support$/)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/experts')
})
