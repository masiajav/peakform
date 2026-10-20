import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vitest'
import MapsPage from '@/app/maps/page'
import { MAP_PILLARS } from '@/lib/overwatch-maps'

it('lists the existing map guides without claiming the catalogue covers every current map', () => {
  const html = renderToStaticMarkup(createElement(MapsPage))
  expect(html).toContain('Guías por modo de juego')
  expect(html).toContain('guías disponibles')
  expect(html).not.toMatch(/CATÁLOGO COMPLETO|Todos los mapas por modo|todos los mapas principales|guías completas/)
  for (const map of MAP_PILLARS) expect(html).toContain(`href="/maps/${map.slug}"`)
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].flatMap(match => JSON.parse(match[1]))
  expect(schemas.find(item => item['@type'] === 'ItemList').itemListElement).toHaveLength(MAP_PILLARS.length)
  expect(html).not.toContain('href="/maps/grimsvotn"')
})
