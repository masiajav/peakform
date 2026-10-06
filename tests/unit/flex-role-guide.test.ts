import { describe, expect, it } from 'vitest'
import { flexRoleGuide } from '@/lib/flex-role-guide'
import { getCounterHero } from '@/lib/overwatch-counters'
import { topicQualityDecision } from '@/lib/indexing-policy'

describe('specific flex guide', () => {
  it('offers distinct pools and decisions without presenting flex as a fourth role', () => {
    expect(flexRoleGuide.intro.join(' ')).toContain('no un cuarto rol')
    expect(flexRoleGuide.pools.map(pool => pool.role)).toEqual(['Tank', 'DPS', 'Support'])
    expect(flexRoleGuide.sections.map(section => section.id)).toEqual(['antes-de-cambiar', 'dos-picks', 'cambio-y-equipo', 'ultimate', 'mapas', 'vod'])
    for (const pool of flexRoleGuide.pools) {
      expect(pool.heroes).toHaveLength(2)
      for (const hero of pool.heroes) expect(getCounterHero(hero.slug)?.name).toBe(hero.name)
    }
    const paragraphs = [...flexRoleGuide.intro, ...flexRoleGuide.sections.flatMap(section => section.paragraphs), ...flexRoleGuide.pools.map(pool => pool.body)]
    expect(new Set(paragraphs).size).toBe(paragraphs.length)
    expect(flexRoleGuide.faqs).toHaveLength(3)
    expect(JSON.stringify(flexRoleGuide)).not.toMatch(/TITLE SEO|KEYWORDS PRINCIPALES|subida garantizada/i)
  })

  it('does not turn a content improvement into automatic indexing or ad approval', () => {
    expect(topicQualityDecision('role', 'flex')).toMatchObject({ indexable: false, adsAllowed: false })
  })
})
