import {describe,it,expect} from 'vitest'
import {gamePath,gameForPath} from '@/lib/games'
import {editorialIssues,editorialVersion,evidenceMatches,type EditorialArticle,type EditorialEvidence} from '@/lib/editorial-record'
import {previewSignature,validPreviewSignature} from '@/lib/editorial-preview-token'
import {editorialContentVersion} from '@/lib/editorial-review'
import launch from '@/lib/deadlock-launch.json'
const article=launch[0] as EditorialArticle
const evidence:EditorialEvidence={version:editorialVersion(article),reviewer:'codex-automated',reviewedAt:'2026-10-23',checks:{facts:true,sources:true,links:true,desktop:true,mobile:true,originality:true},report:'Source comparison and browser checks'}
describe('multigame routing and review isolation',()=>{
 it('retains OW URLs and prefixes Deadlock',()=>{expect(gamePath('overwatch','heroes','ana')).toBe('/heroes/ana');expect(gamePath('deadlock','heroes','haze')).toBe('/deadlock/heroes/haze');expect(gameForPath('/deadlock/guides')).toBe('deadlock');expect(gameForPath('/privacy')).toBeNull()})
 it('validates every initial article and disallows cross-game publication',()=>{for(const a of launch)expect(editorialIssues(a)).toEqual([]);expect(editorialIssues({...article,game:'overwatch'})).toContain('Ruta ajena al juego o al tipo')})
 it('requires checks of the exact content',()=>{expect(evidenceMatches(article,evidence)).toBe(true);expect(evidenceMatches({...article,title:'Changed'},evidence)).toBe(false);expect(evidenceMatches(article,{...evidence,checks:{...evidence.checks,mobile:false}})).toBe(false)})
 it('version includes ordered content, ignores object key order',()=>{expect(editorialVersion({...article})).toBe(editorialVersion(article));expect(editorialVersion({...article,checklist:[...article.checklist].reverse()})).not.toBe(editorialVersion(article))})
 it('preserves legacy OW review hashes while separating Deadlock',()=>{const old={slug:'same',title:'Title',body:'Body'};expect(editorialContentVersion(old)).toBe(editorialContentVersion({...old,game:'overwatch'}));expect(editorialContentVersion({...old,game:'deadlock'})).not.toBe(editorialContentVersion(old))})
 it('rejects malformed and private source URLs',()=>{expect(editorialIssues(null).length).toBeGreaterThan(0);expect(editorialIssues({...article,sections:[null]}).length).toBeGreaterThan(0);expect(editorialIssues({...article,sources:[null]}).length).toBeGreaterThan(0);expect(editorialIssues({...article,sources:[{title:'x',url:'http://localhost/internal',accessedAt:'2026-10-23'}]}).length).toBeGreaterThan(0)})
 it('binds private preview tokens to page and expiry',()=>{const expires=String(Date.now()+60000),key='test-only-key',sig=previewSignature('candidate',expires,key);expect(validPreviewSignature('candidate',expires,sig,key)).toBe(true);expect(validPreviewSignature('other',expires,sig,key)).toBe(false);expect(validPreviewSignature('candidate','1',sig,key)).toBe(false);expect(validPreviewSignature('candidate',expires,sig,'')).toBe(false)})
 it('does not duplicate launch routes or source claims of match outcomes',()=>{expect(new Set(launch.map(a=>a.path)).size).toBe(25);expect(launch.filter(a=>a.kind==='hero')).toHaveLength(6);expect(launch.filter(a=>a.kind==='guide')).toHaveLength(4)})
})
