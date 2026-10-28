import { stripMarkdown } from './seo'
import { getMapPillar, MAP_PILLAR_SLUGS, type MapPillar } from './overwatch-maps'
import { PUBLIC_HERO_PAGE_SLUGS } from './topic-links'
import { hasReviewedGuideRevision, reviewedGuideTarget } from './reviewed-guide-policy'
import { applyReviewedGuideRevision, reviewedGuideRevisions } from './reviewed-guide-revisions'
export { PILLAR_COUNTER_SLUGS, PILLAR_TEAM_COMP_SLUGS } from './public-topic-policy'
import { PILLAR_COUNTER_SLUGS, PILLAR_TEAM_COMP_SLUGS } from './public-topic-policy'
import { editorialContentVersion, hasCurrentEditorialReview, type EditorialReviewContent } from './editorial-review'
import { hasCurrentStaticEditorialReview } from './static-editorial-review'
import { getCounterPillar, getTeamCompPillar, type TeamComposition } from './seo-clusters'
import { COUNTER_HEROES } from './overwatch-counters'
import { getHeroPillar, type HeroPillarCard } from './hero-pillars'
import { getRankedHeroGuide, type RankedHeroGuide } from './ranked-hero-guides'
import { evergreenGuides, type EvergreenGuide } from './evergreen-guides'
import { flexRoleGuide } from './flex-role-guide'
export { isPathAdEligible } from './ad-inventory-policy'

export type IndexingDecision = 'indexable' | 'noindex_follow' | 'not_found'
export type QualityStatus = 'index_ads' | 'index_no_ads' | 'noindex_no_ads'

export type PageQualityDecision = {
  status: QualityStatus
  indexable: boolean
  adsAllowed: boolean
  reason: string
  wordCount?: number
}

type GuideLike = EditorialReviewContent & {
  slug?: string | null
  title?: string | null
  body?: string | null
  excerpt?: string | null
  seo_title?: string | null
  seo_description?: string | null
  category?: string | null
  content_type?: string | null
  author?: string | null
  created_at?: string | null
  updated_at?: string | null
  published?: boolean | null
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
  analysisStatus?: 'trial'
  seoTitle?: string | null
  seoDescription?: string | null
  h1?: string | null
  updatedAt?: string | null
  publishedAt?: string | null
  schemaDate?: string | null
  headerTips?: string[] | null
  quickAnswers?: { title: string; body: string }[] | null
  abilities?: { title: string; body: string }[] | null
  rankedPlan?: string[] | null
  checklist?: string[] | null
  intro?: string[] | null
  summary?: string[] | null
  publishedDate?: string | null
  compositions?: TeamComposition[] | HeroPillarCard[] | null
  responsibilities?: { title: string; body: string }[] | null
  rotationPlan?: string[] | null
  weaknesses?: string[] | null
  examples?: { title: string; body: string }[] | null
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

// Catalogue membership is publication intent, not approval of an article version.
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
  'como-usar-ultimates-overwatch',
  'cuando-cambiar-de-heroe-overwatch',
]

// Repository-owned routes, not a list of approved revisions. Every article
// still needs the exact-version decision below before it enters the sitemap.
export const STATIC_EDITORIAL_GUIDE_SLUGS = [
  'como-mejorar-como-tank-overwatch',
  'como-usar-ultimates-overwatch',
  'cuando-cambiar-de-heroe-overwatch',
  'como-revisar-cooldowns-overwatch',
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
  const markdownLinks = Array.from(body.matchAll(/\]\(([^\s)]+)\)/g), match => match[1])
  const hasVisibleSourceLink = Boolean(item.source_url && markdownLinks.includes(item.source_url))
  const headings = Array.from(body.matchAll(/^##\s+(.+)$/gm), match => normalize(match[1]))
  const paragraphs = body.split(/\n\s*\n/)
    .map(value => normalize(stripMarkdown(value)).replace(/\s+/g, ' ').trim())
    .filter(value => value.split(' ').length >= 30)
  const words = normalize(stripMarkdown(body)).split(/\s+/).filter(Boolean)
  const hasPadding = words.length > 100 && new Set(words).size / words.length < 0.06
  let hasOfficialSource = false
  try {
    const source = new URL(item.source_url || '')
    hasOfficialSource = source.protocol === 'https:' && !source.username && !source.password
      && source.hostname === 'overwatch.blizzard.com' && /\/news\/patch-notes\//.test(source.pathname)
  } catch { /* Invalid URLs are reported below. */ }

  if (!hasOfficialSource) issues.push('Falta un enlace válido a las patch notes oficiales de Blizzard')
  if (!item.source_published_at || !Number.isFinite(Date.parse(item.source_published_at))) issues.push('Falta una fecha oficial válida del parche')
  if (!item.title?.trim() || !item.author?.trim()) issues.push('Completa el título y la autoría de la entrada')
  if (wordCount(body) < QUALITY_MINIMUMS.patchNoteAdsWords) issues.push(`El análisis propio debe alcanzar ${QUALITY_MINIMUMS.patchNoteAdsWords} palabras`)
  if (wordCount(item.excerpt) < 8) issues.push('Completa un extracto editorial útil')
  if (!item.seo_title || wordCount(item.seo_description) < 8) issues.push('Completa el título y la descripción SEO')
  if (!hasInternalLink) issues.push('Añade al menos un enlace interno a una guía, héroe, counter o composición')
  if (!hasVisibleSourceLink) issues.push('Mantén visible el enlace a la nota oficial de Blizzard')
  if (hasDraftMarkers) issues.push('Elimina todos los marcadores pendientes del borrador')
  if (headings.length < 3 || new Set(headings).size !== headings.length) issues.push('Organiza el análisis en secciones propias y distintas')
  if (hasPadding || new Set(paragraphs).size !== paragraphs.length) issues.push('El análisis contiene relleno o párrafos repetidos')
  if (/^#{1,6}\s*(?:url|title seo|meta description|h1|keywords principales|instrucciones para codex|cta|enlaces internos)\s*$/im.test(body)) issues.push('Elimina las instrucciones internas del contenido visible')

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
  if (!guide.slug || guide.published === false) return false
  const evergreen = Object.hasOwn(evergreenGuides, guide.slug) ? evergreenGuides[guide.slug] : null
  if (evergreen) return evergreenGuideQualityDecision(evergreen).indexable
  const ranked = getRankedHeroGuide(guide.slug)
  if (ranked) return rankedGuideQualityDecision(ranked).indexable
  if (reviewedGuideTarget(guide.slug)) return false
  if (hasReviewedGuideRevision(guide.slug)) return reviewedGuideIndexDecision(applyReviewedGuideRevision({ ...guide, slug: guide.slug })).indexable
  if (EXCLUDED_GUIDE_SLUGS.includes(guide.slug)) return false
  return hasCurrentEditorialReview(guide) && !isVideoOnlyGuide(guide) && guidePublicationIssues(guide).length === 0
}

// These are necessary technical checks, not a substitute for editorial review.
// The length floor is our own policy, not a Google or AdSense requirement.
export function guidePublicationIssues(guide: GuideLike) {
  const issues: string[] = []
  const body = guide.body || ''
  const paragraphs = body.split(/\n\s*\n/)
    .map(value => normalize(stripMarkdown(value)).replace(/\s+/g, ' ').trim())
    .filter(value => value.split(' ').length >= 30 && !value.startsWith('##'))
  const hasRepeatedParagraph = new Set(paragraphs).size !== paragraphs.length
  const headings = Array.from(body.matchAll(/^##\s+(.+)$/gm), match => normalize(match[1]))
  const links = new Set(Array.from(body.matchAll(/\]\((\/(?:guides|heroes|maps|roles|counters|team-comps)\/[^)\s]+)\)/g), match => match[1]))
  const words = normalize(stripMarkdown(body)).split(/\s+/).filter(Boolean)
  const hasWordPadding = words.length > 100 && new Set(words).size / words.length < 0.06
  const hasInternalText = /^#{1,6}\s*(?:url|title seo|meta description|h1|keywords principales|pregunta que resuelve|instrucciones para codex|cta|enlaces internos)\s*$/im.test(body)
    || /\b(?:lorem ipsum|pendiente de completar|texto de ejemplo)\b/i.test(body)

  if (!guide.title?.trim() || !guide.seo_title?.trim() || !guide.seo_description?.trim()) issues.push('Faltan título o descripción editoriales')
  if (!guide.author?.trim() || !guide.created_at || !guide.updated_at || !Number.isFinite(Date.parse(guide.created_at)) || !Number.isFinite(Date.parse(guide.updated_at))) issues.push('Faltan autor o fechas válidas')
  if (wordCount(body) < QUALITY_MINIMUMS.guideIndexWords) issues.push('El análisis todavía es demasiado breve para nuestra revisión')
  if (wordCount([guide.excerpt, guide.seo_description].filter(Boolean).join(' ')) < QUALITY_MINIMUMS.guideSummaryWords) issues.push('Falta una respuesta inicial útil')
  if (headings.length < 3 || new Set(headings).size !== headings.length) issues.push('Faltan secciones distintas y organizadas')
  if (links.size < 2) issues.push('Faltan enlaces relacionados dentro del artículo')
  if (hasRepeatedParagraph || hasWordPadding) issues.push('Hay párrafos repetidos o relleno artificial')
  if (hasInternalText) issues.push('Hay instrucciones internas o texto provisional visible')
  return issues
}

export function isGuideAdEligible(guide: GuideLike) {
  if (!guide.slug) return false
  if (Object.hasOwn(evergreenGuides, guide.slug)) return false
  if (getRankedHeroGuide(guide.slug)) return false
  if (hasReviewedGuideRevision(guide.slug)) return false
  return isGuideSitemapEligible(guide) && wordCount(guide.body) >= QUALITY_MINIMUMS.guideAdsWords
}

export function guideQualityDecision(guide: GuideLike): PageQualityDecision {
  const words = wordCount(guide.body)

  if (!guide.slug) {
    return blocked('Guía sin slug canónico', words)
  }

  const ranked = getRankedHeroGuide(guide.slug)
  if (ranked) return guide.published === false
    ? blocked('Registro no publicado; la ruta editorial se evalúa por separado', words)
    : rankedGuideQualityDecision(ranked)

  const evergreen = Object.hasOwn(evergreenGuides, guide.slug) ? evergreenGuides[guide.slug] : null
  if (evergreen) return guide.published === false
    ? blocked('Registro no publicado; la ruta editorial se evalúa por separado', words)
    : evergreenGuideQualityDecision(evergreen)

  if (reviewedGuideTarget(guide.slug)) return blocked('Alias de una guía con URL canónica propia', words)
  if (hasReviewedGuideRevision(guide.slug)) return reviewedGuideIndexDecision(guide)

  if (isGuideAdEligible(guide)) {
    return allowedWithAds('Guía pilar o contenido editorial suficiente', words)
  }

  if (isGuideSitemapEligible(guide)) {
    return indexNoAds('Guía útil, pendiente de reforzar antes de monetizar', words)
  }

  if (isVideoOnlyGuide(guide)) {
    return blocked('Guía basada principalmente en vídeo externo o plantilla', words)
  }

  if (!hasCurrentEditorialReview(guide)) return blocked('Esta versión de la guía todavía no tiene una revisión editorial aprobada', words)
  return blocked(guidePublicationIssues(guide).join('; ') || 'Contenido pendiente de revisión', words)
}

function reviewedGuideIndexDecision(guide: GuideLike): PageQualityDecision {
  const revision = guide.slug ? reviewedGuideRevisions[guide.slug] : undefined
  const words = wordCount(guide.body)
  if (!revision || !hasCurrentStaticEditorialReview(`/guides/${guide.slug}`, revision)) {
    return blocked('La revisión de esta guía todavía no autoriza indexar su versión actual', words)
  }
  // Review the repository-owned text, and also require that the caller renders
  // precisely that text. Database originals and redirect aliases are retained.
  if (guide.title !== revision.title || guide.seo_title !== revision.title
    || guide.seo_description !== revision.description || guide.excerpt !== revision.quickAnswer
    || guide.body !== revision.body || guide.author !== 'Replaid Lab') {
    return blocked('La guía renderizada no coincide con la revisión editorial', words)
  }
  if (guide.video_id || revision.reviewedVideo) {
    const fields = ['video_id', 'video_url', 'video_platform', 'video_title', 'video_channel', 'video_language', 'video_published_at'] as const
    const matches = revision.reviewedVideo && fields.every(field => {
      const expected = revision.reviewedVideo![field]
      if (!expected?.trim() || !guide[field]?.trim()) return false
      return field === 'video_published_at' ? Date.parse(guide[field]!) === Date.parse(expected) : guide[field] === expected
    })
    if (!matches) return blocked('El vídeo incorporado no coincide con la fuente revisada', words)
  }
  if (revision.renderedContentVersion && editorialContentVersion(guide) !== revision.renderedContentVersion) {
    return blocked('Los metadatos o medios del artículo han cambiado desde su revisión', words)
  }
  const issues = guidePublicationIssues(guide)
  return issues.length ? blocked(issues.join('; '), words)
    : indexNoAds('Guía revisada individualmente para indexación; publicidad desactivada', words)
}

export function isAnnouncementSitemapEligible(item: AnnouncementLike) {
  if (!item.slug || item.published === false || !hasCurrentEditorialReview(item)) return false
  const words = wordCount(item.body)
  const summaryWords = wordCount([item.excerpt, item.seo_description].filter(Boolean).join(' '))

  if (item.content_type === 'patch_note') {
    return patchNotePublicationIssues(item).length === 0
  }

  return words >= QUALITY_MINIMUMS.newsIndexWords && summaryWords >= 12 && announcementPublicationIssues(item).length === 0
}

export function announcementPublicationIssues(item: AnnouncementLike) {
  if (item.content_type === 'patch_note') return patchNotePublicationIssues(item)
  const issues: string[] = []
  const body = item.body || ''
  const paragraphs = body.split(/\n\s*\n/).map(value => normalize(stripMarkdown(value)).replace(/\s+/g, ' ').trim()).filter(value => wordCount(value) >= 30)
  if (!item.title?.trim() || !item.author?.trim() || !item.seo_title?.trim() || !item.seo_description?.trim()) issues.push('Completa título, descripción y autoría')
  if (!item.created_at || !item.updated_at || !Number.isFinite(Date.parse(item.created_at)) || !Number.isFinite(Date.parse(item.updated_at))) issues.push('Faltan fechas válidas de publicación y revisión')
  if (wordCount(body) < QUALITY_MINIMUMS.newsIndexWords || wordCount([item.excerpt, item.seo_description].filter(Boolean).join(' ')) < 12) issues.push('Falta una noticia desarrollada y una respuesta inicial útil')
  if (new Set(paragraphs).size !== paragraphs.length) issues.push('El artículo repite párrafos')
  if (/^#{1,6}\s*(?:url|title seo|meta description|h1|keywords principales|pregunta que resuelve|instrucciones para codex|cta|enlaces internos)\s*$/im.test(body) || /\b(?:lorem ipsum|pendiente de completar|texto de ejemplo)\b/i.test(body)) issues.push('Elimina las instrucciones internas y el texto provisional')
  return issues
}

export function announcementQualityDecision(item: AnnouncementLike): PageQualityDecision {
  const words = wordCount(item.body)

  if (!isAnnouncementSitemapEligible(item)) {
    return blocked(!hasCurrentEditorialReview(item) ? 'Esta versión de la entrada todavía no tiene una revisión editorial aprobada' : item.content_type === 'patch_note'
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
    return editorialTopicQualityDecision(kind, slug, getHeroPillar(slug))
  }

  if (kind === 'counter') {
    return editorialTopicQualityDecision(kind, slug, getCounterPillar(slug))
  }

  if (kind === 'team_comp') {
    return editorialTopicQualityDecision(kind, slug, getTeamCompPillar(slug))
  }

  if (kind === 'role') {
    if (slug === 'flex') return flexRoleQualityDecision(flexRoleGuide)
    return indexNoAds('Hub de rol indexable; sin anuncios hasta ampliar contenido propio', 0)
  }

  return mapQualityDecision(slug, getMapPillar(slug))
}

export function flexRoleQualityDecision(content: typeof flexRoleGuide | null): PageQualityDecision {
  if (!content || content.path !== '/roles/flex' || !hasCurrentStaticEditorialReview('/roles/flex', content)) {
    return blocked('Esta versión de la guía flex sigue pendiente de revisión individual', 0)
  }
  const words = wordCount(JSON.stringify(content))
  const structure = [content.h1, content.seoTitle, content.seoDescription, content.updatedAt].every(value => value.trim())
    && validEditorialDate(content.schemaDate)
    && [content.intro, content.summary, content.checklist].every(list => list.length && list.every(value => value.trim()))
    && content.sections.length >= 3 && content.sections.every(section => section.id.trim() && section.title.trim()
      && section.paragraphs.length && section.paragraphs.every(value => value.trim()))
    && new Set(content.sections.map(section => section.id)).size === content.sections.length
    && content.pools.length === 3 && ['Tank', 'DPS', 'Support'].every(role => content.pools.filter(pool => pool.role === role).length === 1)
    && content.pools.every(pool => pool.body.trim() && pool.question.trim() && /^\/roles\/(tank|dps|support)$/.test(pool.href)
      && pool.heroes.length >= 2 && new Set(pool.heroes.map(hero => hero.slug)).size === pool.heroes.length
      && pool.heroes.every(pick => COUNTER_HEROES.some(hero => hero.slug === pick.slug
        && hero.role === pool.role.toLowerCase() && normalize(hero.name) === normalize(pick.name))))
    && content.faqs.length >= 3 && content.faqs.every(item => item.question.trim() && item.answer.trim())
    && content.links.length >= 3 && content.links.every(link => link.label.trim() && /^\/(?!\/)/.test(link.href))
  if (!structure || words < QUALITY_MINIMUMS.guideIndexWords) return blocked('Faltan decisiones, pools, fechas o enlaces válidos en la guía flex', words)
  return indexNoAds('Guía flex revisada individualmente; sin anuncios durante la revisión de AdSense', words)
}

export function mapQualityDecision(slug: string, content: MapPillar | null | undefined): PageQualityDecision {
  if (!content || content.slug !== slug || !PILLAR_MAP_SLUGS.includes(slug)) {
    return blocked('Falta el mapa editorial publicado', 0)
  }
  if (!hasCurrentStaticEditorialReview(`/maps/${slug}`, content)) {
    return blocked('Esta versión del mapa sigue pendiente de revisión individual', 0)
  }

  const words = wordCount(JSON.stringify(content))
  const dated = validEditorialDate(content.updatedAtIso)
    && (!content.publishedAtIso || (validEditorialDate(content.publishedAtIso) && content.updatedAtIso >= content.publishedAtIso))
  const metadata = [content.name, content.mode, content.location, content.seoTitle, content.seoDescription,
    content.updatedAt, content.image, content.imageAlt].every(value => value.trim())
  const lists = [content.intro, content.mistakes, content.vodChecklist]
  const cards = [content.quickRead, content.attackPlan, content.defensePlan]
  const sections = lists.every(list => list.length > 0 && list.every(value => value.trim()))
    && cards.every(list => list.length > 0 && list.every(item => item.title.trim() && item.body.trim()))
    && content.phases.length >= 3 && content.phases.every(phase => [phase.name, phase.attack, phase.defense, phase.vodReview].every(value => value.trim()))
    && content.heroPicks.length > 0 && content.heroPicks.every(pick => pick.reason.trim()
      && COUNTER_HEROES.some(hero => hero.slug === pick.slug && hero.role === pick.role && normalize(hero.name) === normalize(pick.name)))
    && content.faq.length >= 3 && content.faq.every(item => item.question.trim() && item.answer.trim())
    && content.relatedLinks.length >= 3 && content.relatedLinks.every(link => link.label.trim() && /^\/(?!\/)/.test(link.href))
  const teams = content.compositions.length > 0 && content.compositions.every(comp => {
    const roles = comp.lineup.map(name => COUNTER_HEROES.find(hero => normalize(hero.name) === normalize(name))?.role)
    return comp.name.trim() && comp.plan.trim() && comp.weakness.trim()
      && comp.lineup.length === 5 && new Set(comp.lineup.map(normalize)).size === 5
      && roles.filter(role => role === 'tank').length === 1
      && roles.filter(role => role === 'dps').length === 2 && roles.filter(role => role === 'support').length === 2
  })
  if (!metadata || !dated || !sections || !teams) return blocked('Faltan fechas, decisiones, equipos o enlaces válidos en el mapa', words)

  const paragraphs = [
    ...content.intro, ...cards.flatMap(list => list.map(item => item.body)),
    ...content.phases.flatMap(phase => [phase.attack, phase.defense, phase.vodReview]),
    ...content.heroPicks.map(pick => pick.reason),
    ...content.compositions.flatMap(comp => [comp.plan, comp.weakness]),
    ...content.faq.map(item => item.answer), ...(content.conclusion ? [content.conclusion] : []),
  ].map(value => normalize(value).replace(/\s+/g, ' ').trim())
  if (new Set(paragraphs).size !== paragraphs.length) return blocked('El mapa repite párrafos', words)
  if (/\b(?:lorem ipsum|pendiente de completar|texto de ejemplo|title seo|meta description|keywords principales)\b/i.test(JSON.stringify(content))) {
    return blocked('El mapa contiene texto interno o provisional', words)
  }
  return indexNoAds('Mapa revisado individualmente; sin anuncios durante la revisión de AdSense', words)
}

export function editorialTopicQualityDecision(
  kind: 'hero' | 'counter' | 'team_comp',
  slug: string,
  content: EditorialTopicLike | null | undefined,
): PageQualityDecision {
  if (!content) return blocked('Falta el artículo editorial que debe revisarse', 0)
  if ((kind === 'hero' || kind === 'counter') && content.analysisStatus === 'trial') {
    return blocked('Análisis del kit de prueba; lanzamiento y matchups pendientes de comprobar', 0)
  }
  const path = `/${kind === 'hero' ? 'heroes' : kind === 'counter' ? 'counters' : 'team-comps'}/${slug}`
  if (!hasCurrentStaticEditorialReview(path, content)) {
    return blocked('Esta versión del artículo todavía no tiene una revisión editorial registrada', 0)
  }
  const published = kind === 'hero' ? isPillarHeroSlug(slug) : kind === 'counter' ? isPillarCounterSlug(slug) : isPillarTeamCompSlug(slug)
  if (!published) return blocked('Artículo revisado; indexación y anuncios pendientes de publicación individual', 0)

  const serialized = JSON.stringify(content)
  const words = wordCount(serialized.replace(/[{}\[\]":,]/g, ' '))
  if (kind === 'team_comp') {
    const candidates = content.compositions ?? []
    const compositions = candidates.filter((comp): comp is TeamComposition => 'lineup' in comp)
    const complete = compositions.length > 0 && compositions.length === candidates.length && compositions.every(comp => {
      const roles = comp.lineup.map(name => COUNTER_HEROES.find(hero => normalize(hero.name) === normalize(name))?.role)
      return ['5v5', '6v6'].includes(comp.format)
        && comp.lineup.length === (comp.format === '5v5' ? 5 : 6)
        && new Set(comp.lineup.map(normalize)).size === comp.lineup.length
        && roles.filter(role => role === 'tank').length === (comp.format === '5v5' ? 1 : 2)
        && roles.filter(role => role === 'dps').length === 2 && roles.filter(role => role === 'support').length === 2
        && [comp.name, comp.style, comp.winCondition, comp.engagePlan, comp.goodMaps, comp.weakAgainst, comp.substitutions].every(value => value?.trim())
    })
    const paragraphs = [
      ...(content.intro ?? []),
      ...compositions.flatMap(comp => [comp.winCondition, comp.engagePlan, comp.goodMaps, comp.weakAgainst, comp.substitutions]),
      ...(content.responsibilities?.map(item => item.body) ?? []),
      ...(content.examples?.map(item => item.body) ?? []),
    ].map(value => normalize(value).replace(/\s+/g, ' ').trim())
    const dated = validEditorialDate(content.schemaDate) && (!content.publishedDate || (validEditorialDate(content.publishedDate) && content.schemaDate! >= content.publishedDate))
    const metadata = [content.seoTitle, content.seoDescription, content.h1, content.updatedAt].every(value => value?.trim())
    const lists = [content.intro, content.summary, content.rotationPlan, content.weaknesses, content.checklist]
    const sections = lists.every(list => list?.length && list.every(value => value.trim()))
      && [content.responsibilities, content.examples].every(list => list?.length && list.every(item => item.title.trim() && item.body.trim()))
      && content.faqs && content.faqs.length >= 3 && content.faqs.every(item => item.question?.trim() && item.answer?.trim())
      && content.links && content.links.length >= 3 && content.links.every(link => link.label?.trim() && /^\/(?!\/)/.test(link.href ?? ''))
    if (!metadata || !dated || !complete || !sections || paragraphs.some(value => !value)) return blocked('Faltan equipos válidos, decisiones, fechas o enlaces en la composición', words)
    if (new Set(paragraphs).size !== paragraphs.length) return blocked('La composición repite párrafos', words)
    if (/\b(?:lorem ipsum|pendiente de completar|texto de ejemplo|title seo|meta description|keywords principales)\b/i.test(serialized)) return blocked('La composición contiene texto interno o provisional', words)
    return indexNoAds('Composición revisada individualmente; sin anuncios durante la revisión de AdSense', words)
  }
  const hasCoreMetadata = Boolean(content.seoTitle && content.seoDescription && content.h1 && content.updatedAt)
  const hasEditorialStructure = Boolean(
    content.intro?.length &&
    (kind === 'hero'
      ? content.headerTips?.length && content.quickAnswers?.length && content.rankedPlan?.length && content.abilities?.length && content.checklist?.length
        && validEditorialDate(content.publishedAt) && validEditorialDate(content.schemaDate) && content.schemaDate! >= content.publishedAt!
      : content.summary?.length) &&
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

export function evergreenGuideQualityDecision(content: EvergreenGuide | null): PageQualityDecision {
  if (!content || !Object.hasOwn(evergreenGuides, content.slug)) return blocked('Falta la guía editorial', 0)
  if (!hasCurrentStaticEditorialReview(`/guides/${content.slug}`, content)) {
    return blocked('Esta versión sigue pendiente de revisión individual', 0)
  }
  const paragraphs = [...content.intro, ...content.sections.flatMap(section => section.body)]
  const normalized = paragraphs.map(value => normalize(value).replace(/\s+/g, ' ').trim())
  const structure = [content.title, content.seoTitle, content.seoDescription, content.h1, content.quickAnswer, content.updatedAt].every(value => value.trim())
    && content.intro.length > 0 && content.sections.length >= 3
    && content.sections.every(section => section.title.trim() && section.body.length && section.body.every(value => value.trim()))
    && new Set(content.sections.map(section => normalize(section.title))).size === content.sections.length
    && content.checklist.length > 0 && content.checklist.every(value => value.trim())
    && content.faqs.length >= 3 && content.faqs.every(faq => faq.question.trim() && faq.answer.trim())
    && content.links.length >= 3 && content.links.every(link => link.label.trim() && /^\/(?!\/)/.test(link.href))
  if (!structure) return blocked('Falta contenido o estructura editorial', 0)
  if (!validEditorialDate(content.publishedAtIso) || !validEditorialDate(content.modifiedAtIso) || content.modifiedAtIso < content.publishedAtIso) {
    return blocked('Fechas de publicación y revisión no válidas', 0)
  }
  if (new Set(normalized).size !== normalized.length) return blocked('La guía repite párrafos', 0)
  if (/\b(?:lorem ipsum|pendiente de completar|texto de ejemplo|title seo|meta description|keywords principales)\b/i.test(JSON.stringify(content))
    || [content.h1, content.kicker, ...content.sections.map(section => section.title), ...content.faqs.map(faq => faq.question)].some(title => /^(?:cta|enlaces internos)$/i.test(title.trim()))) {
    return blocked('La guía contiene texto interno o provisional', 0)
  }
  return allowedWithAds('Guía revisada; servir anuncios requiere aprobación de AdSense y consentimiento', wordCount(paragraphs.join(' ')))
}

// The repository article is rendered before the database guide. Review that
// exact version; a published database row cannot approve a different body.
export function rankedGuideQualityDecision(content: RankedHeroGuide | null): PageQualityDecision {
  if (!content || !getRankedHeroGuide(content.slug)) return blocked('Falta la guía ranked editorial', 0)
  if (!hasCurrentStaticEditorialReview(`/guides/${content.slug}`, content)) {
    return blocked('Esta versión de la guía ranked sigue pendiente de revisión individual', 0)
  }
  const paragraphs = [...content.intro, ...content.sections.flatMap(section => section.paragraphs)]
  const normalizedParagraphs = paragraphs.map(value => normalize(value).replace(/\s+/g, ' ').trim())
  const serialized = JSON.stringify(content)
  const hasMetadata = Boolean(content.title.trim() && content.seoTitle.trim() && content.seoDescription.trim() && content.quickAnswer.trim())
  const hasStructure = content.intro.length > 0 && content.sections.length >= 3
    && content.sections.every(section => section.title.trim() && section.paragraphs.length && section.paragraphs.every(value => value.trim()))
    && content.vodQuestions.length > 0 && content.checklist.length > 0
    && content.faqs.length >= 3 && content.faqs.every(item => item.question.trim() && item.answer.trim())
    && content.links.length >= 3 && content.links.every(link => link.label.trim() && /^\/(?!\/)/.test(link.href))
  if (!hasMetadata || !hasStructure) return blocked('Falta contenido o estructura editorial en la guía ranked', 0)
  if (content.video && (!/^[\w-]{11}$/.test(content.video.id)
    || !content.video.title.trim() || !content.video.channel.trim() || !content.video.context.trim()
      || !validEditorialDate(content.video.publishedAt.slice(0, 10))
      || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/.test(content.video.publishedAt)
      || !Number.isFinite(Date.parse(content.video.publishedAt))
    || !['en', 'es'].includes(content.video.language)
    || content.video.practice.length < 2
    || content.video.practice.some(point => !point.title.trim() || !point.body.trim() || !Number.isInteger(point.seconds) || point.seconds < 0))) {
    return blocked('Falta contexto o identificación válida del vídeo', 0)
  }
  if (!validEditorialDate(content.publishedAt) || !validEditorialDate(content.modifiedAt) || content.modifiedAt < content.publishedAt) {
    return blocked('Fechas de publicación y revisión no válidas', 0)
  }
  if (new Set(normalizedParagraphs).size !== normalizedParagraphs.length) return blocked('La guía ranked repite párrafos', 0)
  if (/\b(?:lorem ipsum|pendiente de completar|texto de ejemplo|title seo|meta description|keywords principales)\b/i.test(serialized)) {
    return blocked('La guía ranked contiene texto interno o provisional', 0)
  }
  return allowedWithAds('Guía ranked revisada; servir anuncios requiere aprobación de AdSense y consentimiento', wordCount(paragraphs.join(' ')))
}

function validEditorialDate(value?: string | null) {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value)
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
