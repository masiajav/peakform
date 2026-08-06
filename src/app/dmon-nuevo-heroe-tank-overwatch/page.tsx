import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

const PAGE_PATH = '/dmon-nuevo-heroe-tank-overwatch'
const PAGE_IMAGE = '/heroes/dmon.png'
const UPDATED_AT = '6 de agosto de 2026'

export const metadata: Metadata = buildMetadata({
  title: 'D.Mon en Overwatch: nuevo Tank de MEKA, fecha y primeras claves',
  description: 'D.Mon, también conocida como Yuna Lee, llega a Overwatch como nuevo Tank de MEKA el 11 de agosto: relación con D.Va, Beast, lore y primeras claves para ranked.',
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  type: 'article',
})

const quickSummary = [
  {
    title: 'D.Mon es Tank',
    body: 'La nueva heroína llega como Tank, así que su valor competitivo se medirá por espacio, recursos, frontline y cuánto puede aguantar el focus rival.',
  },
  {
    title: 'Sale el 11 de agosto',
    body: 'D.Mon está marcada para llegar con la nueva temporada de Overwatch el 11 de agosto de 2026. La noticia se irá actualizando cuando haya gameplay y patch notes.',
  },
  {
    title: 'Forma parte de MEKA',
    body: 'D.Mon, o Yuna Lee, pertenece al escuadrón MEKA, el grupo de pilotos de Busan conectado directamente con D.Va y la defensa frente a los Gwishin.',
  },
  {
    title: 'Beast es el centro del hype',
    body: 'Su mech, Beast, se presenta con una imagen más pesada y agresiva. Se han visto señales de escudo y espada, pero falta gameplay completo.',
  },
]

const storyBeats = [
  {
    title: 'MEKA vuelve al centro de la temporada',
    body: 'D.Mon no aparece como un personaje suelto. Su llegada empuja otra vez el foco hacia Busan, la base MEKA y la guerra contra amenazas que ya estaban alrededor de D.Va desde hace años.',
  },
  {
    title: 'Talon entra en la ecuación',
    body: 'La historia apunta a una amenaza mayor alrededor de Talon y a un robo de tecnología clave. Para ranked no cambia un matchup, pero sí da contexto a por qué D.Mon llega ahora y por qué Blizzard está moviendo tanto el bloque de MEKA.',
  },
  {
    title: 'D.Va ya no es la única cara del escuadrón',
    body: 'Hasta ahora, hablar de MEKA en Overwatch era casi hablar solo de D.Va. Con D.Mon, el juego empieza a enseñar más pilotos, más roles dentro del equipo y una lectura menos individual de la defensa de Busan.',
  },
  {
    title: 'Yuna Lee pasa de lore a roster',
    body: 'Para quien la busque como DMon o Yuna Lee: hablamos de la misma piloto. La diferencia ahora es que deja de ser una referencia de MEKA y pasa a tener una ficha propia dentro del roster jugable.',
  },
]

const rankedReads = [
  'Si D.Mon tiene escudo y amenaza de espada, lo primero será probarla en mapas con esquinas, rutas cortas y peleas de brawl. Ahí es donde un Tank de presencia frontal suele sentirse más natural.',
  'No conviene asumir que será una segunda D.Va. Compartir MEKA no significa compartir función: D.Va vive mucho de movilidad, Matrix y peel; D.Mon parece apuntar a otro tipo de presión.',
  'Los primeros counters a probar deberían ser respuestas anti-tank bastante claras: Zarya, Symmetra, Reaper, Ana, Zenyatta y Sombra. No porque sean sentencia, sino porque castigan recursos, beams, anti-heal, Discord y entradas lineales.',
  'El punto más importante será su salida. Muchos Tanks nuevos parecen fuertes cuando entran, pero el verdadero test es qué pasa cuando el rival guarda recursos para castigarlos.',
  'En 6v6 puede cambiar mucho. Con un segundo Tank, D.Mon podría permitirse jugar más agresiva o más de frontline compartida, pero eso dependerá de su movilidad y de cuánto necesite supports detrás.',
]

const firstVodChecklist = [
  '¿Has creado espacio real o solo has perseguido una kill lejos de tu equipo?',
  '¿Tu equipo podía seguir tu engage o entraste antes de que la pelea estuviera lista?',
  '¿Qué cooldown rival te frenó más: anti-heal, Discord, hack, beam, stun o burst?',
  '¿Has usado Beast para aguantar una ventana importante o para cruzar main sin plan?',
  '¿En qué mapas te sentiste cómodo y en cuáles necesitabas demasiada ayuda para llegar?',
]

const faqs = [
  {
    question: '¿D.Mon es Tank, DPS o Support?',
    answer: 'D.Mon llega a Overwatch como Tank. Esa es la base para entender su impacto inicial: espacio, aguante, frontline y control del ritmo de la pelea.',
  },
  {
    question: '¿Cuándo sale D.Mon en Overwatch?',
    answer: 'D.Mon llega el 11 de agosto de 2026 con la nueva temporada de Overwatch. Hasta entonces, lo útil es separar lo confirmado de las predicciones sobre su kit.',
  },
  {
    question: '¿Quién es D.Mon?',
    answer: 'D.Mon es Yuna Lee, una piloto del escuadrón MEKA de Busan. Comparte equipo con D.Va, pero no conviene asumir que vaya a jugar como ella.',
  },
  {
    question: '¿D.Mon está relacionada con D.Va?',
    answer: 'Sí. D.Mon forma parte de MEKA, el escuadrón de mechs de Busan donde también está D.Va. La gracia es que no tiene por qué jugar igual que ella.',
  },
  {
    question: '¿Se conocen sus habilidades?',
    answer: 'Se han visto señales visuales claras alrededor de Beast, escudo y espada, pero aún no conviene cerrar una guía de habilidades hasta ver gameplay completo y patch notes.',
  },
  {
    question: '¿Será buena en ranked?',
    answer: 'Demasiado pronto para asegurarlo. Como Tank nuevo tendrá mucho pickrate de salida, pero su valor real dependerá de si puede entrar, aguantar focus y salir sin depender de que todo el equipo la salve.',
  },
]

export default function DmonNewsPage() {
  const pageUrl = absoluteUrl(PAGE_PATH)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'D.Mon en Overwatch: nuevo Tank de MEKA, fecha y primeras claves',
    description: 'D.Mon, también conocida como Yuna Lee, llega a Overwatch como nuevo Tank de MEKA el 11 de agosto: relación con D.Va, Beast y lectura inicial para ranked.',
    image: [absoluteUrl(PAGE_IMAGE)],
    url: pageUrl,
    datePublished: '2026-08-06',
    dateModified: '2026-08-06',
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: pageUrl,
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Noticias', item: absoluteUrl('/news') },
      { '@type': 'ListItem', position: 2, name: 'D.Mon', item: pageUrl },
    ],
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
      <JsonLd data={faqJsonLd} />
      <PublicNav />

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '56px 24px 88px' }}>
        <div style={{ marginBottom: 28, fontSize: 12, color: 'var(--text3)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Inicio</Link>
          <span>/</span>
          <Link href="/news" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Noticias</Link>
          <span>/</span>
          <span>D.Mon</span>
        </div>

        <header className="home-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(280px, 0.75fr)', gap: 24, alignItems: 'center', marginBottom: 28 }}>
          <div>
            <div className="eyebrow">NUEVO HÉROE · TANK · {UPDATED_AT.toUpperCase()}</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 8vw, 82px)', letterSpacing: 1, lineHeight: 0.95, margin: '0 0 16px' }}>
              D.MON LLEGA A OVERWATCH COMO <span style={{ color: 'var(--accent)' }}>NUEVO TANK</span> DE MEKA
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.75, margin: '0 0 18px', maxWidth: 780 }}>
              D.Mon deja de ser solo un nombre dentro del lore de MEKA y pasa a ocupar sitio propio en Overwatch. Blizzard la presenta como nueva Tank, conectada con D.Va, Busan y el escuadrón de pilotos que protege Corea frente a las amenazas Gwishin. También la verás buscada como DMon o Yuna Lee.
            </p>
            <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.75, margin: '0 0 18px', maxWidth: 780 }}>
              La parte importante para ranked es esta: sale el 11 de agosto de 2026 y su rol está claro, pero el kit todavía necesita gameplay real. Beast, su mech, apunta a presencia frontal y amenaza agresiva, pero no vamos a vender como definitivo lo que aún depende de números, cooldowns y prueba en partida.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/heroes/dmon" className="btn btn-primary btn-sm">GUÍA DE D.MON</Link>
              <Link href="/roles/tank" className="btn btn-secondary btn-sm">GUÍAS DE TANK</Link>
              <Link href="/heroes/dva" className="btn btn-secondary btn-sm">D.VA Y MEKA</Link>
            </div>
          </div>

          <aside style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ position: 'relative', minHeight: 440, background: 'linear-gradient(180deg, var(--surface2), var(--bg))' }}>
              <Image
                src={PAGE_IMAGE}
                alt="D.Mon, nueva Tank de MEKA en Overwatch"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
            <div style={{ padding: 18, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
              <MetaPill label="Rol" value="Tank" />
              <MetaPill label="Equipo" value="MEKA" />
              <MetaPill label="Mech" value="Beast" />
              <MetaPill label="Estado" value="Primer vistazo" />
            </div>
          </aside>
        </header>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>RESUMEN RÁPIDO</div>
          <h2 style={headingStyle}>D.Mon en 30 segundos: rol, fecha y por qué importa</h2>
          <div style={cardGridStyle}>
            {quickSummary.map(point => (
              <InfoCard key={point.title} title={point.title} body={point.body} />
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>LORE</div>
          <h2 style={headingStyle}>Por qué D.Mon importa más allá del hype</h2>
          <p style={paragraphStyle}>
            Lo interesante de D.Mon es que llega con una función clara dentro del universo de Overwatch. MEKA llevaba mucho tiempo siendo casi sinónimo de D.Va para la mayoría de jugadores, pero el escuadrón siempre tuvo más pilotos, más mechs y más historia alrededor de Busan. D.Mon es Yuna Lee, una de esas piezas de lore que por fin salta al roster.
          </p>
          <p style={{ ...paragraphStyle, marginTop: 12 }}>
            Con D.Mon, Blizzard puede abrir una parte del lore que estaba ahí pero no se había convertido en gameplay. Eso encaja además con los reworks de Busan, Eichenwalde y Paraíso: la temporada no parece ir solo de meter un héroe nuevo, sino de mover piezas grandes en la historia y en los mapas.
          </p>
          <div style={{ ...cardGridStyle, marginTop: 16 }}>
            {storyBeats.map(point => (
              <InfoCard key={point.title} title={point.title} body={point.body} />
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>RANKED</div>
          <h2 style={headingStyle}>Qué puede significar D.Mon para ranked</h2>
          <NumberedList items={rankedReads} />
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>COUNTERS INICIALES</div>
          <h2 style={headingStyle}>Primeras respuestas que probaría contra D.Mon</h2>
          <p style={paragraphStyle}>
            Hasta tener el kit cerrado, los counters son una hipótesis útil, no una sentencia. Aun así, contra un Tank nuevo con pinta de frontline agresiva hay respuestas que merece la pena probar desde el primer día.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
            {['Zarya', 'Symmetra', 'Reaper', 'Ana', 'Zenyatta', 'Sombra'].map(hero => (
              <span
                key={hero}
                style={{
                  border: '1px solid var(--border2)',
                  background: 'var(--surface2)',
                  color: 'var(--text)',
                  fontFamily: 'Bebas Neue, sans-serif',
                  letterSpacing: 1.2,
                  fontSize: 16,
                  padding: '10px 12px',
                }}
              >
                {hero.toUpperCase()}
              </span>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>VOD REVIEW</div>
          <h2 style={headingStyle}>Qué revisar cuando empieces a jugarla</h2>
          <TextChecklist items={firstVodChecklist} />
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>PREGUNTAS RÁPIDAS</div>
          <h2 style={headingStyle}>FAQ de D.Mon</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {faqs.map(item => (
              <article key={item.question} style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16 }}>
                <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 22, letterSpacing: 0.8, margin: '0 0 8px' }}>
                  {item.question}
                </h3>
                <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.65, margin: 0 }}>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>SIGUIENTE PASO</div>
          <h2 style={headingStyle}>Dónde seguir preparando D.Mon</h2>
          <p style={paragraphStyle}>
            Vamos a actualizar la ficha cuando haya gameplay completo, números y primeras partidas reales. De momento, lo útil es preparar el rol de Tank, revisar cómo juega D.Va dentro de MEKA y tener a mano los reworks de mapas porque Busan también vuelve a estar en el centro.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
            <Link href="/heroes/dmon" className="btn btn-primary btn-sm">GUÍA DE D.MON EN OVERWATCH</Link>
            <Link href="/roles/tank" className="btn btn-secondary btn-sm">CÓMO JUGAR TANK</Link>
            <Link href="/busan-eichenwalde-paraiso-reworks-overwatch" className="btn btn-secondary btn-sm">REWORKS DE MAPAS</Link>
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

function NumberedList({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {items.map((item, index) => (
        <div key={item} style={{ display: 'grid', gridTemplateColumns: '34px minmax(0, 1fr)', gap: 12, alignItems: 'start' }}>
          <span style={{ border: '1px solid var(--border2)', background: 'var(--surface2)', color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, display: 'grid', placeItems: 'center', minHeight: 34 }}>
            {index + 1}
          </span>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.75, margin: 0 }}>{item}</p>
        </div>
      ))}
    </div>
  )
}

function TextChecklist({ items }: { items: string[] }) {
  return (
    <div style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, display: 'grid', gap: 10 }}>
      {items.map(item => (
        <div key={item} style={{ display: 'grid', gridTemplateColumns: '22px minmax(0, 1fr)', gap: 10 }}>
          <span style={{ color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 18 }}>-</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.3 }}>{label}</div>
      <div style={{ color: 'var(--text)', fontSize: 13, lineHeight: 1.45 }}>{value}</div>
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
