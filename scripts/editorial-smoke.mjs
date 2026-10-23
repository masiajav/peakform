import {createClient} from '@supabase/supabase-js'
import {execFileSync} from 'node:child_process'
import fs from 'node:fs'
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}})
const path='/deadlock/news/violeta-disponible'
const {data:original,error}=await db.from('editorial_pages').select('*').eq('path',path).single();if(error)throw error
const article=structuredClone(original.payload)
article.checklist.push('Revisa la habilidad en el cliente antes de decidir tu siguiente compra.')
fs.mkdirSync('reports/multigame',{recursive:true});fs.writeFileSync('reports/multigame/publication-smoke.json',JSON.stringify(article))
const run=(...args)=>execFileSync(process.execPath,['--env-file=.env.local','--experimental-strip-types','scripts/editorial.mjs',...args],{encoding:'utf8',env:{...process.env,EDITORIAL_BASE_URL:process.env.EDITORIAL_BASE_URL??'http://127.0.0.1:3026'},stdio:['ignore','pipe','pipe']}).trim()
const candidate=JSON.parse(run('stage','reports/multigame/publication-smoke.json'))
let published=false
try{
 run('check',candidate.id,'reports/editorial-launch-review.json');run('publish',candidate.id);published=true
 const before=await db.from('editorial_revisions').select('id',{count:'exact',head:true}).eq('page_id',original.id)
 run('publish',candidate.id)
 const after=await db.from('editorial_revisions').select('id',{count:'exact',head:true}).eq('page_id',original.id)
 if(before.count!==after.count)throw Error('Repeated publication created a duplicate revision')
}finally{if(published)run('restore',path)}
const {data:restored}=await db.from('editorial_pages').select('version,status').eq('path',path).single()
if(restored.version!==original.version||restored.status!=='published')throw Error('Original revision not restored')
fs.writeFileSync('reports/multigame/publication-smoke-result.json',JSON.stringify({path,preview:true,desktop:true,mobile:true,published:true,idempotent:true,restored:true,originalVersion:original.version},null,2))
console.log('Preview → checks → publication → idempotent repeat → restore: passed')
