import Link from 'next/link'
import Image from 'next/image'
import PublicNav from '@/components/layout/PublicNav'
import JsonLd from './JsonLd'
import { GAMES, gamePath } from '@/lib/games'
import { SECTION_KIND, editorialVersion, type EditorialArticle } from '@/lib/editorial-record'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'
export default function GameEditorialArticle({ article: a, preview = false }: { article: EditorialArticle; preview?: boolean }) {
  const section = Object.keys(SECTION_KIND).find(s => SECTION_KIND[s] === a.kind)!
  const links = a.hero ? ['heroes','counters','builds'].filter(s => s !== section) : []
  return <div className={`game-page game-${a.game}`}><PublicNav />
    {!preview && <JsonLd data={{'@context':'https://schema.org','@type':a.kind === 'news' ? 'NewsArticle' : 'Article',headline:a.title,description:a.description,url:absoluteUrl(a.path),datePublished:a.publishedAt,dateModified:a.updatedAt,inLanguage:'es',author:{'@type':'Organization',name:SITE_NAME},publisher:{'@type':'Organization',name:SITE_NAME},citation:a.sources.map(s=>s.url)}} />}
    <main className="game-article" data-editorial-version={editorialVersion(a)}><nav className="game-breadcrumb" aria-label="Ruta de navegación"><Link href="/">Replaid Lab</Link><span>/</span><Link href={GAMES[a.game].href}>{GAMES[a.game].name}</Link><span>/</span><Link href={gamePath(a.game,section)}>Explorar sección</Link></nav>
      {preview && <p role="status">Vista previa de revisión · aún no publicada</p>}
      <p className="eyebrow">{GAMES[a.game].name} · {section.replace('patch-notes','Parches')}</p><h1>{a.title}</h1><p className="game-lead">{a.description}</p><p className="game-meta">Replaid Lab · Revisado el {new Date(a.updatedAt).toLocaleDateString('es-ES',{timeZone:'Europe/Madrid'})} · {a.patch}</p>{a.image && <Image className="game-article-image" src={a.image} alt={a.aliases?.[0]??a.title} width={200} height={260}/>}<p>{a.intro}</p>
      <nav aria-label="En este artículo" className="game-toc">{a.sections.map((s,i)=><a key={i} href={`#apartado-${i}`}>{s.title}</a>)}</nav>
      {a.sections.map((s,i)=><section id={`apartado-${i}`} key={i}><h2>{s.title}</h2>{s.body.map((p,j)=><p key={j}>{p}</p>)}{s.bullets && <ul>{s.bullets.map((p,j)=><li key={j}>{p}</li>)}</ul>}</section>)}
      <section className="game-checklist"><h2>Antes de tu próxima partida</h2><ul>{a.checklist.map((c,i)=><li key={i}>{c}</li>)}</ul></section>
      {links.length > 0 && <nav className="game-related" aria-label="Sigue aprendiendo">{links.map(s=><Link key={s} href={gamePath(a.game,s,a.hero)}>{s === 'heroes' ? 'Guía del héroe' : s === 'counters' ? 'Cómo responder a este héroe' : 'Build y compras'}</Link>)}</nav>}
      <details className="game-sources"><summary>Fuentes y revisión editorial</summary><p>Redacción de Replaid Lab a partir de las referencias consultadas. Las recomendaciones son análisis editorial; no representan resultados garantizados ni pruebas de una partida real.</p><ul>{a.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a> · consultado {s.accessedAt.slice(0,10)}</li>)}</ul></details>
    </main></div>
}
