import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { isValidElement } from 'react'
import { editorialVersion, type EditorialArticle, type EditorialKind } from '@/lib/editorial-record'

const { published } = vi.hoisted(() => ({ published: vi.fn() }))
vi.mock('@/lib/editorial-store', () => ({ publishedEditorial: published }))
vi.mock('@/components/layout/PublicNav', () => ({ default: () => null }))
import GameEditorialArticle from '@/components/content/GameEditorialArticle'

const source = { title: 'Referencia privada de contraste 987', url: 'https://example.com/private-fact-check-987' }
const article = (game: EditorialArticle['game'], kind: EditorialKind): EditorialArticle => ({
  game, kind, slug: 'visibility-test', path: `${game === 'deadlock' ? '/deadlock' : ''}/guides/visibility-test`,
  title: 'Guía contrastada', description: 'Consejos para la partida',
  publishedAt: '2026-10-01', updatedAt: '2026-10-20', patch: 'Actualización',
  intro: 'Puedes abrir el juego desde Steam.',
  sections: [{ title: 'Primera partida', body: ['Juega con tu equipo.'] }],
  checklist: ['Revisa tus compras.'], sources: [source],
  related: [{ href: `${game === 'deadlock' ? '/deadlock' : ''}/guides/economia-almas`, label: 'Economía relacionada' }],
})

beforeEach(() => published.mockReset())

describe('public Deadlock source visibility', () => {
  const kinds: EditorialKind[] = ['hero', 'guide', 'news', 'patch_note', 'build', 'counter', 'map', 'team_comp']
  it.each(kinds.flatMap(kind => [false, true].map(preview => ({ kind, preview }))))('omits source data for $kind with preview=$preview while preserving editorial content', async ({ kind, preview }) => {
    const a = article('deadlock', kind)
    const original = structuredClone(a)
    const version = editorialVersion(a)
    published.mockResolvedValue([a, { path: a.related![0].href }])
    const tree = await GameEditorialArticle({ article: a, preview })
    const html = renderToStaticMarkup(tree)
    // Inspect server-component output props as well as the final HTML so sources
    // cannot leak through data handed to nested components in the RSC payload.
    const serializedProps = JSON.stringify(tree, (_key, value) => isValidElement(value) ? { props: value.props } : value)
    for (const output of [html, serializedProps]) {
      expect(output).not.toContain(source.url)
      expect(output).not.toContain(source.title)
      expect(output).not.toContain('citation')
      expect(output).not.toContain('Referencias')
    }
    expect(html).toContain(`data-editorial-version="${version}"`)
    expect(html).toContain('Juega con tu equipo.')
    expect(html).toContain('Puedes abrir el juego desde Steam.')
    expect(html).toContain(`href="${a.related![0].href}"`)
    expect(html).toContain('Economía relacionada')
    if (preview) expect(html).toContain('Vista previa de revisión')
    else expect(html).toContain(`https://www.replaidlab.com${a.path}`)
    expect(a).toEqual(original)
    expect(editorialVersion(a)).toBe(version)
  })

  it.each([false, true])('keeps Overwatch references with preview=%s', async preview => {
    const a = article('overwatch', 'guide')
    published.mockResolvedValue([a])
    const html = renderToStaticMarkup(await GameEditorialArticle({ article: a, preview }))
    expect(html).toContain('<summary>Referencias</summary>')
    expect(html).toContain(source.title)
    expect(html).toContain(`href="${source.url}"`)
    if (preview) expect(html).not.toContain('"citation"')
    else expect(html).toContain(`"citation":["${source.url}"]`)
    expect(a.sources).toEqual([source])
  })
})
