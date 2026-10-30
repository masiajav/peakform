import { expect, test } from '@playwright/test'
import { GUIDE_REVISION_DATE, reviewedGuideRevisions } from '../../src/lib/reviewed-guide-revisions'

const PUBLISHED_REVISIONS = ['como-mejorar-como-dps-overwatch', 'como-mejorar-como-support-overwatch', 'moira-guia-overwatch-recursos-supervivencia', 'reaper-guia-video-overwatch', 'brigitte-guia-overwatch-peel-anti-dive', 'echo-guia-overwatch-burst-vertical', 'ashe-guia-overwatch-angulos-dinamita', 'hanzo-guia-video-overwatch', 'mei-guia-video-overwatch', 'sojourn-guia-overwatch-railgun-presion', 'bastion-guia-video-overwatch', 'symmetra-guia-video-overwatch', 'torbjorn-guia-video-overwatch', 'mauga-guia-video-overwatch', 'ramattra-guia-video-overwatch', 'wrecking-ball-guia-video-overwatch', 'junkrat-guia-video-overwatch', 'venture-guia-video-overwatch', 'hazard-guia-video-overwatch', 'freja-guia-video-overwatch', 'wuyang-guia-video-overwatch', 'widowmaker-guia-overwatch-lineas-vision', 'soldier-76-guia-overwatch-off-angles', 'doomfist-guia-overwatch-entradas-cooldowns', 'roadhog-guia-video-overwatch', 'sombra-guia-video-overwatch', 'anran-guia-video-overwatch', 'baptiste-guia-overwatch-lamp-window', 'illari-guia-overwatch-pilon-dano', 'lucio-guia-overwatch-speed-peel', 'zenyatta-guia-overwatch-discord-transcendence', 'mercy-guia-overwatch-pocket-resurrect', 'juno-guia-video-overwatch', 'lifeweaver-guia-video-overwatch', 'orisa-guia-overwatch-fortify-javelin']

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
    if (PUBLISHED_REVISIONS.includes(slug)) {
      const robots = await page.locator('meta[name="robots"], meta[name="googlebot"]').evaluateAll(tags => tags.map(tag => tag.getAttribute('content') ?? '').join(','))
      expect(`${robots},${response?.headers()['x-robots-tag'] ?? ''}`).not.toMatch(/\b(?:noindex|nofollow|none)\b/i)
    } else await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
    await expect(page.locator('.guide-body')).toContainText(revision.body.match(/^## (.+)/)?.[1] || '')
    await expect(page.locator('.guide-body')).toContainText('FAQ')
    await expect(page.locator('.guide-video-summary')).toContainText(revision.quickAnswer)
    const externalVideo = revision.videoPresentation === 'external'
    await expect(page.locator('iframe')).toHaveCount(revision.hero && !externalVideo ? 1 : 0)
    if (revision.reviewedVideo) {
      const video = revision.reviewedVideo
      for (const paragraph of revision.body.split(/\n\s*\n/)) {
        const visible = paragraph.replace(/^#{1,6}\s+/gm, '').replace(/^[-*]\s+/gm, '').replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
        await expect(page.locator('.guide-body')).toContainText(visible)
      }
      await expect(page).toHaveTitle(new RegExp(revision.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', revision.description)
      await expect(page.locator('.guide-video-meta')).toContainText(video.video_channel!)
      if (externalVideo) {
        const source = page.locator('.guide-video-source')
        await expect(source).toHaveAttribute('href', video.video_url!)
        await expect(source).toHaveAttribute('target', '_blank')
        await expect(source).toContainText(video.video_title!)
        await expect(page.locator('.guide-detail-main header')).toContainText('Vídeo de referencia')
      } else {
        await expect(page.locator('iframe')).toHaveAttribute('src', `https://www.youtube-nocookie.com/embed/${video.video_id}`)
        await expect(page.locator('iframe')).toHaveAttribute('title', video.video_title!)
        await page.locator('iframe').scrollIntoViewIfNeeded()
        await expect(page.frameLocator('iframe').getByRole('button', { name: /^(?:Reproducir vídeo|Play(?: video)?)$/i })).toBeVisible({ timeout: 20000 })
      }
    }
    await expect(page.locator('.ad-slot, ins.adsbygoogle')).toHaveCount(0)
    await expect(page.locator('.guide-detail-sidebar')).toHaveCount(0)
    const articleText = await page.locator('.guide-detail-main').innerText()
    expect(articleText).not.toMatch(/Ã|Â|â€|ï¿½|Title SEO|Meta description|Mira primero el vídeo/)
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents()
    const schemas = jsonLd.map(block => JSON.parse(block))
    if (externalVideo) expect(schemas.some(schema => schema['@type'] === 'VideoObject')).toBe(false)
    else if (revision.reviewedVideo) expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'VideoObject', name: revision.reviewedVideo.video_title, uploadDate: revision.reviewedVideo.video_published_at, inLanguage: revision.reviewedVideo.video_language }))
    if (revision.videoDescription) {
      if (!externalVideo) {
        expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'VideoObject', description: revision.videoDescription }))
        expect(schemas.find(item => item['@type'] === 'VideoObject')).not.toHaveProperty('contentUrl')
      }
      await expect(page.locator('.guide-video-context')).toBeVisible()
      await expect(page.locator('.guide-video-context')).toHaveText(revision.videoDescription)
      await page.evaluate(() => document.fonts.ready)
      // Read both elements in one layout snapshot, after the web fonts settle.
      const videoLayout = await page.evaluate(() => {
        const context = document.querySelector('.guide-video-context')?.getBoundingClientRect()
        const video = document.querySelector('.guide-video')?.getBoundingClientRect()
        return context && video ? { contextBottom: context.bottom, videoTop: video.top } : null
      })
      expect(videoLayout).not.toBeNull()
      expect(videoLayout!.contextBottom).toBeLessThanOrEqual(videoLayout!.videoTop)
    }
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
    const sitemap = await (await request.get('/sitemap.xml')).text()
    expect(sitemap.includes(`/guides/${slug}</loc>`)).toBe(PUBLISHED_REVISIONS.includes(slug))
    expect(errors).toEqual([])
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0) })
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    await page.screenshot({ path: `reports/reviewed-guides/${revision.hero || slug}-${test.info().project.name}.png`, fullPage: true })
    await page.screenshot({ path: `reports/reviewed-guides/${slug}-${test.info().project.name}-viewport.png` })
  })
}

test('role filters keep Sombra in Support after the editorial correction', async ({ page }) => {
  await page.goto('/guides?hero=sombra&role=support')
  await expect(page.locator('a[href="/guides/sombra-guia-video-overwatch"]')).toHaveCount(1)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  await page.goto('/guides?hero=sombra&role=dps')
  await expect(page.locator('a[href="/guides/sombra-guia-video-overwatch"]')).toHaveCount(0)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
})

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
    expect(sitemap.includes(`/guides/${slug}</loc>`)).toBe(PUBLISHED_REVISIONS.includes(slug))
    if (revision.videoSlug !== slug) expect(sitemap).not.toContain(`/guides/${revision.videoSlug}</loc>`)
  }
})
