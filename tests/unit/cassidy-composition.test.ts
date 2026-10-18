import { describe, expect, it } from 'vitest'
import { getCounterPillar, getTeamCompPillar } from '@/lib/seo-clusters'
import { editorialTopicQualityDecision } from '@/lib/indexing-policy'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'
import { MAP_PILLAR_SLUGS } from '@/lib/overwatch-maps'
import { toSlug } from '@/lib/content'

const article = getTeamCompPillar('cassidy')!

describe('Cassidy composition decisions', () => {
  it('has a specific answer and honest review date without invented publication or patch history', () => {
    expect(article.schemaDate).toBe('2026-10-17')
    expect(article.updatedAt).toBe('17 de octubre de 2026')
    expect(article.publishedDate).toBeUndefined()
    expect(article.reviewedPatch).toBeUndefined()
    expect(article.quickAnswer).toContain('siguiente cobertura')
    expect(article.vodQuestions).toHaveLength(5)
    expect(article.faqs).toHaveLength(5)
    expect(article.conclusion).toContain('rotación')
    expect(JSON.stringify(article)).not.toMatch(/Season 3|TITLE SEO|win.?rate|victorias garantizadas|probado personalmente/i)
  })
  it('separates two 5v5 role-queue plans from the two-Tank 6v6 plan', () => {
    expect(article.compositions.map(team => team.format)).toEqual(['5v5', '5v5', '6v6'])
    for (const team of article.compositions) {
      const roles = team.lineup.map(name => COUNTER_HEROES.find(hero => toSlug(hero.name) === toSlug(name))?.role)
      expect(roles).not.toContain(undefined)
      expect(roles.filter(role => role === 'tank')).toHaveLength(team.format === '5v5' ? 1 : 2)
      expect(roles.filter(role => role === 'dps')).toHaveLength(2)
      expect(roles.filter(role => role === 'support')).toHaveLength(2)
      expect(team.lineup).toContain('Cassidy')
    }
    expect(article.compositions[2].substitutions).toContain('En 5v5 no cabe añadir un segundo Tank')
    expect(article.compositions[0].substitutions).toContain('pierdes la limpieza de Suzu')
  })
  it('keeps the wall, sightline, perk and ultimate trade-offs specific to Cassidy', () => {
    const text = JSON.stringify(article)
    for (const term of ['Roll recarga', 'Sharpshooter', 'Bang Bang', 'Giddy Up', 'Silver Bullet', 'Rollin’ Round-Up', 'no poderes de Stadium']) expect(text).toContain(term)
    expect(article.examples.map(example => example.title)).toEqual([
      'King’s Row: el muro tapa el tiro', 'Circuit Royal: ayudar no exige abandonar el ángulo', 'Midtown: cancelar Deadeye también conserva recursos',
    ])
    expect(article.examples[2].body).toContain('Busca cobertura o cancela')
    expect(article.compositions[2].engagePlan).toContain('No hace falta gastar Graviton y Deadeye juntos')
    const paragraphs = [...article.intro, ...article.responsibilities.map(item => item.body), ...article.examples.map(item => item.body), ...article.faqs.map(item => item.answer)]
    expect(new Set(paragraphs).size).toBe(paragraphs.length)
    expect(paragraphs.some(paragraph => getCounterPillar('cassidy')!.intro.includes(paragraph))).toBe(false)
  })
  it('links to the existing hero, counter, map and free VOD routes', () => {
    for (const path of ['/heroes/cassidy', '/counters/cassidy', '/guides/como-jugar-cassidy-ranked-overwatch', '/guides/review-vod-overwatch-espanol#cuaderno-vod', '/experts']) expect(article.links.some(link => link.href === path)).toBe(true)
    for (const link of article.links.filter(link => link.href.startsWith('/maps/'))) expect(MAP_PILLAR_SLUGS).toContain(link.href.slice(6))
  })
  it('indexes only the individually reviewed version and keeps advertising disabled', () => {
    expect(editorialTopicQualityDecision('team_comp', 'cassidy', article)).toMatchObject({ indexable: true, adsAllowed: false })
    expect(editorialTopicQualityDecision('team_comp', 'cassidy', { ...article, h1: 'Changed without review' })).toMatchObject({ indexable: false, adsAllowed: false })
  })
})
