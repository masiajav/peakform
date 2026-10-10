import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const fixtures = vi.hoisted(() => ({
  reviews: {} as Record<string, unknown>,
  slot: vi.fn(),
}))

vi.mock('@/lib/static-editorial-reviews', () => ({ STATIC_EDITORIAL_REVIEWS: fixtures.reviews }))
vi.mock('@/components/content/AdSlot', () => ({
  default: (props: { allowAds?: boolean }) => {
    fixtures.slot(props.allowAds)
    return null
  },
}))

import EvergreenGuideArticle from '@/components/content/EvergreenGuideArticle'
import { evergreenGuides, type EvergreenGuide } from '@/lib/evergreen-guides'
import { staticEditorialContentVersion } from '@/lib/static-editorial-review'

const guide = evergreenGuides['como-subir-de-rango-overwatch']
const path = `/guides/${guide.slug}`

function approve(content: EvergreenGuide = guide) {
  fixtures.reviews[path] = {
    path,
    version: staticEditorialContentVersion(path, content),
    reviewedAt: '2026-10-06',
    reviewer: 'Test fixture only',
    evidence: 'docs/test-editorial-review.md',
    checks: { specific: true, accurate: true, links: true, visual: true },
  }
}

beforeEach(() => {
  for (const key of Object.keys(fixtures.reviews)) delete fixtures.reviews[key]
  fixtures.slot.mockClear()
})

describe('evergreen article advertising review', () => {
  for (const [slug, content] of Object.entries(evergreenGuides)) {
    it(`${slug} does not approve ads just because the route exists`, () => {
      renderToStaticMarkup(createElement(EvergreenGuideArticle, { guide: content }))
      expect(fixtures.slot).toHaveBeenCalledExactlyOnceWith(false)
    })
  }

  it('keeps advertising disabled even for the current reviewed version', () => {
    approve()
    renderToStaticMarkup(createElement(EvergreenGuideArticle, { guide }))
    expect(fixtures.slot).toHaveBeenCalledExactlyOnceWith(false)
  })

  it('invalidates advertising approval when article text changes', () => {
    approve()
    const changed = { ...guide, intro: [...guide.intro, 'A changed paragraph.'] }
    renderToStaticMarkup(createElement(EvergreenGuideArticle, { guide: changed }))
    expect(fixtures.slot).toHaveBeenCalledExactlyOnceWith(false)
  })

  it('does not reuse approval from another route', () => {
    approve()
    const changed = { ...guide, slug: 'another-article' }
    renderToStaticMarkup(createElement(EvergreenGuideArticle, { guide: changed }))
    expect(fixtures.slot).toHaveBeenCalledExactlyOnceWith(false)
  })

  it('rejects an incomplete review even with the matching content hash', () => {
    approve()
    const review = fixtures.reviews[path] as { checks: { visual: boolean } }
    review.checks.visual = false
    renderToStaticMarkup(createElement(EvergreenGuideArticle, { guide }))
    expect(fixtures.slot).toHaveBeenCalledExactlyOnceWith(false)
  })
})
