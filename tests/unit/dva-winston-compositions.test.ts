import { describe, expect, it } from 'vitest'
import { getTeamCompPillar } from '@/lib/seo-clusters'
import { editorialTopicQualityDecision } from '@/lib/indexing-policy'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'
import { MAP_PILLAR_SLUGS } from '@/lib/overwatch-maps'
import { toSlug } from '@/lib/content'

describe('D.Va and Winston individual composition reviews', () => {
  for (const slug of ['dva', 'winston']) {
    it(`${slug} offers current role-queue teams and individually approved content`, () => {
      const article = getTeamCompPillar(slug)!
      expect(article.schemaDate).toBe('2026-10-10')
      expect(article.publishedDate).toBeUndefined()
      expect(article.reviewedPatch).toBeUndefined()
      expect(article.quickAnswer).toBeTruthy()
      expect(article.vodQuestions).toHaveLength(5)
      expect(article.examples).toHaveLength(3)
      expect(article.faqs).toHaveLength(5)
      expect(article.conclusion).toBeTruthy()
      expect(editorialTopicQualityDecision('team_comp', slug, article)).toMatchObject({ indexable: true, adsAllowed: false })
      for (const comp of article.compositions) {
        const roles = comp.lineup.map(name => COUNTER_HEROES.find(hero => toSlug(hero.name) === toSlug(name))?.role)
        expect(roles).not.toContain(undefined)
        expect(roles.filter(role => role === 'tank')).toHaveLength(comp.format === '5v5' ? 1 : 2)
        expect(roles.filter(role => role === 'dps')).toHaveLength(2)
        expect(roles.filter(role => role === 'support')).toHaveLength(2)
        for (const field of ['winCondition', 'engagePlan', 'goodMaps', 'weakAgainst', 'substitutions'] as const) {
          expect(comp[field].split(/\s+/).length).toBeGreaterThan(20)
        }
      }
      expect(JSON.stringify(article)).not.toMatch(/Season 3|Sombra por Tracer|Sombra por Genji|Sombra por Ana.*preparar foco/)
      for (const link of article.links.filter(link => link.href.startsWith('/maps/'))) {
        expect(MAP_PILLAR_SLUGS).toContain(link.href.slice('/maps/'.length))
      }
      expect(article.links.map(link => link.href)).toContain(slug === 'dva' ? '/team-comps/winston' : '/team-comps/dva')
    })
    it(`${slug} loses approval when unreviewed wording, metadata or lineups change`, () => {
      const article = getTeamCompPillar(slug)!
      const variants = [
        { ...article, h1: 'Unreviewed heading' },
        { ...article, seoDescription: 'Unreviewed description' },
        { ...article, intro: ['Unreviewed advice'] },
        { ...article, compositions: article.compositions.map(comp => ({ ...comp, lineup: ['Sombra', ...comp.lineup.slice(1)] })) },
      ]
      for (const variant of variants) expect(editorialTopicQualityDecision('team_comp', slug, variant)).toMatchObject({ indexable: false, adsAllowed: false })
    })
  }
  it('keeps Matrix limits, optional bubble healing and conditional second dives explicit', () => {
    const dva = getTeamCompPillar('dva')!
    const winston = getTeamCompPillar('winston')!
    expect(dva.faqs.find(faq => faq.question.includes('Matriz'))?.answer).toContain('no haces como el de Zarya ni golpes de melee')
    expect(winston.faqs.find(faq => faq.question.includes('burbuja'))?.answer).toContain('perk major Revitalizing Barrier')
    expect(winston.examples[2].title).toBe('Una Suzu gastada no garantiza el siguiente dive')
    expect(winston.rotationPlan[5]).toContain('vida, Salto, burbuja, posición de los DPS y objetivo')
    const paragraphs = [dva, winston].flatMap(article => [...article.intro, ...article.responsibilities.map(item => item.body), ...article.examples.map(item => item.body)])
    expect(new Set(paragraphs).size).toBe(paragraphs.length)
  })
})
