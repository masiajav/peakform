import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import HeroesIndexPage, { generateMetadata } from '@/app/heroes/page'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'
import { heroTopicHref } from '@/lib/topic-links'
import { absoluteUrl } from '@/lib/seo'

describe('hero directory', () => {
  it('describes a role catalogue without promising a tier list', async () => {
    const metadata = await generateMetadata({ searchParams: Promise.resolve({}) })
    expect(metadata.title).toBe('Héroes de Overwatch por rol: Tank, DPS y Support')
    expect(metadata.description).not.toMatch(/mejores picks|victoria garantizada/i)
    expect(metadata.alternates?.canonical).toBe(absoluteUrl('/heroes'))
    expect(metadata.robots).toEqual({ index: true, follow: true })
  })

  it('retains noindex and the base canonical for role query variants', async () => {
    for (const role of ['tank', 'dps', 'support', 'invalid']) {
      const metadata = await generateMetadata({ searchParams: Promise.resolve({ role }) })
      expect(metadata.robots).toEqual({ index: false, follow: true })
      expect(metadata.alternates?.canonical).toBe(absoluteUrl('/heroes'))
    }
  })

  it('lists every visible hero in the same role order as structured data', () => {
    const html = renderToStaticMarkup(createElement(HeroesIndexPage))
    const schemas = Array.from(html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g), match => JSON.parse(match[1]))
    const collection = schemas.find(schema => schema['@type'] === 'CollectionPage')
    const heroes = ['tank', 'dps', 'support'].flatMap(role => COUNTER_HEROES.filter(hero => hero.role === role))
    expect(collection.mainEntity.numberOfItems).toBe(54)
    expect(collection.mainEntity.itemListElement).toEqual(heroes.map((hero, index) => ({
      '@type': 'ListItem', position: index + 1, name: hero.name, url: absoluteUrl(heroTopicHref(hero.slug)),
    })))
    expect(collection.dateModified).toBe('2026-10-09')
  })

  it('keeps the catalogue first and reflects the launched Support roster', () => {
    const html = renderToStaticMarkup(createElement(HeroesIndexPage))
    expect(html.indexOf('id="tank"')).toBeLessThan(html.indexOf('id="choose-hero"'))
    expect(html.indexOf('id="support"')).toBeLessThan(html.indexOf('Preguntas sobre héroes'))
    expect(html).not.toContain('PREVIEW')
    expect(html).toContain('Doctrine ya está disponible')
    expect(html).toContain('Sombra también pasa a Support')
    expect(html).toContain('con una pasiva compartida')
    expect(html).toContain('no son esos subroles')
    expect(html).not.toContain('CÓMO USAR ESTE HUB')
    expect(html).not.toContain('DPS flanker en seguimiento')
    expect(html).not.toContain('adsbygoogle')
  })
})
