'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { canLoadAdSense } from '@/lib/adsense-policy'

export default function AdSenseScript({ allowAds = false }: { allowAds?: boolean }) {
  const pathname = usePathname()
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  const canLoad = canLoadAdSense({
    clientId,
    approved: process.env.NEXT_PUBLIC_ADSENSE_APPROVED,
    reviewMode: process.env.NEXT_PUBLIC_ADSENSE_REVIEW_MODE,
    cmpReady: process.env.NEXT_PUBLIC_ADSENSE_CMP_READY,
  }, pathname, allowAds)

  // Ownership verification uses a server-rendered meta tag, never ad execution.
  if (!canLoad) return null

  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
    />
  )
}
