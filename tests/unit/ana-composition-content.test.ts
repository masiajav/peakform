import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import TeamCompPillarPage from '@/components/content/TeamCompPillarPage'
import { getTeamCompPillar } from '@/lib/seo-clusters'

const ana = getTeamCompPillar('ana')!

describe('Ana composition decisions', () => {
  it('separates 5v5 and 6v6 without a fabricated patch review', () => {
    expect(ana.schemaDate).toBe('2026-10-06')
    expect(ana.reviewedPatch).toBeUndefined()
    expect(ana.compositions.map(team => [team.format, team.lineup.length])).toEqual([
      ['5v5', 5], ['5v5', 5], ['6v6', 6],
    ])
    expect(ana.compositions[2].engagePlan).toContain('proyectiles enemigos')
    expect(ana.compositions[2].engagePlan).toContain('No protege la granada aliada')
    expect(ana.compositions[1].substitutions).toContain('elimina su velocidad')
    expect(ana.vodQuestions).toHaveLength(5)
    expect(ana.faqs).toHaveLength(6)
  })

  it('renders visible decisions, matching FAQ schema and no empty patch label', () => {
    const html = renderToStaticMarkup(createElement(TeamCompPillarPage, { pillar: ana }))
    expect(html).toContain(ana.quickAnswer)
    expect(html).toContain('Qué mirar en una pelea perdida')
    expect(html).not.toContain('Parche revisado:')
    expect(html).not.toContain('adsbygoogle')
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)]
      .flatMap(match => JSON.parse(match[1]))
    const faq = schemas.find(schema => schema['@type'] === 'FAQPage')
    expect(faq.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => ({
      question: item.name, answer: item.acceptedAnswer.text,
    }))).toEqual(ana.faqs)
    expect(schemas.find(schema => schema['@type'] === 'Article').dateModified).toBe('2026-10-06')
  })

  it('keeps an existing patch label when one is actually supplied', () => {
    const html = renderToStaticMarkup(createElement(TeamCompPillarPage, { pillar: getTeamCompPillar('tracer')! }))
    expect(html).toContain('Parche revisado:')
    expect(html).toContain('Season 4, Heroes of Busan')
  })
})
