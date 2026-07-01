import { describe, expect, it } from 'vitest'
import {
  PATCH_NOTE_EDITORIAL_TAG,
  expertQualityDecision,
  isAnnouncementSitemapEligible,
  isGuideSitemapEligible,
  topicQualityDecision,
} from '@/lib/indexing-policy'

describe('indexing quality gates', () => {
  it('keeps stale seasonal guides out of the sitemap', () => {
    expect(isGuideSitemapEligible({
      slug: 'tier-list-season-2-overwatch-mejores-heroes-rol',
      body: 'contenido '.repeat(1_000),
      excerpt: 'resumen '.repeat(40),
    })).toBe(false)
  })

  it('allows the current editorial guide pillars', () => {
    expect(isGuideSitemapEligible({
      slug: 'como-usar-ultimates-overwatch',
      body: 'contenido editorial',
    })).toBe(true)
    expect(isGuideSitemapEligible({
      slug: 'cuando-cambiar-de-heroe-overwatch',
      body: 'contenido editorial',
    })).toBe(true)
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
    })).toBe(true)
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

  it('indexes only the completed counter and composition batch', () => {
    expect(topicQualityDecision('counter', 'shion').indexable).toBe(true)
    expect(topicQualityDecision('team_comp', 'shion').indexable).toBe(true)
    expect(topicQualityDecision('counter', 'ana').indexable).toBe(true)
    expect(topicQualityDecision('team_comp', 'ana').indexable).toBe(true)
    expect(topicQualityDecision('counter', 'genji').indexable).toBe(true)
    expect(topicQualityDecision('team_comp', 'genji').indexable).toBe(true)
    expect(topicQualityDecision('counter', 'kiriko').indexable).toBe(true)
    expect(topicQualityDecision('team_comp', 'kiriko').indexable).toBe(true)
    expect(topicQualityDecision('counter', 'reinhardt').indexable).toBe(true)
    expect(topicQualityDecision('team_comp', 'reinhardt').indexable).toBe(true)
    expect(topicQualityDecision('counter', 'dva').indexable).toBe(true)
    expect(topicQualityDecision('team_comp', 'dva').indexable).toBe(true)
    expect(topicQualityDecision('counter', 'winston').indexable).toBe(true)
    expect(topicQualityDecision('team_comp', 'winston').indexable).toBe(false)
  })
})
