import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getHeroPillar } from '@/lib/hero-pillars'
import { staticEditorialContentVersion, hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'
import { STATIC_EDITORIAL_REVIEWS } from '@/lib/static-editorial-reviews'
import { topicQualityDecision } from '@/lib/indexing-policy'
import { absoluteUrl } from '@/lib/seo'

const { revision } = vi.hoisted(() => ({ revision: vi.fn() }))
vi.mock('@/lib/editorial-store', () => ({ editorialForPath: revision }))
import { generateMetadata } from '@/app/heroes/[hero]/page'

beforeEach(() => revision.mockReset().mockResolvedValue(null))

describe('hero search presentation', () => {
  it.each([
    { hero: 'shion', name: 'Shion', abilities: ['Execution', 'Joyride', 'Evade'] },
    { hero: 'doctrine', name: 'Doctrine', abilities: ['Imbuir', 'Cetro eterno', 'Drones vigorizantes'] },
  ])('presents $name abilities and perks without changing the reviewed pillar or eligibility', async ({ hero, name, abilities }) => {
    const pillar = getHeroPillar(hero)!
    const original = structuredClone(pillar)
    const path = `/heroes/${hero}`
    const version = staticEditorialContentVersion(path, pillar)
    expect(version).toBe(STATIC_EDITORIAL_REVIEWS[path].version)
    const metadata = await generateMetadata({ params: Promise.resolve({ hero }) })
    expect(metadata.title).toBe(`${name} en Overwatch: habilidades, perks y cómo jugar`)
    for (const ability of abilities) {
      expect(metadata.description).toContain(ability)
      expect(pillar.abilities.some(item => item.title === ability)).toBe(true)
    }
    expect(metadata.description).toContain('perks Minor y Major')
    expect(pillar.perks?.some(item => item.title.startsWith('Minor'))).toBe(true)
    expect(pillar.perks?.some(item => item.title.startsWith('Major'))).toBe(true)
    expect(metadata.description).not.toMatch(/actualizado|mejor|garantiz/i)
    expect(metadata.openGraph?.title).toBe(metadata.title)
    expect(metadata.openGraph?.description).toBe(metadata.description)
    expect(metadata.twitter?.title).toBe(metadata.title)
    expect(metadata.twitter?.description).toBe(metadata.description)
    expect(metadata.robots).toEqual({ index: true, follow: true })
    expect(metadata.alternates?.canonical).toBe(absoluteUrl(path))
    expect(hasCurrentStaticEditorialReview(path, pillar)).toBe(true)
    expect(topicQualityDecision('hero', hero)).toMatchObject({ indexable: true, adsAllowed: false })
    expect(staticEditorialContentVersion(path, pillar)).toBe(version)
    expect(pillar).toEqual(original)
  })

  it.each(['shion', 'doctrine'])('keeps %s noindex when its exact approval is missing', async hero => {
    const path = `/heroes/${hero}`
    const reviews = STATIC_EDITORIAL_REVIEWS as Record<string, unknown>
    const original = reviews[path]
    try {
      delete reviews[path]
      const metadata = await generateMetadata({ params: Promise.resolve({ hero }) })
      expect(metadata.robots).toEqual({ index: false, follow: true })
    } finally { reviews[path] = original }
  })

  it('preserves other hero metadata and gives published revisions priority', async () => {
    const ana = getHeroPillar('ana')!
    const metadata = await generateMetadata({ params: Promise.resolve({ hero: 'ana' }) })
    expect(metadata.title).toBe(ana.seoTitle)
    expect(metadata.description).toBe(ana.seoDescription)
    revision.mockResolvedValue({ title: 'Revisión publicada de Shion', description: 'Descripción de la revisión publicada', path: '/heroes/shion' })
    const published = await generateMetadata({ params: Promise.resolve({ hero: 'shion' }) })
    expect(published.title).toBe('Revisión publicada de Shion')
    expect(published.description).toBe('Descripción de la revisión publicada')
  })
})
