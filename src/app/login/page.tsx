'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlError = params.get('error')
    if (urlError) setError(decodeURIComponent(urlError))
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  async function handleGitHub() {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) setError(error.message)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 36,
            color: 'var(--accent)',
            letterSpacing: 3,
          }}>
            PEAKFORM
          </span>
        </div>

        {sent ? (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid rgba(0,214,127,0.22)',
            padding: '28px 24px',
          }}>
            <div style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 20,
              color: 'var(--green)',
              marginBottom: 12,
            }}>
              REVISA TU EMAIL
            </div>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              Te hemos enviado un enlace de acceso a <strong style={{ color: 'var(--text)' }}>{email}</strong>. Haz clic en él para entrar.
            </p>
            <button
              onClick={() => setSent(false)}
              style={{ marginTop: 16, background: 'none', border: 'none', color: 'var(--text3)', fontSize: 13, cursor: 'pointer', padding: 0 }}
            >
              ← Usar otro email
            </button>
          </div>
        ) : (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border2)',
            padding: '32px 28px',
          }}>
            <h1 style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 24,
              color: 'var(--text)',
              margin: '0 0 6px',
              letterSpacing: 1,
            }}>
              ACCEDE A TU CUENTA
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: 13, margin: '0 0 28px' }}>
              Te enviamos un enlace al email — sin contraseña.
            </p>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  autoFocus
                />
              </div>

              {error && (
                <div style={{ color: 'var(--danger)', fontSize: 13, padding: '8px 12px', background: 'rgba(255,68,68,0.08)', border: '1px solid rgba(255,68,68,0.2)' }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="btn btn-primary btn-full"
                style={{ marginTop: 4 }}
              >
                {loading ? 'ENVIANDO...' : 'ENVIAR ENLACE →'}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border2)' }} />
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>O</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border2)' }} />
            </div>

            <button
              type="button"
              onClick={handleGitHub}
              className="btn btn-secondary btn-full"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              CONTINUAR CON GITHUB
            </button>

            <p style={{ marginTop: 20, fontSize: 12, color: 'var(--text3)', textAlign: 'center' }}>
              ¿Eres experto?{' '}
              <a href="/expert/register" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                Solicita unirte
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
