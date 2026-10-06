import { expect, test } from '@playwright/test'

for (const path of ['/dashboard', '/expert/dashboard', '/admin', '/profile', '/orders/00000000-0000-0000-0000-000000000000/submit']) {
  test(`anonymous navigation to ${path} requires login`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(path)
    await expect(page).toHaveURL(new RegExp('/login\\?next='))
    await expect(page.getByRole('heading', { name: 'ACCEDE A TU CUENTA', exact: true })).toBeVisible()
    expect(new URL(page.url()).searchParams.get('next')).toBe(path)
    await expect(page.locator('.ad-slot, ins.adsbygoogle')).toHaveCount(0)
    await expect(page.locator('.public-footer')).toHaveCount(0)
    expect(errors).toEqual([])
  })
}

for (const path of ['/api/checkout', '/api/stripe/connect/onboard', '/api/orders/00000000-0000-0000-0000-000000000000/submit', '/api/orders/00000000-0000-0000-0000-000000000000/refund']) {
  test(`anonymous POST ${path} is rejected before processing a payload`, async ({ request }) => {
    const response = await request.post(path, { data: {} })
    expect(response.status()).toBe(401)
    expect(await response.json()).toHaveProperty('error')
  })
}
