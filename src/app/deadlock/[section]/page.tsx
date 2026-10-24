import catalog from '@/lib/deadlock-catalog.json'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import PublicNav from '@/components/layout/PublicNav'
import { DEADLOCK_SECTIONS } from '@/lib/games'
import { SECTION_KIND } from '@/lib/editorial-record'
import { publishedEditorial } from '@/lib/editorial-store'
import { buildMetadata } from '@/lib/seo'
import { DEADLOCK_INDEX_COPY, DEADLOCK_OG_IMAGE, deadlockBreadcrumbs, deadlockCollection, deadlockHeroLabel, deadlockRobots } from '@/lib/deadlock-seo'
import JsonLd from '@/components/content/JsonLd'
import DeadlockHeroCard from '@/components/content/DeadlockHeroCard'

export const dynamic = 'force-dynamic'
type PageProps = {
  params: Promise<{ section: string }>
  searchParams: Promise<{ q?: string | string[] }>
}
const normalize = (text: string) => text.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export async function generateMetadata({ params, searchParams }: PageProps) {
  const [{ section }, search] = await Promise.all([params, searchParams])
  const item = DEADLOCK_SECTIONS.find(s => s.slug === section)
  const copy = DEADLOCK_INDEX_COPY[section as keyof typeof DEADLOCK_INDEX_COPY]
  return item && copy ? buildMetadata({ title: copy.title, description: copy.description, path: `/deadlock/${item.slug}`, image: DEADLOCK_OG_IMAGE,
    robots: deadlockRobots(search.q === undefined),
  }) : {}
}

export default async function Page({ params, searchParams }: PageProps) {
  const [{ section }, { q: rawQuery }] = await Promise.all([params, searchParams])
  const q = (Array.isArray(rawQuery) ? rawQuery[0] : rawQuery) ?? ''
  const item = DEADLOCK_SECTIONS.find(s => s.slug === section)
  if (!item) notFound()
  const copy = DEADLOCK_INDEX_COPY[item.slug]
  const query = normalize(q)
  const all = (await publishedEditorial('deadlock')).filter(a => a.kind === SECTION_KIND[section])
  const publishedPaths = new Set(all.map(a => a.path))
  const articles = all.filter(a => normalize([a.title, a.description, ...(a.aliases ?? [])].join(' ')).includes(query))
    .sort((a, b) => ['news', 'patch-notes'].includes(section) ? Date.parse(b.publishedAt) - Date.parse(a.publishedAt) : (deadlockHeroLabel(a.hero) || a.title).localeCompare(deadlockHeroLabel(b.hero) || b.title, 'es'))
  const otherHeroes = section === 'heroes' ? catalog.filter(h => !publishedPaths.has(`/deadlock/heroes/${h.slug}`) && normalize(h.aliases.join(' ')).includes(query)) : []

  return <div className="game-page game-deadlock"><PublicNav />
    <JsonLd data={deadlockBreadcrumbs([{ name: 'Replaid Lab', path: '/' }, { name: 'Deadlock', path: '/deadlock' }, { name: item.label, path: `/deadlock/${item.slug}` }])} />
    <JsonLd data={deadlockCollection(`/deadlock/${item.slug}`, copy.heading, copy.description, articles)} />
    <main className="game-hub dl-index">
      <nav className="game-breadcrumb" aria-label="Ruta de navegación"><Link href="/">Replaid Lab</Link><span>/</span><Link href="/deadlock">Deadlock</Link><span>/</span><span aria-current="page">{item.label}</span></nav>
      <header className="dl-index-header"><p className="eyebrow">DEADLOCK EN ESPAÑOL</p>
      <h1>{copy.heading}</h1>
      <p className="game-lead">{copy.description}</p></header>
      <nav className="dl-section-nav" aria-label="Secciones de Deadlock">{DEADLOCK_SECTIONS.map(s => <Link key={s.slug} href={`/deadlock/${s.slug}`} aria-current={section === s.slug ? 'page' : undefined}>{s.label}</Link>)}</nav>
      <form className="game-search" role="search">
        <label htmlFor="deadlock-search">Buscar en {item.label.toLowerCase()}</label>
        <div><input id="deadlock-search" name="q" defaultValue={q} placeholder="Nombre en español o inglés" /><button className="btn btn-primary" type="submit">Buscar</button></div>
      </form>
      <p className="game-meta">{articles.length} {articles.length === 1 ? 'artículo disponible' : 'artículos disponibles'}</p>
      <div className={section === 'heroes' ? 'dl-roster-grid' : `game-card-grid ${['counters', 'builds'].includes(section) ? 'dl-library-grid' : ''}`}>{articles.map(a => section === 'heroes' ? <DeadlockHeroCard key={a.path} article={a} /> : <Link key={a.path} className="game-content-card" href={a.path}>
        {a.image && <div className="game-card-portrait"><Image src={a.image} alt={a.aliases?.[0] ?? a.title} fill sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 360px" /></div>}
        <span className="eyebrow">{['news', 'patch-notes'].includes(section) ? new Date(a.publishedAt).toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' }) : a.hero ? deadlockHeroLabel(a.hero, true) : 'Guía de Deadlock'}</span><h2>{a.title}</h2><p>{a.description}</p><span className="game-card-action">{section === 'builds' ? 'Ver build y código' : section === 'counters' ? 'Ver counters' : 'Leer artículo'} ↗</span>
      </Link>)}</div>
      {otherHeroes.length > 0 && <section className="game-latest">
        <h2 className="game-section-title">Más héroes de Deadlock</h2>
        <div className="game-catalog game-visual-catalog">{otherHeroes.map(hero => <figure key={hero.id}><Image src={`/deadlock/${hero.slug}.webp`} alt="" width={140} height={190} /><figcaption>{hero.name}</figcaption></figure>)}</div>
      </section>}
      {articles.length === 0 && otherHeroes.length === 0 && <p>No hay artículos que coincidan. Prueba con otro nombre.</p>}
    </main>
  </div>
}
