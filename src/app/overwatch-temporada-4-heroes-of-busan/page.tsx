import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

const PAGE_PATH = '/overwatch-temporada-4-heroes-of-busan'
const PAGE_IMAGE = '/news/overwatch-season-4-heroes-of-busan.png'
const RELEASE_DATE = '11 de agosto de 2026'
const UPDATED_AT = '11 de agosto de 2026'

type VisualItem = {
  title: string
  label: string
  body: string
  src: string
  alt: string
}

export const metadata: Metadata = buildMetadata({
  title: 'Overwatch Season 4 ya disponible: D.Mon, Emerald, skins y reworks',
  description: 'Overwatch Season 4 ya está disponible: D.Mon como nuevo Tank, rango Emerald, nueva UI, balance de lanzamiento, Battle Pass, mythic de Genji por 50 prismas y reworks.',
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  type: 'article',
})

const highlights = [
  {
    title: 'D.Mon ya está como nuevo Tank',
    body: 'D.Mon ya está dentro del juego como nueva Tank de MEKA. Entra con espada, barrera frontal, movilidad horizontal y ciclo de mech, así que no parece una D.Va con otro nombre.',
  },
  {
    title: 'Season 4 ya está lanzada',
    body: 'La temporada ya no es preview: toca probar D.Mon, revisar la UI nueva, mirar el reset de ranked y comprobar cómo se sienten los reworks en partida real.',
  },
  {
    title: 'El Battle Pass se reorganiza',
    body: 'El pase parece menos lineal y más cómodo de leer. La idea es elegir mejor qué recompensa te interesa y usar Hack Tiers si tienes el premium.',
  },
  {
    title: 'Rank reset y Emerald',
    body: 'Hay reset competitivo y aparece Emerald como rango nuevo. Si juegas ranked, esta será seguramente la parte más caótica de la primera semana.',
  },
  {
    title: 'Busan, Paraíso y Eichenwalde',
    body: 'Los tres mapas reciben rework. No hablamos solo de decoración: rutas, coberturas, health packs y high grounds pueden cambiar bastante.',
  },
]

const timeline = [
  {
    date: '11 de agosto',
    title: 'Season 4 ya está disponible',
    body: 'D.Mon ya se puede jugar y arranca el bloque grande de la temporada: evento MEKA, pase nuevo, cambios de ranked, nueva UI, balance y reworks.',
  },
  {
    date: '11-31 de agosto',
    title: 'Shooting Star: My MEKA Mania',
    body: 'Evento centrado en MEKA, con desafíos y recompensas. Es el contenido que más conecta con D.Mon, D.Va y todo el tema de Busan.',
  },
  {
    date: 'Mid-season',
    title: 'Unvaulted Passes',
    body: 'Funcionan como segunda oportunidad para recompensas de pases anteriores. Habrá que mirar qué vuelve exactamente y qué se queda fuera.',
  },
  {
    date: '1-14 de septiembre',
    title: 'World Cup Cheer Rally',
    body: 'Evento ligado a la Overwatch World Cup, con apoyo a regiones, recompensas y cosméticos pensados para mover comunidad.',
  },
  {
    date: '4-6 de septiembre',
    title: 'Team Drives',
    body: 'Evento corto para jugar en grupo. Si te toca buena squad, aquí tiene sentido quedarte y encadenar partidas en vez de volver solo a la queue.',
  },
]

const battlePassReads = [
  'El Battle Pass sigue siendo el pase de siempre, pero ahora se entiende mejor de un vistazo. Menos sensación de pasillo y más control sobre qué estás intentando sacar.',
  'Los Hack Tiers permiten cambiar ciertas recompensas por otras skins dentro de las opciones del pase. No es barra libre: va ligado al Battle Pass premium y habrá que mirar bien las condiciones.',
  'Los Unvaulted Passes llegan a mitad de temporada para recuperar recompensas antiguas seleccionadas. Importante: no conviene meter en el mismo saco skins, moneda, prismas, títulos, mythics y armas míticas.',
  'Si juegas casual, esto te da más margen para elegir. Si miras cada euro, lo inteligente es esperar a ver qué se puede cambiar antes de comprar por puro hype.',
]

const rankedReads = [
  {
    title: 'Rank reset',
    body: 'El reset siempre ensucia las primeras partidas. Habrá gente recolocándose, picks raros y muchos jugadores probando D.Mon sin tener todavía timings claros.',
  },
  {
    title: 'Nuevo rango Emerald',
    body: 'Emerald entra como nuevo escalón competitivo. Hasta que se estabilice la ladder, mejor medir progreso por decisiones buenas y no obsesionarse con el icono del primer día.',
  },
  {
    title: 'D.Mon en ranked',
    body: 'Va a tener muchísimo pickrate simplemente por ser Tank nuevo. Aprende a jugar con ella, pero también contra ella: anti-heal, Discord, beams, verticalidad y control de recursos van a importar.',
  },
  {
    title: 'Mapas reworkeados',
    body: 'Busan, Paraíso y Eichenwalde van a castigar el autopilot. Entra en custom, mira rutas, health packs y high grounds, y no juegues ranked como si siguiera todo igual.',
  },
]

const launchBalanceReads = [
  {
    title: 'Subrol Flanker',
    body: 'El extra de curación recibido de los Health Packs baja de 75 a 50. En la práctica, los flankers tendrán algo menos de margen para resetear solos después de tradear daño.',
  },
  {
    title: 'D.Mon añadida al roster',
    body: 'D.Mon ya figura como nueva Tank. La primera semana debería girar mucho alrededor de entender su engage, cuánto aguanta sin sobreinvertir recursos y qué mapas le favorecen.',
  },
  {
    title: 'Domina recibe ajuste defensivo',
    body: 'Panopticon sube de 450 a 500 de vida de barrera. No cambia su identidad, pero sí puede hacer que aguante un poco mejor ventanas de presión.',
  },
  {
    title: 'Más cambios de héroes',
    body: 'También hay más ajustes de balance en la actualización de lanzamiento. No vamos a inventar valores si una nota llega cortada: esta página se irá afinando con patch notes completas y partidas reales.',
  },
]

const systems = [
  {
    title: 'Team status indicator',
    body: 'La interfaz enseña mejor cuánta gente queda viva y quién está esperando respawn. Parece pequeño, pero ayuda muchísimo a decidir si una pelea se sigue o se corta.',
  },
  {
    title: 'Nueva UI',
    body: 'La temporada estrena cambios visuales de interfaz. Lo importante no es que se vea distinta, sino que ayude a leer mejor peleas, información del equipo y momentos de reset.',
  },
  {
    title: 'Respawn timers',
    body: 'Ver los respawns de tus aliados debería reducir bastante el clásico "entro porque sí". Si la gente lo usa bien, los reagrupes en ranked pueden mejorar mucho.',
  },
  {
    title: 'Multikill y healing feedback',
    body: 'Hay más feedback visual para multikills y curación. No cambia el balance, pero sí hace más fácil leer rápido qué está pasando en mitad del caos.',
  },
  {
    title: 'Activity feed',
    body: 'Vuelve una lectura más clara de las eliminaciones y asistencias. Sirve para separar impacto real de simplemente haber tocado una kill que ya estaba hecha.',
  },
]

const cosmetics = [
  {
    title: 'Mythic de Genji',
    body: 'La mythic Koi of Duality Genji ya está disponible in-game por 50 Mythic Prisms. Visualmente entra fuerte y va a mover bastantes búsquedas.',
  },
  {
    title: 'Arma mítica de Sojourn',
    body: 'Sojourn recibe arma mítica con acabado de cristal y pinta de cosmético premium. Si juegas hitscan, probablemente sea de lo primero que vas a mirar.',
  },
  {
    title: 'LE SSERAFIM vuelve',
    body: 'La colaboración vuelve al foco. No es contenido competitivo, pero sí de los bloques que más conversación generan fuera de ranked.',
  },
  {
    title: 'New player card frames',
    body: 'Los nuevos marcos de player card hacen que el perfil luzca bastante más. Especialmente si quieres enseñar rango, héroes favoritos o progresión.',
  },
  {
    title: 'Bundles de tienda',
    body: 'Young Gods, Fleece and Fangs y otros packs van por tienda. Mejor mirar precio, héroes incluidos y uso real antes de comprar por impulso.',
  },
]

const primaryVisuals: VisualItem[] = [
  {
    title: 'D.Mon y el resumen de temporada',
    label: 'Season 4',
    body: 'Busan, MEKA y D.Mon son el gancho principal. Si quieres entender el parche rápido, empieza por aquí.',
    src: PAGE_IMAGE,
    alt: 'Resumen visual de Overwatch Season 4 Heroes of Busan con D.Mon, reworks, Emerald y Battle Pass',
  },
  {
    title: 'Battle Pass skins',
    label: 'Battle Pass',
    body: 'El pase trae una buena tanda de skins, con D.Mon como imagen fuerte y varios héroes recibiendo cosméticos nuevos.',
    src: '/news/overwatch-season-4-battle-pass-skins.png',
    alt: 'Skins del Battle Pass de Overwatch Season 4 Heroes of Busan',
  },
  {
    title: 'Nuevo rango Emerald',
    label: 'Ranked',
    body: 'Emerald llega justo con reset, así que el icono importa menos que ver cómo se recoloca la ladder durante los primeros días.',
    src: '/news/overwatch-season-4-emerald-rank.png',
    alt: 'Nuevo rango Emerald de Overwatch Season 4',
  },
]

const cosmeticVisuals: VisualItem[] = [
  {
    title: 'Mythic de Genji',
    label: 'Mythic skin',
    body: 'Koi of Duality Genji ya está disponible por 50 Mythic Prisms. Es una mythic muy reconocible, con contraste y pinta de skin perfecta para clips, thumbnails y búsquedas.',
    src: '/news/overwatch-season-4-genji-mythic.png',
    alt: 'Skin mítica de Genji en Overwatch Season 4',
  },
  {
    title: 'Arma mítica de Sojourn',
    label: 'Mythic weapon',
    body: 'La weapon skin de Sojourn apunta a cosmético premium claro: se nota por el acabado, el brillo y el foco que le están dando.',
    src: '/news/overwatch-season-4-sojourn-mythic-weapon.png',
    alt: 'Arma mítica de Sojourn en Overwatch Season 4',
  },
  {
    title: 'LE SSERAFIM',
    label: 'Colaboración',
    body: 'La colaboración vuelve al calendario y seguramente hará ruido incluso entre gente que no sigue tanto el competitivo.',
    src: '/news/overwatch-season-4-le-sserafim.png',
    alt: 'Colaboración LE SSERAFIM en Overwatch Season 4',
  },
  {
    title: 'New player card frames',
    label: 'Perfil',
    body: 'Los nuevos marcos de player card dan más presencia al perfil. Es una mejora pequeña, pero muy visible si cuidas tu identidad in-game.',
    src: '/news/overwatch-season-4-player-card-frames.png',
    alt: 'Nuevos player card frames de Overwatch Season 4',
  },
  {
    title: 'Young Gods',
    label: 'Shop bundle',
    body: 'Bundle de tienda con estética mitológica. Tiene más sentido si juegas varios héroes del pack, no solo por una skin suelta.',
    src: '/news/overwatch-season-4-young-gods.png',
    alt: 'Bundle Young Gods de Overwatch Season 4',
  },
  {
    title: 'Fleece and Fangs',
    label: 'Shop bundle',
    body: 'Otro bundle de tienda con estilo muy distinto al pase. Visualmente entra bien, pero conviene separar hype de valor real.',
    src: '/news/overwatch-season-4-fleece-and-fangs.png',
    alt: 'Bundle Fleece and Fangs de Overwatch Season 4',
  },
]

const prepChecklist = [
  'Guarda esta página como hub de Season 4 y empieza por D.Mon si quieres jugar Tank esta semana.',
  'Antes de ranked, revisa Busan, Paraíso y Eichenwalde en custom para reaprender rutas.',
  'No juzgues Emerald por el primer día: con reset va a haber partidas raras, sí o sí.',
  'Si compras Battle Pass premium, mira antes cómo funcionan los Hack Tiers y qué skins puedes cambiar.',
  'Durante Team Drives, quédate con gente con la que hayas tenido buena partida en vez de spamear queue solo por recompensa.',
  'Si vas a probar D.Mon, apunta qué te frena más: anti-heal, Discord, beams, verticalidad, control o falta de follow-up.',
]

const faqs = [
  {
    question: '¿Cuándo sale Overwatch Season 4: Heroes of Busan?',
    answer: `Overwatch Season 4: Heroes of Busan ya está disponible desde el ${RELEASE_DATE}. Llega con D.Mon, evento MEKA, reset competitivo, rango Emerald, nueva UI, reworks de mapas y cambios importantes en el Battle Pass.`,
  },
  {
    question: '¿D.Mon es Tank, DPS o Support?',
    answer: 'D.Mon llega como Tank. Su kit mezcla espada, barrera frontal, movilidad horizontal, Surging Strike, Limit Break y ciclo de mech.',
  },
  {
    question: '¿Qué mapas cambian en Season 4?',
    answer: 'Los reworks principales son Busan, Paraíso y Eichenwalde. Antes de entrar a ranked conviene mirar rutas, coberturas, health packs y high grounds.',
  },
  {
    question: '¿Qué es Emerald en Overwatch?',
    answer: 'Emerald es el nuevo rango competitivo de esta temporada. La clave será ver cómo queda la distribución real después del reset.',
  },
  {
    question: '¿Qué cambia en el Battle Pass?',
    answer: 'El Battle Pass se reorganiza con tracks más claros, más control sobre recompensas y Hack Tiers para cambiar ciertas skins en el pase premium.',
  },
  {
    question: '¿Cuánto cuesta la mythic de Genji?',
    answer: 'La mythic Koi of Duality Genji aparece disponible in-game por 50 Mythic Prisms.',
  },
  {
    question: '¿Vuelve LE SSERAFIM a Overwatch?',
    answer: 'Sí, la temporada incluye una nueva colaboración con LE SSERAFIM. Tocará revisar tienda, fechas y bundles cuando el contenido esté disponible.',
  },
]

export default function SeasonFourPage() {
  const pageUrl = absoluteUrl(PAGE_PATH)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'Overwatch Season 4 ya disponible: D.Mon, Emerald, skins y reworks',
    description: 'Overwatch Season 4 ya está disponible: D.Mon como nuevo Tank, rango Emerald, nueva UI, balance de lanzamiento, Battle Pass, mythic de Genji por 50 prismas y reworks.',
    image: [
      absoluteUrl(PAGE_IMAGE),
      absoluteUrl('/news/overwatch-season-4-genji-mythic.png'),
      absoluteUrl('/news/overwatch-season-4-battle-pass-skins.png'),
      absoluteUrl('/news/overwatch-season-4-player-card-frames.png'),
      absoluteUrl('/news/overwatch-season-4-emerald-rank.png'),
    ],
    url: pageUrl,
    datePublished: '2026-08-10',
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
            <div className="eyebrow">TEMPORADA YA DISPONIBLE · ACTUALIZADO {UPDATED_AT.toUpperCase()}</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(44px, 8vw, 84px)', letterSpacing: 1, lineHeight: 0.94, margin: '0 0 16px' }}>
              OVERWATCH SEASON 4: <br />
              <span style={{ color: 'var(--accent)' }}>HEROES OF BUSAN</span>
            </h1>
            <p style={leadStyle}>
              Season 4 ya está lanzada y viene con bastante más que skins. D.Mon entra como nuevo Tank de MEKA, Busan, Paraíso y Eichenwalde reciben rework, ranked empieza con reset y Emerald se suma como rango nuevo. Además hay nueva UI, balance de lanzamiento, cambios en el Battle Pass, Team Drives, World Cup Cheer Rally, player card frames, mythics y colaboración con LE SSERAFIM.
            </p>
            <p style={leadStyle}>
              La lectura para ranked es bastante clara: D.Mon puede mover el meta de Tank, los mapas no se van a jugar exactamente igual y la primera semana del reset va a tener partidas raras. Mejor entrar con calma, probar cosas y separar sensaciones de partida real de tier lists imaginarias.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
              <Link href="/heroes/dmon" className="btn btn-primary btn-sm">VER D.MON</Link>
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
              <MetaPill label="Estado" value="Disponible ahora" />
              <MetaPill label="Nuevo héroe" value="D.Mon · Tank" />
              <MetaPill label="Ranked" value="Reset + Emerald" />
              <MetaPill label="Mapas" value="Busan, Paraíso, Eichenwalde" />
            </div>
          </aside>
        </header>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>RESUMEN RÁPIDO</div>
          <h2 style={headingStyle}>Qué trae la nueva temporada de Overwatch</h2>
          <div style={cardGridStyle}>
            {highlights.map(item => <InfoCard key={item.title} title={item.title} body={item.body} />)}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>VISTAZO VISUAL</div>
          <h2 style={headingStyle}>Las novedades que más van a sonar</h2>
          <p style={{ ...paragraphStyle, marginBottom: 16 }}>
            Si quieres quedarte con la foto grande: D.Mon marca el tema de temporada, el Battle Pass viene cargado de cosméticos y Emerald va a concentrar mucho ruido durante el reset.
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
          <h2 style={headingStyle}>D.Mon es mucho más que &quot;otra MEKA&quot;</h2>
          <p style={paragraphStyle}>
            D.Mon llega como Tank y no parece una copia de D.Va. Comparte escuadrón MEKA, pero juega otra fantasía: sword + shield, frontline, movilidad horizontal y una ultimate pensada para entrar, forzar recursos y que el equipo remate.
          </p>
          <p style={{ ...paragraphStyle, marginTop: 12 }}>
            Si juegas Tank, la pregunta útil no es solo &quot;¿está fuerte?&quot;. La pregunta es dónde puede crear espacio sin regalarse. Si juegas contra ella, empieza por anti-heal, Discord, beams, control y verticalidad.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
            <Link href="/dmon-nuevo-heroe-tank-overwatch" className="btn btn-primary btn-sm">TODO SOBRE D.MON</Link>
            <Link href="/counters/dmon" className="btn btn-secondary btn-sm">COUNTERS DE D.MON</Link>
            <Link href="/team-comps/dmon" className="btn btn-secondary btn-sm">COMPS CON D.MON</Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>BATTLE PASS</div>
          <h2 style={headingStyle}>Battle Pass: más elección y menos autopilot</h2>
          <NumberedList items={battlePassReads} />
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>RANKED</div>
          <h2 style={headingStyle}>Rank reset, Emerald y una primera semana movida</h2>
          <div style={cardGridStyle}>
            {rankedReads.map(item => <InfoCard key={item.title} title={item.title} body={item.body} />)}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>BALANCE DE LANZAMIENTO</div>
          <h2 style={headingStyle}>Primeros ajustes que conviene tener en mente</h2>
          <div style={cardGridStyle}>
            {launchBalanceReads.map(item => <InfoCard key={item.title} title={item.title} body={item.body} />)}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>MAPAS</div>
          <h2 style={headingStyle}>Busan, Paraíso y Eichenwalde ya no se juegan igual</h2>
          <p style={paragraphStyle}>
            Los reworks importan mucho para ranked porque cambian decisiones que parecen pequeñas: por dónde rotas, dónde puedes aguantar, cuándo toca ceder espacio y qué high ground deja de ser gratis.
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
          <h2 style={headingStyle}>Mythics, player card frames, LE SSERAFIM y tienda</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={cardGridStyle}>
              {cosmetics.map(item => <InfoCard key={item.title} title={item.title} body={item.body} />)}
            </div>
          </div>
          <VisualGrid items={cosmeticVisuals} />
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>CHECKLIST</div>
          <h2 style={headingStyle}>Checklist antes de meterte a ranked</h2>
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
