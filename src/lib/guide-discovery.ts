import type { GuideContent } from './content'
import { EXCLUDED_GUIDE_SLUGS, guidePublicationIssues, isVideoOnlyGuide } from './indexing-policy'
import { applyReviewedGuideRevision, hasReviewedGuideRevision, reviewedGuideTarget } from './reviewed-guide-revisions'
import { getRankedHeroGuide } from './ranked-hero-guides'

type DiscoverableGuide = Pick<GuideContent, 'slug'> & Partial<GuideContent>

export function isGuideDiscoverable(guide: DiscoverableGuide) {
  if (guide.published === false || reviewedGuideTarget(guide.slug)) return false
  if (getRankedHeroGuide(guide.slug) || hasReviewedGuideRevision(guide.slug)) return true
  // Discovery keeps a useful published article accessible while its version
  // awaits approval for Google; it must not act as an indexing approval.
  return !EXCLUDED_GUIDE_SLUGS.includes(guide.slug) && !isVideoOnlyGuide(guide) && guidePublicationIssues(guide).length === 0
}

export function discoverableGuides<T extends DiscoverableGuide>(guides: T[]): T[] {
  return guides.filter(isGuideDiscoverable).map(guide => {
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
