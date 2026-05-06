'use client'

import type { CSSProperties } from 'react'
import { useEffect } from 'react'

type AdSlotVariant = 'leaderboard' | 'inline' | 'sidebar' | 'mobile'

type AdSlotProps = {
  variant?: AdSlotVariant
  slot?: string
  label?: string
  className?: string
  style?: CSSProperties
}

const CONFIG: Record<AdSlotVariant, { minHeight: number; format: string; display: string }> = {
  leaderboard: { minHeight: 96, format: 'horizontal', display: '728 x 90' },
  inline: { minHeight: 156, format: 'auto', display: 'Contenido patrocinado' },
  sidebar: { minHeight: 280, format: 'rectangle', display: '300 x 250' },
  mobile: { minHeight: 112, format: 'auto', display: '320 x 100' },
}

export default function AdSlot({
  variant = 'inline',
  slot,
  label = 'Publicidad',
  className,
  style,
}: AdSlotProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  const config = CONFIG[variant]
  const canServeAd = Boolean(clientId && slot && /^\d+$/.test(slot))

  useEffect(() => {
    if (!canServeAd) return

    const adsWindow = window as typeof window & { adsbygoogle?: unknown[] }
    adsWindow.adsbygoogle = adsWindow.adsbygoogle || []
    adsWindow.adsbygoogle.push({})
  }, [canServeAd])

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
          data-ad-slot={slot}
          data-ad-format={config.format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="ad-slot-placeholder">{config.display}</div>
      )}
    </aside>
  )
}
