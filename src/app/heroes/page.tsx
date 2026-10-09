import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import SeoFaq from '@/components/content/SeoFaq'
import PublicNav from '@/components/layout/PublicNav'
import HeroPortraitImage from '@/components/heroes/HeroPortraitImage'
import { ROLE_LABELS } from '@/lib/content'
import { getHeroPillar } from '@/lib/hero-pillars'
import { COUNTER_HEROES, type CounterHero, type CounterRole } from '@/lib/overwatch-counters'
import { getHeroPortrait } from '@/lib/overwatch-hero-portraits'
import { UPCOMING_HERO_SLUGS } from '@/lib/indexing-policy'
import { heroTopicHref, isPublicHeroPageSlug } from '@/lib/topic-links'
import { buildMetadata, absoluteUrl, SITE_NAME } from '@/lib/seo'
import styles from './HeroesIndex.module.css'

export async function generateMetadata(props: { searchParams: Promise<{ role?: string }> }): Promise<Metadata> {
  const searchParams = await props.searchParams
  const metadata = buildMetadata({
    title: 'Héroes de Overwatch por rol: Tank, DPS y Support',
    description: 'Todos los héroes de Overwatch por rol, con imágenes, fichas y guías. Aprende habilidades, consulta matchups y elige un pick que encaje con el mapa y tu equipo.',
    path: '/heroes',
    robots: { index: true, follow: true },
  })
  if (searchParams.role) metadata.robots = { index: false, follow: true }
  return metadata
}

const roleOrder: CounterRole[] = ['tank', 'dps', 'support']
const roleSections = roleOrder.map(role => ({ role, heroes: COUNTER_HEROES.filter(hero => hero.role === role) }))
const heroesFaq = [
  {
    question: '¿Qué héroe debería jugar para subir en ranked?',
    answer: 'Empieza por uno cuyo plan entiendas y añade una alternativa para los mapas que le cuestan. Por ejemplo, si juegas Reinhardt pero no puedes disputar las alturas de Gibraltar, aprender Winston o D.Va te da otra forma de entrar. No necesitas cambiar de pick cada vez que pierdes una pelea.',
  },
  {
    question: '¿Qué diferencia hay entre rol, subrol y estilo de juego?',
    answer: 'Tank, DPS y Support son los tres roles. Los subroles son categorías del juego con una pasiva compartida, como Sharpshooter o Survivor. Dive, poke y brawl describen formas de jugar una composición; no son esos subroles. La movilidad, el alcance y los cooldowns de cada héroe siguen importando aunque comparta una pasiva con otros.',
  },
  {
    question: '¿Cómo sé si necesito cambiar de héroe?',
    answer: 'Mira qué te está impidiendo participar. Si llegas solo a las peleas o gastas la salida para perseguir, primero cambia el timing. Si tu equipo necesita disputar una plataforma y tu pick no tiene una ruta viable para hacerlo, un swap puede resolver una limitación real. El marcador de daño, por sí solo, no cuenta toda la partida.',
  },
  {
    question: '¿Qué peso tiene una tier list al elegir pick?',
    answer: 'Sirve como orientación sobre un parche, no como garantía de victoria. Un héroe que conoces bien puede funcionar mejor que un pick fuerte que todavía no dominas. Antes de copiar una elección, fíjate en el mapa, el alcance de tu equipo y quién puede seguir tu entrada o protegerte cuando te presionan.',
  },
]
const heroIntentLinks = [
  {
    title: 'Héroes nuevos',
    body: 'Doctrine ya está disponible desde el 6 de octubre, con Season 5. Sombra también pasa a Support. Si vuelves después de una pausa, comprueba el kit y el rol antes de elegir; D.Mon sigue alternando entre Beast y piloto.',
    links: [
      { href: '/heroes/doctrine', label: 'Doctrine' },
      { href: '/heroes/dmon', label: 'D.Mon' },
      { href: '/guides?hero=sierra', label: 'Sierra' },
      { href: '/guides', label: 'Guías de héroes' },
    ],
  },
  {
    title: 'Matchups y composiciones',
    body: 'Un counter no te obliga siempre a hacer swap. A veces basta con cambiar de ángulo o esperar a que gaste el cooldown que frena tu entrada.',
    links: [
      { href: '/counters', label: 'Counters' },
      { href: '/team-comps', label: 'Composiciones' },
      { href: '/guides/cuando-cambiar-de-heroe-overwatch', label: 'Cuándo cambiar' },
    ],
  },
  {
    title: 'Mejorar en ranked',
    body: 'Un pool pequeño facilita reconocer qué estás haciendo mal. Revisa la primera muerte de cada pelea y el cooldown que te faltó, en lugar de aprender diez picks a la vez.',
    links: [
      { href: '/guides/como-mejorar-en-overwatch', label: 'Revisar tus partidas' },
      { href: '/roles/tank', label: 'Tank' },
      { href: '/roles/dps', label: 'DPS' },
      { href: '/roles/support', label: 'Support' },
    ],
  },
]

export default function HeroesIndexPage() {
  const listedHeroes = roleSections.flatMap(section => section.heroes)
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Héroes de Overwatch por rol',
    description: 'Catálogo de Tank, DPS y Support con retratos, fichas y guías.',
    url: absoluteUrl('/heroes'),
    dateModified: '2026-10-09',
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: listedHeroes.length,
      itemListElement: listedHeroes.map((hero, index) => ({
        '@type': 'ListItem', position: index + 1, name: hero.name,
        url: absoluteUrl(heroTopicHref(hero.slug)),
      })),
    },
  }

  return (
    <div className={styles.page}>
      <JsonLd data={itemListJsonLd} />
      <PublicNav />
      <main className={styles.main}>
        <header className={styles.header}>
          <div className="eyebrow">HÉROES DE OVERWATCH</div>
          <h1>Todos los héroes,<br /><span>por rol</span></h1>
          <p>Movilidad, alcance y cooldowns: cada héroe tiene peleas que le convienen y otras en las que necesita ayuda. Conocer esas diferencias importa más que copiar un pick de una tier list.</p>
        </header>
        <nav className={styles.roleNav} aria-label="Héroes por rol">
          {roleSections.map(({ role, heroes }) => (
            <Link key={role} href={`#${role}`}>{ROLE_LABELS[role]} <span>{heroes.length}</span></Link>
          ))}
        </nav>
        {roleSections.map(({ role, heroes }) => <RoleSection key={role} role={role} heroes={heroes} />)}

        {UPCOMING_HERO_SLUGS.length > 0 && (
          <section className={styles.relatedSection} aria-labelledby="upcoming-heroes">
            <div className="eyebrow">PRÓXIMAMENTE</div>
            <h2 id="upcoming-heroes">Héroes anunciados</h2>
            <div className={styles.heroGrid}>
              {UPCOMING_HERO_SLUGS.map(slug => {
                const hero = COUNTER_HEROES.find(item => item.slug === slug)
                return (
                  <Link key={slug} href={`/heroes/${slug}`} className={styles.heroLink}>
                    <article className={styles.upcomingCard}>
                      <h3>{hero?.name ?? slug}</h3>
                      <p>Información del anuncio y kit mostrado. El lanzamiento puede incluir cambios.</p>
                    </article>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        <section className={styles.relatedSection} aria-labelledby="choose-hero">
          <div className="eyebrow">ELEGIR PICK</div>
          <h2 id="choose-hero">El héroe es solo una parte de la partida</h2>
          <div className={styles.intentGrid}>
            {heroIntentLinks.map(item => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className={styles.relatedLinks}>
                  {item.links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
                </div>
              </article>
            ))}
          </div>
        </section>
        <SeoFaq items={heroesFaq} title="Preguntas sobre héroes de Overwatch" />
      </main>
    </div>
  )
}

function RoleSection({ role, heroes }: { role: CounterRole; heroes: CounterHero[] }) {
  return (
    <section id={role} className={styles.roleSection} aria-labelledby={`${role}-heading`}>
      <div className={styles.roleHeader}>
        <h2 id={`${role}-heading`}>{ROLE_LABELS[role]}</h2>
        <Link href={`/roles/${role}`}>Aprender {ROLE_LABELS[role]} →</Link>
      </div>
      <p className={styles.roleIntro}>
        {role === 'tank'
          ? 'Reinhardt quiere acercarse con el equipo; Winston y D.Va pueden disputar alturas. Antes de entrar, comprueba desde dónde te van a curar y quién llega contigo.'
          : role === 'dps'
            ? 'Cassidy necesita una línea de tiro; Tracer puede buscar un lateral y volver. El ángulo funciona cuando el rival tiene que responder también al resto de tu equipo.'
            : 'Ana necesita visión del aliado al que quiere ayudar; Kiriko puede reposicionarse con teleport. Curar más no siempre resuelve la pelea: también importan la cobertura y el momento de gastar tus defensas.'}
      </p>
      <div className={styles.heroGrid}>{heroes.map(hero => <HeroCard key={hero.slug} hero={hero} />)}</div>
    </section>
  )
}

function HeroCard({ hero }: { hero: CounterHero }) {
  const portrait = getHeroPortrait(hero.slug)
  const hasPublicPillar = isPublicHeroPageSlug(hero.slug)
  const isTrial = getHeroPillar(hero.slug)?.analysisStatus === 'trial'
  return (
    <Link href={heroTopicHref(hero.slug)} rel={hasPublicPillar ? undefined : 'nofollow'} className={styles.heroLink}>
      <article className={styles.heroCard}>
        <div className={styles.portrait}>
          <HeroPortraitImage
            src={portrait} name={hero.name}
            sizes="(max-width: 600px) 50vw, (max-width: 1160px) 25vw, 176px"
            imageStyle={{ objectFit: 'contain', objectPosition: 'center bottom' }}
            fallbackClassName="hero-portrait-fallback"
          />
          {isTrial && <span className={styles.previewBadge}>PREVIEW</span>}
        </div>
        <div className={styles.cardText}>
          <h3>{hero.name}</h3>
          <p>{hasPublicPillar ? ROLE_LABELS[hero.role] : `${ROLE_LABELS[hero.role]} · guías`}</p>
        </div>
      </article>
    </Link>
  )
}
