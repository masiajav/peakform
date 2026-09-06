import { describe, expect, it } from 'vitest'
import {
  PATCH_NOTE_EDITORIAL_TAG,
  expertQualityDecision,
  isAnnouncementSitemapEligible,
  isGuideSitemapEligible,
  isPathAdEligible,
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

  it('requires real editorial depth even for strategic guide slugs', () => {
    expect(isGuideSitemapEligible({
      slug: 'como-usar-ultimates-overwatch',
      body: 'contenido editorial',
    })).toBe(false)
    expect(isGuideSitemapEligible({
      slug: 'cuando-cambiar-de-heroe-overwatch',
      body: 'contenido editorial '.repeat(700),
      excerpt: 'Resumen útil y específico para jugadores de Overwatch que quieren tomar mejores decisiones durante una partida competitiva, entender sus errores, revisar cooldowns y aplicar cambios concretos en la siguiente sesión de ranked.',
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
    expect(topicQualityDecision('team_comp', 'winston').indexable).toBe(true)
    expect(topicQualityDecision('counter', 'cassidy').indexable).toBe(true)
    expect(topicQualityDecision('team_comp', 'cassidy').indexable).toBe(true)
    expect(topicQualityDecision('counter', 'zarya').indexable).toBe(true)
    expect(topicQualityDecision('team_comp', 'zarya').indexable).toBe(true)
    expect(topicQualityDecision('counter', 'tracer').indexable).toBe(true)
    expect(topicQualityDecision('team_comp', 'tracer').indexable).toBe(true)
    expect(topicQualityDecision('counter', 'domina').indexable).toBe(true)
    expect(topicQualityDecision('counter', 'mercy').indexable).toBe(false)
  })

  it('keeps ads off hubs, profiles and unfinished routes', () => {
    expect(isPathAdEligible('/')).toBe(false)
    expect(isPathAdEligible('/guides')).toBe(false)
    expect(isPathAdEligible('/counters')).toBe(false)
    expect(isPathAdEligible('/news')).toBe(false)
    expect(isPathAdEligible('/experts/coach-overwatch')).toBe(false)
    expect(isPathAdEligible('/guides/como-jugar-ana-ranked-overwatch')).toBe(true)
    expect(isPathAdEligible('/guides/guia-programatica-pendiente')).toBe(false)
  })
})
