import { expect, test } from '@playwright/test'
import { getTeamCompPillar } from '../../src/lib/seo-clusters'

for (const slug of ['dva', 'winston']) {
  test(`${slug} composition has current teams, matching SEO and working mobile navigation without ads`, async ({ page, request }) => {
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
    await expect(page.locator('main')).not.toContainText('ALINEACIONES ANTERIORES')
    await expect(page.locator('main')).not.toContainText('Season 3')
    await expect(page.locator('main')).not.toContainText('Parche revisado:')
    await expect(page.locator('.seo-composition-card')).toHaveCount(3)
    for (const team of article.compositions) {
      const card = page.locator('.seo-composition-card').filter({ has: page.getByRole('heading', { name: team.name, exact: true }) })
      await expect(card.locator('.seo-composition-lineup strong')).toHaveText(team.lineup)
      for (const field of ['winCondition', 'engagePlan', 'goodMaps', 'weakAgainst', 'substitutions'] as const) await expect(card).toContainText(team[field])
    }
    for (const question of article.vodQuestions!) await expect(page.locator('main')).toContainText(question)
    await expect(page.locator('main')).toContainText(article.conclusion!)
    for (const faq of article.faqs) {
      const details = page.locator('main details').filter({ hasText: faq.question })
      await details.locator('summary').click()
      await expect(details.locator('p')).toHaveText(faq.answer)
    }
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(block => JSON.parse(block))
    const structuredArticle = schemas.find(schema => schema['@type'] === 'Article')
    expect(structuredArticle).toMatchObject({ headline: article.h1, description: article.seoDescription, dateModified: '2026-10-10', author: { name: 'Replaid Lab' } })
    expect(structuredArticle).not.toHaveProperty('datePublished')
    expect(schemas.find(schema => schema['@type'] === 'FAQPage').mainEntity).toEqual(article.faqs.map(faq => ({
      '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })))
    expect(schemas.some(schema => schema['@type'] === 'BreadcrumbList')).toBe(true)
    await expect(page.locator('main time')).toHaveAttribute('datetime', '2026-10-10')
    const sitemap = await (await request.get('/sitemap.xml')).text()
    expect(sitemap).toMatch(new RegExp(`/team-comps/${slug}</loc>\\s*<lastmod>2026-10-10T00:00:00\\.000Z</lastmod>`))
    for (const link of article.links) expect((await request.get(link.href)).status(), link.href).toBe(200)
    await expect.poll(() => page.locator('main img').evaluateAll(images => images.every(image =>
      (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(10, 10, 10)')
    await expect(page.locator('ins.adsbygoogle,script[src*="pagead"],.ad-slot,.ad-slot-placeholder')).toHaveCount(0)
    await page.screenshot({ path: `reports/dva-winston-compositions/${slug}-${test.info().project.name}.png`, fullPage: true })
    const destination = slug === 'dva' ? '/team-comps/winston' : '/team-comps/dva'
    await page.getByRole('link', { name: article.links.find(link => link.href === destination)!.label, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`${destination}$`))
    await expect(page.locator('h1')).toHaveText(getTeamCompPillar(slug === 'dva' ? 'winston' : 'dva')!.h1)
    await page.goBack()
    await expect(page.locator('h1')).toHaveText(article.h1)
    expect(errors).toEqual([])
  })
}
