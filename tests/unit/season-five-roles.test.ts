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

test('pre-rework archives stay accessible, clearly labelled and outside index approval', () => {
  expect(getCounterPillar('sombra')?.h1).toContain('Archivo')
  expect(getCounterPillar('sombra')?.intro[0]).toContain('Sombra ya es Support')
  expect(getTeamCompPillar('sombra')?.intro[0]).toContain('no los copies')
  expect(getTeamCompPillar('doctrine')?.intro[0]).toContain('anterior a los ajustes de lanzamiento')
  expect(getTeamCompPillar('roadhog')?.intro[1]).toContain('recibió su rework')
  for (const slug of ['sombra', 'doctrine', 'roadhog']) {
    expect(topicQualityDecision('counter', slug).adsAllowed).toBe(false)
    expect(topicQualityDecision('team_comp', slug)).toMatchObject({ indexable: false, adsAllowed: false })
  }
  expect(topicQualityDecision('counter', 'sombra').indexable).toBe(false)
})
