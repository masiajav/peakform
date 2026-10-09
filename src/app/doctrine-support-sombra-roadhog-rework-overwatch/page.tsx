import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

const PAGE_PATH = '/doctrine-support-sombra-roadhog-rework-overwatch'
const PAGE_IMAGE = '/news/doctrine-overwatch-blizzcon-2026-roster.webp'
const DOCTRINE_IMAGE = '/heroes/doctrine.png'
const MYTHIC_IMAGE = '/news/blizzcon-2026-mythic-voucher.png'

export const metadata: Metadata = buildMetadata({
  title: 'Overwatch Season 5: Doctrine, Sombra Support y novedades',
  description: 'Season 5 ya disponible: Doctrine, Sombra Support, rework de Roadhog, Grímsvötn, Halloween y Unvaulted Passes. Fechas y cambios para tus partidas.',
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  type: 'article',
})

const quickFacts = [
  {
    title: 'Doctrine es Support',
    body: 'Está disponible desde el 6 de octubre. Mantiene Cetro eterno, Imbuir y los drones, con ajustes de lanzamiento respecto al trial.',
  },
  {
    title: 'Sombra cambia de rol',
    body: 'Ya es Support: cura con Hotfix y Cyberspace. Su antiguo Hack y Virus dejan de ser habilidades del kit normal.',
  },
  {
    title: 'Roadhog recibe rework',
    body: 'El disparo llega en dos ráfagas. Trash Compactor absorbe proyectiles y devuelve un disparo explosivo.',
  },
  {
    title: 'Grímsvötn es Escolta',
    body: 'La nueva carga recorre una prisión islandesa relacionada con Doctrine y Doomfist. No es un mapa de Control ni de Stadium.',
  },
  {
    title: 'Pases recuperados',
    body: 'Unvaulted Passes permite avanzar un pase antiguo junto al actual, con una selección de recompensas que excluye míticas, monedas y prismas.',
  },
]

const doctrineAbilities = [
  {
    title: 'Cetro eterno',
    body: 'Arma de alcance medio que cura aliados y daña enemigos. Con Imbuir dispara un proyectil perforador más grande.',
  },
  {
    title: 'Imbuir',
    body: 'Potencia la siguiente habilidad. La decisión está en reservarlo para el disparo, la movilidad o los drones según lo que pida la pelea.',
  },
  {
    title: 'Impulso velado',
    body: 'Desplaza a Doctrine horizontalmente y reduce el daño que recibe. La versión imbuida permite volar libremente.',
  },
  {
    title: 'Drones vigorizantes',
    body: 'Envía drones a un aliado para curarlo y aumentar su velocidad de ataque. Con Imbuir, Doctrine también recibe el efecto. El bonus de velocidad de ataque del lanzamiento es del 30%, no el 35% del trial.',
  },
  {
    title: 'Liberación',
    body: 'Su definitiva reduce la salud máxima de los enemigos alcanzados y concede exceso de salud a los aliados.',
  },
  {
    title: 'Superviviente',
    body: 'La pasiva de subrol activa la regeneración de salud cuando Doctrine utiliza una habilidad de movimiento.',
  },
]

const doctrinePerks = [
  {
    title: 'Minor · Salvación',
    body: 'Al aplicar Drones vigorizantes, el objetivo recupera 40 de salud antes de que continúe el efecto habitual.',
  },
  {
    title: 'Minor · Succión sanguinaria',
    body: 'Doctrine recupera un 50% del daño infligido con el disparo imbuido de Cetro eterno.',
  },
  {
    title: 'Major · Transfusión',
    body: 'El daño y la curación reducen el cooldown de Imbuir. En el lanzamiento se ha reducido a la mitad la conversión de esa aportación respecto al trial.',
  },
  {
    title: 'Major · El precio de la vida',
    body: 'Reduce en 25 la salud máxima de Doctrine y aumenta un 20% la curación de Cetro eterno.',
  },
]

const faqs = [
  {
    question: '¿Doctrine es Tank, DPS o Support?',
    answer: 'Doctrine es Support. Es el héroe 54 de Overwatch y utiliza Cetro eterno para curar aliados o hacer daño a enemigos a media distancia.',
  },
  {
    question: '¿Cuándo se puede jugar Doctrine?',
    answer: 'Doctrine está disponible desde el 6 de octubre de 2026, cuando comenzó Season 5: A Grim Doctrine. La prueba del 12 al 14 de septiembre fue un trial previo, no la versión de lanzamiento.',
  },
  {
    question: '¿Cuáles son las habilidades de Doctrine?',
    answer: 'Doctrine cuenta con Cetro eterno, Imbuir, Impulso velado y Drones vigorizantes. Su definitiva se llama Liberación y su pasiva de subrol es Superviviente.',
  },
  {
    question: '¿Qué hace la ultimate de Doctrine?',
    answer: 'Liberación lanza un enjambre de drones que reduce la salud máxima de los enemigos y concede exceso de salud a los aliados afectados.',
  },
  {
    question: '¿Qué perks tiene Doctrine?',
    answer: 'Doctrine puede elegir Salvación o Succión sanguinaria como perk menor, y Transfusión o El precio de la vida como perk mayor.',
  },
  {
    question: '¿Sombra pasa a ser Support?',
    answer: 'Sí. Desde el parche del 6 de octubre, Sombra es Support. Hotfix cura a aliados y Cyberspace crea una zona que cura al equipo y debilita al rival.',
  },
  {
    question: '¿Qué cambia en el rework de Roadhog?',
    answer: 'Scrap Gun dispara en dos ráfagas por descarga y Trash Compactor absorbe proyectiles enemigos antes de devolver un disparo explosivo. También hay ajustes de Hook y Take a Breather; no conviene repetir el combo antiguo sin comprobar el nuevo timing.',
  },
  {
    question: '¿Sigue disponible el vale mítico de BlizzCon?',
    answer: 'No. El plazo anunciado para obtenerlo y canjearlo terminó el 5 de octubre de 2026. No lo confundas con las nuevas míticas ni con los Unvaulted Passes de Season 5.',
  },
  {
    question: '¿Hasta cuándo dura el evento de Halloween?',
    answer: 'Mystery Madness: Graveyard Games está anunciado del 6 de octubre al 2 de noviembre de 2026. Shadow Monarch tiene otro calendario: del 6 al 19 de octubre.',
  },
  {
    question: '¿Los Unvaulted Passes incluyen las skins míticas antiguas?',
    answer: 'No. Los pases recuperados excluyen skins míticas de héroe y arma, prismas míticos, Overwatch Coins, boosts de XP y títulos de prestigio. Revisa las recompensas elegibles del pase antes de comprarlo o activarlo.',
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
    headline: 'Overwatch Season 5: Doctrine, Sombra Support y novedades',
    description: 'Season 5 ya disponible: Doctrine, Sombra Support, rework de Roadhog, Grímsvötn, Halloween y Unvaulted Passes. Fechas y cambios para tus partidas.',
    image: [absoluteUrl(PAGE_IMAGE), absoluteUrl(DOCTRINE_IMAGE), absoluteUrl(MYTHIC_IMAGE)],
    url: pageUrl,
    datePublished: '2026-09-12',
    dateModified: '2026-10-09',
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
      { '@type': 'ListItem', position: 2, name: 'Season 5: Doctrine, Sombra y Roadhog', item: pageUrl },
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
          <span>Season 5: A Grim Doctrine</span>
        </div>

        <header style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 0.92fr)', gap: 28, alignItems: 'center', marginBottom: 28 }} className="home-hero-grid">
          <div>
            <div className="eyebrow">SEASON 5 · A GRIM DOCTRINE</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 48, lineHeight: 1.05, letterSpacing: 0, margin: '0 0 18px', overflowWrap: 'break-word' }}>
              Overwatch Season 5: <span style={{ color: 'var(--accent)' }}>Doctrine, Sombra Support</span> y novedades
            </h1>
            <p style={{ color: 'var(--text3)', fontSize: 12, lineHeight: 1.65 }}>
              Por Replaid Lab · Publicado: <time dateTime="2026-09-12">12 de septiembre de 2026</time> · Actualizado: <time dateTime="2026-10-09">9 de octubre de 2026</time>
            </p>
            <p style={{ color: 'var(--text2)', fontSize: 17, lineHeight: 1.72, margin: '0 0 14px' }}>
              Season 5: A Grim Doctrine empezó el 6 de octubre de 2026. Doctrine ya está disponible, Sombra es Support y Roadhog tiene su rework. La temporada también estrena Grímsvötn, un mapa de Escolta, y recupera pases de batalla antiguos con Unvaulted Passes.
            </p>
            <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.72, margin: '0 0 18px' }}>
              Si vuelves al juego, empieza por las herramientas que han cambiado, no por los combos de vídeos antiguos. Más abajo tienes los ajustes de Doctrine, los nuevos kits y las fechas de Halloween y de las colaboraciones. El vale mítico de BlizzCon ya caducó.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/heroes/doctrine" className="btn btn-primary btn-sm">GUÍA DE DOCTRINE</Link>
              <Link href="/roles/support" className="btn btn-secondary btn-sm">APRENDER SUPPORT</Link>
            </div>
          </div>

          <div style={{ position: 'relative', aspectRatio: '1741 / 916', background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <Image
              src={PAGE_IMAGE}
              alt="Doctrine junto a los héroes presentados para Overwatch en BlizzCon 2026"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 520px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </header>

        <section style={sectionStyle}>
          <div className="eyebrow">EN 30 SEGUNDOS</div>
          <h2 style={headingStyle}>Lo que ya está en el juego</h2>
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
                Cetro eterno es un arma de alcance medio que cura aliados y daña enemigos. La pieza que une el kit es Imbuir: potencia la siguiente habilidad y puede convertir el disparo en un proyectil perforador mayor, dar vuelo libre a Impulso velado o hacer que los Drones vigorizantes también beneficien a Doctrine.
              </p>
              <p style={{ margin: 0 }}>
                Sus drones curan y aumentan la velocidad de ataque de un aliado. Liberación, su definitiva, juega a una escala mayor: reduce la salud máxima del equipo rival y concede exceso de salud a los aliados. Es una ultimate pensada para inclinar la pelea, no para lanzarla cuando nadie puede aprovechar la ventaja.
              </p>
              <p style={{ margin: 0 }}>
                El lanzamiento no mantiene todos los valores de septiembre. Antes de repetir una entrada del trial, comprueba qué movilidad conservas para salir y quién puede cubrir tu llegada. La reducción de daño ayuda a recolocarse, pero no convierte a Doctrine en invulnerable.
              </p>
              <Link href="/heroes/doctrine" style={{ color: 'var(--accent)', fontWeight: 700 }}>Ver la guía y el kit confirmado de Doctrine →</Link>
            </div>
          </div>
          <h3 style={{ ...headingStyle, fontSize: 28, marginTop: 24 }}>Kit de Doctrine</h3>
          <div style={cardGridStyle}>
            {doctrineAbilities.map(item => <InfoCard key={item.title} title={item.title} body={item.body} />)}
          </div>
          <h3 style={{ ...headingStyle, fontSize: 28, marginTop: 24 }}>Perks menores y mayores</h3>
          <div style={cardGridStyle}>
            {doctrinePerks.map(item => <InfoCard key={item.title} title={item.title} body={item.body} />)}
          </div>
          <h3 style={{ ...headingStyle, fontSize: 28, marginTop: 24 }}>Qué se ha ajustado desde el trial</h3>
          <p style={paragraphStyle}>
            Impulso velado pasa de 7 a 8 segundos de cooldown y del 50% al 40% de reducción de daño; ya no protege de los críticos. Liberación requiere un 8% más de carga, sus drones actúan más rápido y sus efectos duran menos. No confundas una aplicación más rápida con una duración mayor.
          </p>
          <p style={paragraphStyle}>
            Para tus primeras partidas, reserva una cobertura de llegada antes de usar Imbuir para entrar. Si el enemigo sigue apuntándote al terminar el desplazamiento, el cambio de posición no ha resuelto la amenaza. En la <Link href="/heroes/doctrine" style={{ color: 'var(--accent)' }}>guía de Doctrine</Link> puedes revisar las decisiones de cada versión de Imbuir.
          </p>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow">CAMBIO DE ROL</div>
          <h2 style={headingStyle}>Sombra pasa de DPS a Support</h2>
          <p style={paragraphStyle}>
            Sombra ya ocupa un slot de Support. Hotfix aplica curación a un aliado y también permite hackear botiquines y muchos dispositivos enemigos. Cyberspace lanza un proyectil que crea una zona de curación para aliados y debilitación para enemigos. No es simplemente su kit de DPS con una cura añadida: Hack y Virus se han retirado como habilidades.
          </p>
          <p style={paragraphStyle}>
            Translocator sigue siendo una forma de recolocarse, con invisibilidad breve después del teleport, y EMP sigue castigando al grupo enemigo. Si acompañas un flank, comprueba primero quién está curando al Tank: que puedas llegar a la espalda del rival no significa que debas abandonar al compañero al que estabas ayudando.
          </p>
          <div style={{ background: 'var(--surface2)', borderLeft: '3px solid var(--accent)', padding: 18, color: 'var(--text2)', lineHeight: 1.65 }}>
            <strong style={{ color: 'var(--text)' }}>Para ranked:</strong> revisa el equipo desde los roles actuales. Sombra no reemplaza a Tracer o Genji en uno de los dos puestos de DPS; reemplaza a un Support y cambia cómo se reparte la curación.
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow">REWORK</div>
          <h2 style={headingStyle}>Roadhog también cambia</h2>
          <p style={paragraphStyle}>
            Scrap Gun dispara ahora en dos ráfagas por descarga. La novedad más clara es Trash Compactor: absorbe proyectiles enemigos delante de Roadhog y los convierte en un disparo explosivo. Chain Hook, Take a Breather y Whole Hog siguen formando parte del kit, pero el ritmo de disparo y los ajustes de Hook cambian cómo preparas un remate.
          </p>
          <p style={paragraphStyle}>
            No sigas disparando proyectiles al frente durante Trash Compactor por costumbre. Busca cobertura para la respuesta y mira si puedes mantener presión desde otro ángulo. Como Roadhog, absorber daño no sustituye proteger la retirada de tus Supports: decide dónde vas a usar el disparo y qué paso del mapa quieres disputar.
          </p>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow">MAPA Y EVENTOS</div>
          <h2 style={headingStyle}>Grímsvötn, Halloween y fechas de Season 5</h2>
          <p style={paragraphStyle}>
            Grímsvötn lleva la carga a una prisión islandesa. En tus primeras partidas, localiza desde dónde puedes acompañarla con cobertura y cómo volver a tu equipo tras un lateral. No hace falta elegir una composición definitiva antes de conocer el recorrido: comprueba primero qué posiciones puede sostener vuestro grupo.
          </p>
          <ul style={{ ...paragraphStyle, paddingLeft: 22 }}>
            <li><strong>Mystery Madness: Graveyard Games:</strong> del 6 de octubre al 2 de noviembre. El modo de Halloween añade poderes aleatorios al morir y ofrendas para votar por incorporaciones a su roster.</li>
            <li><strong>Shadow Monarch:</strong> del 6 al 19 de octubre, con skins para Genji, Reaper, Anran, Reinhardt y Lifeweaver.</li>
            <li><strong>Tech Witches:</strong> del 9 al 26 de octubre, con D.Mon, Shion, Juno, Sierra y Jetpack Cat.</li>
            <li><strong>Team Drives:</strong> del 29 de octubre al 1 de noviembre. Completa tus placements antes de participar.</li>
          </ul>
          <p style={paragraphStyle}>
            Las nuevas míticas son Dragon Shaoxia Wuyang y el arma Treblemaker de Lúcio. Son cosméticos, no cambios del kit. Tampoco conviene trasladar los poderes del evento de Halloween a una partida normal: una combinación que funciona allí no demuestra que tengas esas herramientas en ranked.
          </p>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow">PASES DE BATALLA</div>
          <h2 style={headingStyle}>Cómo funcionan los Unvaulted Passes</h2>
          <p style={paragraphStyle}>
            Puedes avanzar un pase recuperado junto al pase actual. Los pases clásicos de las temporadas 1 a 15 vuelven con recompensas elegibles, pero no incluyen monedas, boosts de XP, prismas, títulos de prestigio ni skins míticas de héroe o arma. No los compres esperando recuperar una mítica que dejaste pasar.
          </p>
          <p style={paragraphStyle}>
            Antes de activarlo, mira cuánto progreso conservas y qué recompensa quieres conseguir. El pase de Season 4 de 2026 no está disponible desde este lanzamiento: está previsto para el midseason. Que un pase aparezca bloqueado no significa que hayas perdido tu progreso.
          </p>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow">ANUNCIO PREVIO DE BLIZZCON</div>
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
          <h2 style={headingStyle}>El vale mítico de BlizzCon ya ha caducado</h2>
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
            <li>La promoción se abrió después de la ceremonia de BlizzCon.</li>
            <li>Completar una partida permitía recibir el vale.</li>
            <li>El canje daba acceso a una opción elegible de la tienda mítica.</li>
            <li>El plazo para obtenerlo y canjearlo terminó el 5 de octubre de 2026.</li>
          </ol>
          <p style={{ ...paragraphStyle, marginTop: 16 }}>
            Conservamos este anuncio para quienes lleguen desde vídeos o enlaces de septiembre. La recompensa no sigue disponible por jugar ahora y no forma parte de los nuevos pases recuperados.
          </p>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow">QUÉ HACER AHORA</div>
          <h2 style={headingStyle}>Qué revisar antes de tu primera partida</h2>
          <div style={cardGridStyle}>
            <InfoCard title="Conserva una salida con Doctrine" body="Antes de gastar Imbuir para atacar, mira qué harás si llega un flanker. No cuentes con la protección de Impulso velado como inmunidad." />
            <InfoCard title="Reparte la curación con Sombra" body="Acordad quién sostiene al Tank cuando Sombra toma otro ángulo. Una entrada por detrás no compensa dejar sin ayuda la pelea principal." />
            <InfoCard title="Mira el nuevo timing de Roadhog" body="Prueba las dos ráfagas y Trash Compactor antes de dar por hecho el remate del combo antiguo. Contra él, busca cobertura para el disparo de respuesta." />
            <InfoCard title="Aprende el recorrido de la carga" body="En Grímsvötn, localiza la siguiente cobertura y comprueba si tu Support ve la entrada. No persigas un lateral que te deje sin vuelta al grupo." />
          </div>
        </section>

        <section style={sectionStyle}>
          <div className="eyebrow">PREGUNTAS RÁPIDAS</div>
          <h2 style={headingStyle}>Preguntas sobre Season 5</h2>
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
          <div className="eyebrow">ENLACES RELACIONADOS</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="https://x.com/OWCavalry/status/2098836204599054663" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">GAMEPLAY DEL TRIAL</a>
            <a href="https://news.blizzard.com/en-us/article/24303008/feed-your-hunger-in-reign-of-talon-season-5-a-grim-doctrine" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">VER SEASON 5 EN BLIZZARD</a>
            <a href="https://overwatch.blizzard.com/en-us/news/patch-notes/live/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">NOTAS DEL PARCHE</a>
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
