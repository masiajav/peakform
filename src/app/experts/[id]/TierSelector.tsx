'use client'

import { useState } from 'react'
import { Expert, TIER_CONFIG, OrderTier, calculateTotal, formatPrice } from '@/types'

const STANDARD_TIERS: Exclude<OrderTier, 'trial'>[] = ['starter', 'pro', 'deep_dive']

const PRICE_FIELD: Record<Exclude<OrderTier, 'trial'>, keyof Expert> = {
  starter:   'price_starter',
  pro:       'price_pro',
  deep_dive: 'price_deep_dive',
}

const DESC_FIELD: Record<Exclude<OrderTier, 'trial'>, keyof Expert> = {
  starter:   'description_starter',
  pro:       'description_pro',
  deep_dive: 'description_deep_dive',
}

interface Props {
  expert: Expert
  hasUsedTrial: boolean
}

export default function TierSelector({ expert, hasUsedTrial }: Props) {
  const defaultTier: OrderTier = expert.trial_enabled && !hasUsedTrial ? 'trial' : 'pro'
  const [selected, setSelected] = useState<OrderTier>(defaultTier)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const basePrice = selected === 'trial'
    ? (expert.trial_price ?? 0)
    : (expert[PRICE_FIELD[selected]] as number)
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

        {/* Trial card */}
        {expert.trial_enabled && (
          <button
            onClick={() => !hasUsedTrial && setSelected('trial')}
            disabled={hasUsedTrial}
            style={{
              background: selected === 'trial' ? 'rgba(255,214,0,0.06)' : 'var(--surface)',
              border: `1px solid ${selected === 'trial' ? 'var(--yellow)' : 'var(--border)'}`,
              padding: '20px 24px',
              cursor: hasUsedTrial ? 'not-allowed' : 'pointer',
              textAlign: 'left',
              width: '100%',
              opacity: hasUsedTrial ? 0.5 : 1,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      fontFamily: 'Bebas Neue, sans-serif', fontSize: 18,
                      color: selected === 'trial' ? 'var(--yellow)' : 'var(--text)', letterSpacing: 0.5,
                    }}>
                      PRUEBA
                    </span>
                    <span style={{
                      fontSize: 10, fontWeight: 600, letterSpacing: 1,
                      background: 'rgba(255,214,0,0.12)', color: 'var(--yellow)',
                      border: '1px solid rgba(255,214,0,0.3)',
                      padding: '1px 7px',
                    }}>
                      SOLO 1 VEZ
                    </span>
                    {expert.trial_refundable && (
                      <span style={{
                        fontSize: 10, fontWeight: 600, letterSpacing: 1,
                        background: 'rgba(0,214,127,0.1)', color: 'var(--green)',
                        border: '1px solid rgba(0,214,127,0.3)',
                        padding: '1px 7px',
                      }}>
                        REEMBOLSO 7D
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
                    {hasUsedTrial
                      ? 'Ya usaste tu análisis de prueba con este experto'
                      : `Review escrita · Entrega en ${expert.trial_deadline_hours}h · 1 pregunta de seguimiento`
                    }
                  </div>
                </div>
              </div>
              <div style={{
                fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, flexShrink: 0,
                color: selected === 'trial' ? 'var(--yellow)' : 'var(--text)',
              }}>
                {formatPrice(expert.trial_price ?? 0)}
              </div>
            </div>
          </button>
        )}

        {/* Standard tiers */}
        {STANDARD_TIERS.map(tier => {
          const cfg = TIER_CONFIG[tier]
          const base = expert[PRICE_FIELD[tier]] as number
          const customDesc = expert[DESC_FIELD[tier]] as string | null
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
                <div style={{ flex: 1, marginRight: 16 }}>
                  <div style={{
                    fontFamily: 'Bebas Neue, sans-serif', fontSize: 18,
                    color: isSelected ? 'var(--accent)' : 'var(--text)', letterSpacing: 0.5,
                  }}>
                    {cfg.label}
                  </div>
                  {customDesc ? (
                    <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 6, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                      {customDesc}
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
                        {cfg.description}
                      </div>
                      <ul style={{ margin: '10px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {cfg.features.map(f => (
                          <li key={f} style={{ fontSize: 12, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ color: 'var(--green)', fontSize: 10 }}>✓</span> {f}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                <div style={{
                  fontFamily: 'Bebas Neue, sans-serif', fontSize: 22,
                  color: isSelected ? 'var(--accent)' : 'var(--text)', flexShrink: 0,
                }}>
                  {formatPrice(base)}
                </div>
              </div>
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
