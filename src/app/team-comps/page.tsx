import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import TeamCompExplorer from './TeamCompExplorer'
import { TEAM_COMP_HEROES } from '@/lib/overwatch-team-comps'
import SiteNav from '@/components/layout/PublicNav'
import { REPLAID_DISCORD_URL } from '@/lib/community'
import { absoluteUrl, buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Composiciones de Overwatch: equipos 5v5 y 6v6 por heroe',
  description: 'Herramienta interactiva de composiciones de Overwatch: elige un heroe y encuentra equipos recomendados para 5v5 y 6v6 con dive, poke, rush, brawl y flyers.',
  path: '/team-comps',
})

export default function TeamCompsPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Composiciones de Overwatch por heroe',
    itemListElement: TEAM_COMP_HEROES.map((hero, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `Composiciones con ${hero.name}`,
      url: absoluteUrl(`/team-comps/${hero.slug}`),
    })),
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={itemListJsonLd} />
      <SiteNav />

      <main style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px 88px' }}>
        <header style={{ maxWidth: 860, marginBottom: 28 }}>
          <div className="eyebrow">COMPOSICIONES</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 7vw, 76px)', letterSpacing: 1, lineHeight: 0.96, margin: '0 0 16px' }}>
            COMPOSICIONES DE OVERWATCH
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>
            Selecciona un heroe para ver composiciones de 5v5 y 6v6 que encajan con su forma de aportar valor. Usa estas recomendaciones como punto de partida: mapa, rango y counters rivales siempre importan.
          </p>
        </header>

        <TeamCompExplorer />
      </main>
    </div>
  )
}

function PublicNav() {
  return (
    <nav style={{
      height: 52, background: 'var(--bg)', borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 20,
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link href="/" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: 'var(--accent)', letterSpacing: 3, textDecoration: 'none' }}>
        REPLAID LAB
      </Link>
      <div style={{ flex: 1 }} />
      <Link href="/guides" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Guias</Link>
      <Link href="/counters" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Counters</Link>
      <Link href="/team-comps" className="hide-mobile" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>Composiciones</Link>
      <Link href="/experts" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
      <a href={REPLAID_DISCORD_URL} target="_blank" rel="noopener noreferrer" className="hide-mobile" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>Discord</a>
      <Link href="/login" className="btn btn-primary btn-sm">ENTRAR</Link>
    </nav>
  )
}
