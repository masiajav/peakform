import fs from 'node:fs'
import library from '../content/deadlock/fundamentals-library.mjs'
import { editorialIssues } from '../src/lib/editorial-record.ts'
const directory='reports/deadlock-parity/library'
fs.mkdirSync(directory,{recursive:true})
const now=new Date().toISOString(),manifest=[]
const publishedTitles=new Map(JSON.parse(fs.readFileSync('src/lib/deadlock-launch.json','utf8')).map(a=>[a.path,a.title]))
for(const entry of library){
 const {mechanics,table,faq,related,...copy}=entry
 const sources=[
  {title:'Héroes y habilidades · Deadlock API',url:'https://api.deadlock-api.com/v1/assets/heroes?language=spanish',accessedAt:now,primary:false},
  {title:'Objetos del juego · Deadlock API',url:'https://api.deadlock-api.com/v1/assets/items?language=spanish',accessedAt:now,primary:false},
  ...mechanics.map(slug=>({title:`Mecánicas de ${slug.replaceAll('-',' ')} · Deadlock.io`,url:`https://www.deadlock.io/en/mechanics/${slug}`,accessedAt:now,primary:false}))
 ]
 if(entry.slug==='compras-objetos-activos'||entry.slug==='mapa-accesos-objetivos')sources.push({title:'Actualización de inventario y objetivos · Valve',url:'https://forums.playdeadlock.com/threads/11-21-2025-update.90383/',accessedAt:now,primary:true})
 if(entry.slug==='mapa-accesos-objetivos')sources.push({title:'Grieta Inestable y urna · Valve',url:'https://forums.playdeadlock.com/threads/06-30-2026-update.146261/',accessedAt:now,primary:true},{title:'Jefe central y Rejuvenecedor · Deadlock.io',url:'https://www.deadlock.io/en/mechanics/mid-boss-and-rejuvenator',accessedAt:now,primary:false})
 const a={...copy,game:'deadlock',kind:'guide',path:`/deadlock/guides/${entry.slug}`,publishedAt:now,updatedAt:now,patch:'Deadlock · octubre de 2026',sections:[...entry.sections,{title:'Decisiones para tu siguiente partida',body:['Relaciona la situación con una acción que puedas preparar antes del contacto. Después comprueba qué recurso te permitió conservar.'],table}],faq:faq.map(([question,answer])=>({question,answer})),related:related.map(href=>{const label=publishedTitles.get(href);if(!label)throw Error(`Related article not in verified library: ${href}`);return {href,label}}),sources}
 const issues=editorialIssues(a);if(issues.length)throw Error(`${a.path}: ${issues}`)
 const file=`${directory}/${entry.slug}.json`
 fs.writeFileSync(file,JSON.stringify(a,null,2)+'\n');manifest.push({file,path:a.path})
}
fs.writeFileSync(`${directory}/manifest.json`,JSON.stringify(manifest,null,2)+'\n')
console.log('Prepared',manifest.length,'guides')
