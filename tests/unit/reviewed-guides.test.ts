import { describe, expect, it } from 'vitest'
import type { GuideContent } from '@/lib/content'
import { discoverableGuides } from '@/lib/guide-discovery'
import { guideEditorial } from '@/lib/guide-editorial'
import { MAP_PILLAR_SLUGS } from '@/lib/overwatch-maps'
import { getRankedHeroGuide } from '@/lib/ranked-hero-guides'
import { guideQualityDecision, isGuideSitemapEligible } from '@/lib/indexing-policy'
import { applyReviewedGuideRevision, GUIDE_REVISION_DATE, mergeReviewedGuideVideo, reviewedGuideRevisions, reviewedGuideTarget, reviewedGuideVideoSource } from '@/lib/reviewed-guide-revisions'

const original: GuideContent = {
  id: 'existing-guide',
  slug: 'orisa-guia-overwatch-fortify-javelin',
  title: 'Guía de Orisa en Overwatch',
  body: 'Resumen antiguo',
  category: 'Héroes',
  hero: 'orisa',
  role: 'tank',
  author: 'Autor del vídeo',
  published: true,
  created_at: '2026-05-05',
}

describe('reviewed guide batch', () => {
  it('keeps the Reaper kit correction on its original route and publication date', () => {
    const revised = applyReviewedGuideRevision({ ...original, slug: 'reaper-guia-video-overwatch', hero: 'reaper' })
    expect(revised).toMatchObject({ slug: 'reaper-guia-video-overwatch', hero: 'reaper', created_at: original.created_at, updated_at: '2026-10-02', author: 'Replaid Lab' })
    expect(revised.body).toContain('Dire Triggers forma parte del kit básico')
    expect(revised.body).toContain('El perk Trigger Finger modifica')
    expect(guideQualityDecision(revised)).toMatchObject({ indexable: false, adsAllowed: false })
  })
  it('replaces the article without changing its identity or original publication date', () => {
    const revised = applyReviewedGuideRevision(original)
    expect(revised).toMatchObject({ id: original.id, slug: original.slug, created_at: original.created_at, author: 'Replaid Lab', updated_at: GUIDE_REVISION_DATE })
    expect(revised.body).toContain('Energy Javelin')
    expect(revised.body).toContain("King's Row")
    expect(revised.body).not.toContain('Resumen antiguo')
    expect(guideEditorial(revised).title).toBe(reviewedGuideRevisions[original.slug].title)
    expect(original.body).toBe('Resumen antiguo')
  })

  it('keeps the independent video attribution without replacing the article author', () => {
    const video = { ...original, slug: 'orisa-guia-video-overwatch', author: 'Kajor', body: 'Plantilla del vídeo', video_id: 'video-id', video_channel: 'Kajor', video_language: 'en', video_published_at: '2026-01-01' }
    const revised = applyReviewedGuideRevision(mergeReviewedGuideVideo(original, video))
    expect(revised).toMatchObject({ video_id: 'video-id', video_channel: 'Kajor', video_published_at: '2026-01-01', author: 'Replaid Lab' })
    expect(revised.body).not.toContain(video.body)
    expect(mergeReviewedGuideVideo(original, { ...video, hero: 'sigma' })).toEqual(original)
    expect(mergeReviewedGuideVideo({ ...original, video_id: 'own-video' }, video).video_id).toBe('own-video')
    expect(mergeReviewedGuideVideo(original, null)).toEqual(original)
  })

  it('shows the same selection with or without a hero filter and excludes duplicate video cards', () => {
    const video = { ...original, slug: 'orisa-guia-video-overwatch', category: 'Video guía' }
    const thin = { ...original, slug: 'otra-guia-breve' }
    const unpublished = { ...original, published: false }
    expect(discoverableGuides([original, video, thin, unpublished]).map(guide => guide.slug)).toEqual([original.slug])
    expect(discoverableGuides([original, video, thin].filter(guide => guide.hero === 'orisa')).map(guide => guide.slug)).toEqual([original.slug])
  })

  it('leaves unrelated content untouched', () => {
    const untouched = { ...original, slug: 'otro-articulo' }
    expect(applyReviewedGuideRevision(untouched)).toBe(untouched)
    expect(reviewedGuideTarget(untouched.slug)).toBeUndefined()
    expect(reviewedGuideTarget('toString')).toBeUndefined()
  })

  it('keeps role guides in their original category without borrowing a hero video', () => {
    const source = { ...original, slug: 'como-mejorar-como-dps-overwatch', hero: null, role: 'dps' as const, category: 'Fundamentos' }
    const revised = applyReviewedGuideRevision(source)
    expect(revised).toMatchObject({ id: original.id, slug: source.slug, hero: null, role: 'dps', category: 'Fundamentos', created_at: original.created_at, updated_at: '2026-10-01' })
    expect(reviewedGuideVideoSource(source.slug)).toBeUndefined()
    expect(revised.body).toContain('off-angle')
    expect(guideQualityDecision(revised)).toMatchObject({ indexable: false, adsAllowed: false })
  })

  it('uses the actual ranked article title and answer on related cards', () => {
    const slug = 'como-jugar-ana-ranked-overwatch'
    const ranked = getRankedHeroGuide(slug)!
    const body = `${ranked.quickAnswer}\n\n${ranked.intro.join('\n\n')}\n\n${ranked.sections.map(section => `## ${section.title}\n\n${section.paragraphs.join('\n\n')}\n\n${section.points?.join('\n') || ''}`).join('\n\n')}\n\n## Revisión de VOD\n\n${ranked.vodQuestions.join('\n')}\n\n## FAQ\n\n${ranked.faqs.map(faq => `### ${faq.question}\n\n${faq.answer}`).join('\n\n')}\n\n[Support](/roles/support) [VOD](/guides/como-mejorar-en-overwatch-revisando-vod)`
    const stored = { ...original, slug, title: 'Título antiguo', seo_title: 'Título antiguo para buscadores', seo_description: ranked.seoDescription, updated_at: ranked.modifiedAt, excerpt: ranked.quickAnswer, body }
    const [card] = discoverableGuides([stored])
    expect(card).toMatchObject({ id: original.id, slug, created_at: original.created_at, title: ranked.title, excerpt: ranked.quickAnswer, seo_description: ranked.seoDescription })
    expect(stored.title).toBe('Título antiguo')
  })

  it('revises standalone video routes in place, without redirects or recursive video lookup', () => {
    const slug = 'mauga-guia-video-overwatch'
    const video = { ...original, slug, hero: 'mauga', category: 'Video guía', video_id: 'original-video', video_channel: 'Original channel' }
    const revised = applyReviewedGuideRevision(video)
    expect(revised).toMatchObject({ slug, id: original.id, created_at: original.created_at, category: 'Héroes', content_type: 'guide', video_id: 'original-video', video_channel: 'Original channel', author: 'Replaid Lab' })
    expect(reviewedGuideTarget(slug)).toBeUndefined()
    expect(reviewedGuideVideoSource(slug)).toBeUndefined()
    expect(reviewedGuideVideoSource('orisa-guia-overwatch-fortify-javelin')).toBe('orisa-guia-video-overwatch')
    expect(reviewedGuideVideoSource('toString')).toBeUndefined()
    expect(discoverableGuides([video])).toEqual([revised])
    expect(guideEditorial(revised)).toMatchObject({ title: revised.title, seoTitle: revised.seo_title, description: revised.seo_description })
  })

  it('keeps every revision and its old URL out of the sitemap and ad inventory', () => {
    expect(Object.keys(reviewedGuideRevisions)).toHaveLength(44)
    for (const [slug, revision] of Object.entries(reviewedGuideRevisions)) {
      const guide = applyReviewedGuideRevision({ ...original, slug })
      if (revision.videoSlug === slug) {
        expect(reviewedGuideTarget(slug)).toBeUndefined()
        expect(reviewedGuideVideoSource(slug)).toBeUndefined()
      } else {
        expect(reviewedGuideTarget(revision.videoSlug)).toBe(slug)
        expect(reviewedGuideVideoSource(slug)).toBe(revision.videoSlug)
      }
      expect(isGuideSitemapEligible(guide)).toBe(false)
      expect(guideQualityDecision(guide)).toMatchObject({ indexable: false, adsAllowed: false })
      expect(guideQualityDecision({ ...guide, slug: revision.videoSlug })).toMatchObject({ indexable: false, adsAllowed: false })
      expect(revision.body).not.toMatch(/Title SEO|Meta description|keywords principales|plan de juego: qué pelea busca/i)
      expect(revision.body).toContain('## FAQ')
      expect(guide.updated_at).toBe(revision.revisedAt || GUIDE_REVISION_DATE)
    }
  })

  it('does not share substantive paragraphs between the new articles', () => {
    const seen = new Set<string>()
    for (const revision of Object.values(reviewedGuideRevisions)) {
      for (const paragraph of revision.body.split(/\n\n/).filter(text => text.length > 120 && !text.startsWith('#'))) {
        expect(seen.has(paragraph), paragraph).toBe(false)
        seen.add(paragraph)
      }
    }
  })

  it('links only to maps that have a published route', () => {
    for (const revision of Object.values(reviewedGuideRevisions)) {
      const links = Array.from(revision.body.matchAll(/\]\(\/maps\/([^)#\s]+)(?:#[^)]*)?\)/g), match => match[1])
      for (const slug of links) expect(MAP_PILLAR_SLUGS, `${revision.hero}: ${slug}`).toContain(slug)
    }
  })
})
