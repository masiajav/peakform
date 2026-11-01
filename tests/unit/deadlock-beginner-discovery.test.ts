import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import type { EditorialArticle } from '@/lib/editorial-record'

const { published } = vi.hoisted(() => ({ published: vi.fn() }))
vi.mock('@/lib/editorial-store', () => ({ publishedEditorial: published }))
vi.mock('@/components/layout/PublicNav', () => ({ default: () => null }))
import Home from '@/app/deadlock/page'
import Section, { generateMetadata } from '@/app/deadlock/[section]/page'

const startPath = '/deadlock/guides/como-jugar-deadlock'
const article = (slug: string, title = slug, overrides: Record<string, unknown> = {}): EditorialArticle => ({
  game: 'deadlock', kind: 'guide', slug, path: `/deadlock/guides/${slug}`, title,
  description: 'Consejos para empezar', publishedAt: '2026-10-01', updatedAt: '2026-10-20',
  patch: 'Actualización', intro: 'Introducción', sections: [], checklist: [], sources: [], ...overrides,
} as EditorialArticle)
const fundamentals = () => ['economia-almas', 'fase-de-lineas', 'movimiento-aguante'].map(slug => article(slug))
const props = (section = 'guides', q?: string | string[]) => ({ params: Promise.resolve({ section }), searchParams: Promise.resolve(q === undefined ? {} : { q }) })
const collection = (html: string) => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)]
  .map(match => JSON.parse(match[1])).find(schema => schema['@type'] === 'CollectionPage')
const schemaPaths = (html: string): string[] => collection(html).mainEntity.itemListElement.map((item: { url: string }) => new URL(item.url).pathname)
const cardPaths = (html: string): string[] => [...html.matchAll(/<a[^>]*class="game-content-card"[^>]*href="([^"]+)"/g)].map(match => match[1])

beforeEach(() => published.mockReset())

describe('Deadlock beginner discovery', () => {
  it('uses the guides catalogue before the beginner article is published', async () => {
    published.mockResolvedValue(fundamentals())
    const html = renderToStaticMarkup(await Home())
    expect(html).toMatch(/href="\/deadlock\/guides">Soy nuevo/)
    expect(html).not.toContain(startPath)
    expect(html).not.toContain('/deadlock/guides/mods-deadlock')
    expect(html).not.toContain('/deadlock/guides/tier-list-deadlock')
    expect(html).not.toContain('Más guías de Deadlock')
    expect(cardPaths(html)).toEqual(fundamentals().map(a => a.path))
    expect(schemaPaths(html)).toEqual(cardPaths(html))
  })

  it('features published mods and tier list guides after fundamentals in both cards and schema', async () => {
    const start = article('como-jugar-deadlock')
    const mods = article('mods-deadlock', 'Mods de Deadlock')
    const tierList = article('tier-list-deadlock', 'Tier list de Deadlock')
    const news = article('actualidad', 'Noticias recientes', { kind: 'news', path: '/deadlock/news/actualidad' })
    published.mockResolvedValue([tierList, news, ...fundamentals(), mods, start])
    const html = renderToStaticMarkup(await Home())
    const expected = [start.path, ...fundamentals().map(a => a.path), mods.path, tierList.path, news.path]
    expect(cardPaths(html)).toEqual(expected)
    expect(schemaPaths(html)).toEqual(expected)
    expect(html.indexOf('Empieza por aquí')).toBeLessThan(html.indexOf('Más guías de Deadlock'))
    expect(html.indexOf('Más guías de Deadlock')).toBeLessThan(html.indexOf('Noticias y parches'))
    expect(html).toMatch(/href="\/deadlock\/guides\/como-jugar-deadlock">Soy nuevo/)
  })

  it.each(['mods-deadlock', 'tier-list-deadlock'])('does not feature %s without the exact published guide', async slug => {
    published.mockResolvedValue([
      ...fundamentals(),
      article(slug, 'Tipo incorrecto', { kind: 'counter' }),
      article(slug, 'Ruta incorrecta', { path: `/deadlock/guides/${slug}-borrador` }),
    ])
    const html = renderToStaticMarkup(await Home())
    expect(html).not.toContain('Más guías de Deadlock')
    expect(html).not.toContain(`href="/deadlock/guides/${slug}"`)
    expect(html).not.toContain(`${slug}-borrador`)
    expect(cardPaths(html)).toEqual(fundamentals().map(a => a.path))
    expect(schemaPaths(html)).toEqual(cardPaths(html))
  })

  it.each([
    { kind: 'news', path: startPath },
    { kind: 'guide', path: '/deadlock/guides/otro-inicio' },
  ])('requires both guide kind and the exact published path: %j', async overrides => {
    published.mockResolvedValue([article('como-jugar-deadlock', 'Inicio incorrecto', overrides)])
    const html = renderToStaticMarkup(await Home())
    expect(html).toMatch(/href="\/deadlock\/guides">Soy nuevo/)
    expect(html).not.toMatch(new RegExp(`href="${startPath}">Soy nuevo`))
    expect(html).not.toContain('TUS PRIMERAS PARTIDAS')
  })

  it('links the published guide first and keeps fundamentals, with schema following the visible section order', async () => {
    const hero = article('abrams', 'Abrams', { kind: 'hero', hero: 'abrams', path: '/deadlock/heroes/abrams' })
    const city = article('ciudad', 'Mapa de la ciudad', { kind: 'map', mapAtlas: {}, path: '/deadlock/maps/ciudad' })
    const start = article('como-jugar-deadlock', 'Cómo jugar a Deadlock')
    const patch = article('nuevo-parche', 'Balance nuevo', { kind: 'patch_note', path: '/deadlock/patch-notes/nuevo-parche' })
    published.mockResolvedValue([...fundamentals(), patch, city, start, hero])
    const html = renderToStaticMarkup(await Home())
    expect(html).toMatch(/href="\/deadlock\/guides\/como-jugar-deadlock">Soy nuevo/)
    expect(cardPaths(html)).toEqual([start.path, ...fundamentals().map(a => a.path), patch.path])
    expect(cardPaths(html).filter(path => path === startPath)).toHaveLength(1)
    expect(schemaPaths(html)).toEqual([hero.path, city.path, start.path, ...fundamentals().map(a => a.path), patch.path])
    expect(html.indexOf('Aprende a jugar tu main')).toBeLessThan(html.indexOf('Mucho más que tres líneas'))
    expect(html.indexOf('Mucho más que tres líneas')).toBeLessThan(html.indexOf('TUS PRIMERAS PARTIDAS'))
    expect(html).toContain('href="/deadlock/news">Todas las noticias')
    expect(html).toContain('href="/deadlock/patch-notes">Todos los parches')
    expect(published).toHaveBeenCalledWith('deadlock')
  })

  it('orders the guides from beginner fundamentals to the remaining alphabetical catalogue in cards and schema', async () => {
    const slugs = ['como-jugar-deadlock', 'elegir-heroe', 'fase-de-lineas', 'economia-almas', 'movimiento-aguante', 'avanzada', 'zeta']
    published.mockResolvedValue(slugs.toReversed().map(slug => article(slug, slug, slug === 'zeta' ? { hero: 'abrams' } : {})))
    const html = renderToStaticMarkup(await Section(props()))
    expect(cardPaths(html)).toEqual(slugs.map(slug => `/deadlock/guides/${slug}`))
    expect(schemaPaths(html)).toEqual(cardPaths(html))
  })

  it('preserves normalized query filtering, array query handling and noindex for search results', async () => {
    published.mockResolvedValue([
      article('zeta', 'Zeta práctica'), article('economia-almas', 'Economía práctica'),
      article('como-jugar-deadlock', 'Cómo empezar'), article('elegir-heroe', 'Elige un héroe'),
    ])
    const search = props('guides', ['PRACTICA', 'empezar'])
    const html = renderToStaticMarkup(await Section(search))
    expect(cardPaths(html)).toEqual(['/deadlock/guides/economia-almas', '/deadlock/guides/zeta'])
    expect(schemaPaths(html)).toEqual(cardPaths(html))
    expect(html).toContain('value="PRACTICA"')
    expect((await generateMetadata(search)).robots).toMatchObject({ index: false, follow: true })
    expect((await generateMetadata(props())).robots).toMatchObject({ index: true, follow: true })
    expect((await generateMetadata(props('guides', ''))).robots).toMatchObject({ index: false, follow: true })
  })

  it.each([['news', 'news'], ['patch-notes', 'patch_note']])('keeps the %s archive distinct and ordered by publication', async (section, kind) => {
    const older = article('old', 'Antigua', { kind, path: `/deadlock/${section}/old`, updatedAt: '2026-11-01' })
    const newer = article('new', 'Nueva', { kind, path: `/deadlock/${section}/new`, publishedAt: '2026-10-25' })
    published.mockResolvedValue([article('como-jugar-deadlock'), older, newer])
    const html = renderToStaticMarkup(await Section(props(section)))
    expect(cardPaths(html)).toEqual([newer.path, older.path])
    expect(schemaPaths(html)).toEqual(cardPaths(html))
  })
})
