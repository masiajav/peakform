import { describe, expect, it } from 'vitest'
import { getMapPillar } from '@/lib/overwatch-maps'

describe('individual Dorado, Blizzard World and Nepal revisions', () => {
  it.each(['dorado', 'blizzard-world', 'nepal'])('%s preserves its route and gives the player a concrete next exercise', slug => {
    const map = getMapPillar(slug)!
    expect(map.updatedAtIso).toBe('2026-10-20')
    expect(map.updatedAt).toBe('20 de octubre de 2026')
    expect(map.publishedAtIso).toBeUndefined()
    expect(map.conclusion?.length).toBeGreaterThan(120)
    expect(map.faq).toHaveLength(5)
    expect(map.relatedLinks).toContainEqual({ href: '/guides/review-vod-overwatch-espanol#cuaderno-vod', label: expect.any(String) })
    const text = JSON.stringify(map)
    expect(text).not.toMatch(/adelanta cuatro|adelanta cuatro jugadores|guarda al menos una definitiva|minimapa mental|Haz una pregunta|sobre el carga|mantén la forma del equipo|conserve sus habilidades; quedarse sin ellos/)
    expect(text).toMatch(/reloj|porcentaje|overtime/)
  })

  it('Dorado includes the actual added ground access instead of requiring a mobility pick', () => {
    const map = getMapPillar('dorado')!
    expect(map.phases[1].attack).toMatch(/escalera/)
    expect(map.phases[1].attack).toMatch(/juzgado/)
    expect(map.faq.find(item => item.question.includes('Winston'))?.answer).toMatch(/No/)
    expect(map.phases[2].attack).toMatch(/última|reloj/)
  })

  it('Blizzard World distinguishes a useful touch from waiting forever for the perfect entry', () => {
    const map = getMapPillar('blizzard-world')!
    expect(map.phases[0].attack).toMatch(/tocar/)
    expect(map.phases[0].attack).toMatch(/reloj/)
    expect(map.phases[1].name).toMatch(/StarCraft/)
    expect(map.phases[2].name).toMatch(/Diablo/)
    expect(map.faq.find(item => item.question.includes('cambiar'))?.answer).toMatch(/No/)
  })

  it('Nepal separates last contest from a reset and player information from the free replay camera', () => {
    const map = getMapPillar('nepal')!
    expect(map.phases.map(phase => phase.name)).toEqual(['Village', 'Shrine', 'Sanctum'])
    expect(map.defensePlan.map(item => item.body).join(' ')).toMatch(/99 %/)
    expect(map.phases[1].vodReview).toMatch(/cámara libre/)
    expect(map.compositions[1].plan).toMatch(/al mismo tiempo/)
    expect(map.faq.find(item => item.question.includes('reagruparse'))?.answer).toMatch(/No/)
  })
})
