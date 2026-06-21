'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { isPathAdEligible } from '@/lib/indexing-policy'

export default function AdSenseScript() {
  const pathname = usePathname()
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  const adsApproved = process.env.NEXT_PUBLIC_ADSENSE_APPROVED === 'true'

  if (!adsApproved || !clientId || !isPathAdEligible(pathname)) return null

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
