import { describe, expect, it } from 'vitest'
import { applyReviewedGuideRevision, mergeReviewedGuideVideo, reviewedGuideRevisions } from '@/lib/reviewed-guide-revisions'
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

  it('requires the reviewed video and full rendered version, including a companion video row', () => {
    for (const [slug, hero, role, tags] of [
      ['moira-guia-overwatch-recursos-supervivencia', 'moira', 'support', ['moira', 'support', 'recursos', 'supervivencia', '6v6']],
      ['reaper-guia-video-overwatch', 'reaper', 'dps', ['reaper', 'dps', 'video', 'youtube', '6v6', 'overwatch']],
      ['brigitte-guia-overwatch-peel-anti-dive', 'brigitte', 'support', ['brigitte', 'support', 'anti-dive', 'peel', '6v6']],
      ['echo-guia-overwatch-burst-vertical', 'echo', 'dps', ['echo', 'dps', 'flyers', 'burst', '6v6']],
      ['ashe-guia-overwatch-angulos-dinamita', 'ashe', 'dps', ['ashe', 'dps', 'hitscan', 'dinamita', '6v6']],
      ['hanzo-guia-video-overwatch', 'hanzo', 'dps', ['hanzo', 'dps', 'video', 'youtube', '6v6', 'overwatch']],
      ['mei-guia-video-overwatch', 'mei', 'dps', ['mei', 'dps', 'video', 'youtube', '6v6', 'overwatch']],
      ['sojourn-guia-overwatch-railgun-presion', 'sojourn', 'dps', ['sojourn', 'dps', 'railgun', 'hitscan', '6v6']],
      ['bastion-guia-video-overwatch', 'bastion', 'dps', ['bastion', 'dps', 'video', 'youtube', '6v6', 'overwatch']],
      ['symmetra-guia-video-overwatch', 'symmetra', 'dps', ['symmetra', 'dps', 'video', 'youtube', '6v6', 'overwatch']],
      ['torbjorn-guia-video-overwatch', 'torbjorn', 'dps', ['torbjorn', 'dps', 'video', 'youtube', '6v6', 'overwatch']],
    ] as const) {
      const revision = reviewedGuideRevisions[slug]
      const raw = { slug, hero, role, tags: [...tags], published: true, created_at: '2026-05-05' }
      const video = { hero, ...revision.reviewedVideo }
      const merged = mergeReviewedGuideVideo(raw, video)
      const rendered = applyReviewedGuideRevision(merged)
      expect(guideQualityDecision(rendered)).toMatchObject({ indexable: true, adsAllowed: false })
      expect(isGuideSitemapEligible(merged)).toBe(true)
      expect(guideQualityDecision(applyReviewedGuideRevision(raw)).indexable).toBe(false)
      expect(isGuideSitemapEligible(raw)).toBe(false)
      for (const edit of [
        { video_id: 'unreviewed-video' }, { video_title: 'Other title' }, { video_channel: 'Other channel' },
        { video_published_at: '2026-10-28' }, { cover_image: '/unreviewed.png' }, { role: 'tank' }, { tags: ['new-tag'] },
      ]) {
        expect(guideQualityDecision({ ...rendered, ...edit }).indexable).toBe(false)
        expect(isGuideSitemapEligible({ ...merged, ...edit })).toBe(false)
      }
    }
    expect(guideQualityDecision({ ...applyReviewedGuideRevision(stored), video_id: 'unreviewed-video' }).indexable).toBe(false)
  })

  it('corrects only the reviewed source video title without changing its input or masking later edits', () => {
    const slug = 'sojourn-guia-overwatch-railgun-presion'
    const revision = reviewedGuideRevisions[slug]
    const source = { slug, hero: 'sojourn', role: 'dps' as const, tags: ['sojourn', 'dps', 'railgun', 'hitscan', '6v6'], published: true, created_at: '2026-05-05', ...revision.reviewedVideo, video_title: revision.sourceVideoTitle }
    const before = structuredClone(source)
    const corrected = applyReviewedGuideRevision(source)
    expect(corrected.video_title).toBe('Guía básica: Sojourn | Overwatch 2')
    expect(source).toEqual(before)
    expect(guideQualityDecision(corrected)).toMatchObject({ indexable: true, adsAllowed: false })
    for (const edit of [{ video_title: 'Unreviewed title' }, { video_id: 'another-video' }, { video_channel: 'Unreviewed author' }]) {
      expect(guideQualityDecision(applyReviewedGuideRevision({ ...source, ...edit })).indexable).toBe(false)
    }
    const differentVideo = applyReviewedGuideRevision({ ...source, video_id: 'another-video' })
    expect(differentVideo.video_title).toBe(source.video_title)
  })
})
