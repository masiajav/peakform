import { expect, it } from 'vitest'
import { reviewedGuideTarget } from '@/lib/reviewed-guide-policy'
import { isGuideDiscoverable } from '@/lib/guide-discovery'
import { guideQualityDecision, isGuideAdEligible, isGuideSitemapEligible } from '@/lib/indexing-policy'
import { reviewedRoleGuides } from '@/lib/reviewed-role-guides'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'
import { STATIC_EDITORIAL_REVIEWS } from '@/lib/static-editorial-reviews'

for (const [role, slug, version] of [
  ['dps', 'dps-presion-final-blows-control-angulos', '873f2be8f4e7b16461312a6dcc3db077f0c1ce58d88e28bb2e1723c587865a42'],
  ['support', 'support-tempo-utilidad-supervivencia', '55bd803a79a37909107bac3a1d747e228af16fa075e4c685634456a9df1d8168'],
]) {
  it(`consolidates the short ${role} note without approving it or revising the complete destination`, () => {
    const target = `como-mejorar-como-${role}-overwatch`, path = `/guides/${target}`
    const source = { slug, published: true, body: 'Una explicación extensa. '.repeat(1000) }
    expect(reviewedGuideTarget(slug)).toBe(target)
    expect(isGuideDiscoverable(source)).toBe(false)
    expect(isGuideSitemapEligible(source)).toBe(false)
    expect(guideQualityDecision(source)).toMatchObject({ indexable: false, adsAllowed: false, reason: 'Alias de una guía con URL canónica propia' })
    expect(isGuideAdEligible(source)).toBe(false)
    expect(STATIC_EDITORIAL_REVIEWS[`/guides/${slug}`]).toBeUndefined()
    expect(STATIC_EDITORIAL_REVIEWS[path].version).toBe(version)
    expect(hasCurrentStaticEditorialReview(path, reviewedRoleGuides[target])).toBe(true)
    expect(reviewedRoleGuides[target].revisedAt).toBe('2026-10-18')
    expect(reviewedGuideTarget(target)).toBeUndefined()
    expect(isGuideDiscoverable({ slug: target, published: true })).toBe(true)
  })
}
