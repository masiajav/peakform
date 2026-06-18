import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import TopicArchivePage from '@/components/content/TopicArchivePage'
import JsonLd from '@/components/content/JsonLd'
import GuideVideo from '@/components/content/GuideVideo'
import PublicNav from '@/components/layout/PublicNav'
import { topicLabel } from '@/lib/content'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'
import { buildHeroSeoProfile } from '@/lib/overwatch-seo'
import { robotsForQuality, topicQualityDecision } from '@/lib/indexing-policy'

const SHION_SLUG = 'shion'
const SHION_IMAGE = '/heroes/shion.png'
const SHION_UPDATED_AT = '18 de junio de 2026'
const SHION_RELEASE_DATE = '16 de junio de 2026'
const SHION_SEASON = "Season 3: Into the Tiger's Den"
const SHION_VIDEO_ID = '9abTdz8uD3g'
const SHION_VIDEO_URL = `https://youtu.be/${SHION_VIDEO_ID}`
const SHION_VIDEO_TITLE = "Don't Play SHION Without Knowing This First | Overwatch Shion Guide"

const shionFacts = [
  { label: 'Rol', value: 'Daño' },
  { label: 'Subrol', value: 'Flanker' },
  { label: 'Estilo', value: 'Movilidad, presión lateral y remate' },
  { label: 'Dificultad', value: 'Media-alta' },
  { label: 'Punto fuerte', value: 'Castigar enemigos aislados o tocados' },
  { label: 'Punto débil', value: 'Depende mucho del timing y sus rutas' },
  { label: 'Lanzamiento', value: SHION_RELEASE_DATE },
]

const shionAbilities = [
  {
    title: 'Kira Pistols',
    body: 'Pistolas duales de anima y disparo rápido. Son la base de su presión constante: preparan objetivos antes de Execution y castigan a quien rota mal.',
  },
  {
    title: 'Execution',
    body: 'Descarga en forma de X. Si mantienes pulsado, la dispersión se reduce, así que gana valor como herramienta precisa para cerrar bajas sobre enemigos ya tocados.',
  },
  {
    title: 'Evade',
    body: 'Dash con una ventana breve de supervivencia. Decide si Shion puede entrar, reposicionarse o salir viva después de presionar. Malgastarlo hacia delante la deja vendida.',
  },
  {
    title: 'Joyride',
    body: 'Activa la moto y permite relanzarla hacia delante al desmontar. No es solo transporte: crea amenaza, fuerza miradas y convierte una ruta lateral en una entrada real.',
  },
  {
    title: 'Satsuriku Spree',
    body: 'Definitiva de avance con tres impulsos y disparos durante la ejecución. Brilla más para limpiar peleas abiertas que para iniciar cuando el rival aún tiene todos sus recursos.',
  },
]

const shionPerks = [
  {
    tier: 'Minor',
    title: 'Rapid Reload',
    body: 'Evade recarga 9 de munición. Es muy útil para mantener presión después de reposicionarte sin quedarte seco en mitad del duelo.',
  },
  {
    tier: 'Minor',
    title: 'X Machina',
    body: 'Execution hace más daño a enemigos por debajo de media vida. Encaja perfecto con su identidad de flanker que aparece para rematar, no para tradear eternamente.',
  },
  {
    tier: 'Major',
    title: 'Refuel',
    body: 'Joyride restaura vida al activarse y regenera mientras está activa. Puede permitir entradas más largas si el rival no corta la moto rápido.',
  },
  {
    tier: 'Major',
    title: 'Faces of Death',
    body: 'Da acceso temporal a pasivas de otros subroles de DPS. Parece una opción potente para snowball, tracking y ventanas concretas, aunque dependerá mucho del mapa y matchup.',
  },
]

const shionCounters = [
  {
    name: 'Sombra',
    href: '/heroes/sombra',
    body: 'Puede romper el timing de Shion con hack si lee Joyride o la entrada real. No necesita matarla sola: basta con negar el momento bueno.',
  },
  {
    name: 'Ana',
    href: '/heroes/ana',
    body: 'Sleep Dart castiga muchísimo una entrada previsible. Si Shion gasta Evade antes de entrar, Ana tiene una ventana clara para pararla.',
  },
  {
    name: 'Junkrat',
    href: '/heroes/junkrat',
    body: 'Controla pasillos, rutas estrechas y zonas de health pack. Si Shion repite laterales, Junkrat puede convertir su movilidad en una trampa.',
  },
  {
    name: 'Brigitte',
    href: '/heroes/brigitte',
    body: 'No tiene que perseguirla. Su valor está en proteger al support que Shion quiere rematar y convertir una entrada limpia en un trade malo.',
  },
  {
    name: 'D.Va',
    href: '/heroes/dva',
    body: 'Puede negar daño, cubrir supports y contestar rutas laterales sin abandonar del todo la frontline.',
  },
  {
    name: 'Cassidy',
    href: '/heroes/cassidy',
    body: 'Castiga entradas sin cobertura y rutas repetidas. Es especialmente incómodo cuando Shion ya gastó Evade o Joyride.',
  },
]

const shionFaq = [
  {
    question: '¿Shion es una DPS flanker?',
    answer: 'Sí. Shion es una heroína de daño con subrol de flanker. Su estilo gira alrededor de movilidad, presión lateral, rutas raras y remates sobre enemigos tocados.',
  },
  {
    question: '¿Shion se juega como Tracer?',
    answer: 'No exactamente. Comparte la idea de presión lateral, pero Joyride, Execution y sus perks le dan una identidad propia. Si la juegas como una copia de Tracer, vas a perder mucho valor.',
  },
  {
    question: '¿Cuál es el error más común al jugar Shion?',
    answer: 'Entrar demasiado pronto y gastar movilidad sin plan de salida. Shion necesita timing: si entra cuando el rival aún tiene todos los recursos, puede morir muy rápido.',
  },
  {
    question: '¿Qué perk parece más fuerte para Shion?',
    answer: 'Faces of Death parece una de las opciones más potentes por el acceso a otras pasivas de daño. X Machina también destaca si quieres reforzar su capacidad de remate con Execution.',
  },
  {
    question: '¿Quién counterea a Shion?',
    answer: 'Sombra, Ana, Junkrat, Brigitte, D.Va y Cassidy son buenas respuestas iniciales. En general, Shion sufre contra control, peel y equipos que no dejan supports aislados.',
  },
  {
    question: '¿Cómo se counterea Joyride?',
    answer: 'Lo mejor es anticipar la ruta, guardar control y castigar cuando Shion desmonta o lanza la moto. Si gastas todo antes de su entrada real, le facilitas la jugada.',
  },
  {
    question: '¿Shion es buena para ranked?',
    answer: 'Puede serlo, pero requiere práctica. Antes de usarla en ranked conviene aprender rutas, cooldowns, matchups y cuándo usar Joyride o Evade sin quedarse vendida.',
  },
]

export function generateMetadata({ params }: { params: { hero: string } }): Metadata {
  const label = topicLabel(params.hero)
  const profile = buildHeroSeoProfile(params.hero)
  const quality = topicQualityDecision('hero', params.hero)

  if (params.hero === SHION_SLUG) {
    return buildMetadata({
      title: 'Shion Overwatch Guide: habilidades, perks, counters y cómo jugarla',
      description: 'Guía completa de Shion en Overwatch: habilidades, perks, counters, mejores composiciones, errores comunes y consejos antes de jugarla en ranked.',
      path: `/heroes/${params.hero}`,
      image: SHION_IMAGE,
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

  if (params.hero === SHION_SLUG) {
    return <ShionHeroPage slug={params.hero} name={label} />
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

function ShionHeroPage({ slug, name }: { slug: string; name: string }) {
  const pageUrl = absoluteUrl(`/heroes/${slug}`)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Shion en Overwatch: habilidades, rol, counters y guía rápida',
    description: 'Guía de Shion en Overwatch con habilidades, Joyride, Execution, perks, counters, composiciones y consejos para ranked.',
    image: absoluteUrl(SHION_IMAGE),
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
      { '@type': 'ListItem', position: 1, name: 'Héroes', item: absoluteUrl('/heroes') },
      { '@type': 'ListItem', position: 2, name, item: pageUrl },
    ],
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: shionFaq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: SHION_VIDEO_TITLE,
    description: 'Guía en vídeo para entender cómo jugar Shion, qué errores evitar y qué perks vigilar antes de entrar a ranked.',
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
          <Link href="/heroes" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Héroes</Link>
          <span>/</span>
          <span>{name}</span>
        </div>

        <header style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(280px, 0.75fr)', gap: 24, alignItems: 'center', marginBottom: 28 }} className="home-hero-grid">
          <div>
            <div className="eyebrow">NUEVO HÉROE · {SHION_SEASON.toUpperCase()}</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 8vw, 82px)', letterSpacing: 1, lineHeight: 0.94, margin: '0 0 16px' }}>
              SHION EN OVERWATCH: <br />
              <span style={{ color: 'var(--accent)' }}>HABILIDADES, PERKS Y COUNTERS</span>
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.75, margin: '0 0 18px', maxWidth: 760 }}>
              Shion llega como una DPS flanker de ritmo alto, movilidad agresiva y mucha capacidad para castigar errores de posicionamiento. Su kit gira alrededor de pistolas duales, entradas rápidas, remates sobre enemigos tocados y una moto que sirve tanto para rotar como para amenazar espacios clave.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <MetaPill label="Actualizado" value={SHION_UPDATED_AT} />
              <MetaPill label="Lanzamiento" value={SHION_RELEASE_DATE} />
              <MetaPill label="Estado" value="Guía completa en seguimiento competitivo" />
            </div>
          </div>

          <aside style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 330, background: 'var(--surface2)' }}>
              <Image
                src={SHION_IMAGE}
                alt="Shion, nueva heroína DPS de Overwatch"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
            <div style={{ padding: 18, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
              {shionFacts.map(fact => (
                <div key={fact.label}>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.3 }}>{fact.label}</div>
                  <div style={{ color: 'var(--text)', fontSize: 13 }}>{fact.value}</div>
                </div>
              ))}
            </div>
          </aside>
        </header>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>LECTURA DE PARTIDA</div>
          <h2 style={headingStyle}>Quién es Shion en Overwatch</h2>
          <div style={copyGridStyle}>
            <p style={{ margin: 0 }}>
              Shion es una ómnica vinculada al Clan Hashimoto y una de las figuras más peligrosas de Into the Tiger&apos;s Den. Su fantasía jugable encaja con esa identidad: no está pensada para quedarse quieta disparando desde la frontal, sino para buscar ángulos incómodos, entrar con decisión y convertir una mala rotación enemiga en una baja rápida.
            </p>
            <p style={{ margin: 0 }}>
              En partida funciona mejor cuando juega alrededor del caos. Si el equipo rival pierde de vista los laterales, gasta cooldowns defensivos demasiado pronto o deja a un support aislado, Shion puede entrar, presionar y salir antes de que la pelea se estabilice.
            </p>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>ANTES DE JUGARLA</div>
          <h2 style={headingStyle}>Lo que debes saber antes de pickear Shion</h2>
          <div style={copyGridStyle}>
            <p style={{ margin: 0 }}>
              Shion no es simplemente una Tracer con moto. Puede parecer muy agresiva, pero la diferencia entre una Shion útil y una Shion que muere sola está en el timing. No entras para hacer daño porque sí: entras para obligar al rival a girarse, separar la backline o cerrar una baja que tu equipo ya ha preparado.
            </p>
            <p style={{ margin: 0 }}>
              Si gastas Joyride o Evade solo para iniciar sin información, el rival puede castigarte en cuanto pierdas movilidad. Su daño gana mucho valor cuando el enemigo ya está tocado o ha gastado recursos defensivos, así que piensa en ventanas cortas y salidas claras.
            </p>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>PLAN DE JUEGO</div>
          <h2 style={headingStyle}>Cómo jugar Shion correctamente</h2>
          <div style={copyGridStyle}>
            <p style={{ margin: 0 }}>
              Su ciclo básico es sencillo de explicar y difícil de ejecutar: busca un lateral seguro, espera a que el rival gaste movilidad o peel, entra con Joyride o Evade, remata con Kira Pistols y Execution, y sal antes de que todo el equipo enemigo pueda girarse.
            </p>
            <p style={{ margin: 0 }}>
              Si la juegas como si fueras inmortal, vas a morir mucho. Si la juegas como una amenaza que aparece cuando el enemigo ya está ocupado, puedes convertirte en una pesadilla para supports y DPS sin movilidad.
            </p>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>KIT</div>
          <h2 style={headingStyle}>Habilidades de Shion</h2>
          <div style={cardGridStyle}>
            {shionAbilities.map(ability => (
              <StatusCard key={ability.title} title={ability.title} body={ability.body} />
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>COUNTERS</div>
          <h2 style={headingStyle}>Primeros counters de Shion</h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px', maxWidth: 780 }}>
            No necesitas perseguirla por todo el mapa: necesitas hacer que su entrada sea mala. Control, peel y rutas vigiladas son mucho más fiables que correr detrás de ella sin plan.
          </p>
          <div style={cardGridStyle}>
            {shionCounters.map(counter => (
              <Link key={counter.name} href={counter.href} style={{ textDecoration: 'none' }}>
                <StatusCard title={counter.name} body={counter.body} badge="Counter inicial" />
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href="/counters/shion" className="btn btn-primary btn-sm">VER COUNTERS DE SHION</Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Cómo jugar contra Shion</h2>
          <div style={copyGridStyle}>
            <p style={{ margin: 0 }}>
              El error más común es perseguirla sin pensar. Si Shion entra, fuerza atención y consigue que dos jugadores la sigan, ya está generando valor aunque no mate a nadie.
            </p>
            <p style={{ margin: 0 }}>
              Mira los laterales antes de que empiece la pelea, no dejes supports solos, guarda control para su entrada real y castiga cuando gaste Evade o Joyride hacia delante. Shion castiga equipos desordenados; si mantienes calma y recursos, su impacto baja mucho.
            </p>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>PERKS</div>
          <h2 style={headingStyle}>Perks minor y major a vigilar</h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px', maxWidth: 780 }}>
            Los minor perks refuerzan su ciclo normal de entrada y remate. Los major perks son más delicados: pueden cambiar cuánto aguanta montada y qué ventanas agresivas puede convertir en baja.
          </p>
          <div style={cardGridStyle}>
            {shionPerks.map(perk => (
              <StatusCard key={perk.title} title={perk.title} body={perk.body} badge={`${perk.tier} perk`} />
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>COMPOSICIONES</div>
          <h2 style={headingStyle}>Mejores composiciones con Shion</h2>
          <div style={copyGridStyle}>
            <p style={{ margin: 0 }}>
              Shion debería encajar especialmente bien en dive y brawl rápido. Quiere equipos que entren con ella, creen caos o aprovechen la distracción que genera en la backline.
            </p>
            <p style={{ margin: 0 }}>
              Tanques como Winston, D.Va, Junker Queen o Ramattra pueden abrir espacio para sus entradas. Como DPS, Tracer, Genji, Sombra y Echo ayudan a dividir miradas. En support, Brigitte, Lucio, Lifeweaver y Kiriko parecen buenos puntos de partida por peel, velocidad, limpieza o rescate.
            </p>
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href="/team-comps/shion" className="btn btn-secondary btn-sm">VER COMPOSICIONES DE SHION</Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>VIDEO</div>
          <h2 style={headingStyle}>Guía en vídeo antes de jugar Shion</h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.75, margin: '0 0 16px', maxWidth: 820 }}>
            Si quieres verlo con ejemplos y ritmo de gameplay, este vídeo resume las claves que conviene entender antes de llevar a Shion a ranked: movilidad, errores comunes, perks importantes y cómo evitar morir en cada entrada.
          </p>
          <GuideVideo
            videoId={SHION_VIDEO_ID}
            title={SHION_VIDEO_TITLE}
            language="en"
            url={SHION_VIDEO_URL}
          />
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>ERRORES COMUNES</div>
          <h2 style={headingStyle}>Errores que debes evitar con Shion</h2>
          <div style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, display: 'grid', gap: 10 }}>
            {[
              'Usar Joyride solo para entrar y no tener plan de salida.',
              'Tirar Execution al inicio de la pelea en vez de guardarla para rematar.',
              'Repetir siempre la misma ruta lateral.',
              'Intentar matar supports aunque estén protegidos por Brigitte, Kiriko o D.Va.',
              'Gastar Evade hacia delante cuando el rival todavía tiene control disponible.',
              'Usar Satsuriku Spree en una pelea ya perdida.',
            ].map(item => (
              <div key={item} style={{ display: 'grid', gridTemplateColumns: '22px minmax(0, 1fr)', gap: 10 }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 18 }}>-</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>PREGUNTAS RÁPIDAS</div>
          <h2 style={headingStyle}>FAQ de Shion</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {shionFaq.map(item => (
              <article key={item.question} style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16 }}>
                <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 22, letterSpacing: 0.8, margin: '0 0 8px' }}>
                  {item.question}
                </h3>
                <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>SIGUIENTE PASO</div>
          <h2 style={headingStyle}>Más contenido relacionado con Shion</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/overwatch-temporada-3-into-the-tigers-den" className="btn btn-primary btn-sm">TEMPORADA 3</Link>
            <Link href="/counters/shion" className="btn btn-secondary btn-sm">COUNTERS DE SHION</Link>
            <Link href="/team-comps/shion" className="btn btn-secondary btn-sm">COMPOSICIONES</Link>
            <Link href="/roles/dps" className="btn btn-secondary btn-sm">VER DPS</Link>
            <Link href="/patch-notes" className="btn btn-secondary btn-sm">PATCH NOTES</Link>
            <Link href="/heroes" className="btn btn-secondary btn-sm">TODOS LOS HÉROES</Link>
          </div>
        </section>
      </main>
    </div>
  )
}

function StatusCard({ title, body, badge }: { title: string; body: string; badge?: string }) {
  return (
    <article style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16, minHeight: 154 }}>
      {badge && (
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.4, marginBottom: 8 }}>
          {badge.toUpperCase()}
        </div>
      )}
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
