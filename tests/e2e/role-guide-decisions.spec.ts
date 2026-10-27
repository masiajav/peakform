import { expect, test } from '@playwright/test'
import { reviewedRoleGuides } from '../../src/lib/reviewed-role-guides'

for (const role of ['dps', 'support']) {
  const slug = `como-mejorar-como-${role}-overwatch`
  const guide = reviewedRoleGuides[slug]
  test(`${role} offers conditional advice, matching visible FAQ and the existing expert workflow`, async ({ page, request }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    const response = await page.goto(`/guides/${slug}`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(guide.title)
    await expect(page.locator('.guide-video-summary')).toContainText(guide.quickAnswer)
    const robots = await page.locator('meta[name="robots"],meta[name="googlebot"]').evaluateAll(elements => elements.map(element => element.getAttribute('content') ?? '').join('; '))
    expect(robots).not.toMatch(/noindex|\bnone\b/i)
    expect(response?.headers()['x-robots-tag'] ?? '').not.toMatch(/noindex|\bnone\b/i)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com/guides/${slug}`)
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(block => JSON.parse(block))
    const article = schemas.find(schema => schema['@type'] === 'BlogPosting')
    expect(article.datePublished).toMatch(/^2026-06-21/)
    expect(article.dateModified).toBe('2026-10-18')
    expect(article.author).toEqual({ '@type': 'Organization', name: 'Replaid Lab' })
    const faq = schemas.find(schema => schema['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(5)
    const visibleAnswers = await page.locator('.guide-body h3').evaluateAll(headings => headings.map(heading => ({ name: heading.textContent, answer: heading.nextElementSibling?.textContent })))
    expect(faq.mainEntity.map((entry: { name: string; acceptedAnswer: { text: string } }) => ({ name: entry.name, answer: entry.acceptedAnswer.text }))).toEqual(visibleAnswers)
    await expect(page.getByRole('link', { name: 'Comunicar una corrección', exact: true })).toHaveAttribute('href', '/contact')
    const prices = page.locator('main [data-expert-price]')
    expect(await prices.count()).toBeGreaterThan(0)
    for (const price of await prices.all()) await expect(price).toContainText(/20% de comisión|consulta las condiciones|Sin ofertas activas|Pedidos pausados/)
    await expect(page.locator('.ad-slot,ins.adsbygoogle,script[src*="adsbygoogle"]')).toHaveCount(0)
    expect((await (await request.get('/sitemap.xml')).text())).toContain(`/guides/${slug}</loc>`)
    const links = await page.locator('.guide-body a[href^="/"]').evaluateAll(elements => [...new Set(elements.map(element => element.getAttribute('href')!))])
    for (const href of links) expect((await request.get(href)).status(), href).toBe(200)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({ path: `reports/role-guide-decisions/${role}-${test.info().project.name}.png`, fullPage: true })
    await page.getByRole('link', { name: 'el cuaderno gratuito de VOD', exact: true }).click()
    await expect(page.getByRole('region', { name: 'Cuaderno de revisión', exact: true })).toBeVisible()
    expect(errors).toEqual([])
  })
}
