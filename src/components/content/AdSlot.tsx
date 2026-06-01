'use client'

import type { CSSProperties } from 'react'
import { useEffect } from 'react'

type AdSlotVariant = 'leaderboard' | 'inline' | 'sidebar' | 'mobile'

type AdSlotProps = {
  variant?: AdSlotVariant
  slot?: string
  label?: string
  allowAds?: boolean
  className?: string
  style?: CSSProperties
}

const CONFIG: Record<AdSlotVariant, { minHeight: number; format: string; display: string }> = {
  leaderboard: { minHeight: 96, format: 'horizontal', display: '728 x 90' },
  inline: { minHeight: 156, format: 'auto', display: 'Contenido patrocinado' },
  sidebar: { minHeight: 280, format: 'rectangle', display: '300 x 250' },
  mobile: { minHeight: 112, format: 'auto', display: '320 x 100' },
}

const NAMED_SLOTS: Record<string, string | undefined> = {
  'home-top-leaderboard': process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_TOP,
  'home-mid-leaderboard': process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_MID,
  'guides-top-leaderboard': process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDES_TOP,
  'guide-after-summary': process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_AFTER_SUMMARY,
  'guide-after-video': process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_AFTER_VIDEO,
  'guide-sidebar-rectangle': process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_SIDEBAR,
}

export default function AdSlot({
  variant = 'inline',
  slot,
  label = 'Publicidad',
  allowAds = true,
  className,
  style,
}: AdSlotProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  const config = CONFIG[variant]
  const showPlaceholder = process.env.NODE_ENV !== 'production'
  const resolvedSlot = resolveSlot(slot)
  const canServeAd = Boolean(clientId && resolvedSlot)

  useEffect(() => {
    if (!allowAds || !canServeAd) return

    const adsWindow = window as typeof window & { adsbygoogle?: unknown[] }
    adsWindow.adsbygoogle = adsWindow.adsbygoogle || []
    adsWindow.adsbygoogle.push({})
  }, [allowAds, canServeAd])

  if (!allowAds || (!canServeAd && !showPlaceholder)) return null

  return (
    <aside
      className={`ad-slot ad-slot-${variant}${className ? ` ${className}` : ''}`}
      data-ad-slot={slot || variant}
      data-ad-format={config.format}
      style={{ minHeight: config.minHeight, ...style }}
      aria-label={label}
    >
      <div className="ad-slot-label">{label}</div>
      {canServeAd ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={clientId}
          data-ad-slot={resolvedSlot}
          data-ad-format={config.format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="ad-slot-placeholder">{config.display}</div>
      )}
    </aside>
  )
}

function resolveSlot(slot?: string) {
  if (!slot) return null
  if (/^\d+$/.test(slot)) return slot
  if (slot.startsWith('guides-grid-')) return process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDES_INLINE || null
  const namedSlot = NAMED_SLOTS[slot]
  return namedSlot && /^\d+$/.test(namedSlot) ? namedSlot : null
}
