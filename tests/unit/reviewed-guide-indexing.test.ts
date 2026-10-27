import { describe, expect, it } from 'vitest'
import { applyReviewedGuideRevision, reviewedGuideRevisions } from '@/lib/reviewed-guide-revisions'
import { guideQualityDecision, isGuideAdEligible, isGuideSitemapEligible } from '@/lib/indexing-policy'

const slug = 'como-mejorar-como-dps-overwatch'
const stored = { slug, title: 'Texto original conservado', body: 'Texto original', published: true, created_at: '2026-06-21' }

describe('individual publication of repository-owned guide revisions', () => {
  it('indexes the exact reviewed text while preserving the DB original and forbidding ads', () => {
    const before = structuredClone(stored)
    const rendered = applyReviewedGuideRevision(stored)
    expect(isGuideSitemapEligible(stored)).toBe(true)
    expect(guideQualityDecision(rendered)).toMatchObject({ status: 'index_no_ads', indexable: true, adsAllowed: false })
    expect(isGuideAdEligible(rendered)).toBe(false)
    expect(stored).toEqual(before)
    expect(isGuideSitemapEligible({ ...stored, published: false })).toBe(false)
  })

  it('invalidates indexing if the reviewed source version or rendered text changes', () => {
    const rendered = applyReviewedGuideRevision(stored)
    expect(guideQualityDecision({ ...rendered, body: `${rendered.body}\nUna frase sin revisar.` }).indexable).toBe(false)
    expect(guideQualityDecision({ ...rendered, seo_title: 'Otro título' }).indexable).toBe(false)
    const source = reviewedGuideRevisions[slug]
    const original = source.body
    try {
      source.body += '\nUna modificación posterior a la revisión.'
      expect(isGuideSitemapEligible(stored)).toBe(false)
      expect(guideQualityDecision(applyReviewedGuideRevision(stored)).indexable).toBe(false)
    } finally { source.body = original }
  })

  it('does not approve another reviewed guide, a redirect alias or an incomplete original row', () => {
    expect(isGuideSitemapEligible({ ...stored, slug: 'mauga-guia-video-overwatch' })).toBe(false)
    expect(isGuideSitemapEligible({ ...stored, slug: 'orisa-guia-video-overwatch' })).toBe(false)
    expect(isGuideSitemapEligible({ ...stored, created_at: undefined })).toBe(false)
  })
})
