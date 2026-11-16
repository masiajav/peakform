import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { filterGuideSearchCards, guideSearchHref, heroGuideSearchCards } from '@/lib/guide-discovery'
import { HERO_PILLARS } from '@/lib/hero-pillars'
import type { EditorialArticle } from '@/lib/editorial-record'

vi.mock('@/lib/editorial-store', () => ({ publishedEditorial: async () => [] }))
vi.mock('@/components/layout/PublicNav', () => ({ default: () => null }))
vi.mock('@/components/content/EditorialUpdates', () => ({ default: () => null }))
vi.mock('@/components/content/AdSlot', () => ({ default: () => null }))
vi.mock('@/components/content/GuideFilters', () => ({ default: () => null }))
vi.mock('@/lib/supabase/server', () => ({ createClient: () => ({ auth: { getUser: async () => ({ data: { user: null } }) } }) }))
vi.mock('@/lib/supabase/admin', () => ({ createAdminClient: () => {
  const query = { select: () => query, eq: () => query, order: () => query,
    returns: async () => ({ data: [] }), then: (resolve: (value: unknown) => void) => resolve({ data: [] }) }
  return { from: () => query }
} }))
import GuidesPage, { generateMetadata } from '@/app/guides/page'

const paths = (filters: Parameters<typeof filterGuideSearchCards>[1]) =>
  filterGuideSearchCards(heroGuideSearchCards(), filters).map(guideSearchHref)

describe('canonical hero guide discovery', () => {
  it.each([['Doctrine', 'doctrine'], ['D.Mon', 'dmon'], ['D.Va', 'dva'], ['Kiriko', 'kiriko']])('finds %s at its existing canonical hero page', (q, hero) => {
    expect(paths({ q })).toEqual([`/heroes/${hero}`])
    expect(paths({ hero })).toEqual([`/heroes/${hero}`])
  })

  it('uses every available pillar with valid dates and body, without duplicate destinations', () => {
    const cards = heroGuideSearchCards()
    expect(cards.map(card => card.hero).sort()).toEqual(Object.keys(HERO_PILLARS).sort())
    expect(new Set(cards.map(guideSearchHref)).size).toBe(cards.length)
    for (const card of cards) {
      expect(Number.isFinite(Date.parse(card.created_at))).toBe(true)
      expect(card.body.length).toBeGreaterThan(500)
    }
    expect(filterGuideSearchCards([...cards, ...cards], {})).toHaveLength(cards.length)
  })

  it.each([
    { q: 'Doctrine', role: 'tank' }, { hero: 'dmon', role: 'support' },
    { q: 'Doctrine', hero: 'ana' }, { hero: 'doctrine', category: 'Mapas' },
    { q: 'D.Mon', map: 'kings-row' }, { q: 'zzzinexistente' },
  ])('returns no results for exclusive or unknown filters: %j', filters => {
    expect(paths(filters)).toEqual([])
  })

  it('combines matching role, hero, category and query', () => {
    expect(paths({ q: 'Doctrine', hero: 'doctrine', role: 'support', category: 'Héroes' })).toEqual(['/heroes/doctrine'])
  })

  it('uses published hero revisions once, including newly available hero pages, and excludes other kinds and games', () => {
    const revision = (slug: string, overrides: Partial<EditorialArticle> = {}): EditorialArticle => ({
      game: 'overwatch', kind: 'hero', slug, path: `/heroes/${slug}`, title: `Ficha ${slug}`,
      description: 'Descripción publicada', publishedAt: '2026-10-01', updatedAt: '2026-10-20',
      patch: '', intro: 'Introducción', sections: [], checklist: [], sources: [], ...overrides,
    })
    const cards = heroGuideSearchCards([revision('doctrine'), revision('ashe'),
      revision('abrams', { game: 'deadlock' }), revision('mapa', { kind: 'map' }),
      revision('borrador', { path: '/guides/borrador' })])
    expect(cards.filter(card => card.href === '/heroes/doctrine')).toHaveLength(1)
    expect(cards.find(card => card.hero === 'doctrine')?.title).toBe('Ficha doctrine')
    expect(filterGuideSearchCards(cards, { hero: 'ashe', role: 'dps' }).map(guideSearchHref)).toEqual(['/heroes/ashe'])
    expect(cards.some(card => ['abrams', 'mapa', 'borrador'].includes(card.hero!))).toBe(false)
  })

  it.each(['Doctrine', 'D.Mon'])('renders canonical results and consistent schema for %s while keeping filters noindex', async q => {
    const props = { searchParams: Promise.resolve({ q }) }
    const html = renderToStaticMarkup(await GuidesPage(props))
    const hero = q === 'Doctrine' ? 'doctrine' : 'dmon'
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)![1])
    expect(schema.mainEntity.itemListElement.map((item: { url: string }) => new URL(item.url).pathname)).toEqual([`/heroes/${hero}`])
    expect(html).toContain(`href="/heroes/${hero}"`)
    expect(html).not.toContain(`/guides/hero:`)
    expect(html).not.toContain('NO HEMOS ENCONTRADO GUÍAS')
    expect((await generateMetadata(props)).robots).toEqual({ index: false, follow: true })
  })

  it('keeps the empty state and empty schema for an unknown query', async () => {
    const html = renderToStaticMarkup(await GuidesPage({ searchParams: Promise.resolve({ q: 'zzzinexistente' }) }))
    expect(html).toContain('NO HEMOS ENCONTRADO GUÍAS')
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)![1])
    expect(schema.mainEntity.itemListElement).toEqual([])
  })
})
