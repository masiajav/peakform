import { describe, expect, it } from 'vitest'
import { reviewedWinstonHero as winston } from '@/lib/reviewed-hero-winston'
import { getHeroPillar } from '@/lib/hero-pillars'
import { topicQualityDecision } from '@/lib/indexing-policy'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

describe('individual Winston hero article', () => {
  it('keeps its own dated article, map decisions and conclusion', () => {
    expect(getHeroPillar('winston')).toBe(winston)
    expect(winston.publishedAt).toBe('2026-06-26')
    expect(winston.schemaDate).toBe('2026-10-04')
    expect(winston.sections.some(item => item.title.startsWith('Numbani:'))).toBe(true)
    expect(winston.sections.some(item => item.title.startsWith('Lijiang Garden:'))).toBe(true)
    expect(winston.conclusion).toContain('segundo Support enemigo')
    expect(winston.links.map(item => item.href)).toEqual(expect.arrayContaining(['/maps/numbani', '/maps/lijiang-tower', '/counters/winston', '/team-comps/winston']))
    expect(JSON.stringify(winston)).not.toMatch(/TITLE SEO|mis partidas|he probado/)
  })

  it('separates Tesla modes and does not import event abilities into ranked', () => {
    expect(winston.abilities.map(item => item.title)).toEqual(['Tesla Cannon: disparo principal', 'Tesla Cannon: disparo secundario', 'Jump Pack', 'Barrier Projector', 'Primal Rage'])
    expect(winston.abilities.find(item => item.title === 'Jump Pack')?.body).toContain('no cuentas con un segundo impulso')
    expect(winston.abilities.find(item => item.title === 'Primal Rage')?.body).toContain('No crea una burbuja automáticamente')
    expect(winston.abilities.find(item => item.title === 'Barrier Projector')?.body).toContain('No anula toda la curación')
    expect(winston.faqs).toHaveLength(6)
  })

  it('describes current normal perks without retired or fixed balance claims', () => {
    expect(winston.perks?.map(item => item.title)).toEqual(['Minor · Electric Charge', 'Minor · Heavy Landing', 'Major · Chain Lightning', 'Major · Revitalizing Barrier'])
    expect(winston.perks?.[0].body).toContain('disparo principal')
    expect(winston.perks?.[1].body).toContain('durante Primal')
    expect(winston.perks?.[2].body).toContain('secundario completamente cargado')
    expect(winston.perksIntro).toContain('Stadium')
    expect(JSON.stringify(winston.perks)).not.toMatch(/Short Circuit|\d+%|\d+ segundos/)
  })

  it('indexes only the exact reviewed version without advertisements', () => {
    expect(topicQualityDecision('hero', 'winston')).toMatchObject({ indexable: true, adsAllowed: false })
    expect(hasCurrentStaticEditorialReview('/heroes/winston', winston)).toBe(true)
    expect(hasCurrentStaticEditorialReview('/heroes/winston', { ...winston, conclusion: 'Una edicion pendiente' })).toBe(false)
    expect(hasCurrentStaticEditorialReview('/heroes/ana', winston)).toBe(false)
  })
})
