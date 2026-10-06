import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { StaticEditorialReview } from '@/lib/static-editorial-review'

const fixture = vi.hoisted(() => ({ reviews: {} as Record<string, StaticEditorialReview>, guides: [] as object[] }))
vi.mock('@/lib/static-editorial-reviews', () => ({ STATIC_EDITORIAL_REVIEWS: fixture.reviews }))
vi.mock('@/lib/supabase/admin', () => ({ createAdminClient: () => ({ from: (table: string) => ({ select: () => ({ eq: async () => ({ data: table === 'guides' ? fixture.guides : [] }) }) }) }) }))
import sitemap from '@/app/sitemap'
import { rankedHeroGuides } from '@/lib/ranked-hero-guides'
import { staticEditorialContentVersion } from '@/lib/static-editorial-review'

beforeEach(() => {
  fixture.guides = rankedHeroGuides.map(guide => ({ slug: guide.slug, published: true, created_at: '2026-05-10', updated_at: '2026-06-28', body: 'contenido '.repeat(3000) }))
  for (const key of Object.keys(fixture.reviews)) delete fixture.reviews[key]
})

describe('ranked sitemap follows the rendered version', () => {
  it('does not index unreviewed ranked routes through either static or database branches', async () => {
    const urls = (await sitemap()).map(item => item.url)
    for (const guide of rankedHeroGuides) expect(urls).not.toContain(`https://www.replaidlab.com/guides/${guide.slug}`)
  })

  it('emits each individually reviewed guide once, with its actual article revision date', async () => {
    const guide = rankedHeroGuides[0]
    const path = `/guides/${guide.slug}`
    fixture.reviews[path] = {
      path, version: staticEditorialContentVersion(path, guide), reviewedAt: '2026-10-05',
      reviewer: 'test-fixture', evidence: 'docs/content-research-ranked-2026-10-05.md',
      checks: { specific: true, accurate: true, links: true, visual: true },
    }
    const entries = (await sitemap()).filter(item => item.url === `https://www.replaidlab.com${path}`)
    expect(entries).toHaveLength(1)
    expect(entries[0].lastModified).toEqual(new Date('2026-10-05'))
    const other = rankedHeroGuides[1]
    expect((await sitemap()).map(item => item.url)).not.toContain(`https://www.replaidlab.com/guides/${other.slug}`)
  })
})
