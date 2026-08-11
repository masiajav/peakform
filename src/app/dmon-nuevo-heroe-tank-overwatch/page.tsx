import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

const PAGE_PATH = '/dmon-nuevo-heroe-tank-overwatch'
const PAGE_IMAGE = '/heroes/dmon.png'
const UPDATED_AT = '11 de agosto de 2026'

export const metadata: Metadata = buildMetadata({
  title: 'D.Mon en Overwatch Season 4: gameplay, habilidades, perks y counters',
  description: 'D.Mon ya está disponible en Overwatch Season 4 como Tank melee de MEKA: gameplay, Stalwart, Plasma Saber, Power Barrier, Propulsors, Limit Break y counters.',
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  type: 'article',
})

const quickSummary = [
  {
    title: 'D.Mon es Tank',
    body: 'La nueva heroína ya está disponible como Tank melee. No es una D.Va 2.0: su identidad va más por sword + shield, frontline, barrera y presión cercana.',
  },
  {
    title: 'Disponible desde el 11 de agosto',
    body: 'D.Mon llegó con Season 4: Heroes of Busan el 11 de agosto de 2026. Ahora toca probarla en partida real y separar hype de rendimiento consistente.',
  },
  {
    title: 'Forma parte de MEKA',
    body: 'D.Mon, o Yuna Lee, pertenece al escuadrón MEKA, el grupo de pilotos de Busan conectado directamente con D.Va y la defensa frente a los Gwishin.',
  },
  {
    title: 'Ya conocemos el kit base',
    body: 'D.Mon trae Plasma Saber, Portable Fusion Repeater, Power Barrier, Propulsors, Fusion Repeater, Surging Strike, Limit Break, Eject y Call Mech.',
  },
  {
    title: 'Verticalidad como respuesta',
    body: 'Su movilidad fuerte es horizontal y por recurso. Si el rival juega high ground, flyers o rangos largos, D.Mon tendrá que apoyarse más en rutas y equipo.',
  },
]

const designReads = [
  {
    title: 'No juega como D.Va',
    body: 'D.Va es Matrix, peel, high ground y dive. D.Mon comparte MEKA y el ciclo de mech, pero su plan está más cerca de ocupar espacio con espada, barrera y presión frontal.',
  },
  {
    title: 'Melee Tank con movilidad medida',
    body: 'Propulsors no pinta como vuelo libre. Es una movilidad horizontal para entrar, corregir ángulo o salir si todavía queda combustible. La gestión de ese recurso será clave.',
  },
  {
    title: 'Verticalidad como castigo',
    body: 'Si Echo, Pharah, Widowmaker o un DPS en altura juegan gratis, D.Mon puede acabar mirando hacia arriba en vez de mandar en la pelea. Esa será una prueba real desde el día uno.',
  },
  {
    title: 'Stalwart y frontline',
    body: 'El subrol Stalwart encaja con una Tank que quiere aguantar desplazamientos y ralentizaciones mejor que otros héroes. Eso no la hace inmortal: solo reduce parte del castigo al entrar.',
  },
]

const kitHighlights = [
  {
    title: 'Plasma Saber + Power Barrier',
    body: 'La espada rápida y la barrera frontal apuntan a una Tank que quiere ganar espacio de cara, pero sin caminar gratis por main. Si entra bien, obliga al rival a retroceder o gastar recursos.',
  },
  {
    title: 'Propulsors + Surging Strike',
    body: 'Los propulsores le dan movimiento horizontal y Surging Strike convierte la barrera desplegada en una entrada que daña y empuja. No parece una herramienta para vivir en el aire, sino para romper esquinas y sacar gente de cobertura.',
  },
  {
    title: 'Fusion Repeater',
    body: 'Tiene una ametralladora pesada y una activación de disparo rápido. Eso debería darle algo que hacer cuando no puede seguir pegada con Plasma Saber o cuando necesita rematar a media distancia.',
  },
  {
    title: 'Limit Break',
    body: 'La ultimate lanza un corte amplio, da sobrevida a D.Mon y amplifica el daño recibido por los enemigos golpeados. Más que una ultimate de highlight, parece una herramienta para abrir pelea con follow-up.',
  },
]

const perkHighlights = [
  {
    title: 'Minor: Beast Within',
    body: 'Los golpes de Plasma Saber curan Power Barrier por 40. Refuerza el loop de pegar cerca para mantener la barrera viva.',
  },
  {
    title: 'Minor: MEKA Mobility',
    body: 'Mientras mantiene Power Shield, Propulsors consume un 30% menos de combustible. Esto puede hacer que sus rotaciones sean menos castigables.',
  },
  {
    title: 'Major: Overstrike',
    body: 'Surging Strike gana 150% de lifesteal. Si el engage conecta, puede convertir una entrada agresiva en sustain real.',
  },
  {
    title: 'Major: Focused Fusion',
    body: 'Fusion Repeater dispara más fuerte, sin dispersión y más lento. Es la opción que apunta a precisión y presión de media distancia.',
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
  'Con Plasma Saber, Power Barrier y Surging Strike, lo primero será probarla en mapas con esquinas, rutas cortas y peleas de brawl. Ahí es donde una Tank de presencia frontal suele sentirse más natural.',
  'No conviene asumir que será una segunda D.Va. Compartir MEKA no significa compartir función: D.Va vive mucho de movilidad vertical, Matrix y peel; D.Mon parece apuntar a otra presión, más de sword + shield.',
  'Los primeros counters a probar deberían ser respuestas anti-tank bastante claras: Zarya, Symmetra, Reaper, Ana, Zenyatta, Sombra, Pharah y Echo. No porque sean sentencia, sino porque castigan recursos, beams, anti-heal, Discord, entradas lineales y verticalidad.',
  'El punto más importante será su salida. Propulsors le da movimiento horizontal, pero el verdadero test será qué pasa cuando el rival guarda anti-heal, Discord, hack o control para cuando se queda sin combustible.',
  'En 6v6 puede cambiar mucho. Con un segundo Tank, D.Mon podría permitirse jugar más agresiva o más de frontline compartida, pero eso dependerá de su movilidad y de cuánto necesite supports detrás.',
]

const firstVodChecklist = [
  '¿Has creado espacio real o solo has perseguido una kill lejos de tu equipo?',
  '¿Tu equipo podía seguir tu engage o entraste antes de que la pelea estuviera lista?',
  '¿Qué cooldown rival te frenó más: anti-heal, Discord, hack, beam, stun o burst?',
  '¿Te castigaron desde high ground o desde el aire sin que tu equipo pudiera responder?',
  '¿Has usado Beast para aguantar una ventana importante o para cruzar main sin plan?',
  '¿En qué mapas te sentiste cómodo y en cuáles necesitabas demasiada ayuda para llegar?',
]

const faqs = [
  {
    question: '¿D.Mon es Tank, DPS o Support?',
    answer: 'D.Mon llega a Overwatch como Tank. Su kit gira alrededor de Power Barrier, Plasma Saber, Propulsors y Surging Strike, así que su valor estará en crear espacio y marcar el ritmo de la pelea.',
  },
  {
    question: '¿Cuándo sale D.Mon en Overwatch?',
    answer: 'D.Mon ya está disponible desde el 11 de agosto de 2026 con Season 4: Heroes of Busan. Lo útil ahora es probarla en ranked con calma y revisar qué counters funcionan de verdad.',
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
    question: '¿D.Mon es una D.Va 2.0?',
    answer: 'No. Comparten MEKA y el ciclo de mech, pero D.Va juega más a Matrix, dive, high ground y peel. D.Mon va más hacia melee, barrera, movimiento horizontal y frontline.',
  },
  {
    question: '¿Se conocen sus habilidades?',
    answer: 'Sí. Su kit mostrado incluye Plasma Saber, Portable Fusion Repeater, Power Barrier, Propulsors, Fusion Repeater, Surging Strike, Limit Break, Call Mech y Eject!',
  },
  {
    question: '¿Qué hace la ultimate de D.Mon?',
    answer: 'Limit Break lanza un corte amplio que da sobrevida a D.Mon y aumenta el daño recibido por los enemigos alcanzados. De salida parece una ultimate para iniciar peleas y marcar objetivos.',
  },
  {
    question: '¿Qué perks tiene D.Mon?',
    answer: 'Los perks mostrados son Beast Within, MEKA Mobility, Overstrike y Focused Fusion. Mejoran barrera, movilidad, lifesteal y precisión del Fusion Repeater.',
  },
  {
    question: '¿Qué héroes pueden molestar a D.Mon?',
    answer: 'Verticalidad y rango largo parecen muy importantes: Echo, Pharah, Widowmaker o DPS en high ground pueden forzarla a jugar fuera de su zona cómoda. Además, Zarya, Symmetra, Ana, Zenyatta y Sombra castigan recursos y engages.',
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
    headline: 'D.Mon en Overwatch Season 4: gameplay, habilidades, perks y counters',
    description: 'D.Mon ya está disponible en Overwatch Season 4 como Tank melee de MEKA: gameplay, Stalwart, Plasma Saber, Power Barrier, Propulsors, Limit Break y counters.',
    image: [absoluteUrl(PAGE_IMAGE)],
    url: pageUrl,
    datePublished: '2026-08-06',
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
            <div className="eyebrow">NUEVO HÉROE · TANK · YA DISPONIBLE · {UPDATED_AT.toUpperCase()}</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 8vw, 82px)', letterSpacing: 1, lineHeight: 0.95, margin: '0 0 16px' }}>
              D.MON LLEGA A OVERWATCH COMO <span style={{ color: 'var(--accent)' }}>NUEVO TANK</span> DE MEKA
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.75, margin: '0 0 18px', maxWidth: 780 }}>
              D.Mon deja de ser solo un nombre dentro del lore de MEKA y ya ocupa sitio propio en Overwatch. Blizzard la presenta como nueva Tank, conectada con D.Va, Busan y el escuadrón de pilotos que protege Corea frente a las amenazas Gwishin. También la verás buscada como DMon o Yuna Lee.
            </p>
            <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.75, margin: '0 0 18px', maxWidth: 780 }}>
              La parte importante para ranked es esta: ya está disponible, es Tank y su identidad de gameplay va bastante clara. D.Mon no está pensada como una D.Va 2.0: Plasma Saber, Power Barrier, Propulsors y Surging Strike apuntan a una frontline melee con movilidad horizontal, barrera y presión de corto rango.
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
              <MetaPill label="Subrol" value="Stalwart" />
            </div>
          </aside>
        </header>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>RESUMEN RÁPIDO</div>
          <h2 style={headingStyle}>D.Mon en 30 segundos: rol, kit y por qué importa</h2>
          <div style={cardGridStyle}>
            {quickSummary.map(point => (
              <InfoCard key={point.title} title={point.title} body={point.body} />
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>LECTURA DE DISEÑO</div>
          <h2 style={headingStyle}>D.Mon no es una D.Va 2.0: así deberías entenderla</h2>
          <div style={cardGridStyle}>
            {designReads.map(point => (
              <InfoCard key={point.title} title={point.title} body={point.body} />
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>KIT CONFIRMADO</div>
          <h2 style={headingStyle}>Habilidades de D.Mon en Overwatch</h2>
          <div style={{ position: 'relative', aspectRatio: '16 / 9', background: 'var(--surface2)', border: '1px solid var(--border2)', marginBottom: 16, overflow: 'hidden' }}>
            <Image
              src="/heroes/dmon-ability-kit.png"
              alt="Habilidades, armas, ultimate y perks de D.Mon en Overwatch"
              fill
              sizes="(max-width: 768px) 100vw, 1120px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div style={cardGridStyle}>
            {kitHighlights.map(point => (
              <InfoCard key={point.title} title={point.title} body={point.body} />
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>PERKS</div>
          <h2 style={headingStyle}>Perks de D.Mon: qué cambia en partida</h2>
          <div style={cardGridStyle}>
            {perkHighlights.map(point => (
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
            {['Zarya', 'Symmetra', 'Pharah', 'Echo', 'Ana', 'Zenyatta', 'Sombra', 'Mei'].map(hero => (
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
            Vamos a seguir afinando la ficha con partidas reales, matchups y datos de ranked. De momento, lo útil es preparar el rol de Tank, entender que D.Mon no juega como D.Va y tener a mano los reworks de mapas porque Busan también vuelve a estar en el centro.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
            <Link href="/overwatch-temporada-4-heroes-of-busan" className="btn btn-primary btn-sm">TODO SOBRE SEASON 4</Link>
            <Link href="/heroes/dmon" className="btn btn-secondary btn-sm">GUÍA DE D.MON EN OVERWATCH</Link>
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
