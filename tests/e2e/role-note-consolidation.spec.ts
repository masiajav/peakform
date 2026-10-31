import { expect, test } from '@playwright/test'
import { reviewedRoleGuides } from '../../src/lib/reviewed-role-guides'

for (const [role, slug] of [['dps', 'dps-presion-final-blows-control-angulos'], ['support', 'support-tempo-utilidad-supervivencia']]) {
  test(`${role} short note redirects to its complete guide without duplicate discovery`, async ({ page, request }) => {
    const source = `/guides/${slug}`, target = `/guides/como-mejorar-como-${role}-overwatch`
    const guide = reviewedRoleGuides[target.split('/').at(-1)!]
    const redirect = await request.get(source, { maxRedirects: 0 })
    expect(redirect.status()).toBe(308)
    expect(new URL(redirect.headers().location, redirect.url()).pathname).toBe(target)
    const response = await page.goto(source)
    expect(response?.status()).toBe(200)
    await expect(page).toHaveURL(new RegExp(`${target}$`))
    await expect(page.locator('h1')).toHaveText(guide.title)
    await expect(page.locator('.guide-video-summary')).toContainText(guide.quickAnswer)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', guide.description)
    for (const paragraph of guide.body.split(/\n\s*\n/)) {
      const visible = paragraph.replace(/^#{1,6}\s+/gm, '').replace(/^[-*]\s+/gm, '').replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
      await expect(page.locator('.guide-body')).toContainText(visible)
    }
    const robots = await page.locator('meta[name="robots"],meta[name="googlebot"]').evaluateAll(elements => elements.map(element => element.getAttribute('content') ?? '').join('; '))
    expect(`${robots};${response?.headers()['x-robots-tag'] ?? ''}`).not.toMatch(/noindex|nofollow|\bnone\b/i)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com${target}`)
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(block => JSON.parse(block))
    const article = schemas.find(schema => schema['@type'] === 'BlogPosting')
    expect(article.datePublished).toMatch(/^2026-06-21/)
    expect(article.dateModified).toBe('2026-10-18')
    const faq = schemas.find(schema => schema['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(5)
    const answers = await page.locator('.guide-body h3').evaluateAll(headings => headings.map(heading => ({ name: heading.textContent, answer: heading.nextElementSibling?.textContent })))
    expect(faq.mainEntity.map((entry: { name: string; acceptedAnswer: { text: string } }) => ({ name: entry.name, answer: entry.acceptedAnswer.text }))).toEqual(answers)
    for (const href of await page.locator('.guide-body a[href^="/"]').evaluateAll(links => [...new Set(links.map(link => link.getAttribute('href')!))])) expect((await request.get(href)).status(), href).toBe(200)
    const sitemap = await (await request.get('/sitemap.xml')).text()
    expect(sitemap).toContain(`${target}</loc>`)
    expect(sitemap).not.toContain(`${source}</loc>`)
    await expect(page.locator('.ad-slot,ins.adsbygoogle,script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    await page.screenshot({ path: `reports/role-note-consolidations/${role}-final-${test.info().project.name}.png`, fullPage: true })
    await page.getByRole('link', { name: 'el cuaderno gratuito de VOD', exact: true }).click()
    await expect(page.getByRole('region', { name: 'Cuaderno de revisión', exact: true })).toBeVisible()
    await page.goto(`/guides?q=${role}`)
    await expect(page.locator(`a[href="${source}"]`)).toHaveCount(0)
    await expect(page.locator(`a[href="${target}"]`)).toHaveCount(1)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  })
}
