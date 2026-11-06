import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'
import { getHeroPillar } from '@/lib/hero-pillars'
import { heroTopicHref, safeTopicHref, PUBLIC_HERO_PAGE_SLUGS } from '@/lib/topic-links'
import { topicQualityDecision } from '@/lib/indexing-policy'

const require = createRequire(import.meta.url)
const config = require('../../next.config.js')
const equivalents = {
  pharah: '/guides/pharah-guia-overwatch-presion-aerea',
  sombra: '/guides/sombra-guia-video-overwatch',
  roadhog: '/guides/roadhog-guia-video-overwatch',
  sierra: '/guides/sierra-guia-video-overwatch',
}

describe('historical hero URLs with reviewed guide equivalents', () => {
  it('redirects exactly the four reviewed equivalents permanently to the same direct topic links', async () => {
    const redirects = await config.redirects()
    const heroRedirects = redirects.filter((rule: { source: string }) => rule.source.startsWith('/heroes'))
    expect(heroRedirects).toEqual(Object.entries(equivalents).map(([slug, destination]) => ({
      source: `/heroes/${slug}`, destination, permanent: true,
    })))
    for (const [slug, destination] of Object.entries(equivalents)) {
      expect(heroTopicHref(slug)).toBe(destination)
      expect(safeTopicHref(`/heroes/${slug}`)).toBe(destination)
      expect(getHeroPillar(slug)).toBeNull()
      expect(topicQualityDecision('hero', slug)).toMatchObject({ indexable: false, adsAllowed: false })
      expect(redirects.some((rule: { source: string }) => rule.source === destination)).toBe(false)
    }
  })

  it('keeps standalone heroes and unknown or unreviewed URLs outside the redirect list', async () => {
    const sources = (await config.redirects()).map((rule: { source: string }) => rule.source)
    for (const slug of PUBLIC_HERO_PAGE_SLUGS) {
      expect(sources).not.toContain(`/heroes/${slug}`)
      expect(heroTopicHref(slug)).toBe(`/heroes/${slug}`)
    }
    for (const slug of ['moira', 'juno', 'unknown', '__proto__']) {
      expect(sources).not.toContain(`/heroes/${slug}`)
      expect(heroTopicHref(slug)).toBe(`/guides?hero=${slug}`)
    }
    expect(sources.some((source: string) => source.includes(':'))).toBe(false)
    expect(safeTopicHref('/guides?hero=pharah')).toBe('/guides?hero=pharah')
    expect(safeTopicHref('/heroes/pharah?preview=1')).toBe('/heroes/pharah?preview=1')
  })
})
