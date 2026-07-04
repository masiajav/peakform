import { describe, expect, it } from 'vitest'
import { MAP_CATALOG, MAP_MODE_ORDER } from '@/lib/overwatch-map-catalog'
import { getMapPillar, MAP_PILLARS, MAP_PILLAR_SLUGS } from '@/lib/overwatch-maps'
import { wordCount } from '@/lib/indexing-policy'

function editorialText(value: unknown): string {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map(editorialText).join(' ')
  if (value && typeof value === 'object') return Object.values(value).map(editorialText).join(' ')
  return ''
}

describe('Overwatch map pillars', () => {
  it('keeps a complete unique catalog grouped by core mode', () => {
    expect(MAP_CATALOG).toHaveLength(30)
    expect(new Set(MAP_CATALOG.map(map => map.slug)).size).toBe(MAP_CATALOG.length)
    expect(new Set(MAP_CATALOG.map(map => map.mode))).toEqual(new Set(MAP_MODE_ORDER))
    expect(MAP_PILLAR_SLUGS.every(slug => MAP_CATALOG.some(map => map.slug === slug))).toBe(true)
  })

  it('publishes only unique curated map slugs', () => {
    expect(MAP_PILLAR_SLUGS).toEqual([
      'antarctic-peninsula',
      'busan',
      'ilios',
      'nepal',
      'oasis',
      'samoa',
      'circuit-royal',
      'havana',
      'junkertown',
      'rialto',
      'route-66',
      'shambali-monastery',
      'watchpoint-gibraltar',
      'aatlis',
      'new-junk-city',
      'suravasa',
      'blizzard-world',
      'eichenwalde',
      'hollywood',
      'midtown',
      'numbani',
      'paraiso',
      'colosseo',
      'esperanca',
      'new-queen-street',
      'runasapi',
      'neon-junction',
      'kings-row',
      'lijiang-tower',
      'dorado',
    ])
    expect(new Set(MAP_PILLAR_SLUGS).size).toBe(MAP_PILLAR_SLUGS.length)
    expect(getMapPillar('unknown-map')).toBeUndefined()
  })

  it.each(MAP_PILLARS)('$name has substantial original editorial content', map => {
    expect(wordCount(editorialText(map))).toBeGreaterThanOrEqual(900)
    expect(map.phases).toHaveLength(3)
    expect(map.heroPicks.length).toBeGreaterThanOrEqual(6)
    expect(map.compositions.length).toBeGreaterThanOrEqual(2)
    expect(map.faq.length).toBeGreaterThanOrEqual(4)
    expect(map.relatedLinks.some(link => link.href.startsWith('/guides/'))).toBe(true)
  })
})
