import { expect, test } from '@playwright/test'
import { getTeamCompPillar } from '../../src/lib/seo-clusters'

test('Cassidy composition presents the actual teams, decisions and visible FAQ without ads', async ({ page, request }) => {
  const article = getTeamCompPillar('cassidy')!
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  expect((await page.goto('/team-comps/cassidy'))?.status()).toBe(200)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('h1')).toHaveText(article.h1)
  await expect(page).toHaveTitle(`${article.seoTitle} - Replaid Lab`)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', article.seoDescription)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.replaidlab.com/team-comps/cassidy')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
  await expect(page.locator('main')).toContainText(article.quickAnswer!)
  await expect(page.locator('main')).not.toContainText('Season 3')
  await expect(page.locator('.seo-pillar-meta')).not.toContainText('Parche revisado')
  await expect(page.locator('main time')).toHaveAttribute('datetime', '2026-10-17')
  await expect(page.locator('.seo-composition-card')).toHaveCount(3)
  for (const team of article.compositions) {
    const card = page.locator('.seo-composition-card').filter({ has: page.getByRole('heading', { name: team.name, exact: true }) })
    await expect(card.locator('.seo-composition-lineup strong')).toHaveText(team.lineup)
    for (const field of ['winCondition', 'engagePlan', 'goodMaps', 'weakAgainst', 'substitutions'] as const) await expect(card).toContainText(team[field])
  }
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text))
  const structuredArticle = schemas.find(schema => schema['@type'] === 'Article')
  expect(structuredArticle).toMatchObject({ headline: article.h1, description: article.seoDescription, dateModified: '2026-10-17', author: { name: 'Replaid Lab' } })
  expect(structuredArticle).not.toHaveProperty('datePublished')
  expect(schemas.find(schema => schema['@type'] === 'FAQPage').mainEntity).toEqual(article.faqs.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })))
  for (const faq of article.faqs) {
    const detail = page.locator('main details').filter({ hasText: faq.question })
    await detail.locator('summary').click()
    await expect(detail.locator('p')).toHaveText(faq.answer)
  }
  for (const link of article.links) expect((await request.get(link.href)).status(), link.href).toBe(200)
  expect(await (await request.get('/sitemap.xml')).text()).toMatch(/\/team-comps\/cassidy<\/loc>\s*<lastmod>2026-10-17T00:00:00\.000Z<\/lastmod>/)
  await expect(page.locator('main')).toContainText(article.conclusion!)
  for (const question of article.vodQuestions!) await expect(page.locator('main')).toContainText(question)
  for (const image of await page.locator('main img').all()) await image.evaluate(element => (element as HTMLImageElement).decode())
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await expect(page.locator('ins.adsbygoogle,.ad-slot,script[src*="adsbygoogle"]')).toHaveCount(0)
  expect(errors).toEqual([])
})

test('Cassidy navigation connects the composition, counter, named map and free notebook', async ({ page }) => {
  await page.goto('/heroes/cassidy')
  await page.locator('main a[href="/team-comps/cassidy"]').first().click()
  await expect(page).toHaveURL(/\/team-comps\/cassidy$/)
  for (const href of ['/counters/cassidy', '/maps/kings-row']) {
    await page.locator(`main a[href="${href}"]`).first().click()
    await expect(page).toHaveURL(new RegExp(href + '$'))
    await page.goBack()
  }
  await page.locator('main a[href="/guides/review-vod-overwatch-espanol#cuaderno-vod"]').click()
  await expect(page.getByRole('region', { name: 'Cuaderno de revisión', exact: true })).toBeVisible()
})
