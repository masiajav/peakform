import { createElement } from 'react'
import { act, create, type ReactTestRenderer } from 'react-test-renderer'
import { afterEach, describe, expect, it, vi } from 'vitest'
const sdk = vi.hoisted(() => ({ createClient: vi.fn() }))
vi.mock('@supabase/supabase-js', () => ({ createClient: sdk.createClient }))
import { connectReaderPresence, countReaders, readerChannelForHost, READER_CHANNEL, type ReaderChannel, type ReaderClient, type ReaderPresence } from '@/lib/reader-presence'
import { useReaderPresence } from '@/lib/use-reader-presence'

function setup() {
  let sync = () => {}
  let status = (_status: string) => {}
  const channel: ReaderChannel = {
    on: vi.fn((_type, _filter, cb) => { sync = cb; return channel }),
    subscribe: vi.fn(cb => { status = cb; return channel }),
    presenceState: vi.fn(() => ({ a: [{ site: 'replaidlab' }], b: [{ site: 'replaidlab' }] })),
    track: vi.fn(async () => 'ok'),
    untrack: vi.fn(async () => 'ok'),
  }
  const client: ReaderClient = { channel: vi.fn(() => channel), removeChannel: vi.fn(async () => {}) }
  const changes: ReaderPresence[] = []
  return { channel, client, changes, sync: () => sync(), status: (value: string) => status(value), onChange: (value: ReaderPresence) => changes.push(value) }
}

// Queued exclusive locks, shared by all simulated tabs in the same origin.
function lockManager(): Pick<LockManager, 'request'> {
  const tails = new Map<string, Promise<unknown>>()
  return { request: vi.fn((name: string, options: LockOptions, callback: LockGrantedCallback) => {
    const task = (tails.get(name) ?? Promise.resolve()).then(() => {
      if (options.signal?.aborted) throw new Error('Aborted')
      return callback({ name, mode: 'exclusive' } as Lock)
    })
    tails.set(name, task.catch(() => {}))
    return task
  }) } as Pick<LockManager, 'request'>
}
const flush = async () => { for (let i = 0; i < 12; i++) await Promise.resolve() }
let renderer: ReactTestRenderer | undefined
afterEach(async () => {
  if (renderer) await act(() => renderer!.unmount())
  renderer = undefined
  vi.useRealTimers(); vi.unstubAllGlobals(); vi.unstubAllEnvs()
})

describe('public reader presence', () => {
  it('isolates localhost, previews and lookalike hosts from production', () => {
    expect(READER_CHANNEL).toBe('replaid-visitors-v2')
    for (const host of ['www.replaidlab.com', 'replaidlab.com']) expect(readerChannelForHost(host)).toBe(READER_CHANNEL)
    for (const host of ['localhost', '127.0.0.1', 'preview.vercel.app', 'replaidlab.com.evil.test', 'other.replaidlab.com', '']) {
      expect(readerChannelForHost(host)).toBe('replaid-visitors-preview-v2')
    }
  })
  it('uses the selected channel for both subscription and election', async () => {
    const s = setup(), locks = lockManager()
    const stop = connectReaderPresence({ ...s, key: 'a', locks, channelName: 'preview' })
    s.status('SUBSCRIBED'); await flush()
    expect(s.client.channel).toHaveBeenCalledWith('preview', expect.any(Object))
    expect(locks.request).toHaveBeenCalledWith('preview:replaidlab', expect.any(Object), expect.any(Function))
    stop(); await flush()
  })
  it('counts each valid site key once and ignores malformed and legacy game payloads', () => {
    expect(countReaders({
      a: [{ site: 'replaidlab' }, { site: 'replaidlab' }],
      b: [{ site: 'replaidlab' }, { site: 'replaidlab' }],
      c: [{ game: 'overwatch' }, { game: 'deadlock' }, null, 'replaidlab', { site: 'unknown' }], d: null,
      e: [{ site: null }, ['replaidlab']], f: { site: 'replaidlab' },
    })).toBe(2)
  })
  it('waits for subscription AND server sync; every page participates', async () => {
    const s = setup()
    const stop = connectReaderPresence({ ...s, key: 'ephemeral', locks: lockManager() })
    expect(s.changes.at(-1)).toEqual({ count: null, status: 'connecting' })
    s.status('SUBSCRIBED')
    expect(s.changes.at(-1)?.count).toBeNull()
    s.sync()
    expect(s.changes.at(-1)).toEqual({ count: 2, status: 'connected' })
    await flush()
    expect(s.channel.track).toHaveBeenCalledExactlyOnceWith({ site: 'replaidlab' })
    stop(); await flush()
    expect(s.channel.untrack).toHaveBeenCalledOnce()
    expect(s.client.removeChannel).toHaveBeenCalledOnce()
  })
  it('waits for subscription when server sync arrives first, then updates the total', async () => {
    const s = setup(), stop = connectReaderPresence({ ...s, key: 'a', locks: lockManager() })
    s.sync()
    expect(s.changes.at(-1)).toEqual({ count: null, status: 'connecting' })
    s.status('SUBSCRIBED')
    expect(s.changes.at(-1)).toEqual({ count: 2, status: 'connected' })
    vi.mocked(s.channel.presenceState).mockReturnValue({})
    s.sync()
    expect(s.changes.at(-1)).toEqual({ count: 0, status: 'connected' })
    stop(); await flush()
  })
  it('elects one visible publisher across tabs on different pages and hands over after cleanup', async () => {
    const locks = lockManager()
    const a = setup(), b = setup(), c = setup()
    const stopA = connectReaderPresence({ ...a, key: 'a', locks })
    const stopB = connectReaderPresence({ ...b, key: 'b', locks })
    const stopC = connectReaderPresence({ ...c, key: 'c', locks })
    for (const s of [a, b, c]) { s.status('SUBSCRIBED'); s.sync() }
    await flush()
    expect(a.channel.track).toHaveBeenCalledExactlyOnceWith({ site: 'replaidlab' })
    expect(b.channel.track).not.toHaveBeenCalled()
    expect(c.channel.track).not.toHaveBeenCalled()
    stopA(); await flush()
    expect(b.channel.track).toHaveBeenCalledExactlyOnceWith({ site: 'replaidlab' })
    stopB(); stopC(); await flush()
  })
  it('holds the global election until the previous publisher finishes removal', async () => {
    const locks = lockManager(), a = setup(), b = setup()
    let removed!: () => void
    vi.mocked(a.client.removeChannel).mockReturnValue(new Promise<void>(resolve => { removed = resolve }))
    const stopA = connectReaderPresence({ ...a, key: 'a', locks })
    const stopB = connectReaderPresence({ ...b, key: 'b', locks })
    a.status('SUBSCRIBED'); b.status('SUBSCRIBED'); await flush()
    stopA(); await flush()
    expect(b.channel.track).not.toHaveBeenCalled()
    removed(); await flush()
    expect(b.channel.track).toHaveBeenCalledExactlyOnceWith({ site: 'replaidlab' })
    stopB(); await flush()
  })
  it('keeps production and preview elections independent', async () => {
    const locks = lockManager(), a = setup(), b = setup()
    const stopA = connectReaderPresence({ ...a, key: 'a', locks, channelName: READER_CHANNEL })
    const stopB = connectReaderPresence({ ...b, key: 'b', locks, channelName: readerChannelForHost('localhost') })
    a.status('SUBSCRIBED'); b.status('SUBSCRIBED'); await flush()
    expect(a.channel.track).toHaveBeenCalledExactlyOnceWith({ site: 'replaidlab' })
    expect(b.channel.track).toHaveBeenCalledExactlyOnceWith({ site: 'replaidlab' })
    stopA(); stopB(); await flush()
  })
  it('cancels queued tabs and ignores callbacks after cleanup', async () => {
    const locks = lockManager(), a = setup(), b = setup()
    const stopA = connectReaderPresence({ ...a, key: 'a', locks })
    const stopB = connectReaderPresence({ ...b, key: 'b', locks })
    a.status('SUBSCRIBED'); b.status('SUBSCRIBED'); await flush()
    stopB(); const length = b.changes.length
    b.sync(); b.status('CHANNEL_ERROR'); stopA(); await flush()
    expect(b.channel.track).not.toHaveBeenCalled()
    expect(b.changes).toHaveLength(length)
  })
  it.each(['CHANNEL_ERROR', 'TIMED_OUT', 'CLOSED'])('clears stale counts on %s', async error => {
    const s = setup(), stop = connectReaderPresence({ ...s, key: 'a', locks: lockManager() })
    s.status('SUBSCRIBED'); s.sync(); s.status(error); await flush()
    expect(s.changes.at(-1)).toEqual({ count: null, status: 'unavailable' })
    expect(s.client.removeChannel).toHaveBeenCalledOnce()
    stop()
  })
  it('returns unavailable on timeout or unsupported deduplication, never invented zero', async () => {
    vi.useFakeTimers()
    const s = setup(), stop = connectReaderPresence({ ...s, key: 'a', locks: lockManager(), timeoutMs: 100 })
    s.status('SUBSCRIBED'); vi.advanceTimersByTime(100); await flush()
    expect(s.changes.at(-1)).toEqual({ count: null, status: 'unavailable' })
    stop()
    const unsupported = setup()
    connectReaderPresence({ ...unsupported, key: 'a' })()
    expect(unsupported.client.channel).not.toHaveBeenCalled()
    expect(unsupported.changes.at(-1)?.status).toBe('unavailable')
  })
  it('fails closed when publishing fails and releases the election', async () => {
    const locks = lockManager(), s = setup()
    vi.mocked(s.channel.track).mockResolvedValue('error')
    const stop = connectReaderPresence({ ...s, key: 'a', locks })
    s.status('SUBSCRIBED'); s.sync(); await flush()
    expect(s.changes.at(-1)).toEqual({ count: null, status: 'unavailable' })
    expect(s.client.removeChannel).toHaveBeenCalledOnce()
    stop()
  })
})

describe('reader hook visibility and recovery', () => {
  function browser() {
    const doc = Object.assign(new EventTarget(), { visibilityState: 'visible' })
    const win = Object.assign(new EventTarget(), { location: { hostname: 'localhost' } })
    vi.stubGlobal('document', doc); vi.stubGlobal('window', win)
    vi.stubGlobal('navigator', { locks: lockManager() })
    vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'public-test-key')
    const sessions: ReturnType<typeof setup>[] = []
    const disconnected = vi.fn()
    sdk.createClient.mockReset().mockImplementation(() => {
      const s = setup(); sessions.push(s)
      return { ...s.client, realtime: { disconnect: disconnected } }
    })
    return { doc, win, sessions, disconnected }
  }
  let value: ReaderPresence
  const renders: ReaderPresence[] = []
  function Probe({ enabled = true }: { enabled?: boolean; section?: string }) {
    value = useReaderPresence(enabled)
    renders.push(value)
    return null
  }
  it('creates anonymous clients, leaves hidden pages and resumes visible pages', async () => {
    const b = browser()
    await act(() => { renderer = create(createElement(Probe)) })
    expect(sdk.createClient).toHaveBeenCalledWith(expect.any(String), expect.any(String), {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    })
    expect(b.sessions[0].client.channel).toHaveBeenCalledWith('replaid-visitors-preview-v2', expect.any(Object))
    await act(async () => { b.sessions[0].status('SUBSCRIBED'); b.sessions[0].sync(); await flush() })
    expect(value!.status).toBe('connected')
    await act(async () => { b.doc.visibilityState = 'hidden'; b.doc.dispatchEvent(new Event('visibilitychange')); await flush() })
    expect(value!.count).toBeNull()
    expect(b.sessions[0].client.removeChannel).toHaveBeenCalledOnce()
    expect(b.disconnected).toHaveBeenCalledOnce()
    await act(() => { b.doc.visibilityState = 'visible'; b.doc.dispatchEvent(new Event('visibilitychange')) })
    expect(b.sessions).toHaveLength(2)
    await act(async () => { renderer!.update(createElement(Probe, { enabled: false })); await flush() })
    expect(value!.status).toBe('unavailable')
    expect(b.sessions[1].client.removeChannel).toHaveBeenCalledOnce()
  })
  it('leaves on pagehide, ignores visibility while suspended and reconnects after bfcache restore', async () => {
    const b = browser()
    await act(() => { renderer = create(createElement(Probe)) })
    await act(async () => { b.sessions[0].status('SUBSCRIBED'); b.sessions[0].sync(); await flush() })
    await act(async () => { b.win.dispatchEvent(new Event('pagehide')); await flush() })
    expect(value!).toEqual({ count: null, status: 'unavailable' })
    expect(b.sessions[0].client.removeChannel).toHaveBeenCalledOnce()
    await act(() => { b.doc.dispatchEvent(new Event('visibilitychange')) })
    expect(b.sessions).toHaveLength(1)
    await act(() => { b.win.dispatchEvent(new Event('pageshow')) })
    expect(b.sessions).toHaveLength(2)
    expect(value!).toEqual({ count: null, status: 'connecting' })
    await act(() => { b.sessions[1].status('SUBSCRIBED'); b.sessions[1].sync() })
    expect(value!.status).toBe('connected')
  })
  it('keeps the site connection across section changes and invalidates reactivation until a fresh sync', async () => {
    const b = browser()
    await act(() => { renderer = create(createElement(Probe, { section: 'overwatch' })) })
    await act(async () => { b.sessions[0].status('SUBSCRIBED'); b.sessions[0].sync(); await flush() })
    expect(value!.status).toBe('connected')
    await act(() => { renderer!.update(createElement(Probe, { section: 'deadlock' })) })
    await act(() => { renderer!.update(createElement(Probe, { section: 'home' })) })
    expect(b.sessions).toHaveLength(1)
    expect(b.sessions[0].channel.track).toHaveBeenCalledExactlyOnceWith({ site: 'replaidlab' })
    expect(value!.count).toBe(2)
    await act(() => { renderer!.update(createElement(Probe, { enabled: false })) })
    renders.length = 0
    await act(() => { renderer!.update(createElement(Probe, { enabled: true })) })
    expect(renders[0]).toEqual({ count: null, status: 'connecting' })
    expect(value!.count).toBeNull()
    await act(() => { b.sessions[1].status('SUBSCRIBED'); b.sessions[1].sync() })
    expect(value!.status).toBe('connected')
  })
  it('clears stale counts after errors and reconnects without reload', async () => {
    vi.useFakeTimers()
    const b = browser()
    await act(() => { renderer = create(createElement(Probe)) })
    await act(async () => { b.sessions[0].status('SUBSCRIBED'); b.sessions[0].sync(); b.sessions[0].status('CHANNEL_ERROR'); await flush() })
    expect(value!.count).toBeNull()
    await act(() => { vi.advanceTimersByTime(15_000) })
    expect(b.sessions).toHaveLength(2)
    expect(value!.status).toBe('connecting')
    await act(() => { b.sessions[1].status('SUBSCRIBED'); b.sessions[1].sync() })
    expect(value!.status).toBe('connected')
  })
  it('does not connect when disabled or public configuration is missing', async () => {
    browser()
    await act(() => { renderer = create(createElement(Probe, { enabled: false })) })
    expect(sdk.createClient).not.toHaveBeenCalled()
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '')
    await act(() => { renderer!.update(createElement(Probe)) })
    expect(value!.count).toBeNull()
    expect(sdk.createClient).not.toHaveBeenCalled()
  })
  it('cancels pending retries and removes listeners when unmounted', async () => {
    vi.useFakeTimers()
    const b = browser()
    await act(() => { renderer = create(createElement(Probe)) })
    await act(async () => { b.sessions[0].status('CHANNEL_ERROR'); await flush() })
    await act(() => renderer!.unmount())
    renderer = undefined
    await act(() => {
      vi.advanceTimersByTime(30_000)
      b.win.dispatchEvent(new Event('online'))
      b.win.dispatchEvent(new Event('pageshow'))
      b.doc.dispatchEvent(new Event('visibilitychange'))
    })
    expect(b.sessions).toHaveLength(1)
    expect(b.disconnected).toHaveBeenCalledOnce()
  })
})
