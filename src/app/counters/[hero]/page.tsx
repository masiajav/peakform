import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/content/JsonLd'
import { REPLAID_DISCORD_URL } from '@/lib/community'
import { COUNTER_HEROES, getCounterHero, type CounterPick } from '@/lib/overwatch-counters'
import { ROLE_LABELS } from '@/lib/content'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'
import { buildHeroSeoProfile, counterPageDescription, counterPageTitle } from '@/lib/overwatch-seo'

export function generateStaticParams() {
  return COUNTER_HEROES.map(hero => ({ hero: hero.slug }))
}

export function generateMetadata({ params }: { params: { hero: string } }): Metadata {
  const hero = getCounterHero(params.hero)
  if (!hero) return {}

  return buildMetadata({
    title: counterPageTitle(hero),
    description: counterPageDescription(hero),
    path: `/counters/${hero.slug}`,
  })
}

export default function CounterHeroPage({ params }: { params: { hero: string } }) {
  const hero = getCounterHero(params.hero)
  const profile = buildHeroSeoProfile(params.hero)

  if (!hero || !profile) notFound()

  const roleLabel = ROLE_LABELS[hero.role]
  const pageUrl = absoluteUrl(`/counters/${hero.slug}`)
  const counterJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: counterPageTitle(hero),
    description: counterPageDescription(hero),
    url: pageUrl,
    inLanguage: 'es',
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntity: {
      '@type': 'ItemList',
      name: `Counters fuertes contra ${hero.name}`,
      itemListElement: hero.counters.map((counter, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: counter.name,
        url: absoluteUrl(`/heroes/${counter.slug}`),
      })),
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Counters', item: absoluteUrl('/counters') },
      { '@type': 'ListItem', position: 2, name: hero.name, item: pageUrl },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={counterJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <PublicNav />

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '56px 24px 88px' }}>
        <div style={{ marginBottom: 28, fontSize: 12, color: 'var(--text3)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/counters" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Counters</Link>
          <span>/</span>
          <span>{hero.name}</span>
        </div>

        <header style={{ maxWidth: 860, marginBottom: 34 }}>
          <div className="eyebrow">COUNTERS DE OVERWATCH</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(38px, 7vw, 72px)', letterSpacing: 1, lineHeight: 0.96, margin: '0 0 16px' }}>
            COUNTERS DE {hero.name.toUpperCase()}
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>
            {counterPageDescription(hero)}
          </p>
        </header>

        <div className="counter-seo-layout">
          <article style={{ minWidth: 0 }}>
            <section className="counter-seo-section">
              <div className="eyebrow">RESUMEN RÁPIDO</div>
              <p>{profile.intent}</p>
              <div className="counter-seo-facts">
                <Link href={`/heroes/${hero.slug}`}>Página de {hero.name}</Link>
                <Link href={`/roles/${hero.role}`}>Guías de {roleLabel}</Link>
                <Link href={`/guides/${hero.guideSlug}`}>Guía en vídeo</Link>
              </div>
            </section>

            <section className="counter-seo-section">
              <h2>Counters fuertes contra {hero.name}</h2>
              <div className="counter-seo-grid">
                {hero.counters.map(counter => (
                  <CounterCard key={counter.slug} item={counter} />
                ))}
              </div>
            </section>

            <section className="counter-seo-section">
              <h2>Ten cuidado con</h2>
              <div className="counter-seo-grid">
                {hero.watchOutFor.map(counter => (
                  <CounterCard key={counter.slug} item={counter} />
                ))}
              </div>
            </section>

            <section className="counter-seo-section">
              <h2>Cómo ganar el matchup</h2>
              <TopicGrid items={profile.quickWins} />
            </section>

            <section className="counter-seo-section">
              <h2>Errores comunes contra {hero.name}</h2>
              <TopicGrid items={profile.commonMistakes} />
            </section>

            <section className="counter-seo-section counter-seo-callout">
              <div className="eyebrow">6V6</div>
              <p>{profile.sixVsSix}</p>
            </section>
          </article>

          <aside className="counter-seo-sidebar">
            <div>
              <div className="eyebrow">ENLACES INTERNOS</div>
              <Link href="/counters">Todos los counters</Link>
              <Link href={`/heroes/${hero.slug}`}>Guía pilar de {hero.name}</Link>
              <Link href={`/roles/${hero.role}`}>Aprender {roleLabel}</Link>
              <Link href="/guides">Todas las guías</Link>
            </div>
            <div>
              <div className="eyebrow">RELACIONADOS</div>
              {hero.related.map(slug => {
                const related = getCounterHero(slug)
                if (!related) return null
                return (
                  <Link key={related.slug} href={`/counters/${related.slug}`}>
                    Counters de {related.name}
                  </Link>
                )
              })}
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

function CounterCard({ item }: { item: CounterPick }) {
  return (
    <Link href={`/heroes/${item.slug}`} className="counter-matchup">
      <strong>{item.name}</strong>
      <span>{item.reason}</span>
    </Link>
  )
}

function TopicGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="counter-seo-grid">
      {items.map(item => (
        <article key={item.title} className="counter-seo-card">
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
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
