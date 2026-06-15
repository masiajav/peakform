import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import TopicArchivePage from '@/components/content/TopicArchivePage'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { topicLabel } from '@/lib/content'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'
import { buildHeroSeoProfile } from '@/lib/overwatch-seo'
import { robotsForQuality, topicQualityDecision } from '@/lib/indexing-policy'

const SHION_SLUG = 'shion'
const SHION_IMAGE = '/heroes/shion.png'
const SHION_UPDATED_AT = '15 de junio de 2026'
const SHION_RELEASE_DATE = '16 de junio de 2026'
const SHION_SEASON = "Season 3: Into the Tiger's Den"

const shionFacts = [
  { label: 'Rol', value: 'DPS' },
  { label: 'Subrol', value: 'Flanker' },
  { label: 'Origen', value: 'Japón' },
  { label: 'Base', value: 'Neon Junction, Tokio' },
  { label: 'Facción', value: 'Hashimoto / Talon' },
  { label: 'Lanzamiento', value: SHION_RELEASE_DATE },
]

const shionAbilities = [
  {
    title: 'Kira Pistols',
    body: 'Pistolas de ritmo alto para jugar ángulos, castigar objetivos tocados y mantener presión sin quedarse plantada en la frontal.',
  },
  {
    title: 'Execution',
    body: 'Ráfaga en forma de X que gana valor cuando el rival ya está tocado. La clave no será spamearla, sino usarla para cerrar bajas.',
  },
  {
    title: 'Evade',
    body: 'Dash corto con supervivencia extra. Le permite entrar, reposicionarse o salir si el rival guarda control para cortarle la ruta.',
  },
  {
    title: 'Joyride',
    body: 'Activa una moto y puede relanzarla al desmontar. Es su herramienta más importante: movilidad, engage y amenaza de remate en una sola acción.',
  },
  {
    title: 'Satsuriku Spree',
    body: 'Ultimate de avance con varias direcciones. Sobre el papel parece mejor para limpiar peleas abiertas que para iniciar sin información.',
  },
]

const shionPerks = [
  {
    tier: 'Minor',
    title: 'Rapid Reload',
    body: 'Evade recarga parte de la munición. Premia entrar con recursos gastados y seguir presionando sin perder tempo.',
  },
  {
    tier: 'Minor',
    title: 'X Machina',
    body: 'Execution mejora contra enemigos por debajo de media vida. Refuerza su papel de DPS de remate, no solo de daño bruto.',
  },
  {
    tier: 'Major',
    title: 'Refuel',
    body: 'Joyride suma curación inmediata y regeneración mientras está activa. Si no la cortan rápido, puede convertir una entrada agresiva en una pelea larga.',
  },
  {
    tier: 'Major',
    title: 'Faces of Death',
    body: 'Da acceso temporal a pasivas de otros subroles de DPS. Habrá que probar si cambia sus timings o si solo potencia ventanas concretas.',
  },
]

const shionCounters = [
  {
    name: 'Winston',
    href: '/heroes/winston',
    body: 'Puede saltar sobre sus rutas, cortar ángulos y obligarla a gastar movilidad antes de que encuentre una baja limpia.',
  },
  {
    name: 'D.Va',
    href: '/heroes/dva',
    body: 'Buena para negar daño en entradas cortas y escoltar supports cuando Shion intenta jugar por el lateral.',
  },
  {
    name: 'Sombra',
    href: '/heroes/sombra',
    body: 'Si consigue leer la entrada, el hack y la presión sobre cooldowns pueden romperle el plan antes del remate.',
  },
  {
    name: 'Cassidy',
    href: '/heroes/cassidy',
    body: 'Amenaza a media distancia y castiga rutas previsibles. Es especialmente útil si Shion entra sin cobertura.',
  },
  {
    name: 'Brigitte',
    href: '/heroes/brigitte',
    body: 'Peel simple y estable. No necesita perseguirla: basta con proteger al objetivo que Shion quiere rematar.',
  },
  {
    name: 'Kiriko',
    href: '/heroes/kiriko',
    body: 'Puede salvar el primer burst, limpiar presión y reposicionar a tiempo si Shion fuerza una pelea rápida.',
  },
]

const shionFaq = [
  {
    question: 'Cuándo sale Shion en Overwatch?',
    answer: `El lanzamiento previsto de Shion es el ${SHION_RELEASE_DATE}, junto a ${SHION_SEASON}.`,
  },
  {
    question: 'Qué rol tiene Shion?',
    answer: 'Shion es una heroína DPS enfocada a flanqueo, movilidad alta y remates sobre objetivos tocados.',
  },
  {
    question: 'Quién puede counterear a Shion?',
    answer: 'Los primeros counters a vigilar son Winston, D.Va, Sombra, Cassidy, Brigitte y Kiriko, sobre todo por control, peel y capacidad de cortar sus entradas.',
  },
]

export function generateMetadata({ params }: { params: { hero: string } }): Metadata {
  const label = topicLabel(params.hero)
  const profile = buildHeroSeoProfile(params.hero)
  const quality = topicQualityDecision('hero', params.hero)

  if (params.hero === SHION_SLUG) {
    return buildMetadata({
      title: 'Shion en Overwatch: habilidades, rol, counters y guía',
      description: `Guía de Shion en Overwatch para ${SHION_SEASON}: rol DPS, habilidades, perks, counters iniciales y cómo prepararte para su lanzamiento el ${SHION_RELEASE_DATE}.`,
      path: `/heroes/${params.hero}`,
      image: SHION_IMAGE,
      robots: robotsForQuality(quality),
    })
  }

  return buildMetadata({
    title: profile?.searchTitle || `Guía de ${label} en Overwatch: consejos, counters y videos`,
    description: profile?.searchDescription || `Hemeroteca de ${label}: guías, counters, mapas, errores comunes, noticias y recursos para mejorar en Overwatch.`,
    path: `/heroes/${params.hero}`,
    robots: robotsForQuality(quality),
  })
}

export default function HeroPage({ params }: { params: { hero: string } }) {
  const label = topicLabel(params.hero)
  const profile = buildHeroSeoProfile(params.hero)

  if (params.hero === SHION_SLUG) {
    return <ShionHeroPage slug={params.hero} name={label} />
  }

  return (
    <TopicArchivePage
      kind="hero"
      slug={params.hero}
      title={`Guía de ${label} en Overwatch`}
      description={profile?.searchDescription || `Guías, counters, mapas, noticias y consejos aplicables para jugar mejor con ${label}.`}
    />
  )
}

function ShionHeroPage({ slug, name }: { slug: string; name: string }) {
  const pageUrl = absoluteUrl(`/heroes/${slug}`)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Shion en Overwatch: habilidades, rol, counters y guía',
    description: `Resumen editorial de Shion para ${SHION_SEASON}: rol DPS, habilidades, perks y counters iniciales.`,
    image: absoluteUrl(SHION_IMAGE),
    url: pageUrl,
    datePublished: '2026-06-15',
    dateModified: '2026-06-15',
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: pageUrl,
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Héroes', item: absoluteUrl('/heroes') },
      { '@type': 'ListItem', position: 2, name, item: pageUrl },
    ],
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: shionFaq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <PublicNav />

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '56px 24px 88px' }}>
        <div style={{ marginBottom: 28, fontSize: 12, color: 'var(--text3)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/heroes" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Héroes</Link>
          <span>/</span>
          <span>{name}</span>
        </div>

        <header style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(280px, 0.75fr)', gap: 24, alignItems: 'center', marginBottom: 28 }} className="home-hero-grid">
          <div>
            <div className="eyebrow">NUEVO HÉROE · {SHION_SEASON.toUpperCase()}</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 8vw, 82px)', letterSpacing: 1, lineHeight: 0.94, margin: '0 0 16px' }}>
              SHION EN OVERWATCH: <br />
              <span style={{ color: 'var(--accent)' }}>HABILIDADES, ROL Y COUNTERS</span>
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.75, margin: '0 0 18px', maxWidth: 760 }}>
              Shion llega como DPS flanker en la nueva temporada de Overwatch. Esta página resume lo importante antes del lanzamiento: qué hace su kit, cómo puede encajar en partida, qué perks conviene vigilar y qué héroes deberían frenarla mejor al principio.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <MetaPill label="Actualizado" value={SHION_UPDATED_AT} />
              <MetaPill label="Lanzamiento" value={SHION_RELEASE_DATE} />
              <MetaPill label="Anuncios" value="Sin anuncios hasta guía definitiva" />
            </div>
          </div>

          <aside style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 330, background: 'var(--surface2)' }}>
              <Image
                src={SHION_IMAGE}
                alt="Shion, nueva heroína DPS de Overwatch"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
            <div style={{ padding: 18, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
              {shionFacts.map(fact => (
                <div key={fact.label}>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.3 }}>{fact.label}</div>
                  <div style={{ color: 'var(--text)', fontSize: 13 }}>{fact.value}</div>
                </div>
              ))}
            </div>
          </aside>
        </header>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>LECTURA SEO Y DE PARTIDA</div>
          <h2 style={headingStyle}>Qué sabemos de Shion antes de la temporada</h2>
          <div style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, display: 'grid', gap: 12 }}>
            <p style={{ margin: 0 }}>
              La intención de Shion parece clara: no es una DPS para quedarse disparando desde la misma esquina toda la pelea. Su kit gira alrededor de movilidad, ángulos laterales y remates. Si entra bien, fuerza a los supports a mirar atrás; si entra mal, debería ser castigable por control, peel y buena lectura de rutas.
            </p>
            <p style={{ margin: 0 }}>
              Esta página se irá actualizando cuando salgan las notas completas, números finales y primeras partidas de la temporada. Hasta entonces, el foco está en explicar lo confirmado con lenguaje útil: qué amenaza representa, qué errores evitar y qué héroes preparar para jugar contra ella.
            </p>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>KIT</div>
          <h2 style={headingStyle}>Habilidades de Shion</h2>
          <div style={cardGridStyle}>
            {shionAbilities.map(ability => (
              <StatusCard key={ability.title} title={ability.title} body={ability.body} />
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>COUNTERS</div>
          <h2 style={headingStyle}>Primeros counters de Shion</h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px', maxWidth: 780 }}>
            Los counters definitivos dependerán del daño real y los cooldowns, pero para el arranque de temporada conviene preparar héroes que puedan cortar entradas, proteger supports y castigar rutas previsibles.
          </p>
          <div style={cardGridStyle}>
            {shionCounters.map(counter => (
              <Link key={counter.name} href={counter.href} style={{ textDecoration: 'none' }}>
                <StatusCard title={counter.name} body={counter.body} badge="Counter inicial" />
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href="/counters/shion" className="btn btn-primary btn-sm">VER COUNTERS DE SHION</Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Cómo empezar a jugar contra Shion</h2>
          <div style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, display: 'grid', gap: 12 }}>
            <p style={{ margin: 0 }}>
              No la persigas por impulso. Si Shion entra con Evade o Joyride y todavía tiene ruta de salida, probablemente solo te está sacando recursos. Espera a que enseñe la movilidad clave y castiga cuando ya no pueda resetear tan fácil.
            </p>
            <p style={{ margin: 0 }}>
              Protege especialmente a quien esté a media vida. Su kit parece premiar remates, así que una mala rotación de support o un DPS aislado pueden convertirse en una baja rápida aunque Shion no haya hecho todo el daño inicial.
            </p>
            <p style={{ margin: 0 }}>
              Antes de cada pelea, mira los laterales. Si la detectas antes de que arranque Joyride, la obligas a gastar movilidad en una entrada peor. Si la ves cuando ya está encima, la pelea empieza con ella marcando el ritmo.
            </p>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>PERKS</div>
          <h2 style={headingStyle}>Perks minor y major a vigilar</h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px', maxWidth: 780 }}>
            Los minor perks refuerzan su ciclo normal de entrada y remate. Los major perks son más delicados: pueden cambiar cuánto aguanta montada y qué ventanas agresivas puede convertir en baja.
          </p>
          <div style={cardGridStyle}>
            {shionPerks.map(perk => (
              <StatusCard key={perk.title} title={perk.title} body={perk.body} badge={`${perk.tier} perk`} />
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>SIGUIENTE PASO</div>
          <h2 style={headingStyle}>Más contenido relacionado con Shion</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/counters/shion" className="btn btn-primary btn-sm">COUNTERS DE SHION</Link>
            <Link href="/team-comps/shion" className="btn btn-secondary btn-sm">COMPOSICIONES</Link>
            <Link href="/roles/dps" className="btn btn-secondary btn-sm">VER DPS</Link>
            <Link href="/patch-notes" className="btn btn-secondary btn-sm">PATCH NOTES</Link>
            <Link href="/heroes" className="btn btn-secondary btn-sm">TODOS LOS HÉROES</Link>
          </div>
        </section>
      </main>
    </div>
  )
}

function StatusCard({ title, body, badge }: { title: string; body: string; badge?: string }) {
  return (
    <article style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16, minHeight: 154 }}>
      {badge && (
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.4, marginBottom: 8 }}>
          {badge.toUpperCase()}
        </div>
      )}
      <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 22, letterSpacing: 0.8, margin: '0 0 8px' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{body}</p>
    </article>
  )
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: '9px 12px' }}>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 10, letterSpacing: 1.3 }}>{label}</div>
      <div style={{ color: 'var(--text)', fontSize: 12 }}>{value}</div>
    </div>
  )
}

const sectionStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  padding: 24,
  marginBottom: 22,
} as const

const headingStyle = {
  fontFamily: 'Bebas Neue, sans-serif',
  color: 'var(--text)',
  fontSize: 32,
  letterSpacing: 1,
  margin: '0 0 14px',
} as const

const cardGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 12,
} as const
