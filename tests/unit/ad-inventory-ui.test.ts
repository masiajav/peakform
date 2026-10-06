import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const navigation = vi.hoisted(() => ({ path: '/guides/guia-revisada' }))
vi.mock('next/navigation', () => ({ usePathname: () => navigation.path }))
vi.mock('next/script', () => ({ default: (props: { src: string; id: string }) => createElement('script', props) }))

import AdSlot from '@/components/content/AdSlot'
import AdSenseScript from '@/components/content/AdSenseScript'

beforeEach(() => {
  navigation.path = '/guides/guia-revisada'
  vi.stubEnv('NEXT_PUBLIC_ADSENSE_CLIENT_ID', 'ca-pub-1234567890123456')
  vi.stubEnv('NEXT_PUBLIC_ADSENSE_APPROVED', 'true')
  vi.stubEnv('NEXT_PUBLIC_ADSENSE_CMP_READY', 'true')
  vi.stubEnv('NEXT_PUBLIC_ADSENSE_REVIEW_MODE', 'false')
})
afterEach(() => vi.unstubAllEnvs())

describe('per-article AdSense components', () => {
  it('renders neither a placeholder nor a script without explicit article approval', () => {
    expect(renderToStaticMarkup(createElement(AdSlot, { slot: '123' }))).toBe('')
    expect(renderToStaticMarkup(createElement(AdSenseScript))).toBe('')
    expect(renderToStaticMarkup(createElement(AdSlot, { slot: '123', allowAds: false }))).toBe('')
  })

  it('keeps both the slot and its script gated by review mode', () => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_REVIEW_MODE', 'true')
    expect(renderToStaticMarkup(createElement(AdSlot, { slot: '123', allowAds: true }))).toBe('')
    expect(renderToStaticMarkup(createElement(AdSenseScript, { allowAds: true }))).toBe('')
  })

  it('places the loader with an explicitly approved article slot, not in the global layout', () => {
    const html = renderToStaticMarkup(createElement(AdSlot, { slot: '123', allowAds: true }))
    expect(html).toContain('id="adsense-script"')
    expect(html).toContain('data-ad-slot="123"')
    expect(html).toContain('class="adsbygoogle"')
  })

  it('never renders an ad loader for an invalid or absent slot', () => {
    expect(renderToStaticMarkup(createElement(AdSlot, { allowAds: true }))).toBe('')
    expect(renderToStaticMarkup(createElement(AdSlot, { allowAds: true, slot: '123<script>' }))).toBe('')
  })

  it('still excludes hubs and transaction routes when a caller mistakenly passes approval', () => {
    for (const path of ['/', '/guides', '/news', '/dashboard', '/experts/coach', '/orders/123', '/privacy']) {
      navigation.path = path
      expect(renderToStaticMarkup(createElement(AdSlot, { allowAds: true, slot: '123' })), path).toBe('')
      expect(renderToStaticMarkup(createElement(AdSenseScript, { allowAds: true })), path).toBe('')
    }
  })
})
