import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { ROLE_LABELS } from '@/lib/content'
import { COUNTER_HEROES, type CounterHero, type CounterRole } from '@/lib/overwatch-counters'
import { getHeroPortrait } from '@/lib/overwatch-hero-portraits'
import { buildMetadata, absoluteUrl, SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Héroes de Overwatch: roles y guías',
  description: 'Lista completa de héroes de Overwatch con imagen, rol y acceso directo a sus guías.',
  path: '/heroes',
})

const roleOrder: CounterRole[] = ['tank', 'dps', 'support']

export default function HeroesIndexPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Héroes de Overwatch',
    description: 'Hub de héroes de Overwatch con imagen, rol y guías.',
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
            <span style={{ color: 'var(--accent)' }}>POR ROL</span>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>
            Elige un héroe para abrir su guía, ver counters y encontrar contenido relacionado.
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
        {heroes.map(hero => (
          <HeroCard key={hero.slug} hero={hero} />
        ))}
      </div>
    </section>
  )
}

function HeroCard({ hero }: { hero: CounterHero }) {
  const portrait = getHeroPortrait(hero.slug)

  return (
    <Link href={`/heroes/${hero.slug}`} style={{ textDecoration: 'none' }}>
      <article className="expert-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', minHeight: 238, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'relative', height: 168, background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
          {portrait ? (
            <Image
              src={portrait}
              alt={hero.name}
              fill
              sizes="(max-width: 768px) 50vw, 180px"
              style={{ objectFit: 'contain', objectPosition: 'center bottom' }}
            />
          ) : (
            <div style={{ height: '100%', display: 'grid', placeItems: 'center', fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text3)', fontSize: 42 }}>
              {hero.name.slice(0, 1)}
            </div>
          )}
        </div>

        <div style={{ padding: 14 }}>
          <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 25, letterSpacing: 0.8, margin: '0 0 4px' }}>
            {hero.name}
          </h3>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 12, letterSpacing: 1.4 }}>
            {ROLE_LABELS[hero.role]}
          </div>
        </div>
      </article>
    </Link>
  )
}
