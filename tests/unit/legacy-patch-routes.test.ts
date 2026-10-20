import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'

const state = vi.hoisted(() => ({
  orders: [] as string[], filters: [] as string[], missing: false, backendError: false,
  article: {
    id: 'april-legacy', slug: 'notas-parche-overwatch-2026-04-01',
    title: 'Notas del parche de Overwatch - 1 de abril de 2026',
    body: 'Blizzard publico una nueva actualizacion de Overwatch el 1 de abril de 2026.\n\nEsta nota deja cambios y correcciones que merece la pena revisar antes de jugar, sobre todo si estas entrando a ranked o ajustando composiciones con tu equipo.\n\nEn Replaid Lab la guardamos para tener a mano el contexto de cada parche sin copiar la nota completa. Si un heroe, mapa o sistema que usas a menudo aparece en la lista, conviene leer el detalle antes de sacar conclusiones en partida.\n\nPuedes leer todos los cambios en la web oficial de Blizzard: [Notas del parche de Overwatch - 1 de abril de 2026](https://overwatch.blizzard.com/es-es/news/patch-notes/#patch-2026-04-01).',
    published: true, content_type: 'patch_note', created_at: '2026-04-01T12:00:00Z', updated_at: '2026-05-12T10:16:01Z', tags: [],
  },
}))

vi.mock('@/lib/supabase/admin', () => ({ createAdminClient: () => ({
  from(table: string) {
    expect(table).toBe('announcements')
    const query = {
      select(columns: string) { expect(columns).toBe('*'); return query },
      eq(field: string, value: unknown) { state.filters.push(`${field}=${value}`); return query },
      order(field: string) { state.orders.push(field); return query },
      async maybeSingle() { return { data: state.missing ? null : state.article, error: state.backendError ? { code: '503' } : null } },
      async single() { return query.maybeSingle() },
      then(resolve: (result: unknown) => unknown) {
        return Promise.resolve({
          data: state.backendError || state.orders.includes('source_published_at') ? null : [state.article],
          error: state.backendError ? { code: '503' } : state.orders.includes('source_published_at') ? { code: '42703' } : null,
        }).then(resolve)
      },
    }
    return query
  },
}) }))
vi.mock('next/cache', () => ({ unstable_noStore: vi.fn() }))
vi.mock('next/navigation', () => ({ notFound: () => { throw new Error('NOT_FOUND') } }))
vi.mock('@/components/layout/PublicNav', () => ({ default: () => null }))

import PatchPage, { generateMetadata } from '@/app/patch-notes/[slug]/page'
import PatchHub from '@/app/patch-notes/page'

beforeEach(() => { state.orders = []; state.filters = []; state.missing = false; state.backendError = false })
const props = () => ({ params: Promise.resolve({ slug: state.article.slug }) })

describe('published legacy patch routes', () => {
  it('replaces the incorrect ranked teaser with the actual Underwatch context', async () => {
    const page = await PatchPage(props())
    expect(page.props.article.body).toContain('Underwatch')
    expect(page.props.article.body).toContain('no eran cambios del competitivo')
    expect(page.props.article.created_at).toBe(state.article.created_at)
    expect(state.filters).toEqual(['slug=notas-parche-overwatch-2026-04-01', 'published=true', 'content_type=patch_note'])
  })
  it('keeps the same canonical and does not grant indexing permission', async () => {
    const metadata = await generateMetadata(props())
    expect(metadata.alternates?.canonical).toBe('https://www.replaidlab.com/patch-notes/notas-parche-overwatch-2026-04-01')
    expect(metadata.robots).toEqual({ index: false, follow: true })
    expect(metadata.description).toContain('Underwatch')
  })
  it('lists existing notes without ordering the legacy database by an absent source column', async () => {
    const html = renderToStaticMarkup(await PatchHub())
    expect(html).toContain('Underwatch')
    expect(html).toContain(`/patch-notes/${state.article.slug}`)
    expect(html).not.toContain('sincronización automática')
    expect(state.orders).toEqual(['created_at'])
  })
  it('does not describe a database outage as an empty hub or a nonexistent patch', async () => {
    state.backendError = true
    await expect(PatchHub()).rejects.toThrow('No se han podido cargar las notas del parche')
    await expect(PatchPage(props())).rejects.toThrow('No se ha podido cargar la nota del parche')
  })
  it('still returns 404 for a truly missing published record', async () => {
    state.missing = true
    await expect(PatchPage(props())).rejects.toThrow('NOT_FOUND')
    expect(await generateMetadata(props())).toEqual({})
  })
})
