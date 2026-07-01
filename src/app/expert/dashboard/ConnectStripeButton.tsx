'use client'

import { useState } from 'react'
import { STRIPE_COUNTRY_OPTIONS, stripeCountryLabel } from '@/lib/stripe-countries'
import ExpertFeesNotice from '@/components/payments/ExpertFeesNotice'

type Props = {
  label: string
  initialCountry: string
  existingCountry?: string | null
  canChangeCountry: boolean
}

export default function ConnectStripeButton({ label, initialCountry, existingCountry, canChangeCountry }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [country, setCountry] = useState(initialCountry)

  const replacingCountry = !!existingCountry && existingCountry !== country

  async function handleClick() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/stripe/connect/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No hemos podido abrir Stripe')
      window.location.href = data.url
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'No hemos podido abrir Stripe')
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--text2)' }}>
        PAÍS DE RESIDENCIA FISCAL
        <select
          value={country}
          onChange={event => setCountry(event.target.value)}
          disabled={loading || !canChangeCountry}
          style={{ minWidth: 220 }}
        >
          {STRIPE_COUNTRY_OPTIONS.map(option => (
            <option key={option.code} value={option.code}>{option.label}</option>
          ))}
        </select>
      </label>

      {replacingCountry && (
        <p style={{ fontSize: 12, color: 'var(--yellow)', margin: 0, lineHeight: 1.5, maxWidth: 560 }}>
          Tu cuenta incompleta de {stripeCountryLabel(existingCountry)} se sustituirá por una cuenta nueva de {stripeCountryLabel(country)}.
        </p>
      )}

      <ExpertFeesNotice country={country} compact />

      <button onClick={handleClick} disabled={loading} className="btn btn-primary">
        {loading
          ? 'REDIRIGIENDO...'
          : replacingCountry
            ? `CREAR CUENTA DE ${stripeCountryLabel(country).toUpperCase()} →`
            : label}
      </button>
      {error && <p style={{ fontSize: 12, color: 'var(--danger)', margin: 0 }}>{error}</p>}
    </div>
  )
}
