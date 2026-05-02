'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import type { UserRole } from '@/types'

interface AppNavProps {
  role?: UserRole
  displayName?: string
  avatarUrl?: string | null
}

const ROLE_LABELS: Record<UserRole, string> = {
  user:   'JUGADOR',
  expert: 'EXPERTO',
  admin:  'ADMIN',
}

const ROLE_COLORS: Record<UserRole, string> = {
  user:   'var(--text3)',
  expert: 'var(--accent)',
  admin:  'var(--yellow)',
}

export default function AppNav({ role = 'user', displayName, avatarUrl }: AppNavProps) {
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const homeHref = role === 'admin' ? '/admin' : role === 'expert' ? '/expert/dashboard' : '/dashboard'

  return (
    <nav style={{
      height: 52,
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 16,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <a href={homeHref} style={{ textDecoration: 'none' }}>
        <span style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 26,
          color: 'var(--accent)',
          letterSpacing: 3,
        }}>
          PEAKFORM
        </span>
      </a>

      <div style={{ flex: 1 }} />

      {/* Role badge */}
      {role && (
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 11,
          fontWeight: 500,
          color: ROLE_COLORS[role],
          background: 'var(--surface2)',
          border: `1px solid var(--border2)`,
          padding: '2px 8px',
          letterSpacing: 0.5,
        }}>
          {ROLE_LABELS[role]}
        </span>
      )}

      {/* Avatar dropdown */}
      <div ref={ref} style={{ position: 'relative' }}>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <div style={{
            width: 36,
            height: 36,
            background: 'var(--surface3)',
            border: `1px solid ${open ? 'var(--accent)' : 'var(--border2)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            color: 'var(--text2)',
            fontWeight: 500,
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              displayName ? displayName[0].toUpperCase() : '?'
            )}
          </div>
          <span style={{ fontSize: 13, color: 'var(--text2)', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {displayName}
          </span>
        </button>

        {open && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            minWidth: 200,
            zIndex: 200,
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500, marginBottom: 2 }}>
                {displayName}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                {ROLE_LABELS[role]}
              </div>
            </div>
            <a
              href="/profile"
              style={{
                display: 'block',
                padding: '12px 16px',
                fontSize: 13,
                color: 'var(--text2)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
              }}
              onClick={() => setOpen(false)}
            >
              Mi perfil
            </a>
            <button
              onClick={handleSignOut}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                color: 'var(--danger)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
