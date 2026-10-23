// Runs the existing audited CLI for an explicitly prepared manifest. No model/API calls.
import fs from 'node:fs'
import { spawnSync } from 'node:child_process'
const [command,manifestFile,reportFile]=process.argv.slice(2)
if(!['check','publish'].includes(command)||!manifestFile)throw Error('Use check MANIFEST REPORT | publish MANIFEST')
const manifest=JSON.parse(fs.readFileSync(manifestFile,'utf8'))
const stateFile=manifestFile.replace(/\.json$/,'.candidates.json')
const state=fs.existsSync(stateFile)?JSON.parse(fs.readFileSync(stateFile,'utf8')):[]
const run=(...args)=>{
 const r=spawnSync(process.execPath,['--env-file=.env.local','--experimental-strip-types','scripts/editorial.mjs',...args],{encoding:'utf8',env:process.env,timeout:180000})
 if(r.error||r.status!==0)throw Error(`editorial ${args[0]} failed (exit ${r.status}, signal ${r.signal??'none'}): ${[r.error?.message,r.stderr,r.stdout].filter(Boolean).join('\n')}`)
 const json=r.stdout.trim().split(/\r?\n/).at(-1)
 return JSON.parse(json)
}
for(const entry of manifest){
 let candidate=state.find(c=>c.path===entry.path)
 if(command==='check'){
  const staged=run('stage',entry.file)
  if(!candidate){candidate=staged;state.push(candidate)}else Object.assign(candidate,staged)
  delete candidate.checked;delete candidate.published
  fs.writeFileSync(stateFile,JSON.stringify(state,null,2)+'\n')
  const report=JSON.parse(fs.readFileSync(reportFile,'utf8'))
  const reportPath=entry.file.replace(/\.json$/,'.report.json')
  fs.writeFileSync(reportPath,JSON.stringify({...report,report:`${entry.path}: ${report.report}`},null,2)+'\n')
  run('check',candidate.id,reportPath)
  candidate.checked=true
 }else{
  if(!candidate?.checked)throw Error(`Unchecked candidate: ${entry.path}`)
  run('publish',candidate.id)
  candidate.published=true
 }
 fs.writeFileSync(stateFile,JSON.stringify(state,null,2)+'\n')
 console.log(command,entry.path,candidate.id)
}
