import fs from 'node:fs'
import { editorialIssues } from '../src/lib/editorial-record.ts'
import { prepareDeadlockBuildImport } from './check-deadlock-build.mjs'
const slug=process.argv[2]
if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug??''))throw Error('Use a verified catalog slug')
const catalog=JSON.parse(fs.readFileSync('src/lib/deadlock-catalog.json','utf8'))
const hero=catalog.find(h=>h.slug===slug);if(!hero)throw Error('Hero is not in the playable catalog')
const visualHero=JSON.parse(fs.readFileSync('src/lib/deadlock-media.json','utf8')).heroes.find(h=>h.slug===slug)
const {default:articles,sourceUrls}=await import(`../content/deadlock/${slug}-depth.mjs`)
const en=JSON.parse(fs.readFileSync('reports/deadlock-parity/sources/items-english.json','utf8'))
const es=new Map(JSON.parse(fs.readFileSync('reports/deadlock-parity/sources/items-spanish.json','utf8')).map(i=>[i.id,i]))
const items=new Map(en.filter(i=>i.type==='upgrade'&&i.shopable&&!i.disabled).map(i=>[i.name,i]))
const now=new Date().toISOString(),directory=`reports/deadlock-parity/${slug}`,manifest=[]
fs.mkdirSync(directory,{recursive:true})
const sources=[
 {title:'Héroes y localización · Deadlock API',url:'https://api.deadlock-api.com/v1/assets/heroes?language=spanish',accessedAt:now,primary:false},
 {title:'Objetos y habilidades · Deadlock API',url:'https://api.deadlock-api.com/v1/assets/items?language=spanish',accessedAt:now,primary:false},
 ...sourceUrls.map(url=>({title:url.includes('lockcodex')?'Habilidades y compras · LockCodex':url.includes('deadlockbible')?'Ficha y decisiones de juego · Deadlock Bible':url.includes('deadlock.wiki')?'Habilidades y efectos · The Deadlock Wiki':url.includes('deadlockhandbook.com')?'Mecánicas y habilidades · Deadlock Handbook':'Efectos y mecánicas · Deadlock.io',url,accessedAt:now,primary:false}))
]
const sectionFor={hero:'heroes',counter:'counters',build:'builds'}
for(const copy of articles){
 const section=sectionFor[copy.kind];if(!section)throw Error('Hero set has an unsupported kind')
 const sections=copy.sections.map(({shopping,...s})=>{
  if(!shopping)return s
  return {...s,table:{columns:['Momento','Objeto','Almas','Cuándo ayuda','Límite'],rows:shopping.map(([phase,name,reason,limit])=>{const i=items.get(name);if(!i)throw Error(`Not purchasable: ${name}`);const local=es.get(i.id)?.name??name;return [phase,local===name?name:`${local} (${name})`,String(i.cost),reason,limit]})}}
 })
 const article={...copy,game:'deadlock',hero:slug,slug,path:`/deadlock/${section}/${slug}`,aliases:hero.aliases,image:`/deadlock/${slug}.webp`,...(copy.kind==='hero'&&visualHero?{abilities:visualHero.abilities}:{}),patch:'Deadlock · octubre de 2026',publishedAt:now,updatedAt:now,sections,faq:copy.faq.map(([question,answer])=>({question,answer})),related:[{href:'/deadlock/guides/economia-almas',label:'Economía y decisiones de compra'},{href:'/deadlock/guides/rotaciones-objetivos',label:'Rotaciones y objetivos'}],sources}
 if(copy.kind==='build'){article.buildImport=await prepareDeadlockBuildImport(slug);article.updatedAt=article.buildImport.checkedAt}
 const issues=editorialIssues(article);if(issues.length)throw Error(`${article.path}: ${issues}`)
 const file=`${directory}/${copy.kind}.json`;fs.writeFileSync(file,JSON.stringify(article,null,2)+'\n');manifest.push({file,path:article.path})
}
if(new Set(manifest.map(a=>a.path)).size!==3)throw Error('Expected hero, counter and build without duplicates')
fs.writeFileSync(`${directory}/manifest.json`,JSON.stringify(manifest,null,2)+'\n')
console.log('Prepared',hero.name,manifest.length,'pages')
