import { sha256 } from '@noble/hashes/sha2.js'
import { STATIC_EDITORIAL_REVIEWS } from './static-editorial-reviews'
import { isCompleteEditorialReview } from './editorial-review'

export type StaticEditorialReview = {
  path: string
  version: string
  reviewedAt: string
  reviewer: string
  evidence: string
  checks: { specific: boolean; accurate: boolean; links: boolean; visual: boolean }
}

function normalizeContent(value: unknown): unknown {
  if (typeof value === 'string') return value.replace(/\r\n/g, '\n')
  if (value === null || typeof value === 'boolean') return value
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (Array.isArray(value)) return value.map(normalizeContent)
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value)
      .filter(([, child]) => child !== undefined)
      .sort(([left], [right]) => left.localeCompare(right, 'en'))
      .map(([key, child]) => [key, normalizeContent(child)]))
  }
  throw new Error('Static editorial content must be JSON data')
}

// Array order, metadata, dates and nested links all belong to the reviewed
// version. Object key order and Windows line endings do not alter the article.
export function staticEditorialContentVersion(path: string, content: unknown) {
  const bytes = new TextEncoder().encode(JSON.stringify([path, normalizeContent(content)]))
  return Array.from(sha256(bytes), byte => byte.toString(16).padStart(2, '0')).join('')
}

export function matchesStaticEditorialReview(path: string, content: unknown, review: unknown): review is StaticEditorialReview {
  if (!content || !review || typeof review !== 'object') return false
  const record = review as Partial<StaticEditorialReview>
  if (record.path !== path || typeof record.reviewer !== 'string' || !record.reviewer.trim()
    || typeof record.evidence !== 'string' || !record.evidence.match(/^docs\/[a-z0-9-]+\.md$/)
    || typeof record.reviewedAt !== 'string' || !record.reviewedAt.match(/^\d{4}-\d{2}-\d{2}$/)
    || !Number.isFinite(Date.parse(record.reviewedAt))
    || new Date(record.reviewedAt).toISOString().slice(0, 10) !== record.reviewedAt
    || !isCompleteEditorialReview(record.checks)) return false
  try { return record.version === staticEditorialContentVersion(path, content) }
  catch { return false }
}

export function hasCurrentStaticEditorialReview(path: string, content: unknown) {
  return matchesStaticEditorialReview(path, content, STATIC_EDITORIAL_REVIEWS[path])
}
