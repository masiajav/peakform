import { describe, expect, it } from 'vitest'
import { TEAM_COMP_HEROES, bestDefaultStyle, getTeamCompHero, getTeamCompsForHero } from '@/lib/overwatch-team-comps'

describe('composition examples', () => {
  it('does not force a hero into an incompatible style', () => {
    expect(getTeamCompsForHero('reinhardt', '5v5', 'dive')).toEqual([])
    expect(getTeamCompsForHero('widowmaker', '5v5', 'brawl')).toEqual([])
    expect(getTeamCompsForHero('anran', '5v5', 'flyers')).toEqual([])
    expect(getTeamCompsForHero('unknown')).toEqual([])
    expect(getTeamCompsForHero('doctrine')).toEqual([])
    expect(getTeamCompsForHero('reinhardt', '5v5', 'brawl')).toHaveLength(1)
    expect(getTeamCompsForHero('pharah', '5v5', 'flyers')).toHaveLength(1)
  })

  it('only defaults to styles that actually have examples', () => {
    for (const hero of TEAM_COMP_HEROES) {
      const style = bestDefaultStyle(hero)
      const examples = getTeamCompsForHero(hero.slug, '5v5')
      if (examples.length > 0) {
        expect(style, hero.slug).not.toBe('all')
        expect(getTeamCompsForHero(hero.slug, '5v5', style), hero.slug).not.toEqual([])
      } else {
        expect(style).toBe('all')
      }
    }
  })

  it('keeps role counts, identities and the selected hero in both formats', () => {
    for (const hero of TEAM_COMP_HEROES) {
      for (const comp of getTeamCompsForHero(hero.slug)) {
        expect(comp.tanks).toHaveLength(comp.format === '6v6' ? 2 : 1)
        expect(comp.dps).toHaveLength(2)
        expect(comp.supports).toHaveLength(2)
        const team = [...comp.tanks, ...comp.dps, ...comp.supports]
        expect(team).toContain(hero.name)
        expect(new Set(team).size).toBe(team.length)
        for (const [role, names] of [['tank', comp.tanks], ['dps', comp.dps], ['support', comp.supports]] as const) {
          for (const name of names) expect(TEAM_COMP_HEROES.find(candidate => candidate.name === name)?.role).toBe(role)
        }
      }
    }
    expect(bestDefaultStyle(getTeamCompHero('dmon')!)).toBe('brawl')
  })
})
