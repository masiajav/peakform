import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: () => ({ from: () => ({ select: () => ({ eq: async () => ({ data: [] }) }) }) }),
}))

import sitemap from '@/app/sitemap'
import { MAP_PILLARS } from '@/lib/overwatch-maps'
import { topicQualityDecision } from '@/lib/indexing-policy'

describe('map sitemap revision dates', () => {
  it('uses each rendered article revision ahead of an older static catalogue date', async () => {
    const entries = (await sitemap()).filter(item => item.url.startsWith('https://www.replaidlab.com/maps/'))
    const approved = ['blizzard-world', 'dorado', 'kings-row', 'lijiang-tower', 'neon-junction', 'nepal']
    expect(MAP_PILLARS).toHaveLength(30)
    expect(entries).toHaveLength(approved.length)
    expect(new Set(entries.map(item => item.url)).size).toBe(approved.length)
    expect(entries.map(item => item.url).sort()).toEqual(approved.map(slug => `https://www.replaidlab.com/maps/${slug}`).sort())
    for (const map of MAP_PILLARS) {
      const entry = entries.find(item => item.url === `https://www.replaidlab.com/maps/${map.slug}`)
      expect(topicQualityDecision('map', map.slug)).toMatchObject({ indexable: approved.includes(map.slug), adsAllowed: false })
      if (approved.includes(map.slug)) expect(entry?.lastModified, map.slug).toEqual(new Date(map.updatedAtIso))
      else expect(entry, map.slug).toBeUndefined()
    }
  })
})
