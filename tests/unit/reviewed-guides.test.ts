import { describe, expect, it } from 'vitest'
import type { GuideContent } from '@/lib/content'
import { discoverableGuides } from '@/lib/guide-discovery'
import { guideEditorial } from '@/lib/guide-editorial'
import { guideQualityDecision, isGuideSitemapEligible } from '@/lib/indexing-policy'
import { applyReviewedGuideRevision, GUIDE_REVISION_DATE, mergeReviewedGuideVideo, reviewedGuideRevisions, reviewedGuideTarget } from '@/lib/reviewed-guide-revisions'

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

  it('keeps all eight revisions and their old URLs out of the sitemap and ad inventory', () => {
    expect(Object.keys(reviewedGuideRevisions)).toHaveLength(8)
    for (const [slug, revision] of Object.entries(reviewedGuideRevisions)) {
      const guide = applyReviewedGuideRevision({ ...original, slug })
      expect(reviewedGuideTarget(revision.videoSlug)).toBe(slug)
      expect(isGuideSitemapEligible(guide)).toBe(false)
      expect(guideQualityDecision(guide)).toMatchObject({ indexable: false, adsAllowed: false })
      expect(guideQualityDecision({ ...guide, slug: revision.videoSlug })).toMatchObject({ indexable: false, adsAllowed: false })
      expect(revision.body).not.toMatch(/Title SEO|Meta description|keywords principales|plan de juego: qué pelea busca/i)
      expect(revision.body).toContain('## FAQ')
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
})
