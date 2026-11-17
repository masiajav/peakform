import type { GameId } from './games'

export const READER_CHANNEL = 'replaid-readers-v1'
export function readerChannelForHost(host: string): string {
  return host === 'www.replaidlab.com' || host === 'replaidlab.com'
    ? READER_CHANNEL : 'replaid-readers-preview-v1'
}
export type ReaderCounts = Record<GameId, number>
export type ReaderPresence = {
  counts: ReaderCounts | null
  status: 'connecting' | 'connected' | 'unavailable'
}
export const UNAVAILABLE_PRESENCE: ReaderPresence = { counts: null, status: 'unavailable' }

/** A key can have several metas during reconciliation; count it once per game. */
export function countReaders(state: Record<string, unknown>): ReaderCounts {
  const counts: ReaderCounts = { overwatch: 0, deadlock: 0 }
  for (const metas of Object.values(state)) {
    if (!Array.isArray(metas)) continue
    for (const game of ['overwatch', 'deadlock'] as const) {
      if (metas.some(meta => meta && typeof meta === 'object' && meta.game === game)) counts[game]++
    }
  }
  return counts
}

// Structural interfaces keep the lifecycle testable without sockets or credentials.
export interface ReaderChannel {
  on(type: 'presence', filter: { event: 'sync' }, callback: () => void): ReaderChannel
  subscribe(callback: (status: string) => void): ReaderChannel
  presenceState(): Record<string, unknown>
  track(payload: { game: GameId }): Promise<string>
  untrack(): Promise<string>
}
export interface ReaderClient {
  channel(name: string, options: { config: { private: false; presence: { key: string } } }): ReaderChannel
  removeChannel(channel: ReaderChannel): Promise<unknown>
}

/** Each visible session observes; a Web Lock elects one publisher per origin/game. */
export function connectReaderPresence(options: {
  client: ReaderClient
  game: GameId | null
  key: string
  locks?: Pick<LockManager, 'request'>
  onChange: (presence: ReaderPresence) => void
  onClose?: () => void
  timeoutMs?: number
  channelName?: string
}): () => void {
  const { client, game, key, locks, onChange } = options
  const channelName = options.channelName ?? READER_CHANNEL
  if (game && !locks) {
    onChange(UNAVAILABLE_PRESENCE)
    return () => {}
  }
  let stopped = false
  let subscribed = false
  let synced = false
  let release: (() => void) | undefined
  const abort = new AbortController()
  const channel = client.channel(channelName, { config: { private: false, presence: { key } } })
  let timeout: ReturnType<typeof setTimeout>
  const stop = () => {
    if (stopped) return
    stopped = true
    clearTimeout(timeout)
    abort.abort()
    // Keep the election lock until removal finishes; a replacement must not
    // publish while this session is still being removed normally.
    void Promise.resolve().then(() => channel.untrack()).catch(() => {}).then(() => client.removeChannel(channel)).catch(() => {}).finally(() => {
      release?.()
      options.onClose?.()
    })
  }
  const fail = () => {
    if (stopped) return
    stop()
    onChange(UNAVAILABLE_PRESENCE)
  }
  const publish = () => {
    if (stopped || !subscribed || !synced) return
    clearTimeout(timeout)
    onChange({ counts: countReaders(channel.presenceState()), status: 'connected' })
  }
  onChange({ counts: null, status: 'connecting' })
  timeout = setTimeout(fail, options.timeoutMs ?? 12_000)
  channel.on('presence', { event: 'sync' }, () => { synced = true; publish() })
  channel.subscribe(status => {
    if (stopped) return
    if (status === 'SUBSCRIBED') {
      if (subscribed) return
      subscribed = true
      publish()
      if (game && locks) {
        void locks.request(`${channelName}:${game}`, { signal: abort.signal }, async () => {
          if (stopped) return
          const held = new Promise<void>(resolve => { release = resolve })
          try {
            if (await channel.track({ game }) !== 'ok') fail()
          } catch { fail() }
          await held
        }).catch(() => { if (!stopped) fail() })
      }
    } else if (['CHANNEL_ERROR', 'TIMED_OUT', 'CLOSED'].includes(status)) fail()
  })
  return stop
}
