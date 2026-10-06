import { describe, expect, it } from 'vitest'
import { reviewedReinhardtHero as reinhardt } from '@/lib/reviewed-hero-reinhardt'
import { getHeroPillar } from '@/lib/hero-pillars'
import { topicQualityDecision } from '@/lib/indexing-policy'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

describe('individual Reinhardt hero article', () => {
  it('keeps its own dated article, map examples and conclusion', () => {
    expect(getHeroPillar('reinhardt')).toBe(reinhardt)
    expect(reinhardt.publishedAt).toBe('2026-06-26')
    expect(reinhardt.schemaDate).toBe('2026-10-04')
    expect(reinhardt.sections.some(item => item.title.startsWith('King’s Row:'))).toBe(true)
    expect(reinhardt.sections.some(item => item.title.startsWith('Circuit Royal:'))).toBe(true)
    expect(reinhardt.conclusion).toContain('un cruce y una Charge')
    expect(reinhardt.links.map(item => item.href)).toEqual(expect.arrayContaining(['/maps/kings-row', '/maps/circuit-royal', '/counters/reinhardt', '/team-comps/reinhardt']))
    expect(JSON.stringify(reinhardt)).not.toMatch(/TITLE SEO|mis partidas|he probado|Shatter gratis garantizada/)
  })

  it('describes cancellation and distinguishes barrier protection from specific threats', () => {
    expect(reinhardt.abilities.map(item => item.title)).toEqual(['Rocket Hammer', 'Barrier Field', 'Charge', 'Fire Strike', 'Earthshatter'])
    expect(reinhardt.abilities.find(item => item.title === 'Charge')?.body).toContain('no devuelve el cooldown')
    expect(reinhardt.counters.find(item => item.title === 'Ramattra')?.body).toContain('atraviesa barreras')
    expect(reinhardt.faqs.find(item => item.question === '¿Suzu levanta a los enemigos derribados por Shatter?')?.answer).toContain('No elimina un derribo de Earthshatter ya aplicado')
    expect(reinhardt.faqs[0].answer).toContain('No siempre')
  })

  it('separates current normal perks from retired perks and Stadium powers', () => {
    expect(reinhardt.perks?.map(item => item.title)).toEqual(['Minor · Crusader’s Fire', 'Minor · Crusader’s Resolve', 'Major · Shield Slam', 'Major · Ignited Fury'])
    expect(reinhardt.perks?.[1].body).toContain('regeneración pasiva de tu salud')
    expect(reinhardt.perks?.[2].body).toContain('barrera activa')
    expect(reinhardt.perks?.[3].body).toContain('alternativa a Shield Slam')
    expect(reinhardt.perksIntro).toContain('Stadium')
    expect(JSON.stringify(reinhardt.perks)).not.toMatch(/Barrier Re-Charge|\d+%|\d+ segundos/)
  })

  it('publishes only the exact reviewed version without advertisements', () => {
    expect(topicQualityDecision('hero', 'reinhardt')).toMatchObject({ indexable: true, adsAllowed: false })
    expect(hasCurrentStaticEditorialReview('/heroes/reinhardt', reinhardt)).toBe(true)
    expect(hasCurrentStaticEditorialReview('/heroes/reinhardt', { ...reinhardt, conclusion: 'Una edición pendiente' })).toBe(false)
    expect(hasCurrentStaticEditorialReview('/heroes/ana', reinhardt)).toBe(false)
  })
})
