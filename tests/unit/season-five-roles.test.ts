import { expect, test } from 'vitest'
import { getCounterHero } from '@/lib/overwatch-counters'
import { getTeamCompsForHero } from '@/lib/overwatch-team-comps'
import { getTeamCompPillar, getCounterPillar } from '@/lib/seo-clusters'
import { topicQualityDecision } from '@/lib/indexing-policy'

test('Sombra is Support and no generic example puts her in a DPS slot', () => {
  expect(getCounterHero('sombra')?.role).toBe('support')
  for (const slug of ['winston', 'dva', 'genji', 'tracer', 'kiriko', 'ana']) {
    for (const team of getTeamCompsForHero(slug)) expect(team.dps).not.toContain('Sombra')
  }
})

test('released kit advice replaces archives while publication requires its own review', () => {
  expect(getCounterPillar('sombra')?.role).toBe('Support')
  expect(getCounterPillar('sombra')?.intro[0]).toContain('Sombra ya es Support')
  expect(getCounterPillar('roadhog')?.intro[1]).toContain('está activo desde el 6 de octubre')
  expect(getTeamCompPillar('sombra')?.h1).toContain('Sombra Support')
  expect(getTeamCompPillar('doctrine')?.intro[0]).toContain('Doctrine salió el 6 de octubre')
  expect(getTeamCompPillar('roadhog')?.intro[0]).toContain('está activo desde el 6 de octubre')
  for (const slug of ['sombra', 'doctrine', 'roadhog']) {
    expect(topicQualityDecision('counter', slug).adsAllowed).toBe(false)
    expect(topicQualityDecision('team_comp', slug)).toMatchObject({ indexable: true, adsAllowed: false })
  }
  expect(topicQualityDecision('counter', 'sombra').indexable).toBe(false)
  expect(topicQualityDecision('counter', 'roadhog').indexable).toBe(false)
  expect(topicQualityDecision('counter', 'doctrine').indexable).toBe(true)
})
