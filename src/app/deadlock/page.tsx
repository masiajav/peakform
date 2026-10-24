import Link from 'next/link'
import Image from 'next/image'
import PublicNav from '@/components/layout/PublicNav'
import { DEADLOCK_SECTIONS } from '@/lib/games'
import { publishedEditorial } from '@/lib/editorial-store'
import { buildMetadata } from '@/lib/seo'
import { DEADLOCK_OG_IMAGE, deadlockCollection, deadlockRobots } from '@/lib/deadlock-seo'
import JsonLd from '@/components/content/JsonLd'
import DeadlockHeroCard from '@/components/content/DeadlockHeroCard'

export const dynamic = 'force-dynamic'
export const metadata = buildMetadata({
  title: 'Deadlock en español: guías, héroes, counters y builds',
  description: 'Guías de Deadlock en español, habilidades de todos los héroes, counters y builds con código para importar. Aprende a jugar y explora el mapa de la ciudad.',
  path: '/deadlock',
  image: DEADLOCK_OG_IMAGE,
  robots: deadlockRobots(),
})

export default async function Page() {
  const articles = await publishedEditorial('deadlock')
  const heroes = ['abrams', 'haze', 'dynamo', 'infernus', 'lash', 'seven'].flatMap(slug => articles.filter(a => a.kind === 'hero' && a.hero === slug))
  const basics = ['economia-almas', 'fase-de-lineas', 'movimiento-aguante'].flatMap(slug => articles.filter(a => a.kind === 'guide' && a.slug === slug))
  const news = articles.filter(a => a.kind === 'news' || a.kind === 'patch_note').sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).slice(0, 3)
  const city = articles.find(a => a.kind === 'map' && a.mapAtlas)

  return <div className="game-page game-deadlock"><PublicNav />
    <JsonLd data={deadlockCollection('/deadlock', 'Deadlock en español', 'Guías, héroes, builds y mapa de Deadlock.', [...heroes, ...basics, ...news, ...(city ? [city] : [])])} />
    <main className="game-hub">
      <header className="game-hero dl-home-hero">
        <div className="dl-hero-copy"><p className="eyebrow">REPLAID LAB / DEADLOCK</p>
        <h1>Deadlock <br /><em>en español.</em></h1>
        <p className="game-lead">Tu héroe, sus habilidades y las compras que necesitas. Guías para jugar mejor, desde la primera oleada hasta la pelea por el Patrón.</p>
        <form className="game-search dl-home-search" action="/deadlock/heroes" role="search">
          <label htmlFor="home-hero-search">¿Con quién juegas?</label>
          <div><input id="home-hero-search" name="q" placeholder="Busca a Bruma, Haze, Abrams…" /><button className="btn btn-primary" type="submit">Buscar héroe ↗</button></div>
        </form>
        <div className="game-hero-actions">
          <Link href="/deadlock/heroes">Encuentra tu héroe <span aria-hidden="true">↗</span></Link>
          <Link href="/deadlock/guides">Soy nuevo, ¿por dónde empiezo? <span aria-hidden="true">↗</span></Link>
        </div>
        </div>
        <div className="dl-hero-art" aria-hidden="true">
          <span className="dl-art-word">DEADLOCK</span>
          <div className="dl-art-portrait dl-art-back"><Image src="/deadlock/abrams.webp" alt="" fill sizes="(max-width: 760px) 45vw, 270px" priority /></div>
          <div className="dl-art-portrait dl-art-side"><Image src="/deadlock/infernus.webp" alt="" fill sizes="(max-width: 760px) 45vw, 270px" priority /></div>
          <div className="dl-art-portrait dl-art-front"><Image src="/deadlock/haze.webp" alt="" fill sizes="(max-width: 760px) 55vw, 320px" priority /></div>
          <span className="dl-art-caption">La ciudad no se gana a solas.</span>
        </div>
      </header>

      <nav className="dl-section-nav" aria-label="Secciones de Deadlock">{DEADLOCK_SECTIONS.map(section => <Link key={section.slug} href={`/deadlock/${section.slug}`}>{section.label}<span aria-hidden="true">↗</span></Link>)}</nav>

      {heroes.length > 0 && <section className="game-latest dl-roster-feature">
        <p className="eyebrow">ELIGE A TU HÉROE</p>
        <div className="game-section-heading"><h2 className="game-section-title">Aprende a jugar tu main</h2><Link href="/deadlock/heroes">Todos los héroes ↗</Link></div>
        <div className="dl-roster-grid">{heroes.map(a => <DeadlockHeroCard key={a.path} article={a} headingLevel={3} />)}</div>
      </section>}

      {city && <section className="game-latest game-map-feature">
        <div><p className="eyebrow">CONOCE EL TERRENO</p><h2 className="game-section-title">Mucho más que tres líneas</h2><p>Campamentos, tiendas, urna, Midboss y rutas entre plantas. Encuentra cada recurso en el mapa y aprende cuándo salir de la línea para disputarlo.</p><Link className="btn btn-secondary" href={city.path}>Explora el mapa de Deadlock ↗</Link></div>
        {city.image && <Link href={city.path} aria-label="Abrir el mapa de Deadlock"><Image src={city.image} alt="Las tres calles y los cuatro distritos de Deadlock" width={480} height={480} sizes="(max-width: 680px) 90vw, 480px" /></Link>}
      </section>}

      {basics.length > 0 && <section className="game-latest">
        <p className="eyebrow">TUS PRIMERAS PARTIDAS</p>
        <div className="game-section-heading"><h2 className="game-section-title">Empieza por aquí</h2><Link href="/deadlock/guides">Todas las guías ↗</Link></div>
        <div className="game-card-grid dl-basics-grid">{basics.map((a, i) => <Link className="game-content-card" key={a.path} href={a.path}>
          <span className="game-card-number">0{i + 1}</span><h3>{a.title}</h3><p>{a.description}</p><span className="game-card-action">Leer guía ↗</span>
        </Link>)}</div>
      </section>}

      <section className="dl-help-pair" aria-label="Builds y counters">
        <Link href="/deadlock/builds"><span className="eyebrow">¿QUÉ COMPRO?</span><h2>Una build para empezar.<br />Opciones para adaptarla.</h2><p>Copia el código, abre la tienda y entiende qué compras primero y qué puedes cambiar.</p><span className="game-card-action">Busca la build de tu héroe ↗</span></Link>
        <Link href="/deadlock/counters"><span className="eyebrow">¿CÓMO LE FRENO?</span><h2>Conoce al rival.<br />Encuentra su punto débil.</h2><p>Qué habilidades debes esperar, cuándo acercarte y qué objeto puede sacarte del apuro.</p><span className="game-card-action">Consulta los counters ↗</span></Link>
      </section>

      {news.length > 0 && <section className="game-latest">
        <p className="eyebrow">QUÉ HAY DE NUEVO</p>
        <div className="game-section-heading"><h2 className="game-section-title">Noticias y parches</h2><Link href="/deadlock/news">Todas las noticias ↗</Link></div>
        <div className="game-card-grid">{news.map(a => <Link className="game-content-card" key={a.path} href={a.path}>
          {a.image && <div className="game-card-portrait"><Image src={a.image} alt={a.aliases?.[0] ?? a.title} fill sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 360px" /></div>}
          <span className="game-meta">{new Date(a.publishedAt).toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' })}</span><h3>{a.title}</h3><p>{a.description}</p><span className="game-card-action">Leer artículo ↗</span>
        </Link>)}</div>
      </section>}
    </main>
  </div>
}
