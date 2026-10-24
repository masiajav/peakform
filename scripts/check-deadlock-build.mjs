import fs from 'node:fs'
import {deadlockBuildSnapshotIssues} from '../src/lib/deadlock-build-validation.ts'

export async function fetchLiveBuild(url) {
  for(let attempt=0;attempt<3;attempt++){
    const response=await fetch(url,{signal:AbortSignal.timeout(45000),redirect:'error'})
    if(response.status!==429||attempt===2)return response
    const seconds=Number(response.headers.get('retry-after'))
    if(!Number.isFinite(seconds)||seconds<0||seconds>60)return response
    await response.body?.cancel()
    await new Promise(resolve=>setTimeout(resolve,Math.min(seconds*1000+100,60000)))
  }
}

export async function checkDeadlockBuild(article) {
  if(!article.buildImport)return ''
  const hero=JSON.parse(fs.readFileSync('src/lib/deadlock-catalog.json','utf8')).find(h=>h.slug===article.hero)
  if(!hero)throw Error('Build hero is not in the verified catalog')
  const build=article.buildImport
  const url=`https://api.deadlock-api.com/v1/builds/${hero.id}/${build.code}?force_refetch=true`
  const response=await fetchLiveBuild(url)
  if(!response.ok)throw Error(`Build unavailable: ${response.status}`)
  const data=await response.json()
  const active=new Set(JSON.parse(fs.readFileSync('src/lib/deadlock-media.json','utf8')).items.map(item=>item.id))
  const issues=deadlockBuildSnapshotIssues(build,hero.id,data,active)
  if(issues.length)throw Error(issues.join('; '))
  return `Build ${build.code} / hero ${hero.id} / version ${build.version}: Game Coordinator HTTP 200, exact hero/version and current items confirmed at ${new Date().toISOString()}. Private provenance: ${url}.`
}
