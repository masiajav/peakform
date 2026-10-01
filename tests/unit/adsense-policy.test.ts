import { describe, expect, it } from 'vitest'
import { adsenseVerificationAccount, canLoadAdSense } from '@/lib/adsense-policy'

const config = { clientId: 'ca-pub-1234567890123456', approved: 'true', cmpReady: 'true', reviewMode: 'false' }
const editorial = '/guides/como-mejorar-en-overwatch'

describe('AdSense verification and inventory', () => {
  it('verifies only a complete publisher ID, without implying ad approval', () => {
    expect(adsenseVerificationAccount(config.clientId)).toBe(config.clientId)
    for (const id of [undefined, '', 'ca-pub-...', 'pub-1234567890123456', 'ca-pub-1234567890123456<script>']) {
      expect(adsenseVerificationAccount(id)).toBeUndefined()
      expect(canLoadAdSense({ ...config, clientId: id }, editorial)).toBe(false)
    }
    expect(canLoadAdSense({ clientId: config.clientId }, editorial)).toBe(false)
  })

  it('review mode forbids ad execution even when approval and CMP flags are true', () => {
    expect(canLoadAdSense(config, editorial)).toBe(true)
    expect(canLoadAdSense({ ...config, reviewMode: 'true' }, editorial)).toBe(false)
    expect(canLoadAdSense({ ...config, approved: 'false' }, editorial)).toBe(false)
    expect(canLoadAdSense({ ...config, cmpReady: 'false' }, editorial)).toBe(false)
    expect(canLoadAdSense({ ...config, approved: undefined }, editorial)).toBe(false)
  })

  it('never enables ads on navigation, unreviewed content or transaction screens', () => {
    for (const path of ['/', '/guides', '/heroes', '/maps', '/privacy', '/login', '/dashboard', '/orders/123', '/experts/ivajpro', '/checkout', '/guides/torbjorn-guia-video-overwatch', '/guides/orisa-guia-overwatch-fortify-javelin']) {
      expect(canLoadAdSense(config, path), path).toBe(false)
    }
  })
})
