import { expect, test } from '@playwright/test'
import { getTeamCompPillar } from '../../src/lib/seo-clusters'

for (const slug of ['kiriko', 'genji', 'reinhardt']) {
  test(`${slug} composition renders decisions, matching schema and safe navigation without ads`, async ({ page, request }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    const article = getTeamCompPillar(slug)!
    expect((await page.goto(`/team-comps/${slug}`, { waitUntil: 'networkidle' }))?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(article.h1)
    await expect(page).toHaveTitle(`${article.seoTitle} - Replaid Lab`)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', article.seoDescription)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com/team-comps/${slug}`)
    await expect(page.locator('main')).toContainText(article.quickAnswer!)
    await expect(page.locator('main')).not.toContainText('Parche revisado:')
    await expect(page.getByRole('heading', { name: 'Qué mirar en una pelea perdida' })).toBeVisible()
    for (const team of article.compositions) {
      const card = page.locator('.seo-composition-card').filter({ has: page.getByRole('heading', { name: team.name, exact: true }) })
      for (const field of ['winCondition', 'engagePlan', 'goodMaps', 'weakAgainst', 'substitutions'] as const) {
        await expect(card).toContainText(team[field])
      }
    }
    for (const faq of article.faqs) {
      await page.getByText(faq.question, { exact: true }).click()
      await expect(page.getByText(faq.answer, { exact: true })).toBeVisible()
    }
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(block => JSON.parse(block))
    expect(schemas.find(schema => schema['@type'] === 'Article')).toMatchObject({ dateModified: slug === 'reinhardt' ? '2026-10-09' : '2026-10-06', headline: article.h1 })
    expect(schemas.find(schema => schema['@type'] === 'Article')).not.toHaveProperty('datePublished')
    expect(schemas.find(schema => schema['@type'] === 'FAQPage').mainEntity).toEqual(article.faqs.map(faq => ({
      '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })))
    const xml = await (await request.get('/sitemap.xml')).text()
    expect(xml).toMatch(new RegExp(`/team-comps/${slug}</loc>\\s*<lastmod>${slug === 'reinhardt' ? '2026-10-09' : '2026-10-06'}T00:00:00\\.000Z</lastmod>`))
    for (const link of article.links) expect((await request.get(link.href)).status(), link.href).toBe(200)
    await expect.poll(() => page.locator('main img').evaluateAll(images => images.every(image =>
      (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await expect(page.locator('ins.adsbygoogle, script[src*="pagead"], .ad-slot-placeholder')).toHaveCount(0)
    await page.screenshot({ path: `reports/kiriko-genji-compositions/${slug}-${test.info().project.name}.png`, fullPage: true })
    const map = slug === 'reinhardt' ? { label: 'Rutas y esquinas de King’s Row', path: 'kings-row', name: "King's Row" }
      : slug === 'kiriko' ? { label: 'Alturas y rutas de Dorado', path: 'dorado', name: 'Dorado' }
      : { label: 'Entradas y alturas de Numbani', path: 'numbani', name: 'Numbani' }
    await page.getByRole('link', { name: map.label, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/maps/${map.path}$`))
    await expect(page.locator('h1')).toHaveText(map.name)
    await page.goBack()
    await expect(page.locator('h1')).toHaveText(article.h1)
    expect(errors).toEqual([])
  })
}
