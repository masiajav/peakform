import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

const PAGE_PATH = '/overwatch-temporada-4-heroes-of-busan'
const PAGE_IMAGE = '/news/overwatch-season-4-heroes-of-busan.png'
const RELEASE_DATE = '11 de agosto de 2026'
const UPDATED_AT = '10 de agosto de 2026'

type VisualItem = {
  title: string
  label: string
  body: string
  src: string
  alt: string
}

export const metadata: Metadata = buildMetadata({
  title: 'Overwatch Season 4 Heroes of Busan: D.Mon, Emerald, skins y reworks',
  description: 'Resumen completo de Overwatch Season 4: Heroes of Busan con D.Mon, nuevo rango Emerald, Battle Pass revamp, mythic de Genji, arma mítica de Sojourn, LE SSERAFIM, player card frames y reworks.',
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  type: 'article',
})

const highlights = [
  {
    title: 'D.Mon llega como nuevo Tank',
    body: 'La temporada gira alrededor de MEKA y Busan. D.Mon entra al roster como Tank con Plasma Saber, Power Barrier, Propulsors, Surging Strike, Limit Break y el ciclo de mech.',
  },
  {
    title: 'Battle Pass revamp',
    body: 'El pase cambia su presentación: más control sobre qué recompensa persigues y Hack Tiers para cambiar ciertas skins si tienes el Battle Pass premium.',
  },
  {
    title: 'Rank reset y Emerald',
    body: 'Hay reset competitivo y aparece Emerald como nuevo rango. Es uno de los cambios con más impacto para la primera semana de ranked.',
  },
  {
    title: 'Busan, Paraíso y Eichenwalde',
    body: 'Los tres mapas reciben rework. No es solo decoración: rutas, coberturas y lectura de high ground pueden cambiar bastante cómo se juegan.',
  },
]

const timeline = [
  {
    date: '11 de agosto',
    title: 'Arranca Season 4: Heroes of Busan',
    body: 'D.Mon entra en Overwatch, empieza el evento Shooting Star: My MEKA Mania y llega el paquete principal de novedades de temporada.',
  },
  {
    date: '11-31 de agosto',
    title: 'Shooting Star: My MEKA Mania',
    body: 'Evento centrado en MEKA con desafíos, lore y recompensas. Es el evento que más encaja con D.Mon, D.Va y Busan.',
  },
  {
    date: 'Mid-season',
    title: 'Unvaulted Passes',
    body: 'Llegan como segunda oportunidad para desbloquear recompensas de Battle Pass pasados cuando Blizzard los active dentro del ciclo de temporada.',
  },
  {
    date: '1-14 de septiembre',
    title: 'World Cup Cheer Rally',
    body: 'Evento de apoyo a regiones de la Overwatch World Cup con cheers, recompensas y skins regionales asociadas.',
  },
  {
    date: '4-6 de septiembre',
    title: 'Team Drives',
    body: 'Evento corto para jugar en grupo, mantener buenas squads tras ganar y progresar en recompensas sociales o de perfil.',
  },
]

const battlePassReads = [
  'El Battle Pass mantiene la idea base, pero ahora se presenta de una forma menos lineal. La gracia es poder elegir mejor qué track quieres avanzar.',
  'Los Hack Tiers sirven para cambiar una recompensa por otra skin disponible dentro de las opciones del pase. No es un "todo gratis": la función va ligada al Battle Pass premium.',
  'Los Unvaulted Passes llegan en mid-season para recuperar recompensas antiguas seleccionadas. Ojo: no todo vuelve igual; conviene separar skins, moneda, prismas, títulos, mythics y armas míticas.',
  'Para jugadores casuales es una mejora de control. Para jugadores que optimizan el gasto, la clave será esperar a ver qué recompensas son realmente intercambiables antes de comprar por impulso.',
]

const rankedReads = [
  {
    title: 'Rank reset',
    body: 'El reset mete ruido en las primeras partidas. Los primeros días mezclan gente colocándose, picks nuevos y jugadores probando D.Mon sin tener todavía rutas o timings claros.',
  },
  {
    title: 'Nuevo rango Emerald',
    body: 'Emerald llega como nuevo escalón competitivo. Hasta ver cómo queda la distribución real, lo sensato es medir progreso por calidad de decisiones, no solo por el icono de la primera semana.',
  },
  {
    title: 'D.Mon en ranked',
    body: 'Como Tank nuevo va a tener muchísimo pickrate. Aprende a jugar con ella y contra ella: anti-heal, Discord, beams, verticalidad y control de recursos serán checks importantes.',
  },
  {
    title: 'Mapas reworkeados',
    body: 'Busan, Paraíso y Eichenwalde van a castigar el autopilot. Entra a custom, mira rutas nuevas, health packs y high grounds antes de jugar ranked como si nada hubiera cambiado.',
  },
]

const systems = [
  {
    title: 'Team status indicator',
    body: 'Encima de la kill feed se mostrará mejor cuánta gente queda viva por equipo y quién está en respawn. Esto ayuda a decidir si una pelea se sigue o se corta.',
  },
  {
    title: 'Respawn timers',
    body: 'Ver tiempos de respawn de aliados reduce bastante el "entro porque sí". Para ranked puede ser una mejora enorme si la gente aprende a esperar reagrupes.',
  },
  {
    title: 'Multikill y healing feedback',
    body: 'Más señales visuales para multikills y curación. No cambia el balance, pero sí la lectura rápida de pelea.',
  },
  {
    title: 'Activity feed',
    body: 'Vuelve una lectura más clara de contribución a eliminaciones. Útil para entender si realmente has convertido daño o solo has rozado kills ya hechas.',
  },
]

const cosmetics = [
  {
    title: 'Mythic de Genji',
    body: 'La temporada enseña una skin mítica de Genji con estética dual y acabado muy reconocible. Es una de las piezas que más búsquedas va a mover.',
  },
  {
    title: 'Arma mítica de Sojourn',
    body: 'Sojourn recibe una weapon skin mítica con acabado de cristal, animaciones y pinta de objeto premium para quienes juegan hitscan.',
  },
  {
    title: 'LE SSERAFIM vuelve',
    body: 'La colaboración vuelve a aparecer como bloque propio de temporada. Si trae skins nuevas o bundles, será contenido fuerte para seguimiento.',
  },
  {
    title: 'New player card frames',
    body: 'Los nuevos marcos de tarjeta de jugador hacen que el perfil tenga más presencia visual, especialmente en rangos altos y con héroes destacados.',
  },
  {
    title: 'Bundles de tienda',
    body: 'Young Gods, Fleece and Fangs y otros packs van por tienda. La recomendación es revisar precio, héroes incluidos y si realmente juegas esos personajes antes de comprar.',
  },
]

const primaryVisuals: VisualItem[] = [
  {
    title: 'D.Mon y el resumen de temporada',
    label: 'Season 4',
    body: 'La temporada se vende alrededor de Busan, MEKA y la llegada de D.Mon como Tank. Es el punto de entrada para entender todo el parche.',
    src: PAGE_IMAGE,
    alt: 'Resumen visual de Overwatch Season 4 Heroes of Busan con D.Mon, reworks, Emerald y Battle Pass',
  },
  {
    title: 'Battle Pass skins',
    label: 'Battle Pass',
    body: 'El pase trae una tanda grande de skins, con D.Mon como pieza central visual y varios héroes recibiendo cosméticos de temporada.',
    src: '/news/overwatch-season-4-battle-pass-skins.png',
    alt: 'Skins del Battle Pass de Overwatch Season 4 Heroes of Busan',
  },
  {
    title: 'Nuevo rango Emerald',
    label: 'Ranked',
    body: 'Emerald entra como nuevo escalón competitivo. Más allá del icono, lo importante será cómo recoloca a la gente tras el reset.',
    src: '/news/overwatch-season-4-emerald-rank.png',
    alt: 'Nuevo rango Emerald de Overwatch Season 4',
  },
]

const cosmeticVisuals: VisualItem[] = [
  {
    title: 'Mythic de Genji',
    label: 'Mythic skin',
    body: 'Genji recibe una mythic con estética marcada, buen contraste de color y mucha presencia para clips, thumbnails y búsquedas.',
    src: '/news/overwatch-season-4-genji-mythic.png',
    alt: 'Skin mítica de Genji en Overwatch Season 4',
  },
  {
    title: 'Arma mítica de Sojourn',
    label: 'Mythic weapon',
    body: 'La weapon skin mítica de Sojourn apunta a ser uno de los cosméticos premium de la temporada por animación y acabado.',
    src: '/news/overwatch-season-4-sojourn-mythic-weapon.png',
    alt: 'Arma mítica de Sojourn en Overwatch Season 4',
  },
  {
    title: 'LE SSERAFIM',
    label: 'Colaboración',
    body: 'La colaboración vuelve a entrar en el calendario y puede traer mucho ruido fuera del público competitivo puro.',
    src: '/news/overwatch-season-4-le-sserafim.png',
    alt: 'Colaboración LE SSERAFIM en Overwatch Season 4',
  },
  {
    title: 'New player card frames',
    label: 'Perfil',
    body: 'Los nuevos marcos de player card hacen que el perfil luzca más, sobre todo si quieres enseñar rango, héroes favoritos y progreso.',
    src: '/news/overwatch-season-4-player-card-frames.png',
    alt: 'Nuevos player card frames de Overwatch Season 4',
  },
  {
    title: 'Young Gods',
    label: 'Shop bundle',
    body: 'Bundle de tienda con estética más mitológica. Interesa si juegas varios de los héroes incluidos, no solo por una skin suelta.',
    src: '/news/overwatch-season-4-young-gods.png',
    alt: 'Bundle Young Gods de Overwatch Season 4',
  },
  {
    title: 'Fleece and Fangs',
    label: 'Shop bundle',
    body: 'Otro bundle de tienda con estilo muy distinto al pase. Buen contenido visual, pero conviene separar hype de valor real.',
    src: '/news/overwatch-season-4-fleece-and-fangs.png',
    alt: 'Bundle Fleece and Fangs de Overwatch Season 4',
  },
]

const prepChecklist = [
  'Guarda esta página como hub de Season 4 y entra primero por D.Mon si quieres jugar Tank.',
  'Antes de ranked, revisa Busan, Paraíso y Eichenwalde en custom para reaprender rutas.',
  'No juzgues Emerald por el primer día: con rank reset habrá partidas raras.',
  'Si compras Battle Pass premium, mira primero cómo funcionan Hack Tiers y qué skins puedes cambiar.',
  'Durante Team Drives, juega con gente con la que hayas tenido buena partida en vez de spamear queue solo por recompensa.',
  'Cuando salgan patch notes, revisa números reales de D.Mon, perks, cooldowns y cambios de mapas.',
]

const faqs = [
  {
    question: '¿Cuándo sale Overwatch Season 4: Heroes of Busan?',
    answer: `Overwatch Season 4: Heroes of Busan empieza el ${RELEASE_DATE}. La temporada llega con D.Mon, evento MEKA, rank reset, nuevo rango Emerald, reworks de mapas y cambios en el Battle Pass.`,
  },
  {
    question: '¿D.Mon es Tank, DPS o Support?',
    answer: 'D.Mon llega como Tank. Su kit gira alrededor de espada, barrera frontal, movilidad horizontal, Surging Strike, Limit Break y el ciclo de mech.',
  },
  {
    question: '¿Qué mapas cambian en Season 4?',
    answer: 'Los reworks principales son Busan, Paraíso y Eichenwalde. Conviene reaprender rutas, coberturas, health packs y high grounds antes de entrar a ranked.',
  },
  {
    question: '¿Qué es Emerald en Overwatch?',
    answer: 'Emerald es el nuevo rango competitivo presentado para esta temporada. Lo importante será ver cómo afecta a la distribución real tras el rank reset.',
  },
  {
    question: '¿Qué cambia en el Battle Pass?',
    answer: 'El Battle Pass recibe un revamp con tracks más claros, más control sobre recompensas y Hack Tiers para cambiar ciertas skins en el pase premium.',
  },
  {
    question: '¿Vuelve LE SSERAFIM a Overwatch?',
    answer: 'Sí, la temporada incluye una nueva colaboración con LE SSERAFIM. Habrá que revisar tienda y fechas concretas cuando el contenido esté disponible.',
  },
]

export default function SeasonFourPage() {
  const pageUrl = absoluteUrl(PAGE_PATH)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'Overwatch Season 4 Heroes of Busan: D.Mon, Emerald, skins y reworks',
    description: 'Resumen completo de Overwatch Season 4: Heroes of Busan con D.Mon, nuevo rango Emerald, Battle Pass revamp, mythic de Genji, arma mítica de Sojourn, LE SSERAFIM, player card frames y reworks.',
    image: [
      absoluteUrl(PAGE_IMAGE),
      absoluteUrl('/news/overwatch-season-4-genji-mythic.png'),
      absoluteUrl('/news/overwatch-season-4-battle-pass-skins.png'),
      absoluteUrl('/news/overwatch-season-4-player-card-frames.png'),
      absoluteUrl('/news/overwatch-season-4-emerald-rank.png'),
    ],
    url: pageUrl,
    datePublished: '2026-08-10',
    dateModified: '2026-08-10',
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: pageUrl,
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Noticias', item: absoluteUrl('/news') },
      { '@type': 'ListItem', position: 2, name: 'Overwatch Season 4', item: pageUrl },
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
          <span>Season 4</span>
        </div>

        <header className="home-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.02fr) minmax(300px, 0.9fr)', gap: 24, alignItems: 'center', marginBottom: 28 }}>
          <div>
            <div className="eyebrow">NUEVA TEMPORADA · {RELEASE_DATE.toUpperCase()}</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(44px, 8vw, 84px)', letterSpacing: 1, lineHeight: 0.94, margin: '0 0 16px' }}>
              OVERWATCH SEASON 4: <br />
              <span style={{ color: 'var(--accent)' }}>HEROES OF BUSAN</span>
            </h1>
            <p style={leadStyle}>
              Season 4 viene cargada de verdad: D.Mon como nuevo Tank de MEKA, evento Shooting Star: My MEKA Mania, reworks de Busan, Paraíso y Eichenwalde, rank reset, nuevo rango Emerald, Battle Pass revamp, Team Drives, World Cup Cheer Rally, skins míticas, player card frames y colaboración con LE SSERAFIM.
            </p>
            <p style={leadStyle}>
              La lectura importante para ranked es sencilla: no es una temporada solo de cosméticos. D.Mon puede mover el rol de Tank, los reworks obligan a reaprender mapas y el reset competitivo va a hacer que la primera semana sea bastante caótica.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
              <Link href="/heroes/dmon" className="btn btn-primary btn-sm">GUÍA DE D.MON</Link>
              <Link href="/busan-eichenwalde-paraiso-reworks-overwatch" className="btn btn-secondary btn-sm">REWORKS DE MAPAS</Link>
              <Link href="/roles/tank" className="btn btn-secondary btn-sm">PREPARAR TANK</Link>
            </div>
          </div>

          <aside style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ position: 'relative', aspectRatio: '16 / 9', background: 'var(--surface2)' }}>
              <Image
                src={PAGE_IMAGE}
                alt="Resumen de Overwatch Season 4 Heroes of Busan con D.Mon, reworks, Emerald y Battle Pass"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 520px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: 18, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
              <MetaPill label="Salida" value={RELEASE_DATE} />
              <MetaPill label="Nuevo héroe" value="D.Mon · Tank" />
              <MetaPill label="Ranked" value="Reset + Emerald" />
              <MetaPill label="Mapas" value="Busan, Paraíso, Eichenwalde" />
            </div>
          </aside>
        </header>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>RESUMEN RÁPIDO</div>
          <h2 style={headingStyle}>Qué trae Season 4 en Overwatch</h2>
          <div style={cardGridStyle}>
            {highlights.map(item => <InfoCard key={item.title} title={item.title} body={item.body} />)}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>VISTAZO VISUAL</div>
          <h2 style={headingStyle}>Lo que más vas a ver esta temporada</h2>
          <p style={{ ...paragraphStyle, marginBottom: 16 }}>
            Si solo quieres quedarte con la foto grande: D.Mon marca el tema de temporada, el Battle Pass mete bastante cosmético nuevo y Emerald va a concentrar muchas búsquedas durante el reset.
          </p>
          <VisualGrid items={primaryVisuals} featured />
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>CALENDARIO</div>
          <h2 style={headingStyle}>Fechas clave de Heroes of Busan</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {timeline.map(item => (
              <article key={item.title} style={{ display: 'grid', gridTemplateColumns: '150px minmax(0, 1fr)', gap: 16, background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16 }} className="home-hero-grid">
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 20, letterSpacing: 1 }}>{item.date}</div>
                <div>
                  <h3 style={smallHeadingStyle}>{item.title}</h3>
                  <p style={smallCopyStyle}>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>D.MON</div>
          <h2 style={headingStyle}>El nuevo Tank de MEKA es el centro de la temporada</h2>
          <p style={paragraphStyle}>
            D.Mon llega como Tank y no como una versión duplicada de D.Va. Comparte escuadrón MEKA, pero su identidad va por otro sitio: sword + shield, frontline, movilidad horizontal y una ultimate pensada para abrir pelea con follow-up.
          </p>
          <p style={{ ...paragraphStyle, marginTop: 12 }}>
            Si juegas Tank, la pregunta no es solo &quot;¿está fuerte?&quot;. La pregunta útil es dónde puede crear espacio sin regalarse. Si juegas contra ella, empieza probando anti-heal, Discord, beams, control y verticalidad.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
            <Link href="/dmon-nuevo-heroe-tank-overwatch" className="btn btn-primary btn-sm">TODO SOBRE D.MON</Link>
            <Link href="/counters/dmon" className="btn btn-secondary btn-sm">COUNTERS DE D.MON</Link>
            <Link href="/team-comps/dmon" className="btn btn-secondary btn-sm">COMPS CON D.MON</Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>BATTLE PASS</div>
          <h2 style={headingStyle}>Battle Pass revamp: más elección, menos autopilot</h2>
          <NumberedList items={battlePassReads} />
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>RANKED</div>
          <h2 style={headingStyle}>Rank reset, Emerald y primera semana competitiva</h2>
          <div style={cardGridStyle}>
            {rankedReads.map(item => <InfoCard key={item.title} title={item.title} body={item.body} />)}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>MAPAS</div>
          <h2 style={headingStyle}>Busan, Paraíso y Eichenwalde se tienen que reaprender</h2>
          <p style={paragraphStyle}>
            Los reworks son de las novedades más importantes para ranked porque cambian decisiones invisibles: por dónde rotas, dónde se puede aguantar, cuándo merece la pena ceder y qué high ground ya no se juega igual.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
            <Link href="/maps/busan" className="btn btn-secondary btn-sm">BUSAN</Link>
            <Link href="/maps/paraiso" className="btn btn-secondary btn-sm">PARAÍSO</Link>
            <Link href="/maps/eichenwalde" className="btn btn-secondary btn-sm">EICHENWALDE</Link>
            <Link href="/busan-eichenwalde-paraiso-reworks-overwatch" className="btn btn-primary btn-sm">VER REWORKS</Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>CALIDAD DE VIDA</div>
          <h2 style={headingStyle}>Mejoras de feedback en combate</h2>
          <div style={cardGridStyle}>
            {systems.map(item => <InfoCard key={item.title} title={item.title} body={item.body} />)}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>SKINS Y EVENTOS</div>
          <h2 style={headingStyle}>Mythics, player card frames, LE SSERAFIM y bundles</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={cardGridStyle}>
              {cosmetics.map(item => <InfoCard key={item.title} title={item.title} body={item.body} />)}
            </div>
          </div>
          <VisualGrid items={cosmeticVisuals} />
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>CHECKLIST</div>
          <h2 style={headingStyle}>Qué hacer antes de meterte a ranked</h2>
          <TextChecklist items={prepChecklist} />
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>FAQ</div>
          <h2 style={headingStyle}>Preguntas rápidas de Season 4</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {faqs.map(item => (
              <article key={item.question} style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16 }}>
                <h3 style={smallHeadingStyle}>{item.question}</h3>
                <p style={smallCopyStyle}>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function VisualGrid({ items, featured = false }: { items: VisualItem[]; featured?: boolean }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: featured ? 'repeat(auto-fit, minmax(260px, 1fr))' : 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: 14,
    }}>
      {items.map(item => (
        <article key={item.title} style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', overflow: 'hidden' }}>
          <div style={{ position: 'relative', aspectRatio: featured ? '16 / 10' : '4 / 3', background: 'var(--surface)' }}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes={featured ? '(max-width: 768px) 100vw, 360px' : '(max-width: 768px) 100vw, 320px'}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 12, letterSpacing: 1.2, marginBottom: 8 }}>{item.label}</div>
            <h3 style={smallHeadingStyle}>{item.title}</h3>
            <p style={smallCopyStyle}>{item.body}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <article style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16, minHeight: 146 }}>
      <h3 style={smallHeadingStyle}>{title}</h3>
      <p style={smallCopyStyle}>{body}</p>
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
  fontSize: 'clamp(30px, 5vw, 46px)',
  letterSpacing: 1,
  lineHeight: 1,
  margin: '0 0 16px',
} as const

const smallHeadingStyle = {
  fontFamily: 'Bebas Neue, sans-serif',
  color: 'var(--text)',
  fontSize: 23,
  letterSpacing: 0.8,
  margin: '0 0 8px',
} as const

const smallCopyStyle = {
  color: 'var(--text2)',
  fontSize: 13,
  lineHeight: 1.65,
  margin: 0,
} as const

const leadStyle = {
  color: 'var(--text2)',
  fontSize: 16,
  lineHeight: 1.75,
  margin: '0 0 14px',
  maxWidth: 790,
} as const

const paragraphStyle = {
  color: 'var(--text2)',
  fontSize: 15,
  lineHeight: 1.75,
  margin: 0,
} as const

const cardGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
  gap: 12,
} as const
