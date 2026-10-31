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
      ['mauga-guia-video-overwatch', 'mauga', 'tank', ['mauga', 'tank', 'video', 'youtube', '6v6', 'overwatch']],
      ['ramattra-guia-video-overwatch', 'ramattra', 'tank', ['ramattra', 'tank', 'video', 'youtube', '6v6', 'overwatch']],
      ['wrecking-ball-guia-video-overwatch', 'wrecking-ball', 'tank', ['wrecking-ball', 'tank', 'video', 'youtube', '6v6', 'overwatch']],
      ['junkrat-guia-video-overwatch', 'junkrat', 'dps', ['junkrat', 'dps', 'video', 'youtube', '6v6', 'overwatch']],
      ['venture-guia-video-overwatch', 'venture', 'dps', ['venture', 'dps', 'video', 'youtube', '6v6', 'overwatch']],
      ['hazard-guia-video-overwatch', 'hazard', 'tank', ['hazard', 'tank', 'video', 'youtube', '6v6', 'overwatch']],
      ['freja-guia-video-overwatch', 'freja', 'dps', ['freja', 'dps', 'video', 'youtube', '6v6', 'overwatch']],
      ['wuyang-guia-video-overwatch', 'wuyang', 'support', ['wuyang', 'support', 'video', 'youtube', '6v6', 'overwatch']],
      ['widowmaker-guia-overwatch-lineas-vision', 'widowmaker', 'dps', ['widowmaker', 'dps', 'sniper', 'mapas', '6v6']],
      ['soldier-76-guia-overwatch-off-angles', 'soldier-76', 'dps', ['soldier-76', 'dps', 'hitscan', 'off-angles', '6v6']],
      ['doomfist-guia-overwatch-entradas-cooldowns', 'doomfist', 'tank', ['doomfist', 'tank', 'dive', 'cooldowns', '6v6']],
      ['roadhog-guia-video-overwatch', 'roadhog', 'tank', ['roadhog', 'tank', 'video', 'youtube', '6v6', 'overwatch']],
      ['anran-guia-video-overwatch', 'anran', 'dps', ['anran', 'dps', 'video', 'youtube', '6v6', 'overwatch']],
      ['baptiste-guia-overwatch-lamp-window', 'baptiste', 'support', ['baptiste', 'support', 'lamp', 'matrix', '6v6']],
      ['illari-guia-overwatch-pilon-dano', 'illari', 'support', ['illari', 'support', 'pilon', 'dano', '6v6']],
      ['lucio-guia-overwatch-speed-peel', 'lucio', 'support', ['lucio', 'support', 'speed', 'brawl', '6v6']],
      ['zenyatta-guia-overwatch-discord-transcendence', 'zenyatta', 'support', ['zenyatta', 'support', 'discord', 'poke', '6v6']],
      ['mercy-guia-overwatch-pocket-resurrect', 'mercy', 'support', ['mercy', 'support', 'pocket', 'resurrect', '6v6']],
      ['juno-guia-video-overwatch', 'juno', 'support', ['juno', 'support', 'video', 'youtube', '6v6', 'overwatch']],
      ['lifeweaver-guia-video-overwatch', 'lifeweaver', 'support', ['lifeweaver', 'support', 'video', 'youtube', '6v6', 'overwatch']],
      ['orisa-guia-overwatch-fortify-javelin', 'orisa', 'tank', ['orisa', 'tank', 'frontline', 'javelin', '6v6']],
      ['sigma-guia-overwatch-poke-escudo', 'sigma', 'tank', ['sigma', 'tank', 'poke', 'escudo', '6v6']],
      ['junker-queen-guia-overwatch-tempo-heridas', 'junker-queen', 'tank', ['junker-queen', 'tank', 'brawl', 'tempo', '6v6']],
      ['pharah-guia-overwatch-presion-aerea', 'pharah', 'dps', ['pharah', 'dps', 'flyers', 'barrage', '6v6']],
      ['emre-guia-video-overwatch', 'emre', 'dps', ['emre', 'dps', 'video', 'youtube', '6v6', 'overwatch']],
      ['sierra-guia-video-overwatch', 'sierra', 'dps', ['sierra', 'dps', 'video', 'youtube', '6v6', 'overwatch']],
      ['mizuki-guia-video-overwatch', 'mizuki', 'support', ['mizuki', 'support', 'video', 'youtube', '6v6', 'overwatch']],
      ['vendetta-guia-video-overwatch', 'vendetta', 'dps', ['vendetta', 'dps', 'video', 'youtube', '6v6', 'overwatch']],
      ['domina-guia-video-overwatch', 'domina', 'tank', ['domina', 'tank', 'video', 'youtube', '6v6', 'overwatch']],
      ['jetpack-cat-guia-video-overwatch', 'jetpack-cat', 'support', ['jetpack-cat', 'support', 'video', 'youtube', '6v6', 'overwatch']],
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
        { video_published_at: '2026-10-28' }, { cover_image: '/unreviewed.png' }, { role: role === 'tank' ? 'support' : 'tank' }, { tags: ['new-tag'] },
      ]) {
        expect(guideQualityDecision({ ...rendered, ...edit }).indexable).toBe(false)
        expect(isGuideSitemapEligible({ ...merged, ...edit })).toBe(false)
      }
    }
    expect(guideQualityDecision({ ...applyReviewedGuideRevision(stored), video_id: 'unreviewed-video' }).indexable).toBe(false)
  })

  it('corrects the known Sombra DPS tag while preserving other tags and rejecting unexpected metadata', () => {
    const slug = 'sombra-guia-video-overwatch'
    const revision = reviewedGuideRevisions[slug]
    const source = { slug, hero: 'sombra', role: 'dps' as const, tags: ['sombra', 'dps', 'video', 'youtube', '6v6', 'overwatch'], published: true, created_at: '2026-05-06', ...revision.reviewedVideo, video_title: revision.sourceVideoTitle }
    const before = structuredClone(source)
    const corrected = applyReviewedGuideRevision(source)
    expect(source).toEqual(before)
    expect(corrected.role).toBe('support')
    expect(corrected.tags).toEqual(['sombra', 'support', 'video', 'youtube', '6v6', 'overwatch'])
    expect(guideQualityDecision(corrected)).toMatchObject({ indexable: true, adsAllowed: false })
    expect(isGuideSitemapEligible(source)).toBe(true)
    expect(applyReviewedGuideRevision(corrected)).toEqual(corrected)
    expect(isGuideSitemapEligible({ ...source, tags: corrected.tags })).toBe(true)
    for (const tags of [[...source.tags, 'unreviewed-tag'], [...source.tags, '__proto__'], source.tags.filter(tag => tag !== 'youtube'), source.tags.map(tag => tag === 'dps' ? 'tank' : tag)]) {
      const changed = { ...source, tags }
      const rendered = applyReviewedGuideRevision(changed)
      expect(rendered.tags).toEqual(tags.map(tag => tag === 'dps' ? 'support' : tag))
      expect(guideQualityDecision(rendered).indexable).toBe(false)
      expect(isGuideSitemapEligible(changed)).toBe(false)
    }
    for (const edit of [{ video_id: 'another-video' }, { video_title: 'Unknown title' }, { video_channel: 'Unknown channel' }, { video_language: 'en' }, { video_published_at: '2026-10-29' }, { cover_image: '/unknown.png' }]) {
      expect(guideQualityDecision(applyReviewedGuideRevision({ ...source, ...edit })).indexable).toBe(false)
      expect(isGuideSitemapEligible({ ...source, ...edit })).toBe(false)
    }
    expect(guideQualityDecision({ ...corrected, role: 'tank' }).indexable).toBe(false)
    expect(guideQualityDecision({ ...corrected, tags: source.tags }).indexable).toBe(false)
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

  it('corrects the known video attribution together and rejects unexpected identity or language changes', () => {
    const slug = 'wuyang-guia-video-overwatch'
    const revision = reviewedGuideRevisions[slug]
    const source = { slug, hero: 'wuyang', role: 'support' as const, tags: ['wuyang', 'support', 'video', 'youtube', '6v6', 'overwatch'], published: true, created_at: '2026-05-06', ...revision.reviewedVideo, ...revision.sourceVideoMetadata }
    const before = structuredClone(source)
    const corrected = applyReviewedGuideRevision(source)
    expect(corrected).toMatchObject(revision.reviewedVideo!)
    expect(source).toEqual(before)
    expect(guideQualityDecision(corrected)).toMatchObject({ indexable: true, adsAllowed: false })
    expect(isGuideSitemapEligible(source)).toBe(true)
    expect(applyReviewedGuideRevision(corrected)).toEqual(corrected)
    for (const edit of [{ video_title: 'Unknown title' }, { video_channel: 'Unknown channel' }, { video_language: 'es' }, { video_id: 'another-video' }, { video_url: 'https://www.youtube.com/watch?v=another-video' }, { video_published_at: '2026-10-29' }]) {
      const changed = { ...source, ...edit }
      expect(guideQualityDecision(applyReviewedGuideRevision(changed)).indexable).toBe(false)
      expect(isGuideSitemapEligible(changed)).toBe(false)
    }
    const changedLanguage = applyReviewedGuideRevision({ ...source, video_language: 'es' })
    expect(changedLanguage.video_title).toBe(source.video_title)
    expect(changedLanguage.video_channel).toBe(source.video_channel)
    expect(changedLanguage.video_language).toBe('es')
  })
})
