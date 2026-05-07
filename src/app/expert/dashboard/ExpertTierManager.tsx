'use client'

import { useState } from 'react'

type TierKey = 'starter' | 'pro' | 'deep_dive'

type TierState = Record<TierKey, {
  label: string
  price: string
  min: number
  description: string
  enabled: boolean
}>

interface Props {
  tiers: TierState
}

export default function ExpertTierManager({ tiers: initialTiers }: Props) {
  const [tiers, setTiers] = useState(initialTiers)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function updateTier(tier: TierKey, patch: Partial<TierState[TierKey]>) {
    setTiers(current => ({
      ...current,
      [tier]: { ...current[tier], ...patch },
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setError(null)

    const enabledCount = Object.values(tiers).filter(tier => tier.enabled).length
    if (enabledCount === 0) {
      setError('Deja al menos un tier estandar activo')
      setSaving(false)
      return
    }

    const res = await fetch('/api/expert/tiers', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price_starter: tiers.starter.price,
        price_pro: tiers.pro.price,
        price_deep_dive: tiers.deep_dive.price,
        description_starter: tiers.starter.description.trim() || null,
        description_pro: tiers.pro.description.trim() || null,
        description_deep_dive: tiers.deep_dive.description.trim() || null,
        tier_starter_enabled: tiers.starter.enabled,
        tier_pro_enabled: tiers.pro.enabled,
        tier_deep_dive_enabled: tiers.deep_dive.enabled,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'No se pudieron guardar los tiers')
      setSaving(false)
      return
    }

    setSaved(true)
    setSaving(false)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 24, marginBottom: 36 }}>
      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 18, marginBottom: 18 }}>
        <div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.8, marginBottom: 8 }}>
            OFERTAS Y TIERS
          </div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 28, letterSpacing: 1, margin: 0 }}>
            Configura tus reviews
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.55, margin: '8px 0 0', maxWidth: 680 }}>
            Puedes ajustar precio, descripcion y visibilidad de cada tier. El analisis de prueba se mantiene en tu perfil general.
          </p>
        </div>
        <button className="btn btn-primary btn-sm" disabled={saving} type="submit">
          {saving ? 'GUARDANDO...' : 'GUARDAR'}
        </button>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {(Object.keys(tiers) as TierKey[]).map(tierKey => {
          const tier = tiers[tierKey]
          return (
            <section key={tierKey} style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 0.35fr) minmax(90px, 130px) minmax(220px, 1fr)', gap: 14, alignItems: 'start' }} className="expert-tier-row">
                <label style={{ display: 'flex', gap: 10, alignItems: 'center', minHeight: 40 }}>
                  <input
                    type="checkbox"
                    checked={tier.enabled}
                    onChange={event => updateTier(tierKey, { enabled: event.target.checked })}
                    style={{ width: 16, height: 16 }}
                  />
                  <span style={{ fontFamily: 'Bebas Neue, sans-serif', color: tier.enabled ? 'var(--text)' : 'var(--text3)', fontSize: 19, letterSpacing: 0.8 }}>
                    {tier.label}
                  </span>
                </label>
                <label>
                  <span style={{ display: 'block', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1.2, color: 'var(--text3)', fontSize: 10, marginBottom: 6 }}>
                    PRECIO EUR
                  </span>
                  <input
                    type="number"
                    min={tier.min}
                    step={0.5}
                    value={tier.price}
                    onChange={event => updateTier(tierKey, { price: event.target.value })}
                    required
                  />
                </label>
                <label>
                  <span style={{ display: 'block', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1.2, color: 'var(--text3)', fontSize: 10, marginBottom: 6 }}>
                    DESCRIPCION PUBLICA
                  </span>
                  <textarea
                    value={tier.description}
                    onChange={event => updateTier(tierKey, { description: event.target.value })}
                    rows={2}
                    placeholder="Explica que incluye este tier y cuando deberia elegirlo el jugador."
                  />
                </label>
              </div>
            </section>
          )
        })}
      </div>

      {error && (
        <div style={{ marginTop: 16, background: 'rgba(255,68,68,0.08)', border: '1px solid rgba(255,68,68,0.2)', color: 'var(--danger)', padding: '10px 12px', fontSize: 13 }}>
          {error}
        </div>
      )}
      {saved && (
        <div style={{ marginTop: 16, color: 'var(--green)', fontSize: 13 }}>
          Tiers actualizados
        </div>
      )}
    </form>
  )
}
