import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

const PAGE_PATH = '/overwatch-temporada-3-into-the-tigers-den'
const UPDATED_AT = '15 de junio de 2026'
const RELEASE_DATE = '16 de junio de 2026'
const SEASON_NAME = "Season 3: Into the Tiger's Den"
const SOURCE_URL = 'https://www.gamesradar.com/games/fps/overwatch-gives-new-hero-shion-a-motorcycle-which-you-can-throw-at-people-when-youre-not-akira-sliding-all-over-the-place/'

export const metadata: Metadata = buildMetadata({
  title: 'Overwatch Season 3 Into the Tiger’s Den: Shion, mapa y eventos',
  description: 'Todo lo nuevo de Overwatch Season 3 Into the Tiger’s Den: Shion, Neon Junction, Anima Strike, Summer Games, skins, mythics, hero bans y más novedades.',
  path: PAGE_PATH,
  image: '/heroes/shion.png',
  type: 'article',
})

const keyPoints = [
  {
    title: 'Nuevo héroe DPS: Shion',
    body: 'Shion es la gran cara de la temporada. Llega como DPS de movilidad alta, con pistolas, dash, una moto como pieza central del kit y un estilo pensado para flanquear y rematar.',
  },
  {
    title: 'Nuevo mapa híbrido',
    body: 'Neon Junction entra como nuevo mapa híbrido. Por lo que se ve en el resumen, apunta a un entorno urbano muy vertical, con rutas laterales y espacios que pueden favorecer a héroes móviles.',
  },
  {
    title: 'Evento Anima Strike',
    body: 'La temporada suma Anima Strike como nuevo evento. Habrá que ver si funciona como modo temporal, evento de desafíos o experiencia PvE ligera, pero será uno de los focos del arranque.',
  },
  {
    title: 'Mucho contenido de sistema',
    body: 'Además del contenido jugable, llegan cambios a hero bans, reworks para Stadium, Quick Play: Hacked, Excavation Initiative y eventos cosméticos como Summer Games.',
  },
]

const seasonFeatures = [
  {
    label: 'Héroe',
    title: 'Shion',
    body: 'Nueva heroína de daño. La página de Shion ya recoge rol, kit conocido, perks y primeros counters para preparar ranked desde el primer día.',
    href: '/heroes/shion',
  },
  {
    label: 'Mapa',
    title: 'Neon Junction',
    body: 'Nuevo mapa híbrido con estética urbana y mucha presencia visual de ciudad futurista. Lo importante será aprender rutas, alturas y defensas iniciales.',
  },
  {
    label: 'Evento',
    title: 'Anima Strike',
    body: 'Nuevo evento de temporada. Lo dejamos marcado como prioridad para actualizar en cuanto se conozcan reglas, recompensas y duración.',
  },
  {
    label: 'Cosmético',
    title: 'Ultra Skin',
    body: 'La temporada presenta una nueva Ultra Skin. La trataremos como contenido cosmético principal hasta tener nombre, precio y forma de desbloqueo.',
  },
  {
    label: 'Cosméticos',
    title: 'New Mythics',
    body: 'Llegan nuevos mythics. Conviene separar mythic skin, mythic weapon y recompensas del pase cuando Blizzard detalle exactamente qué incluye cada una.',
  },
  {
    label: 'Evento',
    title: 'Summer Games 2026',
    body: 'Vuelven los Summer Games. Es una oportunidad clara para búsquedas de evento, recompensas, desafíos y modos temporales.',
  },
  {
    label: 'Colaboración',
    title: 'Overwatch x YOASOBI',
    body: 'La colaboración con YOASOBI puede traer skins, música, desafíos o contenido especial. Es una de las novedades con más potencial de búsquedas fuera del público competitivo.',
  },
  {
    label: 'Sistema',
    title: 'Hero Ban Updates',
    body: 'Los hero bans reciben ajustes. Esto puede afectar directamente a ranked, composición de equipo y picks seguros al inicio de la temporada.',
  },
  {
    label: 'Stadium',
    title: 'Hero Reworks',
    body: 'Stadium tendrá reworks de héroes. Actualizaremos esta parte cuando estén claros los héroes afectados y el impacto real en partidas.',
  },
  {
    label: 'Modo',
    title: 'Quick Play: Hacked',
    body: 'Vuelve Quick Play: Hacked, normalmente asociado a pruebas de reglas o cambios experimentales para partidas rápidas.',
  },
  {
    label: 'Sistema',
    title: 'Excavation Initiative',
    body: 'Excavation Initiative aparece como novedad de temporada. De momento la dejamos identificada hasta que Blizzard explique exactamente cómo funciona.',
  },
]

const prepChecklist = [
  'Revisa rutas laterales en mapas donde una DPS móvil pueda entrar sin cruzar la frontal.',
  'Prepara héroes con peel o control para proteger supports cuando Shion busque remates.',
  'No gastes todos los cooldowns defensivos antes de que use Joyride o Evade.',
  'Mira Neon Junction pronto: los mapas híbridos se ganan mucho antes cuando conoces rutas de ataque y puntos de defensa.',
  'Comprueba hero bans y reworks de Stadium antes de asumir que tus picks habituales siguen funcionando igual.',
  'Revisa las patch notes en cuanto salgan para confirmar daño, vida extra, recargas y cambios de última hora.',
]

const faq = [
  {
    question: 'Cuándo sale Overwatch Season 3: Into the Tiger’s Den?',
    answer: `El lanzamiento previsto es el ${RELEASE_DATE}. Replaid Lab actualizará esta página cuando Blizzard publique las notas completas.`,
  },
  {
    question: 'Qué héroe nuevo llega en la Season 3?',
    answer: 'La novedad principal conocida es Shion, una heroína DPS con movilidad alta, pistolas, dash y una moto como parte central de su kit.',
  },
  {
    question: 'Qué mapa nuevo llega en Overwatch Season 3?',
    answer: 'La temporada incluye Neon Junction, un nuevo mapa híbrido. Actualizaremos rutas, composición y consejos cuando esté disponible para jugar.',
  },
  {
    question: 'Qué eventos aparecen en Into the Tiger’s Den?',
    answer: 'El resumen de temporada menciona Anima Strike, Summer Games 2026, una colaboración Overwatch x YOASOBI, Quick Play: Hacked y Excavation Initiative.',
  },
  {
    question: 'Esta página sustituye a las patch notes oficiales?',
    answer: 'No. Es un resumen editorial en español para preparar la temporada. Las cifras finales y cambios completos deben confirmarse siempre con las patch notes oficiales de Blizzard.',
  },
]

export default function SeasonThreePage() {
  const pageUrl = absoluteUrl(PAGE_PATH)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Overwatch Season 3 Into the Tiger’s Den: Shion, mapa y eventos',
    description: 'Resumen editorial en español de la nueva temporada de Overwatch, con Shion, Neon Junction, Anima Strike, Summer Games, YOASOBI y cambios de sistema.',
    image: absoluteUrl('/heroes/shion.png'),
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
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Overwatch Season 3', item: pageUrl },
    ],
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
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
          <Link href="/" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Inicio</Link>
          <span>/</span>
          <span>Overwatch Season 3</span>
        </div>

        <header style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(280px, 0.75fr)', gap: 24, alignItems: 'center', marginBottom: 28 }} className="home-hero-grid">
          <div>
            <div className="eyebrow">NUEVA TEMPORADA · {RELEASE_DATE.toUpperCase()}</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(44px, 8vw, 84px)', letterSpacing: 1, lineHeight: 0.94, margin: '0 0 16px' }}>
              OVERWATCH SEASON 3: <br />
              <span style={{ color: 'var(--accent)' }}>INTO THE TIGER’S DEN</span>
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.75, margin: '0 0 18px', maxWidth: 760 }}>
              La Season 3 de Overwatch llega cargada: Shion como nueva DPS, Neon Junction como mapa híbrido, Anima Strike, Summer Games, colaboración con YOASOBI, mythics, hero bans y más cambios de sistema. Aquí tienes el resumen ordenado para saber qué mirar primero.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <MetaPill label="Actualizado" value={UPDATED_AT} />
              <MetaPill label="Lanzamiento" value={RELEASE_DATE} />
              <MetaPill label="Estado" value="Resumen previo a patch notes finales" />
            </div>
          </div>

          <aside style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 330, background: 'var(--surface2)' }}>
              <Image
                src="/heroes/shion.png"
                alt="Shion, nueva heroína de Overwatch Season 3"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
            <div style={{ padding: 18 }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>FOCO DE LA TEMPORADA</div>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 28, letterSpacing: 1, margin: '0 0 8px' }}>
                Shion, DPS flanker
              </h2>
              <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                Movilidad, rutas laterales y remates. Si su kit llega con buenos números, puede cambiar cómo se protegen los supports al inicio de temporada.
              </p>
            </div>
          </aside>
        </header>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>RESUMEN RÁPIDO</div>
          <h2 style={headingStyle}>Qué trae Overwatch Season 3</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 12 }}>
            {keyPoints.map(point => (
              <InfoCard key={point.title} title={point.title} body={point.body} />
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>TODAS LAS NOVEDADES</div>
          <h2 style={headingStyle}>Contenido anunciado para Into the Tiger’s Den</h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.75, margin: '0 0 16px', maxWidth: 820 }}>
            El resumen de temporada mezcla contenido jugable, eventos, cosméticos y cambios de sistema. Lo importante ahora es separar lo que afecta a tus partidas desde el día uno de lo que iremos ampliando cuando salgan las notas completas.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {seasonFeatures.map(feature => (
              feature.href ? (
                <Link key={feature.title} href={feature.href} style={{ textDecoration: 'none' }}>
                  <FeatureCard feature={feature} />
                </Link>
              ) : (
                <FeatureCard key={feature.title} feature={feature} />
              )
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>SHION</div>
          <h2 style={headingStyle}>Por qué Shion puede marcar el meta inicial</h2>
          <div style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, display: 'grid', gap: 12 }}>
            <p style={{ margin: 0 }}>
              Shion no parece diseñada para jugar lento. Su valor debería aparecer en entradas cortas, presión desde ángulos incómodos y remates sobre enemigos ya tocados. Si Joyride le permite cruzar mucho espacio y Evade le da salida real, el rival tendrá que decidir entre mirar a Shion o mantener la frontal.
            </p>
            <p style={{ margin: 0 }}>
              Para jugadores de ranked, la adaptación principal será de disciplina: no regalar supports aislados, no gastar peel demasiado pronto y no perseguirla si todavía conserva movilidad. En los primeros días, muchas partidas se decidirán por quién entiende antes sus rutas, especialmente si Neon Junction favorece rotaciones rápidas.
            </p>
          </div>
          <div style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/heroes/shion" className="btn btn-primary btn-sm">GUÍA DE SHION</Link>
            <Link href="/counters/shion" className="btn btn-secondary btn-sm">COUNTERS DE SHION</Link>
            <Link href="/team-comps/shion" className="btn btn-secondary btn-sm">COMPOSICIONES</Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>PREPARACIÓN</div>
          <h2 style={headingStyle}>Checklist antes de jugar la Season 3</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {prepChecklist.map(item => (
              <div key={item} style={{ display: 'grid', gridTemplateColumns: '22px minmax(0, 1fr)', gap: 10, alignItems: 'start', color: 'var(--text2)', fontSize: 14, lineHeight: 1.65 }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 18 }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>FUENTES Y ESTADO</div>
          <h2 style={headingStyle}>Qué está pendiente de confirmar</h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, margin: '0 0 14px' }}>
            Este resumen se basa en la información del avance de temporada y en cobertura previa. Los números definitivos de daño, cooldowns, coste de ultimate, ajustes de equilibrio, reglas de eventos, recompensas y posibles cambios de última hora se actualizarán cuando Blizzard publique las patch notes completas.
          </p>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Fuente de contexto: <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>GamesRadar sobre Shion y Season 3</a>. Para cambios oficiales, revisa también las <Link href="/patch-notes" style={{ color: 'var(--accent)' }}>patch notes de Overwatch</Link>.
          </p>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>PREGUNTAS RÁPIDAS</div>
          <h2 style={headingStyle}>FAQ de la nueva temporada</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {faq.map(item => (
              <article key={item.question} style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16 }}>
                <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 22, letterSpacing: 0.8, margin: '0 0 8px' }}>
                  {item.question}
                </h3>
                <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function FeatureCard({ feature }: { feature: { label: string; title: string; body: string } }) {
  return (
    <article style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16, minHeight: 176 }}>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.4, marginBottom: 8 }}>
        {feature.label.toUpperCase()}
      </div>
      <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 22, letterSpacing: 0.8, margin: '0 0 8px' }}>
        {feature.title}
      </h3>
      <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{feature.body}</p>
    </article>
  )
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <article style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16, minHeight: 162 }}>
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
