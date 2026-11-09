import fs from 'node:fs'
import {createHash} from 'node:crypto'
export async function checkEditorialMapMedia(article,base){
 const paths=[...new Set([article.image,...article.sections.map(s=>s.image?.src),...(article.mapAtlas?.layers.map(l=>l.image)??[]),...(article.mapAtlas?.groups.flatMap(g=>g.icon?[g.icon]:[])??[])].filter(p=>p?.startsWith('/deadlock/map/')||p?.startsWith('/deadlock/diagrams/')))]
 if(!paths.length)return ''
 const manifests=['content/deadlock/map-assets.json']
 const assets=JSON.parse(fs.readFileSync(manifests[0],'utf8')).assets
 if(paths.some(path=>path.startsWith('/deadlock/diagrams/'))){
  manifests.push('content/deadlock/diagram-assets.json')
  assets.push(...JSON.parse(fs.readFileSync(manifests.at(-1),'utf8')).assets)
 }
 for(const path of paths){
  const asset=assets.find(a=>a.path===path);if(!asset)throw Error(`Unregistered editorial image ${path}`)
  const local=fs.readFileSync(`public${path}`);if(createHash('sha256').update(local).digest('hex')!==asset.sha256)throw Error('Editorial image changed locally')
  const response=await fetch(`${base}${path}`,{signal:AbortSignal.timeout(20000),redirect:'error'});if(!response.ok)throw Error(`Editorial image unavailable ${response.status}: ${path}`)
  if(createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex')!==asset.sha256)throw Error(`Public editorial image differs: ${path}`)
 }
 return `${paths.length} registered editorial images matched their full SHA-256 in the workspace and at ${base}; provenance: ${manifests.join(' and ')}.`
}
