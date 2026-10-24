import Link from 'next/link'
import Image from 'next/image'
import PublicNav from '@/components/layout/PublicNav'
import { DEADLOCK_SECTIONS } from '@/lib/games'
import { publishedEditorial } from '@/lib/editorial-store'
import { buildMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'
export const metadata = buildMetadata({
  title: 'Deadlock en español: guías, héroes, counters y builds',
  description: 'Aprende Deadlock con planes de línea, compras explicadas, counters y análisis de los cambios oficiales.',
  path: '/deadlock',
})

export default async function Page() {
  const articles = await publishedEditorial('deadlock')
  const heroes = articles.filter(a => a.kind === 'hero').sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)).slice(0, 6)
  const basics = ['economia-almas', 'fase-de-lineas', 'movimiento-aguante'].flatMap(slug => articles.filter(a => a.kind === 'guide' && a.slug === slug))
  const news = articles.filter(a => a.kind === 'news' || a.kind === 'patch_note').sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).slice(0, 3)

  return <div className="game-page game-deadlock"><PublicNav />
    <main className="game-hub">
      <header className="game-hero">
        <p className="eyebrow">Replaid Lab / Deadlock</p>
        <h1>Gana la línea.<br /><em>Entiende la partida.</em></h1>
        <p className="game-lead">Cada alma cuenta. Aprende cuándo comprar, cómo responder al rival y qué hacer con tu ventaja.</p>
        <div className="game-hero-actions">
          <Link className="btn btn-primary" href="/deadlock/heroes">Encuentra tu héroe ↗</Link>
          <Link className="btn btn-secondary" href="/deadlock/guides">Empieza por los fundamentos</Link>
        </div>
        <div className="game-hero-rule"><span>01 / LÍNEA</span><span>02 / COMPRAS</span><span>03 / OBJETIVOS</span></div>
      </header>

      <section>
        <p className="eyebrow">Tu siguiente decisión</p>
        <h2 className="game-section-title">Aprende con un propósito</h2>
        <div className="game-card-grid">{DEADLOCK_SECTIONS.map((section, i) => <Link className="game-content-card" key={section.slug} href={`/deadlock/${section.slug}`}>
          <span className="game-card-number">0{i + 1}</span><h3>{section.label}</h3><p>{section.description}</p><span className="game-card-action">Explorar ↗</span>
        </Link>)}</div>
      </section>

      {basics.length > 0 && <section className="game-latest">
        <p className="eyebrow">Construye una base</p>
        <div className="game-section-heading"><h2 className="game-section-title">Tres decisiones para empezar</h2><Link href="/deadlock/guides">Todas las guías ↗</Link></div>
        <div className="game-card-grid">{basics.map(a => <Link className="game-content-card" key={a.path} href={a.path}>
          <h3>{a.title}</h3><p>{a.description}</p><span className="game-card-action">Leer guía ↗</span>
        </Link>)}</div>
      </section>}

      {heroes.length > 0 && <section className="game-latest">
        <p className="eyebrow">Explora tus héroes</p>
        <div className="game-section-heading"><h2 className="game-section-title">Conoce tu plan de partida</h2><Link href="/deadlock/heroes">Ver todos los héroes ↗</Link></div>
        <div className="game-card-grid game-featured-heroes">{heroes.map(a => <Link className="game-content-card" key={a.path} href={a.path}>
          {a.image && <div className="game-card-portrait"><Image src={a.image} alt={a.aliases?.[0] ?? a.title} fill sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 360px" /></div>}
          <h3>{a.title}</h3><p>{a.description}</p><span className="game-card-action">Leer guía ↗</span>
        </Link>)}</div>
      </section>}

      {news.length > 0 && <section className="game-latest">
        <p className="eyebrow">La ciudad sigue cambiando</p>
        <div className="game-section-heading"><h2 className="game-section-title">Noticias y parches</h2><Link href="/deadlock/news">Todas las noticias ↗</Link></div>
        <div className="game-card-grid">{news.map(a => <Link className="game-content-card" key={a.path} href={a.path}>
          {a.image && <div className="game-card-portrait"><Image src={a.image} alt={a.aliases?.[0] ?? a.title} fill sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 360px" /></div>}
          <span className="game-meta">{new Date(a.publishedAt).toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' })}</span><h3>{a.title}</h3><p>{a.description}</p><span className="game-card-action">Leer artículo ↗</span>
        </Link>)}</div>
      </section>}
    </main>
  </div>
}
