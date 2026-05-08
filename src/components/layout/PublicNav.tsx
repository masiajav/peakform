import Link from 'next/link'
import { REPLAID_DISCORD_URL } from '@/lib/community'

type PublicNavProps = {
  ctaHref?: string
  ctaLabel?: string
}

const NAV_LINKS = [
  { href: '/guides', label: 'Guías' },
  { href: '/counters', label: 'Counters' },
  { href: '/team-comps', label: 'Composiciones' },
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
  return (
    <nav className="public-nav">
      <Link href="/" className="public-nav-brand" aria-label="Ir al inicio de Replaid Lab">
        REPLAID LAB
      </Link>
      <div className="public-nav-spacer" />
      <div className="public-nav-links" aria-label="Navegación principal">
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
