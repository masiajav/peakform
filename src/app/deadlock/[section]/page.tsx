import catalog from '@/lib/deadlock-catalog.json'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PublicNav from '@/components/layout/PublicNav'
import { DEADLOCK_SECTIONS } from '@/lib/games'
import { SECTION_KIND } from '@/lib/editorial-record'
import { publishedEditorial } from '@/lib/editorial-store'
import { buildMetadata } from '@/lib/seo'
export const dynamic = 'force-dynamic'
export async function generateMetadata({params}:{params:Promise<{section:string}>}){const p=await params;const s=DEADLOCK_SECTIONS.find(s=>s.slug===p.section);return s?buildMetadata({title:`${s.label} de Deadlock en español`,description:s.description,path:`/deadlock/${s.slug}`}):{}}
export default async function Page({params,searchParams}:{params:Promise<{section:string}>;searchParams:Promise<{q?:string}>}){
 const [{section},{q=''}]=await Promise.all([params,searchParams]);const s=DEADLOCK_SECTIONS.find(s=>s.slug===section);if(!s)notFound();
 const query=q.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const all=(await publishedEditorial('deadlock')).filter(a=>a.kind===SECTION_KIND[section]);
 const articles=all.filter(a=>[a.title,a.description,...(a.aliases??[])].join(' ').toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'').includes(query));
 return <div className="game-page game-deadlock"><PublicNav/><main className="game-hub"><Link className="game-back" href="/deadlock">← Deadlock</Link><p className="eyebrow">Aprende a decidir</p><h1>{s.label} de Deadlock</h1><p className="game-lead">{s.description}</p><form className="game-search" role="search"><label htmlFor="deadlock-search">Buscar en {s.label.toLowerCase()}</label><div><input id="deadlock-search" name="q" defaultValue={q} placeholder="Nombre en español o inglés"/><button className="btn btn-primary" type="submit">Buscar</button></div></form><p className="game-meta">{articles.length} {articles.length===1?'artículo disponible':'artículos disponibles'}</p><div className="game-card-grid">{articles.map(a=><Link key={a.path} className="game-content-card" href={a.path}><span className="eyebrow">{a.patch}</span><h2>{a.title}</h2><p>{a.description}</p><span className="game-card-action">Leer artículo ↗</span></Link>)}</div>{section==='heroes'&&!q&&<section className="game-latest"><h2 className="game-section-title">El resto del elenco</h2><p className="game-meta">Catálogo del cliente verificado el 23 de octubre de 2026. Las fichas detalladas se incorporan tras su revisión.</p><div className="game-catalog">{catalog.filter(h=>!h.guide).map(h=><span key={h.id}>{h.name}</span>)}</div></section>}{articles.length===0&&<p>No hay artículos que coincidan. Prueba con otro nombre.</p>}</main></div>
}
