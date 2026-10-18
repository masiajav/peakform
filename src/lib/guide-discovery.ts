import type { GuideContent } from './content'
import { EXCLUDED_GUIDE_SLUGS, guidePublicationIssues, isVideoOnlyGuide } from './indexing-policy'
import { applyReviewedGuideRevision, hasReviewedGuideRevision, reviewedGuideTarget } from './reviewed-guide-revisions'
import { getRankedHeroGuide } from './ranked-hero-guides'
import { evergreenGuideList, evergreenGuides } from './evergreen-guides'

type DiscoverableGuide = Pick<GuideContent, 'slug'> & Partial<GuideContent>

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
