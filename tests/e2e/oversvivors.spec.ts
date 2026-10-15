import { expect, test, type Frame, type Page } from '@playwright/test'

test.use({ launchOptions: { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } })

type GameState = {
  scene: string; paused: boolean; hero?: string; x?: number; y?: number;
  health?: number; kills?: number; time?: number; ended?: boolean; duration?: number;
  master_volume: number; map?: string;
  art?: string; art_frame?: number; art_facing?: number;
}

const state = (frame: Frame) => frame.evaluate(() => (window as Window & { oversvivorsState?: GameState }).oversvivorsState)

async function loadGame(page: Page) {
  await page.goto('/arcade/oversvivors')
  await page.getByRole('button', { name: 'JUGAR GRATIS' }).click()
  await expect(page.locator('iframe')).toBeVisible()
  const frame = await page.locator('iframe').contentFrame()
  await frame.locator('#loading').waitFor({ state: 'hidden', timeout: 60_000 })
  const game = page.frames().find(item => item.url().includes('/games/oversvivors/index.html'))!
  await expect.poll(async () => (await state(game))?.scene).toBe('MainMenu')
  await expect(page.getByText('ARENA LISTA', { exact: true })).toBeVisible()
  return game
}

test('arcade is public, responsive, and downloads the engine only when requested', async ({ page }) => {
  const engines: string[] = []
  page.on('request', request => { if (request.url().endsWith('.wasm')) engines.push(request.url()) })
  await page.goto('/arcade/oversvivors')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('OVERSVIVORS.')
  await expect(page.getByRole('button', { name: 'JUGAR GRATIS' })).toBeVisible()
  await expect(page.getByText('Pensado para ordenador', { exact: false })).toBeVisible()
  expect(engines).toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

const heroes = [
  { name: 'Spectra', x: 413, y: 421, map: 'Ruined Moonlit Forest' },
  { name: 'Glacier', x: 616, y: 421, map: 'Ruined Moonlit Forest' },
  { name: 'Viper', x: 850, y: 421, map: 'Ruined Moonlit Forest' },
  { name: 'Ranger', x: 540, y: 639, map: 'Ashen Foundry' },
  { name: 'Scramble', x: 747, y: 639, map: 'Ashen Foundry' },
]

for (const hero of heroes) {
  test(`${hero.name} can enter ${hero.map}, move, use abilities and pause`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.startsWith('mobile'), 'The current game requires a keyboard and mouse.')
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    const frame = await loadGame(page)
    const canvas = frame.locator('canvas')
    await canvas.focus()
    await page.keyboard.press('Enter')
    await expect.poll(async () => (await state(frame))?.scene).toBe('HeroSelect')
    const size = (await canvas.boundingBox())!
    if (hero.map === 'Ashen Foundry') await canvas.click({ position: { x: size.width * 735 / 1280, y: size.height * 215 / 720 } })
    await canvas.click({ position: { x: size.width * hero.x / 1280, y: size.height * hero.y / 720 } })
    await expect.poll(async () => (await state(frame))?.hero).toBe(hero.name)
    expect((await state(frame))?.duration).toBe(600)
    expect((await state(frame))?.map).toBe(hero.map)
    const before = (await state(frame))!
    await page.keyboard.down('KeyD')
    await expect.poll(async () => (await state(frame))!.x! - before.x!).toBeGreaterThan(80)
    if (['Ranger', 'Viper', 'Scramble'].includes(hero.name)) {
      expect((await state(frame))?.art).toContain('walk-v2.png')
      await expect.poll(async () => ((await state(frame))?.art_frame ?? 0) % 4).toBeGreaterThan(0)
    }
    await page.keyboard.up('KeyD')
    await page.keyboard.press('Shift')
    await page.keyboard.press('KeyE')
    if (hero.name === 'Viper') {
      await canvas.click({ position: { x: size.width * .75, y: size.height * .5 } })
    }
    await page.keyboard.press('Escape')
    await expect.poll(async () => (await state(frame))?.paused).toBe(true)
    const pausedTime = (await state(frame))!.time!
    await page.waitForTimeout(1200)
    await expect.poll(async () => (await state(frame))?.time).toBe(pausedTime)
    await page.screenshot({ path: testInfo.outputPath(`${hero.name}-pause.png`) })
    await page.keyboard.press('Escape')
    await expect.poll(async () => (await state(frame))?.paused).toBe(false)
    await expect.poll(async () => (await state(frame))!.time!).toBeGreaterThan(pausedTime)
    await page.screenshot({ path: testInfo.outputPath(`${hero.name}-run.png`) })
    expect(errors).toEqual([])
  })
}

test('fullscreen has a visible exit and preserves the running game', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith('mobile'), 'Desktop fullscreen controls.')
  const frame = await loadGame(page)
  await frame.locator('canvas').focus()
  await page.keyboard.press('Enter')
  await expect.poll(async () => (await state(frame))?.scene).toBe('HeroSelect')
  await page.keyboard.press('Enter')
  await expect.poll(async () => (await state(frame))?.scene).toBe('main')
  const before = (await state(frame))!
  await page.getByRole('button', { name: 'PANTALLA COMPLETA', exact: false }).click()
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true)
  const exit = page.getByRole('button', { name: 'SALIR DE PANTALLA COMPLETA' })
  await expect(exit).toBeVisible()
  await exit.click()
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false)
  await expect(exit).not.toBeVisible()
  await expect.poll(async () => (await state(frame))?.scene).toBe('main')
  expect((await state(frame))?.hero).toBe(before.hero)
  expect((await state(frame))?.time).toBeGreaterThanOrEqual(before.time!)
})

test('losing focus pauses combat and master volume persists after reload', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith('mobile'), 'Desktop controls.')
  const frame = await loadGame(page)
  const canvas = frame.locator('canvas')
  await canvas.focus()
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  const size = (await canvas.boundingBox())!
  // The first audio slider is keyboard accessible in the Godot options menu.
  await canvas.click({ position: { x: size.width * .5, y: size.height * .436 } })
  await page.keyboard.press('Home')
  await expect.poll(async () => (await state(frame))?.master_volume).toBeLessThan(.01)
  // Godot's virtual filesystem flushes to IndexedDB asynchronously.
  await page.waitForTimeout(2500)
  await page.reload()
  await page.getByRole('button', { name: 'JUGAR GRATIS' }).click()
  await page.frameLocator('iframe').locator('#loading').waitFor({ state: 'hidden', timeout: 60_000 })
  const reloaded = page.frames().find(item => item.url().includes('/games/oversvivors/index.html'))!
  await expect.poll(async () => (await state(reloaded))?.master_volume, { timeout: 60_000 }).toBeLessThan(.01)
  await reloaded.locator('canvas').focus()
  await page.keyboard.press('Enter')
  await expect.poll(async () => (await state(reloaded))?.scene).toBe('HeroSelect')
  await page.keyboard.press('Enter')
  await expect.poll(async () => (await state(reloaded))?.scene).toBe('main')
  await page.getByRole('button', { name: 'PANTALLA COMPLETA' }).focus()
  await expect.poll(async () => (await state(reloaded))?.paused).toBe(true)
})
