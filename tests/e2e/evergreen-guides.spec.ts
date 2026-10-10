import { expect, test } from '@playwright/test'
import { evergreenGuides } from '../../src/lib/evergreen-guides'

for (const guide of Object.values(evergreenGuides)) {
  test(`${guide.slug} preserves content and SEO without approving advertising`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text())
    })

    const response = await page.goto(`/guides/${guide.slug}`, { waitUntil: 'networkidle' })
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(guide.h1)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', guide.seoDescription)
    const robots = await page.locator('meta[name="robots"],meta[name="googlebot"]').evaluateAll(elements => elements.map(element => element.getAttribute('content') || '').join(','))
    expect(`${robots},${response?.headers()['x-robots-tag'] || ''}`).not.toMatch(/\b(?:noindex|none)\b/i)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com/guides/${guide.slug}`)
    await expect(page.locator('.guide-video-summary')).toContainText(guide.quickAnswer)
    await expect(page.locator('time[datetime="' + guide.publishedAtIso + '"]')).toBeVisible()
    await expect(page.locator('time[datetime="' + guide.modifiedAtIso + '"]')).toBeVisible()
    expect(await page.locator('header').evaluate(element => {
      const summary = element.querySelector('.guide-video-summary')
      const intro = element.querySelector('p:not(.guide-video-summary p)')
      return Boolean(summary && intro && summary.compareDocumentPosition(intro) & Node.DOCUMENT_POSITION_FOLLOWING)
    })).toBe(true)
    await expect(page.locator('.guide-body')).toContainText(guide.sections[0].body[0])
    await expect(page.locator('.ad-slot, ins.adsbygoogle, script[src*="adsbygoogle"]')).toHaveCount(0)
    await expect(page.getByRole('link', { name: 'Comunicar una corrección', exact: true })).toHaveAttribute('href', '/contact')

    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(block => JSON.parse(block))
    expect(schemas).toContainEqual(expect.objectContaining({
      '@type': 'BlogPosting',
      datePublished: guide.publishedAtIso,
      dateModified: guide.modifiedAtIso,
      author: { '@type': 'Organization', name: 'Replaid Lab' },
    }))
    expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'FAQPage' }))
    const faq = schemas.find(schema => schema['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(guide.faqs.length)
    for (const item of await page.locator('main details summary').all()) await item.click()
    const visibleText = await page.locator('main').innerText()
    for (const item of faq.mainEntity) {
      expect(visibleText).toContain(item.name)
      expect(visibleText).toContain(item.acceptedAnswer.text)
    }
    expect(visibleText).not.toMatch(/guía pilar|base evergreen|TITLE SEO|META DESCRIPTION|Ã|â€/i)
    const background = await page.locator('body').evaluate(element => getComputedStyle(element).backgroundColor)
    expect(background).not.toBe('rgb(255, 255, 255)')
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    expect(errors).toEqual([])
    await page.screenshot({ path: `reports/evergreen-guides/${guide.slug}-${test.info().project.name}.png`, fullPage: true })
  })
}
