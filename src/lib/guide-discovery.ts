import { DEFAULT_HEROES, ROLE_LABELS, topicLabel, type GuideContent } from './content'
import { HERO_PILLARS } from './hero-pillars'
import { COUNTER_HEROES } from './overwatch-counters'
import type { EditorialArticle } from './editorial-record'
import { EXCLUDED_GUIDE_SLUGS, guidePublicationIssues, isVideoOnlyGuide } from './indexing-policy'
import { applyReviewedGuideRevision, hasReviewedGuideRevision, reviewedGuideTarget } from './reviewed-guide-revisions'
import { getRankedHeroGuide } from './ranked-hero-guides'
import { evergreenGuideList, evergreenGuides } from './evergreen-guides'

type DiscoverableGuide = Pick<GuideContent, 'slug'> & Partial<GuideContent>

// Discovery links to existing pages without creating guide rows or approvals.
export type GuideSearchCard = GuideContent & { href?: string }

export function guideSearchHref(guide: GuideSearchCard) {
  return guide.href ?? `/guides/${guide.slug}`
}

// Callers supply only the evidence-checked output of publishedEditorial.
export function heroGuideSearchCards(published: EditorialArticle[] = []): GuideSearchCard[] {
  const cards = new Map<string, GuideSearchCard>()
  for (const pillar of Object.values(HERO_PILLARS)) {
    const href = `/heroes/${pillar.slug}`
    cards.set(href, {
      id: `hero:${pillar.slug}`, slug: `hero:${pillar.slug}`, href,
      title: pillar.h1, seo_title: pillar.seoTitle, seo_description: pillar.seoDescription,
      excerpt: pillar.seoDescription,
      body: [...pillar.intro, ...pillar.rankedPlan,
        ...pillar.sections.flatMap(section => [section.title, section.body]),
        ...pillar.abilities.flatMap(ability => [ability.title, ability.body]),
        ...pillar.mistakes, ...pillar.checklist].join('\n\n'),
      hero: pillar.slug, role: pillar.roleSlug, category: 'Héroes', published: true,
      created_at: pillar.publishedAt ?? pillar.schemaDate!, updated_at: pillar.schemaDate,
    })
  }
  for (const article of published) {
    if (article.game !== 'overwatch' || article.kind !== 'hero' || article.path !== `/heroes/${article.slug}`) continue
    const role = COUNTER_HEROES.find(hero => hero.slug === article.slug)?.role
    cards.set(article.path, {
      id: `hero:${article.slug}`, slug: `hero:${article.slug}`, href: article.path,
      title: article.title, seo_title: article.title, seo_description: article.description,
      excerpt: article.description,
      body: [article.intro, ...article.sections.flatMap(section => [...section.body, ...(section.bullets ?? [])]), ...article.checklist].join('\n\n'),
      hero: article.slug, role, category: 'Héroes', published: true,
      created_at: article.publishedAt, updated_at: article.updatedAt,
    })
  }
  return [...cards.values()]
}

export type GuideSearchFilters = { role?: string; hero?: string; map?: string; category?: string; q?: string }

export function filterGuideSearchCards(cards: GuideSearchCard[], filters: GuideSearchFilters): GuideSearchCard[] {
  const intent = resolveGuideSearchIntent(filters.q, cards.flatMap(card => card.hero ? [card.hero] : []))
  const term = normalizeSearchText(filters.q)
  const seen = new Set<string>()
  return cards.filter(card => {
    if ((filters.hero && card.hero !== filters.hero) || (intent.hero && card.hero !== intent.hero)) return false
    if ((filters.role && card.role !== filters.role) || (intent.role && card.role !== intent.role)) return false
    if ((filters.map && card.map !== filters.map) || (filters.category && card.category !== filters.category)) return false
    if (term && !intent.hero && !intent.role) {
      const haystack = normalizeSearchText([
        card.title, card.excerpt, card.seo_description, card.category, card.hero,
        card.hero ? topicLabel(card.hero) : '', card.role,
        card.role ? ROLE_LABELS[card.role] : '', card.map,
        card.map ? topicLabel(card.map) : '', card.video_title, card.video_channel,
      ].filter(Boolean).join(' '))
      if (!haystack.includes(term)) return false
    }
    const href = guideSearchHref(card)
    if (seen.has(href)) return false
    seen.add(href)
    return true
  })
}

export function resolveGuideSearchIntent(query?: string, additionalHeroes: string[] = []): { hero?: string; role?: string } {
  const term = normalizeSearchText(query)
  if (!term) return {}
  const contains = (token: string) => Boolean(token) && ` ${term} `.includes(` ${token} `)
  const hero = [...new Set([...DEFAULT_HEROES, ...additionalHeroes])].find(slug =>
    [slug, topicLabel(slug)].some(value => contains(normalizeSearchText(value))))
  if (hero) return { hero }
  const role = (Object.keys(ROLE_LABELS) as Array<keyof typeof ROLE_LABELS>).find(slug =>
    [slug, ROLE_LABELS[slug]].some(value => contains(normalizeSearchText(value))))
  return role ? { role } : {}
}

function normalizeSearchText(value?: string) {
  return (value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ')
}

// Curated static articles also need cards when a text search hides the
// foundations section; they do not depend on a matching database row.
export function repositoryGuideSearchCards(): GuideContent[] {
  return discoverableGuides(evergreenGuideList.map(guide => ({
    id: `repository:${guide.slug}`,
    slug: guide.slug,
    title: guide.title,
    body: '',
    category: guide.slug === 'review-vod-overwatch-espanol' ? 'Revisión de VOD'
      : guide.slug === 'composiciones-overwatch-5v5-6v6' ? 'Composiciones' : 'Fundamentos',
    published: true,
    created_at: guide.publishedAtIso,
  })))
}

export function isGuideDiscoverable(guide: DiscoverableGuide) {
  if (guide.published === false || reviewedGuideTarget(guide.slug)) return false
  if (Object.hasOwn(evergreenGuides, guide.slug)) return true
  if (getRankedHeroGuide(guide.slug) || hasReviewedGuideRevision(guide.slug)) return true
  // Discovery keeps a useful published article accessible while its version
  // awaits approval for Google; it must not act as an indexing approval.
  return !EXCLUDED_GUIDE_SLUGS.includes(guide.slug) && !isVideoOnlyGuide(guide) && guidePublicationIssues(guide).length === 0
}

export function discoverableGuides<T extends DiscoverableGuide>(guides: T[]): T[] {
  return guides.filter(isGuideDiscoverable).map(guide => {
    const evergreen = Object.hasOwn(evergreenGuides, guide.slug) ? evergreenGuides[guide.slug] : null
    if (evergreen) {
      return {
        ...guide,
        title: evergreen.title,
        seo_title: evergreen.seoTitle,
        seo_description: evergreen.seoDescription,
        excerpt: evergreen.quickAnswer,
        body: [evergreen.quickAnswer, ...evergreen.intro, ...evergreen.sections.flatMap(section => [...section.body, ...(section.bullets ?? [])]), ...evergreen.checklist, ...evergreen.faqs.flatMap(faq => [faq.question, faq.answer])].join('\n\n'),
        author: 'Replaid Lab',
        updated_at: evergreen.modifiedAtIso,
      }
    }
    const ranked = getRankedHeroGuide(guide.slug)
    if (ranked) {
      return {
        ...guide,
        title: ranked.title,
        seo_title: ranked.seoTitle,
        seo_description: ranked.seoDescription,
        excerpt: ranked.quickAnswer,
        author: 'Replaid Lab',
        updated_at: ranked.modifiedAt,
      }
    }
    return applyReviewedGuideRevision(guide)
  })
}
