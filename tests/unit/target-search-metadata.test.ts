import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getCounterPillar } from '@/lib/seo-clusters'
import { evergreenGuides } from '@/lib/evergreen-guides'
import { hasCurrentStaticEditorialReview, staticEditorialContentVersion } from '@/lib/static-editorial-review'
import { STATIC_EDITORIAL_REVIEWS } from '@/lib/static-editorial-reviews'
import { absoluteUrl } from '@/lib/seo'

const { revision } = vi.hoisted(() => ({ revision: vi.fn() }))
vi.mock('@/lib/editorial-store', () => ({ editorialForPath: revision }))
import { generateMetadata as counterMetadata } from '@/app/counters/[hero]/page'
import { generateMetadata as guideMetadata } from '@/app/guides/composiciones-overwatch-5v5-6v6/page'

beforeEach(() => revision.mockReset().mockResolvedValue(null))

const targets = [
  { path: '/counters/reinhardt', source: getCounterPillar('reinhardt')!, title: 'Counters de Reinhardt: qué jugar en Overwatch', metadata: () => counterMetadata({ params: Promise.resolve({ hero: 'reinhardt' }) }) },
  { path: '/guides/composiciones-overwatch-5v5-6v6', source: evergreenGuides['composiciones-overwatch-5v5-6v6'], title: 'Composiciones de Overwatch 5v5 y 6v6: dive, poke y brawl', metadata: guideMetadata },
]

describe('target search presentation preserves editorial authorization', () => {
  it.each(targets)('presents $path without modifying its approved source or dates', async target => {
    const original = structuredClone(target.source)
    const version = staticEditorialContentVersion(target.path, target.source)
    const metadata = await target.metadata()
    expect(metadata.title).toBe(target.title)
    expect(metadata.openGraph?.title).toBe(metadata.title)
    expect(metadata.openGraph?.description).toBe(metadata.description)
    expect(metadata.twitter?.title).toBe(metadata.title)
    expect(metadata.twitter?.description).toBe(metadata.description)
    expect(metadata.alternates?.canonical).toBe(absoluteUrl(target.path))
    expect(metadata.robots).not.toEqual({ index: false, follow: true })
    expect(hasCurrentStaticEditorialReview(target.path, target.source)).toBe(true)
    expect(staticEditorialContentVersion(target.path, target.source)).toBe(version)
    expect(target.source).toEqual(original)
  })

  it.each(targets)('keeps $path noindex when its original approval is missing', async target => {
    const reviews = STATIC_EDITORIAL_REVIEWS as Record<string, unknown>
    const original = reviews[target.path]
    try {
      delete reviews[target.path]
      expect((await target.metadata()).robots).toEqual({ index: false, follow: true })
    } finally { reviews[target.path] = original }
  })

  it.each(targets)('gives a published revision priority for $path', async target => {
    revision.mockResolvedValue({ title: 'Revisión publicada', description: 'Descripción publicada', path: target.path })
    const metadata = await target.metadata()
    expect(metadata.title).toBe('Revisión publicada')
    expect(metadata.description).toBe('Descripción publicada')
    expect(metadata.openGraph?.description).toBe('Descripción publicada')
    expect(metadata.twitter?.title).toBe('Revisión publicada')
  })

  it('keeps concrete counter picks and distinguishes the three composition styles', async () => {
    const counter = await targets[0].metadata()
    for (const pick of ['Orisa', 'Bastion', 'Mei', 'Ana']) expect(counter.description).toContain(pick)
    expect((await targets[1].metadata()).description).toBe('Dive entra con movilidad, poke presiona a distancia y brawl pelea de cerca. Compara ejemplos de composiciones 5v5 y 6v6 y adapta el plan al mapa.')
  })
})
