import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

const PAGE_PATH = '/blizzcon-2026-overwatch-horarios-espana'
const PAGE_IMAGE = '/news/blizzcon-2026-overwatch-schedule.png'
const PUBLISHED_AT = '2 de septiembre de 2026'

type ScheduleItem = {
  day: string
  title: string
  spainTime: string
  originalTime: string
  stage: string
  whyItMatters: string
  priority: 'Alta' | 'Media'
}

export const metadata: Metadata = buildMetadata({
  title: 'BlizzCon 2026: horarios de Overwatch en España',
  description: 'Horarios de Overwatch en BlizzCon 2026 convertidos a España: ceremonia, directo de desarrolladores, Hero Deep Dive, World Cup y colaboraciones.',
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  type: 'article',
})

const keySlots: ScheduleItem[] = [
  {
    day: 'Sábado 12 de septiembre',
    title: 'Ceremonia de apertura',
    spainTime: '19:30 - 20:45',
    originalTime: '10:30 - 11:45 PDT / 13:30 - 14:45 Puerto Rico',
    stage: 'Main Stage',
    priority: 'Alta',
    whyItMatters: 'Es el bloque donde suelen caer los anuncios grandes. Si hay teaser fuerte de Overwatch, lo normal es que aparezca aquí primero.',
  },
  {
    day: 'Sábado 12 de septiembre',
    title: 'Overwatch Dev Livestream: Live from BlizzCon',
    spainTime: '21:00 - 21:45',
    originalTime: '12:00 - 12:45 PDT / 15:00 - 15:45 Puerto Rico',
    stage: 'Legends Stage',
    priority: 'Alta',
    whyItMatters: 'El directo de desarrolladores es el slot más importante para contexto: dirección del juego, próximos cambios y lectura de temporada.',
  },
  {
    day: 'Domingo 13 de septiembre',
    title: 'Overwatch: Hero Deep Dive',
    spainTime: '00:45 - 01:30',
    originalTime: '15:45 - 16:30 PDT / 18:45 - 19:30 Puerto Rico',
    stage: 'Main Stage',
    priority: 'Alta',
    whyItMatters: 'Este bloque apunta directamente al héroe. Si toca gameplay, kit, rol o filosofía de diseño, aquí saldrá lo más útil para guías y counters.',
  },
  {
    day: 'Domingo 13 de septiembre',
    title: 'Overwatch: Art & Collaboration Deep Dive',
    spainTime: '03:15 - 04:00',
    originalTime: '18:15 - 19:00 PDT / 21:15 - 22:00 Puerto Rico',
    stage: 'Overwatch World Cup Arena',
    priority: 'Media',
    whyItMatters: 'Interesa si buscas skins, colaboraciones, identidad visual y pistas de eventos. Menos gameplay, pero mucho material para actualidad.',
  },
  {
    day: 'Sábado 12 / madrugada del 13',
    title: 'Overwatch World Cup Quarterfinals',
    spainTime: '21:00 - 03:00',
    originalTime: '12:00 - 18:00 PDT / 15:00 - 21:00 Puerto Rico',
    stage: 'Overwatch World Cup Arena',
    priority: 'Media',
    whyItMatters: 'No es un anuncio de contenido, pero sí puede mover mucho interés competitivo, picks meta y conversación sobre héroes fuertes.',
  },
  {
    day: 'Domingo 13 de septiembre',
    title: 'Questwatch en vivo',
    spainTime: '21:00',
    originalTime: '15:00 Puerto Rico',
    stage: 'Día 2 de BlizzCon',
    priority: 'Media',
    whyItMatters: 'Puede ser un bloque más ligero o de comunidad, pero merece seguimiento si conecta con narrativa, eventos o recompensas.',
  },
  {
    day: 'Lunes 14 de septiembre',
    title: 'Transmisión en vivo de los desarrolladores',
    spainTime: '00:00',
    originalTime: '18:00 Puerto Rico',
    stage: 'Día 2 de BlizzCon',
    priority: 'Alta',
    whyItMatters: 'Si el segundo día trae otra ronda de detalles, este directo puede aclarar cambios que no entren en la ceremonia ni en el Hero Deep Dive.',
  },
]

const quickReads = [
  {
    title: 'Hora española sin hacer cuentas',
    body: 'El calendario principal de Blizzard usa horario de Anaheim. Para España peninsular suma 9 horas. Si partes de Puerto Rico, suma 6. En Canarias, resta una hora a la tabla de abajo.',
  },
  {
    title: 'Los slots clave de Overwatch',
    body: 'Ceremonia, directo de desarrolladores y Hero Deep Dive son los bloques gordos. Ahí es donde esperamos anuncios, gameplay o contexto útil para guías.',
  },
  {
    title: 'Qué haremos en Replaid Lab',
    body: 'Cuando salgan novedades, actualizaremos noticias rápidas y después conectaremos cada cambio con páginas evergreen: héroes, counters, composiciones y ranked.',
  },
]

const watchPlan = [
  'Mira la ceremonia de apertura si solo quieres los anuncios grandes.',
  'Prioriza el directo de desarrolladores si buscas contexto real y no solo trailer.',
  'Apunta el Hero Deep Dive: es el bloque más probable para sacar detalles de kit, rol, counters y composición.',
  'Si te interesa competitivo, deja abierta la World Cup para ver qué picks aparecen en partidas serias.',
  'Vuelve a las guías permanentes después de la noticia: lo importante no es solo saber qué sale, sino cómo jugarlo.',
]

const faqs = [
  {
    question: '¿A qué hora empieza BlizzCon 2026 en España?',
    answer: 'La ceremonia de apertura empieza el sábado 12 de septiembre a las 19:30 en horario peninsular español. En Canarias será a las 18:30.',
  },
  {
    question: '¿Cuándo es el directo de desarrolladores de Overwatch?',
    answer: 'El primer directo de desarrolladores de Overwatch está marcado para el sábado 12 de septiembre a las 21:00 en España peninsular.',
  },
  {
    question: '¿Cuándo es el Hero Deep Dive de Overwatch?',
    answer: 'El Hero Deep Dive cae en España ya de madrugada: domingo 13 de septiembre, de 00:45 a 01:30 en horario peninsular.',
  },
  {
    question: '¿Qué horario uso si vivo en Canarias?',
    answer: 'Resta una hora a todos los horarios de esta noticia. Por ejemplo, 19:30 peninsular equivale a 18:30 en Canarias.',
  },
]

export default function BlizzConOverwatchSchedulePage() {
  const pageUrl = absoluteUrl(PAGE_PATH)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'BlizzCon 2026: horarios de Overwatch en España',
    description: 'Horarios de Overwatch en BlizzCon 2026 convertidos a España, con los bloques clave para seguir anuncios, héroes y World Cup.',
    image: [absoluteUrl(PAGE_IMAGE)],
    url: pageUrl,
    datePublished: '2026-09-02',
    dateModified: '2026-09-02',
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: pageUrl,
    inLanguage: 'es',
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Noticias', item: absoluteUrl('/news') },
      { '@type': 'ListItem', position: 2, name: 'Horarios de Overwatch en BlizzCon 2026', item: pageUrl },
    ],
  }
  const scheduleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Horarios de Overwatch en BlizzCon 2026 para España',
    itemListElement: keySlots.map((slot, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${slot.title} - ${slot.spainTime} CEST`,
      description: slot.whyItMatters,
    })),
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={scheduleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <PublicNav />

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '56px 24px 88px' }}>
        <div style={{ marginBottom: 28, fontSize: 12, color: 'var(--text3)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Inicio</Link>
          <span>/</span>
          <Link href="/news" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Noticias</Link>
          <span>/</span>
          <span>BlizzCon 2026</span>
        </div>

        <header className="home-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(280px, 0.75fr)', gap: 24, alignItems: 'center', marginBottom: 28 }}>
          <div>
            <div className="eyebrow">BLIZZCON · OVERWATCH · {PUBLISHED_AT.toUpperCase()}</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 8vw, 82px)', letterSpacing: 1, lineHeight: 0.95, margin: '0 0 16px' }}>
              BLIZZCON 2026: HORARIOS DE <span style={{ color: 'var(--accent)' }}>OVERWATCH</span> EN ESPAÑA
            </h1>
            <p style={leadStyle}>
              BlizzCon está al caer y Overwatch ya tiene varios huecos marcados en la agenda: ceremonia de apertura, directo de desarrolladores, Hero Deep Dive, World Cup y un bloque de arte y colaboraciones. Aquí tienes los horarios pasados a España peninsular para no andar haciendo cuentas.
            </p>
            <p style={{ ...paragraphStyle, marginBottom: 18 }}>
              Todos los horarios de esta noticia están en CEST, hora peninsular española. En Canarias es una hora menos.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="#horarios" className="btn btn-primary btn-sm">VER HORARIOS</Link>
              <Link href="/heroes/dmon" className="btn btn-secondary btn-sm">D.MON</Link>
              <Link href="/overwatch-temporada-4-heroes-of-busan" className="btn btn-secondary btn-sm">SEASON 4</Link>
            </div>
          </div>

          <aside style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 14 }}>
            <div style={{ position: 'relative', aspectRatio: '16 / 9', background: 'var(--surface2)', overflow: 'hidden' }}>
              <Image
                src={PAGE_IMAGE}
                alt="Calendario de Overwatch en BlizzCon 2026 con escenarios y horarios"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
            <p style={{ color: 'var(--text3)', fontSize: 12, lineHeight: 1.5, margin: '12px 0 0' }}>
              Imagen del calendario de BlizzCon con los bloques de Overwatch del día 12.
            </p>
          </aside>
        </header>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>RESUMEN RÁPIDO</div>
          <h2 style={headingStyle}>Lo importante antes de guardar la agenda</h2>
          <div style={cardGridStyle}>
            {quickReads.map(item => (
              <InfoCard key={item.title} title={item.title} body={item.body} />
            ))}
          </div>
        </section>

        <section id="horarios" style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>HORARIO ESPAÑOL</div>
          <h2 style={headingStyle}>Agenda de Overwatch para BlizzCon 2026</h2>
          <p style={{ ...paragraphStyle, marginBottom: 18 }}>
            La tabla está ordenada como se vivirá desde España. Por eso algunos eventos del sábado en Anaheim aparecen aquí ya como madrugada del domingo.
          </p>

          <div style={{ display: 'grid', gap: 12 }}>
            {keySlots.map(slot => (
              <article key={`${slot.day}-${slot.title}`} style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 0.35fr) minmax(0, 1fr)', gap: 14 }} className="home-hero-grid">
                  <div>
                    <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 12, letterSpacing: 1.4, marginBottom: 6 }}>{slot.day.toUpperCase()}</div>
                    <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 34, letterSpacing: 1, lineHeight: 1 }}>{slot.spainTime}</div>
                    <div style={{ color: 'var(--text3)', fontSize: 12, marginTop: 7 }}>España peninsular</div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.2 }}>{slot.priority.toUpperCase()}</span>
                      <span style={{ color: 'var(--text3)', fontSize: 12 }}>{slot.stage}</span>
                    </div>
                    <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 26, letterSpacing: 0.8, margin: '0 0 8px' }}>
                      {slot.title}
                    </h3>
                    <p style={{ ...paragraphStyle, marginBottom: 8 }}>{slot.whyItMatters}</p>
                    <p style={{ color: 'var(--text3)', fontSize: 12, lineHeight: 1.5, margin: 0 }}>Referencia original: {slot.originalTime}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>QUÉ VER</div>
          <h2 style={headingStyle}>Plan recomendado para seguir Overwatch en BlizzCon</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {watchPlan.map(item => (
              <div key={item} style={{ display: 'grid', gridTemplateColumns: '22px minmax(0, 1fr)', gap: 10, alignItems: 'start', color: 'var(--text2)', fontSize: 14, lineHeight: 1.65 }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 18 }}>-</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>CONTEXTO</div>
          <h2 style={headingStyle}>Por qué esta BlizzCon importa para Overwatch</h2>
          <div style={{ display: 'grid', gap: 14, color: 'var(--text2)', fontSize: 15, lineHeight: 1.75 }}>
            <p style={{ margin: 0 }}>
              Overwatch llega a BlizzCon con bastantes temas calientes: D.Mon ya está en el juego, Season 4 ha tocado ranked con Emerald y los reworks de mapas siguen dando conversación. Si Blizzard quiere enseñar lo siguiente, tiene una ventana perfecta para conectar lo que estamos jugando ahora con lo que viene después.
            </p>
            <p style={{ margin: 0 }}>
              En Replaid Lab vamos a usar las noticias como punto de entrada, no como piezas sueltas. Si aparece un héroe, lo llevaremos a guía, counters y composiciones. Si hay balance, bajaremos el impacto a ranked. Y si se anuncian mapas o eventos, actualizaremos las páginas permanentes para que el tráfico no dependa solo del hype de los primeros días.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
            <Link href="/heroes" className="btn btn-secondary btn-sm">HÉROES</Link>
            <Link href="/counters" className="btn btn-secondary btn-sm">COUNTERS</Link>
            <Link href="/team-comps" className="btn btn-secondary btn-sm">COMPOSICIONES</Link>
            <Link href="/guides/como-subir-de-rango-overwatch" className="btn btn-primary btn-sm">SUBIR EN RANKED</Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>FAQ</div>
          <h2 style={headingStyle}>Preguntas rápidas sobre los horarios</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {faqs.map(item => (
              <article key={item.question} style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16 }}>
                <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 22, letterSpacing: 0.8, margin: '0 0 8px' }}>{item.question}</h3>
                <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.65, margin: 0 }}>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>FUENTES</div>
          <h2 style={headingStyle}>Dónde seguirlo</h2>
          <p style={{ ...paragraphStyle, marginBottom: 16 }}>
            Usamos el calendario oficial de BlizzCon como referencia principal y convertimos los horarios para España. También dejamos enlaces internos para seguir el impacto en héroes, ranked y composiciones.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="https://blizzcon.blizzard.com/en-us/schedule" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">CALENDARIO OFICIAL</a>
            <Link href="/news" className="btn btn-secondary btn-sm">MÁS NOTICIAS</Link>
            <Link href="/dmon-nuevo-heroe-tank-overwatch" className="btn btn-primary btn-sm">D.MON EN OVERWATCH</Link>
          </div>
        </section>
      </main>
    </div>
  )
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <article style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16, minHeight: 150 }}>
      <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 23, letterSpacing: 0.8, margin: '0 0 8px' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{body}</p>
    </article>
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

const leadStyle = {
  color: 'var(--text2)',
  fontSize: 16,
  lineHeight: 1.75,
  margin: '0 0 14px',
  maxWidth: 780,
} as const

const paragraphStyle = {
  color: 'var(--text2)',
  fontSize: 15,
  lineHeight: 1.75,
  margin: 0,
} as const

const cardGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 12,
} as const
