import { expect, test } from '@playwright/test'
import { getCounterPillar } from '../../src/lib/seo-clusters'

for (const slug of ['tracer', 'domina', 'zarya']) {
  test(`${slug} counter renders the revised decisions, original date and matching FAQ`, async ({ page, request }) => {
    const model = getCounterPillar(slug)!
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    expect((await page.goto(`/counters/${slug}`))?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(model.h1)
    await expect(page).toHaveTitle(new RegExp(model.seoTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', model.seoDescription)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com/counters/${slug}`)
    await expect(page.locator('.seo-threat-card')).toHaveCount(model.threats.length)
    await expect(page.locator('.seo-pillar-steps li')).toHaveCount(5)
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(value => JSON.parse(value))
    const article = schemas.find(item => item['@type'] === 'Article')
    expect(article).toMatchObject({ datePublished: '2026-07-12', dateModified: '2026-10-19', author: { name: 'Replaid Lab' }, description: model.seoDescription })
    expect(schemas.some(item => item['@type'] === 'BreadcrumbList')).toBe(true)
    const faq = schemas.find(item => item['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(5)
    for (const item of faq.mainEntity) {
      const detail = page.locator('main details').filter({ hasText: item.name })
      await detail.locator('summary').click()
      await expect(detail.locator('p')).toHaveText(item.acceptedAnswer.text)
    }
    const text = await page.locator('main').innerText()
    for (const body of [...model.intro, ...model.vodQuestions!, model.conclusion!]) expect(text).toContain(body)
    expect(text).toContain('19 de octubre de 2026')
    expect(text).not.toMatch(/Season 3|TITLE SEO|META DESCRIPTION|KEYWORDS PRINCIPALES|Ã|â€|ï¿½/)
    for (const image of await page.locator('main img').all()) await image.evaluate(element => (element as HTMLImageElement).decode())
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    await expect(page.locator('ins.adsbygoogle,.ad-slot,script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(await (await request.get('/sitemap.xml')).text()).toMatch(new RegExp(`/counters/${slug}</loc>\\s*<lastmod>2026-10-19T00:00:00\\.000Z</lastmod>`))
    expect(errors).toEqual([])
  })

  test(`${slug} counter links reach the composition, map and free VOD notebook`, async ({ page }) => {
    const model = getCounterPillar(slug)!
    await page.goto(`/counters/${slug}`)
    await page.locator(`main a[href="/team-comps/${slug}"]`).click()
    await expect(page).toHaveURL(new RegExp(`/team-comps/${slug}$`))
    await page.goBack()
    const mapPath = model.links.find(item => item.href.startsWith('/maps/'))!.href
    await page.locator(`main a[href="${mapPath}"]`).click()
    await expect(page).toHaveURL(new RegExp(mapPath + '$'))
    await page.goBack()
    await page.locator('main a[href="/guides/review-vod-overwatch-espanol#cuaderno-vod"]').click()
    await expect(page).toHaveURL(/\/guides\/review-vod-overwatch-espanol#cuaderno-vod$/)
    await expect(page.getByRole('region', { name: 'Cuaderno de revisión', exact: true })).toBeVisible()
  })
}
