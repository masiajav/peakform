import { expect, test } from '@playwright/test'
import { reviewedCounters } from '../../src/lib/reviewed-counters'
import { getCounterPillar } from '../../src/lib/seo-clusters'
import { PILLAR_COUNTER_SLUGS } from '../../src/lib/public-topic-policy'

// Independent expectations, not derived from the approval registry under test.
const RESTORED_COUNTERS = ['genji', 'kiriko', 'freja', 'pharah', 'lifeweaver', 'juno', 'baptiste', 'illari', 'lucio', 'mercy', 'orisa', 'ramattra', 'sigma', 'jetpack-cat', 'wuyang', 'zenyatta', 'junker-queen', 'mauga', 'hazard', 'junkrat', 'soldier-76', 'wrecking-ball', 'venture', 'vendetta', 'anran', 'mizuki']

test('counter hub shows its actual catalogue without a blanket review claim', async ({ page, request }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  const response = await page.goto('/counters')
  expect(response?.status()).toBe(200)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('main')).not.toContainText('guías revisadas')
  await expect(page.locator('main')).not.toContainText('Matchups revisados por')
  for (const name of ['Freja', 'Pharah', 'Genji', 'Kiriko', 'Lifeweaver', 'Juno', 'Baptiste', 'Illari', 'Lucio', 'Mercy', 'Orisa', 'Ramattra', 'Sigma', 'Jetpack Cat', 'Wuyang', 'Zenyatta', 'Junker Queen', 'Mauga', 'Hazard', 'Junkrat', 'Soldier-76', 'Wrecking Ball', 'Venture', 'Vendetta', 'Anran', 'Mizuki', 'Sombra']) {
    await expect(page.locator('main').getByRole('link', { name, exact: true })).toBeVisible()
  }
  const catalogueLinks = await page.locator('main a[href^="/counters/"]').evaluateAll(links => links.map(link => link.getAttribute('href')!))
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text))
  const list = schemas.find(item => item['@type'] === 'ItemList')
  expect(list.itemListElement.map((item: { url: string }) => new URL(item.url).pathname)).toEqual(catalogueLinks)
  for (const href of catalogueLinks) expect((await request.get(href)).status(), href).toBe(200)
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  if ((page.viewportSize()?.width ?? 0) < 640) {
    expect(await page.locator('.counter-hub-tool').evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(1)
  }
  await expect(page.locator('.ad-slot, ins.adsbygoogle, script[src*="adsbygoogle"]')).toHaveCount(0)
  expect(errors).toEqual([])
  await page.screenshot({ path: `reports/reviewed-counters/hub-${test.info().project.name}.png`, fullPage: true })
})

for (const [slug, article] of Object.entries(reviewedCounters)) {
  test(`${slug} shows its own counter analysis, matching metadata and no ads`, async ({ page, request }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    const response = await page.goto(`/counters/${slug}`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('main')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(article.h1)
    await expect(page).toHaveTitle(new RegExp(article.seoTitle))
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', article.seoDescription)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com/counters/${slug}`)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', RESTORED_COUNTERS.includes(slug) ? 'index, follow' : 'noindex, follow')
    await expect(page.locator('.seo-threat-card')).toHaveCount(article.threats.length)
    await expect(page.locator('main')).toContainText(article.intro[0])
    for (const window of article.cooldownWindows) {
      await expect(page.locator('main')).toContainText(window.body)
    }
    const reviewLabel = article.reviewedPatch.startsWith('Season') ? 'Parche revisado' : 'Habilidades revisadas'
    await expect(page.locator('.seo-pillar-meta')).toContainText(`${reviewLabel}: ${article.reviewedPatch}`)
    await expect(page.locator('.seo-pillar-meta')).not.toContainText('Parche revisado: Ranked')
    await expect(page.locator('main')).not.toContainText('Primer pick a mirar')
    for (const href of Array.from(new Set(await page.locator('main a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute('href')!))))) {
      expect((await request.get(href)).status(), href).toBe(200)
    }
    await expect.poll(() => page.locator('main img').evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true)
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text))
    expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'Article', headline: article.seoTitle, description: article.seoDescription, dateModified: article.schemaDate, author: { '@type': 'Organization', name: 'Replaid Lab' } }))
    expect(schemas.find(item => item['@type'] === 'Article')).not.toHaveProperty('datePublished')
    await expect(page.locator('.seo-pillar-meta time')).toHaveAttribute('datetime', article.schemaDate!)
    await expect(page.locator('.seo-pillar-meta time')).toHaveText(article.updatedAt)
    const faq = schemas.find(item => item['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(article.faqs.length)
    for (const item of article.faqs) {
      const details = page.locator('details').filter({ hasText: item.question })
      await details.locator('summary').click()
      await expect(details.locator('p')).toHaveText(item.answer)
      expect(faq.mainEntity).toContainEqual({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })
    }
    await expect(page.locator('.ad-slot, ins.adsbygoogle, script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    expect(errors).toEqual([])
    const sitemap = await (await request.get('/sitemap.xml')).text()
    if (RESTORED_COUNTERS.includes(slug)) expect(sitemap).toContain(`/counters/${slug}</loc>`)
    else expect(sitemap).not.toContain(`/counters/${slug}</loc>`)
    await page.screenshot({ path: `reports/reviewed-counters/${slug}-${test.info().project.name}.png`, fullPage: true })
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({ path: `reports/reviewed-counters/${slug}-${test.info().project.name}-viewport.png` })
  })
}

test('counter publication follows individual version reviews and preserves dates', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const slug of PILLAR_COUNTER_SLUGS) {
    const article = getCounterPillar(slug)!
    const response = await request.get(`/counters/${slug}`)
    expect(response.status()).toBe(200)
    const html = await response.text()
    expect(html).toMatch(new RegExp(`<time dateTime="${article.schemaDate}">${article.updatedAt}</time>`))
    const schemas = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)).flatMap(match => JSON.parse(match[1]))
    const structuredArticle = schemas.find(item => item['@type'] === 'Article')
    expect(structuredArticle.dateModified).toBe(article.schemaDate)
    if (article.publishedDate) expect(structuredArticle.datePublished).toBe(article.publishedDate)
    else expect(structuredArticle).not.toHaveProperty('datePublished')
    expect(html).toContain(`name="robots" content="${RESTORED_COUNTERS.includes(slug) ? 'index' : 'noindex'}, follow"`)
    if (RESTORED_COUNTERS.includes(slug)) expect(sitemap).toContain(`/counters/${slug}</loc>`)
    else expect(sitemap).not.toContain(`/counters/${slug}</loc>`)
  }
})

for (const slug of ['shion', 'ana', 'zarya', 'tracer', 'domina']) {
  test(`${slug} keeps its publication history and corrected matchup advice`, async ({ page, request }) => {
    const article = getCounterPillar(slug)!
    const response = await page.goto(`/counters/${slug}`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveText(article.h1)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', article.seoDescription)
    await expect(page.locator('main')).toContainText(article.updatedAt)
    for (const threat of article.threats) {
      const card = page.locator('.seo-threat-card').filter({ has: page.getByRole('heading', { name: threat.name, exact: true }) })
      await expect(card).toContainText(threat.response)
    }
    await expect(page.locator('main')).not.toContainText('Despertar inmediatamente a un aliado')
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text))
    expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'Article', datePublished: article.publishedDate, dateModified: article.schemaDate }))
    const robotTags = await page.locator('meta[name="robots"], meta[name="googlebot"]').evaluateAll(tags => tags.map(tag => tag.getAttribute('content') || '').join(','))
    expect(`${robotTags},${response?.headers()['x-robots-tag'] || ''}`).toMatch(/\bnoindex\b/i)
    expect(robotTags).not.toMatch(/\b(?:nofollow|none)\b/i)
    await expect(page.locator('.ad-slot, ins.adsbygoogle')).toHaveCount(0)
    const sitemap = await (await request.get('/sitemap.xml')).text()
    expect(sitemap).not.toContain(`/counters/${slug}</loc>`)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  })
}
