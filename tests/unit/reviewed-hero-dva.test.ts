import { describe, expect, it } from 'vitest'
import { reviewedDvaHero as dva } from '@/lib/reviewed-hero-dva'
import { getHeroPillar } from '@/lib/hero-pillars'
import { topicQualityDecision } from '@/lib/indexing-policy'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

describe('individual D.Va hero article', () => {
  it('keeps its own dated article, map examples and conclusion', () => {
    expect(getHeroPillar('dva')).toBe(dva)
    expect(dva.publishedAt).toBe('2026-06-26')
    expect(dva.schemaDate).toBe('2026-10-04')
    expect(dva.sections.some(item => item.title.startsWith('Gibraltar:'))).toBe(true)
    expect(dva.sections.some(item => item.title.startsWith('Dorado:'))).toBe(true)
    expect(dva.conclusion).toContain('una subida y una vuelta a la backline')
    expect(dva.links.map(item => item.href)).toEqual(expect.arrayContaining(['/maps/watchpoint-gibraltar', '/maps/dorado', '/counters/dva', '/team-comps/dva']))
    expect(JSON.stringify(dva)).not.toMatch(/TITLE SEO|mis partidas|he probado/)
  })

  it('includes the pilot and objective responsibilities, not just the mech', () => {
    expect(dva.abilities.map(item => item.title)).toEqual(['Fusion Cannons', 'Boosters', 'Defense Matrix', 'Micro Missiles', 'Self-Destruct', 'Light Gun', 'Call Mech', 'Eject!'])
    expect(dva.abilities.find(item => item.title === 'Boosters')?.body).toContain('puedes cancelar')
    expect(dva.abilities.find(item => item.title === 'Defense Matrix')?.body).toContain('los beams de Zarya y Symmetra')
    expect(dva.abilities.find(item => item.title === 'Self-Destruct')?.body).toContain('no captura ni mantiene el objetivo por sí sola')
    expect(dva.faqs).toHaveLength(6)
  })

  it('separates normal perks from Stadium without inventing a contact duration trigger', () => {
    expect(dva.perks?.map(item => item.title)).toEqual(['Minor · Bunny Power', 'Minor · Extended Boosters', 'Major · Shield System', 'Major · Precision Fusion'])
    expect(dva.perks?.[1].body).toContain('Boosters dura más y hace más daño al golpear')
    expect(dva.perks?.[2].body).toContain('No rellena toda la vida ni cura a tus compañeros')
    expect(dva.perksIntro).toContain('Stadium')
    expect(JSON.stringify(dva.perks)).not.toMatch(/Heavy Rockets|\d+%|\d+ segundos/)
  })

  it('indexes only the exact reviewed version without advertisements', () => {
    expect(topicQualityDecision('hero', 'dva')).toMatchObject({ indexable: true, adsAllowed: false })
    expect(hasCurrentStaticEditorialReview('/heroes/dva', dva)).toBe(true)
    expect(hasCurrentStaticEditorialReview('/heroes/dva', { ...dva, conclusion: 'Una edicion pendiente' })).toBe(false)
    expect(hasCurrentStaticEditorialReview('/heroes/ana', dva)).toBe(false)
  })
})
