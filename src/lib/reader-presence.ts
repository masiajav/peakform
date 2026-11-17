export const READER_CHANNEL = 'replaid-visitors-v2'
export function readerChannelForHost(host: string): string {
  return host === 'www.replaidlab.com' || host === 'replaidlab.com'
    ? READER_CHANNEL : 'replaid-visitors-preview-v2'
}
export type ReaderPresence = {
  count: number | null
  status: 'connecting' | 'connected' | 'unavailable'
}
export const UNAVAILABLE_PRESENCE: ReaderPresence = { count: null, status: 'unavailable' }

/** Reconciliation may include several metas for a visitor; count each key once. */
export function countReaders(state: Record<string, unknown>): number {
  return Object.values(state).filter(metas => Array.isArray(metas) && metas.some(meta =>
    meta && typeof meta === 'object' && !Array.isArray(meta) && meta.site === 'replaidlab',
  )).length
}

// Structural interfaces keep the lifecycle testable without sockets or credentials.
export interface ReaderChannel {
  on(type: 'presence', filter: { event: 'sync' }, callback: () => void): ReaderChannel
  subscribe(callback: (status: string) => void): ReaderChannel
  presenceState(): Record<string, unknown>
  track(payload: { site: 'replaidlab' }): Promise<string>
  untrack(): Promise<string>
}
export interface ReaderClient {
  channel(name: string, options: { config: { private: false; presence: { key: string } } }): ReaderChannel
  removeChannel(channel: ReaderChannel): Promise<unknown>
}

/** Each visible session observes; a Web Lock elects one publisher per origin/site. */
export function connectReaderPresence(options: {
  client: ReaderClient
  key: string
  locks?: Pick<LockManager, 'request'>
  onChange: (presence: ReaderPresence) => void
  onClose?: () => void
  timeoutMs?: number
  channelName?: string
}): () => void {
  const { client, key, locks, onChange } = options
  const channelName = options.channelName ?? READER_CHANNEL
  if (!locks) {
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
    onChange({ count: countReaders(channel.presenceState()), status: 'connected' })
  }
  onChange({ count: null, status: 'connecting' })
  timeout = setTimeout(fail, options.timeoutMs ?? 12_000)
  channel.on('presence', { event: 'sync' }, () => { synced = true; publish() })
  channel.subscribe(status => {
    if (stopped) return
    if (status === 'SUBSCRIBED') {
      if (subscribed) return
      subscribed = true
      publish()
      if (locks) {
        void locks.request(`${channelName}:replaidlab`, { signal: abort.signal }, async () => {
          if (stopped) return
          const held = new Promise<void>(resolve => { release = resolve })
          try {
            if (await channel.track({ site: 'replaidlab' }) !== 'ok') fail()
          } catch { fail() }
          await held
        }).catch(() => { if (!stopped) fail() })
      }
    } else if (['CHANNEL_ERROR', 'TIMED_OUT', 'CLOSED'].includes(status)) fail()
  })
  return stop
}
