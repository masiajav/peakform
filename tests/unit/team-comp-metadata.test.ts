import { describe, expect, it } from 'vitest'
import { generateMetadata } from '@/app/team-comps/[hero]/page'
import { absoluteUrl } from '@/lib/seo'

describe('composition metadata follows the publication decision', () => {
  it('explicitly indexes only the individually approved compositions', async () => {
    for (const hero of ['tracer', 'zarya']) {
      const metadata = await generateMetadata({ params: Promise.resolve({ hero }) })
      expect(metadata.robots).toEqual({ index: true, follow: true })
      expect(metadata.alternates?.canonical).toBe(absoluteUrl(`/team-comps/${hero}`))
    }
  })

  it('does not index an existing composition without an exact review', async () => {
    for (const hero of ['ana', 'genji', 'kiriko', 'dva', 'doctrine']) {
      const metadata = await generateMetadata({ params: Promise.resolve({ hero }) })
      expect(metadata.robots).toEqual({ index: false, follow: true })
      expect(metadata.alternates?.canonical).toBe(absoluteUrl(`/team-comps/${hero}`))
    }
  })

  it('does not generate indexable metadata for an unknown hero', async () => {
    expect(await generateMetadata({ params: Promise.resolve({ hero: 'unknown-hero' }) })).toEqual({})
  })
})
