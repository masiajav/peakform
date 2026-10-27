'use client'

import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { canLoadAdSense } from '@/lib/adsense-policy'
import { configuredAdSlots, resolveAdSlot } from '@/lib/adsense-slots'
import AdSenseScript from './AdSenseScript'

type AdSlotVariant = 'leaderboard' | 'inline' | 'sidebar' | 'mobile'

type AdSlotProps = {
  variant?: AdSlotVariant
  slot?: string
  label?: string
  allowAds?: boolean
  className?: string
  style?: CSSProperties
}

const CONFIG: Record<AdSlotVariant, { minHeight: number; format: string }> = {
  leaderboard: { minHeight: 96, format: 'horizontal' },
  inline: { minHeight: 156, format: 'auto' },
  sidebar: { minHeight: 280, format: 'rectangle' },
  mobile: { minHeight: 112, format: 'auto' },
}

export default function AdSlot({
  variant = 'inline',
  slot,
  label = 'Publicidad',
  allowAds = false,
  className,
  style,
}: AdSlotProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  const pathname = usePathname()
  const config = CONFIG[variant]
  const resolvedSlot = resolveAdSlot(slot, clientId, configuredAdSlots())
  const element = useRef<HTMLModElement>(null)
  const requestedElement = useRef<HTMLModElement | null>(null)
  const canServeAd = Boolean(resolvedSlot) && canLoadAdSense({
    clientId,
    approved: process.env.NEXT_PUBLIC_ADSENSE_APPROVED,
    cmpReady: process.env.NEXT_PUBLIC_ADSENSE_CMP_READY,
    reviewMode: process.env.NEXT_PUBLIC_ADSENSE_REVIEW_MODE,
  }, pathname, allowAds)

  useEffect(() => {
    if (!allowAds || !canServeAd || !element.current || requestedElement.current === element.current) return

    const adsWindow = window as typeof window & { adsbygoogle?: unknown[] }
    adsWindow.adsbygoogle = adsWindow.adsbygoogle || []
    adsWindow.adsbygoogle.push({})
    requestedElement.current = element.current
  }, [allowAds, canServeAd, pathname, resolvedSlot])

  if (!allowAds || !canServeAd) return null

  return (
    <>
      <AdSenseScript allowAds={allowAds} />
      <aside
        className={`ad-slot ad-slot-${variant}${className ? ` ${className}` : ''}`}
        data-ad-slot={slot || variant}
        data-ad-format={config.format}
        style={{ minHeight: config.minHeight, ...style }}
        aria-label={label}
      >
        <div className="ad-slot-label">{label}</div>
        <ins
          key={`${pathname}:${resolvedSlot}`}
          ref={element}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={clientId}
          data-ad-slot={resolvedSlot}
          data-ad-format={config.format}
          data-full-width-responsive="true"
        />
      </aside>
    </>
  )
}
