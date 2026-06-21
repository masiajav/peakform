import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import SeoFaq from '@/components/content/SeoFaq'
import PublicNav from '@/components/layout/PublicNav'
import HeroPortraitImage from '@/components/heroes/HeroPortraitImage'
import { ROLE_LABELS } from '@/lib/content'
import { COUNTER_HEROES, type CounterHero, type CounterRole } from '@/lib/overwatch-counters'
import { getHeroPortrait } from '@/lib/overwatch-hero-portraits'
import { UPCOMING_HERO_SLUGS } from '@/lib/indexing-policy'
import { buildMetadata, absoluteUrl, SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Héroes de Overwatch: guías, roles, counters y composiciones',
  description: 'Explora todos los héroes de Overwatch por rol: Tank, DPS y Support. Abre guías, counters, composiciones y consejos para mejorar con cada héroe.',
  path: '/heroes',
})

const roleOrder: CounterRole[] = ['tank', 'dps', 'support']
const heroesFaq = [
  {
    question: '¿Qué héroe debería jugar para subir en ranked?',
    answer: 'Depende de tu rol, mapa y nivel. Empieza con un héroe que entiendas bien y revisa si sus counters o composiciones encajan con tus partidas habituales.',
  },
  {
    question: '¿Qué diferencia hay entre rol y subrol?',
    answer: 'El rol define la categoría general: Tank, DPS o Support. El subrol explica mejor la función real, como dive, poke, brawl, flanker o flex support.',
  },
  {
    question: '¿Dónde veo counters de cada héroe?',
    answer: 'Desde cada página de héroe puedes abrir sus counters. También puedes usar el hub de counters para comparar matchups concretos.',
  },
]

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
            Encuentra todos los héroes de Overwatch organizados por rol. Abre la guía que necesitas para entender cómo jugarlo, qué counters respetar, qué composiciones encajan mejor y qué revisar en tus partidas.
          </p>
        </header>

        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 20, marginBottom: 28, maxWidth: 900 }}>
          <div className="eyebrow">CÓMO USAR ESTE HUB</div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 28, letterSpacing: 1, margin: '0 0 8px' }}>ELIGE HÉROE, PERO PIENSA EN FUNCIÓN</h2>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.65, margin: 0 }}>
            Antes de copiar un pick de tier list, revisa qué trabajo cumple dentro del equipo: el Tank crea espacio y marca el engage; el DPS abre ángulos y convierte ventajas; el Support sostiene recursos clave y niega amenazas.
          </p>
        </section>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 34 }}>
          {roleOrder.map(role => (
            <a key={role} href={`#${role}`} className="btn btn-secondary btn-sm">
              {ROLE_LABELS[role].toUpperCase()}
            </a>
          ))}
          <Link href="/guides" className="btn btn-primary btn-sm">VER GUÍAS</Link>
        </div>

        {UPCOMING_HERO_SLUGS.length > 0 && (
        <section style={{ marginBottom: 54 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, marginBottom: 18 }}>
            <div>
              <div className="eyebrow">PROXIMAMENTE</div>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 38, letterSpacing: 1, margin: 0 }}>
                Héroes en seguimiento
              </h2>
            </div>
          </div>



      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
            {UPCOMING_HERO_SLUGS.map(slug => (
              <Link key={slug} href={`/heroes/${slug}`} style={{ textDecoration: 'none' }}>
                <article className="expert-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', minHeight: 160, padding: 18 }}>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.6, marginBottom: 14 }}>
                    SEGUIMIENTO
                  </div>
                  <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 30, letterSpacing: 0.8, margin: '0 0 8px' }}>
                    {slug.toUpperCase()}
                  </h3>
                  <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.55, margin: 0 }}>
                    DPS flanker en seguimiento. Accede a la ficha de rol, habilidades y primera lectura editorial.
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>
        )}

        <SeoFaq items={heroesFaq} title="Preguntas sobre héroes de Overwatch" />
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

<p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.65, margin: '0 0 16px', maxWidth: 820 }}>
        {role === 'tank'
          ? 'Los tanks no están para recibir daño sin plan. Crean espacio, fuerzan cooldowns importantes y permiten que el equipo juegue mejores posiciones.'
          : role === 'dps'
            ? 'Los DPS no solo hacen daño: crean presión útil, obligan al rival a mirar otro ángulo y convierten enemigos tocados en bajas reales.'
            : 'Los supports ganan peleas sobreviviendo, usando cooldowns con intención y negando las condiciones de victoria del rival.'}
      </p>

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
          <HeroPortraitImage
            src={portrait}
            name={hero.name}
            sizes="(max-width: 768px) 50vw, 180px"
            imageStyle={{ objectFit: 'contain', objectPosition: 'center bottom' }}
            fallbackClassName="hero-portrait-fallback"
          />
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
