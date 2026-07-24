import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import SeoFaq from '@/components/content/SeoFaq'
import CounterExplorer from './CounterExplorer'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'
import { PILLAR_COUNTER_SLUGS } from '@/lib/indexing-policy'
import SiteNav from '@/components/layout/PublicNav'
import { REPLAID_DISCORD_URL } from '@/lib/community'
import { absoluteUrl, buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Counters de Overwatch por héroe: picks y matchups para ranked',
  description: 'Busca qué jugar contra cada héroe de Overwatch: counters, picks recomendados, ventanas de castigo y cuándo no cambiar por tilt.',
  path: '/counters',
})

export default function CountersPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Counters de héroes de Overwatch',
    itemListElement: COUNTER_HEROES.filter(hero => PILLAR_COUNTER_SLUGS.includes(hero.slug)).map((hero, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `Counters de ${hero.name}`,
      url: absoluteUrl(`/counters/${hero.slug}`),
    })),
  }

  const faq = [
    {
      question: '¿Qué significa counter en Overwatch?',
      answer: 'Un counter es un héroe, estilo de juego o composición que reduce mucho el valor de otro héroe al negar su recurso principal o castigar su debilidad.',
    },
    {
      question: '¿Tengo que cambiar siempre si me counterean?',
      answer: 'No siempre. A veces basta con cambiar posición, timing o cooldowns. Cambia cuando tu héroe ya no puede cumplir su función.',
    },
    {
      question: '¿Los counters cambian con los parches?',
      answer: 'Sí. Cambios de daño, cooldowns, perks o formato pueden alterar los matchups, así que conviene revisar patch notes antes de asumir valores.',
    },
  ]
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={itemListJsonLd} />
      <SiteNav />

      <main style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px 88px' }}>
        <header style={{ maxWidth: 820, marginBottom: 28 }}>
          <div className="eyebrow">COUNTERS POR HÉROE</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 7vw, 76px)', letterSpacing: 1, lineHeight: 0.96, margin: '0 0 16px' }}>
            COUNTERS DE OVERWATCH POR HÉROE
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>
            Selecciona un héroe y mira qué picks le molestan, qué cooldown tienes que esperar y cuándo el problema no es el counter sino tu timing. Si buscas counter de Zarya, Tracer, Genji, Ana o Shion, empieza por aquí y baja después al matchup concreto.
          </p>
        </header>

        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 22, marginBottom: 20 }}>
          <div className="eyebrow">CÓMO LEER UN COUNTER</div>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.65, margin: '0 0 12px' }}>
            Un counter funciona cuando niega movilidad, fuerza un cooldown clave, castiga el rango cómodo del rival o protege el objetivo que quiere matar. No se trata solo de cambiar de pick: si mantienes el mismo timing malo, el matchup seguirá siendo incómodo.
          </p>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.65, margin: 0 }}>
            Antes de cambiar, revisa si el problema es realmente el matchup o si estás entrando demasiado pronto, jugando sin cobertura o gastando recursos antes de la amenaza real.
          </p>
        </section>

        <section style={{ background: 'var(--surface2)', border: '1px solid var(--border)', padding: 18, marginBottom: 20 }}>
          <div className="eyebrow">BÚSQUEDAS POPULARES</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
            {[
              { href: '/counters/zarya', label: 'Counter Zarya' },
              { href: '/counters/tracer', label: 'Counter Tracer' },
              { href: '/counters/genji', label: 'Counter Genji' },
              { href: '/counters/ana', label: 'Counter Ana' },
              { href: '/counters/domina', label: 'Counter Domina' },
              { href: '/counters/shion', label: 'Counter Shion' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="btn btn-secondary btn-sm">
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <CounterExplorer />
        <SeoFaq items={faq} title="Preguntas sobre counters de Overwatch" />
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
