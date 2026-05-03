'use client'

import { useEffect, useState } from 'react'

export default function StripeConnectRefreshPage() {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function regenerate() {
      try {
        const res = await fetch('/api/stripe/connect/onboard', { method: 'POST' })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        window.location.href = data.url
      } catch (e: any) {
        setError(e.message)
      }
    }
    regenerate()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', color: 'var(--text2)', fontSize: 14 }}>
        {error ? (
          <p style={{ color: 'var(--danger)' }}>{error}</p>
        ) : (
          <p>Regenerando enlace de onboarding…</p>
        )}
      </div>
    </div>
  )
}
