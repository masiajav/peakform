'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { UserRole } from '@/types'

interface AppNavProps {
  role?: UserRole
  displayName?: string
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

export default function AppNav({ role = 'user', displayName }: AppNavProps) {
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const homeHref = role === 'admin' ? '/admin' : role === 'expert' ? '/expert' : '/dashboard'

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

      {/* Avatar / nombre */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        position: 'relative',
      }}
        onClick={handleSignOut}
        title="Cerrar sesión"
      >
        <div style={{
          width: 36,
          height: 36,
          background: 'var(--surface3)',
          border: '1px solid var(--border2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          color: 'var(--text2)',
          fontWeight: 500,
        }}>
          {displayName ? displayName[0].toUpperCase() : '?'}
        </div>
      </div>
    </nav>
  )
}
