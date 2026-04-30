'use client'

import { useState } from 'react'
import { Expert, TIER_CONFIG, OrderTier, calculateTotal, formatPrice } from '@/types'

const TIERS: OrderTier[] = ['starter', 'pro', 'deep_dive']

const PRICE_FIELD: Record<OrderTier, keyof Expert> = {
  starter:   'price_starter',
  pro:       'price_pro',
  deep_dive: 'price_deep_dive',
}

export default function TierSelector({ expert }: { expert: Expert }) {
  const [selected, setSelected] = useState<OrderTier>('pro')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const basePrice = expert[PRICE_FIELD[selected]] as number
  const { commission, total } = calculateTotal(basePrice)

  async function handleBuy() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expertId: expert.id, tier: selected }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al crear la sesión de pago')
      window.location.href = data.url
    } catch (e: any) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 style={{
        fontFamily: 'Bebas Neue, sans-serif', fontSize: 22,
        color: 'var(--text)', margin: '0 0 16px', letterSpacing: 1,
      }}>
        ELIGE TU TIER
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {TIERS.map(tier => {
          const cfg = TIER_CONFIG[tier]
          const base = expert[PRICE_FIELD[tier]] as number
          const isSelected = selected === tier

          return (
            <button
              key={tier}
              onClick={() => setSelected(tier)}
              style={{
                background: isSelected ? 'rgba(255,107,43,0.06)' : 'var(--surface)',
                border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                padding: '20px 24px',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{
                    fontFamily: 'Bebas Neue, sans-serif', fontSize: 18,
                    color: isSelected ? 'var(--accent)' : 'var(--text)', letterSpacing: 0.5,
                  }}>
                    {cfg.label}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
                    {cfg.description}
                  </div>
                </div>
                <div style={{
                  fontFamily: 'Bebas Neue, sans-serif', fontSize: 22,
                  color: isSelected ? 'var(--accent)' : 'var(--text)', flexShrink: 0,
                }}>
                  {formatPrice(base)}
                </div>
              </div>

              <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {cfg.features.map(f => (
                  <li key={f} style={{ fontSize: 12, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: 'var(--green)', fontSize: 10 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>

      {/* Resumen de precio */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        padding: '16px 20px',
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text2)', marginBottom: 6 }}>
          <span>Precio experto</span>
          <span>{formatPrice(basePrice)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text2)', marginBottom: 10 }}>
          <span>Comisión plataforma (15%)</span>
          <span>{formatPrice(commission)}</span>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'var(--text)' }}>TOTAL</span>
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: 'var(--accent)' }}>{formatPrice(total)}</span>
        </div>
      </div>

      {error && (
        <div style={{ color: 'var(--danger)', fontSize: 13, padding: '8px 12px', background: 'rgba(255,68,68,0.08)', border: '1px solid rgba(255,68,68,0.2)', marginBottom: 12 }}>
          {error}
        </div>
      )}

      <button
        onClick={handleBuy}
        disabled={loading}
        className="btn btn-primary btn-full"
        style={{ fontSize: 16 }}
      >
        {loading ? 'REDIRIGIENDO…' : `COMPRAR ${TIER_CONFIG[selected].label.toUpperCase()} →`}
      </button>

      <p style={{ fontSize: 12, color: 'var(--text3)', textAlign: 'center', marginTop: 12 }}>
        Pago seguro via Stripe · Puedes cancelar antes de que el experto empiece
      </p>
    </div>
  )
}
