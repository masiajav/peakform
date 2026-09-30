import type { GuideContent } from './content'
import { isGuideSitemapEligible } from './indexing-policy'
import { applyReviewedGuideRevision, hasReviewedGuideRevision, reviewedGuideTarget } from './reviewed-guide-revisions'

type DiscoverableGuide = Pick<GuideContent, 'slug'> & Partial<GuideContent>

export function isGuideDiscoverable(guide: DiscoverableGuide) {
  if (guide.published === false || reviewedGuideTarget(guide.slug)) return false
  return hasReviewedGuideRevision(guide.slug) || isGuideSitemapEligible(guide)
}

export function discoverableGuides<T extends DiscoverableGuide>(guides: T[]): T[] {
  return guides.filter(isGuideDiscoverable).map(applyReviewedGuideRevision)
}
