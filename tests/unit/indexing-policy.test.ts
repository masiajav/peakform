import { describe, expect, it } from 'vitest'
import {
  PATCH_NOTE_EDITORIAL_TAG,
  expertQualityDecision,
  isAnnouncementSitemapEligible,
  isGuideSitemapEligible,
  guidePublicationIssues,
  isPathAdEligible,
  topicQualityDecision,
} from '@/lib/indexing-policy'
import { reviewedGuideRevisions } from '@/lib/reviewed-guide-revisions'
import { reviewedPatchFixture } from '../fixtures/reviewed-patch'
import { editorialReviewTags } from '@/lib/editorial-review'

const revision = reviewedGuideRevisions['mauga-guia-video-overwatch']
const guide = {
  slug: 'guia-revisada',
  title: revision.title,
  seo_title: revision.title,
  seo_description: revision.description,
  excerpt: revision.quickAnswer,
  body: revision.body,
  author: 'Replaid Lab',
  created_at: '2026-05-06',
  updated_at: '2026-10-01',
  content_type: 'guide',
}
const completeGuide = { ...guide, tags: editorialReviewTags(guide, 'admin-fixture', '2026-10-02') }

describe('indexing quality gates', () => {
  it('keeps stale seasonal guides out of the sitemap', () => {
    expect(isGuideSitemapEligible({
      slug: 'tier-list-season-2-overwatch-mejores-heroes-rol',
      body: 'contenido '.repeat(1_000),
      excerpt: 'resumen '.repeat(40),
    })).toBe(false)
  })

  it('requires real editorial depth even for strategic guide slugs', () => {
    expect(isGuideSitemapEligible({
      slug: 'como-usar-ultimates-overwatch',
      body: 'contenido editorial',
    })).toBe(false)
    expect(isGuideSitemapEligible({
      slug: 'cuando-cambiar-de-heroe-overwatch',
      body: 'contenido editorial '.repeat(700),
      excerpt: 'Resumen útil y específico para jugadores de Overwatch que quieren tomar mejores decisiones durante una partida competitiva, entender sus errores, revisar cooldowns y aplicar cambios concretos en la siguiente sesión de ranked.',
    })).toBe(false)
    expect(isGuideSitemapEligible(completeGuide)).toBe(true)
    expect(isGuideSitemapEligible({ ...completeGuide, tags: [] })).toBe(false)
    expect(isGuideSitemapEligible({ ...completeGuide, body: `${completeGuide.body}\n\nUna corrección sin revisar.` })).toBe(false)
  })

  it('rejects repeated paragraphs, internal instructions and incomplete metadata', () => {
    expect(guidePublicationIssues(completeGuide)).toEqual([])
    const paragraph = completeGuide.body.split(/\n\s*\n/).find(text => text.split(/\s+/).length >= 30)!
    for (const guide of [
      { ...completeGuide, body: `${completeGuide.body}\n\n${paragraph}` },
      { ...completeGuide, body: `${completeGuide.body}\n\n## TITLE SEO\n\nNotas internas` },
      { ...completeGuide, body: `${completeGuide.body}\n\n## URL\n\n/guides/prueba` },
      { ...completeGuide, author: null },
      { ...completeGuide, updated_at: 'fecha sin comprobar' },
      { ...completeGuide, seo_title: null },
      { ...completeGuide, published: false },
      { ...completeGuide, body: `## Introducción\n\n${'contenido editorial '.repeat(700)}\n\n## Ejemplos\n\nConsulta [Ana](/heroes/ana).\n\n## Revisión\n\nConsulta [King\'s Row](/maps/kings-row).` },
      { ...completeGuide, body: completeGuide.body.replace(/\]\(\/[^)]+\)/g, ']') },
    ]) {
      expect(isGuideSitemapEligible(guide)).toBe(false)
    }
  })

  it('requires an editorial review before indexing a patch note', () => {
    const basePatch = {
      slug: 'notas-parche-overwatch-2026-06-28',
      content_type: 'patch_note',
      body: 'cambio '.repeat(450),
      excerpt: 'Resumen editorial propio del impacto del parche, los héroes afectados y las decisiones que cambian en partidas competitivas de Overwatch.',
      source_url: 'https://overwatch.blizzard.com/es-es/news/patch-notes/',
    }

    expect(isAnnouncementSitemapEligible(basePatch)).toBe(false)
    expect(isAnnouncementSitemapEligible({
      ...basePatch,
      tags: [PATCH_NOTE_EDITORIAL_TAG],
    })).toBe(false)
    expect(isAnnouncementSitemapEligible(reviewedPatchFixture)).toBe(true)
    expect(isAnnouncementSitemapEligible({ ...reviewedPatchFixture, published: false })).toBe(false)
    expect(isAnnouncementSitemapEligible({ ...reviewedPatchFixture, seo_description: null })).toBe(false)
  })

  it('only indexes complete expert profiles', () => {
    const completeExpert = {
      status: 'active',
      slug: 'coach-overwatch',
      display_name: 'Coach',
      bio: 'Experiencia '.repeat(45),
      specialties: ['Tank', 'VOD review'],
      avatar_url: 'https://example.com/avatar.png',
      peak_rank: 'Grandmaster',
      main_role: 'tank',
      tier_starter_enabled: true,
    }

    expect(expertQualityDecision(completeExpert).indexable).toBe(true)
    expect(expertQualityDecision({ ...completeExpert, bio: 'Bio breve' }).indexable).toBe(false)
  })

  it('does not treat the legacy slug list as an editorial approval', () => {
    for (const slug of ['shion', 'ana', 'genji', 'kiriko', 'reinhardt', 'dva', 'winston', 'cassidy', 'zarya', 'tracer', 'domina']) {
      expect(topicQualityDecision('counter', slug)).toMatchObject({ indexable: ['genji', 'kiriko'].includes(slug), adsAllowed: false })
      expect(topicQualityDecision('team_comp', slug)).toMatchObject({ indexable: ['ana', 'genji', 'kiriko', 'reinhardt', 'dva', 'winston', 'tracer', 'zarya'].includes(slug), adsAllowed: false })
    }
    for (const slug of ['freja', 'pharah', 'lifeweaver', 'juno', 'baptiste', 'illari', 'lucio', 'mercy', 'orisa', 'ramattra', 'sigma', 'jetpack-cat', 'wuyang', 'zenyatta', 'junker-queen', 'mauga', 'hazard', 'junkrat', 'soldier-76', 'wrecking-ball', 'venture', 'vendetta', 'anran', 'mizuki', 'sombra']) {
      expect(topicQualityDecision('counter', slug)).toMatchObject({ indexable: true, adsAllowed: false })
    }
    expect(topicQualityDecision('counter', 'doctrine')).toMatchObject({ indexable: true, adsAllowed: false })
    expect(topicQualityDecision('counter', 'roadhog')).toMatchObject({ indexable: true, adsAllowed: false })
  })

  it('keeps ads off hubs, profiles and unfinished routes', () => {
    expect(isPathAdEligible('/')).toBe(false)
    expect(isPathAdEligible('/guides')).toBe(false)
    expect(isPathAdEligible('/counters')).toBe(false)
    expect(isPathAdEligible('/news')).toBe(false)
    expect(isPathAdEligible('/experts/coach-overwatch')).toBe(false)
    expect(isPathAdEligible('/guides/como-jugar-ana-ranked-overwatch')).toBe(false)
    expect(isPathAdEligible('/guides/guia-programatica-pendiente')).toBe(false)
  })
})
