import fs from 'node:fs'
import { createHash } from 'node:crypto'
const catalog=JSON.parse(fs.readFileSync('src/lib/deadlock-catalog.json','utf8'))
const heroes=JSON.parse(fs.readFileSync('reports/deadlock-parity/sources/heroes-english.json','utf8'))
const current=heroes.filter(h=>h.player_selectable&&!h.disabled)
if(current.length!==catalog.length||current.some(h=>!catalog.some(c=>c.id===h.id)))throw Error('Playable catalog changed; review it before caching portraits')
const manifest=[]
for(let start=0;start<catalog.length;start+=5){
 const results=await Promise.allSettled(catalog.slice(start,start+5).map(async entry=>{
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug))throw Error('Unsafe catalog slug')
  const hero=heroes.find(h=>h.id===entry.id),url=hero.images.icon_hero_card_webp
  const response=await fetch(url,{signal:AbortSignal.timeout(30000)})
  if(!response.ok)throw Error(`${entry.slug}: ${response.status}`)
  const data=Buffer.from(await response.arrayBuffer())
  if(data.toString('ascii',8,12)!=='WEBP')throw Error(`${entry.slug}: not a WebP portrait`)
  const path=`public/deadlock/${entry.slug}.webp`
  if(!fs.existsSync(path)||!fs.readFileSync(path).equals(data))fs.writeFileSync(path,data)
  return {id:entry.id,slug:entry.slug,path,url,sha256:createHash('sha256').update(data).digest('hex'),retrievedAt:new Date().toISOString()}
 }))
 for(const result of results){if(result.status==='rejected')throw result.reason;manifest.push(result.value)}
}
fs.writeFileSync('content/deadlock/catalog-assets.json',JSON.stringify(manifest,null,2)+'\n')
console.log('Cached and verified',manifest.length,'playable portraits')
