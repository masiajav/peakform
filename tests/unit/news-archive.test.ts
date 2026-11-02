import { beforeEach, describe, expect, it, vi } from 'vitest'
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import type { EditorialArticle } from '@/lib/editorial-record'

const state = vi.hoisted(() => ({ published: vi.fn(), announcements: [] as Record<string, unknown>[] }))
vi.mock('@/lib/editorial-store', () => ({ publishedEditorial: state.published }))
vi.mock('@/components/layout/PublicNav', () => ({ default: () => null }))
vi.mock('@/components/layout/AppNav', () => ({ default: () => null }))
vi.mock('@/lib/supabase/server', () => ({ createClient: async () => ({ auth: { getUser: async () => ({ data: { user: null } }) } }) }))
vi.mock('@/lib/supabase/admin', () => ({ createAdminClient: () => ({ from: () => {
  const query = {
    select: () => query, eq: () => query, neq: () => query,
    order: async () => ({ data: state.announcements }),
  }
  return query
} }) }))
vi.mock('@/lib/indexing-policy', () => ({ isAnnouncementSitemapEligible: (item: { eligible?: boolean }) => item.eligible !== false }))

import NewsPage, { metadata } from '@/app/news/page'
import EditorialUpdates from '@/components/content/EditorialUpdates'

// Resolve the server component just as the RSC renderer would before static rendering.
async function resolveArchive(node: ReactNode): Promise<ReactNode> {
  if (Array.isArray(node)) return Promise.all(node.map(resolveArchive))
  if (!isValidElement(node)) return node
  if (node.type === EditorialUpdates) return EditorialUpdates(node.props as Parameters<typeof EditorialUpdates>[0])
  const element = node as ReactElement<{ children?: ReactNode }>
  if (element.props.children === undefined) return element
  return cloneElement(element, {}, await resolveArchive(element.props.children))
}

beforeEach(() => { state.published.mockReset(); state.announcements = [] })

describe('news archive page', () => {
  it('labels past seasonal announcements as archive without promoting expired offers', async () => {
    state.published.mockResolvedValue([])
    const html = renderToStaticMarkup(await resolveArchive(await NewsPage()))
    expect(html).toContain('Archivo de Overwatch Season 4')
    expect(html).toContain('Shadow Monarch hasta el 19 de octubre de 2026')
    expect(html).toContain('El plazo del vale mítico de BlizzCon terminó el 5 de octubre')
    expect(html).not.toContain('Halloween está activo')
    expect(html).not.toContain('Si vuelves a jugar estos días, empieza por el resumen de')
  })

  it('keeps each path once across editorial, fixed and legacy cards, preferring editorial revisions', async () => {
    state.published.mockResolvedValue([
      { game: 'overwatch', kind: 'news', path: '/news/shared', title: 'Revisión editorial vigente', description: 'Contexto nuevo', publishedAt: '2026-10-01', updatedAt: '2026-11-01' },
      { game: 'overwatch', kind: 'news', path: '/blizzcon-2026-overwatch-horarios-espana', title: 'BlizzCon revisada', description: 'Horarios revisados', publishedAt: '2026-09-02', updatedAt: '2026-11-01' },
      { game: 'overwatch', kind: 'patch_note', path: '/patch-notes/editorial-patch', title: 'Parche editorial', description: 'Balance', publishedAt: '2026-10-20', updatedAt: '2026-10-20' },
    ] satisfies Partial<EditorialArticle>[])
    const legacy = (id: string, slug: string, title: string, eligible = true) => ({ id, slug, title, eligible, body: 'Resumen', created_at: '2026-10-01', published: true, content_type: 'news', game: 'overwatch' })
    state.announcements = [
      legacy('overlap', 'shared', 'Tarjeta legacy anterior'),
      legacy('unique', 'unique', 'Noticia legacy única'),
      legacy('duplicate', 'unique', 'Copia duplicada'),
      legacy('blocked', 'blocked', 'No revisada', false),
    ]
    const html = renderToStaticMarkup(await resolveArchive(await NewsPage()))
    for (const path of ['/news/shared', '/news/unique', '/blizzcon-2026-overwatch-horarios-espana', '/patch-notes/editorial-patch']) {
      expect(html.split(`href="${path}"`).length - 1).toBe(1)
    }
    expect(html).toContain('Revisión editorial vigente')
    expect(html).toContain('BlizzCon revisada')
    expect(html).not.toContain('Tarjeta legacy anterior')
    expect(html).not.toContain('Copia duplicada')
    expect(html).not.toContain('href="/news/blocked"')
    expect(html.indexOf('<h1')).toBeLessThan(html.indexOf('Archivo de noticias y parches'))
    expect(metadata.description).toContain('notas de parche')
    expect(metadata.alternates?.canonical).toBe('https://www.replaidlab.com/news')
  })
})
