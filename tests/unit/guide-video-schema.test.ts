import { Children, isValidElement, type ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import JsonLd from '@/components/content/JsonLd'

const state = vi.hoisted(() => ({ row: {
  id: 'video-fixture', slug: 'video-schema-fixture', title: 'Una guía con vídeo',
  body: 'Una explicación propia de la partida.', author: 'Replaid Lab', published: true,
  created_at: '2026-05-05T12:00:00Z', updated_at: '2026-10-20T12:00:00Z',
  video_id: '7DrtWksik9I', video_title: 'Original video', video_channel: 'Original creator' as string | null,
  video_language: 'en', video_published_at: '2025-06-23T07:00:10-07:00' as string | null,
} }))

vi.mock('@/lib/supabase/admin', () => ({ createAdminClient: () => ({ from: () => {
  const query = {
    select: () => query, eq: () => query, neq: () => query,
    limit: () => query, order: () => query,
    single: async () => ({ data: state.row, error: null }),
    returns: async () => ({ data: [] }),
    then: (resolve: (value: { data: never[] }) => unknown) => Promise.resolve({ data: [] as never[] }).then(resolve),
  }
  return query
} }) }))
vi.mock('@/lib/supabase/server', () => ({ createClient: async () => ({ auth: { getUser: async () => ({ data: { user: null } }) } }) }))
vi.mock('next/navigation', () => ({ notFound: () => { throw new Error('NOT_FOUND') }, permanentRedirect: () => { throw new Error('REDIRECT') } }))

import GuidePage from '@/app/guides/[slug]/page'

function schemas(node: ReactNode): Record<string, unknown>[] {
  if (!isValidElement<{ data?: Record<string, unknown>; children?: ReactNode }>(node)) return []
  if (node.type === JsonLd) return node.props.data ? [node.props.data] : []
  return Children.toArray(node.props.children).flatMap(child => schemas(child))
}

beforeEach(() => {
  state.row.video_published_at = '2025-06-23T07:00:10-07:00'
  state.row.video_channel = 'Original creator'
})

describe('guide video metadata keeps its own provenance', () => {
  it('uses the original video date and creator, with a player URL rather than a false media file URL', async () => {
    const result = schemas(await GuidePage({ params: Promise.resolve({ slug: state.row.slug }) }))
    const video = result.find(item => item['@type'] === 'VideoObject')
    expect(video).toMatchObject({ uploadDate: state.row.video_published_at, embedUrl: 'https://www.youtube-nocookie.com/embed/7DrtWksik9I', publisher: { name: 'Original creator' } })
    expect(video).not.toHaveProperty('contentUrl')
    expect(result.find(item => item['@type'] === 'BlogPosting')).toMatchObject({ datePublished: state.row.created_at, dateModified: state.row.updated_at })
  })

  it('does not invent an upload date from the article when the video date is unknown', async () => {
    state.row.video_published_at = null
    const result = schemas(await GuidePage({ params: Promise.resolve({ slug: state.row.slug }) }))
    expect(result.find(item => item['@type'] === 'VideoObject')).toBeUndefined()
    expect(result.find(item => item['@type'] === 'BlogPosting')).toBeDefined()
  })

  it('does not attribute an unknown video publisher to the article author', async () => {
    state.row.video_channel = null
    const result = schemas(await GuidePage({ params: Promise.resolve({ slug: state.row.slug }) }))
    expect(result.find(item => item['@type'] === 'VideoObject')).toMatchObject({ publisher: undefined })
    expect(result.find(item => item['@type'] === 'BlogPosting')).toMatchObject({ author: { name: 'Replaid Lab' } })
  })
})
