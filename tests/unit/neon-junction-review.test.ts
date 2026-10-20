import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import MapPillarPage from '@/components/content/MapPillarPage'
import { getMapPillar, MAP_PILLARS } from '@/lib/overwatch-maps'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

function schemas(html: string) {
  return [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].flatMap(match => JSON.parse(match[1]))
}

describe('honest map dates and Neon Junction review', () => {
  it('records only the individually read map revision and invalidates changed copy', () => {
    for (const map of MAP_PILLARS) expect(hasCurrentStaticEditorialReview(`/maps/${map.slug}`, map)).toBe(['neon-junction', 'kings-row', 'lijiang-tower'].includes(map.slug))
    const map = getMapPillar('neon-junction')!
    expect(hasCurrentStaticEditorialReview('/maps/neon-junction', { ...map, conclusion: 'Unreviewed replacement' })).toBe(false)
    expect(hasCurrentStaticEditorialReview('/maps/neon-junction', { ...map, updatedAtIso: '2026-10-20' })).toBe(false)
  })
  it.each(MAP_PILLARS)('$name does not turn a review into a publication date', map => {
    const html = renderToStaticMarkup(createElement(MapPillarPage, { map }))
    const article = schemas(html).find(item => item['@type'] === 'Article')
    expect(article.dateModified).toBe(map.updatedAtIso)
    expect(article.author.name).toBe('Replaid Lab')
    expect(article).not.toHaveProperty('datePublished')
    expect(html).toContain(`<time dateTime="${map.updatedAtIso}">${map.updatedAt}</time>`)
    expect(schemas(html).find(item => item['@type'] === 'FAQPage').mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => ({ question: item.name, answer: item.acceptedAnswer.text }))).toEqual(map.faq)
  })

  it('retains an explicitly known publication date when a later review changes', () => {
    const fixture = { ...getMapPillar('neon-junction')!, publishedAtIso: '2026-07-04' }
    const article = schemas(renderToStaticMarkup(createElement(MapPillarPage, { map: fixture }))).find(item => item['@type'] === 'Article')
    expect(article).toMatchObject({ datePublished: '2026-07-04', dateModified: '2026-10-19' })
    const later = { ...fixture, updatedAtIso: '2026-10-20' }
    expect(schemas(renderToStaticMarkup(createElement(MapPillarPage, { map: later }))).find(item => item['@type'] === 'Article')).toMatchObject({ datePublished: '2026-07-04', dateModified: '2026-10-20' })
  })

  it('dates only the three individually revised models, preserving other map history', () => {
    const julyFourth = ['busan', 'nepal', 'oasis', 'circuit-royal', 'rialto', 'route-66', 'watchpoint-gibraltar', 'aatlis', 'new-junk-city', 'dorado']
    const revised = ['neon-junction', 'kings-row', 'lijiang-tower']
    for (const map of MAP_PILLARS) expect(map.updatedAtIso).toBe(revised.includes(map.slug) ? '2026-10-19' : julyFourth.includes(map.slug) ? '2026-07-04' : '2026-07-19')
    expect(getMapPillar('neon-junction')!.updatedAt).toBe('19 de octubre de 2026')
  })

  it('keeps its teams and gives conditional advice for the actual route', () => {
    const map = getMapPillar('neon-junction')!
    expect(map.compositions.map(item => item.lineup)).toEqual([
      ['Winston', 'Tracer', 'Shion', 'Ana', 'Kiriko'],
      ['Reinhardt', 'Cassidy', 'Mei', 'Lúcio', 'Kiriko'],
    ])
    expect(map.phases.map(item => item.name)).toEqual(['Captura inicial', 'Tren y curva hacia el segundo punto', 'Acceso a Zuiko-za'])
    const text = JSON.stringify(map)
    for (const term of ['ANDROMEDA III', 'plataforma de tren', 'curva en pendiente', 'no hay una cantidad fija', 'quién empuja', 'no siempre']) expect(text.toLowerCase()).toContain(term.toLowerCase())
    expect(text).not.toMatch(/control del altura|hacen valioso la protección|Pausa diez segundos|La entrada empieza después|guardar cinco definitivas/i)
    expect(map.faq).toHaveLength(5)
    expect(map.conclusion).toContain('la curva antes del segundo punto')
    expect(renderToStaticMarkup(createElement(MapPillarPage, { map }))).toContain(map.conclusion)
    expect(map.relatedLinks.some(item => item.href === '/guides/review-vod-overwatch-espanol#cuaderno-vod')).toBe(true)
    expect(map.relatedLinks.some(item => item.href === '/guides/composiciones-overwatch-5v5-6v6')).toBe(true)
    expect(map.relatedLinks.some(item => item.href.includes('como-elegir-composicion-dive-poke-brawl'))).toBe(false)
  })

  it('keeps all sixty map teams valid under the current role catalogue', () => {
    const normalize = (value: string) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
    const roles = new Map(COUNTER_HEROES.map(hero => [normalize(hero.name), hero.role]))
    expect(MAP_PILLARS.flatMap(map => map.compositions)).toHaveLength(60)
    for (const map of MAP_PILLARS) {
      for (const composition of map.compositions) {
        expect(composition.lineup).toHaveLength(5)
        expect(new Set(composition.lineup).size).toBe(5)
        const counts = composition.lineup.map(name => roles.get(normalize(name)))
        expect(counts.filter(role => role === 'tank')).toHaveLength(1)
        expect(counts.filter(role => role === 'dps')).toHaveLength(2)
        expect(counts.filter(role => role === 'support')).toHaveLength(2)
      }
      for (const hero of map.heroPicks) expect(roles.get(normalize(hero.name))).toBe(hero.role)
    }
  })
})
