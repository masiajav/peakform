import { expect, it, vi } from 'vitest'
import sitemap from '@/app/sitemap'

const { patches } = vi.hoisted(() => ({ patches: vi.fn() }))
vi.mock('@/lib/editorial-store', () => ({
  publishedEditorial: async () => [],
  publishedOverwatchPatches: patches,
}))
vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: () => ({
    from: () => ({
      select: () => ({ eq: () => ({ eq: async () => ({ data: [] }) }) }),
    }),
  }),
}))

const hub = 'https://www.replaidlab.com/patch-notes'

it('uses the latest revision of any listed patch as the hub modification date', async () => {
  patches.mockResolvedValue([
    { publishedAt: '2026-11-16', updatedAt: '2026-11-16' },
    { publishedAt: '2026-11-03', updatedAt: '2026-11-18' },
  ])
  const entries = await sitemap()
  expect(entries.filter(entry => entry.url === hub)).toEqual([
    expect.objectContaining({ lastModified: new Date('2026-11-18') }),
  ])
})

it('omits the hub from the sitemap when no reviewed patches are listed', async () => {
  patches.mockResolvedValue([])
  expect((await sitemap()).some(entry => entry.url === hub)).toBe(false)
})
