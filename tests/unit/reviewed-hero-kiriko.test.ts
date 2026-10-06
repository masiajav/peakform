import { describe, expect, it } from 'vitest'
import { reviewedKirikoHero as kiriko } from '@/lib/reviewed-hero-kiriko'
import { getHeroPillar } from '@/lib/hero-pillars'
import { topicQualityDecision } from '@/lib/indexing-policy'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

describe('individual Kiriko hero article', () => {
  it('uses its own dated article, map decisions and conclusion', () => {
    expect(getHeroPillar('kiriko')).toBe(kiriko)
    expect(kiriko.publishedAt).toBe('2026-06-26')
    expect(kiriko.schemaDate).toBe('2026-10-03')
    expect(kiriko.sections.some(item => item.title.startsWith('Lijiang:'))).toBe(true)
    expect(kiriko.sections.some(item => item.title.startsWith('Dorado:'))).toBe(true)
    expect(kiriko.conclusion).toContain('comprobar el destino')
    expect(kiriko.links.map(item => item.href)).toEqual(expect.arrayContaining(['/maps/lijiang-tower', '/maps/dorado', '/counters/kiriko', '/team-comps/kiriko']))
    expect(JSON.stringify(kiriko)).not.toMatch(/por ansiedad|aliado suicida|60 de vida|TITLE SEO|mis partidas|he probado/)
  })

  it('distinguishes Sleep from applied knockdowns and describes the entire normal kit', () => {
    expect(kiriko.abilities.map(item => item.title)).toEqual(['Healing Ofuda', 'Kunai', 'Swift Step', 'Protection Suzu', 'Kitsune Rush', 'Wall Climb'])
    expect(kiriko.faqs.find(item => item.question === '¿Suzu elimina todos los stuns?')?.answer).toContain('pero no un derribo ya aplicado como Earthshatter')
    expect(kiriko.abilities.find(item => item.title === 'Kitsune Rush')?.body).toContain('recuperación de cooldowns')
    expect(kiriko.abilities.find(item => item.title === 'Swift Step')?.body).toContain('exige un objetivo válido')
    expect(kiriko.abilities.find(item => item.title === 'Protection Suzu')?.body).toContain('Cura, da una ventana breve')
  })

  it('keeps alternative normal perks distinct from Stadium powers and old perks', () => {
    expect(kiriko.perks?.map(item => item.title)).toEqual(['Minor · Urgent Care', 'Minor · Fortune Teller', 'Major · Ready Step', 'Major · Foxtrot'])
    expect(kiriko.perks?.[1].body).toContain('alternativa a Urgent Care')
    expect(kiriko.perks?.[2].body).toContain('no un segundo teleport')
    expect(kiriko.perks?.[3].body).toContain('alternativa a Ready Step')
    expect(kiriko.perksIntro).toContain('no forman parte de estas elecciones')
    expect(JSON.stringify(kiriko.perks)).not.toMatch(/\d+%|\d+ segundos/)
  })

  it('publishes only the reviewed version and never enables advertising', () => {
    expect(topicQualityDecision('hero', 'kiriko')).toMatchObject({ indexable: true, adsAllowed: false })
    expect(hasCurrentStaticEditorialReview('/heroes/kiriko', kiriko)).toBe(true)
    expect(hasCurrentStaticEditorialReview('/heroes/kiriko', { ...kiriko, conclusion: 'Una edición no revisada' })).toBe(false)
    expect(hasCurrentStaticEditorialReview('/heroes/genji', kiriko)).toBe(false)
  })
})
