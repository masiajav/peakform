import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import {
  ANNOUNCEMENT_REVIEW_COLUMNS, GUIDE_REVIEW_COLUMNS, editorialContentVersion,
  editorialReviewTags, hasCurrentEditorialReview, isCompleteEditorialReview,
  publicEditorialTags, retainedEditorialReviewTags,
} from '@/lib/editorial-review'
import { editorialInputIssues, prepareEditorialPublication } from '@/lib/editorial-publication'
import { announcementQualityDecision } from '@/lib/indexing-policy'
import { completeReviewChecks, reviewedPatchFixture } from '../fixtures/reviewed-patch'

const content = { title: 'Una revisión', body: 'Un texto específico.', tags: ['ranked', 'support'] }
const approved = { ...content, tags: editorialReviewTags(content, 'admin-fixture', '2026-10-02') }

describe('version-bound editorial review', () => {
  it('requires one valid approval record, not a manually typed legacy tag', () => {
    expect(hasCurrentEditorialReview(approved)).toBe(true)
    for (const tags of [[], ['editorial-review-complete'], ['__editorial_review_v1:invalid'], [...approved.tags, approved.tags.at(-1)!]]) {
      expect(hasCurrentEditorialReview({ ...content, tags })).toBe(false)
    }
  })

  it('invalidates approval for changes in visible content, metadata, media and related topics', () => {
    for (const field of ['body', 'title', 'slug', 'excerpt', 'author', 'seo_title', 'seo_description', 'hero', 'role', 'map', 'category', 'content_type', 'cover_image', 'sponsor_title', 'sponsor_url', 'video_url', 'video_summary', 'source_url', 'source_published_at']) {
      expect(hasCurrentEditorialReview({ ...approved, [field]: 'Cambio sin revisar' }), field).toBe(false)
    }
    expect(hasCurrentEditorialReview({ ...approved, tags: [...approved.tags, 'tema distinto'] })).toBe(false)
  })

  it('does not invalidate the same text for operational changes or line-ending normalization', () => {
    expect(hasCurrentEditorialReview({ ...approved, published: false, updated_at: '2026-10-03' } as typeof approved)).toBe(true)
    const base = { body: 'Primer párrafo.\nSegundo párrafo.', source_published_at: '2026-10-02' }
    expect(editorialContentVersion(base)).toBe(editorialContentVersion({ ...base, body: 'Primer párrafo.\r\nSegundo párrafo.', source_published_at: '2026-10-02T00:00:00.000Z' }))
    expect(editorialContentVersion(content)).toBe(editorialContentVersion({ ...content, tags: ['support', 'ranked', 'support'] }))
  })

  it('never retains caller-supplied or stale approval records', () => {
    expect(retainedEditorialReviewTags(null, approved)).toEqual(content.tags)
    expect(retainedEditorialReviewTags(approved, { ...approved, body: 'Otro texto' })).toEqual(content.tags)
    expect(hasCurrentEditorialReview({ ...approved, tags: retainedEditorialReviewTags(approved, { ...content }) })).toBe(true)
    expect(publicEditorialTags(['ranked', 'editorial-review-complete', '__editorial_review_v1:private', '__editorial_review_v2:private'])).toEqual(['ranked'])
  })

  it('requires four explicit boolean checks and valid review identity and date', () => {
    expect(isCompleteEditorialReview(completeReviewChecks)).toBe(true)
    for (const check of [undefined, null, true, {}, { ...completeReviewChecks, visual: 'true' }, { ...completeReviewChecks, accurate: false }]) {
      expect(isCompleteEditorialReview(check)).toBe(false)
    }
    expect(() => editorialReviewTags(content, '', '2026-10-02')).toThrow()
    expect(() => editorialReviewTags(content, 'admin', 'not a date')).toThrow()
  })

  it('uses the same complete content projection for list and sitemap decisions', () => {
    expect(ANNOUNCEMENT_REVIEW_COLUMNS).toBe('*')
    for (const field of ['tags', 'title', 'body', 'excerpt', 'author', 'hero', 'role', 'map', 'cover_image', 'content_type', 'seo_title', 'seo_description', 'sponsor_body', 'created_at', 'updated_at']) expect(GUIDE_REVIEW_COLUMNS.split(', ')).toContain(field)
    expect(GUIDE_REVIEW_COLUMNS).toContain('video_summary')
    expect(GUIDE_REVIEW_COLUMNS).not.toContain('source_url')
    expect(editorialContentVersion(content)).toMatch(/^[a-f0-9]{64}$/)
    const rowFields = ['id', 'tags', 'published', 'created_at', 'updated_at']
    const emptyFields = [...GUIDE_REVIEW_COLUMNS.split(', ').filter(field => !rowFields.includes(field)), 'source_url', 'source_published_at'].map(field => [field, ''])
    expect(editorialContentVersion({})).toBe(createHash('sha256').update(JSON.stringify([emptyFields, []])).digest('hex'))
  })

  it('reviews older news rows while still invalidating approval when source metadata is added', () => {
    const oldNews = { title: 'Noticia revisada', body: 'Contenido propio.', content_type: 'news', tags: [] }
    const reviewed = { ...oldNews, tags: editorialReviewTags(oldNews, 'admin', '2026-10-06') }
    expect(hasCurrentEditorialReview(reviewed)).toBe(true)
    expect(hasCurrentEditorialReview({ ...reviewed, source_url: null, source_published_at: null })).toBe(true)
    expect(hasCurrentEditorialReview({ ...reviewed, source_url: 'https://overwatch.blizzard.com/en-us/news/123/' })).toBe(false)
  })
})

describe('publication controls', () => {
  it('keeps a published changed article accessible but removes indexing and ads', () => {
    const updated = { ...reviewedPatchFixture, title: 'Título corregido' }
    const result = prepareEditorialPublication('announcement', reviewedPatchFixture, updated, undefined, 'admin', false)
    expect(result.issues).toEqual([])
    const decision = announcementQualityDecision({ ...updated, tags: result.tags })
    expect(updated.published).toBe(true)
    expect(decision.status).toBe('noindex_no_ads')
  })

  it('does not let explicit attestation bypass technical content checks', () => {
    const updated = { ...reviewedPatchFixture, body: 'Pendiente de completar.' }
    const result = prepareEditorialPublication('announcement', reviewedPatchFixture, updated, completeReviewChecks, 'admin', true)
    expect(result.issues.length).toBeGreaterThan(0)
    expect(hasCurrentEditorialReview({ ...updated, tags: result.tags })).toBe(false)
  })

  it('validates input types before string normalization', () => {
    for (const input of [null, [], { title: 2 }, { published: 'true' }, { tags: [42] }]) expect(editorialInputIssues(input).length).toBeGreaterThan(0)
    expect(editorialInputIssues({ title: 'Título', tags: ['ranked'], author: null, published: false, editorial_review: completeReviewChecks })).toEqual([])
  })
})
