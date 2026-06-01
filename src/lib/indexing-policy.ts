import { stripMarkdown } from './seo'

export type IndexingDecision = 'indexable' | 'noindex_follow' | 'not_found'

type GuideLike = {
  slug?: string | null
  title?: string | null
  body?: string | null
  excerpt?: string | null
  seo_description?: string | null
  category?: string | null
  content_type?: string | null
}

export const PILLAR_HERO_SLUGS = [
  'ana',
  'genji',
  'tracer',
  'kiriko',
  'reinhardt',
  'dva',
  'winston',
  'mercy',
  'cassidy',
  'zarya',
]

export const PILLAR_COUNTER_SLUGS = [
  'genji',
  'ana',
  'tracer',
  'winston',
  'reinhardt',
  'kiriko',
]

export const PILLAR_TEAM_COMP_SLUGS = [
  'genji',
  'ana',
  'tracer',
  'reinhardt',
  'winston',
]

export const PILLAR_GUIDE_SLUGS = [
  'como-mejorar-en-overwatch',
  'ana-primeros-habitos-impactar-mas',
  'genji-guia-video-overwatch',
  'tracer-guia-video-overwatch',
  'kiriko-guia-video-overwatch',
  'reinhardt-guia-video-overwatch',
  'dva-guia-video-overwatch',
  'winston-guia-video-overwatch',
  'mercy-guia-video-overwatch',
  'cassidy-guia-video-overwatch',
  'zarya-guia-video-overwatch',
]

export const TRUST_ROUTES = [
  '/about',
  '/privacy',
  '/editorial-methodology',
  '/legal',
]

export function wordCount(value?: string | null) {
  if (!value) return 0
  return stripMarkdown(value).split(/\s+/).filter(Boolean).length
}

export function isPillarGuideSlug(slug?: string | null) {
  return Boolean(slug && PILLAR_GUIDE_SLUGS.includes(slug))
}

export function isVideoOnlyGuide(guide: GuideLike) {
  const category = normalize(guide.category)
  const title = normalize(guide.title)
  return category.includes('video guia') || title.includes('guia video')
}

export function isGuideSitemapEligible(guide: GuideLike) {
  if (!guide.slug) return false
  if (isPillarGuideSlug(guide.slug)) return true

  const bodyWords = wordCount(guide.body)
  const summaryWords = wordCount([guide.excerpt, guide.seo_description].filter(Boolean).join(' '))

  return bodyWords >= 650 && summaryWords >= 25 && !isVideoOnlyGuide(guide)
}

export function isGuideAdEligible(guide: GuideLike) {
  if (!guide.slug) return false
  if (isPillarGuideSlug(guide.slug)) return true

  return isGuideSitemapEligible(guide) && wordCount(guide.body) >= 800
}

export function isStaticPathAdEligible(path: string) {
  return [
    '/',
    '/guides',
    '/counters',
    '/team-comps',
    '/news',
    '/patch-notes',
    '/guides/como-mejorar-en-overwatch',
  ].includes(path)
}

function normalize(value?: string | null) {
  return (value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}
