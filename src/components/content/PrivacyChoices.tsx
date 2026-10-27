'use client'

import { useEffect, useState } from 'react'

type ConsentCallback = { CONSENT_API_READY: () => void }
type GoogleConsent = {
  callbackQueue: { push: (callback: ConsentCallback) => unknown }
  showRevocationMessage?: () => void
}

export default function PrivacyChoices() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let active = true
    const consentWindow = window as typeof window & { googlefc?: GoogleConsent }
    const consent: GoogleConsent = consentWindow.googlefc ?? { callbackQueue: new Array<ConsentCallback>() }
    consentWindow.googlefc = consent
    consent.callbackQueue ??= new Array<ConsentCallback>()
    consent.callbackQueue.push({ CONSENT_API_READY: () => {
      if (active && typeof consent.showRevocationMessage === 'function') setReady(true)
    } })
    return () => { active = false }
  }, [])

  if (!ready) return null
  return <button type="button" onClick={() => {
    const consent = (window as typeof window & { googlefc?: GoogleConsent }).googlefc
    consent?.callbackQueue.push({ CONSENT_API_READY: () => consent.showRevocationMessage?.() })
  }} style={{ background: 'none', border: 0, padding: 0, color: 'inherit', font: 'inherit', textAlign: 'left', cursor: 'pointer' }}>Privacidad y cookies: cambiar opciones</button>
}
