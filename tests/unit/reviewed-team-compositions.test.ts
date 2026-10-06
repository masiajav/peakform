import { describe, expect, it } from 'vitest'
import { reviewedTeamCompositions } from '@/lib/reviewed-team-compositions'
import { getTeamCompPillar } from '@/lib/seo-clusters'
import { editorialTopicQualityDecision } from '@/lib/indexing-policy'
import { MAP_PILLAR_SLUGS } from '@/lib/overwatch-maps'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'
import { toSlug } from '@/lib/content'

const reviewDates: Record<string, string> = {
  doomfist: '2026-10-01', dmon: '2026-10-01',
  ashe: '2026-10-02', sigma: '2026-10-02', pharah: '2026-10-02', mercy: '2026-10-02',
  mei: '2026-10-02', moira: '2026-10-02', reaper: '2026-10-02',
  bastion: '2026-10-02', lifeweaver: '2026-10-02',
  freja: '2026-10-02', sierra: '2026-10-02', wuyang: '2026-10-02',
  doctrine: '2026-10-02', domina: '2026-10-02', 'jetpack-cat': '2026-10-02',
  symmetra: '2026-10-02', torbjorn: '2026-10-02',
  hanzo: '2026-10-02', widowmaker: '2026-10-02', sojourn: '2026-10-02',
  'soldier-76': '2026-10-02', emre: '2026-10-02',
  anran: '2026-10-02', vendetta: '2026-10-02', mizuki: '2026-10-02',
  hazard: '2026-10-02', venture: '2026-10-02', mauga: '2026-10-02',
  'junker-queen': '2026-10-02', lucio: '2026-10-02',
  sombra: '2026-10-02', 'wrecking-ball': '2026-10-02', baptiste: '2026-10-02', illari: '2026-10-02',
  brigitte: '2026-10-02', zenyatta: '2026-10-02', juno: '2026-10-02', echo: '2026-10-02',
  junkrat: '2026-10-02', orisa: '2026-10-02', ramattra: '2026-10-02', roadhog: '2026-10-02',
}

describe('individual team composition revisions', () => {
  it('records known review dates without inventing original publication dates', () => {
    for (const article of Object.values(reviewedTeamCompositions)) {
      expect(article.schemaDate).toMatch(/^2026-10-0[12]$/)
      expect(article.publishedDate).toBeUndefined()
    }
    for (const slug of ['shion', 'ana', 'genji']) {
      expect(getTeamCompPillar(slug)?.schemaDate).toBe('2026-06-28')
    }
  })
  it('keeps Roadhog proposals separate from his announced Season 5 rework', () => {
    const hog = reviewedTeamCompositions.roadhog
    expect(hog.intro.join(' ')).toContain('2 de octubre de 2026')
    expect(hog.intro.join(' ')).toContain('6 de octubre')
    expect(hog.reviewedPatch).toContain('pendiente del rework')
    expect(hog.faqs.find(faq => faq.question.includes('rework'))?.answer).toMatch(/^No\./)
    expect(hog.faqs.find(faq => faq.question.includes('anticuración'))?.answer).toMatch(/^No\./)
    expect(hog.summary).toContain('Breather no sustituye la cobertura ni limpia antiheal.')
  })
  it('does not add optional defense and sustain to both versions of a Tank kit', () => {
    expect(reviewedTeamCompositions.orisa.faqs.find(faq => faq.question.includes('barrera'))?.answer).toContain('reemplaza Javelin Spin')
    expect(reviewedTeamCompositions.orisa.faqs.find(faq => faq.question.includes('barrera'))?.answer).toContain('no con los dos recursos a la vez')
    expect(reviewedTeamCompositions.ramattra.faqs.find(faq => faq.question.includes('Vortex'))?.answer).toContain('Nanite Repair es el perk')
    expect(reviewedTeamCompositions.ramattra.faqs.find(faq => faq.question.includes('Block'))?.answer).toContain('reducción es frontal')
  })
  it('does not guarantee Junkrat resets or RIP-Tire body protection', () => {
    expect(reviewedTeamCompositions.junkrat.faqs.find(faq => faq.question.includes('minas'))?.answer).toContain('Mine Recycling es el perk')
    expect(reviewedTeamCompositions.junkrat.faqs.find(faq => faq.question.includes('RIP-Tire'))?.answer).toContain('Rip Roll pertenece a Stadium')
    expect(reviewedTeamCompositions.junkrat.examples.find(example => example.title.includes('Eichenwalde'))?.body).toContain('nueva ruta')
  })
  it('does not borrow Stadium protection or perk mobility for ranked support lineups', () => {
    expect(reviewedTeamCompositions.brigitte.faqs.find(faq => faq.question.includes('Shield Bash'))?.answer).toContain('Inspiring Strike es el perk')
    expect(reviewedTeamCompositions.zenyatta.faqs.find(faq => faq.question.includes('Harmony'))?.answer).toContain('son perks opcionales')
    expect(reviewedTeamCompositions.zenyatta.faqs.find(faq => faq.question.includes('Transcendence'))?.answer).toContain('invulnerabilidad corresponde a Zenyatta')
    expect(reviewedTeamCompositions.juno.faqs.find(faq => faq.question.includes('Hyper Ring'))?.answer).toContain('Hyper Healer es un poder de Stadium')
    expect(reviewedTeamCompositions.juno.faqs.find(faq => faq.question.includes('Orbital'))?.answer).toContain('Stellar Focus, de Stadium')
  })
  it('treats Echo burst and copied ultimate charge as conditional resources', () => {
    expect(reviewedTeamCompositions.echo.faqs.find(faq => faq.question.includes('Duplicate'))?.answer).toContain('Partial Scan es el perk')
    expect(reviewedTeamCompositions.echo.faqs.find(faq => faq.question.includes('Focusing Beam'))?.answer).toContain('Focused Rush es un perk opcional')
    expect(reviewedTeamCompositions.echo.examples.find(example => example.title.includes('Dorado'))?.body).toContain('conservar el siguiente intento')
  })
  it('keeps the Sombra DPS analysis separate from the announced Support rework', () => {
    const sombra = reviewedTeamCompositions.sombra
    expect(sombra.intro.join(' ')).toContain('2 de octubre de 2026')
    expect(sombra.intro.join(' ')).toContain('6 de octubre')
    expect(sombra.reviewedPatch).toContain('pendiente del rework')
    expect(sombra.faqs.find(faq => faq.question.includes('Support'))?.answer).toContain('No.')
  })
  it('does not promise experimental mines, default perk mobility or defensive cleanses', () => {
    const ball = reviewedTeamCompositions['wrecking-ball']
    expect(ball.faqs.find(faq => faq.question.includes('minas'))?.answer).toContain('Community Crafted')
    expect(ball.faqs.find(faq => faq.question.includes('minas'))?.answer).toContain('Adaptive Barrier')
    expect(reviewedTeamCompositions.baptiste.faqs.find(faq => faq.question.includes('Lamp'))?.answer).toContain('no limpia anticuración')
    expect(reviewedTeamCompositions.baptiste.faqs.find(faq => faq.question.includes('Exo Boots'))?.answer).toContain('Rocket Boots es el perk')
    expect(reviewedTeamCompositions.illari.faqs.find(faq => faq.question.includes('Solar Flare'))?.answer).toContain('No.')
  })
  it('distinguishes rush support from perk and Stadium-only team effects', () => {
    const queen = reviewedTeamCompositions['junker-queen']
    expect(queen.faqs.find(faq => faq.question.includes('heridas'))?.answer).toContain('es un poder de Stadium')
    expect(queen.faqs.find(faq => faq.question.includes('recarga'))?.answer).toContain('No por defecto.')
    const lucio = reviewedTeamCompositions.lucio
    expect(lucio.faqs.find(faq => faq.question.includes('Beat'))?.answer).toContain('No limpia anticuración.')
    expect(lucio.faqs.find(faq => faq.question.includes('Noise Violation'))?.answer).toContain('velocidad de ataque de Lúcio')
  })
  it('keeps frontal defense, allied sustain and extended range separate from perks', () => {
    expect(reviewedTeamCompositions.hazard.faqs.find(faq => faq.question.includes('Spike Guard'))?.answer).toContain('No. Anarchic Zeal es el perk')
    expect(reviewedTeamCompositions.venture.faqs.find(faq => faq.question.includes('SMART Excavator'))?.answer).toContain('No. SMART Extender es un perk')
    expect(reviewedTeamCompositions.mauga.faqs.find(faq => faq.question.includes('Cardiac'))?.answer).toContain('no reciben reducción de daño')
    expect(reviewedTeamCompositions.mauga.faqs.find(faq => faq.question.includes('Overrun'))?.answer).toContain('Kinetic Bandolier')
    expect(reviewedTeamCompositions.mauga.faqs.find(faq => faq.question.includes('Overrun'))?.answer).toContain('Firewalker')
  })
  it('does not promise shared defense or default speed from close-range kits', () => {
    expect(reviewedTeamCompositions.anran.summary).toContain('Reservar Revival no justifica entrar contando con morir.')
    expect(reviewedTeamCompositions.vendetta.faqs.find(faq => faq.question.includes('Projected Edge'))?.answer).toContain('Consume energía')
    expect(reviewedTeamCompositions.vendetta.faqs.find(faq => faq.question.includes('cruce detrás'))?.answer).toContain('No la trates como una barrera colectiva.')
    expect(reviewedTeamCompositions.mizuki.faqs.find(faq => faq.question.includes('velocidad'))?.answer).toContain('No. Quickstep es el perk')
    expect(reviewedTeamCompositions.mizuki.faqs.find(faq => faq.question.includes('Kekkai'))?.answer).toContain('no limpia anticuración')
  })
  it('does not assume optional perk effects belong to the base kit', () => {
    expect(reviewedTeamCompositions.sojourn.summary).toContain('Disruptor Shot no ralentiza por defecto.')
    expect(reviewedTeamCompositions['soldier-76'].intro.join(' ')).toContain('Stim Pack, reemplaza esa habilidad')
    expect(reviewedTeamCompositions.emre.faqs.find(faq => faq.question.includes('Cyber Frag'))?.answer).toContain('No por defecto.')
  })
  it('distinguishes coordination and zone pressure from guaranteed protection', () => {
    expect(reviewedTeamCompositions.symmetra.summary).toContain('Photon Barrier bloquea disparos, no impide que el rival cruce a melee.')
    expect(reviewedTeamCompositions.torbjorn.faqs.find(faq => faq.question.includes('Molten Core'))?.answer).toContain('No.')
    expect(reviewedTeamCompositions.torbjorn.intro.join(' ')).toContain('En ataque')
  })
  it('does not present Doctrine trial proposals as a confirmed launch meta', () => {
    const doctrine = reviewedTeamCompositions.doctrine
    expect(doctrine.intro.join(' ')).toContain('6 de octubre de 2026')
    expect(doctrine.intro.join(' ')).toContain('ya terminó')
    expect(doctrine.reviewedPatch).toContain('pendiente del balance de lanzamiento')
    expect(doctrine.compositions.find(comp => comp.format === '6v6')?.engagePlan).toContain('disponibilidad de Doctrine')
  })
  it('serves the reviewed article without promoting it into the sitemap', () => {
    for (const [slug, article] of Object.entries(reviewedTeamCompositions)) {
      expect(getTeamCompPillar(slug)).toBe(article)
      expect(article.compositions).toHaveLength(3)
      expect(article.schemaDate).toBe(reviewDates[slug])
      expect(editorialTopicQualityDecision('team_comp', slug, article)).toMatchObject({ indexable: false, adsAllowed: false })
      for (const comp of article.compositions) {
        expect(comp.lineup).toContain(article.name)
        expect(comp.lineup).toHaveLength(comp.format === '5v5' ? 5 : 6)
        expect(new Set(comp.lineup).size).toBe(comp.lineup.length)
        const heroes = comp.lineup.map(name => COUNTER_HEROES.find(hero => toSlug(hero.name) === toSlug(name)))
        expect(heroes.every(Boolean), comp.name).toBe(true)
        const roles = heroes.map(hero => hero!.role)
        expect(roles.filter(role => role === 'tank')).toHaveLength(comp.format === '5v5' ? 1 : 2)
        expect(roles.filter(role => role === 'dps')).toHaveLength(2)
        expect(roles.filter(role => role === 'support')).toHaveLength(2)
        for (const field of ['winCondition', 'engagePlan', 'goodMaps', 'weakAgainst', 'substitutions'] as const) {
          expect(comp[field].split(/\s+/).length).toBeGreaterThan(20)
        }
      }
    }
  })

  it('uses published map routes and distinct editorial paragraphs', () => {
    const paragraphs: string[] = []
    for (const article of Object.values(reviewedTeamCompositions)) {
      for (const link of article.links) {
        if (link.href.startsWith('/maps/')) expect(MAP_PILLAR_SLUGS).toContain(link.href.slice('/maps/'.length))
      }
      paragraphs.push(...article.intro, ...article.responsibilities.map(item => item.body), ...article.examples.map(item => item.body))
    }
    expect(new Set(paragraphs).size).toBe(paragraphs.length)
  })
})
