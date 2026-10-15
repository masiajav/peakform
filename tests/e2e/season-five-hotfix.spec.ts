import { expect, test } from '@playwright/test'

const path = '/doctrine-support-sombra-roadhog-rework-overwatch'

test('October hotfix separates weapon, cooldown, health and armour changes', async ({ page, request }) => {
  expect((await page.goto(path))?.status()).toBe(200)
  await page.getByRole('link', { name: 'BALANCE DEL 13 DE OCTUBRE', exact: true }).click()
  await expect(page).toHaveURL(new RegExp(path + '#balance-13-octubre$'))
  const balance = page.getByRole('region', { name: 'Doctrine y Sombra bajan; Roadhog recupera fuerza', exact: true })
  await expect(balance.getByRole('heading', { level: 2 })).toBeVisible()
  const changes = balance.locator('.season-balance-changes li')
  await expect(changes).toHaveCount(5)
  await expect(changes.nth(0)).toContainText('de 60 a 55 de daño y curación')
  await expect(changes.nth(0)).toContainText('5 segundos en vez de 6')
  await expect(changes.nth(1)).toContainText('de 7 a 6,5')
  await expect(changes.nth(1)).toContainText('de 40 a 20')
  await expect(changes.nth(1)).toContainText('de 12 a 13 segundos')
  await expect(changes.nth(2)).toContainText('proyectil central')
  await expect(changes.nth(2)).toContainText('de 34 a 40')
  await expect(changes.nth(2)).toContainText('de 2 a 1,25 segundos de cooldown')
  await expect(changes.nth(2)).toContainText('del 35% al 40%')
  await expect(changes.nth(2)).toContainText('de 2 a 2,5 segundos de duración máxima')
  await expect(changes.nth(3)).toContainText('salud base aumenta de 225 a 250')
  await expect(changes.nth(4)).toContainText('armadura base baja de 275 a 250')
  await expect(changes.nth(4)).toContainText('no una reducción de toda su vida a 250')
  await expect(balance).toContainText('tampoco demuestran por sí solos quién lidera el meta')
  await expect(balance.getByRole('link', { name: 'hotfix del 13 de octubre', exact: true })).toHaveAttribute('href', 'https://overwatch.blizzard.com/es-es/news/patch-notes/live/2026/10/')
  const robots = await page.locator('head').evaluate(element => element.querySelector('meta[name="robots"]')?.getAttribute('content') || '')
  expect(robots).not.toMatch(/noindex|nofollow/)
  await expect(page.locator('main time').last()).toHaveAttribute('datetime', '2026-10-15')
  const xml = await (await request.get('/sitemap.xml')).text()
  for (const route of [path, '/news']) {
    expect(xml).toMatch(new RegExp(`${route}</loc>\\s*<lastmod>2026-10-15T00:00:00\\.000Z</lastmod>`))
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  await expect(page.locator('ins.adsbygoogle,.ad-slot,script[src*="adsbygoogle"]')).toHaveCount(0)
  await page.screenshot({ path: `reports/season-five-hotfix/balance-${test.info().project.name}.png` })
})

test('home and news lead to the updated existing season article', async ({ page }) => {
  for (const route of ['/', '/news']) {
    await page.goto(route)
    const news = page.locator(`main a[href="${path}"]`).filter({ hasText: '13 de octubre' }).first()
    await expect(news).toBeVisible()
    await news.click()
    await expect(page).toHaveURL(new RegExp(path + '$'))
    await expect(page.getByRole('heading', { name: 'Doctrine y Sombra bajan; Roadhog recupera fuerza', exact: true })).toHaveCount(1)
  }
})
