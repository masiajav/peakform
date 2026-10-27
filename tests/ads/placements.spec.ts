import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // Never send impressions or load Google in an automated test.
  await page.route(/googlesyndication\.com|doubleclick\.net|fundingchoicesmessages\.google\.com/, route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }))
})

for (const path of ['/guides/como-mejorar-en-overwatch', '/deadlock/builds/abrams']) {
  test(`same approved placements without a video: ${path}`, async ({ page, isMobile }) => {
    await page.goto(path)
    await expect(page.locator('[data-ad-slot="guide-after-summary"]')).toBeVisible()
    await expect(page.locator('[data-ad-slot="guide-after-video"]')).toHaveCount(0)
    await expect(page.locator('[data-ad-slot="guide-sidebar-rectangle"]')).toHaveCount(isMobile ? 0 : 1)
    const slotIds = await page.locator('ins.adsbygoogle').evaluateAll(nodes => nodes.map(node => node.getAttribute('data-ad-slot')))
    expect(slotIds.sort()).toEqual((isMobile ? ['1111111111'] : ['1111111111', '3333333333']).sort())
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
    await page.screenshot({ path: `reports/ads-placements/${isMobile ? 'mobile' : 'desktop'}-${path.startsWith('/deadlock') ? 'deadlock' : 'overwatch'}.png`, fullPage: true })
  })
}

test('both catalogues stay free of ad requests and empty ad space', async ({ page }) => {
  for (const path of ['/guides', '/deadlock/builds']) {
    await page.goto(path)
    await expect(page.locator('ins.adsbygoogle')).toHaveCount(0)
    await expect(page.locator('.ad-slot')).toHaveCount(0)
    await expect(page.locator('#adsense-script')).toHaveCount(0)
  }
})
