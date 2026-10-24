import { expect, test } from '@playwright/test'

const endpoint = '**/api/community/kick-status'
const status = (state: 'live' | 'offline' | 'unknown', streamId = '1234') => ({
  channel: 'ivajpro', status: state, streamId: state === 'live' ? streamId : null,
  title: state === 'live' ? 'Deadlock con la comunidad' : null, checkedAt: new Date().toISOString(),
})

test('live notice is available on the entry page and both games', async ({ page }) => {
  await page.route(endpoint, route => route.fulfill({ json: status('live') }))
  for (const path of ['/', '/overwatch', '/deadlock']) {
    await page.goto(path)
    const notice = page.getByRole('status', { name: 'Directo de ivajpro' })
    await expect(notice).toBeVisible()
    await expect(notice.getByRole('link')).toHaveAttribute('href', 'https://kick.com/ivajpro')
    await expect(notice).toContainText('Deadlock con la comunidad')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
  }
})

test('an open page detects start and end without a reload', async ({ page }) => {
  await page.clock.install()
  let state: 'live' | 'offline' | 'unknown' = 'offline'
  let calls = 0
  await page.route(endpoint, route => { calls++; return route.fulfill({ json: status(state) }) })
  await page.goto('/deadlock')
  await expect.poll(() => calls).toBeGreaterThan(0)
  const notice = page.getByRole('status', { name: 'Directo de ivajpro' })
  await expect(notice).toHaveCount(0)
  state = 'live'
  await page.clock.fastForward(61_000)
  await expect(notice).toBeVisible()
  state = 'offline'
  await page.clock.fastForward(61_000)
  await expect(notice).toHaveCount(0)
  state = 'live'
  await page.clock.fastForward(61_000)
  await expect(notice).toBeVisible()
  state = 'unknown'
  await page.clock.fastForward(61_000)
  await expect(notice).toHaveCount(0)
})

test('closing a stream persists for the visit and a new stream can appear', async ({ page }) => {
  let streamId = '1234'
  await page.route(endpoint, route => route.fulfill({ json: status('live', streamId) }))
  await page.goto('/deadlock')
  const notice = page.getByRole('status', { name: 'Directo de ivajpro' })
  await expect(notice).toBeVisible()
  await notice.getByRole('button', { name: 'Ocultar aviso del directo' }).click()
  await expect(notice).toHaveCount(0)
  await Promise.all([page.waitForResponse(response => response.url().includes('/api/community/kick-status')), page.reload()])
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(notice).toHaveCount(0)
  streamId = '5678'
  await page.reload()
  await expect(notice).toBeVisible()
})

test('failed checks hide a previously visible notice', async ({ page }) => {
  await page.clock.install()
  let failing = false
  await page.route(endpoint, route => route.fulfill(failing ? { status: 502, body: 'unavailable' } : { json: status('live') }))
  await page.goto('/deadlock')
  const notice = page.getByRole('status', { name: 'Directo de ivajpro' })
  await expect(notice).toBeVisible()
  failing = true
  await page.clock.fastForward(61_000)
  await expect(notice).toHaveCount(0)
})

test('hidden tabs pause checks and recheck before showing the notice again', async ({ page }) => {
  await page.clock.install()
  let calls = 0
  await page.route(endpoint, route => { calls++; return route.fulfill({ json: status('live') }) })
  await page.goto('/deadlock')
  const notice = page.getByRole('status', { name: 'Directo de ivajpro' })
  await expect(notice).toBeVisible()
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(notice).toHaveCount(0)
  const previousCalls = calls
  await page.clock.fastForward(61_000)
  expect(calls).toBe(previousCalls)
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect.poll(() => calls).toBeGreaterThan(previousCalls)
  await expect(notice).toBeVisible()
})

test('private pages do not poll or show a live notice', async ({ page }) => {
  let calls = 0
  await page.route(endpoint, route => { calls++; return route.fulfill({ json: status('live') }) })
  await page.goto('/login')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('status', { name: 'Directo de ivajpro' })).toHaveCount(0)
  expect(calls).toBe(0)
})

test('real server status can reach Kick and confirms a live or offline channel', async ({ request }) => {
  const response = await request.get('/api/community/kick-status')
  expect(response.ok()).toBe(true)
  const data = await response.json()
  expect(data.channel).toBe('ivajpro')
  expect(['live', 'offline']).toContain(data.status)
  expect(response.headers()['x-robots-tag']).toBe('noindex')
})
