import fs from 'node:fs'
import {createHash} from 'node:crypto'
import sharp from 'sharp'
const directory='public/deadlock/map';fs.mkdirSync(directory,{recursive:true});const assets=[]
const hash=data=>createHash('sha256').update(data).digest('hex')
function save(name,extension,bytes){const sha256=hash(bytes),path=`${directory}/${name}-${sha256.slice(0,12)}.${extension}`;fs.writeFileSync(path,bytes);return{name,path:`/${path.replace(/^public\//,'')}`,sha256}}
const layers=JSON.parse(fs.readFileSync('reports/deadlock-map/map-assets.json','utf8')).assets
for(const [key,name]of [['mid','calles'],['mid_tunnels','tuneles-centrales'],['rat_tunnels','pasadizos']]){
 const original=layers.find(a=>a.key===key),bytes=fs.readFileSync(original.path);if(hash(bytes)!==original.sha256)throw Error('Changed map asset');const meta=await sharp(bytes).metadata();assets.push({...original,...save(name,'png',bytes),width:meta.width,height:meta.height})
}
for(const original of JSON.parse(fs.readFileSync('reports/deadlock-map/official-assets.json','utf8')).assets){
 const bytes=fs.readFileSync(original.path);if(hash(bytes)!==original.sha256)throw Error('Changed original image')
 const name=original.path.split('/').at(-1).replace(/\.(png|jpg|webp)$/,'').replaceAll('_','-')
 const optimized=await sharp(bytes).resize({width:1280,withoutEnlargement:true}).webp({quality:82}).toBuffer(),meta=await sharp(optimized).metadata();assets.push({source:original.url,owner:'Valve',originalSha256:original.sha256,...save(name,'webp',optimized),width:meta.width,height:meta.height})
}
const map=JSON.parse(fs.readFileSync('reports/deadlock-map/map-current.json','utf8'))
for(const [kind,name]of [['weak','camp-small'],['medium','camp-medium'],['strong','camp-large'],['vault','camp-vault']]){
 const source=map.neutral_camps.find(c=>c.kind===kind).icon,r=await fetch(source,{signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error(`Icon ${r.status}`);const bytes=Buffer.from(await r.arrayBuffer());const meta=await sharp(bytes).metadata();assets.push({source,owner:'Valve',...save(name,'png',bytes),width:meta.width,height:meta.height})
}
const registry='content/deadlock/map-assets.json',previous=fs.existsSync(registry)?JSON.parse(fs.readFileSync(registry,'utf8')).assets:[]
fs.writeFileSync(registry,JSON.stringify({checkedAt:new Date().toISOString(),assets:[...assets,...previous.filter(old=>!assets.some(current=>current.path===old.path))]},null,2)+'\n');console.log('Verified map assets',assets.length)
