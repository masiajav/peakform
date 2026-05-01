'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  expertId: string
  currentStatus: string
}

export default function ExpertActions({ expertId, currentStatus }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  async function action(type: 'approve' | 'suspend' | 'pending') {
    setLoading(type)
    try {
      const res = await fetch(`/api/admin/experts/${expertId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: type }),
      })
      if (!res.ok) {
        const d = await res.json()
        alert(d.error || 'Error')
        return
      }
      router.refresh()
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {currentStatus !== 'active' && (
        <button
          onClick={() => action('approve')}
          disabled={loading !== null}
          className="btn btn-success btn-sm"
        >
          {loading === 'approve' ? '...' : 'APROBAR'}
        </button>
      )}
      {currentStatus === 'active' && (
        <button
          onClick={() => action('suspend')}
          disabled={loading !== null}
          className="btn btn-danger btn-sm"
        >
          {loading === 'suspend' ? '...' : 'SUSPENDER'}
        </button>
      )}
      {currentStatus === 'suspended' && (
        <button
          onClick={() => action('pending')}
          disabled={loading !== null}
          className="btn btn-secondary btn-sm"
        >
          {loading === 'pending' ? '...' : 'RESTABLECER'}
        </button>
      )}
    </div>
  )
}
