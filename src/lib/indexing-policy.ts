import { stripMarkdown } from './seo'
import { MAP_PILLAR_SLUGS } from './overwatch-maps'
import { PUBLIC_HERO_PAGE_SLUGS } from './topic-links'
export { PILLAR_COUNTER_SLUGS, PILLAR_TEAM_COMP_SLUGS } from './public-topic-policy'
import { PILLAR_COUNTER_SLUGS, PILLAR_TEAM_COMP_SLUGS } from './public-topic-policy'

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
  seo_title?: string | null
  seo_description?: string | null
  category?: string | null
  content_type?: string | null
}

type AnnouncementLike = GuideLike & {
  source_name?: string | null
  source_url?: string | null
  source_published_at?: string | null
  auto_imported?: boolean | null
  tags?: string[] | null
}

type ExpertLike = {
  slug?: string | null
  display_name?: string | null
  bio?: string | null
  specialties?: string[] | null
  avatar_url?: string | null
  peak_rank?: string | null
  main_role?: string | null
  status?: string | null
  tier_starter_enabled?: boolean | null
  tier_pro_enabled?: boolean | null
  tier_deep_dive_enabled?: boolean | null
}

type EditorialTopicLike = {
  seoTitle?: string | null
  seoDescription?: string | null
  h1?: string | null
  updatedAt?: string | null
  intro?: string[] | null
  summary?: string[] | null
  faqs?: { question?: string | null; answer?: string | null }[] | null
  links?: { href?: string | null; label?: string | null }[] | null
  [key: string]: unknown
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

export const UPCOMING_HERO_SLUGS: string[] = []

export const PILLAR_HERO_SLUGS: string[] = [...PUBLIC_HERO_PAGE_SLUGS]

export const PILLAR_MAP_SLUGS = MAP_PILLAR_SLUGS

export const EXCLUDED_GUIDE_SLUGS = [
  'tier-list-season-2-overwatch-mejores-heroes-rol',
]

export const PATCH_NOTE_EDITORIAL_TAG = 'editorial-review-complete'

export const PILLAR_GUIDE_SLUGS = [
  'como-mejorar-en-overwatch',
  'como-subir-de-rango-overwatch',
  'mejores-heroes-overwatch',
  'counters-overwatch-guia-completa',
  'composiciones-overwatch-5v5-6v6',
  'review-vod-overwatch-espanol',
  'como-mejorar-en-overwatch-revisando-vod',
  'como-jugar-ana-ranked-overwatch',
  'como-jugar-cassidy-ranked-overwatch',
  'como-jugar-genji-ranked-overwatch',
  'como-jugar-kiriko-ranked-overwatch',
  'como-jugar-reinhardt-ranked-overwatch',
  'como-jugar-dva-ranked-overwatch',
  'como-jugar-winston-ranked-overwatch',
  'como-mejorar-como-tank-overwatch',
  'como-mejorar-como-dps-overwatch',
  'como-mejorar-como-support-overwatch',
  'como-revisar-cooldowns-overwatch',
  'como-elegir-composicion-dive-poke-brawl',
  'como-usar-ultimates-overwatch',
  'cuando-cambiar-de-heroe-overwatch',
]

// These routes have a hand-reviewed, repository-owned article. Database guides
// must still pass the content checks below even when their slug is strategic.
export const STATIC_EDITORIAL_GUIDE_SLUGS = [
  'como-mejorar-en-overwatch',
  'como-subir-de-rango-overwatch',
  'mejores-heroes-overwatch',
  'counters-overwatch-guia-completa',
  'composiciones-overwatch-5v5-6v6',
  'review-vod-overwatch-espanol',
] as const

export const RANKED_EDITORIAL_GUIDE_SLUGS = [
  'como-jugar-ana-ranked-overwatch',
  'como-jugar-kiriko-ranked-overwatch',
  'como-jugar-genji-ranked-overwatch',
  'como-jugar-cassidy-ranked-overwatch',
  'como-jugar-reinhardt-ranked-overwatch',
  'como-jugar-dva-ranked-overwatch',
  'como-jugar-winston-ranked-overwatch',
] as const

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

export function patchNotePublicationIssues(item: AnnouncementLike) {
  if (item.content_type !== 'patch_note') return []

  const issues: string[] = []
  const body = item.body || ''
  const hasInternalLink = /\]\(\/(?:heroes|guides|counters|team-comps|roles)\//i.test(body)
  const hasDraftMarkers = /\[(?:Completar|Explicar|Añadir)\b/i.test(body)
  const hasVisibleSourceLink = Boolean(item.source_url && body.includes(item.source_url))

  if (!item.source_url) issues.push('Falta el enlace oficial de Blizzard')
  if (!item.source_published_at) issues.push('Falta la fecha oficial del parche')
  if (!item.tags?.includes(PATCH_NOTE_EDITORIAL_TAG)) issues.push(`Añade la etiqueta ${PATCH_NOTE_EDITORIAL_TAG}`)
  if (wordCount(body) < QUALITY_MINIMUMS.patchNoteAdsWords) issues.push(`El análisis propio debe alcanzar ${QUALITY_MINIMUMS.patchNoteAdsWords} palabras`)
  if (wordCount(item.excerpt) < 8) issues.push('Completa un extracto editorial útil')
  if (!item.seo_title || wordCount(item.seo_description) < 8) issues.push('Completa el título y la descripción SEO')
  if (!hasInternalLink) issues.push('Añade al menos un enlace interno a una guía, héroe, counter o composición')
  if (!hasVisibleSourceLink) issues.push('Mantén visible el enlace a la nota oficial de Blizzard')
  if (hasDraftMarkers) issues.push('Elimina todos los marcadores pendientes del borrador')

  return issues
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
  if (EXCLUDED_GUIDE_SLUGS.includes(guide.slug)) return false
  const bodyWords = wordCount(guide.body)
  const summaryWords = wordCount([guide.excerpt, guide.seo_description].filter(Boolean).join(' '))

  return bodyWords >= QUALITY_MINIMUMS.guideIndexWords &&
    summaryWords >= QUALITY_MINIMUMS.guideSummaryWords &&
    !isVideoOnlyGuide(guide)
}

export function isGuideAdEligible(guide: GuideLike) {
  if (!guide.slug) return false
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
    return Boolean(
      item.source_url &&
      item.tags?.includes(PATCH_NOTE_EDITORIAL_TAG) &&
      words >= QUALITY_MINIMUMS.patchNoteAdsWords &&
      summaryWords >= 12
    )
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

export function expertQualityDecision(expert: ExpertLike): PageQualityDecision {
  const bioWords = wordCount(expert.bio)
  const hasService = Boolean(
    expert.tier_starter_enabled ||
    expert.tier_pro_enabled ||
    expert.tier_deep_dive_enabled
  )
  const isComplete = Boolean(
    expert.status === 'active' &&
    expert.slug &&
    expert.display_name &&
    expert.avatar_url &&
    expert.peak_rank &&
    expert.main_role &&
    expert.specialties?.length &&
    bioWords >= 40 &&
    hasService
  )

  return isComplete
    ? indexNoAds('Perfil de experto completo e indexable', bioWords)
    : blocked('Perfil de experto incompleto para indexación', bioWords)
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
      ? indexNoAds('Counter pilar indexable; monetización pendiente de contenido propio completo', 0)
      : blocked('Counter programático pendiente de análisis específico', 0)
  }

  if (kind === 'team_comp') {
    return isPillarTeamCompSlug(slug)
      ? indexNoAds('Composición pilar indexable; monetización pendiente de contenido propio completo', 0)
      : blocked('Composición programática pendiente de análisis específico', 0)
  }

  if (kind === 'role') {
    return indexNoAds('Hub de rol indexable; sin anuncios hasta ampliar contenido propio', 0)
  }

  return PILLAR_MAP_SLUGS.includes(slug)
    ? indexNoAds('Mapa pilar indexable; sin anuncios hasta consolidar señales de calidad', 0)
    : blocked('Mapa pendiente de contenido publicado suficiente', 0)
}

export function editorialTopicQualityDecision(
  kind: 'hero' | 'counter' | 'team_comp' | 'map',
  slug: string,
  content: EditorialTopicLike | null | undefined,
): PageQualityDecision {
  const policy = topicQualityDecision(kind, slug)
  if (!policy.indexable || !content) return blocked(policy.reason, 0)

  const serialized = JSON.stringify(content)
  const words = wordCount(serialized.replace(/[{}\[\]":,]/g, ' '))
  const hasCoreMetadata = Boolean(content.seoTitle && content.seoDescription && content.h1 && content.updatedAt)
  const hasEditorialStructure = Boolean(
    content.intro?.length &&
    content.summary?.length &&
    content.faqs && content.faqs.length >= 3 &&
    content.links && content.links.length >= 3
  )
  const hasDraftLanguage = /\b(?:lorem ipsum|pendiente de completar|texto de ejemplo|title seo|meta description|keywords principales)\b/i.test(serialized)
  const uniqueParagraphs = new Set(
    serialized
      .split(/(?<=[.!?])\s+/)
      .map(value => normalize(value))
      .filter(value => value.split(/\s+/).length >= 12),
  )
  const paragraphCount = serialized.split(/(?<=[.!?])\s+/).filter(value => value.split(/\s+/).length >= 12).length
  const hasObviousDuplication = paragraphCount > 0 && uniqueParagraphs.size / paragraphCount < 0.78

  if (!hasCoreMetadata) return blocked('Faltan metadatos editoriales obligatorios', words)
  if (!hasEditorialStructure) return blocked('La página no tiene todavía una estructura editorial completa', words)
  if (words < QUALITY_MINIMUMS.guideIndexWords) return blocked('El análisis específico todavía es insuficiente', words)
  if (hasDraftLanguage) return blocked('La página contiene notas internas o texto provisional', words)
  if (hasObviousDuplication) return blocked('La página repite demasiado contenido dentro del propio artículo', words)

  return indexNoAds('Contenido editorial completo; anuncios bloqueados durante la revisión de AdSense', words)
}

export function robotsForQuality(decision: PageQualityDecision) {
  return decision.indexable ? undefined : { index: false, follow: true }
}

export function isStaticPathAdEligible(path: string) {
  return [
    '/overwatch-temporada-4-heroes-of-busan',
    '/overwatch-temporada-3-into-the-tigers-den',
    '/blizzcon-2026-overwatch-horarios-espana',
    '/dmon-nuevo-heroe-tank-overwatch',
    '/busan-eichenwalde-paraiso-reworks-overwatch',
    '/guides/como-mejorar-en-overwatch',
  ].includes(path)
}

export function isPathAdEligible(path: string) {
  const cleanPath = path.split('?')[0].replace(/\/$/, '') || '/'
  if (isStaticPathAdEligible(cleanPath)) return true

  const guidePrefix = '/guides/'
  if (cleanPath.startsWith(guidePrefix)) {
    const slug = cleanPath.slice(guidePrefix.length)
    return [...STATIC_EDITORIAL_GUIDE_SLUGS, ...RANKED_EDITORIAL_GUIDE_SLUGS].some(item => item === slug)
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
