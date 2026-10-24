import fs from 'node:fs'
import { createHash } from 'node:crypto'

const read=path=>JSON.parse(fs.readFileSync(path,'utf8'))
const catalog=read('src/lib/deadlock-catalog.json')
const heroes=read('reports/deadlock-parity/sources/heroes-english.json')
const items=read('reports/deadlock-parity/sources/items-english.json')
const localized=new Map(read('reports/deadlock-parity/sources/items-spanish.json').map(item=>[item.id,item]))
const byClass=new Map(items.map(item=>[item.class_name,item]))
const jobs=[],manifest=[]
const mediaHeroes=catalog.map(entry=>{
 const hero=heroes.find(hero=>hero.id===entry.id)
 if(!hero?.player_selectable||hero.disabled)throw Error(`Review catalog availability: ${entry.slug}`)
 const abilities=[1,2,3,4].map(slot=>{
  const ability=byClass.get(hero.items[`signature${slot}`])
  if(!ability?.name)throw Error(`Missing signature ${entry.slug}/${slot}`)
  const target={slot,name:(localized.get(ability.id)?.name??ability.name).replace(/\s+/g,' ').trim(),englishName:ability.name,icon:'',id:ability.id}
  jobs.push({kind:'ability',id:ability.id,key:`${entry.slug}-${slot}`,item:ability,target})
  return target
 })
 return {id:entry.id,slug:entry.slug,name:entry.name,aliases:entry.aliases,portrait:`/deadlock/${entry.slug}.webp`,abilities}
})
const mediaItems=items.filter(item=>item.type==='upgrade'&&item.shopable&&!item.disabled).map(item=>{
 const name=localized.get(item.id)?.name??item.name
 const target={id:item.id,name,englishName:item.name,aliases:[...new Set([name,item.name])],icon:''}
 jobs.push({kind:'item',id:item.id,key:String(item.id),item,target})
 return target
})

for(const folder of ['abilities','items'])fs.mkdirSync(`public/deadlock/${folder}`,{recursive:true})
for(let start=0;start<jobs.length;start+=8){
 const results=await Promise.allSettled(jobs.slice(start,start+8).map(async job=>{
  const urls=[...new Set([job.item.shop_image_webp,job.item.image_webp,job.item.shop_image,job.item.image].filter(Boolean))]
  let failure='No icon URL'
  for(const url of urls){
   try{
    const response=await fetch(url,{signal:AbortSignal.timeout(20000)})
    if(!response.ok){failure=`HTTP ${response.status}`;continue}
    const data=Buffer.from(await response.arrayBuffer())
    const extension=data.toString('ascii',8,12)==='WEBP'?'webp':data.subarray(1,4).toString('ascii')==='PNG'?'png':null
    if(!extension){failure='Unsupported image bytes';continue}
    const path=`/deadlock/${job.kind==='ability'?'abilities':'items'}/${job.key}.${extension}`
    if(!fs.existsSync(`public${path}`)||!fs.readFileSync(`public${path}`).equals(data))fs.writeFileSync(`public${path}`,data)
    job.target.icon=path
    manifest.push({kind:job.kind,id:job.id,key:job.key,path,url,sha256:createHash('sha256').update(data).digest('hex')})
    return
   }catch(error){failure=error.message}
  }
  throw Error(`${job.kind} ${job.key}: ${failure}`)
 }))
 const failed=results.filter(result=>result.status==='rejected')
 if(failed.length){for(const error of failed)console.error(error.reason.message);throw Error('Media incomplete; registry not written')}
}
manifest.sort((a,b)=>`${a.kind}/${a.key}`.localeCompare(`${b.kind}/${b.key}`))
const version=createHash('sha256').update(JSON.stringify({heroes:mediaHeroes,items:mediaItems,files:manifest})).digest('hex')
fs.writeFileSync('src/lib/deadlock-media.json',JSON.stringify({version,heroes:mediaHeroes,items:mediaItems},null,2)+'\n')
fs.writeFileSync('content/deadlock/ability-item-assets.json',JSON.stringify({retrievedAt:new Date().toISOString(),version,files:manifest},null,2)+'\n')
console.log('Cached media:',mediaHeroes.length,'heroes,',mediaHeroes.length*4,'abilities,',mediaItems.length,'items; version',version)
