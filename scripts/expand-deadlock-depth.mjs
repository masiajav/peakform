import fs from 'node:fs'
import depth from '../content/deadlock/depth-batch-1.mjs'
import fundamentals from '../content/deadlock/fundamentals-depth-1.mjs'
import counters from '../content/deadlock/counter-items-depth-1.mjs'
import { editorialIssues } from '../src/lib/editorial-record.ts'

const root='reports/deadlock-parity'
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'))
const en=read(`${root}/sources/items-english.json`),es=read(`${root}/sources/items-spanish.json`)
const translated=new Map(es.map(i=>[i.id,i]))
const items=new Map(en.filter(i=>i.type==='upgrade'&&i.shopable&&!i.disabled).map(i=>[i.name,i]))
const byName=name=>{const i=items.get(name);if(!i)throw Error(`No current purchasable item: ${name}`);return i}
const itemName=name=>{const i=byName(name),local=translated.get(i.id)?.name??name;return local===name?name:`${local} (${name})`}
const price=name=>String(byName(name).cost)
const tuple=([title,...body])=>({title,body})
const now=new Date().toISOString()
const sourceTitles={
 'https://api.deadlock-api.com/v1/assets/heroes?language=spanish':'Héroes y nombres en español · Deadlock API',
 'https://api.deadlock-api.com/v1/assets/items?language=spanish':'Objetos y habilidades · Deadlock API',
 'https://api.deadlock-api.com/v2/patches':'Anuncios y notas de Valve · Deadlock API'
}
const paths=new Set(read(`${root}/published-before.json`).map(a=>a.path))
const related=(slug)=>[
 {href:'/deadlock/guides/economia-almas',label:'Economía: preparar la siguiente compra'},
 {href:'/deadlock/guides/movimiento-aguante',label:'Movimiento y uso del aguante'},
 ...(slug?[]:[{href:'/deadlock/guides/rotaciones-objetivos',label:'Rotaciones y objetivos'}])
]
fs.mkdirSync(`${root}/proposals`,{recursive:true})
const output=[]
for(const row of read(`${root}/published-before.json`)){
 const a=structuredClone(row.payload),d=depth[a.hero],c=counters[a.hero]
 a.updatedAt=now
 a.sources=a.sources.map(s=>({...s,title:sourceTitles[s.url]??s.title,primary:s.url.startsWith('https://api.deadlock-api.com')?false:s.primary,accessedAt:now}))
 if(['hero','counter','build','guide'].includes(a.kind))a.patch='Deadlock · octubre de 2026'
 if(a.kind==='hero'){
  a.sections[0]={title:'Cuatro habilidades y cómo aprovecharlas',body:d.abilities}
  a.sections.push(...d.sections.map(tuple))
  a.faq=d.faq.slice(0,2).map(([question,answer])=>({question,answer}))
  a.related=related(a.hero)
 }
 if(a.kind==='counter'){
  a.intro=c.intro
  a.sections.splice(3,0,{
   title:'Héroes que ofrecen respuestas',
   body:['Elige la herramienta que tu equipo puede aplicar desde una posición segura. La tabla distingue la oportunidad de su límite: una respuesta disponible en el kit puede fallar si llegas tarde o si el rival conserva protección.'],
   table:{columns:['Héroe','Qué aporta','Cómo prepararlo','Qué evitar'],rows:d.matchups}
  },{
   title:'Objetos para responder a su plan',
   body:['Compra según la interacción que necesitas resolver y practica la activación antes de depender de ella. Los precios indican el coste de tienda de cada objeto; las alternativas no forman una lista de compra obligatoria.'],
   table:{columns:['Objeto','Almas','Cuándo ayuda','Límite'],rows:c.items.map(([name,reason,limit])=>[itemName(name),price(name),reason,limit])}
  },tuple(c.scenario))
  a.faq=[{question:c.faq[0],answer:c.faq[1]},{question:'¿Cuándo vuelvo a presionar después de defender la entrada?',answer:a.sections[1].body[0]}]
  a.checklist=[a.description,'Identifica qué aliado conserva una respuesta y desde dónde puede usarla.','Elige el objeto por su efecto y respeta su límite durante la activación.']
  a.related=related(a.hero)
 }
 if(a.kind==='build'){
  const names=d.shopping.slice(0,2).map(r=>itemName(r[1]))
  a.intro=`Empieza con ${names.join(' y ')} cuando puedas aprovechar sus efectos en la línea. Después escoge las piezas de la tabla según lo que necesites para completar tu secuencia: las compras de protección y las mejoras de daño compiten por los mismos recursos. Adelanta una respuesta situacional si la siguiente pelea depende de ella.`
  for(const section of a.sections)delete section.bullets
  a.sections.unshift({title:'Ruta de compras por fases',body:['Las primeras filas preparan la línea y las siguientes abren opciones para la media y la última parte de la partida. No necesitas comprar todas las alternativas: comprueba los espacios disponibles y el problema inmediato antes de completar la siguiente pieza. Los precios son el coste de tienda del objeto; si una mejora utiliza una pieza previa, la tienda muestra lo que te falta por pagar.'],table:{columns:['Fase','Objeto','Almas','Cuándo elegirlo','Límite'],rows:d.shopping.map(([phase,name,reason,limit])=>[phase,itemName(name),price(name),reason,limit])}})
  a.sections.push(...d.buildSections.map(tuple))
  a.faq=[{question:'¿Sigo la tabla en el mismo orden todas las partidas?',answer:d.buildSections[0][1]},{question:'¿Qué compruebo antes de ahorrar para una pieza cara?',answer:'Identifica la próxima pelea y la herramienta que te falta para participar. Si aún no puedes sobrevivir a la primera respuesta, una compra intermedia de protección puede aportar antes. Cuando ya completas la secuencia, valora si la pieza cara mejora el daño, la disponibilidad o la llegada que realmente estás usando.'}]
  a.related=related(a.hero)
 }
 if(a.kind==='guide'){
  const f=fundamentals[a.slug];if(!f)throw Error(a.slug)
  const mechanics={'economia-almas':'souls','fase-de-lineas':'lanes-and-troopers','movimiento-aguante':'movement-and-stamina','rotaciones-objetivos':'objectives'}
  a.sources.push({title:'Mecánicas y decisiones de juego · Deadlock.io',url:`https://www.deadlock.io/en/mechanics/${mechanics[a.slug]}`,accessedAt:now,primary:false})
  a.intro=f.intro
  a.sections.push(...f.sections.map(tuple),{title:'Decisiones que puedes reconocer en partida',body:['Busca la situación que está ocurriendo ahora y elige una acción que puedas comprobar en el siguiente intercambio.'],table:{columns:['Situación','Decisión'],rows:f.rows}})
  a.faq=f.faq.map(([question,answer])=>({question,answer}))
  a.related=related().filter(l=>l.href!==a.path)
 }
 if(a.kind==='news'&&a.slug==='enfermera-harrow-disponible'){
  a.sections[0].body=['El anuncio presenta Leech Therapy, Wretched Vapors, Healing Needles y Lurking Terrors. Sus herramientas combinan efectos sobre aliados con presión sobre enemigos. En una pelea, conviene reconocer a quién está ayudando y qué enemigo puede aprovechar ese apoyo para avanzar.']
  a.sections[2]={title:'La primera decisión al jugar contra ella',body:['Antes de perseguir un objetivo con poca salud, mira si Harrow puede sostenerlo y si su equipo conserva una segunda amenaza. Presionar desde otra cobertura puede obligar al rival a dividir el apoyo. Una eliminación aislada tiene menos valor si la persecución deja vuestra estructura sin defensa.']}
 }
 if(a.kind==='news'&&a.slug==='violeta-disponible'){
  a.intro='Valve anunció la disponibilidad de Violeta el 16 de octubre. Sus herramientas combinan tinta, disparos y movimiento para cambiar el espacio de la pelea. Al encontrarla, observa tanto su primer acercamiento como la ruta que conserva para salir después del intercambio.'
  a.sections[2]={title:'Qué preparar antes del siguiente intercambio',body:['Conserva una cobertura que no dependa de seguir su misma trayectoria. Si Violeta cambia de lado, comprueba dónde puede ayudarle su equipo antes de perseguir. Al aprender el personaje, practica una entrada con objetivo y una salida con recursos; después añade las compras que mejoren esa secuencia.']}
 }
 if(a.kind==='patch_note'){
  a.intro='Los ajustes del 14 de octubre reducen varias herramientas de Baba y refuerzan recursos de Danny Difunto. Baba debe medir mejor cuánto tiempo puede permanecer expuesta; con Danny conviene volver a probar los intercambios que antes exigían retirarse pronto.'
  a.description='Baba pierde margen en varias herramientas y Danny Difunto recibe mejoras para disputar los intercambios.'
 }
 if(a.related?.some(l=>!paths.has(l.href)))throw Error(`Related page not published: ${a.path}`)
 const issues=editorialIssues(a);if(issues.length)throw Error(`${a.path}: ${issues}`)
 const file=`${root}/proposals/${a.kind}-${a.slug}.json`
 fs.writeFileSync(file,JSON.stringify(a,null,2)+'\n');output.push({file,path:a.path,words:JSON.stringify(a.sections).split(/\s+/).length})
}
fs.writeFileSync(`${root}/proposals-manifest.json`,JSON.stringify(output,null,2)+'\n')
console.log(JSON.stringify(output,null,2))
