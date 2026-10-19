import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import TeamCompPillarPage from '@/components/content/TeamCompPillarPage'
import { getTeamCompPillar } from '@/lib/seo-clusters'
import { editorialTopicQualityDecision } from '@/lib/indexing-policy'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

const originalLineups = {
  domina: [['Domina', 'Ashe', 'Tracer', 'Baptiste', 'Kiriko'], ['Domina', 'Mei', 'Cassidy', 'Lúcio', 'Kiriko'], ['Domina', 'D.Va', 'Ashe', 'Cassidy', 'Ana', 'Kiriko']],
  'jetpack-cat': [['Sigma', 'Ashe', 'Echo', 'Ana', 'Jetpack Cat'], ['Winston', 'Genji', 'Sojourn', 'Brigitte', 'Jetpack Cat'], ['Reinhardt', 'D.Va', 'Cassidy', 'Mei', 'Baptiste', 'Jetpack Cat']],
  wuyang: [['Ramattra', 'Mei', 'Cassidy', 'Wuyang', 'Lúcio'], ['Winston', 'Genji', 'Sojourn', 'Wuyang', 'Ana'], ['Reinhardt', 'D.Va', 'Ashe', 'Mei', 'Wuyang', 'Kiriko']],
}

describe('Domina, Jetpack Cat and Wuyang composition review', () => {
  for (const slug of Object.keys(originalLineups) as (keyof typeof originalLineups)[]) {
    it(`${slug} preserves its teams and known history with distinct visible decisions`, () => {
      const article = getTeamCompPillar(slug)!
      expect(article).toMatchObject({ slug, schemaDate: '2026-10-19', updatedAt: '19 de octubre de 2026' })
      expect(article.publishedDate).toBeUndefined()
      expect(article.compositions.map(item => item.lineup)).toEqual(originalLineups[slug])
      expect(article.quickAnswer).toBeTruthy()
      expect(article.vodQuestions).toHaveLength(5)
      expect(article.faqs).toHaveLength(5)
      expect(article.conclusion).toBeTruthy()
      for (const href of [`/counters/${slug}`, '/guides/review-vod-overwatch-espanol#cuaderno-vod', '/experts']) expect(article.links.some(link => link.href === href)).toBe(true)
      expect(editorialTopicQualityDecision('team_comp', slug, article)).toMatchObject({ indexable: true, adsAllowed: false })
      expect(hasCurrentStaticEditorialReview(`/team-comps/${slug}`, article)).toBe(true)
      expect(editorialTopicQualityDecision('team_comp', slug, { ...article, quickAnswer: 'Changed without review' })).toMatchObject({ indexable: false, adsAllowed: false })
      expect(hasCurrentStaticEditorialReview(`/team-comps/${slug}`, { ...article, quickAnswer: 'Changed without review' })).toBe(false)
      const html = renderToStaticMarkup(createElement(TeamCompPillarPage, { pillar: article }))
      expect(html).toContain(article.quickAnswer)
      expect(html).toContain(article.conclusion)
      expect(html).toContain('Qué mirar en tu repetición')
      expect(html).not.toMatch(/TITLE SEO|META DESCRIPTION|adsbygoogle|una pelea perdida/)
      const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].flatMap(match => JSON.parse(match[1]))
      expect(schemas.find(item => item['@type'] === 'Article')).toMatchObject({ dateModified: '2026-10-19', author: { name: 'Replaid Lab' } })
      expect(schemas.find(item => item['@type'] === 'Article')).not.toHaveProperty('datePublished')
      expect(schemas.find(item => item['@type'] === 'FAQPage').mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => ({ question: item.name, answer: item.acceptedAnswer.text }))).toEqual(article.faqs)
    })
  }

  it('Domina distinguishes optional control, Reconstruction and objective urgency', () => {
    const article = getTeamCompPillar('domina')!
    const text = JSON.stringify(article)
    for (const term of ['6 de octubre', 'Reconstruction', 'Corporate Retreat', 'Disruptive Detonation', 'puede ganar tiempo para tocar']) expect(text).toContain(term)
    expect(text).toContain('no añade esa ralentización')
    expect(text).not.toMatch(/Panopticon.*200 health|propels Domina backwards/)
  })
  it('Jetpack Cat distinguishes carried healing, interrupted transport and normal perks', () => {
    const article = getTeamCompPillar('jetpack-cat')!
    const text = JSON.stringify(article)
    for (const term of ['También cura al aliado transportado', 'no necesita esperar por norma', 'puede desconectar el enlace', 'Transport Shielding', 'Ulterior Motive', 'Purrfect Form', 'Battle Fur-mation']) expect(text).toContain(term)
    expect(text).toContain('no cura a través de barreras enemigas')
    const html = renderToStaticMarkup(createElement(TeamCompPillarPage, { pillar: article }))
    expect(html).toContain('Habilidades revisadas')
    expect(html).not.toContain('Parche revisado:')
  })
  it('Wuyang separates passive/active Stream, delayed healing and alternative perks', () => {
    const text = JSON.stringify(getTeamCompPillar('wuyang'))
    for (const term of ['curación pasiva', 'curación activa', 'Overflow', 'Balance', 'Minor alternativos', 'Ebb and Flow', 'Falling Rain', 'Tidal Blast para defender a Ana']) expect(text).toContain(term)
    expect(text).toContain('Distingue esa protección inicial de la curación posterior')
  })
  it('does not reuse the long paragraphs or quick answers across the three articles', () => {
    const articles = Object.keys(originalLineups).map(slug => getTeamCompPillar(slug)!)
    const paragraphs = articles.flatMap(article => [article.quickAnswer!, ...article.intro, ...article.responsibilities.map(item => item.body), ...article.examples.map(item => item.body), ...article.faqs.map(item => item.answer), article.conclusion!])
    expect(new Set(paragraphs).size).toBe(paragraphs.length)
  })
})
