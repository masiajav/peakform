import Link from 'next/link'
import { publishedEditorial } from '@/lib/editorial-store'
import type { GameId } from '@/lib/games'
import type { EditorialKind } from '@/lib/editorial-record'
export default async function EditorialUpdates({game,kinds,q='',hero,limit=9}:{game:GameId;kinds:EditorialKind[];q?:string;hero?:string;limit?:number}){
 const normalize=(s:string)=>s.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'')
 const items=(await publishedEditorial(game)).filter(a=>kinds.includes(a.kind)&&(!hero||a.hero===hero)&&normalize(`${a.title} ${a.description}`).includes(normalize(q))).sort((a,b)=>Date.parse(b.updatedAt)-Date.parse(a.updatedAt)).slice(0,limit)
 if(!items.length)return null
 return <section className="game-latest" style={{margin:'28px 0 40px'}} aria-label="Publicaciones actualizadas"><h2 className="game-section-title">Lecturas actualizadas</h2><div className="game-card-grid">{items.map(a=><Link className="game-content-card" key={a.path} href={a.path}><h3>{a.title}</h3><p>{a.description}</p><span className="game-card-action">Leer artículo ↗</span></Link>)}</div></section>
}
