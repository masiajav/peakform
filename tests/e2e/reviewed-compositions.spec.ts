import { expect, test } from '@playwright/test'
import { reviewedTeamCompositions } from '../../src/lib/reviewed-team-compositions'
import { getTeamCompPillar } from '../../src/lib/seo-clusters'
import { PILLAR_TEAM_COMP_SLUGS } from '../../src/lib/public-topic-policy'

test('only individually approved compositions enter sitemap and retain honest dates', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const slug of PILLAR_TEAM_COMP_SLUGS) {
    const article = getTeamCompPillar(slug)!
    const response = await request.get(`/team-comps/${slug}`)
    expect(response.status()).toBe(200)
    const html = await response.text()
    const schemas = Array.from(html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g))
      .flatMap(match => JSON.parse(match[1]))
    const articleSchema = schemas.find(item => item['@type'] === 'Article')
    if (slug === 'doctrine') {
      expect(articleSchema.datePublished).toBe('2026-11-03T19:33:21.849Z')
      expect(Date.parse(articleSchema.dateModified)).toBeGreaterThanOrEqual(Date.parse(articleSchema.datePublished))
      const entry = sitemap.match(/<url>[\s\S]*?<\/url>/g)?.find(item => item.includes('/team-comps/doctrine</loc>'))
      expect(entry).toContain(`<lastmod>${new Date(articleSchema.dateModified).toISOString()}</lastmod>`)
      const date = new Date(articleSchema.dateModified).toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' })
      expect(html.replace(/<!--[^]*?-->/g, '')).toContain('Actualizado el ' + date)
    } else {
      expect(articleSchema.dateModified).toBe(article.schemaDate)
      expect(articleSchema.datePublished).toBe(article.publishedDate)
      expect(html).toContain(`<time dateTime="${article.schemaDate}">${article.updatedAt}</time>`)
    }
    const approved = ['shion', 'ana', 'genji', 'kiriko', 'reinhardt', 'dva', 'winston', 'cassidy', 'tracer', 'zarya', 'sombra', 'roadhog', 'doctrine', 'doomfist', 'dmon', 'domina', 'jetpack-cat', 'wuyang', 'moira', 'reaper', 'brigitte', 'echo', 'ashe', 'hanzo', 'mei', 'sojourn', 'bastion', 'symmetra', 'torbjorn', 'mauga', 'ramattra', 'wrecking-ball', 'junkrat', 'venture', 'hazard', 'freja', 'widowmaker', 'soldier-76', 'baptiste', 'illari', 'lucio', 'zenyatta', 'mercy', 'juno', 'lifeweaver', 'orisa', 'sigma', 'junker-queen', 'pharah', 'emre', 'sierra', 'mizuki', 'vendetta', 'anran'].includes(slug)
    expect(html).toContain(`name="robots" content="${approved ? 'index' : 'noindex'}, follow"`)
    expect(sitemap.includes(`/team-comps/${slug}</loc>`)).toBe(approved)
  }
})

test('doctrine renders its reviewed compositions, FAQs and working guide links without ads', async ({ page, request }) => {
  const route = '/team-comps/doctrine'
  expect((await page.goto(route))?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Composiciones con Doctrine en Season 5: drones, Imbuir y Liberación')
  const main = page.locator('main')
  for (const heading of [
    '5v5: una esquina para Ramattra, Mei y Cassidy',
    '5v5: Doomfist abre una oportunidad visible desde atrás',
    '6v6: Sigma conserva el frente y D.Va reparte la presión',
  ]) {
    await expect(main.getByRole('heading', { name: heading, exact: true })).toBeVisible()
  }
  await expect(main.getByRole('heading', { name: 'Preguntas para revisar una VOD' })).toBeVisible()
  const faq = main.locator('.game-faq')
  await expect(faq).toHaveCount(3)
  for (const item of await faq.all()) {
    await item.locator('summary').click()
    await expect(item.locator('p')).toHaveText(/\S/)
  }
  for (const link of ['/heroes/doctrine', '/counters/doctrine']) {
    await expect(main.locator(`a[href="${link}"]`).first()).toBeVisible()
    expect((await request.get(link)).status()).toBe(200)
  }
  await expect(page.locator('.ad-slot, ins.adsbygoogle, #adsense-script')).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
})

for (const [slug, article] of Object.entries(reviewedTeamCompositions).filter(([slug]) => slug !== 'doctrine')) {
  test(`${slug} has a distinct, complete composition article without ads`, async ({ page, request }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text())
    })
    const response = await page.goto(`/team-comps/${slug}`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(article.h1)
    await expect(page).toHaveTitle(`${article.seoTitle} - Replaid Lab`)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', article.seoDescription)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com/team-comps/${slug}`)
    const approved = ['sombra', 'roadhog', 'doctrine', 'doomfist', 'dmon', 'domina', 'jetpack-cat', 'wuyang', 'moira', 'reaper', 'brigitte', 'echo', 'ashe', 'hanzo', 'mei', 'sojourn', 'bastion', 'symmetra', 'torbjorn', 'mauga', 'ramattra', 'wrecking-ball', 'junkrat', 'venture', 'hazard', 'freja', 'widowmaker', 'soldier-76', 'baptiste', 'illari', 'lucio', 'zenyatta', 'mercy', 'juno', 'lifeweaver', 'orisa', 'sigma', 'junker-queen', 'pharah', 'emre', 'sierra', 'mizuki', 'vendetta', 'anran'].includes(slug)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', `${approved ? 'index' : 'noindex'}, follow`)
    await expect(page.locator('.seo-composition-card')).toHaveCount(3)
    await expect(page.locator('main')).not.toContainText('Mejores composiciones 5v5')
    await expect(page.locator('main')).not.toContainText('bloquear la composición')
    await expect(page.getByRole('heading', { name: 'Antes de empezar la siguiente pelea', exact: true })).toBeVisible()
    if (article.vodQuestions) {
      const vodSection = page.locator('main section').filter({ has: page.getByRole('heading', { name: 'Qué mirar en tu repetición', exact: true }) })
      await expect(vodSection.locator('ol li')).toHaveCount(article.vodQuestions.length)
      for (const question of article.vodQuestions) await expect(vodSection).toContainText(question)
    }
    if (article.conclusion) await expect(page.locator('main')).toContainText(article.conclusion)
    for (const comp of article.compositions) {
      const card = page.locator('.seo-composition-card').filter({ has: page.getByRole('heading', { name: comp.name, exact: true }) })
      for (const field of ['winCondition', 'engagePlan', 'goodMaps', 'weakAgainst', 'substitutions'] as const) {
        await expect(card).toContainText(comp[field])
      }
    }
    if (['moira', 'reaper', 'brigitte', 'echo', 'ashe', 'hanzo', 'mei', 'sojourn', 'bastion', 'symmetra', 'torbjorn', 'mauga', 'ramattra', 'wrecking-ball', 'junkrat', 'venture', 'hazard', 'freja', 'widowmaker', 'soldier-76', 'baptiste', 'illari', 'lucio', 'zenyatta', 'mercy', 'juno', 'lifeweaver', 'orisa', 'sigma', 'junker-queen', 'pharah', 'emre', 'sierra', 'mizuki', 'vendetta', 'anran'].includes(slug)) {
      const paragraphs = [...article.intro, ...article.summary, ...article.rotationPlan, ...article.weaknesses, ...article.checklist,
        ...article.responsibilities.map(item => item.body), ...article.examples.map(item => item.body)]
      for (const paragraph of paragraphs) await expect(page.locator('main')).toContainText(paragraph)
      const robots = await page.locator('meta[name="robots"], meta[name="googlebot"]').evaluateAll(tags => tags.map(tag => tag.getAttribute('content') ?? '').join(','))
      expect(`${robots},${response?.headers()['x-robots-tag'] ?? ''}`).not.toMatch(/\b(?:noindex|nofollow|none)\b/i)
    }
    for (const faq of article.faqs) {
      const answer = page.locator('.seo-pillar-faq details').filter({ hasText: faq.question })
      await answer.locator('summary').click()
      await expect(answer.locator('p')).toHaveText(faq.answer)
      await answer.locator('summary').click()
    }
    for (const href of await page.locator('main a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute('href')!))) {
      expect((await request.get(href)).status(), href).toBe(200)
    }
    await expect.poll(() => page.locator('main img').evaluateAll(images => images.filter(image => !(image as HTMLImageElement).complete || !(image as HTMLImageElement).naturalWidth).length)).toBe(0)
    const portrait = await page.locator('.seo-composition-portrait').boundingBox()
    expect(portrait).not.toBeNull()
    expect(Math.abs(portrait!.height - portrait!.width)).toBeLessThan(2)
    const colors = await page.locator('main').evaluate(main => [
      '.seo-pillar-intro p', '.seo-pillar-meta span', '.seo-pillar-breadcrumb a', '.seo-pillar-meta a',
    ].map(selector => getComputedStyle(main.querySelector(selector)!).color))
    const luminance = (color: string) => {
      const [r, g, b] = color.match(/[\d.]+/g)!.slice(0, 3).map(value => Number(value) / 255)
        .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
      return r * 0.2126 + g * 0.7152 + b * 0.0722
    }
    for (const color of colors) {
      expect((luminance(color) + 0.05) / (luminance('rgb(26, 26, 26)') + 0.05)).toBeGreaterThanOrEqual(4.5)
    }
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text))
    expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'Article', headline: article.h1, description: article.seoDescription, dateModified: article.schemaDate, author: { '@type': 'Organization', name: 'Replaid Lab' } }))
    const articleSchema = schemas.find(item => item['@type'] === 'Article')
    if (article.publishedDate) {
      expect(articleSchema.datePublished).toBe(article.publishedDate)
    } else {
      expect(articleSchema).not.toHaveProperty('datePublished')
    }
    await expect(page.locator('.seo-pillar-meta time')).toHaveAttribute('datetime', article.schemaDate!)
    await expect(page.locator('.seo-pillar-meta time')).toHaveText(article.updatedAt)
    expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'FAQPage', mainEntity: article.faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }))
    await expect(page.locator('.ad-slot, ins.adsbygoogle')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    expect(errors).toEqual([])
    const sitemap = await (await request.get('/sitemap.xml')).text()
    expect(sitemap.includes(`/team-comps/${slug}</loc>`)).toBe(approved)
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0) })
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    await page.screenshot({ path: `reports/reviewed-compositions/${slug}-${test.info().project.name}-viewport.png` })
    await page.screenshot({ path: `reports/reviewed-compositions/${slug}-${test.info().project.name}.png`, fullPage: true })
  })
}

test('D.Mon describes the available kit rather than a future launch', async ({ page }) => {
  await page.goto('/heroes/dmon')
  await expect(page.locator('main')).not.toContainText('Cuando salga')
  await expect(page.locator('main')).not.toContainText('La búsqueda importante')
  await expect(page.locator('main')).not.toContainText('Esta página funciona como hub')
  await expect(page.locator('main')).not.toContainText('faltan números finales')
  const article = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text)).find(item => item['@type'] === 'Article')
  expect(article).toMatchObject({ datePublished: '2026-08-06', dateModified: expect.any(String) })
  expect(Date.parse(article.dateModified)).toBeGreaterThanOrEqual(Date.parse('2026-11-04'))
  const date = new Date(article.dateModified).toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' })
  await expect(page.locator('main .game-meta')).toContainText('Actualizado el ' + date)
  await expect(page.getByRole('heading', { name: 'Cambios del 3 de noviembre de 2026', exact: true })).toBeVisible()
})
