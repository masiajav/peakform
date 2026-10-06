import { describe, expect, it } from 'vitest'
import { reviewedGenjiHero as genji } from '@/lib/reviewed-hero-genji'
import { getHeroPillar } from '@/lib/hero-pillars'
import { topicQualityDecision } from '@/lib/indexing-policy'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

describe('individual Genji hero article', () => {
  it('keeps its own dated article, map examples and conclusion', () => {
    expect(getHeroPillar('genji')).toBe(genji)
    expect(genji.publishedAt).toBe('2026-06-26')
    expect(genji.schemaDate).toBe('2026-10-04')
    expect(genji.sections.some(item => item.title.startsWith('Gibraltar:'))).toBe(true)
    expect(genji.sections.some(item => item.title.startsWith('King’s Row:'))).toBe(true)
    expect(genji.conclusion).toContain('posición de los diez jugadores')
    expect(genji.links.map(item => item.href)).toEqual(expect.arrayContaining(['/maps/watchpoint-gibraltar', '/maps/kings-row', '/counters/genji', '/team-comps/genji']))
    expect(JSON.stringify(genji)).not.toMatch(/No existe buen Genji sin reset|Dash más corto|TITLE SEO|mis partidas|he probado/)
  })

  it('distinguishes reflected projectiles from blocked melee and avoids guaranteed combo claims', () => {
    expect(genji.abilities.map(item => item.title)).toEqual(['Shuriken', 'Swift Strike', 'Deflect', 'Dragonblade', 'Cyber-Agility'])
    expect(genji.abilities.find(item => item.title === 'Deflect')?.body).toContain('sin devolver el daño de esos golpes')
    expect(genji.abilities.find(item => item.title === 'Swift Strike')?.body).toContain('las eliminaciones reinician su cooldown')
    expect(genji.faqs.find(item => item.question === '¿Qué combo debo practicar con Genji?')?.answer).toContain('No existe una secuencia que garantice la baja')
    expect(genji.rankedPlan[3]).toContain('no cuentes con detenerlo libremente')
  })

  it('separates current normal perks from old perks and Stadium powers', () => {
    expect(genji.perks?.map(item => item.title)).toEqual(['Minor · Swift Cuts', 'Minor · Dragon’s Thirst', 'Major · Blade Twisting', 'Major · Meditation'])
    expect(genji.perks?.[1].body).toContain('alternativa a Swift Cuts')
    expect(genji.perks?.[2].body).toContain('por debajo de media vida')
    expect(genji.perks?.[3].body).toContain('no depende de haber reflejado daño')
    expect(genji.perksIntro).toContain('no forman parte de estas elecciones')
    expect(JSON.stringify(genji.perks)).not.toMatch(/Acrobatics|\d+%|\d+ segundos/)
  })

  it('publishes only the exact reviewed version without advertisements', () => {
    expect(topicQualityDecision('hero', 'genji')).toMatchObject({ indexable: true, adsAllowed: false })
    expect(hasCurrentStaticEditorialReview('/heroes/genji', genji)).toBe(true)
    expect(hasCurrentStaticEditorialReview('/heroes/genji', { ...genji, conclusion: 'Una edición pendiente' })).toBe(false)
    expect(hasCurrentStaticEditorialReview('/heroes/ana', genji)).toBe(false)
  })
})
