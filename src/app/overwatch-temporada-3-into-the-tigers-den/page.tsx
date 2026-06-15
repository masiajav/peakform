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
  title: 'Overwatch Season 3 Into the Tiger’s Den: Shion y novedades',
  description: 'Resumen en español de Overwatch Season 3: Into the Tiger’s Den, con Shion, fecha de lanzamiento, habilidades conocidas y qué preparar antes de jugar.',
  path: PAGE_PATH,
  image: '/heroes/shion.png',
  type: 'article',
})

const keyPoints = [
  {
    title: 'Shion es el gran foco',
    body: 'La temporada gira alrededor de Shion, una DPS de movilidad alta que apunta a flanker agresiva: entra por laterales, busca objetivos tocados y sale antes de que el rival pueda fijarla.',
  },
  {
    title: 'La moto cambia la lectura',
    body: 'Joyride introduce una herramienta de movilidad muy marcada. No basta con mirar el daño: habrá que aprender rutas, timings de entrada y cuándo guardar control para cortarla.',
  },
  {
    title: 'Los counters importan desde el día uno',
    body: 'Winston, D.Va, Sombra, Cassidy, Brigitte y Kiriko son los primeros nombres a vigilar porque pueden cortar entradas, proteger supports o castigar rutas previsibles.',
  },
  {
    title: 'Faltan números definitivos',
    body: 'Hasta que Blizzard publique las notas completas y empiecen las partidas reales, conviene tratar los detalles finos como provisionales: daño, cooldowns, coste de ultimate y matchups pueden cambiar.',
  },
]

const prepChecklist = [
  'Revisa rutas laterales en mapas donde una DPS móvil pueda entrar sin cruzar la frontal.',
  'Prepara héroes con peel o control para proteger supports cuando Shion busque remates.',
  'No gastes todos los cooldowns defensivos antes de que use Joyride o Evade.',
  'Mira las patch notes en cuanto salgan para confirmar daño, vida extra, recargas y cambios de última hora.',
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
    question: 'Esta página sustituye a las patch notes oficiales?',
    answer: 'No. Es un resumen editorial en español para preparar la temporada. Las cifras finales y cambios completos deben confirmarse siempre con las patch notes oficiales de Blizzard.',
  },
]

export default function SeasonThreePage() {
  const pageUrl = absoluteUrl(PAGE_PATH)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Overwatch Season 3 Into the Tiger’s Den: Shion y novedades',
    description: 'Resumen editorial en español de la nueva temporada de Overwatch, centrado en Shion, fecha, counters iniciales y preparación competitiva.',
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
              La Season 3 de Overwatch llega con Shion como principal punto de atención. Esta página resume lo que conviene saber antes de entrar a jugar: fecha, rol, kit conocido, counters iniciales y qué mirar cuando salgan las notas completas.
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
          <h2 style={headingStyle}>Qué viene en la nueva temporada</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 12 }}>
            {keyPoints.map(point => (
              <InfoCard key={point.title} title={point.title} body={point.body} />
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
              Para jugadores de ranked, la adaptación principal será de disciplina: no regalar supports aislados, no gastar peel demasiado pronto y no perseguirla si todavía conserva movilidad. En los primeros días, muchas partidas se decidirán por quién entiende antes sus rutas.
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
            Este resumen se basa en la información disponible antes del lanzamiento y en cobertura previa de la temporada. Los números definitivos de daño, cooldowns, coste de ultimate, ajustes de equilibrio y posibles cambios de última hora se actualizarán cuando Blizzard publique las patch notes completas.
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
