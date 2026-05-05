import { buildExcerpt } from './seo'

export type ContentType = 'guide' | 'news' | 'patch_note'
export type ContentRole = 'tank' | 'dps' | 'support' | 'flex'

export interface SponsoredFields {
  sponsor_label?: string | null
  sponsor_title?: string | null
  sponsor_body?: string | null
  sponsor_url?: string | null
  sponsor_cta?: string | null
}

export interface GuideContent extends SponsoredFields {
  id: string
  title: string
  slug: string
  body: string
  category: string | null
  excerpt?: string | null
  seo_title?: string | null
  seo_description?: string | null
  author?: string | null
  hero?: string | null
  role?: ContentRole | null
  map?: string | null
  tags?: string[] | null
  cover_image?: string | null
  content_type?: ContentType | string | null
  published?: boolean
  created_at: string
  updated_at?: string | null
}

export interface AnnouncementContent extends SponsoredFields {
  id: string
  title: string
  slug: string
  body: string
  excerpt?: string | null
  seo_title?: string | null
  seo_description?: string | null
  author?: string | null
  hero?: string | null
  role?: ContentRole | null
  map?: string | null
  tags?: string[] | null
  cover_image?: string | null
  content_type?: ContentType | string | null
  published?: boolean
  created_at: string
  updated_at?: string | null
}

export const ROLE_LABELS: Record<ContentRole, string> = {
  tank: 'Tank',
  dps: 'DPS',
  support: 'Support',
  flex: 'Flex',
}

export const ROLE_SLUGS: ContentRole[] = ['tank', 'dps', 'support']

export const DEFAULT_HEROES = [
  'ana',
  'ashe',
  'baptiste',
  'cassidy',
  'dva',
  'genji',
  'kiriko',
  'lucio',
  'mercy',
  'reinhardt',
  'soldier-76',
  'tracer',
  'widowmaker',
  'winston',
  'zarya',
  'zenyatta',
]

export const DEFAULT_MAPS = [
  'busan',
  'circuit-royal',
  'colosseo',
  'dorado',
  'eichenwalde',
  'ilios',
  'kings-row',
  'lijang-tower',
  'midtown',
  'numbani',
  'rialto',
  'route-66',
  'suravasa',
  'watchpoint-gibraltar',
]

export function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function parseTags(value: unknown) {
  if (Array.isArray(value)) {
    return value.map(String).map(v => v.trim()).filter(Boolean)
  }
  if (typeof value !== 'string') return []
  return value.split(',').map(v => v.trim()).filter(Boolean)
}

export function normalizeTopic(value: unknown) {
  if (typeof value !== 'string') return null
  const clean = toSlug(value)
  return clean || null
}

export function normalizeRole(value: unknown) {
  if (typeof value !== 'string') return null
  return ['tank', 'dps', 'support', 'flex'].includes(value) ? value : null
}

export function articleDescription(item: { excerpt?: string | null; seo_description?: string | null; body: string }) {
  return item.seo_description?.trim() || item.excerpt?.trim() || buildExcerpt(item.body)
}

export function guidePath(slug: string) {
  return `/guides/${slug}`
}

export function announcementPath(item: { slug: string; content_type?: string | null }) {
  return item.content_type === 'patch_note' ? `/patch-notes/${item.slug}` : `/news/${item.slug}`
}

export function topicLabel(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map(part => part === 'dva' ? 'D.Va' : part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
