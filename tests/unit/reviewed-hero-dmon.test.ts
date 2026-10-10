import { describe, expect, it } from 'vitest'
import { reviewedDmonHero as dmon } from '@/lib/reviewed-hero-dmon'
import { getHeroPillar } from '@/lib/hero-pillars'
import { topicQualityDecision } from '@/lib/indexing-policy'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

describe('individual D.Mon hero article', () => {
  it('binds indexation without ads to the individually read revision', () => {
    expect(topicQualityDecision('hero', 'dmon')).toMatchObject({ indexable: true, adsAllowed: false })
    expect(hasCurrentStaticEditorialReview('/heroes/dmon', dmon)).toBe(true)
    expect(hasCurrentStaticEditorialReview('/heroes/dmon', { ...dmon, abilityKit: { ...dmon.abilityKit, src: '/heroes/other.png' } })).toBe(false)
    expect(hasCurrentStaticEditorialReview('/heroes/dmon', { ...dmon, balanceReview: [] })).toBe(false)
  })
  it('preserves publication, both images and specific map decisions', () => {
    expect(getHeroPillar('dmon')).toBe(dmon)
    expect(dmon.publishedAt).toBe('2026-08-06')
    expect(dmon.schemaDate).toBe('2026-10-09')
    expect(dmon.abilityKit).toMatchObject({ src: '/heroes/dmon-ability-kit.png', width: 1920, height: 1080 })
    expect(dmon.sections.some(item => item.title.startsWith('Lijiang, Control Center:'))).toBe(true)
    expect(dmon.sections.some(item => item.title.startsWith('Busan, MEKA Base:'))).toBe(true)
    expect(dmon.links.map(item => item.href)).toEqual(expect.arrayContaining(['/overwatch-temporada-4-heroes-of-busan', '/dmon-nuevo-heroe-tank-overwatch', '/busan-eichenwalde-paraiso-reworks-overwatch']))
    expect(dmon.faqs).toHaveLength(8)
    expect(JSON.stringify(dmon)).not.toMatch(/mis partidas|he probado|TITLE SEO|solo por hype|no es un problema de aim/)
  })

  it('distinguishes horizontal movement, pilot phases and mutually exclusive normal perks', () => {
    expect(dmon.abilities.map(item => item.title)).toEqual(['Plasma Saber', 'Power Barrier', 'Propulsors', 'Fusion Repeater', 'Surging Strike', 'Limit Break', 'Eject!', 'Portable Fusion Repeater', 'Call Mech', 'Stalwart'])
    expect(dmon.abilities[2].body).toContain('en horizontal')
    expect(dmon.perks?.map(item => item.title)).toEqual(['Minor · Beast Within', 'Minor · MEKA Mobility', 'Major · Overstrike', 'Major · Focused Fusion'])
    expect(dmon.perks?.[0].body).toContain('la barrera, no tu propia vida')
    expect(dmon.perks?.[2].body).toContain('no de todos los ataques')
    expect(dmon.compositions[2].body).toContain('no cabe en la cola por roles 5v5')
    expect(dmon.compositions[1].body).toContain('no la tratéis como una limpieza universal')
    expect(dmon.counters[5].title).toBe('Sombra Support')
    expect(dmon.counters[5].body).toContain('no es un anti que bloquee las curas que recibes')
    expect(dmon.counters[5].body).toContain('Su Hack normal sobre héroes se retiró')
    expect(JSON.stringify(dmon)).not.toMatch(/kit actual de DPS|futuro rework/)
  })

  it('separates dated balance changes and format-specific armor from launch values', () => {
    expect(dmon.balanceReview?.map(item => item.title)).toEqual(['8 de septiembre: espada, barrera y piloto', '17 de septiembre: menos margen al cruzar'])
    expect(dmon.balanceReview?.[0].body).toContain('animación de arranque de un segundo')
    expect(dmon.balanceReview?.[1].body).toContain('325 a 275 en 5v5 y de 300 a 250 en 6v6')
    expect(dmon.balanceReview?.[1].body).toContain('4 a 5 segundos')
    expect(dmon.facts[3].body).toContain('17 de septiembre de 2026')
  })
})
