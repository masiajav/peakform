import { describe, expect, it } from 'vitest'
import { reviewedTracerHero as tracer } from '@/lib/reviewed-hero-tracer'
import { getHeroPillar } from '@/lib/hero-pillars'
import { topicQualityDecision } from '@/lib/indexing-policy'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

describe('individual Tracer hero article', () => {
  it('keeps its dated article, map decisions and own conclusion', () => {
    expect(getHeroPillar('tracer')).toBe(tracer)
    expect(tracer.publishedAt).toBe('2026-06-26')
    expect(tracer.schemaDate).toBe('2026-10-04')
    expect(tracer.sections.some(item => item.title.startsWith('Esperança:'))).toBe(true)
    expect(tracer.sections.some(item => item.title.startsWith('Gibraltar:'))).toBe(true)
    expect(tracer.conclusion).toContain('dónde terminaste después de Recall')
    expect(tracer.links.map(item => item.href)).toEqual(expect.arrayContaining(['/maps/esperanca', '/maps/watchpoint-gibraltar', '/counters/tracer', '/team-comps/tracer']))
    expect(JSON.stringify(tracer)).not.toMatch(/TITLE SEO|mis partidas|he probado|La mayoría de Tracers/)
  })

  it('describes manual Recall and Flanker without importing automatic powers', () => {
    expect(tracer.abilities.map(item => item.title)).toEqual(['Pulse Pistols', 'Blink', 'Recall', 'Pulse Bomb', 'Flanker'])
    expect(tracer.abilities.find(item => item.title === 'Recall')?.body).toContain('no restaura por defecto todos los Blinks')
    expect(tracer.abilities.find(item => item.title === 'Recall')?.body).toContain('tienes que activar la habilidad a tiempo')
    expect(tracer.abilities.find(item => item.title === 'Flanker')?.body).toContain('Los health packs te restauran más salud')
    expect(tracer.quickAnswers?.[0].body).toContain('Usarlo para sobrevivir puede ser la decisión correcta')
    expect(tracer.faqs).toHaveLength(6)
  })

  it('separates current normal perks from Stadium and retired options', () => {
    expect(tracer.perks?.map(item => item.title)).toEqual(['Minor · Temporal Regen', 'Minor · Kinetic Reload', 'Major · Blink Packs', 'Major · Quantum Entanglement'])
    expect(tracer.perks?.[1].body).toContain('alternativa a Temporal Regen')
    expect(tracer.perks?.[2].body).toContain('restaura una carga de Blink')
    expect(tracer.perks?.[3].body).toContain('alternativa a Blink Packs')
    expect(tracer.perksIntro).toContain('no incluyen Auto Recall')
    expect(tracer.perksIntro).toContain('Stadium')
    expect(JSON.stringify(tracer.perks)).not.toMatch(/Chronal Dash|Flashback|Ult Packs|\d+%|\d+ segundos/)
  })

  it('indexes only the exact reviewed version without advertisements', () => {
    expect(topicQualityDecision('hero', 'tracer')).toMatchObject({ indexable: true, adsAllowed: false })
    expect(hasCurrentStaticEditorialReview('/heroes/tracer', tracer)).toBe(true)
    expect(hasCurrentStaticEditorialReview('/heroes/tracer', { ...tracer, conclusion: 'Una edicion pendiente' })).toBe(false)
    expect(hasCurrentStaticEditorialReview('/heroes/ana', tracer)).toBe(false)
  })
})
