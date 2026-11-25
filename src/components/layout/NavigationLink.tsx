'use client'

import Link, { useLinkStatus } from 'next/link'
import type { ComponentProps } from 'react'
import { createPortal } from 'react-dom'
import styles from '@/app/loading.module.css'

function LoadingIndicator() {
  const { pending } = useLinkStatus()
  if (!pending || typeof document === 'undefined') return null

  return createPortal(
    <div className={styles.screen} data-page-loading="" role="status" aria-live="polite" aria-atomic="true">
      <div className={styles.content}>
        <span className={styles.mark} aria-hidden="true"><span /><span /><span /></span>
        <span className={styles.brand} aria-hidden="true">REPLAID <span>LAB</span></span>
        <span className={styles.track} aria-hidden="true"><span /></span>
        <span className={styles.label}>Cargando página</span>
      </div>
    </div>,
    document.body,
  )
}

export default function NavigationLink({ children, ...props }: ComponentProps<typeof Link>) {
  return <Link {...props}>{children}<LoadingIndicator /></Link>
}
