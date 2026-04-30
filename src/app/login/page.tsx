'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

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
