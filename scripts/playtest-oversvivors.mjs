import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const base = process.env.ARCADE_BASE_URL || 'http://127.0.0.1:3088'
const heroInput = process.env.ARCADE_PLAYTEST_HERO || 'Tracer'
const hero = { Spectra: 'Tracer', Glacier: 'Mei', Viper: 'Widowmaker', Ranger: 'Cassidy', Scramble: 'Junkrat' }[heroInput] || heroInput
const arena = process.env.ARCADE_PLAYTEST_MAP || 'Ruined Moonlit Forest'
const wallLimit = Number(process.env.ARCADE_PLAYTEST_WALL_SECONDS || 780) * 1000
const output = path.resolve('reports', 'oversvivors-playtests', `playtest-${hero.toLowerCase()}-${Date.now()}`)
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-background-timer-throttling'] })
const page = await browser.newPage({ viewport: { width: 1280, height: 1100 } })
const errors = []
page.on('pageerror', error => errors.push(error.message))
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
const report = { base, hero, arena, controlsOnly: true, samples: [], errors, outcome: 'not_started' }
const held = new Set()

try {
  const response = await page.request.get(`${base}/games/oversvivors/build.json`)
  report.build = await response.json()
  await page.goto(`${base}/arcade/oversvivors`)
  await page.getByRole('button', { name: 'JUGAR GRATIS' }).click()
  await page.frameLocator('iframe').locator('#loading').waitFor({ state: 'hidden', timeout: 60000 })
  const frame = page.frames().find(item => item.url().includes('/games/oversvivors/index.html'))
  const canvas = frame.locator('canvas')
  const state = () => frame.evaluate(() => window.oversvivorsState)
  const waitFor = async predicate => {
    const end = Date.now() + 20000
    while (Date.now() < end) {
      const value = await state()
      if (value && predicate(value)) return value
      await page.waitForTimeout(100)
    }
    throw new Error('Game state transition timed out')
  }
  await canvas.focus()
  await waitFor(s => s.scene === 'MainMenu')
  await page.keyboard.press('Enter')
  const selection = await waitFor(s => s.scene === 'HeroSelect' && s.hero_buttons)
  const box = await canvas.boundingBox()
  const map = selection.map_buttons.find(item => item.name === arena)
  if (!map) throw new Error(`Arena not found: ${arena}`)
  await canvas.click({ position: { x: box.width * map.x, y: box.height * map.y } })
  const pick = selection.hero_buttons.find(item => item.name === hero)
  if (!pick) throw new Error(`Hero not found: ${hero}`)
  await canvas.click({ position: { x: box.width * pick.x, y: box.height * pick.y } })
  await waitFor(s => s.scene === 'main')
  const priority = ['double_tap', 'piercing', 'rapid_fire', 'phase_echo', 'blink_bomb', 'temporal_shield', 'extra_shard', 'shard_damage', 'cryo_damage', 'rime_burst', 'extra_grenade', 'burning_fuse', 'marksman', 'quick_scope', 'cold_shot', 'hollow_point', 'ricochet_rounds', 'last_stand', 'rolling_burst', 'swift_spurs', 'swift_skate', 'swiftness', 'vitality', 'iron_core', 'iron_will']
  let lastBucket = -1
  let lastShot = -10
  let stuckSince = Date.now()
  let previousPosition = { x: 0, y: 0 }
  const started = Date.now()
  const fps = []
  let snapshot
  while (Date.now() - started < wallLimit) {
	if (errors.length) throw new Error(errors.join('\n'))
    const s = await state()
    snapshot = s
    if (s.ended) { report.outcome = s.result || (s.hero ? 'ended' : 'DEFEAT'); break }
    if (s.upgrades_queued) {
      const choices = s.offered_upgrades || []
      const ranks = choices.map(id => priority.includes(id) ? priority.indexOf(id) : 999)
      const choice = ranks.length ? ranks.indexOf(Math.min(...ranks)) : 0
      await page.keyboard.press(`Digit${choice + 1}`)
      await page.waitForTimeout(250)
      continue
    }
    if (s.paused) { await canvas.focus(); await page.keyboard.press('Escape'); await page.waitForTimeout(250); continue }
    if (s.time > 90) fps.push(s.fps)
    const bucket = Math.floor(s.time / 30)
    if (bucket !== lastBucket) {
      lastBucket = bucket
      const sample = { time: s.time, health: s.health, level: s.level, kills: s.kills, captures: s.captures, enemies: s.enemy_count, fps: s.fps, drawCalls: s.draw_calls, processMs: s.process_ms, physicsMs: s.physics_ms }
      report.samples.push(sample)
      console.log('BROWSER_PLAYTEST', JSON.stringify(sample))
      if ([0, 2, 10, 19].includes(bucket)) await page.screenshot({ path: path.join(output, `minute-${bucket / 2}.png`) })
    }
    const enemies = s.nearby_enemies || []
    let goal = s.point_active ? { x: s.point_x, y: s.point_y } : s.nearest_orb || { x: Math.cos(s.time * .035) * 600, y: Math.sin(s.time * .035) * 600 }
    if (s.health < s.max_health * .7) {
      const pack = (s.health_packs || []).find(item => item.cooldown <= 0 && Math.hypot(item.x - s.x, item.y - s.y) < 500)
      if (pack) goal = pack
    }
    if (Math.hypot(s.x - previousPosition.x, s.y - previousPosition.y) > 6) stuckSince = Date.now()
    previousPosition = { x: s.x, y: s.y }
    let direction = { x: 0, y: 0 }
    let highest = -Infinity
    for (let i = 0; i < 9; i++) {
      const candidate = i < 8 ? { x: Math.cos(i * Math.PI / 4), y: Math.sin(i * Math.PI / 4) } : { x: 0, y: 0 }
      const future = { x: s.x + candidate.x * 115, y: s.y + candidate.y * 115 }
      let score = -Math.hypot(future.x - goal.x, future.y - goal.y) * .15
      if (i < 8 && s.clear_directions?.[i] === false) score -= 500
      for (const enemy of enemies) {
        const distance = Math.hypot(future.x - enemy.x - enemy.vx * .25, future.y - enemy.y - enemy.vy * .25)
        if (distance < 190) score -= (190 - distance) * 2.3
      }
      for (const shot of s.projectiles || []) {
        const vx = shot.vx * .55, vy = shot.vy * .55
        const ratio = Math.max(0, Math.min(1, ((future.x - shot.x) * vx + (future.y - shot.y) * vy) / (vx * vx + vy * vy || 1)))
        const miss = Math.hypot(future.x - shot.x - vx * ratio, future.y - shot.y - vy * ratio)
        if (miss < 45) score -= (45 - miss) * 10
      }
      for (const hazard of s.hazards || []) if (Math.hypot(future.x - hazard.x, future.y - hazard.y) < hazard.radius + 20) score -= 450
      if (Date.now() - stuckSince > 800) score += Math.sin(s.time * 3 + i) * 80
      if (score > highest) { highest = score; direction = candidate }
    }
    const keys = new Set()
    if (direction.x > .1) keys.add('KeyD')
    if (direction.x < -.1) keys.add('KeyA')
    if (direction.y > .1) keys.add('KeyS')
    if (direction.y < -.1) keys.add('KeyW')
    for (const key of held) if (!keys.has(key)) { await page.keyboard.up(key); held.delete(key) }
    for (const key of keys) if (!held.has(key)) { await page.keyboard.down(key); held.add(key) }
    const nearest = enemies[0]
    const distance = nearest ? Math.hypot(nearest.x - s.x, nearest.y - s.y) : Infinity
    if (hero === 'Widowmaker' && nearest) {
      const targetX = nearest.x + nearest.vx * .15
      const targetY = nearest.y + nearest.vy * .15
      await page.mouse.move(box.x + box.width * (.5 + (targetX - s.camera_x) * s.zoom / s.viewport_width), box.y + box.height * (.5 + (targetY - s.camera_y) * s.zoom / s.viewport_height))
      if (lastShot < 0) { await page.mouse.down(); lastShot = s.time }
    }
    if (s.ultimate_ready && distance < 550) await page.keyboard.press('KeyQ')
    if (hero === 'Tracer') {
      if (distance < 85) await page.keyboard.press('Shift')
      if (s.health < s.max_health * .75) await page.keyboard.press('KeyE')
    } else if (hero === 'Mei') {
      if (!s.cryo_active && (distance < 130 || s.health < s.max_health * .75)) await page.keyboard.press('Shift')
      if (distance < 170) await page.keyboard.press('KeyE')
    } else {
      if (hero === 'Cassidy' && distance < 120) await page.keyboard.press('Shift')
      if (hero !== 'Cassidy' || distance < 350) await page.keyboard.press('KeyE')
      if (hero === 'Junkrat') await page.keyboard.press('Shift')
    }
    await page.waitForTimeout(140)
  }
  for (const key of held) await page.keyboard.up(key)
  if (hero === 'Widowmaker') await page.mouse.up()
  report.final = snapshot
  report.wallSeconds = (Date.now() - started) / 1000
  fps.sort((a, b) => a - b)
  report.fpsAfter90Seconds = { count: fps.length, median: fps[Math.floor(fps.length * .5)], tenthPercentile: fps[Math.floor(fps.length * .1)] }
  if (report.outcome === 'not_started') report.outcome = 'wall_limit'
  await page.screenshot({ path: path.join(output, 'final.png') })
  if (snapshot?.ended) {
    const earned = snapshot.mastery
    await page.waitForTimeout(2500)
    if (report.outcome === 'VICTORY') await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    const restarted = await waitFor(s => s.scene === 'main' && !s.ended && s.time < 5)
    if (restarted.hero !== hero || restarted.map !== arena) throw new Error('Retry changed the hero or arena')
    report.retryVerified = { hero: restarted.hero, arena: restarted.map, time: restarted.time }
    await page.reload()
    await page.getByRole('button', { name: 'JUGAR GRATIS' }).click()
    await page.frameLocator('iframe').locator('#loading').waitFor({ state: 'hidden', timeout: 60000 })
    const reloaded = page.frames().find(item => item.url().includes('/games/oversvivors/index.html'))
    await reloaded.locator('canvas').focus()
    await page.keyboard.press('Enter')
    await reloaded.waitForFunction(() => window.oversvivorsState?.scene === 'HeroSelect')
    const reloadedSelection = await reloaded.evaluate(() => window.oversvivorsState)
    const reloadedMap = reloadedSelection.map_buttons.find(item => item.name === arena)
    const reloadedCanvas = reloaded.locator('canvas')
    const reloadedBox = await reloadedCanvas.boundingBox()
    await reloadedCanvas.click({ position: { x: reloadedBox.width * reloadedMap.x, y: reloadedBox.height * reloadedMap.y } })
    await reloaded.waitForFunction(({ name, count }) => window.oversvivorsState?.hero_buttons?.find(item => item.name === name)?.medals === count, { name: hero, count: earned.count })
    report.masteryAfterReload = { earned, total: await reloaded.evaluate(() => window.oversvivorsState.mastery_total), heroMedals: await reloaded.evaluate(name => window.oversvivorsState.hero_buttons.find(item => item.name === name).medals, hero) }
  }
} catch (error) {
  report.outcome = 'error'
  errors.push(String(error))
  process.exitCode = 1
} finally {
  await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2))
  console.log('BROWSER_PLAYTEST_REPORT', path.join(output, 'report.json'), report.outcome)
  await browser.close()
  if (errors.length) process.exitCode = 1
}
