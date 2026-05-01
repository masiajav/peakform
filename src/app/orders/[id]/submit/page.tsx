'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AppNav from '@/components/layout/AppNav'

const FOCUS_OPTIONS = [
  'Posicionamiento',
  'Mecánicas de personaje',
  'Gestión de ultimates',
  'Rotaciones',
  'Macro game',
  'Comunicación / callouts',
]

const ROLE_OPTIONS = [
  { value: 'tank',    label: 'Tank' },
  { value: 'dps',     label: 'DPS' },
  { value: 'support', label: 'Support' },
  { value: 'flex',    label: 'Flex' },
]

export default function SubmitReplayPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const supabase = createClient()

  const [profile, setProfile] = useState<any>(null)
  const [order, setOrder]     = useState<any>(null)
  const [replayUrl, setReplayUrl]   = useState('')
  const [playerRole, setPlayerRole] = useState('dps')
  const [focusAreas, setFocusAreas] = useState<string[]>([])
  const [userNotes, setUserNotes]   = useState('')
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(p)

      const { data: o } = await supabase
        .from('orders')
        .select('*, expert:experts(display_name)')
        .eq('id', params.id)
        .eq('user_id', user.id)
        .single()

      if (!o || o.status !== 'paid') { router.push('/dashboard'); return }
      setOrder(o)
    }
    load()
  }, [])

  function toggleFocus(area: string) {
    setFocusAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!replayUrl.trim()) { setError('El enlace al replay es obligatorio'); return }
    setLoading(true)
    setError(null)

    const res = await fetch(`/api/orders/${params.id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        replay_url:  replayUrl.trim(),
        player_role: playerRole,
        focus_areas: focusAreas,
        user_notes:  userNotes.trim() || null,
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Error al enviar el replay')
      setLoading(false)
      return
    }

    router.push('/dashboard?order=submitted')
  }

  if (!order) return null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <AppNav role="user" displayName={profile?.display_name} />

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 24px' }}>
        <a href="/dashboard" style={{ fontSize: 13, color: 'var(--text3)', textDecoration: 'none' }}>
          ← Volver al dashboard
        </a>

        <h1 style={{
          fontFamily: 'Bebas Neue, sans-serif', fontSize: 28,
          color: 'var(--text)', margin: '20px 0 4px', letterSpacing: 1,
        }}>
          SUBE TU REPLAY
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: 14, margin: '0 0 28px' }}>
          Para <strong style={{ color: 'var(--text)' }}>{order.expert?.display_name}</strong> — {order.tier.replace('_', ' ')}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Replay URL */}
          <div>
            <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Enlace al replay *
            </label>
            <input
              type="url"
              value={replayUrl}
              onChange={e => setReplayUrl(e.target.value)}
              placeholder="https://replay.gg/..."
              required
              autoFocus
            />
            <p style={{ fontSize: 12, color: 'var(--text3)', margin: '6px 0 0' }}>
              Usa replay.gg, Medal.tv, o cualquier enlace de vídeo público
            </p>
          </div>

          {/* Rol en la partida */}
          <div>
            <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Tu rol en la partida
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {ROLE_OPTIONS.map(r => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setPlayerRole(r.value)}
                  style={{
                    flex: 1, padding: '8px 0', fontSize: 13, cursor: 'pointer',
                    background: playerRole === r.value ? 'rgba(255,107,43,0.1)' : 'var(--surface)',
                    border: `1px solid ${playerRole === r.value ? 'var(--accent)' : 'var(--border)'}`,
                    color: playerRole === r.value ? 'var(--accent)' : 'var(--text2)',
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Áreas de foco */}
          <div>
            <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              ¿Qué quieres mejorar? (opcional)
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {FOCUS_OPTIONS.map(area => (
                <button
                  key={area}
                  type="button"
                  onClick={() => toggleFocus(area)}
                  style={{
                    padding: '6px 14px', fontSize: 12, cursor: 'pointer',
                    background: focusAreas.includes(area) ? 'rgba(255,107,43,0.1)' : 'var(--surface)',
                    border: `1px solid ${focusAreas.includes(area) ? 'var(--accent)' : 'var(--border2)'}`,
                    color: focusAreas.includes(area) ? 'var(--accent)' : 'var(--text2)',
                  }}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Notas adicionales */}
          <div>
            <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Contexto adicional (opcional)
            </label>
            <textarea
              value={userNotes}
              onChange={e => setUserNotes(e.target.value)}
              placeholder="¿Qué pasó en la partida? ¿Algo específico que quieras que el experto vea?"
              rows={4}
              style={{ width: '100%', resize: 'vertical' }}
            />
          </div>

          {error && (
            <div style={{ color: 'var(--danger)', fontSize: 13, padding: '8px 12px', background: 'rgba(255,68,68,0.08)', border: '1px solid rgba(255,68,68,0.2)' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-full"
          >
            {loading ? 'ENVIANDO…' : 'ENVIAR REPLAY →'}
          </button>
        </form>
      </div>
    </div>
  )
}
