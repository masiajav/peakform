import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

const PAGE_PATH = '/busan-eichenwalde-paraiso-reworks-overwatch'
const UPDATED_AT = '11 de agosto de 2026'

export const metadata: Metadata = buildMetadata({
  title: 'Busan, Eichenwalde y Paraíso ya tienen rework en Overwatch',
  description: 'Resumen editorial de los reworks de Busan, Eichenwalde y Paraíso en Overwatch Season 4: qué cambia, qué mirar en ranked y cómo adaptarte.',
  path: PAGE_PATH,
  image: '/maps/busan.png',
  type: 'article',
})

const quickSummary = [
  {
    title: 'Busan cambia por lore y lectura de mapa',
    body: 'El rework enseña una Busan más tocada por el tema MEKA: más espacio en zonas concretas, nuevas rutas y jump pads que pueden cambiar cómo se disputa high ground.',
  },
  {
    title: 'Eichenwalde parece menos encerrado',
    body: 'La entrada y varias zonas de transición reciben más opciones. Atacar debería depender menos de quedarse parado delante de una choke.',
  },
  {
    title: 'Paraíso también entra en el paquete',
    body: 'Aunque el hype inicial se lo llevan Busan y Eichenwalde, Paraíso también aparece muy cambiado, especialmente en rutas, coberturas y espacios de pelea.',
  },
]

const mapChanges = [
  {
    name: 'Busan',
    slug: 'busan',
    image: '/maps/busan.png',
    label: 'Control',
    summary: 'El rework parece centrado en abrir ciertas salidas, añadir rutas más claras y reforzar el tema MEKA dentro del mapa.',
    points: [
      'Nuevos accesos y elementos de movilidad en zonas de high ground.',
      'Sanctuary se ve más amplio en algunos laterales, con más espacio para rotar.',
      'MEKA Base recibe cambios que pueden facilitar salir del punto cuando el rival ya lo ha tomado.',
      'El punto central no parece cambiar de identidad, pero sí cambia cómo llegas a las peleas.',
    ],
    rankedRead: 'En ranked, lo más importante será no jugar Busan en autopilot. Si aparecen jump pads o rutas nuevas, los DPS móviles y supports con buena escapatoria pueden encontrar ángulos que antes no existían.',
  },
  {
    name: 'Eichenwalde',
    slug: 'eichenwalde',
    image: '/maps/eichenwalde.png',
    label: 'Híbrido',
    summary: 'El rework apunta a un Eichenwalde menos rígido, con más formas de cruzar y pelear sin comerte todo el daño desde la entrada principal.',
    points: [
      'La primera zona parece tener alternativas más cortas y una ruta lateral más útil.',
      'Aparecen coberturas y espacios que pueden ayudar al ataque a cruzar sin gastar todo de golpe.',
      'Hay más salidas para defensa, algo que puede cambiar los retakes.',
      'El puente y las transiciones seguirán castigando mala posición, pero con más opciones para preparar la pelea.',
    ],
    rankedRead: 'Si el mapa sale como se ha enseñado, el ataque debería buscar timing real: forzar un recurso, cruzar y ocupar cobertura. Defender pegado a la choke por costumbre puede ser peor que ceder vivo.',
  },
  {
    name: 'Paraíso',
    slug: 'paraiso',
    image: '/maps/paraiso.png',
    label: 'Híbrido',
    summary: 'Paraíso parece el rework más agresivo del paquete. Algunas zonas dan la sensación de mapa casi reconstruido, con más escaleras, coberturas y cambios de altura.',
    points: [
      'Se ven rutas y escaleras nuevas que cambian el valor de la verticalidad.',
      'Hay más cobertura para atacantes en zonas donde antes se recibía demasiado daño gratis.',
      'El tercer tramo parece mucho más distinto que una simple mejora visual.',
      'La lectura de calles y clubs puede cambiar bastante, así que conviene reaprender el mapa desde cero.',
    ],
    rankedRead: 'Paraíso puede pasar de ser un mapa de patrones conocidos a uno donde los primeros días ganará quien explore rutas antes. No des por hecho tus antiguas posiciones de defensa.',
  },
]

const rankedChecklist = [
  'Entra a custom game el primer día y recorre cada mapa sin presión antes de jugar ranked.',
  'Mira dónde están los health packs nuevos o movidos. En mapas reworkeados eso decide duelos más de lo que parece.',
  'Revisa qué high grounds ahora tienen acceso rápido. Si tú no los usas, el rival lo hará.',
  'No copies defensas antiguas durante la primera semana. Juega más cerca de una salida hasta entender los nuevos timings.',
  'Si eres support, comprueba líneas de visión nuevas antes de culpar al Tank por desaparecer.',
  'Si juegas Tank, piensa en rutas de entrada y salida, no solo en la primera esquina que puedes aguantar.',
]

const faqs = [
  {
    question: '¿Qué mapas reciben rework en Overwatch?',
    answer: 'Blizzard ha mostrado reworks para Busan, Eichenwalde y Paraíso. Busan y Eichenwalde son los nombres que más rápido han circulado, pero Paraíso también entra claramente en el paquete.',
  },
  {
    question: '¿Son cambios oficiales?',
    answer: 'Sí. Son cambios mostrados por Blizzard para Overwatch. Lo que falta por ver en partida no es si existen, sino cómo afectan al ritmo real del mapa, a las rutas buenas y a los picks más cómodos.',
  },
  {
    question: '¿Qué cambia ahora que Season 4 ya está lanzada?',
    answer: 'Ya toca pasar de mirar capturas a probar rutas en partida. La prioridad es revisar salidas, health packs, coberturas y high grounds antes de entrar en ranked con hábitos viejos.',
  },
  {
    question: '¿Qué hago si juego ranked?',
    answer: 'No uses las rutas antiguas por memoria. Los reworks suelen castigar más al jugador que no explora que al que falla mecánicamente durante los primeros días.',
  },
]

export default function MapReworksNewsPage() {
  const pageUrl = absoluteUrl(PAGE_PATH)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'Busan, Eichenwalde y Paraíso ya tienen rework en Overwatch',
    description: 'Resumen editorial de los reworks de Busan, Eichenwalde y Paraíso en Overwatch Season 4, con claves para ranked y lectura inicial de mapas.',
    image: [absoluteUrl('/maps/busan.png'), absoluteUrl('/maps/eichenwalde.png'), absoluteUrl('/maps/paraiso.png')],
    url: pageUrl,
    datePublished: '2026-08-02',
    dateModified: '2026-08-11',
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: pageUrl,
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Noticias', item: absoluteUrl('/news') },
      { '@type': 'ListItem', position: 2, name: 'Reworks de mapas', item: pageUrl },
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
          <span>Reworks de mapas</span>
        </div>

        <header className="home-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(280px, 0.75fr)', gap: 24, alignItems: 'center', marginBottom: 28 }}>
          <div>
            <div className="eyebrow">URGENTE · MAPAS · {UPDATED_AT.toUpperCase()}</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 8vw, 82px)', letterSpacing: 1, lineHeight: 0.95, margin: '0 0 16px' }}>
              BUSAN, EICHENWALDE Y PARAÍSO YA TIENEN <span style={{ color: 'var(--accent)' }}>REWORK</span> EN OVERWATCH
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.75, margin: '0 0 18px', maxWidth: 780 }}>
              Season 4 ya está lanzada y los reworks de Busan, Eichenwalde y Paraíso pasan de preview a mapa real. Ahora toca reaprender rutas, coberturas, high grounds y zonas de salida, porque jugar estos mapas en autopilot puede costar muchas peleas.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="#mapas" className="btn btn-primary btn-sm">CAMBIOS POR MAPA</Link>
              <Link href="/maps" className="btn btn-secondary btn-sm">GUIAS DE MAPAS</Link>
            </div>
          </div>

          <aside style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 14 }}>
            <div style={{ display: 'grid', gap: 10 }}>
              {mapChanges.map(map => (
                <Link key={map.slug} href={`/maps/${map.slug}`} style={{ textDecoration: 'none' }}>
                  <article style={{ display: 'grid', gridTemplateColumns: '92px minmax(0, 1fr)', gap: 12, alignItems: 'center', background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 10 }}>
                    <div style={{ position: 'relative', width: 92, height: 62, background: 'var(--bg)' }}>
                      <Image src={map.image} alt={`${map.name} en Overwatch`} fill sizes="92px" style={{ objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 10, letterSpacing: 1.2 }}>{map.label.toUpperCase()}</div>
                      <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 22, letterSpacing: 0.8 }}>{map.name}</div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </aside>
        </header>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>RESUMEN RÁPIDO</div>
          <h2 style={headingStyle}>Lo importante si solo tienes un minuto</h2>
          <div style={cardGridStyle}>
            {quickSummary.map(point => (
              <InfoCard key={point.title} title={point.title} body={point.body} />
            ))}
          </div>
        </section>

        <section id="mapas" style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>CAMBIOS POR MAPA</div>
          <h2 style={headingStyle}>Qué mirar en Busan, Eichenwalde y Paraíso</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {mapChanges.map(map => (
              <article key={map.slug} style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', overflow: 'hidden' }}>
                <div className="home-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 0.45fr) minmax(0, 1fr)', gap: 0 }}>
                  <div style={{ position: 'relative', minHeight: 240, background: 'var(--bg)' }}>
                    <Image src={map.image} alt={`${map.name} tras su rework en Overwatch`} fill sizes="(max-width: 768px) 100vw, 420px" style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 20 }}>
                    <div className="eyebrow" style={{ marginBottom: 8 }}>{map.label}</div>
                    <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 32, letterSpacing: 1, margin: '0 0 10px' }}>{map.name}</h3>
                    <p style={paragraphStyle}>{map.summary}</p>
                    <ul style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, margin: '12px 0 0', paddingLeft: 18 }}>
                      {map.points.map(point => <li key={point}>{point}</li>)}
                    </ul>
                    <div style={{ borderTop: '1px solid var(--border2)', marginTop: 16, paddingTop: 14 }}>
                      <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 12, letterSpacing: 1.4, marginBottom: 6 }}>LECTURA PARA RANKED</div>
                      <p style={{ ...paragraphStyle, marginBottom: 14 }}>{map.rankedRead}</p>
                      <Link href={`/maps/${map.slug}`} className="btn btn-secondary btn-sm">GUIA DE {map.name.toUpperCase()}</Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>RANKED</div>
          <h2 style={headingStyle}>Checklist para no entrar perdido el primer día</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {rankedChecklist.map(item => (
              <div key={item} style={{ display: 'grid', gridTemplateColumns: '22px minmax(0, 1fr)', gap: 10, alignItems: 'start', color: 'var(--text2)', fontSize: 14, lineHeight: 1.65 }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 18 }}>-</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>PREGUNTAS RÁPIDAS</div>
          <h2 style={headingStyle}>FAQ de los reworks</h2>
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
          <div className="eyebrow" style={{ marginBottom: 10 }}>SEGUIMIENTO</div>
          <h2 style={headingStyle}>Qué actualizaremos cuando entren al juego</h2>
          <p style={paragraphStyle}>
            La noticia recoge los reworks oficiales. Cuando estén jugables, actualizaremos las guías de Busan, Eichenwalde y Paraíso con rutas exactas, health packs, mejores composiciones y errores típicos de ranked.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
            <Link href="/overwatch-temporada-4-heroes-of-busan" className="btn btn-primary btn-sm">TODO SOBRE SEASON 4</Link>
            <a href="https://x.com/OWCavalry/status/2083915982733562192?s=20" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">BUSAN EN X</a>
            <a href="https://x.com/OWCavalry/status/2083914501896736928?s=20" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">EICHENWALDE EN X</a>
            <Link href="/news" className="btn btn-secondary btn-sm">MAS NOTICIAS</Link>
          </div>
        </section>
      </main>
    </div>
  )
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <article style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16, minHeight: 156 }}>
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
