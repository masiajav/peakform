import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import SeoFaq from '@/components/content/SeoFaq'
import TeamCompExplorer from './TeamCompExplorer'
import { TEAM_COMP_HEROES } from '@/lib/overwatch-team-comps'
import { PILLAR_TEAM_COMP_SLUGS } from '@/lib/indexing-policy'
import SiteNav from '@/components/layout/PublicNav'
import { REPLAID_DISCORD_URL } from '@/lib/community'
import { absoluteUrl, buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Composiciones de Overwatch para ranked: dive, poke, brawl y 6v6',
  description: 'Encuentra composiciones de Overwatch para ranked: dive, poke, rush, brawl, 5v5 y 6v6 con héroes recomendados y condición de victoria.',
  path: '/team-comps',
})

export default function TeamCompsPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Composiciones de Overwatch por heroe',
    itemListElement: TEAM_COMP_HEROES.filter(hero => PILLAR_TEAM_COMP_SLUGS.includes(hero.slug)).map((hero, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `Composiciones con ${hero.name}`,
      url: absoluteUrl(`/team-comps/${hero.slug}`),
    })),
  }

  const faq = [
    {
      question: '¿Cuál es la mejor composición de Overwatch?',
      answer: 'No hay una única mejor composición. Depende del mapa, héroes disponibles, counters rivales y coordinación del equipo.',
    },
    {
      question: '¿Qué diferencia hay entre dive, poke y brawl?',
      answer: 'Dive entra rápido sobre un objetivo vulnerable, poke gana desde rango y brawl pelea junto a corta distancia con sustain y daño explosivo.',
    },
    {
      question: '¿Sirven estas composiciones para ranked?',
      answer: 'Sí, como punto de partida. En ranked importa más entender la condición de victoria que copiar cinco héroes sin un plan común.',
    },
  ]
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={itemListJsonLd} />
      <SiteNav />

      <main style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px 88px' }}>
        <header style={{ maxWidth: 860, marginBottom: 28 }}>
          <div className="eyebrow">COMPOSICIONES</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 7vw, 76px)', letterSpacing: 1, lineHeight: 0.96, margin: '0 0 16px' }}>
            COMPOSICIONES DE OVERWATCH PARA RANKED
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>
            Selecciona un héroe para ver composiciones de 5v5 y 6v6 que encajan con su forma de aportar valor. Compara dive, poke, rush y brawl para elegir un plan de equipo más claro antes de entrar a ranked.
          </p>
        </header>

        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 22, marginBottom: 20 }}>
          <div className="eyebrow">CÓMO ELEGIR COMPOSICIÓN</div>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.65, margin: '0 0 12px' }}>
            Una composición no es solo una lista de héroes. Necesita una condición de victoria clara: entrar juntos, ganar rango, controlar altura, proteger la backline o castigar un cooldown concreto.
          </p>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.65, margin: 0 }}>
            En 5v5 el timing individual pesa más. En 6v6 hay más peel, más mitigación y menos ventanas individuales, así que simplificar el plan suele funcionar mejor que buscar una composición perfecta.
          </p>
        </section>

        <section style={{ background: 'var(--surface2)', border: '1px solid var(--border)', padding: 18, marginBottom: 20 }}>
          <div className="eyebrow">ATAJOS PARA RANKED</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
            {[
              { href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Dive, poke o brawl' },
              { href: '/team-comps/winston', label: 'Composición dive' },
              { href: '/team-comps/reinhardt', label: 'Composición brawl' },
              { href: '/team-comps/cassidy', label: 'Composición poke' },
              { href: '/team-comps/shion', label: 'Composición con Shion' },
              { href: '/team-comps/ana', label: 'Composición con Ana' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="btn btn-secondary btn-sm">
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <TeamCompExplorer />
        <SeoFaq items={faq} title="Preguntas sobre composiciones de Overwatch" />
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
