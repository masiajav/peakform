import { isPathAdEligible } from './indexing-policy'

type AdSenseConfig = {
  clientId?: string
  approved?: string
  cmpReady?: string
  reviewMode?: string
}

export function adsenseVerificationAccount(clientId?: string) {
  return clientId && /^ca-pub-\d{16}$/.test(clientId) ? clientId : undefined
}

export function canLoadAdSense(config: AdSenseConfig, pathname: string) {
  return Boolean(
    adsenseVerificationAccount(config.clientId)
    && config.approved === 'true'
    && config.cmpReady === 'true'
    && config.reviewMode !== 'true'
    && isPathAdEligible(pathname),
  )
}
