import { describe, expect, it } from 'vitest'
import { adsenseVerificationAccount, canLoadAdSense } from '@/lib/adsense-policy'
import { REPLAID_ADSENSE_PUBLISHER, resolveAdSlot } from '@/lib/adsense-slots'

const config = { clientId: 'ca-pub-1234567890123456', approved: 'true', cmpReady: 'true', reviewMode: 'false' }
const editorial = '/guides/como-mejorar-en-overwatch'

describe('AdSense verification and inventory', () => {
  it('shares the verified account slots while honoring explicit overrides and other publishers', () => {
    expect(resolveAdSlot('guide-after-summary', REPLAID_ADSENSE_PUBLISHER, {})).toBe('4100872939')
    expect(resolveAdSlot('guide-after-video', REPLAID_ADSENSE_PUBLISHER, {})).toBe('2787791265')
    expect(resolveAdSlot('guide-sidebar-rectangle', REPLAID_ADSENSE_PUBLISHER, {})).toBe('6535464588')
    expect(resolveAdSlot('guide-after-summary', config.clientId, {})).toBeNull()
    expect(resolveAdSlot('guide-after-summary', REPLAID_ADSENSE_PUBLISHER, { 'guide-after-summary': '' })).toBeNull()
    expect(resolveAdSlot('guide-after-summary', config.clientId, { 'guide-after-summary': '1234' })).toBe('1234')
    expect(resolveAdSlot('guides-grid-1', config.clientId, { 'guides-grid': 'invalid' })).toBeNull()
  })
  it('verifies only a complete publisher ID, without implying ad approval', () => {
    expect(adsenseVerificationAccount(config.clientId)).toBe(config.clientId)
    for (const id of [undefined, '', 'ca-pub-...', 'pub-1234567890123456', 'ca-pub-1234567890123456<script>']) {
      expect(adsenseVerificationAccount(id)).toBeUndefined()
      expect(canLoadAdSense({ ...config, clientId: id }, editorial)).toBe(false)
    }
    expect(canLoadAdSense({ clientId: config.clientId }, editorial)).toBe(false)
  })

  it('review mode forbids ad execution even when approval and CMP flags are true', () => {
    expect(canLoadAdSense(config, editorial)).toBe(false)
    expect(canLoadAdSense(config, editorial, true)).toBe(true)
    expect(canLoadAdSense({ ...config, reviewMode: 'true' }, editorial, true)).toBe(false)
    expect(canLoadAdSense({ ...config, approved: 'false' }, editorial, true)).toBe(false)
    expect(canLoadAdSense({ ...config, cmpReady: 'false' }, editorial, true)).toBe(false)
    expect(canLoadAdSense({ ...config, approved: undefined }, editorial, true)).toBe(false)
  })

  it('requires per-article approval, not a strategic URL, and rejects non-editorial placements', () => {
    for (const path of [editorial, '/guides/como-jugar-ana-ranked-overwatch', '/news/articulo-revisado', '/deadlock/guides/almas', '/deadlock/builds/haze', '/deadlock/news/parche', '/deadlock/patch-notes/ajustes']) {
      expect(canLoadAdSense(config, path)).toBe(false)
      expect(canLoadAdSense(config, path, true)).toBe(true)
      expect(canLoadAdSense(config, `${path}?filter=ana`, true)).toBe(false)
      expect(canLoadAdSense({ ...config, reviewMode: 'true' }, path, true)).toBe(false)
      expect(canLoadAdSense({ ...config, approved: 'false' }, path, true)).toBe(false)
      expect(canLoadAdSense({ ...config, cmpReady: 'false' }, path, true)).toBe(false)
    }
    for (const path of ['/', '/guides', '/news', '/experts/coach', '/dashboard', '/orders/123', '/privacy', '/heroes/ana', '/tools/checklist', '/guides/nested/route', '/deadlock', '/deadlock/guides', '/deadlock/heroes/haze', '/deadlock/counters/haze', '/deadlock/maps/ciudad', '/editorial-preview/123', '/deadlock/builds/haze/nested', '/deadlock/builds/-', '/deadlock/builds/haze#faq']) {
      expect(canLoadAdSense(config, path, true)).toBe(false)
    }
  })

  it('never enables ads on navigation, unreviewed content or transaction screens', () => {
    for (const path of ['/', '/guides', '/heroes', '/maps', '/privacy', '/login', '/dashboard', '/orders/123', '/experts/ivajpro', '/checkout', '/guides/torbjorn-guia-video-overwatch', '/guides/orisa-guia-overwatch-fortify-javelin']) {
      expect(canLoadAdSense(config, path), path).toBe(false)
    }
  })
})
