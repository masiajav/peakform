import { StrictMode, createElement } from 'react'
import { act, create, type ReactTestRenderer } from 'react-test-renderer'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
const state = vi.hoisted(() => ({ pathname: '/guides/reviewed' }))
vi.mock('next/navigation', () => ({ usePathname: () => state.pathname }))
vi.mock('@/components/content/AdSenseScript', () => ({ default: () => null }))
import AdSlot from '@/components/content/AdSlot'

let renderer: ReactTestRenderer | undefined
let ads: unknown[]
beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  ads = []
  vi.stubGlobal('window', { adsbygoogle: ads })
  vi.stubEnv('NEXT_PUBLIC_ADSENSE_CLIENT_ID', 'ca-pub-1234567890123456')
  vi.stubEnv('NEXT_PUBLIC_ADSENSE_APPROVED', 'true')
  vi.stubEnv('NEXT_PUBLIC_ADSENSE_CMP_READY', 'true')
  vi.stubEnv('NEXT_PUBLIC_ADSENSE_REVIEW_MODE', 'false')
  state.pathname = '/guides/reviewed'
})
afterEach(async () => { if (renderer) await act(() => renderer!.unmount()); renderer = undefined; vi.unstubAllGlobals(); vi.unstubAllEnvs() })

describe('ad request lifecycle with a mocked queue (no Google requests)', () => {
  it('does not enqueue duplicate impressions under StrictMode and refreshes on article navigation', async () => {
    // StrictMode detaches and reattaches a ref to the same DOM element.
    const nodes = new Map<string, object>()
    const createNodeMock = () => {
      if (!nodes.has(state.pathname)) nodes.set(state.pathname, {})
      return nodes.get(state.pathname)
    }
    await act(() => { renderer = create(createElement(StrictMode, null, createElement(AdSlot, { slot: '123456', allowAds: true })), { createNodeMock }) })
    expect(ads).toHaveLength(1)
    state.pathname = '/deadlock/builds/reviewed'
    await act(() => { renderer!.update(createElement(StrictMode, null, createElement(AdSlot, { slot: '123456', allowAds: true }))) })
    expect(ads).toHaveLength(2)
  })
  it('never queues a request in review mode', async () => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_REVIEW_MODE', 'true')
    await act(() => { renderer = create(createElement(AdSlot, { slot: '123456', allowAds: true }), { createNodeMock: () => ({}) }) })
    expect(renderer!.toJSON()).toBeNull()
    expect(ads).toHaveLength(0)
  })
})
