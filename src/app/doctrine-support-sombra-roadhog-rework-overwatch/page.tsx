import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

const PAGE_PATH = '/doctrine-support-sombra-roadhog-rework-overwatch'
const PAGE_IMAGE = '/news/blizzcon-2026-overwatch-roster.png'
const DOCTRINE_IMAGE = '/heroes/doctrine.png'
const MYTHIC_IMAGE = '/news/blizzcon-2026-mythic-voucher.png'

export const metadata: Metadata = buildMetadata({
  title: 'Doctrine llega a Overwatch: Sombra Support y rework de Roadhog',
  description: 'BlizzCon confirma a Doctrine como nuevo Support, el cambio de Sombra a Support, el rework de Roadhog, una mítica gratis y el teaser de otro héroe.',
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  type: 'article',
})

const quickFacts = [
  {
    title: 'Doctrine es Support',
    body: 'Es el héroe 54 de Overwatch. Su hero trial ya está activo y su lanzamiento completo está previsto para Season 5.',
  },
  {
    title: 'Sombra cambia de rol',
    body: 'El rework anunciado convierte a Sombra en Support. Su función, sus matchups y la forma de jugar alrededor de Hack tendrán que releerse desde cero.',
  },
  {
    title: 'Roadhog recibe rework',
    body: 'Blizzard también ha confirmado una revisión importante de Roadhog. Actualizaremos su guía cuando esté publicado el kit completo.',
  },
  {
    title: 'Hay una mítica gratis',
    body: 'Juega una partida después de la ceremonia de apertura para conseguir un vale mítico canjeable por una skin de héroe dentro de una selección.',
  },
  {
    title: 'Hay otro héroe en camino',
    body: 'Blizzard ha enseñado una nueva silueta. Parece un ómnico de estética detectivesca y lleva algo parecido a un paraguas, pero todavía no tiene nombre ni rol confirmados.',
  },
]

const faqs = [
  {
    question: '¿Doctrine es Tank, DPS o Support?',
    answer: 'Doctrine es Support. Es el héroe 54 de Overwatch y su kit permite curar aliados y dañar enemigos mediante sus ataques.',
  },
  {
    question: '¿Cuándo se puede jugar Doctrine?',
    answer: 'Su hero trial comenzó el 12 de septiembre de 2026. El lanzamiento completo está previsto para Season 5.',
  },
  {
    question: '¿Sombra pasa a ser Support?',
    answer: 'Sí. Blizzard ha anunciado un rework que mueve a Sombra al rol de Support. Hasta que la actualización llegue al juego, seguirá apareciendo como DPS en las herramientas que reflejan el parche live.',
  },
  {
    question: '¿Roadhog va a recibir un rework?',
    answer: 'Sí. El rework de Roadhog está confirmado. Su guía se actualizará cuando estén disponibles todos los cambios y podamos separar el diseño anunciado de su rendimiento real.',
  },
  {
    question: '¿Cómo consigo la skin mítica gratis de BlizzCon?',
    answer: 'Después de la ceremonia de apertura, juega una partida de Overwatch para recibir un vale mítico. Ese vale se puede canjear por una skin mítica de héroe dentro de la selección disponible.',
  },
  {
    question: '¿Quién es el nuevo héroe del paraguas?',
    answer: 'Todavía no tiene nombre, rol ni kit confirmados. El teaser muestra una silueta que parece ómnica, con una estética de detective y un objeto similar a un paraguas o bastón. Por ahora, cualquier detalle adicional es una teoría.',
  },
]

export default function DoctrineBlizzConNewsPage() {
  const pageUrl = absoluteUrl(PAGE_PATH)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'Doctrine llega a Overwatch: Sombra será Support y Roadhog tendrá rework',
    description: 'Resumen de los anuncios de Overwatch en BlizzCon 2026: Doctrine, reworks de Sombra y Roadhog, vale mítico y teaser de otro héroe.',
    image: [absoluteUrl(PAGE_IMAGE), absoluteUrl(DOCTRINE_IMAGE), absoluteUrl(MYTHIC_IMAGE)],
    url: pageUrl,
    datePublished: '2026-09-12',
    dateModified: '2026-09-12',
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
      { '@type': 'ListItem', position: 2, name: 'Doctrine, Sombra y Roadhog en BlizzCon', item: pageUrl },
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

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 24px 88px' }}>
        <div style={{ marginBottom: 24, fontSize: 12, color: 'var(--text3)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/news" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Noticias</Link>
          <span>/</span>
          <span>BlizzCon 2026</span>
        </div>

        <header style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 0.92fr)', gap: 28, alignItems: 'center', marginBottom: 28 }} className="home-hero-grid">
          <div>
            <div className="eyebrow">ÚLTIMA HORA · BLIZZCON 2026</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(42px, 7vw, 76px)', lineHeight: 0.96, letterSpacing: 1, margin: '0 0 18px' }}>
              DOCTRINE LLEGA A OVERWATCH: <span style={{ color: 'var(--accent)' }}>SOMBRA SERÁ SUPPORT</span> Y ROADHOG TENDRÁ REWORK
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: 17, lineHeight: 1.72, margin: '0 0 14px' }}>
              Overwatch ya tiene nuevo héroe confirmado. Doctrine será Support, se puede probar desde hoy y llegará de forma completa con Season 5. El anuncio viene acompañado por dos cambios grandes: Sombra abandona el rol de DPS para pasar a Support y Roadhog recibe un nuevo rework.
            </p>
            <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.72, margin: '0 0 18px' }}>
              Además, la celebración deja un regalo fácil de conseguir y una pista sobre el futuro: basta con jugar una partida después de la ceremonia para recibir un vale canjeable por una skin mítica, y Blizzard ha enseñado la silueta de otro héroe todavía sin nombre.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/heroes/doctrine" className="btn btn-primary btn-sm">GUÍA DE DOCTRINE</Link>
              <Link href="/roles/support" className="btn btn-secondary btn-sm">APRENDER SUPPORT</Link>
            </div>
          </div>

          <div style={{ position: 'relative', aspectRatio: '16 / 9', background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <Image
              src={PAGE_IMAGE}
              alt="Héroes de Overwatch presentados en BlizzCon 2026"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 520px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </header>

        <section style={sectionStyle}>
          <div className="eyebrow">EN 30 SEGUNDOS</div>
          <h2 style={headingStyle}>Todo lo que se ha anunciado</h2>
          <div style={cardGridStyle}>
            {quickFacts.map(item => <InfoCard key={item.title} title={item.title} body={item.body} />)}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow">NUEVO HÉROE</div>
          <h2 style={headingStyle}>Doctrine es el nuevo Support de Overwatch</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 0.7fr) minmax(0, 1fr)', gap: 24, alignItems: 'center' }} className="home-hero-grid">
            <div style={{ position: 'relative', minHeight: 430, background: 'var(--surface2)', border: '1px solid var(--border2)', overflow: 'hidden' }}>
              <Image
                src={DOCTRINE_IMAGE}
                alt="Doctrine, nuevo héroe Support de Overwatch"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
            <div style={{ display: 'grid', gap: 13, color: 'var(--text2)', fontSize: 15, lineHeight: 1.72 }}>
              <p style={{ margin: 0 }}>
                Doctrine es el héroe 54 y la nueva incorporación de Talon. Su presentación lo coloca cerca de Doomfist y Sombra, y abre otro capítulo para una facción que vuelve a ganar peso tanto en la historia como en el roster jugable.
              </p>
              <p style={{ margin: 0 }}>
                En gameplay, lo confirmado es muy concreto: sus ataques pueden curar aliados o dañar enemigos. Eso lo convierte en un Support de puntería y cambios rápidos de objetivo. Los desarrolladores hablan de un skill floor mecánico alto, así que no parece diseñado para dejar una cura pasiva funcionando mientras miras otra parte de la pelea.
              </p>
              <p style={{ margin: 0 }}>
                El hero trial ya está activo. Es el mejor momento para probar sensaciones, alcance y ritmo, pero no para cerrar una tier definitiva. Los valores, cooldowns y perks todavía pueden moverse antes de su lanzamiento con Season 5.
              </p>
              <Link href="/heroes/doctrine" style={{ color: 'var(--accent)', fontWeight: 700 }}>Ver la guía y el kit confirmado de Doctrine →</Link>
            </div>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow">CAMBIO DE ROL</div>
          <h2 style={headingStyle}>Sombra pasa de DPS a Support</h2>
          <p style={paragraphStyle}>
            El cambio de Sombra no es un ajuste menor. Moverla a Support obliga a replantear su función dentro de la composición: cuánto de su valor seguirá viniendo de Hack, cómo ayudará a mantener vivo al equipo y qué parte de su presión de flanco conservará después del rework.
          </p>
          <p style={paragraphStyle}>
            Hasta que el parche esté disponible, nuestras herramientas seguirán mostrando a Sombra como DPS porque reflejan el estado live del juego. En cuanto llegue el rework actualizaremos su rol, counters, comps y guía a la vez. Así evitamos recomendar una versión futura en partidas donde todavía se juega el kit anterior.
          </p>
          <div style={{ background: 'var(--surface2)', borderLeft: '3px solid var(--accent)', padding: 18, color: 'var(--text2)', lineHeight: 1.65 }}>
            <strong style={{ color: 'var(--text)' }}>La pregunta clave:</strong> no es si Sombra seguirá haciendo daño, sino qué utilidad defensiva u ofensiva tendrá para justificar uno de los dos slots de Support.
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow">REWORK</div>
          <h2 style={headingStyle}>Roadhog también cambia</h2>
          <p style={paragraphStyle}>
            Roadhog vuelve a pasar por una revisión importante. El anuncio confirma el rework, pero la lectura útil llegará cuando podamos ver el kit completo y probar qué ocurre con su capacidad de pick, su sustain y la forma en la que ocupa espacio como Tank.
          </p>
          <p style={paragraphStyle}>
            No vamos a rellenar esa espera con números inventados. Cuando Blizzard publique el desglose, actualizaremos la guía de Roadhog y todos los matchups afectados. Un cambio en Hook, Take a Breather o su control de espacio puede mover muchas páginas a la vez, especialmente las de supports sin movilidad y composiciones anti-dive.
          </p>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow">PRIMER TEASER</div>
          <h2 style={headingStyle}>Otro héroe aparece en escena, pero aún no sabemos quién es</h2>
          <p style={paragraphStyle}>
            La presentación también ha dejado un primer vistazo a otro personaje. La imagen enseña una silueta de aspecto ómnico, con una pose muy marcada y un objeto largo que recuerda a un paraguas o un bastón. La estética ha hecho que muchos jugadores lo describan como una especie de detective, pero Blizzard todavía no ha confirmado ese concepto.
          </p>
          <p style={paragraphStyle}>
            No conocemos su nombre, su rol ni cuándo llegará al roster. Tampoco sabemos si el paraguas será un arma, una habilidad o simplemente parte de su diseño. De momento, la información útil termina en lo que se ve en pantalla; cualquier lectura sobre su kit sería adelantarse demasiado.
          </p>
          <div style={{ background: 'var(--surface2)', borderLeft: '3px solid var(--accent)', padding: 18, color: 'var(--text2)', lineHeight: 1.65 }}>
            <strong style={{ color: 'var(--text)' }}>Lo confirmado:</strong> hay otro héroe en desarrollo y Blizzard ya ha mostrado su silueta. El resto sigue abierto.
          </div>
        </section>

        <section style={{ ...sectionStyle, borderColor: 'rgba(146, 92, 255, 0.55)' }}>
          <div className="eyebrow">REGALO DE BLIZZCON</div>
          <h2 style={headingStyle}>Cómo conseguir una skin mítica gratis</h2>
          <div style={{ position: 'relative', aspectRatio: '16 / 9', background: 'var(--surface2)', border: '1px solid var(--border2)', overflow: 'hidden', marginBottom: 20 }}>
            <Image
              src={MYTHIC_IMAGE}
              alt="Vale mítico gratuito de Overwatch por BlizzCon 2026"
              fill
              sizes="(max-width: 768px) 100vw, 1120px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <ol style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.75, margin: 0, paddingLeft: 22 }}>
            <li>Abre Overwatch después de la ceremonia de apertura de BlizzCon.</li>
            <li>Juega una partida completa.</li>
            <li>Recibirás un vale mítico como agradecimiento a la comunidad.</li>
            <li>Canjéalo por una skin mítica de héroe dentro de la selección que ofrece el juego.</li>
          </ol>
          <p style={{ ...paragraphStyle, marginTop: 16 }}>
            No lo dejes para el último momento: la pantalla confirma el requisito, pero no muestra una fecha límite. También conviene recordar que el vale permite elegir dentro de una selección; no promete acceso a cualquier mítica publicada hasta ahora.
          </p>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow">QUÉ HACER AHORA</div>
          <h2 style={headingStyle}>Un plan sencillo para este fin de semana</h2>
          <div style={cardGridStyle}>
            <InfoCard title="Prueba Doctrine" body="Juega unas partidas centrado en su ciclo de curación y daño. Apunta cuándo pierdes valor por mala posición y cuándo por aim." />
            <InfoCard title="Consigue el vale" body="Completa una partida después de la ceremonia y comprueba el apartado de recompensas antes de elegir la mítica." />
            <InfoCard title="No borres a Sombra de tus planes" body="Su versión live sigue siendo DPS hasta que llegue el rework. Guarda las conclusiones nuevas para el parche correcto." />
            <InfoCard title="Espera al kit de Roadhog" body="El rework está confirmado, pero los counters solo deben cambiar cuando conozcamos las herramientas reales." />
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow">PREGUNTAS RÁPIDAS</div>
          <h2 style={headingStyle}>FAQ de los anuncios de Overwatch</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {faqs.map(item => (
              <article key={item.question} style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 18 }}>
                <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 23, letterSpacing: 0.8, margin: '0 0 8px' }}>{item.question}</h3>
                <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
          <div className="eyebrow">FUENTES Y SIGUIENTE PASO</div>
          <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.65, maxWidth: 850 }}>
            La identidad jugable de Doctrine y su llegada en Season 5 han sido recogidas a partir del anuncio de BlizzCon y la información publicada durante el hero trial. El segundo héroe solo se describe a partir de su teaser visual: no le atribuimos nombre, rol ni habilidades que todavía no se hayan anunciado.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="https://x.com/OWCavalry/status/2098836204599054663" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">VER GAMEPLAY</a>
            <a href="https://www.polygon.com/overwatch-new-hero-54-doctrine-blizzcon-2026/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">LEER EL ANUNCIO</a>
            <a href="https://x.com/OWCavalry/status/2098839072483545244" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">VER EL TEASER</a>
            <Link href="/news" className="btn btn-primary btn-sm">MÁS NOTICIAS</Link>
          </div>
        </section>
      </main>
    </div>
  )
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <article style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 18 }}>
      <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, letterSpacing: 0.8, margin: '0 0 8px' }}>{title}</h3>
      <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{body}</p>
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
  fontSize: 34,
  letterSpacing: 1,
  lineHeight: 1.05,
  margin: '8px 0 16px',
} as const

const paragraphStyle = {
  color: 'var(--text2)',
  fontSize: 15,
  lineHeight: 1.72,
  margin: '0 0 14px',
} as const

const cardGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 12,
} as const
