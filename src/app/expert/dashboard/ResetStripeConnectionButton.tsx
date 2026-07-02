'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ResetStripeConnectionButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleReset() {
    const confirmed = window.confirm(
      'Esto eliminará el vínculo antiguo de Replaid Lab. Después podrás conectar una cuenta nueva de Stripe. ¿Continuar?',
    )
    if (!confirmed) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/stripe/connect/unlink', { method: 'POST' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'No hemos podido desvincular Stripe')
      router.refresh()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'No hemos podido desvincular Stripe')
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, marginTop: 14 }}>
      <button type="button" onClick={handleReset} disabled={loading} className="btn btn-secondary btn-sm">
        {loading ? 'DESVINCULANDO...' : 'DESVINCULAR CUENTA ANTIGUA'}
      </button>
      {error && <p style={{ fontSize: 12, color: 'var(--danger)', margin: 0 }}>{error}</p>}
    </div>
  )
}
