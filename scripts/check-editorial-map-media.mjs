import fs from 'node:fs'
import {createHash} from 'node:crypto'
export async function checkEditorialMapMedia(article,base){
 const paths=[...new Set([article.image,...article.sections.map(s=>s.image?.src),...(article.mapAtlas?.layers.map(l=>l.image)??[]),...(article.mapAtlas?.groups.flatMap(g=>g.icon?[g.icon]:[])??[])].filter(p=>p?.startsWith('/deadlock/map/')))]
 if(!paths.length)return ''
 const assets=JSON.parse(fs.readFileSync('content/deadlock/map-assets.json','utf8')).assets
 for(const path of paths){
  const asset=assets.find(a=>a.path===path);if(!asset)throw Error(`Unregistered map image ${path}`)
  const local=fs.readFileSync(`public${path}`);if(createHash('sha256').update(local).digest('hex')!==asset.sha256)throw Error('Map image changed locally')
  const response=await fetch(`${base}${path}`,{signal:AbortSignal.timeout(20000),redirect:'error'});if(!response.ok)throw Error(`Map image unavailable ${response.status}: ${path}`)
  if(createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex')!==asset.sha256)throw Error(`Public map image differs: ${path}`)
 }
 return `${paths.length} immutable map images matched their full SHA-256 in the workspace and at ${base}; provenance: content/deadlock/map-assets.json.`
}
