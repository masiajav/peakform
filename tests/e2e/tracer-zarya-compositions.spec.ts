import { expect, test } from '@playwright/test'
import { getTeamCompPillar } from '../../src/lib/seo-clusters'
import { hasCurrentStaticEditorialReview } from '../../src/lib/static-editorial-review'

for (const slug of ['tracer', 'zarya']) {
  test(`${slug} composition decisions, FAQs, navigation and presentation`, async ({ page, request }) => {
    const article = getTeamCompPillar(slug)!
    const route = `/team-comps/${slug}`
    const reviewed = hasCurrentStaticEditorialReview(route, article)
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    expect((await page.goto(route))?.status()).toBe(200)
    const main = page.locator('main')
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(article.h1)
    await expect(page).toHaveTitle(`${article.seoTitle} - Replaid Lab`)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', article.seoDescription)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com${route}`)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', reviewed ? 'index, follow' : 'noindex, follow')
    await expect(main.locator('header')).toContainText(article.quickAnswer!)
    await expect(main.locator('.seo-composition-card')).toHaveCount(3)
    await expect(main.locator('time')).toHaveAttribute('datetime', article.schemaDate!)
    for (const item of article.vodQuestions!) await expect(main).toContainText(item)
    for (const faq of article.faqs) {
      const detail = main.locator('details').filter({ hasText: faq.question })
      await detail.locator('summary').click()
      await expect(detail.locator('p')).toHaveText(faq.answer)
    }
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text))
    const schema = schemas.find(item => item['@type'] === 'Article')
    expect(schema).toMatchObject({ headline: article.h1, dateModified: article.schemaDate, author: { '@type': 'Organization', name: 'Replaid Lab' } })
    expect(schema).not.toHaveProperty('datePublished')
    expect(schemas.find(item => item['@type'] === 'FAQPage').mainEntity).toEqual(article.faqs.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })))
    await expect.poll(() => main.locator('img').evaluateAll(images => images.filter(image => !(image as HTMLImageElement).complete || !(image as HTMLImageElement).naturalWidth).length)).toBe(0)
    for (const href of new Set(await main.locator('a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute('href')!)))) {
      expect((await request.get(href)).status(), href).toBe(200)
    }
    const sitemap = await (await request.get('/sitemap.xml')).text()
    expect(sitemap.includes(`${route}</loc>`)).toBe(reviewed)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    await expect(page.locator('.ad-slot, ins.adsbygoogle, script[src*="pagead2"]')).toHaveCount(0)
    expect(errors).toEqual([])
    for (const [label, selector] of [['header', 'header'], ['examples', '.seo-pillar-card-grid.three'], ['faq', '.seo-pillar-faq']] as const) {
      await main.locator(selector).first().scrollIntoViewIfNeeded()
      await page.screenshot({ path: `reports/tracer-zarya-compositions/${slug}-${test.info().project.name}-${label}.png` })
    }
    await main.locator(`a[href="/heroes/${slug}"]`).click()
    await expect(page).toHaveURL(new RegExp(`/heroes/${slug}$`))
    await expect(page.locator('h1')).toContainText(article.name)
  })
}
