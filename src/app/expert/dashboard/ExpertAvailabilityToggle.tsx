'use client'

import { useState } from 'react'

type Props = {
  initialPaused: boolean
  initialReason: string | null
}

export default function ExpertAvailabilityToggle({ initialPaused, initialReason }: Props) {
  const [acceptingOrders, setAcceptingOrders] = useState(!initialPaused)
  const [reason, setReason] = useState(initialReason ?? '')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function save(nextAccepting: boolean) {
    setSaving(true)
    setError(null)
    setMessage(null)
    try {
      const res = await fetch('/api/expert/availability', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_paused: !nextAccepting,
          service_pause_reason: nextAccepting ? null : reason,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo actualizar tu disponibilidad')
      setAcceptingOrders(nextAccepting)
      setMessage(nextAccepting ? 'Servicio activo. Ya aceptas nuevos pedidos.' : 'Servicio pausado. No entraran pedidos nuevos.')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px 24px', marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 320px' }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 8 }}>
            DISPONIBILIDAD
          </div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, color: 'var(--text)', margin: 0, letterSpacing: 1 }}>
            {acceptingOrders ? 'ACEPTANDO NUEVOS PEDIDOS' : 'SERVICIO PAUSADO'}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, margin: '8px 0 0' }}>
            Puedes pausar nuevas compras si tienes demasiadas reviews. Los pedidos ya pagados siguen activos.
          </p>
        </div>

        <button
          type="button"
          onClick={() => save(!acceptingOrders)}
          disabled={saving}
          className={acceptingOrders ? 'btn btn-secondary btn-sm' : 'btn btn-primary btn-sm'}
        >
          {saving ? 'GUARDANDO...' : acceptingOrders ? 'PAUSAR SERVICIO' : 'REACTIVAR SERVICIO'}
        </button>
      </div>

      {!acceptingOrders && (
        <label style={{ display: 'block', marginTop: 16 }}>
          <span style={{ display: 'block', fontSize: 11, letterSpacing: 1.5, color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 8 }}>
            MOTIVO PUBLICO OPCIONAL
          </span>
          <textarea
            value={reason}
            onChange={event => setReason(event.target.value)}
            rows={3}
            maxLength={240}
            placeholder="Ej: agenda llena esta semana, vuelvo a aceptar pedidos pronto."
          />
          <div style={{ marginTop: 10 }}>
            <button type="button" onClick={() => save(false)} disabled={saving} className="btn btn-secondary btn-sm">
              GUARDAR MOTIVO
            </button>
          </div>
        </label>
      )}

      {message && <p style={{ color: 'var(--green)', fontSize: 13, margin: '12px 0 0' }}>{message}</p>}
      {error && <p style={{ color: 'var(--danger)', fontSize: 13, margin: '12px 0 0' }}>{error}</p>}
    </section>
  )
}
