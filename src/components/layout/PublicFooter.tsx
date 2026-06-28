'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { REPLAID_DISCORD_URL } from '@/lib/community'

const PRIVATE_PREFIXES = [
  '/admin',
  '/apply',
  '/auth',
  '/dashboard',
  '/expert',
  '/login',
  '/orders',
  '/profile',
  '/stripe',
]

const CONTENT_LINKS = [
  { href: '/heroes', label: 'Héroes' },
  { href: '/guides', label: 'Guías' },
  { href: '/counters', label: 'Counters' },
  { href: '/team-comps', label: 'Composiciones' },
]

const TRUST_LINKS = [
  { href: '/about', label: 'Sobre Replaid Lab' },
  { href: '/contact', label: 'Contacto' },
  { href: '/editorial-methodology', label: 'Metodología editorial' },
  { href: '/privacy', label: 'Privacidad' },
  { href: '/legal', label: 'Legal' },
]

export default function PublicFooter() {
  const pathname = usePathname()
  if (PRIVATE_PREFIXES.some(prefix => pathname === prefix || pathname.startsWith(`${prefix}/`))) return null

  return (
    <footer className="public-footer">
      <div className="public-footer-inner">
        <div className="public-footer-brand">
          <Link href="/">REPLAID LAB</Link>
          <p>Guías prácticas de Overwatch para entender tus errores y tomar mejores decisiones en ranked.</p>
        </div>

        <nav className="public-footer-column" aria-label="Contenido de Replaid Lab">
          <strong>Contenido</strong>
          {CONTENT_LINKS.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>

        <nav className="public-footer-column" aria-label="Confianza y contacto">
          <strong>Replaid Lab</strong>
          {TRUST_LINKS.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>

        <div className="public-footer-column">
          <strong>Comunidad</strong>
          <Link href="/experts">Expertos</Link>
          <Link href="/news">Noticias</Link>
          <a href={REPLAID_DISCORD_URL} target="_blank" rel="noopener noreferrer">Discord</a>
        </div>
      </div>
      <div className="public-footer-bottom">© 2026 Replaid Lab</div>
    </footer>
  )
}
