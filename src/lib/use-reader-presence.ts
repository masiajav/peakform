'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import type { GameId } from './games'
import { connectReaderPresence, readerChannelForHost, UNAVAILABLE_PRESENCE, type ReaderPresence } from './reader-presence'

export function useReaderPresence(game: GameId | null, enabled = true): ReaderPresence {
  // A fresh context on each transition also distinguishes off/on for the same
  // game. Never expose the previous subscription's snapshot before effects run.
  const context = useMemo(() => ({ game, enabled }), [game, enabled])
  const [snapshot, setSnapshot] = useState<{ context: typeof context; presence: ReaderPresence }>({
    context, presence: { counts: null, status: 'connecting' },
  })
  useEffect(() => {
    const setPresence = (presence: ReaderPresence) => setSnapshot({ context, presence })
    let stop: (() => void) | undefined
    let retry: ReturnType<typeof setTimeout> | undefined
    let disposed = false
    let suspended = false
    const clear = () => { clearTimeout(retry); stop?.(); stop = undefined }
    const start = () => {
      clear()
      setPresence(UNAVAILABLE_PRESENCE)
      if (!enabled || suspended || document.visibilityState !== 'visible') return
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (!url || !key || !globalThis.crypto?.randomUUID || (game && !navigator.locks)) return
      try {
        // This public observer must never load the signed-in account or persist
        // an auth session. Reuse the project's public infrastructure and keys.
        const client = createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
        })
        const disconnect = connectReaderPresence({
          client, game, key: crypto.randomUUID(), locks: navigator.locks,
          channelName: readerChannelForHost(window.location.hostname),
          onClose: () => client.realtime.disconnect(),
          onChange: value => {
            if (disposed) return
            setPresence(value)
            if (value.status === 'unavailable') retry = setTimeout(start, 15_000)
          },
        })
        stop = disconnect
      } catch {
        setPresence(UNAVAILABLE_PRESENCE)
        retry = setTimeout(start, 15_000)
      }
    }
    const hide = () => { suspended = true; clear(); setPresence(UNAVAILABLE_PRESENCE) }
    const show = () => { suspended = false; start() }
    document.addEventListener('visibilitychange', start)
    window.addEventListener('pagehide', hide)
    window.addEventListener('pageshow', show)
    window.addEventListener('online', start)
    start()
    return () => {
      disposed = true
      clear()
      document.removeEventListener('visibilitychange', start)
      window.removeEventListener('pagehide', hide)
      window.removeEventListener('pageshow', show)
      window.removeEventListener('online', start)
    }
  }, [game, enabled, context])
  if (!enabled) return UNAVAILABLE_PRESENCE
  return snapshot.context === context ? snapshot.presence : { counts: null, status: 'connecting' }
}
