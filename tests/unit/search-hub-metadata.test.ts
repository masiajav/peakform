import { describe, expect, it } from 'vitest'
import { metadata as counters } from '@/app/counters/page'
import { metadata as maps } from '@/app/maps/page'
import { generateMetadata } from '@/app/heroes/page'
import { absoluteUrl } from '@/lib/seo'

describe('search hub presentation', () => {
  it('keeps canonical and social metadata aligned with the hub offer', async () => {
    const heroes = await generateMetadata({ searchParams: Promise.resolve({}) })
    for (const [path, metadata] of [['/counters', counters], ['/maps', maps], ['/heroes', heroes]] as const) {
      expect(metadata.alternates?.canonical).toBe(absoluteUrl(path))
      expect(metadata.openGraph?.title).toBe(metadata.title)
      expect(metadata.openGraph?.description).toBe(metadata.description)
      expect(metadata.twitter?.title).toBe(metadata.title)
      expect(metadata.twitter?.description).toBe(metadata.description)
    }
    expect(counters.description).toContain('filtra por tu rol en Pick Lab')
    expect(maps.description).toContain('guías disponibles')
    expect(heroes.description).toContain('Tank, DPS y Support')
  })
})
