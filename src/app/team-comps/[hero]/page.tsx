import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/content/JsonLd'
import {
  TEAM_COMP_HEROES,
  TEAM_COMP_STYLE_LABELS,
  getTeamCompHero,
  getTeamCompsForHero,
  teamCompPageDescription,
  teamCompPageTitle,
} from '@/lib/overwatch-team-comps'
import { REPLAID_DISCORD_URL } from '@/lib/community'
import { absoluteUrl, buildMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return TEAM_COMP_HEROES.map(hero => ({ hero: hero.slug }))
}

export async function generateMetadata({ params }: { params: { hero: string } }): Promise<Metadata> {
  const hero = getTeamCompHero(params.hero)
  if (!hero) return {}
  return buildMetadata({
    title: teamCompPageTitle(hero),
    description: teamCompPageDescription(hero),
    path: `/team-comps/${hero.slug}`,
  })
}

export default function TeamCompHeroPage({ params }: { params: { hero: string } }) {
  const hero = getTeamCompHero(params.hero)
  if (!hero) notFound()

  const comps5 = getTeamCompsForHero(hero.slug, '5v5').slice(0, 3)
  const comps6 = getTeamCompsForHero(hero.slug, '6v6').slice(0, 3)
  const pageUrl = absoluteUrl(`/team-comps/${hero.slug}`)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: teamCompPageTitle(hero),
      description: teamCompPageDescription(hero),
      url: pageUrl,
      about: ['Overwatch', hero.name, 'composiciones', '5v5', '6v6'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Composiciones', item: absoluteUrl('/team-comps') },
        { '@type': 'ListItem', position: 2, name: hero.name, item: pageUrl },
      ],
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={jsonLd} />
      <PublicNav />

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 24px 88px' }}>
        <Link href="/team-comps" style={{ color: 'var(--text3)', textDecoration: 'none', fontSize: 13 }}>
          Volver a composiciones
        </Link>

        <header style={{ margin: '22px 0 34px', maxWidth: 840 }}>
          <div className="eyebrow">COMPOSICIONES POR HEROE</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(38px, 7vw, 72px)', letterSpacing: 1, lineHeight: 0.96, margin: '0 0 16px' }}>
            COMPOSICIONES CON {hero.name.toUpperCase()} EN OVERWATCH
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>
            Equipos recomendados para jugar con {hero.name} en 5v5 y 6v6. La idea es darte una base con sinergias claras, alternativas y señales para saber cuando esa composicion no merece la pena.
          </p>
        </header>

        <div className="counter-seo-layout">
          <div>
            <CompSection title={`Mejores composiciones 5v5 con ${hero.name}`} comps={comps5} />
            <CompSection title={`Ajustes para 6v6 con ${hero.name}`} comps={comps6} />

            <section className="counter-seo-section counter-seo-callout">
              <h2>Como elegir entre 5v5 y 6v6</h2>
              <p>
                En 5v5 hay menos mitigacion y el timing individual pesa mas. En 6v6 hay mas peel, mas cuerpos ocupando espacio y mas recursos defensivos, asi que las composiciones con {hero.name} necesitan una condicion de entrada mas clara.
              </p>
            </section>
          </div>

          <aside className="counter-seo-sidebar">
            <div>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', margin: 0 }}>Enlaces utiles</h2>
              <Link href="/team-comps">Todas las composiciones</Link>
              <Link href={`/counters/${hero.slug}`}>Counters de {hero.name}</Link>
              <Link href={`/heroes/${hero.slug}`}>Guia de {hero.name}</Link>
              <Link href={`/guides/${hero.guideSlug}`}>Video guia</Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

function CompSection({ title, comps }: { title: string; comps: ReturnType<typeof getTeamCompsForHero> }) {
  return (
    <section className="counter-seo-section">
      <h2>{title}</h2>
      <div className="team-comp-seo-grid">
        {comps.map(comp => (
          <article key={comp.id} className="team-comp-card">
            <div className="team-comp-card-header">
              <div>
                <span>{comp.format}</span>
                <span>{TEAM_COMP_STYLE_LABELS[comp.style]}</span>
              </div>
              <h3>{comp.title}</h3>
              <p>{comp.description}</p>
            </div>
            <div className="team-comp-line"><span>{comp.format === '6v6' ? 'Tanks' : 'Tank'}</span><div>{comp.tanks.map(name => <strong key={name}>{name}</strong>)}</div></div>
            <div className="team-comp-line"><span>DPS</span><div>{comp.dps.map(name => <strong key={name}>{name}</strong>)}</div></div>
            <div className="team-comp-line"><span>Supports</span><div>{comp.supports.map(name => <strong key={name}>{name}</strong>)}</div></div>
            <div className="team-comp-notes">
              <p><strong>Condicion:</strong> {comp.winCondition}</p>
              <p><strong>Evitala si:</strong> {comp.avoidWhen}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
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
