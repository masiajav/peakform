import { describe, expect, it } from 'vitest'
import { getCounterPillar, getTeamCompPillar } from '@/lib/seo-clusters'
import { editorialTopicQualityDecision } from '@/lib/indexing-policy'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'
import { toSlug } from '@/lib/content'

const counter = getCounterPillar('shion')!
const composition = getTeamCompPillar('shion')!

describe('Shion Season 5 counter and composition review', () => {
  it('approves the actual versions without enabling ads or accepting unreviewed edits', () => {
    for (const [kind, article] of [['counter', counter], ['team_comp', composition]] as const) {
      expect(editorialTopicQualityDecision(kind, 'shion', article)).toMatchObject({ indexable: true, adsAllowed: false })
      for (const change of [{ conclusion: 'Unreviewed change' }, { seoDescription: 'Unreviewed metadata' }, { vodQuestions: ['Unreviewed questions'] }, { links: [] }]) {
        expect(editorialTopicQualityDecision(kind, 'shion', { ...article, ...change })).toMatchObject({ indexable: false, adsAllowed: false })
      }
      expect(article.schemaDate).toBe('2026-10-11')
      expect(article.reviewedPatch).toContain('Season 5')
      expect(article.faqs).toHaveLength(5)
      expect(article.vodQuestions).toHaveLength(5)
      expect(article.conclusion).toBeTruthy()
      expect(article.links.map(link => link.href)).toContain('/counters/sombra')
    }
    expect(counter.publishedDate).toBe('2026-06-28')
    expect(composition.publishedDate).toBeUndefined()
  })

  it('uses Sombra Support zone effects instead of archiving the removed normal Hack', () => {
    const sombra = counter.threats.find(threat => threat.name === 'Sombra Support')!
    expect(sombra.href).toBe('/counters/sombra')
    expect(sombra.response).toContain('no las curas que recibe')
    expect(sombra.response).toContain('EMP sí conserva el hackeo')
    expect(sombra.response).toContain('no existe su Hack normal sobre héroes')
    expect(sombra.danger).toContain('no bloquea sus habilidades')
    expect(composition.compositions[0].substitutions).toContain('pierdes Suzu')
    for (const article of [counter, composition]) expect(JSON.stringify(article)).not.toMatch(/kit de DPS anterior|Season 3|Coordina Hack|Rapid Reload recarga/i)
  })

  it('separates temporary overhealth and alternate perks from ammo or ability cooldowns', () => {
    expect(counter.cooldownWindows[0].body).toContain('sin añadir cantidad ni munición')
    expect(counter.cooldownWindows[0].body).toContain('X Machina es la alternativa')
    expect(counter.cooldownWindows[1].body).toContain('0,3 segundos')
    expect(counter.cooldownWindows[1].body).toContain('no es una pausa larga ni el cooldown completo')
    expect(counter.threats.find(threat => threat.name === 'Ana')?.danger).toContain('Anti no elimina el overhealth')
    expect(counter.threats[0].response).toContain('Fuera de Rally, Shield Bash no tiene el stun')
    expect(composition.responsibilities[3].body).toContain('Ninguno devuelve la recarga retirada')
    expect(counter.faqs[2].answer).toContain('Rapid Reload se retiró el 6 de octubre')
  })

  it('keeps valid role-queue teams without lending Matrix to 5v5 double Tanks', () => {
    expect(composition.compositions).toHaveLength(3)
    for (const comp of composition.compositions) {
      const roles = comp.lineup.map(name => COUNTER_HEROES.find(hero => toSlug(hero.name) === toSlug(name))?.role)
      expect(roles.filter(role => role === 'tank')).toHaveLength(comp.format === '6v6' ? 2 : 1)
      expect(roles.filter(role => role === 'dps')).toHaveLength(2)
      expect(roles.filter(role => role === 'support')).toHaveLength(2)
      expect(new Set(comp.lineup).size).toBe(comp.lineup.length)
    }
    const six = composition.compositions[2]
    expect(six.engagePlan).toContain('solo corresponde a cola por roles 6v6, no a 5v5')
    expect(six.engagePlan).toContain('no haces ni melee')
    expect(six.engagePlan).toContain('no protege a Shion detrás de otra pared')
  })

  it('reviews different decisions from allied cameras rather than recycling the same conclusion', () => {
    expect(counter.vodQuestions?.join(' ')).toContain('ambos jugadores cercanos siguieron a la moto')
    expect(composition.vodQuestions?.join(' ')).toContain('Con cuántas balas')
    expect(counter.conclusion).not.toBe(composition.conclusion)
    expect(counter.examples.map(example => example.title).join(' ')).toContain('Neon Junction')
    expect(composition.examples[0].body).toContain('Desde la cámara del Tank')
  })
})
