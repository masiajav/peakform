import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import GuideVideo from '@/components/content/GuideVideo'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

const PAGE_PATH = '/overwatch-temporada-3-into-the-tigers-den'
const UPDATED_AT = '18 de junio de 2026'
const RELEASE_DATE = '16 de junio de 2026'
const SEASON_NAME = "Season 3: Into the Tiger's Den"
const SHION_VIDEO_ID = '9abTdz8uD3g'
const SHION_VIDEO_URL = `https://youtu.be/${SHION_VIDEO_ID}`
const SHION_VIDEO_TITLE = "Don't Play SHION Without Knowing This First | Overwatch Shion Guide"

export const metadata: Metadata = buildMetadata({
  title: "Overwatch Season 3 Into the Tiger's Den: Shion, mapa, eventos y cambios",
  description: "Resumen completo de Overwatch Season 3: Into the Tiger's Den. Shion, Neon Junction, eventos, hero bans, Summer Games, YOASOBI, mythics y cambios clave de temporada.",
  path: PAGE_PATH,
  image: '/heroes/shion.png',
  type: 'article',
})

const keyPoints = [
  {
    title: 'Shion, nueva DPS',
    body: 'La gran protagonista de la temporada es Shion: una flanker de daño con pistolas duales, dash, Execution y Joyride como herramienta de movilidad y amenaza.',
  },
  {
    title: 'Neon Junction',
    body: 'Nuevo mapa híbrido en Tokio. Las primeras horas serán clave para aprender rutas laterales, defensas iniciales, health packs y zonas donde Shion puede aparecer.',
  },
  {
    title: 'Eventos de temporada',
    body: 'Anima Strike, Summer Games 2026, Quick Play: Hacked, Excavation Initiative y colaboración Overwatch x YOASOBI dan contenido más allá de ranked.',
  },
  {
    title: 'Cambios de sistema',
    body: 'Hero bans, Stadium, Hero Select, mythics y Ultra Skins hacen que la temporada no dependa solo de Shion. Hay cambios competitivos y cosméticos que conviene separar.',
  },
]

const seasonFeatures = [
  {
    label: 'Héroe',
    title: 'Shion',
    body: 'Nueva heroína de daño con subrol de flanker. Su kit premia movilidad, presión lateral y remates sobre objetivos tocados.',
    href: '/heroes/shion',
  },
  {
    label: 'Mapa',
    title: 'Neon Junction',
    body: 'Nuevo mapa híbrido con estética urbana, neones y rutas que probablemente favorezcan DPS móviles y defensas que sepan controlar laterales.',
  },
  {
    label: 'Evento',
    title: 'Anima Strike',
    body: 'Evento destacado de temporada. Lo importante será revisar duración, recompensas, desafíos y si tiene rutas o modos propios que merezcan guía separada.',
  },
  {
    label: 'Evento',
    title: 'Summer Games 2026',
    body: 'Vuelven los Summer Games. Es buen candidato para búsquedas de recompensas, skins, desafíos y modos temporales cuando esté todo confirmado.',
  },
  {
    label: 'Colaboración',
    title: 'Overwatch x YOASOBI',
    body: 'Una colaboración con potencial fuera del público competitivo. Si trae skins, música o recompensas, merece seguimiento propio.',
  },
  {
    label: 'Ranked',
    title: 'Hero bans',
    body: 'Los ajustes de hero bans pueden alterar picks seguros, composiciones y respuestas contra Shion durante los primeros días.',
  },
  {
    label: 'Stadium',
    title: 'Hero reworks',
    body: 'Stadium recibe cambios y reworks de héroes. Antes de volver a tus builds favoritas, conviene revisar si tu héroe juega distinto.',
  },
  {
    label: 'Cosméticos',
    title: 'Mythics y Ultra Skins',
    body: 'La temporada trae mythics, Ultra Skins y colecciones de tienda. No todo se consigue igual, así que conviene separar pase, tienda y eventos.',
  },
]

const prepChecklist = [
  'Lee la guía de Shion antes de jugar ranked si todavía no sabes cómo funciona Joyride.',
  'Aprende al menos dos respuestas contra Shion: control, peel o daño fiable cuando gaste movilidad.',
  'Prueba Neon Junction en partidas rápidas antes de asumir rutas de ataque o defensa.',
  'No juzgues el meta por el primer día: el inicio de temporada siempre mezcla hype, errores y picks poco optimizados.',
  'Revisa hero bans antes de elegir composición, especialmente si juegas support o DPS vulnerable a flankers.',
  'Comprueba las patch notes para confirmar daño, cooldowns, perks y hotfixes.',
]

const faq = [
  {
    question: "¿Cuándo sale Overwatch Season 3: Into the Tiger's Den?",
    answer: `Overwatch Season 3: Into the Tiger's Den tiene lanzamiento el ${RELEASE_DATE}. Esta página se irá actualizando con patch notes, cambios finales y datos reales de partida.`,
  },
  {
    question: '¿Qué héroe nuevo llega en Overwatch Season 3?',
    answer: 'La principal novedad jugable es Shion, una heroína de daño rápida y agresiva vinculada al Clan Hashimoto.',
  },
  {
    question: '¿Qué rol tiene Shion?',
    answer: 'Shion es una heroína de daño con estilo de flanker. Su kit se centra en movilidad, presión lateral y remates.',
  },
  {
    question: "¿Qué mapa nuevo llega en Into the Tiger's Den?",
    answer: 'La temporada introduce Neon Junction, un nuevo mapa híbrido con estética urbana y rutas que conviene aprender cuanto antes.',
  },
  {
    question: '¿Qué eventos trae Overwatch Season 3?',
    answer: 'La temporada incluye Anima Strike, Summer Games 2026, Quick Play: Hacked, Excavation Initiative y una colaboración Overwatch x YOASOBI.',
  },
  {
    question: '¿Qué héroes pueden parar a Shion?',
    answer: 'Los primeros counters recomendados son Sombra, Ana, Junkrat, Brigitte, D.Va y Cassidy. Funcionan bien por control, peel o capacidad para castigar movilidad mal usada.',
  },
  {
    question: '¿Shion funciona mejor en dive o brawl?',
    answer: 'Por su kit, Shion parece funcionar bien en composiciones de dive y brawl rápido. Quiere equipos que creen caos, entren con ella o aprovechen la presión que genera en los laterales.',
  },
  {
    question: "¿Esta página sustituye a las patch notes oficiales?",
    answer: 'No. Esta página es un resumen editorial en español para entender rápido la temporada. Las cifras exactas de daño, cooldowns, perks, eventos y balance deben comprobarse con las patch notes.',
  },
]

export default function SeasonThreePage() {
  const pageUrl = absoluteUrl(PAGE_PATH)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "Overwatch Season 3 Into the Tiger's Den: Shion, Neon Junction, eventos y cambios clave",
    description: "Resumen editorial de Overwatch Season 3: Into the Tiger's Den con Shion, Neon Junction, eventos, hero bans, Summer Games, YOASOBI, mythics y cambios de temporada.",
    image: absoluteUrl('/heroes/shion.png'),
    url: pageUrl,
    datePublished: '2026-06-15',
    dateModified: '2026-06-18',
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
  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: SHION_VIDEO_TITLE,
    description: 'Vídeo complementario para entender Shion antes de jugarla en la nueva temporada.',
    thumbnailUrl: [`https://i.ytimg.com/vi/${SHION_VIDEO_ID}/hqdefault.jpg`],
    uploadDate: '2026-06-18',
    embedUrl: `https://www.youtube-nocookie.com/embed/${SHION_VIDEO_ID}`,
    contentUrl: SHION_VIDEO_URL,
    inLanguage: 'en',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={videoJsonLd} />
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
              <span style={{ color: 'var(--accent)' }}>INTO THE TIGER&apos;S DEN</span>
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.75, margin: '0 0 18px', maxWidth: 760 }}>
              Overwatch Season 3 abre una etapa centrada en velocidad, neones, crimen organizado y cambios importantes para ranked. La gran protagonista es Shion, pero también llegan Neon Junction, eventos temporales, hero bans, Stadium, mythics, Ultra Skins y contenido cosmético de temporada.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <MetaPill label="Actualizado" value={UPDATED_AT} />
              <MetaPill label="Lanzamiento" value={RELEASE_DATE} />
              <MetaPill label="Estado" value="Resumen SEO en seguimiento" />
            </div>
          </div>

          <aside style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 330, background: 'var(--surface2)' }}>
              <Image
                src="/heroes/shion.png"
                alt="Overwatch Season 3 Into the Tiger's Den con Shion"
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
          <div style={cardGridStyle}>
            {keyPoints.map(point => (
              <InfoCard key={point.title} title={point.title} body={point.body} />
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>SHION</div>
          <h2 style={headingStyle}>La gran protagonista de Into the Tiger&apos;s Den</h2>
          <div style={copyGridStyle}>
            <p style={{ margin: 0 }}>
              Shion es el contenido jugable más importante de la temporada. Llega como heroína de daño con subrol de flanker, pistolas duales, una habilidad de ejecución, dash con supervivencia, una moto ofensiva y una definitiva basada en avances rápidos con disparos.
            </p>
            <p style={{ margin: 0 }}>
              Su impacto en el meta puede ser alto porque obliga a los equipos a prestar más atención a laterales, supports aislados y control de cooldowns. No basta con saber que tiene movilidad: la clave será entender cuándo puede entrar, cuándo puede salir y qué héroes pueden pararla.
            </p>
          </div>
          <div style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/heroes/shion" className="btn btn-primary btn-sm">GUÍA COMPLETA DE SHION</Link>
            <Link href="/counters/shion" className="btn btn-secondary btn-sm">COUNTERS DE SHION</Link>
            <Link href="/team-comps/shion" className="btn btn-secondary btn-sm">COMPOSICIONES</Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>VIDEO</div>
          <h2 style={headingStyle}>Antes de llevar a Shion a ranked</h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.75, margin: '0 0 16px', maxWidth: 820 }}>
            Este vídeo complementa la guía de Shion y resume las ideas que más importan durante los primeros días: movilidad, perks, errores comunes y cómo no regalar la entrada.
          </p>
          <GuideVideo
            videoId={SHION_VIDEO_ID}
            title={SHION_VIDEO_TITLE}
            language="en"
            url={SHION_VIDEO_URL}
          />
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>TODAS LAS NOVEDADES</div>
          <h2 style={headingStyle}>Contenido anunciado para Into the Tiger&apos;s Den</h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.75, margin: '0 0 16px', maxWidth: 820 }}>
            La temporada mezcla novedades jugables, eventos, cosméticos y cambios de sistema. Lo importante es separar lo que afecta a tus partidas desde el día uno de lo que conviene seguir cuando salgan patch notes y hotfixes.
          </p>
          <div style={cardGridStyle}>
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
          <div className="eyebrow" style={{ marginBottom: 10 }}>META INICIAL</div>
          <h2 style={headingStyle}>Cómo puede cambiar el meta con Shion</h2>
          <div style={copyGridStyle}>
            <p style={{ margin: 0 }}>
              Shion puede cambiar el ritmo de las partidas porque añade una amenaza constante sobre la backline. Si sus números acompañan, los equipos tendrán que jugar con más disciplina: supports menos aislados, más atención a rutas laterales y más cuidado al gastar cooldowns defensivos.
            </p>
            <p style={{ margin: 0 }}>
              Los héroes con control y peel ganan valor contra ella. Sombra, Ana, Junkrat, Brigitte, D.Va y Cassidy parecen respuestas iniciales sólidas porque pueden cortar su entrada, castigar Joyride o proteger al objetivo que Shion quiere rematar.
            </p>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>PREPARACIÓN</div>
          <h2 style={headingStyle}>Checklist antes de jugar ranked en Season 3</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {prepChecklist.map(item => (
              <div key={item} style={{ display: 'grid', gridTemplateColumns: '22px minmax(0, 1fr)', gap: 10, alignItems: 'start', color: 'var(--text2)', fontSize: 14, lineHeight: 1.65 }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 18 }}>-</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>CONTENIDO RELACIONADO</div>
          <h2 style={headingStyle}>Qué revisar después del lanzamiento</h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, margin: '0 0 14px' }}>
            A partir de aquí, lo importante será vigilar patch notes, posibles hotfixes y cómo se comportan Shion, Neon Junction y Stadium cuando la temporada lleve unas horas en manos de la comunidad.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/heroes/shion" className="btn btn-primary btn-sm">CÓMO JUGAR SHION</Link>
            <Link href="/patch-notes" className="btn btn-secondary btn-sm">PATCH NOTES</Link>
            <Link href="/heroes" className="btn btn-secondary btn-sm">TODOS LOS HÉROES</Link>
            <Link href="/guides/como-mejorar-en-overwatch" className="btn btn-secondary btn-sm">MEJORAR EN RANKED</Link>
          </div>
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

const cardGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 12,
} as const

const copyGridStyle = {
  color: 'var(--text2)',
  fontSize: 15,
  lineHeight: 1.8,
  display: 'grid',
  gap: 12,
} as const
