import { beforeEach, describe, expect, it, vi } from 'vitest'
import { completeReviewChecks, reviewedPatchFixture } from '../fixtures/reviewed-patch'
import { hasCurrentEditorialReview } from '@/lib/editorial-review'

const state = vi.hoisted(() => ({
  role: 'admin',
  authenticated: true,
  current: null as Record<string, unknown> | null,
  readError: null as { code: string } | null,
  writeError: null as { code: string; message: string } | null,
  payload: null as Record<string, unknown> | null,
  writes: 0,
}))

vi.mock('@/lib/supabase/server', () => ({
  createClient: () => {
    const profileQuery = {
      select: () => profileQuery,
      eq: () => profileQuery,
      single: async () => ({ data: { role: state.role } }),
    }
    return {
      auth: { getUser: async () => ({ data: { user: state.authenticated ? { id: 'admin-fixture' } : null } }) },
      from: () => profileQuery,
    }
  },
}))

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: () => {
    const readQuery = {
      eq: () => readQuery,
      single: async () => ({ data: state.current, error: state.readError }),
    }
    const write = (payload: Record<string, unknown>) => {
      state.writes += 1
      state.payload = payload
      const query = {
        eq: () => query,
        select: () => query,
        single: async () => ({ data: { ...state.current, ...payload }, error: state.writeError }),
      }
      return query
    }
    return { from: () => ({ select: () => readQuery, update: write, insert: write }) }
  },
}))

import { POST } from '@/app/api/admin/announcements/route'
import { PATCH } from '@/app/api/admin/announcements/[id]/route'

function request(body: Record<string, unknown>, method = 'PATCH') {
  return new Request('http://localhost/api/admin/announcements/fixture', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

const params = { params: Promise.resolve({ id: 'fixture' }) }

beforeEach(() => {
  Object.assign(state, { role: 'admin', authenticated: true, current: { ...reviewedPatchFixture }, readError: null, writeError: null, payload: null, writes: 0 })
})

describe('admin patch note publication', () => {
  it('rejects publishing an incomplete new patch note', async () => {
    const response = await POST(request({ title: 'Parche', body: 'Cambios pendientes', content_type: 'patch_note', published: true }, 'POST'))
    expect(response.status).toBe(422)
    expect((await response.json()).issues.length).toBeGreaterThan(0)
    expect(state.writes).toBe(0)
  })

  it('saves an incomplete patch note as a draft', async () => {
    const response = await POST(request({ title: 'Parche', body: 'Cambios pendientes', content_type: 'patch_note' }, 'POST'))
    expect(response.status).toBe(201)
    expect(state.payload?.published).toBe(false)
  })

  it('does not require optional source columns to create ordinary news', async () => {
    const response = await POST(request({ title: 'Noticia en borrador', body: 'Texto pendiente de revisar', source_url: '', source_published_at: '', published: false }, 'POST'))
    expect(response.status).toBe(201)
    expect(state.payload).not.toHaveProperty('source_url')
    expect(state.payload).not.toHaveProperty('source_published_at')
  })

  it('omits empty source fields when editing a row from an older schema', async () => {
    state.current = { title: 'Noticia', body: 'Borrador', content_type: 'news', published: false, tags: [] }
    expect((await PATCH(request({ title: 'Noticia corregida', source_url: '', source_published_at: '' }), params)).status).toBe(200)
    expect(state.payload).not.toHaveProperty('source_url')
    expect(state.payload).not.toHaveProperty('source_published_at')
  })

  it('still clears source fields on a migrated database without silently dropping supplied data', async () => {
    state.current = { ...reviewedPatchFixture, published: false }
    expect((await PATCH(request({ source_url: '', source_published_at: '' }), params)).status).toBe(200)
    expect(state.payload).toMatchObject({ source_url: null, source_published_at: null })
    expect((await POST(request({ title: 'Borrador', body: 'Texto', source_url: reviewedPatchFixture.source_url, source_published_at: reviewedPatchFixture.source_published_at }, 'POST'))).status).toBe(201)
    expect(state.payload).toMatchObject({ source_url: reviewedPatchFixture.source_url, source_published_at: reviewedPatchFixture.source_published_at })
  })

  it('accepts a complete new note and retains its official source fields', async () => {
    const response = await POST(request({ ...reviewedPatchFixture, editorial_review: completeReviewChecks }, 'POST'))
    expect(response.status).toBe(201)
    expect(state.payload?.source_url).toBe(reviewedPatchFixture.source_url)
    expect(state.payload?.source_published_at).toBe(reviewedPatchFixture.source_published_at)
    expect(hasCurrentEditorialReview(state.payload!)).toBe(true)
  })

  it('validates edits to an already published note without a published field', async () => {
    const response = await PATCH(request({ body: 'Solo un cambio' }), params)
    expect(response.status).toBe(422)
    expect(state.writes).toBe(0)
  })

  it('blocks an invalid source or date on a published note', async () => {
    for (const patch of [{ source_url: 'https://example.com/' }, { source_published_at: 'unknown' }]) {
      const response = await PATCH(request(patch), params)
      expect(response.status).toBe(422)
    }
    expect(state.writes).toBe(0)
  })

  it('accepts a valid edit and preserves publication state', async () => {
    const response = await PATCH(request({ title: 'Un título actualizado' }), params)
    expect(response.status).toBe(200)
    expect((await response.json()).published).toBe(true)
    expect(state.writes).toBe(1)
    expect(hasCurrentEditorialReview({ ...state.current, ...state.payload })).toBe(false)
  })

  it('allows editing a draft without publishing it', async () => {
    state.current = { ...reviewedPatchFixture, published: false }
    const response = await PATCH(request({ body: 'Borrador pendiente' }), params)
    expect(response.status).toBe(200)
    expect((await response.json()).published).toBe(false)
  })

  it('allows hiding an incomplete published note', async () => {
    state.current = { ...reviewedPatchFixture, body: 'Entrada incompleta' }
    expect((await PATCH(request({ published: false }), params)).status).toBe(200)
  })

  it('does not bypass review by converting a published patch to news', async () => {
    expect((await PATCH(request({ content_type: 'news' }), params)).status).toBe(422)
    expect(state.writes).toBe(0)
  })

  it('rejects non-boolean publication state', async () => {
    expect((await PATCH(request({ published: 'false' }), params)).status).toBe(400)
    expect((await POST(request({ ...reviewedPatchFixture, published: 'true' }, 'POST'))).status).toBe(400)
    expect(state.writes).toBe(0)
  })

  it('keeps admin authorization required', async () => {
    state.role = 'user'
    expect((await PATCH(request({ title: 'Prueba' }), params)).status).toBe(403)
    state.authenticated = false
    expect((await POST(request(reviewedPatchFixture, 'POST'))).status).toBe(403)
    expect(state.writes).toBe(0)
  })

  it('does not write when the existing entry cannot be read', async () => {
    state.current = null
    expect((await PATCH(request({ title: 'Prueba' }), params)).status).toBe(404)
    state.readError = { code: 'DATABASE_ERROR' }
    expect((await PATCH(request({ title: 'Prueba' }), params)).status).toBe(500)
    expect(state.writes).toBe(0)
  })

  it('preserves the duplicate slug response', async () => {
    state.writeError = { code: '23505', message: 'duplicate slug' }
    expect((await POST(request({ ...reviewedPatchFixture, editorial_review: completeReviewChecks }, 'POST'))).status).toBe(409)
    expect((await PATCH(request({ slug: reviewedPatchFixture.slug }), params)).status).toBe(409)
  })

  it('does not accept an approval tag supplied by the caller', async () => {
    expect((await POST(request(reviewedPatchFixture, 'POST'))).status).toBe(422)
    expect(state.writes).toBe(0)
  })

  it('approves a changed version only after all four explicit checks', async () => {
    const response = await PATCH(request({ title: 'Nueva versión revisada', editorial_review: completeReviewChecks }), params)
    expect(response.status).toBe(200)
    expect(hasCurrentEditorialReview({ ...state.current, ...state.payload })).toBe(true)
  })

  it('does not publish an unapproved draft by changing only its publication state', async () => {
    state.current = { ...reviewedPatchFixture, published: false, tags: [] }
    expect((await PATCH(request({ published: true }), params)).status).toBe(422)
    expect(state.writes).toBe(0)
  })

  it('retains approval when hiding or republishing the same reviewed version', async () => {
    state.current = { ...reviewedPatchFixture, published: false }
    expect((await PATCH(request({ published: true }), params)).status).toBe(200)
    expect(hasCurrentEditorialReview({ ...state.current, ...state.payload })).toBe(true)
  })

  it('requires a reviewed version for ordinary news too', async () => {
    const news = { ...reviewedPatchFixture, content_type: 'news', source_url: null, source_published_at: null, tags: [] }
    expect((await POST(request(news, 'POST'))).status).toBe(422)
    expect((await POST(request({ ...news, editorial_review: completeReviewChecks }, 'POST'))).status).toBe(201)
    expect(hasCurrentEditorialReview(state.payload!)).toBe(true)
  })

  it('does not let news attestation bypass missing metadata or internal instructions', async () => {
    const news = { ...reviewedPatchFixture, content_type: 'news', editorial_review: completeReviewChecks }
    for (const patch of [{ author: null }, { seo_title: null }, { body: `${news.body}\n\n## TITLE SEO\n\nNotas internas` }]) {
      expect((await POST(request({ ...news, ...patch }, 'POST'))).status).toBe(422)
    }
    expect(state.writes).toBe(0)
  })
})
