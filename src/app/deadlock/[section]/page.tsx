import catalog from '@/lib/deadlock-catalog.json'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import PublicNav from '@/components/layout/PublicNav'
import { DEADLOCK_SECTIONS } from '@/lib/games'
import { SECTION_KIND } from '@/lib/editorial-record'
import { publishedEditorial } from '@/lib/editorial-store'
import { buildMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'
type PageProps = {
  params: Promise<{ section: string }>
  searchParams: Promise<{ q?: string }>
}
const normalize = (text: string) => text.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export async function generateMetadata({ params }: Pick<PageProps, 'params'>) {
  const { section } = await params
  const item = DEADLOCK_SECTIONS.find(s => s.slug === section)
  return item ? buildMetadata({ title: `${item.label} de Deadlock en español`, description: item.description, path: `/deadlock/${item.slug}` }) : {}
}

export default async function Page({ params, searchParams }: PageProps) {
  const [{ section }, { q = '' }] = await Promise.all([params, searchParams])
  const item = DEADLOCK_SECTIONS.find(s => s.slug === section)
  if (!item) notFound()
  const query = normalize(q)
  const all = (await publishedEditorial('deadlock')).filter(a => a.kind === SECTION_KIND[section])
  const publishedPaths = new Set(all.map(a => a.path))
  const articles = all.filter(a => normalize([a.title, a.description, ...(a.aliases ?? [])].join(' ')).includes(query))
  const otherHeroes = section === 'heroes' ? catalog.filter(h => !publishedPaths.has(`/deadlock/heroes/${h.slug}`) && normalize(h.aliases.join(' ')).includes(query)) : []

  return <div className="game-page game-deadlock"><PublicNav />
    <main className="game-hub">
      <Link className="game-back" href="/deadlock">← Deadlock</Link>
      <p className="eyebrow">Aprende a decidir</p>
      <h1>{item.label} de Deadlock</h1>
      <p className="game-lead">{item.description}</p>
      <form className="game-search" role="search">
        <label htmlFor="deadlock-search">Buscar en {item.label.toLowerCase()}</label>
        <div><input id="deadlock-search" name="q" defaultValue={q} placeholder="Nombre en español o inglés" /><button className="btn btn-primary" type="submit">Buscar</button></div>
      </form>
      <p className="game-meta">{articles.length} {articles.length === 1 ? 'artículo disponible' : 'artículos disponibles'}</p>
      <div className="game-card-grid">{articles.map(a => <Link key={a.path} className="game-content-card" href={a.path}>
        {a.image && <div className="game-card-portrait"><Image src={a.image} alt={a.aliases?.[0] ?? a.title} fill sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 360px" /></div>}
        <span className="eyebrow">{a.patch}</span><h2>{a.title}</h2><p>{a.description}</p><span className="game-card-action">Leer artículo ↗</span>
      </Link>)}</div>
      {otherHeroes.length > 0 && <section className="game-latest">
        <h2 className="game-section-title">Más héroes de Deadlock</h2>
        <div className="game-catalog game-visual-catalog">{otherHeroes.map(hero => <figure key={hero.id}><Image src={`/deadlock/${hero.slug}.webp`} alt="" width={140} height={190} /><figcaption>{hero.name}</figcaption></figure>)}</div>
      </section>}
      {articles.length === 0 && otherHeroes.length === 0 && <p>No hay artículos que coincidan. Prueba con otro nombre.</p>}
    </main>
  </div>
}
