import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: () => ({ from: () => ({ select: () => ({ eq: async () => ({ data: [] }) }) }) }),
}))

import sitemap from '@/app/sitemap'
import { MAP_PILLARS } from '@/lib/overwatch-maps'

describe('map sitemap revision dates', () => {
  it('uses each rendered article revision ahead of an older static catalogue date', async () => {
    const entries = (await sitemap()).filter(item => item.url.startsWith('https://www.replaidlab.com/maps/'))
    expect(entries).toHaveLength(30)
    expect(new Set(entries.map(item => item.url)).size).toBe(30)
    expect(entries.map(item => item.url).sort()).toEqual(MAP_PILLARS.map(map => `https://www.replaidlab.com/maps/${map.slug}`).sort())
    for (const map of MAP_PILLARS) {
      const entry = entries.find(item => item.url === `https://www.replaidlab.com/maps/${map.slug}`)!
      expect(entry.lastModified, map.slug).toEqual(new Date(map.updatedAtIso))
    }
  })
})
