import { describe, expect, it } from 'vitest'
import { getCounterPillar, getTeamCompPillar } from '@/lib/seo-clusters'
import { reviewedCounters } from '@/lib/reviewed-counters'
import { reviewedTeamCompositions } from '@/lib/reviewed-team-compositions'
import { editorialTopicQualityDecision } from '@/lib/indexing-policy'

describe('Doomfist and D.Mon Season 5 tactical review', () => {
  for (const slug of ['doomfist', 'dmon'] as const) {
    it(`${slug} only indexes the reviewed version and never enables ads`, () => {
      for (const [kind, article] of [['counter', getCounterPillar(slug)!], ['team_comp', getTeamCompPillar(slug)!]] as const) {
        expect(editorialTopicQualityDecision(kind, slug, article)).toMatchObject({ indexable: true, adsAllowed: false })
        expect(editorialTopicQualityDecision(kind, slug, { ...article, conclusion: 'An unreviewed edit' })).toMatchObject({ indexable: false, adsAllowed: false })
        expect(editorialTopicQualityDecision(kind, slug, { ...article, seoDescription: 'An unreviewed description' })).toMatchObject({ indexable: false, adsAllowed: false })
        expect(editorialTopicQualityDecision(kind, slug, { ...article, vodQuestions: ['An unreviewed checklist'] })).toMatchObject({ indexable: false, adsAllowed: false })
      }
    })
    it(`${slug} preserves routes and records the real revision without inventing a publication date`, () => {
      for (const article of [getCounterPillar(slug)!, getTeamCompPillar(slug)!]) {
        expect(article.schemaDate).toBe('2026-10-11')
        expect(article.updatedAt).toBe('11 de octubre de 2026')
        expect(article.publishedDate).toBeUndefined()
        expect(article.reviewedPatch).toContain('Season 5')
        expect(article.faqs).toHaveLength(5)
        expect(article.vodQuestions).toHaveLength(5)
        expect(article.conclusion).toBeTruthy()
        expect(JSON.stringify(article)).not.toMatch(/Season 4|TITLE SEO|META DESCRIPTION|he probado|tasa de victorias/i)
      }
      expect(reviewedCounters[slug].links.map(link => link.href)).toContain(`/team-comps/${slug}`)
      expect(reviewedTeamCompositions[slug].links.map(link => link.href)).toContain(`/counters/${slug}`)
    })
  }
  it('makes Power Matrix optional and distinguishes output reduction from normal Hack', () => {
    for (const article of [reviewedCounters.doomfist, reviewedTeamCompositions.doomfist]) {
      const text = JSON.stringify(article)
      expect(text).toContain('perk major')
      expect(text).toContain('0,8 segundos')
      expect(text).toContain('Sombra')
      expect(text).toContain('Support')
      expect(text).toContain('Weaken')
    }
    expect(reviewedCounters.doomfist.faqs[4].answer).toContain('no sus habilidades ni las curas que recibe')
    expect(reviewedCounters.doomfist.cooldownWindows[1].body).toContain('que termine la absorción no convierte')
    expect(reviewedTeamCompositions.doomfist.compositions[0].substitutions).toContain('pierdes Suzu')
  })
  it('separates barrier repair, Surging Strike lifesteal and existing overhealth', () => {
    expect(reviewedCounters.dmon.cooldownWindows[4].body).toContain('no cura la vida de D.Mon')
    expect(reviewedCounters.dmon.cooldownWindows[4].body).toContain('no a toda la espada')
    expect(reviewedCounters.dmon.faqs[4].answer).toContain('no borra el overhealth')
    expect(reviewedTeamCompositions.dmon.responsibilities[3].body).toContain('no avances contando con los cuatro perks a la vez')
    expect(reviewedTeamCompositions.dmon.intro[1]).toContain('amplifica el daño recibido')
    expect(reviewedCounters.dmon.cooldownWindows[0].body).toContain('no una lectura exacta de su reserva')
  })
  it('keeps the double-Tank examples outside 5v5 and does not turn Matrix into a barrier', () => {
    for (const article of [reviewedTeamCompositions.doomfist, reviewedTeamCompositions.dmon]) {
      const six = article.compositions.find(comp => comp.format === '6v6')!
      expect(six.lineup).toHaveLength(6)
      expect(six.engagePlan).toContain('no')
      expect(six.engagePlan).toContain('5v5')
      expect(six.engagePlan).toContain('haces')
      expect(six.engagePlan).toContain('melee')
    }
    expect(reviewedTeamCompositions.dmon.faqs[4].answer).toContain('solo hay un puesto de Tank')
  })
})
