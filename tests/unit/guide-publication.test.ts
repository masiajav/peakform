import { beforeEach, describe, expect, it, vi } from 'vitest'
import { reviewedGuideRevisions } from '@/lib/reviewed-guide-revisions'
import { editorialReviewTags, hasCurrentEditorialReview } from '@/lib/editorial-review'
import { completeReviewChecks } from '../fixtures/reviewed-patch'

const state = vi.hoisted(() => ({
  authenticated: true, role: 'admin', current: null as Record<string, unknown> | null,
  readError: null as { code: string } | null, writeError: null as { code: string; message: string } | null,
  payload: null as Record<string, unknown> | null, writes: 0,
}))

vi.mock('@/lib/supabase/server', () => ({ createClient: () => {
  const query = { select: () => query, eq: () => query, single: async () => ({ data: { role: state.role } }) }
  return { auth: { getUser: async () => ({ data: { user: state.authenticated ? { id: 'admin-fixture' } : null } }) }, from: () => query }
} }))

vi.mock('@/lib/supabase/admin', () => ({ createAdminClient: () => {
  const read = { eq: () => read, single: async () => ({ data: state.current, error: state.readError }) }
  const write = (payload: Record<string, unknown>) => {
    state.payload = payload
    state.writes += 1
    const query = { eq: () => query, select: () => query, single: async () => ({ data: { ...state.current, ...payload }, error: state.writeError }) }
    return query
  }
  return { from: () => ({ select: () => read, update: write, insert: write }) }
} }))

import { POST } from '@/app/api/admin/guides/route'
import { PATCH } from '@/app/api/admin/guides/[id]/route'

const revision = reviewedGuideRevisions['mauga-guia-video-overwatch']
const guide = {
  slug: 'fixture-guia-editorial', title: revision.title, body: revision.body,
  seo_title: revision.title, seo_description: revision.description, excerpt: revision.quickAnswer,
  author: 'Replaid Lab', content_type: 'guide', created_at: '2026-09-30', updated_at: '2026-10-02', published: true,
}
const approvedGuide = { ...guide, tags: editorialReviewTags(guide, 'admin-fixture', '2026-10-02') }
const params = { params: Promise.resolve({ id: 'fixture' }) }
function request(body: unknown, method = 'PATCH') {
  return new Request('http://localhost/api/admin/guides/fixture', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
}

beforeEach(() => Object.assign(state, { authenticated: true, role: 'admin', current: { ...approvedGuide }, readError: null, writeError: null, payload: null, writes: 0 }))

describe('admin guide approval', () => {
  it('keeps ordinary draft creation available without approval', async () => {
    expect((await POST(request({ title: 'Borrador', slug: 'borrador', body: 'Texto pendiente' }, 'POST'))).status).toBe(201)
    expect(state.payload?.published).toBe(false)
    expect(state.payload?.tags).toEqual([])
  })

  it('does not publish with a forged review tag and no explicit checks', async () => {
    expect((await POST(request(approvedGuide, 'POST'))).status).toBe(422)
    expect(state.writes).toBe(0)
  })

  it('creates and publishes a technically complete explicitly reviewed guide', async () => {
    expect((await POST(request({ ...approvedGuide, editorial_review: completeReviewChecks }, 'POST'))).status).toBe(201)
    expect(hasCurrentEditorialReview(state.payload!)).toBe(true)
  })

  it('invalidates approval after a partial edit without removing public content', async () => {
    const response = await PATCH(request({ body: `${guide.body}\n\nUna corrección pendiente de revisar.` }), params)
    expect(response.status).toBe(200)
    const updated = await response.json()
    expect(updated.published).toBe(true)
    expect(updated.title).toBe(guide.title)
    expect(hasCurrentEditorialReview(updated)).toBe(false)
  })

  it('preserves approval for an unchanged ordinary tag edit', async () => {
    expect((await PATCH(request({ tags: '' }), params)).status).toBe(200)
    expect(hasCurrentEditorialReview({ ...state.current, ...state.payload })).toBe(true)
  })

  it('reapproves the edited version with reviewer identity generated on the server', async () => {
    expect((await PATCH(request({ title: 'Un título nuevo', editorial_review: completeReviewChecks }), params)).status).toBe(200)
    expect(hasCurrentEditorialReview({ ...state.current, ...state.payload })).toBe(true)
    expect(JSON.stringify(state.payload?.tags)).toContain('admin-fixture')
  })

  it('does not grant approval to thin or unfinished content', async () => {
    expect((await PATCH(request({ body: 'Texto de ejemplo.', editorial_review: completeReviewChecks }), params)).status).toBe(422)
    expect(state.writes).toBe(0)
  })

  it('requires approval before making an unreviewed draft public', async () => {
    state.current = { ...guide, published: false, tags: [] }
    expect((await PATCH(request({ published: true }), params)).status).toBe(422)
    expect(state.writes).toBe(0)
  })

  it('allows hiding content while retaining the current valid review', async () => {
    expect((await PATCH(request({ published: false }), params)).status).toBe(200)
    expect(hasCurrentEditorialReview({ ...state.current, ...state.payload })).toBe(true)
  })

  it('does not write if the current version cannot be read', async () => {
    state.current = null
    expect((await PATCH(request({ title: 'Prueba' }), params)).status).toBe(404)
    state.readError = { code: 'DATABASE_ERROR' }
    expect((await PATCH(request({ title: 'Prueba' }), params)).status).toBe(500)
    expect(state.writes).toBe(0)
  })

  it('validates input types without throwing while normalizing content', async () => {
    for (const input of [null, { title: 10 }, { published: 'false' }, { tags: [null] }]) {
      expect((await PATCH(request(input), params)).status).toBe(400)
      expect((await POST(request(input, 'POST'))).status).toBe(400)
    }
    expect(state.writes).toBe(0)
  })

  it('retains authorization and duplicate-slug behavior', async () => {
    state.role = 'user'
    expect((await PATCH(request({ title: 'Prueba' }), params)).status).toBe(403)
    state.authenticated = false
    expect((await POST(request(guide, 'POST'))).status).toBe(403)
    expect(state.writes).toBe(0)
    state.authenticated = true
    state.role = 'admin'
    state.writeError = { code: '23505', message: 'duplicate' }
    expect((await PATCH(request({ slug: guide.slug }), params)).status).toBe(409)
  })
})
