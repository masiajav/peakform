import { describe, expect, it } from 'vitest'
import { reviewedShionHero as shion } from '@/lib/reviewed-hero-shion'
import { getHeroPillar } from '@/lib/hero-pillars'
import { topicQualityDecision } from '@/lib/indexing-policy'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

describe('individual Shion hero article', () => {
  it('preserves its original publication, video and useful navigation', () => {
    expect(getHeroPillar('shion')).toBe(shion)
    expect(shion.publishedAt).toBe('2026-06-15')
    expect(shion.schemaDate).toBe('2026-10-04')
    expect(shion.video?.id).toBe('9abTdz8uD3g')
    expect(shion.video?.channel).toBe('Ivajpro')
    expect(shion.video?.title).toBe('No juegues SHION sin saber esto antes | Guía Shion Overwatch')
    expect(shion.video?.language).toBeUndefined()
    expect(shion.video?.description).toContain('balance actual')
    expect(shion.sections.some(item => item.title.startsWith('Neon Junction:'))).toBe(true)
    expect(shion.sections.some(item => item.title.startsWith('Esperança:'))).toBe(true)
    expect(shion.links.map(item => item.href)).toEqual(expect.arrayContaining(['/overwatch-temporada-3-into-the-tigers-den', '/counters/shion', '/team-comps/shion', '/experts']))
    expect(JSON.stringify(shion)).not.toMatch(/TITLE SEO|mis partidas|he probado|el error más común|siempre gana/)
  })

  it('distinguishes overhealth, aim and positioning without an immunity claim', () => {
    expect(shion.abilities.map(item => item.title)).toEqual(['Kira Pistols', 'Execution', 'Joyride', 'Evade', 'Satsuriku Spree', 'Flanker'])
    expect(shion.abilities[3].body).toContain('No es invulnerabilidad')
    expect(shion.faqs).toHaveLength(8)
    expect(shion.counters[5].body).toContain('no traslades automáticamente')
    expect(shion.mistakes[4]).toContain('solo ayuda si el equipo lo puede ocupar')
  })

  it('keeps dated balance history separate from current perk descriptions', () => {
    expect(shion.balanceReview?.map(item => item.title)).toEqual(['25 de junio: el nerf inicial de Execution', '14 de julio: menos recuperación y menos daño al conducir', '11 de agosto: apuntar el lanzamiento de Joyride', 'Cómo comparar tu replay con una guía antigua'])
    expect(shion.balanceReview?.[1].body).toContain('0,4 a 0,3 segundos')
    expect(shion.balanceReview?.[2].body).toContain('1,5 a 1 metro')
    expect(shion.perks?.map(item => item.title)).toEqual(['Minor · Rapid Reload', 'Minor · X Machina', 'Major · Refuel', 'Major · Faces of Death'])
    expect(shion.perks?.[3].body).toContain('no las habilidades de esos héroes ni un botón de activación')
    expect(shion.perks?.[2].body).toContain('no aumenta la vida máxima')
  })

  it('indexes only the exact manually reviewed version, never enables ads', () => {
    expect(topicQualityDecision('hero', 'shion')).toMatchObject({ indexable: true, adsAllowed: false })
    expect(hasCurrentStaticEditorialReview('/heroes/shion', shion)).toBe(true)
    expect(hasCurrentStaticEditorialReview('/heroes/shion', { ...shion, balanceReview: [] })).toBe(false)
    expect(hasCurrentStaticEditorialReview('/heroes/shion', { ...shion, video: { ...shion.video, title: 'Otro video' } })).toBe(false)
    expect(hasCurrentStaticEditorialReview('/heroes/tracer', shion)).toBe(false)
  })
})
