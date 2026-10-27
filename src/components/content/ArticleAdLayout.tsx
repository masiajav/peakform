'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { canLoadAdSense } from '@/lib/adsense-policy'
import { configuredAdSlots, resolveAdSlot } from '@/lib/adsense-slots'
import ArticleAd from './ArticleAd'
import styles from './ArticleAdLayout.module.css'

export default function ArticleAdLayout({ children, allowAds = false }: { children: ReactNode; allowAds?: boolean }) {
  const pathname = usePathname()
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const viewport = window.matchMedia('(min-width: 1101px)')
    const update = () => setDesktop(viewport.matches)
    update()
    viewport.addEventListener('change', update)
    return () => viewport.removeEventListener('change', update)
  }, [])
  const sidebar = desktop && Boolean(resolveAdSlot('guide-sidebar-rectangle', process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID, configuredAdSlots())) && canLoadAdSense({
    clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
    approved: process.env.NEXT_PUBLIC_ADSENSE_APPROVED,
    cmpReady: process.env.NEXT_PUBLIC_ADSENSE_CMP_READY,
    reviewMode: process.env.NEXT_PUBLIC_ADSENSE_REVIEW_MODE,
  }, pathname, allowAds)

  return <div className={sidebar ? styles.withSidebar : styles.single}>
    <div className={styles.content}>{children}</div>
    {sidebar && <aside className={styles.sidebar} aria-label="Publicidad lateral"><ArticleAd position="sidebar" allowAds={allowAds} /></aside>}
  </div>
}
