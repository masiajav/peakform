import { expect, it } from 'vitest'
import { reviewedGuideTarget } from '@/lib/reviewed-guide-policy'
import { isGuideDiscoverable } from '@/lib/guide-discovery'
import { guideQualityDecision, isGuideAdEligible, isGuideSitemapEligible } from '@/lib/indexing-policy'
import { reviewedTankGuide } from '@/lib/reviewed-ranked-fundamentals'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'
import { STATIC_EDITORIAL_REVIEWS } from '@/lib/static-editorial-reviews'

it('consolidates the overlapping short Tank note without approving it or changing the reviewed destination', () => {
  const source = { slug: 'tank-crear-espacio-sin-regalar-vida', published: true, title: 'Tank: crear espacio sin regalar tu vida', body: 'Una explicación extensa. '.repeat(1000) }
  expect(reviewedGuideTarget(source.slug)).toBe(reviewedTankGuide.slug)
  expect(isGuideDiscoverable(source)).toBe(false)
  expect(isGuideSitemapEligible(source)).toBe(false)
  expect(guideQualityDecision(source)).toMatchObject({ indexable: false, adsAllowed: false, reason: 'Alias de una guía con URL canónica propia' })
  expect(isGuideAdEligible(source)).toBe(false)
  expect(STATIC_EDITORIAL_REVIEWS[`/guides/${source.slug}`]).toBeUndefined()
  expect(reviewedGuideTarget(reviewedTankGuide.slug)).toBeUndefined()
  expect(isGuideDiscoverable({ slug: reviewedTankGuide.slug, published: true })).toBe(true)
  expect(reviewedTankGuide).toMatchObject({ publishedAtIso: '2026-06-21', modifiedAtIso: '2026-10-18' })
  expect(hasCurrentStaticEditorialReview(`/guides/${reviewedTankGuide.slug}`, reviewedTankGuide)).toBe(true)
})
