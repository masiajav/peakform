import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import MapPillarPage from '@/components/content/MapPillarPage'
import { getMapPillar } from '@/lib/overwatch-maps'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

const teams = {
  'kings-row': [['Reinhardt', 'Cassidy', 'Mei', 'Lúcio', 'Kiriko'], ['Winston', 'Genji', 'Tracer', 'Ana', 'Kiriko']],
  'lijiang-tower': [['Reinhardt', 'Mei', 'Cassidy', 'Lúcio', 'Kiriko'], ['Winston', 'Genji', 'Tracer', 'Ana', 'Kiriko']],
}

describe('individual King\'s Row and Lijiang map revisions', () => {
  for (const slug of Object.keys(teams) as (keyof typeof teams)[]) {
    it(`${slug} preserves the actual teams, image, mode and unknown publication history`, () => {
      const map = getMapPillar(slug)!
      expect(map.image).toBe(`/maps/${slug}.png`)
      expect(map.mode).toBe(slug === 'kings-row' ? 'Híbrido' : 'Control')
      expect(map.compositions.map(item => item.lineup)).toEqual(teams[slug])
      expect(map.updatedAtIso).toBe('2026-10-19')
      expect(map.publishedAtIso).toBeUndefined()
      expect(hasCurrentStaticEditorialReview(`/maps/${slug}`, map)).toBe(true)
      expect(hasCurrentStaticEditorialReview(`/maps/${slug}`, { ...map, conclusion: 'Unreviewed text' })).toBe(false)
      expect(hasCurrentStaticEditorialReview(`/maps/${slug}`, { ...map, updatedAtIso: '2026-10-20' })).toBe(false)
      expect(map.faq).toHaveLength(5)
      expect(map.conclusion).toBeTruthy()
      expect(map.relatedLinks.some(link => link.href === '/guides/review-vod-overwatch-espanol#cuaderno-vod')).toBe(true)
      expect(map.relatedLinks.some(link => /como-elegir-composicion-dive-poke-brawl|como-mejorar-en-overwatch-revisando-vod/.test(link.href))).toBe(false)
      const html = renderToStaticMarkup(createElement(MapPillarPage, { map }))
      expect(html).toContain(map.conclusion)
      const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].flatMap(match => JSON.parse(match[1]))
      expect(schemas.find(item => item['@type'] === 'Article')).toMatchObject({ dateModified: '2026-10-19', author: { name: 'Replaid Lab' } })
      expect(schemas.find(item => item['@type'] === 'Article')).not.toHaveProperty('datePublished')
      expect(schemas.find(item => item['@type'] === 'FAQPage').mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => ({ question: item.name, answer: item.acceptedAnswer.text }))).toEqual(map.faq)
    })
  }
  it('King\'s Row distinguishes the hotel exit, escort assignment, healing bend and final contest', () => {
    const map = getMapPillar('kings-row')!
    const text = JSON.stringify(map)
    for (const phrase of ['salida de hotel', 'quién empuja', 'giro de ambos', 'huecos', 'no hay una cifra fija', 'vista libre']) expect(text.toLowerCase()).toContain(phrase.toLowerCase())
    expect(text).not.toContain('después entra con dos recursos compatibles')
    expect(text).not.toContain('Gastar todas las definitivas para salvar diez centímetros')
    expect(text).not.toMatch(/minimapa|si el portador|Probad otra exposición/i)
    expect(map.phases.map(item => item.name)).toEqual(['Punto A: hotel y estatua', 'Calles y segundo tramo', 'Fundición y tramo final'])
  })
  it('Lijiang distinguishes all three rounds and does not prescribe a swap or regroup at all costs', () => {
    const map = getMapPillar('lijiang-tower')!
    const text = JSON.stringify(map)
    for (const phrase of ['Night Market', 'Garden', 'Control Center', 'el puente', 'no obliga a cambiar de héroe', 'no deja preparar otro intento', 'no las reglas ni los poderes de Stadium', 'sin dar por hecho que toda muerte ambiental era evitable']) expect(text).toContain(phrase)
    expect(text).not.toContain('Por encima del 80 %')
    expect(text).not.toContain('Una diferencia de dos segundos explica')
    expect(map.phases.map(item => item.name)).toEqual(['Night Market', 'Garden', 'Control Center'])
  })
  it('does not reuse the long decision paragraphs across these distinct modes', () => {
    const paragraphs = Object.keys(teams).flatMap(slug => {
      const map = getMapPillar(slug)!
      return [...map.intro, ...map.phases.flatMap(item => [item.attack, item.defense, item.vodReview]), ...map.attackPlan.map(item => item.body), ...map.defensePlan.map(item => item.body), ...map.faq.map(item => item.answer), map.conclusion!]
    })
    expect(new Set(paragraphs).size).toBe(paragraphs.length)
  })
})
