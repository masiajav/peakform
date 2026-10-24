'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Radio, X } from 'lucide-react'
import { KICK_CHANNEL_URL, isKickStatus, showKickNoticeOnPath, type KickStatus } from '@/lib/kick-status'
import styles from './KickLiveNotice.module.css'

const DISMISSED_KEY = 'replaid:kick-dismissed:v1'

export default function KickLiveNotice() {
  const pathname = usePathname()
  const enabled = showKickNoticeOnPath(pathname)
  const [status, setStatus] = useState<KickStatus | null>(null)
  const [dismissedId, setDismissedId] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    let active = true
    let pending: AbortController | null = null
    try { setDismissedId(sessionStorage.getItem(DISMISSED_KEY)) } catch { /* Storage is optional. */ }

    const refresh = async () => {
      if (pending || document.visibilityState !== 'visible') return
      const controller = new AbortController()
      pending = controller
      const timeout = setTimeout(() => controller.abort(), 10_000)
      try {
        const response = await fetch('/api/community/kick-status', { signal: controller.signal, cache: 'no-store' })
        const data: unknown = response.ok ? await response.json() : null
        if (active) setStatus(document.visibilityState === 'visible' && isKickStatus(data) ? data : null)
      } catch {
        if (active) setStatus(null)
      } finally {
        clearTimeout(timeout)
        pending = null
      }
    }
    const onVisible = () => {
      setStatus(null)
      if (document.visibilityState === 'visible') void refresh()
    }
    void refresh()
    const interval = setInterval(() => { void refresh() }, 60_000)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      active = false
      clearInterval(interval)
      document.removeEventListener('visibilitychange', onVisible)
      pending?.abort()
    }
  }, [enabled])

  if (!enabled || status?.status !== 'live' || status.streamId === dismissedId) return null

  const dismiss = () => {
    setDismissedId(status.streamId)
    try { sessionStorage.setItem(DISMISSED_KEY, status.streamId!) } catch { /* Still dismiss for this visit. */ }
  }

  return <aside className={styles.notice} role="status" aria-label="Directo de ivajpro" aria-live="polite">
    <a className={styles.link} href={KICK_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
      <span className={styles.kicker}><span className={styles.dot} aria-hidden="true" /> En directo · Kick</span>
      <span className={styles.channel}><Radio size={25} aria-hidden="true" /> ivajpro</span>
      {status.title && <span className={styles.title}>{status.title}</span>}
      <span className={styles.action}>Ver directo <ArrowUpRight size={16} aria-hidden="true" /></span>
    </a>
    <button className={styles.close} type="button" onClick={dismiss} aria-label="Ocultar aviso del directo"><X size={18} aria-hidden="true" /></button>
  </aside>
}
