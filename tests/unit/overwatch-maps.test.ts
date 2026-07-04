import { describe, expect, it } from 'vitest'
import { getMapPillar, MAP_PILLARS, MAP_PILLAR_SLUGS } from '@/lib/overwatch-maps'
import { wordCount } from '@/lib/indexing-policy'

function editorialText(value: unknown): string {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map(editorialText).join(' ')
  if (value && typeof value === 'object') return Object.values(value).map(editorialText).join(' ')
  return ''
}

describe('Overwatch map pillars', () => {
  it('publishes only unique curated map slugs', () => {
    expect(MAP_PILLAR_SLUGS).toEqual(['neon-junction', 'kings-row', 'lijiang-tower', 'dorado'])
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
