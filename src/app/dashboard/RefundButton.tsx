'use client'

import { useState } from 'react'

export default function RefundButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const [error, setError]     = useState<string | null>(null)

  async function handleRefund() {
    if (!confirm('¿Solicitar reembolso? Esta acción procesará la devolución automáticamente y no se puede deshacer.')) return
    setLoading(true)
    setError(null)
    const res = await fetch(`/api/orders/${orderId}/refund`, { method: 'POST' })
    if (res.ok) {
      setDone(true)
    } else {
      const d = await res.json()
      setError(d.error || 'Error al solicitar el reembolso')
    }
    setLoading(false)
  }

  if (done) {
    return (
      <span style={{ fontSize: 12, color: 'var(--green)', fontWeight: 500 }}>
        ✓ Reembolso procesado
      </span>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
      <button
        onClick={handleRefund}
        disabled={loading}
        style={{
          fontSize: 11, letterSpacing: 0.5, fontWeight: 600,
          padding: '5px 10px', cursor: loading ? 'default' : 'pointer',
          background: 'transparent', color: 'var(--danger)',
          border: '1px solid var(--danger)', fontFamily: 'DM Sans, sans-serif',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'PROCESANDO…' : 'REEMBOLSO'}
      </button>
      {error && <span style={{ fontSize: 11, color: 'var(--danger)' }}>{error}</span>}
    </div>
  )
}
