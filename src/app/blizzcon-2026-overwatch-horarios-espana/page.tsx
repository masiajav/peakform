import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

const PAGE_PATH = '/blizzcon-2026-overwatch-horarios-espana'
const PAGE_IMAGE = '/news/blizzcon-2026-overwatch-schedule.png'
const UPDATED_AT = '1 de octubre de 2026'

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
    whyItMatters: 'Presentación de Doctrine y anuncios generales de Overwatch. Es el bloque de partida para repasar las novedades del evento.',
  },
  {
    day: 'Sábado 12 de septiembre',
    title: 'Overwatch Dev Livestream: Live from BlizzCon',
    spainTime: '21:00 - 21:45',
    originalTime: '12:00 - 12:45 PDT',
    stage: 'Legends Stage',
    priority: 'Alta',
    whyItMatters: 'Conversación con los desarrolladores sobre la dirección del juego y los cambios presentados durante el evento.',
  },
  {
    day: 'Domingo 13 de septiembre',
    title: 'Overwatch: Hero Deep Dive',
    spainTime: '00:45 - 01:30',
    originalTime: '15:45 - 16:30 PDT',
    stage: 'Main Stage',
    priority: 'Alta',
    whyItMatters: 'El panel dedicado al héroe: funcionamiento de sus habilidades y decisiones de diseño. Busca esta grabación si te interesa conocer el kit.',
  },
  {
    day: 'Domingo 13 de septiembre',
    title: 'Overwatch: Art & Collaboration Deep Dive',
    spainTime: '03:15 - 04:00',
    originalTime: '18:15 - 19:00 PDT',
    stage: 'Overwatch World Cup Arena',
    priority: 'Media',
    whyItMatters: 'Panel sobre arte, skins y colaboraciones. Es una conversación distinta a las charlas de balance y gameplay.',
  },
  {
    day: 'Sábado 12 / madrugada del 13',
    title: 'Overwatch World Cup Quarterfinals',
    spainTime: '21:00 - 03:00',
    originalTime: '12:00 - 18:00 PDT',
    stage: 'Overwatch World Cup Arena',
    priority: 'Media',
    whyItMatters: 'Partidos de cuartos de final de la World Cup. Las composiciones permiten observar cómo coordinan los equipos profesionales, sin asumir que todo se traslada igual a ranked.',
  },
  {
    day: 'Domingo 13 de septiembre',
    title: 'Questwatch en vivo',
    spainTime: '21:00',
    originalTime: '12:00 PDT',
    stage: 'Día 2 de BlizzCon',
    priority: 'Media',
    whyItMatters: 'Sesión de rol de mesa con personajes de Overwatch. Un bloque de entretenimiento, separado del balance competitivo.',
  },
  {
    day: 'Lunes 14 de septiembre',
    title: 'Transmisión en vivo de los desarrolladores',
    spainTime: '00:00',
    originalTime: '15:00 PDT',
    stage: 'Día 2 de BlizzCon',
    priority: 'Alta',
    whyItMatters: 'Segundo directo con desarrolladores. Para revisar la agenda completa, ten en cuenta que en España este bloque pasó a la madrugada del lunes.',
  },
]

const quickReads = [
  {
    title: 'La apertura fue a las 19:30',
    body: 'La ceremonia comenzó el 12 de septiembre a las 19:30 en España peninsular, 18:30 en Canarias. Esta página conserva el horario del evento, no una convocatoria futura.',
  },
  {
    title: 'Paneles y World Cup',
    body: 'El primer directo de desarrolladores estaba programado a las 21:00 y el Hero Deep Dive a las 00:45. Parte de la World Cup coincidió con otros bloques del sábado.',
  },
  {
    title: 'Canales oficiales',
    body: 'La emisión fue gratuita. Para buscar las grabaciones, utiliza Overwatch para los anuncios y Overwatch Esports para las competiciones.',
  },
]

const watchPlan = [
  'Busca la ceremonia de apertura para repasar los anuncios generales.',
  'Elige el Hero Deep Dive si quieres entender las habilidades de Doctrine.',
  'Los directos de desarrolladores aportan la conversación sobre cambios y diseño.',
  'Para ver partidas, entra en Overwatch Esports y busca las eliminatorias de la World Cup.',
  'Comprueba la fecha del vídeo: el kit del trial puede recibir ajustes antes del lanzamiento.',
]

const faqs = [
  {
    question: '¿A qué hora empieza BlizzCon 2026 en España?',
    answer: 'La ceremonia de apertura fue el sábado 12 de septiembre a las 19:30 en horario peninsular español, 18:30 en Canarias. El evento ya terminó.',
  },
  {
    question: '¿Cuándo es el directo de desarrolladores de Overwatch?',
    answer: 'El primer directo estaba programado para el sábado 12 de septiembre a las 21:00 en España peninsular. Conservamos aquí la agenda para consultar las grabaciones.',
  },
  {
    question: '¿Cuándo es el Hero Deep Dive de Overwatch?',
    answer: 'El Hero Deep Dive estaba programado para la madrugada del domingo 13 de septiembre, de 00:45 a 01:30 en horario peninsular.',
  },
  {
    question: '¿Dónde se puede ver Overwatch en la BlizzCon 2026?',
    answer: 'Los canales oficiales son Overwatch en YouTube y Twitch para anuncios y paneles, y Overwatch Esports para la World Cup. El directo terminó; busca las grabaciones disponibles en cada canal.',
  },
  {
    question: '¿Es gratis ver la BlizzCon 2026?',
    answer: 'La emisión de la ceremonia, los paneles principales y las competiciones seleccionadas fue gratuita en los canales oficiales.',
  },
  {
    question: '¿Cómo se consiguen los drops de Overwatch de la BlizzCon?',
    answer: 'El vale mítico se obtiene jugando una partida y tiene plazo de obtención y canje hasta el 5 de octubre. Es distinto de las recompensas por ver emisiones: el directo de BlizzCon ya terminó.',
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
    dateModified: '2026-10-01',
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
              BlizzCon 2026 se celebró el 12 y 13 de septiembre. La apertura comenzó a las 19:30 en España peninsular y la emisión fue gratuita. El evento ya terminó: conservamos sus horarios para consultar los paneles y buscar las grabaciones.
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

        <section style={{ ...sectionStyle, borderColor: 'rgba(255, 92, 42, 0.55)' }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>ANUNCIOS CONFIRMADOS</div>
          <h2 style={headingStyle}>Doctrine fue presentado y Sombra será Support</h2>
          <p style={paragraphStyle}>
            La ceremonia presentó a <Link href="/heroes/doctrine" style={inlineLinkStyle}>Doctrine</Link> como nuevo Support. Su prueba temporal terminó el 14 de septiembre. Blizzard también anunció que Sombra pasará de DPS a Support y que Roadhog recibirá un rework.
          </p>
          <p style={paragraphStyle}>
            También hemos visto la silueta de otro héroe en desarrollo. Parece un ómnico y lleva un objeto similar a un paraguas o bastón, aunque su nombre, rol y habilidades siguen sin anunciarse.
          </p>
          <p style={{ ...paragraphStyle, marginBottom: 18 }}>
            Consulta el kit y las fechas en el resumen de anuncios; esta página mantiene la agenda original del evento.
          </p>
          <Link href="/doctrine-support-sombra-roadhog-rework-overwatch" className="btn btn-primary btn-sm">VER TODOS LOS ANUNCIOS</Link>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>RESUMEN RÁPIDO</div>
          <h2 style={headingStyle}>Cómo leer los horarios del evento</h2>
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
            Los horarios están convertidos a España peninsular. Por eso algunos eventos del sábado en Anaheim aparecen aquí como madrugada del domingo. En Canarias, resta una hora.
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
            La emisión fue gratuita. Para buscar los anuncios y las charlas de desarrollo, entra en los canales de Overwatch. Para las grabaciones de los partidos, utiliza los de Overwatch Esports. La disponibilidad de cada vídeo depende del canal.
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
          <h2 style={headingStyle}>Vale mítico gratis y drops de BlizzCon</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <p style={paragraphStyle}>
              Las recompensas de audiencia correspondían a las emisiones del evento. No des por hecho que ver una grabación activa los mismos drops. Para futuras campañas, comprueba los requisitos y conecta Battle.net con la plataforma indicada.
            </p>
            <p style={paragraphStyle}>
              El vale mítico es una promoción distinta: se obtiene jugando y se canjea por una opción elegible. Blizzard fija el 5 de octubre como plazo para obtenerlo y usarlo.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
            <a href="https://account.battle.net/connections" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">REVISAR CONEXIONES</a>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>QUÉ VER</div>
          <h2 style={headingStyle}>Qué grabaciones buscar según lo que te interesa</h2>
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
          <h2 style={headingStyle}>Qué ha confirmado Overwatch en BlizzCon</h2>
          <div style={cardGridStyle}>
            <InfoCard
              title="Ya está confirmado"
              body="Doctrine fue presentado como nuevo Support y su prueba temporal ya terminó. Sombra pasará a Support y Roadhog recibirá un rework. El resumen de anuncios recoge también las condiciones del vale mítico."
            />
            <InfoCard
              title="Lo siguiente"
              body="Quedan por conocer los detalles de los reworks y la identidad del héroe mostrado en silueta, que parece un ómnico con un paraguas o bastón. No tiene nombre, rol ni kit confirmados."
            />
          </div>
          <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
            <p style={paragraphStyle}>
              Overwatch llega a la siguiente etapa con <Link href="/heroes/doctrine" style={inlineLinkStyle}>Doctrine</Link> como nueva cara de Season 5 y <Link href="/heroes/dmon" style={inlineLinkStyle}>D.Mon</Link> asentándose tras su estreno en Season 4. El cambio de Sombra y el rework de Roadhog harán que varias guías y matchups necesiten una revisión completa.
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
