import { expect, test } from '@playwright/test'
import { rankedHeroGuides } from '../../src/lib/ranked-hero-guides'
import { hasCurrentStaticEditorialReview } from '../../src/lib/static-editorial-review'

for (const guide of rankedHeroGuides) {
  test(`ranked ${guide.heroSlug}: complete article, matching dates/schema and real navigation`, async ({ page, request }) => {
    test.setTimeout(90_000)
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    const path = `/guides/${guide.slug}`
    const response = await page.goto(path, { waitUntil: 'networkidle' })
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(guide.title)
    await expect(page).toHaveTitle(`${guide.seoTitle} - Replaid Lab`)
    await expect(page.locator('main header')).toContainText(guide.quickAnswer)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', guide.seoDescription)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com${path}`)
    const reviewed = hasCurrentStaticEditorialReview(path, guide)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', `${reviewed ? 'index' : 'noindex'}, follow`)
    await expect(page.locator(`time[datetime="${guide.publishedAt}"]`)).toContainText('21 de junio de 2026')
    await expect(page.locator(`time[datetime="${guide.modifiedAt}"]`)).toContainText('5 de octubre de 2026')
    const article = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text))
    expect(article.find(item => item['@type'] === 'BlogPosting')).toMatchObject({ headline: guide.title, datePublished: guide.publishedAt, dateModified: guide.modifiedAt, author: { name: 'Replaid Lab' } })
    const faq = article.find(item => item['@type'] === 'FAQPage')
    expect(faq.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => ({ question: item.name, answer: item.acceptedAnswer.text }))).toEqual(guide.faqs)
    const main = page.locator('main')
    for (const section of guide.sections) {
      await expect(main.getByRole('heading', { name: section.title, exact: true })).toBeVisible()
      for (const paragraph of section.paragraphs) await expect(main).toContainText(paragraph)
    }
    const image = page.locator('main header img')
    await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true)
    await page.screenshot({ path: `reports/ranked-guides/${guide.heroSlug}-header-${test.info().project.name}.png` })
    for (const item of guide.faqs) {
      await main.getByText(item.question, { exact: true }).click()
      await expect(main.getByText(item.answer, { exact: true })).toBeVisible()
    }
    const scenario = main.getByRole('heading', { name: guide.sections.find(section => /Gibraltar|King’s Row|Dorado|Midtown|Numbani/.test(section.title))!.title, exact: true })
    await scenario.scrollIntoViewIfNeeded()
    await expect(scenario).toBeInViewport()
    await page.screenshot({ path: `reports/ranked-guides/${guide.heroSlug}-example-${test.info().project.name}.png` })
    await page.screenshot({ path: `reports/ranked-guides/${guide.heroSlug}-full-${test.info().project.name}.png`, fullPage: true })
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false)
    expect(await main.locator('h1, h2, p, li, summary').evaluateAll(elements => elements.filter(element => element.scrollWidth > element.clientWidth + 1).map(element => element.textContent))).toEqual([])
    await expect(main).not.toContainText(/TITLE SEO|META DESCRIPTION|keywords principales|lorem ipsum|La burbuja corta relaciones/)
    await expect(page.locator('.ad-slot, ins.adsbygoogle, script[src*="adsbygoogle"]')).toHaveCount(0)
    const links = await main.locator('a[href^="/"]').evaluateAll(elements => Array.from(new Set(elements.map(element => element.getAttribute('href')!))))
    for (const link of links) expect((await request.get(link)).status(), link).toBe(200)
    const sitemap = await (await request.get('/sitemap.xml')).text()
    if (reviewed) expect(sitemap).toMatch(new RegExp(`${path}</loc>\\s*<lastmod>2026-10-05T00:00:00\\.000Z</lastmod>`))
    else expect(sitemap).not.toContain(`${path}</loc>`)
    await main.locator(`a[href="/heroes/${guide.heroSlug}"]`).first().click()
    await expect(page).toHaveURL(new RegExp(`/heroes/${guide.heroSlug}$`))
    await expect(page.locator('h1')).toContainText(guide.heroName)
    await page.goBack({ waitUntil: 'networkidle' })
    await expect(page.locator('h1')).toHaveText(guide.title)
    expect(errors).toEqual([])
  })
}
