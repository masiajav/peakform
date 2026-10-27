'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Radio, Youtube } from 'lucide-react'
import { KICK_CHANNEL_URL, isKickStatus, showKickNoticeOnPath, unknownKickStatus, type KickStatus } from '@/lib/kick-status'
import styles from './KickLiveNotice.module.css'

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Ivajpro'

export default function KickLiveNotice() {
  const pathname = usePathname()
  const enabled = showKickNoticeOnPath(pathname)
  const [status, setStatus] = useState<KickStatus | null>(null)

  useEffect(() => {
    if (!enabled) return
    let active = true
    let pending: AbortController | null = null

    const refresh = async () => {
      if (pending || document.visibilityState !== 'visible') return
      const controller = new AbortController()
      pending = controller
      const timeout = setTimeout(() => controller.abort(), 10_000)
      try {
        const response = await fetch('/api/community/kick-status', { signal: controller.signal, cache: 'no-store' })
        const data: unknown = response.ok ? await response.json() : null
        if (active) setStatus(document.visibilityState !== 'visible' ? null : isKickStatus(data) ? data : unknownKickStatus(new Date().toISOString()))
      } catch {
        if (active) setStatus(unknownKickStatus(new Date().toISOString()))
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

  if (!enabled) return null
  const online = status?.status === 'live'
  const label = !status ? 'COMPROBANDO' : status.status === 'unknown' ? 'NO DISPONIBLE' : online ? 'ONLINE' : 'OFFLINE'

  return <aside className={styles.bar} aria-label="Canales de Ivajpro">
    <div className={online ? `${styles.kickNotice} ${styles.online}` : styles.kickNotice} role="status" aria-label="Estado de ivajpro en Kick" aria-live="polite">
      <a className={styles.link} href={KICK_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
        <span className={styles.channel}><Radio size={19} aria-hidden="true" /><span className={styles.kick}>KICK</span><span className={styles.name}>ivajpro</span></span>
        {online && status.title && <span className={styles.title}>{status.title}</span>}
        <span className={styles.controls}>
          <span className={styles.state}><span className={styles.dot} aria-hidden="true" />{label}</span>
          <span className={styles.action}><span>{online ? 'Ver directo' : 'Ver canal'}</span><ArrowUpRight size={15} aria-hidden="true" /></span>
        </span>
      </a>
    </div>
    <a className={styles.youtubeLink} href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" aria-label="Canal de Ivajpro en YouTube (abre en otra pestaña)">
      <span className={styles.youtubeChannel}><Youtube size={20} aria-hidden="true" /><span>YOUTUBE</span></span>
      <span className={styles.youtubeAction}>Ver vídeos<ArrowUpRight size={15} aria-hidden="true" /></span>
    </a>
  </aside>
}
