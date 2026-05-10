import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { ROLE_LABELS } from '@/lib/content'
import { COUNTER_HEROES, type CounterHero, type CounterRole } from '@/lib/overwatch-counters'
import { buildHeroAbilityOverview, getHeroAbilityNames } from '@/lib/overwatch-hero-abilities'
import { buildMetadata, absoluteUrl, SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Héroes de Overwatch: habilidades, roles, counters y guías',
  description: 'Lista completa de héroes de Overwatch con rol, explicación básica de habilidades y enlaces a guías, counters y composiciones.',
  path: '/heroes',
})

const roleOrder: CounterRole[] = ['tank', 'dps', 'support']

export default function HeroesIndexPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Héroes de Overwatch',
    description: 'Hub de héroes de Overwatch con habilidades, roles, guías y counters.',
    url: absoluteUrl('/heroes'),
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: COUNTER_HEROES.map((hero, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: hero.name,
        url: absoluteUrl(`/heroes/${hero.slug}`),
      })),
    },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={itemListJsonLd} />
      <PublicNav />

      <main style={{ maxWidth: 1160, margin: '0 auto', padding: '56px 24px 88px' }}>
        <header style={{ maxWidth: 820, marginBottom: 34 }}>
          <div className="eyebrow">HÉROES DE OVERWATCH</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 8vw, 82px)', letterSpacing: 1.2, lineHeight: 0.94, margin: '0 0 16px' }}>
            TODOS LOS HÉROES,<br />
            <span style={{ color: 'var(--accent)' }}>HABILIDADES Y GUÍAS</span>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>
            Revisa el rol de cada héroe, entiende de un vistazo su kit básico y salta a guías, counters o composiciones cuando quieras profundizar.
          </p>
        </header>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 34 }}>
          {roleOrder.map(role => (
            <a key={role} href={`#${role}`} className="btn btn-secondary btn-sm">
              {ROLE_LABELS[role].toUpperCase()}
            </a>
          ))}
          <Link href="/guides" className="btn btn-primary btn-sm">VER GUÍAS</Link>
        </div>

        {roleOrder.map(role => (
          <RoleSection
            key={role}
            role={role}
            heroes={COUNTER_HEROES.filter(hero => hero.role === role)}
          />
        ))}
      </main>
    </div>
  )
}

function RoleSection({ role, heroes }: { role: CounterRole; heroes: CounterHero[] }) {
  return (
    <section id={role} style={{ marginBottom: 54, scrollMarginTop: 72 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, marginBottom: 18 }}>
        <div>
          <div className="eyebrow">ROL</div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 38, letterSpacing: 1, margin: 0 }}>
            {ROLE_LABELS[role]}
          </h2>
        </div>
        <Link href={`/roles/${role}`} style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 13 }}>
          Aprender {ROLE_LABELS[role]} →
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        {heroes.map(hero => (
          <HeroCard key={hero.slug} hero={hero} />
        ))}
      </div>
    </section>
  )
}

function HeroCard({ hero }: { hero: CounterHero }) {
  const abilities = getHeroAbilityNames(hero.slug)

  return (
    <article className="expert-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 20, minHeight: 300, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.5, marginBottom: 6 }}>
          {ROLE_LABELS[hero.role]}
        </div>
        <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 28, letterSpacing: 0.9, margin: 0 }}>
          {hero.name}
        </h3>
      </div>

      <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.55, margin: 0 }}>
        {buildHeroAbilityOverview(hero)}
      </p>

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {abilities.map(ability => (
          <span key={ability} style={{ border: '1px solid var(--border2)', color: 'var(--text2)', fontSize: 11, padding: '5px 8px' }}>
            {ability}
          </span>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8, marginTop: 'auto' }}>
        <Link href={`/heroes/${hero.slug}`} className="btn btn-primary btn-sm">GUÍA</Link>
        <Link href={`/counters/${hero.slug}`} className="btn btn-secondary btn-sm">COUNTERS</Link>
        <Link href={`/team-comps/${hero.slug}`} className="btn btn-secondary btn-sm">COMPS</Link>
      </div>
    </article>
  )
}
