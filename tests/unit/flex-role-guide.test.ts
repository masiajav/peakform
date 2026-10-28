import { describe, expect, it } from 'vitest'
import { flexRoleGuide } from '@/lib/flex-role-guide'
import { getCounterHero } from '@/lib/overwatch-counters'
import { flexRoleQualityDecision, topicQualityDecision } from '@/lib/indexing-policy'

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

  it('indexes the individually reviewed version without allowing ads', () => {
    expect(topicQualityDecision('role', 'flex')).toMatchObject({ indexable: true, adsAllowed: false })
    for (const edit of [{ h1: 'Unreviewed title' }, { sections: [] }, { schemaDate: '2026-10-29' }, { links: [] }]) {
      expect(flexRoleQualityDecision({ ...flexRoleGuide, ...edit })).toMatchObject({ indexable: false, adsAllowed: false })
    }
    expect(flexRoleQualityDecision(null).indexable).toBe(false)
  })
})
