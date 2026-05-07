import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import CounterExplorer from './CounterExplorer'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'
import { REPLAID_DISCORD_URL } from '@/lib/community'
import { absoluteUrl, buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Counters de Overwatch por héroe',
  description: 'Tabla interactiva de counters de Overwatch: elige un héroe y revisa counters fuertes, amenazas, rol y guías relacionadas.',
  path: '/counters',
})

export default function CountersPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Counters de héroes de Overwatch',
    itemListElement: COUNTER_HEROES.map((hero, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `Counters de ${hero.name}`,
      url: absoluteUrl(`/counters/${hero.slug}`),
    })),
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={itemListJsonLd} />
      <PublicNav />

      <main style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px 88px' }}>
        <header style={{ maxWidth: 820, marginBottom: 28 }}>
          <div className="eyebrow">HERRAMIENTA SEO</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 7vw, 76px)', letterSpacing: 1, lineHeight: 0.96, margin: '0 0 16px' }}>
            COUNTERS DE OVERWATCH
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>
            Selecciona un héroe para ver counters fuertes, amenazas que debes respetar y enlaces directos a guías relacionadas. Cada matchup importante tiene también una página indexable para búsquedas concretas.
          </p>
        </header>

        <CounterExplorer />
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
      <Link href="/guides" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Guías</Link>
      <Link href="/counters" className="hide-mobile" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>Counters</Link>
      <Link href="/experts" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
      <a href={REPLAID_DISCORD_URL} target="_blank" rel="noopener noreferrer" className="hide-mobile" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>Discord</a>
      <Link href="/login" className="btn btn-primary btn-sm">ENTRAR</Link>
    </nav>
  )
}
