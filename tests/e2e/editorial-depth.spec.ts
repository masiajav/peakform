import { test, expect } from '@playwright/test'

test('builds and counters expose readable purchases, limits and FAQ', async ({ page }) => {
  for (const path of ['/deadlock/builds/abrams', '/deadlock/counters/haze']) {
    await page.goto(path)
    await expect(page.getByRole('columnheader', { name: 'Almas', exact: true })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Límite', exact: true })).toBeVisible()
    await expect(page.locator('.game-data-table').last()).toContainText('3200')
    const question = page.locator('.game-faq').first()
    await question.locator('summary').click()
    await expect(question.locator('p')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
    const text = await page.locator('main').innerText()
    expect(text).not.toMatch(/tarea de Codex|propuesta editorial|contenido automatizado|revisión de fundamentos/i)
    await expect(page.locator('.game-sources summary')).toHaveText('Referencias')
  }
})

test('published learning guides are discoverable with preserved hero links', async ({ page, request }) => {
  await page.goto('/deadlock/guides?q=resistencias')
  await page.locator('.game-content-card').filter({ hasText: 'Daño y resistencias' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Daño y resistencias')
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Counters de Infernus: cómo responder' })).toBeVisible()
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).toContain('/deadlock/guides/dano-resistencias')
  expect(sitemap).toContain('/deadlock/guides/composiciones-sinergias')
})

test('Deadlock landing keeps a bounded hero selection and direct learning entry points', async ({ page }) => {
  await page.goto('/deadlock')
  await expect(page.locator('.game-featured-heroes .game-content-card')).toHaveCount(6)
  await expect(page.locator('.game-featured-heroes img')).toHaveCount(6)
  await expect(page.getByRole('link', { name: 'Todas las guías', exact: false })).toHaveAttribute('href', '/deadlock/guides')
  await expect(page.getByRole('heading', { name: 'Noticias y parches', exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'Ver todos los héroes', exact: false }).click()
  await expect(page).toHaveURL(/\/deadlock\/heroes$/)
  expect(await page.locator('.game-content-card').count()).toBeGreaterThan(6)
})

for (const [alias, name, slug] of [
  ['Kelvin', 'Kelvin', 'kelvin'], ['Bebop', 'Bebop', 'bebop'], ['Ivy', 'Hiedra', 'ivy'],
  ['Warden', 'Guardia', 'warden'], ['Viscous', 'Viscoso', 'viscous'],
  ['Vindicta', 'Vindicta', 'vindicta'], ['Lady Geist', 'Lady Geist', 'lady-geist'],
  ['Wraith', 'Espectro', 'wraith'], ['McGinnis', 'McGinnis', 'mcginnis'], ['Paradox', 'Paradoja', 'paradox'],
  ['Holliday', 'Holliday', 'holliday'], ['Calico', 'Calico', 'calico'],
  ['Grey Talon', 'Garra Gris', 'grey-talon'], ['Shiv', 'El Navajas', 'shiv'], ['Yamato', 'Yamato', 'yamato'],
]) {
  test(`${alias} is searchable and has connected hero, counter and build pages`, async ({ page }) => {
    await page.goto(`/deadlock/heroes?q=${encodeURIComponent(alias)}`)
    await expect(page.locator('.game-content-card')).toHaveCount(1)
    await page.locator('.game-content-card').click()
    await expect(page.getByRole('heading', { level: 1 })).toContainText(name)
    await page.getByRole('link', { name: 'Cómo responder a este héroe', exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/deadlock/counters/${slug}$`))
    await page.getByRole('link', { name: 'Build y compras', exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/deadlock/builds/${slug}$`))
    await expect(page.getByRole('table')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
  })
}
