import { expect, test } from '@playwright/test'

for (const path of ['/', '/news', '/heroes', '/heroes/doctrine', '/doctrine-support-sombra-roadhog-rework-overwatch', '/blizzcon-2026-overwatch-horarios-espana']) {
  test(`${path} does not advertise the expired Doctrine trial`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' })
    const text = await page.locator('main').innerText()
    expect(text).not.toMatch(/ya se puede probar|ya tiene hero trial|hero trial (?:ya )?está activo|trial disponible desde|este fin de semana permite|no muestra una fecha límite/i)
    if (path === '/blizzcon-2026-overwatch-horarios-espana') expect(text).toMatch(/trial[^.]*termin[oó]|prueba temporal[^.]*termin[oó]/i)
    else expect(text).toMatch(/ya est[áa] disponible|Season 5|SEASON 5/i)
    await expect(page.locator('.ad-slot, ins.adsbygoogle')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false)
  })
}

test('the Doctrine announcement shows voucher limits, dates and matching structured data', async ({ page, request }) => {
  const path = '/doctrine-support-sombra-roadhog-rework-overwatch'
  await page.goto(path, { waitUntil: 'networkidle' })
  await expect(page.locator('main')).toContainText('5 de octubre')
  await expect(page.locator('main')).toContainText('6 de octubre')
  await expect(page.locator('h1')).toHaveCount(1)
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(text => JSON.parse(text))
  expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'NewsArticle', datePublished: '2026-09-12', dateModified: '2026-10-09' }))
  const faq = schemas.find(schema => schema['@type'] === 'FAQPage')
  for (const question of faq.mainEntity) {
    await expect(page.locator('main')).toContainText(question.name)
    await expect(page.locator('main')).toContainText(question.acceptedAnswer.text)
  }
  const sitemap = await (await request.get('/sitemap.xml')).text()
  const entries = await page.evaluate(xml => {
    const document = new DOMParser().parseFromString(xml, 'application/xml')
    return Array.from(document.querySelectorAll('url')).map(entry => ({
      loc: entry.querySelector('loc')?.textContent,
      lastmod: entry.querySelector('lastmod')?.textContent,
    }))
  }, sitemap)
  for (const route of [path, '/blizzcon-2026-overwatch-horarios-espana']) {
    expect(entries).toContainEqual({ loc: `https://www.replaidlab.com${route}`, lastmod: `${route === path ? '2026-10-09' : '2026-10-01'}T00:00:00.000Z` })
  }
  expect(entries).toContainEqual({ loc: 'https://www.replaidlab.com/heroes/doctrine', lastmod: '2026-10-09T00:00:00.000Z' })
  await page.screenshot({ path: `reports/event-freshness/doctrine-${test.info().project.name}.png` })
})

test('BlizzCon remains an archive with the original Spain and Canary Islands times', async ({ page }) => {
  await page.goto('/blizzcon-2026-overwatch-horarios-espana', { waitUntil: 'networkidle' })
  await expect(page.locator('main')).toContainText('El evento ya terminó')
  await expect(page.locator('main')).toContainText('18:30 en Canarias')
  await expect(page.locator('#horarios')).toContainText('19:30 - 20:45')
  await expect(page.locator('#horarios')).toContainText('10:30 - 11:45 PDT')
  await expect(page.locator('#drops')).toContainText('5 de octubre')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/blizzcon-2026-overwatch-horarios-espana')
})
