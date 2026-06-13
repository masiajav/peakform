import { stripMarkdown } from './seo'

export type IndexingDecision = 'indexable' | 'noindex_follow' | 'not_found'
export type QualityStatus = 'index_ads' | 'index_no_ads' | 'noindex_no_ads'

export type PageQualityDecision = {
  status: QualityStatus
  indexable: boolean
  adsAllowed: boolean
  reason: string
  wordCount?: number
}

type GuideLike = {
  slug?: string | null
  title?: string | null
  body?: string | null
  excerpt?: string | null
  seo_description?: string | null
  category?: string | null
  content_type?: string | null
}

type AnnouncementLike = GuideLike & {
  source_name?: string | null
  source_url?: string | null
  source_published_at?: string | null
  auto_imported?: boolean | null
}

export const QUALITY_MINIMUMS = {
  guideIndexWords: 650,
  guideAdsWords: 900,
  guideSummaryWords: 25,
  newsIndexWords: 320,
  newsAdsWords: 700,
  patchNoteIndexWords: 140,
  patchNoteAdsWords: 420,
}

export const UPCOMING_HERO_SLUGS = ['shion']

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
  '/contact',
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

export function isUpcomingHeroSlug(slug?: string | null) {
  return Boolean(slug && UPCOMING_HERO_SLUGS.includes(slug))
}

export function isPillarHeroSlug(slug?: string | null) {
  return Boolean(slug && PILLAR_HERO_SLUGS.includes(slug))
}

export function isPillarCounterSlug(slug?: string | null) {
  return Boolean(slug && PILLAR_COUNTER_SLUGS.includes(slug))
}

export function isPillarTeamCompSlug(slug?: string | null) {
  return Boolean(slug && PILLAR_TEAM_COMP_SLUGS.includes(slug))
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

  return bodyWords >= QUALITY_MINIMUMS.guideIndexWords &&
    summaryWords >= QUALITY_MINIMUMS.guideSummaryWords &&
    !isVideoOnlyGuide(guide)
}

export function isGuideAdEligible(guide: GuideLike) {
  if (!guide.slug) return false
  if (isPillarGuideSlug(guide.slug)) return true

  return isGuideSitemapEligible(guide) && wordCount(guide.body) >= QUALITY_MINIMUMS.guideAdsWords
}

export function guideQualityDecision(guide: GuideLike): PageQualityDecision {
  const words = wordCount(guide.body)

  if (!guide.slug) {
    return blocked('Guía sin slug canónico', words)
  }

  if (isGuideAdEligible(guide)) {
    return allowedWithAds('Guía pilar o contenido editorial suficiente', words)
  }

  if (isGuideSitemapEligible(guide)) {
    return indexNoAds('Guía útil, pendiente de reforzar antes de monetizar', words)
  }

  if (isVideoOnlyGuide(guide)) {
    return blocked('Guía basada principalmente en vídeo externo o plantilla', words)
  }

  return blocked('Contenido insuficiente para sitemap o anuncios', words)
}

export function isAnnouncementSitemapEligible(item: AnnouncementLike) {
  if (!item.slug) return false
  const words = wordCount(item.body)
  const summaryWords = wordCount([item.excerpt, item.seo_description].filter(Boolean).join(' '))

  if (item.content_type === 'patch_note') {
    const hasSource = Boolean(item.source_url || item.source_name || item.auto_imported || /overwatch\.blizzard\.com/i.test(item.body ?? ''))
    return words >= QUALITY_MINIMUMS.patchNoteIndexWords && hasSource
  }

  return words >= QUALITY_MINIMUMS.newsIndexWords && summaryWords >= 12
}

export function announcementQualityDecision(item: AnnouncementLike): PageQualityDecision {
  const words = wordCount(item.body)

  if (!isAnnouncementSitemapEligible(item)) {
    return blocked(item.content_type === 'patch_note'
      ? 'Patch note sin resumen editorial suficiente o fuente visible'
      : 'Noticia demasiado fina para indexar',
      words)
  }

  const adsWords = item.content_type === 'patch_note'
    ? QUALITY_MINIMUMS.patchNoteAdsWords
    : QUALITY_MINIMUMS.newsAdsWords

  if (words >= adsWords) {
    return allowedWithAds('Contenido editorial suficiente para anuncios', words)
  }

  return indexNoAds('Indexable, pero pendiente de más valor propio antes de anuncios', words)
}

export function topicQualityDecision(kind: 'hero' | 'counter' | 'team_comp' | 'role' | 'map', slug: string): PageQualityDecision {
  if (kind === 'hero' && isUpcomingHeroSlug(slug)) {
    return blocked('Héroe en seguimiento: visible para usuarios, no indexable hasta guía definitiva y balance final', 0)
  }

  if (kind === 'hero') {
    return isPillarHeroSlug(slug)
      ? indexNoAds('Héroe pilar indexable; monetización pendiente de contenido propio completo', 0)
      : blocked('Página de héroe programática pendiente de contenido editorial único', 0)
  }

  if (kind === 'counter') {
    return isPillarCounterSlug(slug)
      ? indexNoAds('Counter pilar indexable; monetizacion pendiente de contenido propio completo', 0)
      : blocked('Counter programatico pendiente de analisis especifico', 0)
  }

  if (kind === 'team_comp') {
    return isPillarTeamCompSlug(slug)
      ? indexNoAds('Composicion pilar indexable; monetizacion pendiente de contenido propio completo', 0)
      : blocked('Composicion programatica pendiente de analisis especifico', 0)
  }

  if (kind === 'role') {
    return indexNoAds('Hub de rol indexable; sin anuncios hasta ampliar contenido propio', 0)
  }

  return blocked('Mapa pendiente de contenido publicado suficiente', 0)
}

export function robotsForQuality(decision: PageQualityDecision) {
  return decision.indexable ? undefined : { index: false, follow: true }
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

export function isPathAdEligible(path: string) {
  const cleanPath = path.split('?')[0].replace(/\/$/, '') || '/'
  if (isStaticPathAdEligible(cleanPath)) return true

  const guidePrefix = '/guides/'
  if (cleanPath.startsWith(guidePrefix)) {
    return isPillarGuideSlug(cleanPath.slice(guidePrefix.length))
  }

  return false
}

function normalize(value?: string | null) {
  return (value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function allowedWithAds(reason: string, words: number): PageQualityDecision {
  return { status: 'index_ads', indexable: true, adsAllowed: true, reason, wordCount: words }
}

function indexNoAds(reason: string, words: number): PageQualityDecision {
  return { status: 'index_no_ads', indexable: true, adsAllowed: false, reason, wordCount: words }
}

function blocked(reason: string, words: number): PageQualityDecision {
  return { status: 'noindex_no_ads', indexable: false, adsAllowed: false, reason, wordCount: words }
}
