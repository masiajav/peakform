import {describe,expect,it} from 'vitest'
import {editorialIssues,editorialVersion,evidenceMatches,type EditorialArticle,type EditorialEvidence} from '@/lib/editorial-record'
import {deadlockMapIssues,type DeadlockMapAtlas} from '@/lib/deadlock-map-contract'
import launch from '@/lib/deadlock-launch.json'
const atlas:DeadlockMapAtlas={name:'La ciudad',layers:['streets','tunnels','passages'].map(id=>({id,label:id,image:`/deadlock/map/${id}-abcdef123456.png`})),groups:[{id:'guardians',label:'Guardianes',symbol:'G',color:'#b9d29b',category:'objectives',section:0,description:'Protegen la calle.',points:[{x:.5,y:.4,team:'amber'}]}],lanes:['York','Broadway','Greenwich'].map(name=>({name,color:'#abc123',points:[{x:0,y:0},{x:1,y:1}]}))}
const article:EditorialArticle={...launch[0] as EditorialArticle,kind:'map',slug:'la-ciudad',path:'/deadlock/maps/la-ciudad',hero:undefined,mapAtlas:atlas,sections:(launch[0] as EditorialArticle).sections.map(s=>({...s}))}
describe('Deadlock map revisions',()=>{
 it('binds positions, layers and photographs to the exact editorial review',()=>{
  expect(editorialIssues(article)).toEqual([])
  const evidence:EditorialEvidence={version:editorialVersion(article),reviewer:'codex-automated',reviewedAt:'2026-10-24',report:'Media and mechanics checked.',checks:{facts:true,sources:true,links:true,desktop:true,mobile:true,originality:true}}
  expect(evidenceMatches(article,evidence)).toBe(true)
  const changed=structuredClone(article);changed.mapAtlas!.groups[0].points[0].x=.7
  expect(evidenceMatches(changed,evidence)).toBe(false)
  changed.sections[0].image={src:'/deadlock/map/bell-abcdef123456.webp',alt:'Campanario',width:1200,height:800}
  expect(evidenceMatches(changed,evidence)).toBe(false)
 })
 it('rejects maps in another game or template and external image URLs',()=>{
  expect(editorialIssues({...article,game:'overwatch'})).toContain('Mapa ajeno al juego o plantilla')
  expect(editorialIssues({...article,kind:'hero'})).toContain('Mapa ajeno al juego o plantilla')
  const changed=structuredClone(atlas);changed.layers[0].image='https://example.com/map.png'
  expect(deadlockMapIssues(changed,5)).toContain('Capas de mapa no válidas')
  changed.layers[0].image='/deadlock/map/../../secret.png'
  expect(deadlockMapIssues(changed,5)).toContain('Capas de mapa no válidas')
 })
 it('rejects misplaced points, missing chapters and duplicated groups',()=>{
  const changed=structuredClone(atlas);changed.groups[0].points[0].x=1.01
  expect(deadlockMapIssues(changed,5)).toContain('Leyenda o posiciones de mapa no válidas')
  changed.groups[0].points[0].x=.5;changed.groups[0].section=99
  expect(deadlockMapIssues(changed,5)).toContain('Leyenda o posiciones de mapa no válidas')
  changed.groups[0].section=0;changed.groups.push(changed.groups[0])
  expect(deadlockMapIssues(changed,5)).toContain('Leyenda o posiciones de mapa no válidas')
 })
 it('requires meaningful local image descriptions and dimensions',()=>{
  const changed=structuredClone(article);changed.sections[0].image={src:'/deadlock/map/bell.webp',alt:'',width:1200,height:800}
  expect(editorialIssues(changed)).toContain('Imagen de sección no válida')
  changed.sections[0].image.alt='Campanario';changed.sections[0].image.width=0
  expect(editorialIssues(changed)).toContain('Imagen de sección no válida')
 })
})
