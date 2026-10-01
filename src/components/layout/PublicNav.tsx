'use client'

import { useId, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { REPLAID_DISCORD_URL } from '@/lib/community'

type PublicNavProps = {
  ctaHref?: string
  ctaLabel?: string
}

const NAV_LINKS = [
  { href: '/heroes', label: 'Héroes' },
  { href: '/guides', label: 'Guías' },
  { href: '/team-comps', label: 'Composiciones' },
  { href: '/pick-lab', label: 'Pick Lab' },
  { href: '/maps', label: 'Mapas' },
  { href: '/news', label: 'Noticias' },
  { href: '/experts', label: 'Expertos' },
]

const linkStyle = {
  color: 'var(--text2)',
  flex: '0 0 auto',
  fontSize: 13,
  textDecoration: 'none',
} as const

export default function PublicNav({ ctaHref = '/login', ctaLabel = 'ENTRAR' }: PublicNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const toggle = useRef<HTMLButtonElement>(null)

  return (
    <nav className="public-nav" aria-label="Navegación pública" onKeyDown={event => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        toggle.current?.focus()
      }
    }}>
      <Link href="/" className="public-nav-brand" aria-label="Ir al inicio de Replaid Lab">
        REPLAID LAB
      </Link>
      <div className="public-nav-spacer" />
      <button
        ref={toggle}
        type="button"
        className="public-nav-toggle"
        aria-label={menuOpen ? 'Cerrar navegación' : 'Abrir navegación'}
        title={menuOpen ? 'Cerrar navegación' : 'Abrir navegación'}
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={() => setMenuOpen(open => !open)}
      >
        {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>
      <div id={menuId} className={`public-nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Navegación principal" onClick={event => {
        if ((event.target as HTMLElement).closest('a')) setMenuOpen(false)
      }}>
        {NAV_LINKS.map(link => (
          <Link key={link.href} href={link.href} style={linkStyle}>
            {link.label}
          </Link>
        ))}
        <a
          href={REPLAID_DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...linkStyle, color: 'var(--accent)' }}
        >
          Discord
        </a>
        <Link href={ctaHref} className="btn btn-primary btn-sm public-nav-cta">
          {ctaLabel}
        </Link>
      </div>
    </nav>
  )
}
