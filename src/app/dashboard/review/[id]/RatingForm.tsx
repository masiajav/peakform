'use client'

import { useState } from 'react'

type Props = {
  reviewId: string
  existingRating: number | null
  existingComment: string | null
}

export default function RatingForm({ reviewId, existingRating, existingComment }: Props) {
  const [selected, setSelected] = useState<number>(existingRating ?? 0)
  const [hovered, setHovered] = useState<number>(0)
  const [comment, setComment] = useState(existingComment ?? '')
  const [submitted, setSubmitted] = useState(!!existingRating)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selected) return
    setLoading(true)
    setError(null)
    const res = await fetch(`/api/review/${reviewId}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating: selected, comment }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Error al enviar valoración')
    } else {
      setSubmitted(true)
    }
    setLoading(false)
  }

  const active = hovered || selected

  return (
    <div style={{
      background: 'var(--surface2)',
      border: '1px solid var(--border)',
      padding: '20px 24px',
      marginBottom: 0,
    }}>
      <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 14 }}>
        VALORAR ESTA REVIEW
      </div>

      {submitted ? (
        <div>
          <div style={{ display: 'flex', gap: 6, marginBottom: selected && comment ? 10 : 0 }}>
            {[1, 2, 3, 4, 5].map(i => (
              <span key={i} style={{
                fontSize: 24,
                color: i <= selected ? 'var(--accent)' : 'var(--border2)',
              }}>★</span>
            ))}
          </div>
          {comment && (
            <p style={{ fontSize: 13, color: 'var(--text2)', margin: '8px 0 0', lineHeight: 1.5 }}>
              &quot;{comment}&quot;
            </p>
          )}
          <p style={{ fontSize: 12, color: 'var(--green)', margin: '10px 0 0' }}>
            Valoración enviada. ¡Gracias!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12 }}>
            ¿Fue útil esta review? Tu valoración ayuda a mejorar la plataforma.
          </div>

          {/* Stars */}
          <div
            style={{ display: 'flex', gap: 8, marginBottom: 16 }}
            onMouseLeave={() => setHovered(0)}
          >
            {[1, 2, 3, 4, 5].map(i => (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(i)}
                onMouseEnter={() => setHovered(i)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontSize: 28,
                  color: i <= active ? 'var(--accent)' : 'var(--border2)',
                  transition: 'color 0.1s',
                  lineHeight: 1,
                }}
              >
                ★
              </button>
            ))}
          </div>

          {/* Comment */}
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Comentario opcional..."
            rows={3}
            style={{ width: '100%', resize: 'vertical', fontSize: 13, marginBottom: 12, boxSizing: 'border-box' }}
          />

          {error && (
            <div style={{ fontSize: 12, color: 'var(--danger)', marginBottom: 10 }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={!selected || loading}
            className="btn btn-primary"
            style={{ height: 36, padding: '0 20px', fontSize: 13 }}
          >
            {loading ? '...' : 'ENVIAR VALORACIÓN'}
          </button>
        </form>
      )}
    </div>
  )
}
