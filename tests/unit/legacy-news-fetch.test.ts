import { beforeEach, describe, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({
  selected: [] as string[], filters: [] as string[], missing: false, backendError: false,
  article: { id: 'legacy-news', slug: 'legacy-news', title: 'Comunicado de comunidad', body: 'Un comunicado de comunidad.', published: true, content_type: 'news', created_at: '2026-05-01T12:00:00Z', updated_at: '2026-05-01T12:00:00Z', tags: [] },
}))

vi.mock('@/lib/supabase/admin', () => ({ createAdminClient: () => ({
  from(table: string) {
    expect(table).toBe('announcements')
    const query = {
      select(columns: string) { state.selected.push(columns); return query },
      eq(field: string, value: unknown) { state.filters.push(`${field}=${value}`); return query },
      neq(field: string, value: unknown) { state.filters.push(`${field}!=${value}`); return query },
      async maybeSingle() {
        if (state.backendError || state.selected.at(-1)?.includes('source_name')) return { data: null, error: { code: '42703', message: 'A source column is unavailable' } }
        return { data: state.missing ? null : state.article, error: null }
      },
    }
    return query
  },
}) }))
vi.mock('next/navigation', () => ({ notFound: () => { throw new Error('NOT_FOUND') } }))

import NewsPage, { generateMetadata } from '@/app/news/[slug]/page'

beforeEach(() => { state.selected = []; state.filters = []; state.missing = false; state.backendError = false })
const props = () => ({ params: Promise.resolve({ slug: 'legacy-news' }) })

describe('news loading against the existing legacy announcement schema', () => {
  it('keeps an unreviewed real news row readable without requiring optional source columns', async () => {
    const page = await NewsPage(props())
    expect(page.props.article).toEqual(state.article)
    expect(state.selected).toEqual(['*'])
    expect(state.filters).toEqual(['slug=legacy-news', 'published=true', 'content_type!=patch_note'])
  })
  it('keeps canonical metadata and noindex without granting editorial approval', async () => {
    const metadata = await generateMetadata(props())
    expect(metadata.alternates?.canonical).toBe('https://www.replaidlab.com/news/legacy-news')
    expect(metadata.robots).toEqual({ index: false, follow: true })
  })
  it('returns a real missing article as not found, not as a blank article', async () => {
    state.missing = true
    await expect(NewsPage(props())).rejects.toThrow('NOT_FOUND')
    expect(await generateMetadata(props())).toEqual({})
  })
  it('does not mislabel a backend failure as a missing public URL', async () => {
    state.backendError = true
    await expect(NewsPage(props())).rejects.toThrow('No se ha podido cargar la noticia')
  })
})
