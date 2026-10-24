import {describe, expect, it} from 'vitest'
import {editorialIssues, editorialVersion, evidenceMatches, type EditorialArticle, type EditorialEvidence} from '@/lib/editorial-record'
import {deadlockBuildSnapshotIssues} from '@/lib/deadlock-build-validation'
import launch from '@/lib/deadlock-launch.json'

const base = launch.find(a => a.kind === 'build' && a.hero === 'abrams') as EditorialArticle
const article: EditorialArticle = {...base, updatedAt:'2026-10-24T13:00:00Z', buildImport:{code:830770,heroId:6,version:2,checkedAt:'2026-10-24T12:00:00Z',focus:'Cuerpo a cuerpo y aguante.',coreItems:[11,22,33]}}
const build = article.buildImport!
const snapshot = {hero_build:{hero_id:6,hero_build_id:830770,version:2,last_updated_timestamp:1790000000,details:{mod_categories:[{mods:[{ability_id:11},{ability_id:22},{ability_id:33}]}]}}}
const active = new Set([11,22,33])
describe('importable Deadlock builds',()=>{
  it('preserves old approvals and accepts an explicitly bound code',()=>{
    expect(editorialIssues(base)).toEqual([])
    expect(editorialIssues(article)).toEqual([])
    const evidence:EditorialEvidence={version:editorialVersion(article),reviewer:'codex-automated',reviewedAt:article.updatedAt,checks:{facts:true,sources:true,originality:true,links:true,desktop:true,mobile:true},report:'Checked live build.'}
    expect(evidenceMatches(article,evidence)).toBe(true)
    expect(evidenceMatches({...article,buildImport:{...build,code:830771}},evidence)).toBe(false)
  })
  it('rejects cross-game codes, invalid identity and incomplete purchases',()=>{
    for(const invalid of [{...article,kind:'hero'}, {...article,game:'overwatch'}, {...article,hero:'haze'}, {...article,buildImport:{...build,code:1.2}}, {...article,buildImport:{...build,code:0}}, {...article,buildImport:{...build,version:0}}, {...article,buildImport:{...build,checkedAt:'2027-01-01'}}, {...article,buildImport:{...build,coreItems:[11,11,22]}}, {...article,buildImport:{...build,coreItems:[11]}}]) expect(editorialIssues(invalid)).toContain('Código de build no válido')
  })
  it('requires a live response for the correct hero, code and version',()=>{
    expect(deadlockBuildSnapshotIssues(build,6,snapshot,active)).toEqual([])
    expect(deadlockBuildSnapshotIssues(build,7,snapshot,active)).toContain('La build pertenece a otro héroe')
    expect(deadlockBuildSnapshotIssues(build,6,{hero_build:{...snapshot.hero_build,version:3}},active)).toContain('El código o la versión de build ha cambiado')
    expect(deadlockBuildSnapshotIssues(build,6,{},active)).toContain('La build pertenece a otro héroe')
  })
  it('rejects absent core items, removed items and a changed build',()=>{
    expect(deadlockBuildSnapshotIssues({...build,coreItems:[11,22,44]},6,snapshot,active)).toContain('Las compras principales no están en la build')
    expect(deadlockBuildSnapshotIssues(build,6,snapshot,new Set([11,22]))).toContain('La build contiene objetos no disponibles')
    expect(deadlockBuildSnapshotIssues(build,6,{hero_build:{...snapshot.hero_build,last_updated_timestamp:2000000000}},active)).toContain('La build cambió después de su comprobación')
    expect(deadlockBuildSnapshotIssues(build,6,{hero_build:{...snapshot.hero_build,development_build:true}},active)).toContain('La build no está publicada')
  })
})
