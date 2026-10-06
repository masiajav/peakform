import { sha256 } from '@noble/hashes/sha2.js'

const REVIEW_PREFIX = '__editorial_review_v1:'
const REVIEW_FIELDS = [
  'slug', 'title', 'body', 'excerpt', 'seo_title', 'seo_description', 'author',
  'category', 'content_type', 'hero', 'role', 'map', 'cover_image',
  'sponsor_label', 'sponsor_title', 'sponsor_body', 'sponsor_url', 'sponsor_cta',
  'video_url', 'video_platform', 'video_id', 'video_title', 'video_channel',
  'video_language', 'video_published_at', 'video_summary',
  'source_url', 'source_published_at',
] as const

export type EditorialReviewContent = Partial<Record<typeof REVIEW_FIELDS[number], string | null>> & {
  tags?: string[] | null
}

const ROW_FIELDS = ['id', 'tags', 'published', 'created_at', 'updated_at']
export const GUIDE_REVIEW_COLUMNS = [...REVIEW_FIELDS.filter(field => !field.startsWith('source_')), ...ROW_FIELDS].join(', ')
// Source columns are absent on older databases. Select the actual row so news
// still loads and version checks include source fields whenever they exist.
export const ANNOUNCEMENT_REVIEW_COLUMNS = '*'

export const EDITORIAL_REVIEW_CHECKS = [
  { key: 'specific', label: 'El texto resuelve una pregunta concreta, con ejemplos propios y lenguaje natural.' },
  { key: 'accurate', label: 'He comprobado los datos, la autoría y las fechas; no quedan afirmaciones pendientes.' },
  { key: 'links', label: 'He abierto los enlaces y comprobado que las imágenes y los vídeos cargan.' },
  { key: 'visual', label: 'He revisado la página en móvil y escritorio, incluidos los datos estructurados.' },
] as const

export type EditorialReviewChecks = Record<typeof EDITORIAL_REVIEW_CHECKS[number]['key'], boolean>

export function isCompleteEditorialReview(value: unknown): value is EditorialReviewChecks {
  return typeof value === 'object' && value !== null
    && EDITORIAL_REVIEW_CHECKS.every(check => (value as Record<string, unknown>)[check.key] === true)
}

export function publicEditorialTags(tags?: string[] | null) {
  return (tags || []).filter(tag => !tag.startsWith('__editorial_review_') && tag !== 'editorial-review-complete')
}

// Approval covers the rendered content, not the database's automatic timestamps
// or publication toggle. A new timestamp alone must not invalidate a review.
export function editorialContentVersion(content: EditorialReviewContent) {
  const fields = REVIEW_FIELDS.map(field => {
    const value = content[field]?.replace(/\r\n/g, '\n').trim() || ''
    const timestamp = field.endsWith('_published_at') && value ? Date.parse(value) : NaN
    return [field, Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : value]
  })
  const encoded = new TextEncoder().encode(JSON.stringify([fields, Array.from(new Set(publicEditorialTags(content.tags))).sort()]))
  return Array.from(sha256(encoded), byte => byte.toString(16).padStart(2, '0')).join('')
}

export function editorialReviewTags(content: EditorialReviewContent, reviewerId: string, reviewedAt: string) {
  if (!reviewerId || !Number.isFinite(Date.parse(reviewedAt))) throw new Error('Invalid editorial review identity or date')
  const review = JSON.stringify({ version: editorialContentVersion(content), reviewer: reviewerId, date: new Date(reviewedAt).toISOString() })
  return [...publicEditorialTags(content.tags), `${REVIEW_PREFIX}${review}`]
}

export function hasCurrentEditorialReview(content: EditorialReviewContent) {
  const records = (content.tags || []).filter(tag => tag.startsWith(REVIEW_PREFIX))
  if (records.length !== 1) return false
  try {
    const record = JSON.parse(records[0].slice(REVIEW_PREFIX.length))
    return typeof record.reviewer === 'string' && Boolean(record.reviewer.trim())
      && typeof record.date === 'string' && Number.isFinite(Date.parse(record.date))
      && record.version === editorialContentVersion(content)
  } catch { return false }
}

export function retainedEditorialReviewTags(current: EditorialReviewContent | null, updated: EditorialReviewContent) {
  const tags = publicEditorialTags(updated.tags)
  const candidate = { ...updated, tags: [...tags, ...(current?.tags || []).filter(tag => tag.startsWith(REVIEW_PREFIX))] }
  return hasCurrentEditorialReview(candidate) ? candidate.tags : tags
}
