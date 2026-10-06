import { describe, expect, it } from 'vitest'
import { reviewedZaryaHero as zarya } from '@/lib/reviewed-hero-zarya'
import { getHeroPillar } from '@/lib/hero-pillars'
import { topicQualityDecision } from '@/lib/indexing-policy'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

describe('individual Zarya hero article', () => {
  it('keeps its publication history, map decisions and own conclusion', () => {
    expect(getHeroPillar('zarya')).toBe(zarya)
    expect(zarya.publishedAt).toBe('2026-06-26')
    expect(zarya.schemaDate).toBe('2026-10-04')
    expect(zarya.sections.some(item => item.title.startsWith('Oasis:'))).toBe(true)
    expect(zarya.sections.some(item => item.title.startsWith('Eichenwalde:'))).toBe(true)
    expect(zarya.conclusion).toContain('cuando terminó la burbuja')
    expect(zarya.links.map(item => item.href)).toEqual(expect.arrayContaining(['/maps/oasis', '/maps/eichenwalde', '/counters/zarya', '/team-comps/zarya']))
    expect(JSON.stringify(zarya)).not.toMatch(/TITLE SEO|mis partidas|he probado|energía de ego|No describas/)
  })

  it('explains protection independently of energy and separates beam from grenades', () => {
    expect(zarya.abilities.map(item => item.title)).toEqual(['Particle Cannon', 'Particle Barrier', 'Projected Barrier', 'Energy', 'Graviton Surge', 'Bruiser'])
    expect(zarya.abilities[0].body).toContain('Matrix puede negar tus granadas, pero no el beam')
    expect(zarya.abilities[1].body).toContain('No puedes bajarla manualmente')
    expect(zarya.quickAnswers?.[1].body).toContain('No tienes que conseguir energía en cada uso')
    expect(zarya.faqs).toHaveLength(6)
    expect(zarya.compositions[2].body).toContain('no forman una composición estándar de cola por roles 5v5')
  })

  it('separates current Minor and Major perks from old thresholds and Stadium powers', () => {
    expect(zarya.perks?.map(item => item.title)).toEqual(['Minor · Jump-Ups', 'Minor · Spotter', 'Major · Extra Oomph', 'Major · Energy Lance'])
    expect(zarya.perks?.[1].body).toContain('alternativa a Jump-Ups')
    expect(zarya.perks?.[3].body).toContain('alternativa a Extra Oomph')
    expect(zarya.perks?.[3].body).toContain('No exige alcanzar 50 de energía')
    expect(zarya.perksIntro).toContain('no son los poderes de Stadium')
    expect(JSON.stringify(zarya.perks)).not.toMatch(/Energy Converter|Graviton Crush|No Limits|\d+%|\d+ segundos/)
  })

  it('indexes only the exact manually reviewed version and never enables ads', () => {
    expect(topicQualityDecision('hero', 'zarya')).toMatchObject({ indexable: true, adsAllowed: false })
    expect(hasCurrentStaticEditorialReview('/heroes/zarya', zarya)).toBe(true)
    expect(hasCurrentStaticEditorialReview('/heroes/zarya', { ...zarya, conclusion: 'Una edicion pendiente' })).toBe(false)
    expect(hasCurrentStaticEditorialReview('/heroes/tracer', zarya)).toBe(false)
  })
})
