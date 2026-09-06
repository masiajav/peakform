'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { isPathAdEligible } from '@/lib/indexing-policy'

export default function AdSenseScript() {
  const pathname = usePathname()
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  const adsApproved = process.env.NEXT_PUBLIC_ADSENSE_APPROVED === 'true'
  const reviewMode = process.env.NEXT_PUBLIC_ADSENSE_REVIEW_MODE === 'true'
  const cmpReady = process.env.NEXT_PUBLIC_ADSENSE_CMP_READY === 'true'

  // Review mode exposes the verification script without rendering ad inventory.
  if (!clientId || (!reviewMode && (!adsApproved || !cmpReady || !isPathAdEligible(pathname)))) return null

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
