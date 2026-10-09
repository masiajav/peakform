import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import TeamCompPillarPage from '@/components/content/TeamCompPillarPage'
import { getTeamCompPillar } from '@/lib/seo-clusters'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'
import { toSlug } from '@/lib/content'
import { MAP_PILLAR_SLUGS } from '@/lib/overwatch-maps'

describe('Kiriko and Genji composition decisions', () => {
  for (const slug of ['kiriko', 'genji']) {
    it(`${slug} retains valid formats, related destinations and honest dates`, () => {
      const article = getTeamCompPillar(slug)!
      expect(article.schemaDate).toBe('2026-10-06')
      expect(article.publishedDate).toBeUndefined()
      expect(article.reviewedPatch).toBeUndefined()
      expect(article.compositions.map(team => team.format)).toEqual(['5v5', '5v5', '6v6'])
      for (const team of article.compositions) {
        const roles = team.lineup.map(name => COUNTER_HEROES.find(hero => toSlug(hero.name) === toSlug(name))?.role)
        expect(roles.filter(role => role === 'tank')).toHaveLength(team.format === '5v5' ? 1 : 2)
        expect(roles.filter(role => role === 'dps')).toHaveLength(2)
        expect(roles.filter(role => role === 'support')).toHaveLength(2)
        expect(new Set(team.lineup).size).toBe(team.lineup.length)
        expect(team.substitutions).not.toContain('Sombra')
      }
      for (const link of article.links.filter(link => link.href.startsWith('/maps/'))) {
        expect(MAP_PILLAR_SLUGS).toContain(link.href.slice('/maps/'.length))
      }
      expect(article.vodQuestions).toHaveLength(5)
      expect(article.faqs).toHaveLength(6)
      expect(article.quickAnswer).toContain('6v6')
    })

    it(`${slug} renders specific content and matching FAQ schema without ads`, () => {
      const article = getTeamCompPillar(slug)!
      const html = renderToStaticMarkup(createElement(TeamCompPillarPage, { pillar: article }))
      expect(html).toContain(article.quickAnswer)
      expect(html).toContain(article.conclusion)
      expect(html).not.toContain('Parche revisado:')
      expect(html).not.toContain('adsbygoogle')
      const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)]
        .flatMap(match => JSON.parse(match[1]))
      expect(schemas.find(schema => schema['@type'] === 'Article')).toMatchObject({
        dateModified: '2026-10-06', author: { '@type': 'Organization', name: 'Replaid Lab' },
      })
      expect(schemas.find(schema => schema['@type'] === 'Article')).not.toHaveProperty('datePublished')
      expect(schemas.find(schema => schema['@type'] === 'FAQPage').mainEntity.map((item: {
        name: string; acceptedAnswer: { text: string }
      }) => ({ question: item.name, answer: item.acceptedAnswer.text }))).toEqual(article.faqs)
    })
  }

  it('does not promise teleport exits, immediate cooldown resets or automatic Dash resets', () => {
    const kiriko = getTeamCompPillar('kiriko')!
    const genji = getTeamCompPillar('genji')!
    expect(kiriko.intro.join(' ')).toContain('no puedes dar por hecho otro teleport inmediato')
    expect(kiriko.faqs.find(faq => faq.question.includes('al instante'))?.answer).toContain('no equivale a un reset inmediato')
    expect(kiriko.compositions[1].substitutions).toContain('elimina la velocidad de entrada')
    expect(genji.faqs.find(faq => faq.question.includes('golpear'))?.answer).toContain('no de golpear')
    expect(genji.compositions[2].engagePlan).toContain('no simplemente porque haya visto un cooldown')
  })

  it('does not reuse the editorial paragraphs of Ana or the other hero', () => {
    const paragraphs = ['ana', 'kiriko', 'genji'].flatMap(slug => {
      const article = getTeamCompPillar(slug)!
      return [...article.intro, ...article.examples.map(example => example.body),
        ...article.responsibilities.map(item => item.body), ...article.faqs.map(faq => faq.answer), article.conclusion!]
    })
    expect(new Set(paragraphs).size).toBe(paragraphs.length)
  })
})
