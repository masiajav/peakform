import type { Metadata } from 'next'
import Link from 'next/link'
import TopicArchivePage from '@/components/content/TopicArchivePage'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { topicLabel } from '@/lib/content'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'
import { buildHeroSeoProfile } from '@/lib/overwatch-seo'
import { isUpcomingHeroSlug, robotsForQuality, topicQualityDecision } from '@/lib/indexing-policy'

const shionFacts = [
  { label: 'Rol', value: 'DPS' },
  { label: 'Subrol', value: 'Flanker' },
  { label: 'Origen', value: 'Japón' },
  { label: 'Base', value: 'Neon Junction, Tokio' },
  { label: 'Facción', value: 'Hashimoto / Talon' },
  { label: 'Estado', value: 'En seguimiento hasta lanzamiento y balance final' },
]

const shionAbilities = [
  {
    title: 'Kira Pistols',
    body: 'Su arma principal apunta a una DPS de ritmo alto: pistolas rápidas, buena cadencia y valor cuando encuentra ángulos laterales.',
  },
  {
    title: 'Execution',
    body: 'Dispara una ráfaga en forma de X que puede concentrarse manteniendo la acción. La lectura importante será elegir cuándo cerrar distancia y cuándo jugar poke corto.',
  },
  {
    title: 'Evade',
    body: 'Dash defensivo/ofensivo con supervivencia extra. Si el cooldown es corto, Shion puede jugar parecido a un flanker que entra, fuerza recursos y sale.',
  },
  {
    title: 'Joyride',
    body: 'Activa una moto y permite relanzarla hacia delante al desmontar. Es la pieza más delicada del kit: movilidad, engage y posible remate en una sola herramienta.',
  },
  {
    title: 'Satsuriku Spree',
    body: 'Ultimate de avance con tres impulsos y disparos durante la ejecución. En papel suena a herramienta para limpiar peleas ya abiertas, no para iniciar sin información.',
  },
]

const shionPerks = [
  {
    tier: 'Minor',
    title: 'Rapid Reload',
    body: 'Evade recarga parte de la munición, lo que premia entrar con balas gastadas y salir sin perder toda la presión.',
  },
  {
    tier: 'Minor',
    title: 'X Machina',
    body: 'Execution mejora contra enemigos por debajo de media vida. Esto empuja a Shion hacia remates, no solo daño bruto.',
  },
  {
    tier: 'Major',
    title: 'Refuel',
    body: 'Joyride suma curación inmediata y regeneración mientras está activa. Puede convertir rutas agresivas en jugadas sostenibles si no la cortan rápido.',
  },
  {
    tier: 'Major',
    title: 'Faces of Death',
    body: 'Gana acceso temporal a pasivas de otros subroles de DPS. Habrá que probar si esto cambia su timing o solo potencia ventanas concretas.',
  },
]

export function generateMetadata({ params }: { params: { hero: string } }): Metadata {
  const label = topicLabel(params.hero)
  const profile = buildHeroSeoProfile(params.hero)
  const quality = topicQualityDecision('hero', params.hero)

  if (isUpcomingHeroSlug(params.hero)) {
    return buildMetadata({
      title: 'Shion en Overwatch: rol, habilidades y seguimiento',
      description: 'Página de Shion en Overwatch con rol DPS, kit resumido, lectura inicial y estado editorial antes de la guía definitiva.',
      path: `/heroes/${params.hero}`,
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

  if (isUpcomingHeroSlug(params.hero)) {
    return <UpcomingHeroPage slug={params.hero} name={label} />
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

function UpcomingHeroPage({ slug, name }: { slug: string; name: string }) {
  const pageUrl = absoluteUrl(`/heroes/${slug}`)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${name} en Overwatch`,
    description: 'Seguimiento editorial de Shion con rol, habilidades, perks y lectura inicial.',
    url: pageUrl,
    publisher: { '@type': 'Organization', name: SITE_NAME },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={jsonLd} />
      <PublicNav />

      <main style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 88px' }}>
        <div style={{ marginBottom: 28, fontSize: 12, color: 'var(--text3)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/heroes" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Héroes</Link>
          <span>/</span>
          <span>{name}</span>
        </div>

        <header style={{ maxWidth: 780, marginBottom: 30 }}>
          <div className="eyebrow">NUEVO HÉROE EN SEGUIMIENTO</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 8vw, 78px)', letterSpacing: 1, lineHeight: 0.95, margin: '0 0 16px' }}>
            {name.toUpperCase()} EN OVERWATCH
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.7, margin: 0 }}>
            Shion apunta a DPS flanker: mucha movilidad, pistolas rápidas y herramientas para entrar, rematar y salir. Esta página resume lo que se conoce ahora mismo y lo traduce a lectura de partida, sin copiar texto externo ni venderlo como guía cerrada antes de probarla en el meta real.
          </p>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(260px, 0.8fr)', gap: 18, marginBottom: 22 }} className="home-hero-grid">
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 24 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>LECTURA RÁPIDA</div>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 30, letterSpacing: 1, margin: '0 0 12px' }}>
              Qué tipo de héroe parece ser
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.75, margin: '0 0 14px' }}>
              Por kit, Shion no parece una DPS estática. Su valor debería salir de rutas laterales, ejecuciones sobre objetivos tocados y movilidad para reposicionarse antes de que el rival pueda fijarla. Si Joyride y Evade tienen buenos tiempos de recarga, su amenaza no estará solo en matar: también en obligar a supports y hitscans a mirar hacia sitios incómodos.
            </p>
            <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.75, margin: 0 }}>
              La guía definitiva dependerá de números reales: daño por ráfaga, duración de la moto, cuánto aguanta con overhealth y cómo interactúa su ultimate contra control, peel y movilidad rival.
            </p>
          </div>

          <aside style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 20 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>FICHA</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {shionFacts.map(fact => (
                <div key={fact.label} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 12, letterSpacing: 1.3 }}>{fact.label}</div>
                  <div style={{ color: 'var(--text)', fontSize: 14 }}>{fact.value}</div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 24, marginBottom: 22 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>KIT</div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 30, letterSpacing: 1, margin: '0 0 14px' }}>
            Habilidades de Shion
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {shionAbilities.map(ability => (
              <StatusCard key={ability.title} title={ability.title} body={ability.body} />
            ))}
          </div>
        </section>

        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 24, marginBottom: 22 }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 28, letterSpacing: 1, margin: '0 0 12px' }}>
            Cómo empezar a jugar contra Shion
          </h2>
          <div style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.75, display: 'grid', gap: 12 }}>
            <p style={{ margin: 0 }}>
              La primera idea contra Shion no debería ser perseguirla, sino negarle una salida limpia. Si entra con Evade o Joyride y todavía tiene ruta para volver, probablemente solo te está sacando cooldowns. Guarda una herramienta de control, boop o peel para cuando ya haya enseñado la ruta.
            </p>
            <p style={{ margin: 0 }}>
              También conviene cuidar mucho a los compañeros tocados. Su kit parece premiar remates sobre objetivos a media vida, así que una mala rotación de support o un DPS aislado pueden convertirse en una baja rápida aunque Shion no haya hecho todo el daño inicial.
            </p>
            <p style={{ margin: 0 }}>
              Antes de cada pelea, mira los laterales y no solo el frente. Si detectas a Shion antes de que arranque Joyride, la obligas a gastar movilidad para entrar peor. Si la ves cuando ya está encima, la pelea empieza con ella marcando el ritmo.
            </p>
            <p style={{ margin: 0 }}>
              Contra su ultimate, la respuesta más estable será jugar cobertura, separarse lo justo y no regalar una línea fácil de avances. Si necesita encadenar objetivos claros, romperle esa lectura puede valer más que correr sin plan.
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 24, marginBottom: 22 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>PERKS</div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 28, letterSpacing: 1, margin: '0 0 12px' }}>
            Perks a vigilar
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px', maxWidth: 760 }}>
            Los minor perks parecen reforzar su ritmo básico: recargar mejor y rematar objetivos tocados. Los major perks son los que pueden cambiar más la pelea, porque afectan a Joyride y a las pasivas temporales que puede aprovechar durante sus ventanas agresivas.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {shionPerks.map(perk => (
              <StatusCard key={perk.title} title={perk.title} body={perk.body} badge={`${perk.tier} perk`} />
            ))}
          </div>
        </section>

        <section style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link href="/heroes" className="btn btn-secondary btn-sm">VER HÉROES</Link>
          <Link href="/roles/dps" className="btn btn-secondary btn-sm">VER DPS</Link>
          <Link href="/patch-notes" className="btn btn-secondary btn-sm">SEGUIR PATCH NOTES</Link>
          <Link href="/guides" className="btn btn-primary btn-sm">VER GUIAS ACTUALES</Link>
        </section>
      </main>
    </div>
  )
}

function StatusCard({ title, body, badge }: { title: string; body: string; badge?: string }) {
  return (
    <article style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16 }}>
      {badge && (
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.4, marginBottom: 8 }}>
          {badge.toUpperCase()}
        </div>
      )}
      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 20, letterSpacing: 0.8, margin: '0 0 8px' }}>
        {title}
      </h2>
      <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{body}</p>
    </article>
  )
}
