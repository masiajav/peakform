import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import type { EditorialArticle } from '@/lib/editorial-record'
import launch from '@/lib/deadlock-launch.json'

const { published } = vi.hoisted(() => ({ published: vi.fn() }))
vi.mock('@/lib/editorial-store', () => ({ publishedEditorial: published }))
vi.mock('@/components/layout/PublicNav', () => ({ default: () => null }))
import GameEditorialArticle from '@/components/content/GameEditorialArticle'

describe('published editorial discovery', () => {
  it.each([false, true])('keeps real Deadlock hubs and published articles, excluding drafts and filters with preview=%s', async preview => {
    const hubs = ['/deadlock', '/deadlock/heroes', '/deadlock/counters', '/deadlock/builds', '/deadlock/guides', '/deadlock/maps', '/deadlock/news', '/deadlock/patch-notes']
    const hidden = ['/deadlock/guides/draft', '/deadlock/guides/unknown', '/deadlock/unknown', '/deadlock/team-comps', '/deadlock/guides?q=almas', '/deadlock/heroes?hero=kelvin', '/deadlock/guides/economia-almas?preview=true']
    const article = { ...launch[0], related: [...hubs, '/deadlock/guides/economia-almas', ...hidden].map(href => ({ href, label: `Relacionado ${href}` })) } as EditorialArticle
    published.mockResolvedValue([{ path: article.path }, { path: '/deadlock/guides/economia-almas' }])
    const html = renderToStaticMarkup(await GameEditorialArticle({ article, preview }))
    for (const href of [...hubs, '/deadlock/guides/economia-almas']) expect(html).toContain(`href="${href}"`)
    for (const href of hidden) expect(html).not.toContain(`href="${href}"`)
    expect(html).not.toContain('"citation"')
    expect(html).not.toContain('<summary>Referencias</summary>')
  })

  it('withholds links while a hero set is being published and reveals the approved pages', async () => {
    const article = { ...launch[0], hero: 'kelvin', slug: 'kelvin', path: '/deadlock/heroes/kelvin' } as EditorialArticle
    published.mockResolvedValue([{ path: article.path }])
    const incomplete = renderToStaticMarkup(await GameEditorialArticle({ article }))
    expect(incomplete).not.toContain('href="/deadlock/counters/kelvin"')
    expect(incomplete).not.toContain('href="/deadlock/builds/kelvin"')
    expect(incomplete).not.toContain('aria-label="Guías relacionadas"')
    published.mockResolvedValue([{ path: article.path }, { path: '/deadlock/counters/kelvin' }, { path: '/deadlock/guides/economia-almas' }])
    const partial = renderToStaticMarkup(await GameEditorialArticle({ article }))
    expect(partial).toContain('href="/deadlock/counters/kelvin"')
    expect(partial).not.toContain('href="/deadlock/builds/kelvin"')
    expect(partial).toContain('href="/deadlock/guides/economia-almas"')
  })
  it('preserves existing Overwatch destinations outside the revision store', async () => {
    const article = { ...launch[0], game: 'overwatch', hero: 'ana', slug: 'ana', path: '/heroes/ana', related: [{ href: '/guides/ana', label: 'Guía de Ana' }] } as EditorialArticle
    const html = renderToStaticMarkup(await GameEditorialArticle({ article }))
    expect(html).toContain('href="/counters/ana"')
    expect(html).toContain('href="/team-comps/ana"')
    expect(html).not.toContain('href="/builds/ana"')
    expect(html).toContain('href="/guides/ana"')
    expect(html).toContain('<summary>Referencias</summary>')
  })
})
