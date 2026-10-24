import { expect, test } from '@playwright/test'

const endpoint = '**/api/community/kick-status'
const status = (state: 'live' | 'offline' | 'unknown') => ({ channel: 'ivajpro', status: state,
  streamId: state === 'live' ? '1234' : null, title: state === 'live' ? 'Deadlock con la comunidad' : null,
  checkedAt: new Date().toISOString(),
})
const label = 'Estado de ivajpro en Kick'

for (const state of ['live', 'offline'] as const) {
  test(`${state} state is visual at the top of the entry page and both games`, async ({ page, isMobile }) => {
    if (isMobile && state === 'offline') await page.setViewportSize({ width: 320, height: 844 })
    await page.route(endpoint, route => route.fulfill({ json: status(state) }))
    for (const path of ['/', '/overwatch', '/deadlock']) {
      await page.goto(path)
      const bar = page.getByRole('status', { name: label })
      await expect(bar).toBeVisible()
      await expect(bar.getByText(state === 'live' ? 'ONLINE' : 'OFFLINE', { exact: true })).toBeVisible()
      await expect(bar.getByRole('link')).toHaveAttribute('href', 'https://kick.com/ivajpro')
      expect((await bar.boundingBox())?.y).toBeLessThan(2)
      const navBox = await page.getByRole('navigation', { name: 'Navegación pública', exact: true }).boundingBox()
      expect(navBox?.y).toBeGreaterThanOrEqual((await bar.boundingBox())!.height)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
    }
  })
}

test('an open page updates ONLINE and OFFLINE without reloading', async ({ page }) => {
  await page.clock.install()
  let state: 'live' | 'offline' | 'unknown' = 'offline'
  await page.route(endpoint, route => route.fulfill({ json: status(state) }))
  await page.goto('/deadlock')
  const bar = page.getByRole('status', { name: label })
  await expect(bar.getByText('OFFLINE', { exact: true })).toBeVisible()
  state = 'live'
  await page.clock.fastForward(61_000)
  await expect(bar.getByText('ONLINE', { exact: true })).toBeVisible()
  await expect(bar).toContainText('Ver directo')
  state = 'offline'
  await page.clock.fastForward(61_000)
  await expect(bar.getByText('OFFLINE', { exact: true })).toBeVisible()
  await expect(bar).toContainText('Ver canal')
  state = 'unknown'
  await page.clock.fastForward(61_000)
  await expect(bar.getByText('NO DISPONIBLE', { exact: true })).toBeVisible()
  await expect(bar.getByText('OFFLINE', { exact: true })).toHaveCount(0)
})

test('a failed check never leaves ONLINE or invents OFFLINE', async ({ page }) => {
  await page.clock.install()
  let failing = false
  await page.route(endpoint, route => route.fulfill(failing ? { status: 502, body: 'unavailable' } : { json: status('live') }))
  await page.goto('/deadlock')
  const bar = page.getByRole('status', { name: label })
  await expect(bar.getByText('ONLINE', { exact: true })).toBeVisible()
  failing = true
  await page.clock.fastForward(61_000)
  await expect(bar.getByText('NO DISPONIBLE', { exact: true })).toBeVisible()
  await expect(bar.getByText('ONLINE', { exact: true })).toHaveCount(0)
  await expect(bar.getByText('OFFLINE', { exact: true })).toHaveCount(0)
})

test('hidden tabs pause checks and refresh the status on return', async ({ page }) => {
  await page.clock.install()
  let calls = 0
  await page.route(endpoint, route => { calls++; return route.fulfill({ json: status('live') }) })
  await page.goto('/deadlock')
  const bar = page.getByRole('status', { name: label })
  await expect(bar.getByText('ONLINE', { exact: true })).toBeVisible()
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(bar.getByText('COMPROBANDO', { exact: true })).toBeVisible()
  const previous = calls
  await page.clock.fastForward(61_000)
  expect(calls).toBe(previous)
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect.poll(() => calls).toBeGreaterThan(previous)
  await expect(bar.getByText('ONLINE', { exact: true })).toBeVisible()
})

test('private pages do not show or poll the public channel status', async ({ page }) => {
  let calls = 0
  await page.route(endpoint, route => { calls++; return route.fulfill({ json: status('live') }) })
  await page.goto('/login')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('status', { name: label })).toHaveCount(0)
  expect(calls).toBe(0)
})

test('production status endpoint can confirm the real Kick channel', async ({ request }) => {
  const response = await request.get('/api/community/kick-status')
  expect(response.ok()).toBe(true)
  const data = await response.json()
  expect(data.channel).toBe('ivajpro')
  expect(['live', 'offline']).toContain(data.status)
  expect(response.headers()['x-robots-tag']).toBe('noindex')
})
