import { describe, expect, it } from 'vitest'
import { reviewedAnaHero as ana } from '@/lib/reviewed-hero-ana'
import { getHeroPillar } from '@/lib/hero-pillars'
import { PUBLIC_HERO_PAGE_SLUGS } from '@/lib/topic-links'
import { topicQualityDecision } from '@/lib/indexing-policy'

describe('individual Ana hero article', () => {
  it('uses its own opening decisions, dated model and map examples', () => {
    expect(getHeroPillar('ana')).toBe(ana)
    expect(ana.publishedAt).toBe('2026-06-26')
    expect(ana.schemaDate).toBe('2026-10-09')
    expect(ana.updatedAt).toBe('9 de octubre de 2026')
    expect(ana.headerTips).toHaveLength(3)
    expect(ana.quickAnswers?.map(item => item.title)).toEqual(['Si estás muriendo al dive', 'Si la granada no consigue bajas', 'Si no sabes a quién dar Nano'])
    expect(ana.sections.some(item => item.title.startsWith('Gibraltar:'))).toBe(true)
    expect(ana.sections.some(item => item.title.startsWith('King’s Row:'))).toBe(true)
    expect(JSON.stringify(ana)).not.toMatch(/Para jugar contra Ana: respeta|Nano siempre para Genji|he probado|mis partidas|TITLE SEO/i)
  })

  it('separates mutually exclusive normal perks from Stadium and avoids unstable numeric claims', () => {
    expect(ana.perks?.map(item => item.title)).toEqual(['Minor · Local Anesthetic', 'Minor · Speed Serum', 'Major · Biotic Bounce', 'Major · Headhunter'])
    expect(ana.perksIntro).toContain('Stadium son distintos')
    expect(ana.perks?.[0].body).toContain('explota al impactar')
    expect(ana.perks?.[0].body).toContain('45 de daño durante 3 segundos')
    expect(ana.perks?.[0].body).toContain('no significa que todos queden dormidos')
    expect(ana.perks?.[1].body).toContain('alternativa a Local Anesthetic')
    expect(ana.perks?.[3].body).toContain('alternativa a Biotic Bounce')
    expect(ana.perks?.[3].body).toContain('no añade críticos a tus curas')
    expect(JSON.stringify(ana.perks)).not.toMatch(/30%|40%/)
    expect(ana.balanceReview?.[0].title).toBe('6 de octubre: Sleep con Local Anesthetic')
    expect(ana.conclusion).toContain('un Sleep acertado y una granada sin baja')
  })

  it('retains the entire public hero route list independently of approval', () => {
    expect(PUBLIC_HERO_PAGE_SLUGS).toHaveLength(12)
    expect(PUBLIC_HERO_PAGE_SLUGS).toContain('shion')
    for (const slug of PUBLIC_HERO_PAGE_SLUGS) expect(getHeroPillar(slug), slug).not.toBeNull()
    expect(ana.links.map(link => link.href)).toContain('/guides/como-jugar-ana-ranked-overwatch')
    expect(ana.links.map(link => link.href)).toContain('/counters/ana')
    expect(ana.links.map(link => link.href)).toContain('/team-comps/ana')
  })

  it('publishes only individually reviewed hero revisions, keeping other public heroes pending', () => {
    for (const slug of PUBLIC_HERO_PAGE_SLUGS) expect(topicQualityDecision('hero', slug), slug).toMatchObject({ indexable: ['ana', 'kiriko', 'genji', 'reinhardt', 'dva', 'winston', 'cassidy', 'tracer', 'zarya', 'shion', 'dmon', 'doctrine'].includes(slug), adsAllowed: false })
  })
})
