import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

const PAGE_PATH = '/blizzcon-2026-overwatch-horarios-espana'
const PAGE_IMAGE = '/news/blizzcon-2026-overwatch-schedule.png'
const UPDATED_AT = '5 de septiembre de 2026'

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
  description: 'Horarios de Overwatch en BlizzCon 2026 para España: dónde verlo gratis, Hero Deep Dive, World Cup, anuncios y drops confirmados.',
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  type: 'article',
})

const keySlots: ScheduleItem[] = [
  {
    day: 'Sábado 12 de septiembre',
    title: 'Ceremonia de apertura',
    spainTime: '19:30 - 20:45',
    originalTime: '10:30 - 11:45 PDT',
    stage: 'Main Stage',
    priority: 'Alta',
    whyItMatters: 'Es el bloque donde suelen caer los anuncios grandes. Si hay teaser fuerte de Overwatch, lo normal es que aparezca aquí primero.',
  },
  {
    day: 'Sábado 12 de septiembre',
    title: 'Overwatch Dev Livestream: Live from BlizzCon',
    spainTime: '21:00 - 21:45',
    originalTime: '12:00 - 12:45 PDT',
    stage: 'Legends Stage',
    priority: 'Alta',
    whyItMatters: 'El directo de desarrolladores es el slot más importante para contexto: dirección del juego, próximos cambios y lectura de temporada.',
  },
  {
    day: 'Domingo 13 de septiembre',
    title: 'Overwatch: Hero Deep Dive',
    spainTime: '00:45 - 01:30',
    originalTime: '15:45 - 16:30 PDT',
    stage: 'Main Stage',
    priority: 'Alta',
    whyItMatters: 'Este bloque apunta directamente al héroe. Si toca gameplay, kit, rol o filosofía de diseño, aquí saldrá lo más útil para guías y counters.',
  },
  {
    day: 'Domingo 13 de septiembre',
    title: 'Overwatch: Art & Collaboration Deep Dive',
    spainTime: '03:15 - 04:00',
    originalTime: '18:15 - 19:00 PDT',
    stage: 'Overwatch World Cup Arena',
    priority: 'Media',
    whyItMatters: 'Interesa si buscas skins, colaboraciones, identidad visual y pistas de eventos. Menos gameplay, pero mucho material para actualidad.',
  },
  {
    day: 'Sábado 12 / madrugada del 13',
    title: 'Overwatch World Cup Quarterfinals',
    spainTime: '21:00 - 03:00',
    originalTime: '12:00 - 18:00 PDT',
    stage: 'Overwatch World Cup Arena',
    priority: 'Media',
    whyItMatters: 'No es un anuncio de contenido, pero sí puede mover mucho interés competitivo, picks meta y conversación sobre héroes fuertes.',
  },
  {
    day: 'Domingo 13 de septiembre',
    title: 'Questwatch en vivo',
    spainTime: '21:00',
    originalTime: '12:00 PDT',
    stage: 'Día 2 de BlizzCon',
    priority: 'Media',
    whyItMatters: 'Puede ser un bloque más ligero o de comunidad, pero merece seguimiento si conecta con narrativa, eventos o recompensas.',
  },
  {
    day: 'Lunes 14 de septiembre',
    title: 'Transmisión en vivo de los desarrolladores',
    spainTime: '00:00',
    originalTime: '15:00 PDT',
    stage: 'Día 2 de BlizzCon',
    priority: 'Alta',
    whyItMatters: 'Si el segundo día trae otra ronda de detalles, este directo puede aclarar cambios que no entren en la ceremonia ni en el Hero Deep Dive.',
  },
]

const quickReads = [
  {
    title: 'Empieza el sábado a las 19:30',
    body: 'La ceremonia de apertura comienza el 12 de septiembre a las 19:30 en España peninsular. En Canarias será a las 18:30. El resto de horarios de esta página ya están convertidos.',
  },
  {
    title: 'Los bloques que no conviene perderse',
    body: 'El directo de desarrolladores empieza a las 21:00 y el Hero Deep Dive a las 00:45. La World Cup comparte horario con parte de la programación del sábado.',
  },
  {
    title: 'Dónde verlo gratis',
    body: 'La ceremonia, los paneles principales y la World Cup se podrán seguir sin pagar en los canales oficiales de Overwatch y Overwatch Esports en YouTube y Twitch.',
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
    question: '¿Dónde se puede ver Overwatch en la BlizzCon 2026?',
    answer: 'Los anuncios y paneles se podrán seguir en los canales oficiales de Overwatch en YouTube y Twitch. La World Cup tendrá además cobertura en los canales de Overwatch Esports.',
  },
  {
    question: '¿Es gratis ver la BlizzCon 2026?',
    answer: 'Sí. Blizzard emitirá gratis la ceremonia de apertura, los paneles principales y las competiciones seleccionadas en YouTube, Twitch y Battle.net.',
  },
  {
    question: '¿Cómo se consiguen los drops de Overwatch de la BlizzCon?',
    answer: 'Antes de ver la emisión, comprueba que tu cuenta de Battle.net esté conectada con Twitch o YouTube. Blizzard ha confirmado que habrá recompensas, pero todavía no ha publicado la lista completa de drops de Overwatch.',
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
    description: 'Horarios de Overwatch en BlizzCon 2026 para España, con los canales donde verlo gratis, Hero Deep Dive, World Cup, anuncios y drops.',
    image: [absoluteUrl(PAGE_IMAGE)],
    url: pageUrl,
    datePublished: '2026-09-02',
    dateModified: '2026-09-05',
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
            <div className="eyebrow">BLIZZCON · OVERWATCH · ACTUALIZADO EL {UPDATED_AT.toUpperCase()}</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 8vw, 82px)', letterSpacing: 1, lineHeight: 0.95, margin: '0 0 16px' }}>
              BLIZZCON 2026: HORARIOS DE <span style={{ color: 'var(--accent)' }}>OVERWATCH</span> EN ESPAÑA
            </h1>
            <p style={leadStyle}>
              BlizzCon 2026 se celebra el 12 y 13 de septiembre. La ceremonia de apertura empieza el sábado a las 19:30 en España peninsular y la emisión será gratuita. Aquí tienes la agenda de Overwatch ya convertida, con los canales donde verla y lo que se sabe de los drops.
            </p>
            <p style={{ ...paragraphStyle, marginBottom: 18 }}>
              Todos los horarios de esta noticia están en CEST, hora peninsular española. En Canarias es una hora menos.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="#horarios" className="btn btn-primary btn-sm">VER HORARIOS</Link>
              <Link href="#donde-verlo" className="btn btn-secondary btn-sm">DÓNDE VERLO</Link>
              <Link href="#drops" className="btn btn-secondary btn-sm">DROPS</Link>
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
                    <p style={{ color: 'var(--text3)', fontSize: 12, lineHeight: 1.5, margin: 0 }}>En Anaheim: {slot.originalTime}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="donde-verlo" style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>EMISIÓN GRATUITA</div>
          <h2 style={headingStyle}>Dónde ver Overwatch en la BlizzCon 2026</h2>
          <p style={{ ...paragraphStyle, marginBottom: 18 }}>
            Blizzard emitirá gratis la ceremonia de apertura, los paneles principales y las competiciones seleccionadas. Para los anuncios y las charlas de desarrollo, entra en los canales de Overwatch. Para seguir los partidos, utiliza los de Overwatch Esports.
          </p>
          <div style={cardGridStyle}>
            <article style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16 }}>
              <h3 style={cardHeadingStyle}>Overwatch</h3>
              <p style={{ ...paragraphStyle, fontSize: 13, marginBottom: 14 }}>Ceremonia, directo de desarrolladores, Hero Deep Dive y paneles del juego.</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a href="https://www.youtube.com/@playoverwatch" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">YOUTUBE</a>
                <a href="https://www.twitch.tv/playoverwatch" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">TWITCH</a>
              </div>
            </article>
            <article style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16 }}>
              <h3 style={cardHeadingStyle}>Overwatch Esports</h3>
              <p style={{ ...paragraphStyle, fontSize: 13, marginBottom: 14 }}>Cuartos de final, eliminatorias y desenlace de la Overwatch World Cup.</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a href="https://www.youtube.com/@ow_esports" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">YOUTUBE</a>
                <a href="https://www.twitch.tv/ow_esports" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">TWITCH</a>
              </div>
            </article>
          </div>
        </section>

        <section id="drops" style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>RECOMPENSAS</div>
          <h2 style={headingStyle}>Habrá drops por ver la BlizzCon</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <p style={paragraphStyle}>
              Blizzard ha confirmado recompensas de audiencia durante el fin de semana. Si vas a seguir la emisión desde casa, comprueba antes que tu cuenta de Battle.net esté conectada con Twitch o YouTube para que el tiempo de visualización pueda contar.
            </p>
            <p style={paragraphStyle}>
              La lista completa de drops de Overwatch todavía no se ha publicado. Conviene revisar los requisitos cuando Blizzard enseñe las recompensas, porque pueden cambiar según el canal y el tipo de emisión.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
            <a href="https://account.battle.net/connections" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">REVISAR CONEXIONES</a>
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
          <div className="eyebrow" style={{ marginBottom: 10 }}>ANUNCIOS</div>
          <h2 style={headingStyle}>Qué está confirmado y qué falta por anunciar</h2>
          <div style={cardGridStyle}>
            <InfoCard
              title="Ya está confirmado"
              body="Overwatch tendrá directo de desarrolladores, Hero Deep Dive, panel de arte y colaboraciones, partidas de la World Cup, recompensas por ver la emisión y experiencias jugables en el recinto."
            />
            <InfoCard
              title="Todavía no se sabe"
              body="Blizzard no ha explicado qué héroe protagonizará el Hero Deep Dive, qué enseñará de Season 5 ni cuáles serán exactamente los drops de Overwatch. Cualquier detalle más concreto sigue siendo especulación."
            />
          </div>
          <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
            <p style={paragraphStyle}>
              Overwatch llega a la cita con <Link href="/heroes/dmon" style={inlineLinkStyle}>D.Mon</Link> ya disponible y una <Link href="/overwatch-temporada-4-heroes-of-busan" style={inlineLinkStyle}>Season 4</Link> que ha estrenado rango Emerald y varios reworks de mapas. El directo de desarrolladores debería aclarar cómo encaja lo que venga después con el estado actual del juego.
            </p>
            <p style={paragraphStyle}>
              Si vuelves al competitivo por la BlizzCon, la guía para <Link href="/guides/como-subir-de-rango-overwatch" style={inlineLinkStyle}>subir de rango en Overwatch</Link> reúne una rutina sencilla para retomar ranked sin jugar en piloto automático.
            </p>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>ÚLTIMA HORA</div>
          <h2 style={headingStyle}>Los Unvaulted Passes se retrasan a Season 5</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <p style={paragraphStyle}>
              Aaron Keller ha confirmado que los Unvaulted Passes no llegarán durante la mitad de Season 4, como estaba previsto. Blizzard los ha movido al comienzo de Season 5 para dar más tiempo a las pruebas.
            </p>
            <p style={paragraphStyle}>
              La compañía dará más detalles antes de la próxima temporada. Por ahora no hay información suficiente sobre su funcionamiento final, así que cualquier precio, catálogo o fecha más precisa sería especular.
            </p>
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
          <div className="eyebrow" style={{ marginBottom: 10 }}>ENLACES OFICIALES</div>
          <h2 style={headingStyle}>Calendario y canales de Blizzard</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="https://blizzcon.com/en-us/schedule/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">CALENDARIO OFICIAL</a>
            <a href="https://www.youtube.com/@playoverwatch" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">OVERWATCH EN YOUTUBE</a>
            <Link href="/news" className="btn btn-secondary btn-sm">MÁS NOTICIAS</Link>
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

const cardHeadingStyle = {
  fontFamily: 'Bebas Neue, sans-serif',
  color: 'var(--text)',
  fontSize: 24,
  letterSpacing: 0.8,
  margin: '0 0 8px',
} as const

const inlineLinkStyle = {
  color: 'var(--accent)',
  textDecoration: 'underline',
  textUnderlineOffset: 3,
} as const
