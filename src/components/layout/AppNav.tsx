'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import type { CSSProperties } from 'react'
import type { UserRole } from '@/types'
import { REPLAID_DISCORD_URL } from '@/lib/community'

interface AppNavProps {
  role?: UserRole
  displayName?: string
  avatarUrl?: string | null
}

const ROLE_LABELS: Record<UserRole, string> = {
  user: 'JUGADOR',
  expert: 'EXPERTO',
  admin: 'ADMIN',
}

const ROLE_COLORS: Record<UserRole, string> = {
  user: 'var(--text3)',
  expert: 'var(--accent)',
  admin: 'var(--yellow)',
}

export default function AppNav({ role = 'user', displayName, avatarUrl }: AppNavProps) {
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const panelHref = role === 'admin' ? '/admin' : role === 'expert' ? '/expert/dashboard' : '/dashboard'

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

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
      <a href="/" style={{ textDecoration: 'none' }} aria-label="Ir a la landing de Replaid Lab">
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: 'var(--accent)', letterSpacing: 3 }}>
          REPLAID LAB
        </span>
      </a>

      <div style={{ flex: 1 }} />

      <a href="/guides" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Guías</a>
      <a href="/counters" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Counters</a>
      <a href="/news" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Noticias</a>
      <a href="/experts" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</a>
      <a href={REPLAID_DISCORD_URL} target="_blank" rel="noopener noreferrer" className="hide-mobile" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>Discord</a>
      <a href={panelHref} className="hide-mobile" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>Panel</a>

      <span style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 11,
        fontWeight: 500,
        color: ROLE_COLORS[role],
        background: 'var(--surface2)',
        border: '1px solid var(--border2)',
        padding: '2px 8px',
        letterSpacing: 0.5,
      }}>
        {ROLE_LABELS[role]}
      </span>

      <div ref={ref} style={{ position: 'relative' }}>
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Abrir menu de usuario"
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
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
              <img src={avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              displayName ? displayName[0].toUpperCase() : '?'
            )}
          </div>
          <span className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
              <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500, marginBottom: 2 }}>{displayName}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{ROLE_LABELS[role]}</div>
            </div>
            <a href={panelHref} style={menuLinkStyle('var(--accent)')} onClick={() => setOpen(false)}>Mi panel</a>
            <a href="/profile" style={menuLinkStyle('var(--text2)')} onClick={() => setOpen(false)}>Mi perfil</a>
            <a href="/counters" style={menuLinkStyle('var(--text2)')} onClick={() => setOpen(false)}>Counters</a>
            <a href={REPLAID_DISCORD_URL} target="_blank" rel="noopener noreferrer" style={menuLinkStyle('var(--accent)')} onClick={() => setOpen(false)}>Discord Replaid Lab</a>
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
              Cerrar sesion
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

function menuLinkStyle(color: string): CSSProperties {
  return {
    display: 'block',
    padding: '12px 16px',
    fontSize: 13,
    color,
    textDecoration: 'none',
    borderBottom: '1px solid var(--border)',
  }
}
