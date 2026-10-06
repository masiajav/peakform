import { expect, test } from '@playwright/test'
import { GUIDE_REVISION_DATE, reviewedGuideRevisions } from '../../src/lib/reviewed-guide-revisions'

for (const [slug, revision] of Object.entries(reviewedGuideRevisions)) {
  test(`${slug} has one complete article and preserves its original URL`, async ({ page, request }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => {
      const isVideoPermissionWarning = message.text() === 'Permissions policy violation: compute-pressure is not allowed in this document.'
        && /^https:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\//.test(message.location().url)
      if (message.type() === 'error' && !message.text().startsWith('Failed to load resource') && !isVideoPermissionWarning) errors.push(message.text())
    })
    const response = await page.goto(`/guides/${revision.videoSlug}`, { waitUntil: 'domcontentloaded' })
    expect(response?.status()).toBe(200)
    await expect(page).toHaveURL(new RegExp(`/guides/${slug}$`))
    await expect(page.locator('h1')).toHaveText(revision.title)
    await expect(page.locator('main')).toHaveCount(1)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.replaidlab.com/guides/${slug}`)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
    await expect(page.locator('.guide-body')).toContainText(revision.body.match(/^## (.+)/)?.[1] || '')
    await expect(page.locator('.guide-body')).toContainText('FAQ')
    await expect(page.locator('.guide-video-summary')).toContainText(revision.quickAnswer)
    await expect(page.locator('iframe')).toHaveCount(revision.hero ? 1 : 0)
    await expect(page.locator('.ad-slot, ins.adsbygoogle')).toHaveCount(0)
    await expect(page.locator('.guide-detail-sidebar')).toHaveCount(0)
    const articleText = await page.locator('.guide-detail-main').innerText()
    expect(articleText).not.toMatch(/Ã|Â|â€|ï¿½|Title SEO|Meta description|Mira primero el vídeo/)
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents()
    const schemas = jsonLd.map(block => JSON.parse(block))
    expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'BlogPosting', dateModified: revision.revisedAt || GUIDE_REVISION_DATE, author: { '@type': 'Organization', name: 'Replaid Lab' } }))
    expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'FAQPage' }))
    const faq = schemas.find(schema => schema['@type'] === 'FAQPage')
    const expectedQuestions = Array.from(revision.body.matchAll(/^### (.+)$/gm), match => match[1])
    expect(expectedQuestions.length).toBeGreaterThanOrEqual(2)
    expect(faq.mainEntity.map((entry: { name: string }) => entry.name)).toEqual(expectedQuestions)
    const visibleAnswers = await page.locator('.guide-body h3').evaluateAll(headings => headings.map(heading => ({
      question: heading.textContent?.trim(),
      answer: heading.nextElementSibling?.textContent?.replace(/\s+/g, ' ').trim(),
    })))
    for (const entry of faq.mainEntity) {
      expect(entry.acceptedAnswer.text).toBe(visibleAnswers.find(answer => answer.question === entry.name)?.answer)
    }
    const introColor = await page.locator('.guide-detail-main header > p').evaluate(element => getComputedStyle(element).color)
    const dateColors = await page.locator('.guide-detail-main header > div:last-child span').evaluateAll(elements => elements.map(element => getComputedStyle(element).color))
    expect(introColor).toBe('rgb(179, 179, 179)')
    expect(dateColors).toHaveLength(4)
    expect(dateColors.every(color => color === 'rgb(153, 153, 153)')).toBe(true)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(overflow).toBe(false)
    for (const href of await page.locator('.guide-body a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute('href')!))) {
      expect((await request.get(href)).status(), href).toBe(200)
    }
    expect(errors).toEqual([])
    await page.screenshot({ path: `reports/reviewed-guides/${revision.hero || slug}-${test.info().project.name}.png`, fullPage: true })
    if (!revision.hero) await page.screenshot({ path: `reports/reviewed-guides/${slug}-${test.info().project.name}-viewport.png` })
  })
}

test('hero filters do not bring back unreviewed templates', async ({ page, request }) => {
  await page.goto('/guides?hero=orisa')
  await expect(page.locator('a[href="/guides/orisa-guia-overwatch-fortify-javelin"]')).toHaveCount(1)
  await expect(page.locator('a[href="/guides/orisa-guia-video-overwatch"]')).toHaveCount(0)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  await page.goto('/guides?q=ORISA')
  await expect(page.locator('a[href="/guides/orisa-guia-overwatch-fortify-javelin"]')).toHaveCount(1)
  await expect(page.locator('a[href="/guides/ashe-guia-overwatch-angulos-dinamita"]')).toHaveCount(0)
  await page.goto('/guides?hero=unknown-hero')
  await expect(page.getByText('NO HEMOS ENCONTRADO GUÍAS PARA ESTA BÚSQUEDA')).toBeVisible()
  await expect(page.locator('a[href="/guides/emre-guia-video-overwatch"]')).toHaveCount(0)
  await page.goto('/guides?hero=mauga')
  await expect(page.locator('a[href="/guides/mauga-guia-video-overwatch"]')).toHaveCount(1)
  await expect(page.locator('a[href="/guides/mauga-guia-video-overwatch"]')).toContainText(reviewedGuideRevisions['mauga-guia-video-overwatch'].title)
  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const [slug, revision] of Object.entries(reviewedGuideRevisions)) {
    expect(sitemap).not.toContain(`/guides/${slug}`)
    expect(sitemap).not.toContain(`/guides/${revision.videoSlug}`)
  }
})
