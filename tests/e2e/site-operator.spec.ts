import { expect, test } from '@playwright/test'
import { SITE_OPERATOR, TRUST_REVIEW_DATE } from '../../src/lib/site-operator'

for (const route of ['/legal', '/privacy']) {
  test(`${route} identifies the authorised operator without activating ads`, async ({ page, request }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
    const main = page.locator('main')
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(main).toContainText(SITE_OPERATOR.name)
    await expect(main).toContainText(SITE_OPERATOR.address)
    await expect(main).toContainText(SITE_OPERATOR.publicName)
    await expect(main.locator(`a[href="mailto:${SITE_OPERATOR.email}"]`).first()).toBeVisible()
    await expect(main.locator('time').first()).toHaveAttribute('datetime', TRUST_REVIEW_DATE)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com${route}`)
    await expect(page.locator('.ad-slot, ins.adsbygoogle, script[src*="pagead2"]')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    const linkDecorations = await main.locator('p a').evaluateAll(links => links.map(link => getComputedStyle(link).textDecorationLine))
    expect(linkDecorations.length).toBeGreaterThan(0)
    expect(linkDecorations.every(value => value.includes('underline'))).toBe(true)
    expect(errors).toEqual([])
    const sitemap = await (await request.get('/sitemap.xml')).text()
    const entry = sitemap.match(new RegExp(`<url>\\s*<loc>https://www\\.replaidlab\\.com${route}</loc>[\\s\\S]*?</url>`))?.[0]
    expect(entry).toContain(`<lastmod>${TRUST_REVIEW_DATE}`)
    await page.screenshot({ path: `reports/trust-operator/${route.slice(1)}-${test.info().project.name}.png` })
  })
}
