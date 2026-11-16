import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'
import redirects from '../../src/lib/legacy-topic-guide-redirects.json'
import { reviewedGuideTarget } from '@/lib/reviewed-guide-policy'
import { discoverableGuides } from '@/lib/guide-discovery'
import { evergreenGuides } from '@/lib/evergreen-guides'
import { evergreenGuideQualityDecision, isGuideSitemapEligible } from '@/lib/indexing-policy'

describe('individually compared legacy topics', () => {
  for (const [source, destination] of Object.entries(redirects)) {
    it(`consolidates ${source} into one complete canonical guide`, async () => {
      const config = createRequire(import.meta.url)('../../next.config.js')
      const rules = await config.redirects()
      expect(rules.filter((rule: { source: string }) => rule.source === `/guides/${source}`)).toEqual([
        { source: `/guides/${source}`, destination: `/guides/${destination}`, permanent: true },
      ])
      expect(rules.some((rule: { source: string }) => rule.source === `/guides/${destination}`)).toBe(false)
      expect(reviewedGuideTarget(source)).toBe(destination)
      expect(reviewedGuideTarget(source + '-extra')).toBeUndefined()
      expect(discoverableGuides([{ slug: source, published: true }])).toEqual([])
      expect(isGuideSitemapEligible({ slug: source })).toBe(false)
      expect(evergreenGuideQualityDecision(evergreenGuides[destination])).toMatchObject({ indexable: true, adsAllowed: true })
      expect(evergreenGuides[destination].publishedAtIso).toBe(destination === 'como-mejorar-en-overwatch' ? '2026-06-01' : '2026-08-29')
    })
  }
})
