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
    presenceState: vi.fn(() => ({ a: [{ game: 'overwatch' }], b: [{ game: 'deadlock' }] })),
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
    for (const host of ['www.replaidlab.com', 'replaidlab.com']) expect(readerChannelForHost(host)).toBe(READER_CHANNEL)
    for (const host of ['localhost', '127.0.0.1', 'preview.vercel.app', 'replaidlab.com.evil.test', 'other.replaidlab.com', '']) {
      expect(readerChannelForHost(host)).toBe('replaid-readers-preview-v1')
    }
  })
  it('uses the selected channel for both subscription and election', async () => {
    const s = setup(), locks = lockManager()
    const stop = connectReaderPresence({ ...s, game: 'overwatch', key: 'a', locks, channelName: 'preview' })
    s.status('SUBSCRIBED'); await flush()
    expect(s.client.channel).toHaveBeenCalledWith('preview', expect.any(Object))
    expect(locks.request).toHaveBeenCalledWith('preview:overwatch', expect.any(Object), expect.any(Function))
    stop(); await flush()
  })
  it('counts distinct keys per game and ignores malformed or neutral payloads', () => {
    expect(countReaders({
      a: [{ game: 'overwatch' }, { game: 'overwatch' }],
      b: [{ game: 'deadlock' }, { game: 'overwatch' }],
      c: [{ game: null }, null, 'deadlock', { game: 'unknown' }], d: null,
    })).toEqual({ overwatch: 2, deadlock: 1 })
  })
  it('waits for subscription AND server sync; home only observes', async () => {
    const s = setup()
    const stop = connectReaderPresence({ ...s, game: null, key: 'ephemeral' })
    expect(s.changes.at(-1)).toEqual({ counts: null, status: 'connecting' })
    s.status('SUBSCRIBED')
    expect(s.changes.at(-1)?.counts).toBeNull()
    s.sync()
    expect(s.changes.at(-1)).toEqual({ counts: { overwatch: 1, deadlock: 1 }, status: 'connected' })
    expect(s.channel.track).not.toHaveBeenCalled()
    stop(); await flush()
    expect(s.channel.untrack).toHaveBeenCalledOnce()
    expect(s.client.removeChannel).toHaveBeenCalledOnce()
  })
  it('elects one visible publisher per game and hands over after cleanup', async () => {
    const locks = lockManager()
    const a = setup(), b = setup(), c = setup()
    const stopA = connectReaderPresence({ ...a, game: 'overwatch', key: 'a', locks })
    const stopB = connectReaderPresence({ ...b, game: 'overwatch', key: 'b', locks })
    const stopC = connectReaderPresence({ ...c, game: 'deadlock', key: 'c', locks })
    for (const s of [a, b, c]) { s.status('SUBSCRIBED'); s.sync() }
    await flush()
    expect(a.channel.track).toHaveBeenCalledExactlyOnceWith({ game: 'overwatch' })
    expect(b.channel.track).not.toHaveBeenCalled()
    expect(c.channel.track).toHaveBeenCalledExactlyOnceWith({ game: 'deadlock' })
    stopA(); await flush()
    expect(b.channel.track).toHaveBeenCalledExactlyOnceWith({ game: 'overwatch' })
    stopB(); stopC(); await flush()
  })
  it('cancels queued tabs and ignores callbacks after cleanup', async () => {
    const locks = lockManager(), a = setup(), b = setup()
    const stopA = connectReaderPresence({ ...a, game: 'deadlock', key: 'a', locks })
    const stopB = connectReaderPresence({ ...b, game: 'deadlock', key: 'b', locks })
    a.status('SUBSCRIBED'); b.status('SUBSCRIBED'); await flush()
    stopB(); const length = b.changes.length
    b.sync(); b.status('CHANNEL_ERROR'); stopA(); await flush()
    expect(b.channel.track).not.toHaveBeenCalled()
    expect(b.changes).toHaveLength(length)
  })
  it.each(['CHANNEL_ERROR', 'TIMED_OUT', 'CLOSED'])('clears stale counts on %s', async error => {
    const s = setup(), stop = connectReaderPresence({ ...s, game: null, key: 'a' })
    s.status('SUBSCRIBED'); s.sync(); s.status(error); await flush()
    expect(s.changes.at(-1)).toEqual({ counts: null, status: 'unavailable' })
    expect(s.client.removeChannel).toHaveBeenCalledOnce()
    stop()
  })
  it('returns unavailable on timeout or unsupported deduplication, never invented zero', async () => {
    vi.useFakeTimers()
    const s = setup(), stop = connectReaderPresence({ ...s, game: null, key: 'a', timeoutMs: 100 })
    s.status('SUBSCRIBED'); vi.advanceTimersByTime(100); await flush()
    expect(s.changes.at(-1)).toEqual({ counts: null, status: 'unavailable' })
    stop()
    const unsupported = setup()
    connectReaderPresence({ ...unsupported, game: 'overwatch', key: 'a' })()
    expect(unsupported.client.channel).not.toHaveBeenCalled()
    expect(unsupported.changes.at(-1)?.status).toBe('unavailable')
  })
  it('fails closed when publishing fails and releases the election', async () => {
    const locks = lockManager(), s = setup()
    vi.mocked(s.channel.track).mockResolvedValue('error')
    const stop = connectReaderPresence({ ...s, game: 'overwatch', key: 'a', locks })
    s.status('SUBSCRIBED'); s.sync(); await flush()
    expect(s.changes.at(-1)).toEqual({ counts: null, status: 'unavailable' })
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
  function Probe({ enabled = true, game = 'overwatch' }: { enabled?: boolean; game?: 'overwatch' | 'deadlock' }) {
    value = useReaderPresence(game, enabled)
    renders.push(value)
    return null
  }
  it('creates anonymous clients, leaves hidden/private pages and resumes visible pages', async () => {
    const b = browser()
    await act(() => { renderer = create(createElement(Probe)) })
    expect(sdk.createClient).toHaveBeenCalledWith(expect.any(String), expect.any(String), {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    })
    expect(b.sessions[0].client.channel).toHaveBeenCalledWith('replaid-readers-preview-v1', expect.any(Object))
    await act(async () => { b.sessions[0].status('SUBSCRIBED'); b.sessions[0].sync(); await flush() })
    expect(value!.status).toBe('connected')
    await act(async () => { b.doc.visibilityState = 'hidden'; b.doc.dispatchEvent(new Event('visibilitychange')); await flush() })
    expect(value!.counts).toBeNull()
    expect(b.sessions[0].client.removeChannel).toHaveBeenCalledOnce()
    expect(b.disconnected).toHaveBeenCalledOnce()
    await act(() => { b.doc.visibilityState = 'visible'; b.doc.dispatchEvent(new Event('visibilitychange')) })
    expect(b.sessions).toHaveLength(2)
    await act(async () => { renderer!.update(createElement(Probe, { enabled: false })); await flush() })
    expect(value!.status).toBe('unavailable')
    expect(b.sessions[1].client.removeChannel).toHaveBeenCalledOnce()
  })
  it('invalidates the first render on game changes and reactivation until a fresh sync', async () => {
    const b = browser()
    await act(() => { renderer = create(createElement(Probe)) })
    await act(() => { b.sessions[0].status('SUBSCRIBED'); b.sessions[0].sync() })
    expect(value!.status).toBe('connected')
    renders.length = 0
    await act(() => { renderer!.update(createElement(Probe, { game: 'deadlock' })) })
    expect(renders[0]).toEqual({ counts: null, status: 'connecting' })
    expect(value!.counts).toBeNull()
    await act(() => { b.sessions[1].status('SUBSCRIBED'); b.sessions[1].sync() })
    expect(value!.status).toBe('connected')
    await act(() => { renderer!.update(createElement(Probe, { game: 'deadlock', enabled: false })) })
    renders.length = 0
    await act(() => { renderer!.update(createElement(Probe, { game: 'deadlock', enabled: true })) })
    expect(renders[0]).toEqual({ counts: null, status: 'connecting' })
    expect(value!.counts).toBeNull()
    await act(() => { b.sessions[2].status('SUBSCRIBED'); b.sessions[2].sync() })
    expect(value!.status).toBe('connected')
  })
  it('clears stale counts after errors and reconnects without reload', async () => {
    vi.useFakeTimers()
    const b = browser()
    await act(() => { renderer = create(createElement(Probe)) })
    await act(async () => { b.sessions[0].status('SUBSCRIBED'); b.sessions[0].sync(); b.sessions[0].status('CHANNEL_ERROR'); await flush() })
    expect(value!.counts).toBeNull()
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
    expect(value!.counts).toBeNull()
    expect(sdk.createClient).not.toHaveBeenCalled()
  })
})
