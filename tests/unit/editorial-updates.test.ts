import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import type { EditorialArticle } from '@/lib/editorial-record'

const { published } = vi.hoisted(() => ({ published: vi.fn() }))
vi.mock('@/lib/editorial-store', () => ({ publishedEditorial: published }))
import EditorialUpdates from '@/components/content/EditorialUpdates'

const item = (kind: EditorialArticle['kind'], slug: string, publishedAt: string, updatedAt: string): EditorialArticle => ({
  game: 'overwatch', kind, slug, path: `/${kind === 'patch_note' ? 'patch-notes' : kind === 'news' ? 'news' : 'guides'}/${slug}`,
  title: slug, description: `Descripción de ${slug}`, publishedAt, updatedAt,
  patch: 'Season 5', intro: 'Introducción', sections: [], checklist: [], sources: [],
})
const kinds = ['guide', 'news', 'patch_note'] as const
beforeEach(() => published.mockReset())

describe('editorial update presentation', () => {
  it('landing shows only actual news and patches, ordered by publication rather than guide revisions', async () => {
    published.mockResolvedValue([
      item('guide', 'dive-guide', '2026-10-01', '2026-10-27'),
      item('news', 'older-news', '2026-10-19', '2026-10-27'),
      item('patch_note', 'new-patch', '2026-10-20', '2026-10-24'),
    ])
    const html = renderToStaticMarkup(await EditorialUpdates({ game: 'overwatch', kinds: [...kinds], variant: 'landing' }))
    expect(html).toContain('Últimas noticias de Overwatch')
    expect(html).toContain('href="/news"')
    expect(html).not.toContain('dive-guide')
    expect(html).not.toContain('Últimas lecturas')
    expect(html.indexOf('new-patch')).toBeLessThan(html.indexOf('older-news'))
    expect(html).toContain('dateTime="2026-10-20"')
    expect(html).not.toContain('dateTime="2026-10-27"')
  })

  it('inline guide discovery keeps its revision dates and hero/search filters', async () => {
    published.mockResolvedValue([
      { ...item('guide', 'ana-dive', '2026-10-01', '2026-10-27'), hero: 'ana' },
      { ...item('guide', 'genji-dive', '2026-10-01', '2026-10-26'), hero: 'genji' },
    ])
    const html = renderToStaticMarkup(await EditorialUpdates({ game: 'overwatch', kinds: ['guide'], q: 'dive', hero: 'ana' }))
    expect(html).toContain('ana-dive')
    expect(html).not.toContain('genji-dive')
    expect(html).toContain('dateTime="2026-10-27"')
    expect(html).toContain('Al día en Overwatch')
  })

  it('does not replace an empty news feed with unrelated revised guides', async () => {
    published.mockResolvedValue([item('guide', 'dive-guide', '2026-10-01', '2026-10-27')])
    expect(await EditorialUpdates({ game: 'overwatch', kinds: [...kinds], variant: 'landing' })).toBeNull()
  })
})
