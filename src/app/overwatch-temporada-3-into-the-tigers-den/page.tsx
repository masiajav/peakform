import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

const PAGE_PATH = '/overwatch-temporada-3-into-the-tigers-den'
const UPDATED_AT = '16 de junio de 2026'
const RELEASE_DATE = '16 de junio de 2026'
const SEASON_NAME = "Season 3: Into the Tiger's Den"

export const metadata: Metadata = buildMetadata({
  title: 'Overwatch Season 3 Into the Tiger’s Den: Shion, Neon Junction y eventos',
  description: 'Resumen completo en español de Overwatch Season 3 Into the Tiger’s Den: Shion, Neon Junction, Anima Strike, Community Crafted, mythics, Ultra Skins y más.',
  path: PAGE_PATH,
  image: '/heroes/shion.png',
  type: 'article',
})

const keyPoints = [
  {
    title: 'Nuevo héroe DPS: Shion',
    body: 'Shion llega como líder ómnica del Clan Hashimoto, una DPS de presión agresiva con pistolas, dashes y una moto que también puede convertirse en proyectil.',
  },
  {
    title: 'Nuevo mapa híbrido',
    body: 'Neon Junction es el nuevo mapa híbrido ambientado en Tokio. Empieza en calles llenas de tiendas, arcades y callejones, y empuja el payload hacia el corazón del territorio Hashimoto.',
  },
  {
    title: 'Evento Anima Strike',
    body: 'Anima Strike dura tres semanas, del 16 de junio al 6 de julio. Avanzas por Neon Junction con desafíos diarios y semanales, rutas ramificadas y más de 50 recompensas temáticas.',
  },
  {
    title: 'Más que Shion',
    body: 'La temporada también trae Community Crafted, rediseño de Hero Select, nuevos mythics, Excavation Initiative, una gran actualización de Stadium, Battle Pass, Ultra Skins y colecciones de tienda.',
  },
]

const seasonFeatures = [
  {
    label: 'Héroe',
    title: 'Shion',
    body: 'Nueva heroína de daño: ómnica, líder del Clan Hashimoto y uno de los Cinco Ancianos. Su kit mezcla presión, dashes, pistolas y una moto ofensiva.',
    href: '/heroes/shion',
  },
  {
    label: 'Mapa',
    title: 'Neon Junction',
    body: 'Nuevo mapa híbrido en Tokio. Primero se captura zona y luego se escolta el payload hacia Zuiko-za, con arcades, tiendas nocturnas, cápsulas y callejones.',
  },
  {
    label: 'Evento',
    title: 'Anima Strike',
    body: 'Evento narrativo del 16 de junio al 6 de julio. Tiene desafíos diarios y semanales, rutas con decisiones, ubicaciones Hashimoto/Yokai/Subway y más de 50 recompensas.',
  },
  {
    label: 'Modo temporal',
    title: 'Community Crafted',
    body: 'Del 30 de junio al 13 de julio, Guxue, Ocie, Apply y mL7support prueban versiones especiales de Reinhardt, Sombra, Ashe y Baptiste.',
  },
  {
    label: 'Sistema',
    title: 'Hero Select',
    body: 'Rediseño de selección de héroe con filtros por rol, retratos más grandes, mejor navegación con mando, acceso a skins e información de rol/subrol visible.',
  },
  {
    label: 'Mythic Skin',
    title: 'Ascendant Phoenix Illari',
    body: 'Nueva skin mítica de Illari con progresión por niveles, variantes de alas, colores adicionales y efectos visuales de fuego.',
  },
  {
    label: 'Mythic Weapon',
    title: 'Tokyo Rebel Hanzo',
    body: 'Nuevo arco mítico para Hanzo con estética de ronin cyberpunk, dragones holográficos, animación personalizada y efecto de eliminación.',
  },
  {
    label: 'Sistema',
    title: 'Excavation Initiative',
    body: 'Evento de progreso de temporada con Venture: cajas por iniciar sesión, completar desafíos, ganar partidas y jugar de forma constante. Hay 17 Loot Boxes, 1 épica y 1 legendaria.',
  },
  {
    label: 'Stadium',
    title: 'Gran actualización',
    body: 'Stadium recibe ajustes en casi todo el roster, reworks grandes para Hazard, Tracer, Kiriko, Sojourn y Doomfist, sin restricciones de grupo en ranked y Oasis University en el map pool.',
  },
  {
    label: 'Battle Pass',
    title: 'Skins y 80 prismas',
    body: 'El pase trae cosméticos de verano y calle, skins como Summer Festival Sombra/Freja, Matsuri Junkrat, Vigilante Genji, Street Rebel Lúcio y hasta 80 Mythic Prisms.',
  },
  {
    label: 'Ultra Skins',
    title: 'Nyan Café Kiriko y Sierra',
    body: 'Las Ultra Skins debutan con Kiriko y Sierra, centradas en sonido, efectos visuales, kill effects, animaciones y detalles premium.',
  },
  {
    label: 'Tienda',
    title: 'Nyan Café y Street Rebels',
    body: 'Nyan Café llega del 23 de junio al 13 de julio. Street Rebels va del 16 de junio al 6 de julio con skins para Junker Queen, Mercy, Mizuki, Wuyang y Jetpack Cat.',
  },
]

const prepChecklist = [
  'Entra pronto a Neon Junction: en mapas híbridos nuevos, conocer rutas de ataque y defensas iniciales vale más que cualquier tier list.',
  'Si vas a jugar contra Shion, guarda peel o control para después de su entrada, no para el primer amago.',
  'Haz Anima Strike durante la primera semana si quieres avanzar por las rutas del evento sin acumular demasiadas tareas.',
  'Revisa los cambios de Stadium antes de volver a tus builds favoritas: varios héroes importantes jugarán distinto.',
  'Si te interesan los cosméticos, separa Mythic Prisms, Ultra Skins, Battle Pass y colecciones de tienda; no todo se desbloquea igual.',
  'Mira las patch notes cuando estén disponibles en detalle para confirmar números, cooldowns y cambios de balance.',
]

const faq = [
  {
    question: 'Cuándo sale Overwatch Season 3: Into the Tiger’s Den?',
    answer: `Overwatch Season 3: Into the Tiger’s Den se publica el ${RELEASE_DATE}. Es el arranque de Shion, Neon Junction, Anima Strike y la nueva oleada de cambios de temporada.`,
  },
  {
    question: 'Qué héroe nuevo llega en la Season 3?',
    answer: 'La novedad principal es Shion, una heroína DPS ómnica vinculada al Clan Hashimoto, con pistolas, dashes y una moto que puede usarse de forma ofensiva.',
  },
  {
    question: 'Qué mapa nuevo llega en Overwatch Season 3?',
    answer: 'La temporada incluye Neon Junction, un nuevo mapa híbrido. Actualizaremos rutas, composición y consejos cuando esté disponible para jugar.',
  },
  {
    question: 'Qué eventos aparecen en Into the Tiger’s Den?',
    answer: 'La temporada incluye Anima Strike, Community Crafted, Excavation Initiative, nuevas colecciones de tienda, Battle Pass de verano y una gran actualización de Stadium.',
  },
  {
    question: 'Qué mythics trae la Season 3?',
    answer: 'La temporada trae Mythic Ascendant Phoenix Illari y el arma mítica Tokyo Rebel para Hanzo. El Battle Pass permite conseguir hasta 80 Mythic Prisms.',
  },
  {
    question: 'Esta página sustituye a las patch notes?',
    answer: 'No. Es un resumen editorial en español para orientarte rápido. Las cifras exactas de balance y cualquier hotfix deben revisarse en las patch notes.',
  },
]

export default function SeasonThreePage() {
  const pageUrl = absoluteUrl(PAGE_PATH)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Overwatch Season 3 Into the Tiger’s Den: Shion, Neon Junction y eventos',
    description: 'Resumen editorial en español de la nueva temporada de Overwatch, con Shion, Neon Junction, Anima Strike, Community Crafted, Stadium, mythics y Ultra Skins.',
    image: absoluteUrl('/heroes/shion.png'),
    url: pageUrl,
    datePublished: '2026-06-15',
    dateModified: '2026-06-16',
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
              La Season 3 de Overwatch llega con Shion como nueva DPS, Neon Junction como mapa híbrido, Anima Strike, Community Crafted, mythics, Ultra Skins, Battle Pass, Excavation Initiative y una actualización grande de Stadium. Aquí tienes el resumen ordenado para saber qué mirar primero.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <MetaPill label="Actualizado" value={UPDATED_AT} />
              <MetaPill label="Lanzamiento" value={RELEASE_DATE} />
              <MetaPill label="Estado" value="Resumen completo de temporada" />
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
          <div className="eyebrow" style={{ marginBottom: 10 }}>SIGUIENTE PASO</div>
          <h2 style={headingStyle}>Qué revisar después del lanzamiento</h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, margin: '0 0 14px' }}>
            A partir de aquí, lo importante será vigilar las patch notes, posibles hotfixes y cómo se comportan Shion, Neon Junction y Stadium cuando la temporada lleve unas horas en manos de la comunidad.
          </p>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Para cambios de balance, revisa las <Link href="/patch-notes" style={{ color: 'var(--accent)' }}>patch notes de Overwatch</Link> y vuelve a mirar esta página cuando haya datos reales de Shion, Neon Junction y Stadium.
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
