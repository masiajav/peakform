'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ExpertAuthSection() {
  const [email, setEmail]   = useState('')
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState<string | null>(null)

  const supabase = createClient()

  function getRedirectTo() {
    return `${window.location.origin}/auth/callback?next=/apply`
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: getRedirectTo() },
    })
    if (error) setError(error.message)
    else setSent(true)
    setLoading(false)
  }

  async function handleGoogle() {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: getRedirectTo() },
    })
    if (error) setError(error.message)
  }

  async function handleGitHub() {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: getRedirectTo() },
    })
    if (error) setError(error.message)
  }

  if (sent) {
    return (
      <div style={{
        background: 'rgba(0,214,127,0.04)', border: '1px solid rgba(0,214,127,0.2)',
        padding: '28px 32px',
      }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, color: 'var(--green)', marginBottom: 10, letterSpacing: 1 }}>
          REVISA TU EMAIL
        </div>
        <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6, margin: '0 0 16px' }}>
          Enviamos un enlace de acceso a <strong style={{ color: 'var(--text)' }}>{email}</strong>. Al hacer clic volverás aquí para completar tu solicitud.
        </p>
        <button
          onClick={() => setSent(false)}
          style={{ background: 'none', border: 'none', color: 'var(--text3)', fontSize: 13, cursor: 'pointer', padding: 0 }}
        >
          ← Usar otro email
        </button>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1, color: 'var(--text)', marginBottom: 6 }}>
          CREA TU CUENTA
        </div>
        <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>
          Regístrate o accede para completar tu solicitud de experto.
        </p>
      </div>

      {error && (
        <div style={{ background: 'rgba(255,68,68,0.06)', border: '1px solid rgba(255,68,68,0.2)', padding: '10px 14px', fontSize: 13, color: 'var(--danger)', marginBottom: 16 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        <button onClick={handleGoogle} className="btn btn-secondary btn-full" style={{ justifyContent: 'center', gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          CONTINUAR CON GOOGLE
        </button>
        <button onClick={handleGitHub} className="btn btn-secondary btn-full" style={{ justifyContent: 'center', gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          CONTINUAR CON GITHUB
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0' }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border2)' }} />
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>O CON EMAIL</span>
        <div style={{ flex: 1, height: 1, background: 'var(--border2)' }} />
      </div>

      <form onSubmit={handleMagicLink} style={{ display: 'flex', gap: 10 }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          style={{ flex: 1 }}
        />
        <button type="submit" disabled={loading || !email} className="btn btn-primary">
          {loading ? '...' : 'ENVIAR →'}
        </button>
      </form>

      <p style={{ marginTop: 16, fontSize: 12, color: 'var(--text3)' }}>
        ¿Ya tienes cuenta?{' '}
        <a href="/login" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
          Inicia sesión
        </a>
      </p>
    </div>
  )
}
