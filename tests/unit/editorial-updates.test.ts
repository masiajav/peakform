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
  it('archive exposes every news item and patch by publication date, including old articles revised today', async () => {
    const news = Array.from({ length: 12 }, (_, index) => item('news', `news-${index}`, `2026-10-${String(index + 1).padStart(2, '0')}`, '2026-10-15'))
    published.mockResolvedValue([
      ...news,
      item('news', 'old-revised-today', '2026-01-01', '2026-11-01'),
      item('patch_note', 'latest-patch', '2026-10-20', '2026-10-24'),
      item('guide', 'revised-guide', '2026-10-21', '2026-11-01'),
    ])
    const html = renderToStaticMarkup(await EditorialUpdates({ game: 'overwatch', kinds: [...kinds], variant: 'archive' }))
    expect(html).toContain('Archivo de noticias y parches de Overwatch')
    expect(html).toContain('Por fecha de publicación')
    for (const article of news) expect(html).toContain(`href="${article.path}"`)
    expect(html).toContain('href="/patch-notes/latest-patch"')
    expect(html).not.toContain('revised-guide')
    expect(html.indexOf('latest-patch')).toBeLessThan(html.indexOf('news-11'))
    expect(html.indexOf('news-0')).toBeLessThan(html.indexOf('old-revised-today'))
    expect(html).toContain('dateTime="2026-01-01" title="Fecha de publicación"')
    expect(html).not.toContain('dateTime="2026-11-01"')
    expect((html.match(/class="[^\"]*card[^\"]*"/g) ?? [])).toHaveLength(14)
  })

  it('retains the inline default of nine and an explicit landing limit of three', async () => {
    published.mockResolvedValue(Array.from({ length: 12 }, (_, index) => item('news', `limited-${index}`, '2026-10-01', '2026-10-20')))
    const inline = renderToStaticMarkup(await EditorialUpdates({ game: 'overwatch', kinds: ['news'] }))
    const landing = renderToStaticMarkup(await EditorialUpdates({ game: 'overwatch', kinds: ['news'], variant: 'landing', limit: 3 }))
    expect((inline.match(/href="\/news\/limited-/g) ?? [])).toHaveLength(9)
    expect((landing.match(/href="\/news\/limited-/g) ?? [])).toHaveLength(3)
  })

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
