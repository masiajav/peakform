import { expect, test } from '@playwright/test'
import { reviewedRankedFundamentals } from '../../src/lib/reviewed-ranked-fundamentals'

for (const guide of reviewedRankedFundamentals) {
  test(`${guide.slug} offers its actual decision guide, clean copy and matching visible schemas`, async ({ page, request }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    const response = await page.goto(`/guides/${guide.slug}`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(guide.h1)
    await expect(page.locator('.guide-video-summary')).toContainText(guide.quickAnswer)
    await expect(page.locator('.guide-body')).toContainText(guide.sections[0].body[0])
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com/guides/${guide.slug}`)
    const headings = await page.locator('main :is(h2,h3)').allTextContents()
    expect(headings.some(text => /^(?:CTA|Enlaces internos)$/i.test(text.trim()))).toBe(false)
    const text = await page.locator('main').innerText()
    expect(text).not.toMatch(/TITLE SEO|META DESCRIPTION|Ã|â€|Ver contenido relacionado|probado personalmente/)
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(block => JSON.parse(block))
    expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'BlogPosting', datePublished: guide.publishedAtIso, dateModified: guide.modifiedAtIso }))
    const faq = schemas.find(schema => schema['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(6)
    for (const item of faq.mainEntity) {
      expect(text).toContain(item.name)
      expect(text).toContain(item.acceptedAnswer.text)
    }
    for (const link of guide.links) expect((await request.get(link.href)).status()).toBe(200)
    await expect(page.locator('.ad-slot,ins.adsbygoogle,script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(errors).toEqual([])
    await page.getByRole('link', { name: guide.links.at(-1)!.label, exact: true }).click()
    await expect(page.getByRole('region', { name: 'Cuaderno de revisión', exact: true })).toBeVisible()
  })
}

test('the three existing guide cards lead to their reviewed versions without a stale summary', async ({ page }) => {
  for (const guide of reviewedRankedFundamentals) {
    await page.goto(`/guides?q=${encodeURIComponent(guide.slug === 'como-mejorar-como-tank-overwatch' ? 'engage' : guide.slug === 'como-usar-ultimates-overwatch' ? 'ultimate' : 'cambiar')}`)
    const card = page.locator(`main a[href="/guides/${guide.slug}"]`)
    await expect(card).toHaveCount(1)
    await expect(card).toContainText(guide.seoDescription)
    await card.click()
    await expect(page.locator('h1')).toHaveText(guide.h1)
  }
})
