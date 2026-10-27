import fs from 'node:fs'
import { createClient } from '@supabase/supabase-js'
import { editorialIssues, editorialVersion, evidenceMatches, safeSourceUrl } from '../src/lib/editorial-record.ts'
import { previewSignature } from '../src/lib/editorial-preview-token.ts'
import { checkDeadlockBuild } from './check-deadlock-build.mjs'
import { checkEditorialMapMedia } from './check-editorial-map-media.mjs'
import { editorialInternalLinks, editorialPublicationIssues } from '../src/lib/editorial-publication-checks.ts'
import { checkEditorialLinks } from './check-editorial-links.mjs'
const [command,file,argument]=process.argv.slice(2)
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}})
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'))
function fail(e){throw Error(e.message??String(e))}
const base=process.env.EDITORIAL_BASE_URL??'http://127.0.0.1:3025'
async function stage(a){const issues=editorialIssues(a);if(issues.length)throw Error(issues.join('; '));if(a.game==='deadlock'&&a.kind==='build'&&!a.buildImport&&!a.buildImportUnavailable)throw Error('Deadlock builds require a verified import code');const {data:current,error:lookup}=await db.from('editorial_pages').select('version').eq('path',a.path).maybeSingle();if(lookup)fail(lookup);const {data,error}=await db.from('editorial_candidates').upsert({game:a.game,path:a.path,kind:a.kind,payload:a,version:editorialVersion(a),base_version:current?.version??null},{onConflict:'path,version'}).select().single();if(error)fail(error);return data}
async function previewUrl(id){const expires=String(Date.now()+3_000_000);return `${base}/editorial-preview/${id}?expires=${expires}&token=${previewSignature(id,expires,process.env.SUPABASE_SERVICE_ROLE_KEY)}`}
async function qa(a,id,report){
 if(!report.facts||!report.sources||!report.originality||!report.report)throw Error('Missing factual/source/originality report')
 const issues=editorialPublicationIssues(a);if(issues.length)throw Error(issues.join('; '))
 const buildReport=await checkDeadlockBuild(a)
 const mediaReport=await checkEditorialMapMedia(a,base)
 const {chromium}=await import('@playwright/test');const browser=await chromium.launch({headless:true});const output=`reports/editorial/${id}`;fs.mkdirSync(output,{recursive:true});const internalLinks=new Set();
 try{for(const [label,width,height] of [['desktop',1440,1000],['mobile',390,844]]){const page=await browser.newPage({viewport:{width,height}});const errors=[];page.on('pageerror',e=>errors.push(e.message));const r=await page.goto(await previewUrl(id));if(!r?.ok())throw Error(`Preview ${r?.status()}`);await page.locator('h1').waitFor();if(await page.locator('h1').innerText()!==a.title)throw Error('Wrong preview content');if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Horizontal overflow');if(await page.locator('[data-editorial-version]').getAttribute('data-editorial-version')!==editorialVersion(a))throw Error('Wrong preview revision');for(const href of await page.locator('main a[href]').evaluateAll(links=>links.map(link=>link.getAttribute('href'))))internalLinks.add(href);if(errors.length)throw Error(errors.join('; '));await page.screenshot({path:`${output}/${label}.png`,fullPage:true});await page.close()}}
 finally{await browser.close()}
 for(const s of a.sources){if(!safeSourceUrl(s.url))throw Error('Invalid source URL');const r=await fetch(s.url,{signal:AbortSignal.timeout(20000),redirect:'error'});if(!r.ok)throw Error(`Source unavailable: ${s.url} (${r.status})`)}
 const linkReport=await checkEditorialLinks([...internalLinks],base)
 return {version:editorialVersion(a),reviewer:'codex-automated',reviewedAt:new Date().toISOString(),checks:{facts:true,sources:true,originality:true,links:true,desktop:true,mobile:true},report:[report.report,buildReport,mediaReport,linkReport].filter(Boolean).join('\n')}
}
try{
 if(command==='stage'){const a=read(file);const c=await stage(a);console.log(JSON.stringify({id:c.id,path:c.path,version:c.version}))}
 else if(command==='check'){const {data,error}=await db.from('editorial_candidates').select().eq('id',file).single();if(error)fail(error);const evidence=await qa(data.payload,file,read(argument));const update=await db.from('editorial_candidates').update({evidence}).eq('id',file).eq('version',data.version);if(update.error)fail(update.error);console.log(JSON.stringify(evidence))}
 else if(command==='publish'){
  const {data,error}=await db.from('editorial_candidates').select().eq('id',file).single();if(error)fail(error);if(!evidenceMatches(data.payload,data.evidence))throw Error('Candidate needs exact-version checks');
  const issues=editorialPublicationIssues(data.payload);if(issues.length)throw Error(issues.join('; '));
  await checkDeadlockBuild(data.payload)
  await checkEditorialMapMedia(data.payload,base)
  await checkEditorialLinks(editorialInternalLinks(data.payload),base)
  const pub=await db.rpc('publish_editorial_revision',{p_page_id:data.id,p_version:data.version,p_evidence:data.evidence});if(pub.error)fail(pub.error);
  try {const response=await fetch(`${base}${data.path}`,{cache:'no-store',signal:AbortSignal.timeout(30000)});const html=await response.text();if(!response.ok||!html.includes(`data-editorial-version="${data.version}"`))throw Error('Public version mismatch')}
  catch(e){const restore=await db.rpc('restore_editorial_revision',{p_page_id:pub.data,p_expected_version:data.version});if(restore.error)fail(restore.error);throw Error(`Public verification failed; revision restored: ${e.message}`)}
  console.log(JSON.stringify({published:data.path,version:data.version,pageId:pub.data}))
 }
 else if(command==='restore'){const row=await db.from('editorial_pages').select('id,version').eq('path',file).single();if(row.error)fail(row.error);const r=await db.rpc('restore_editorial_revision',{p_page_id:row.data.id,p_expected_version:row.data.version});if(r.error)fail(r.error);console.log('restored',file)}
 else if(command==='seed-check'){
  const launch=read('src/lib/deadlock-launch.json'),report=read(file),reviews={};for(let i=0;i<launch.length;i++){reviews[launch[i].path]=await qa(launch[i],`seed-${i}`,report);console.log('checked',launch[i].path)}fs.writeFileSync('src/lib/deadlock-launch-reviews.json',JSON.stringify(reviews,null,2)+'\n')
 }
 else if(command==='seed-publish'){
  const reviews=read('src/lib/deadlock-launch-reviews.json');for(const a of read('src/lib/deadlock-launch.json')){const evidence=reviews[a.path];if(!evidenceMatches(a,evidence))throw Error('Launch review missing');const c=await stage(a);const r=await db.rpc('publish_editorial_revision',{p_page_id:c.id,p_version:c.version,p_evidence:evidence});if(r.error)fail(r.error);console.log('published',a.path)}
 }
 else if(command==='status'){const [r,c]=await Promise.all([db.from('editorial_runs').select('*').order('started_at',{ascending:false}).limit(10),db.from('editorial_runs').select('id,cursor_at').eq('status','complete').order('completed_at',{ascending:false}).limit(1)]);if(r.error)fail(r.error);if(c.error)fail(c.error);console.log(JSON.stringify({recent:r.data,lastComplete:c.data?.[0]??null},null,2))}
 else if(command==='run-start'){const r=await db.from('editorial_runs').insert({summary:{games:['overwatch','deadlock']}}).select('id').single();if(r.error)fail(r.error);console.log(r.data.id)}
 else if(command==='run-finish'){const summary=read(argument);const r=await db.from('editorial_runs').update({status:summary.failed?'failed':'complete',completed_at:new Date().toISOString(),cursor_at:summary.failed?null:new Date().toISOString(),summary}).eq('id',file);if(r.error)fail(r.error);console.log('recorded',file)}
 else throw Error('Use stage FILE | check ID REPORT | publish ID | restore PATH | seed-check REPORT | seed-publish | status | run-start | run-finish ID SUMMARY')
}catch(e){console.error(e.message);process.exitCode=1}
