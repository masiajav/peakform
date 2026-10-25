import {describe,expect,it} from 'vitest'
import {hitTestMap,mapTooltipContent,placeMapTooltip} from '@/lib/deadlock-map-interaction'
import type {DeadlockMapAtlas} from '@/lib/deadlock-map-contract'
const atlas:DeadlockMapAtlas={name:'Ciudad',layers:[],groups:[{id:'crates',label:'Cajas',symbol:'C',color:'#ffffff',section:0,category:'resources',description:'Pueden aportar almas.',points:[{x:.25,y:.25,label:'Caja junto al puente'},{x:.27,y:.25}]}],lanes:[{name:'York',color:'#ffffff',points:[{x:.1,y:.5},{x:.9,y:.5}]}]}
describe('Deadlock map hover geometry',()=>{
 it('picks the closest point in a dense group instead of the last painted one',()=>{
  expect(hitTestMap(atlas,new Set(['crates']),true,{x:.251,y:.25},300,300)).toMatchObject({kind:'point',groupId:'crates',index:0})
  expect(hitTestMap(atlas,new Set(['crates']),true,{x:.269,y:.25},900,900)).toMatchObject({kind:'point',index:1})
 })
 it('never exposes filtered points or disabled lanes and avoids distant hits',()=>{
  expect(hitTestMap(atlas,new Set(),false,{x:.25,y:.25},720,720)).toBeNull()
  expect(hitTestMap(atlas,new Set(['crates']),true,{x:1,y:1},720,720)).toBeNull()
  expect(hitTestMap(atlas,new Set(),false,{x:.5,y:.5},720,720)).toBeNull()
 })
 it('finds a route between its vertices and uses the real editorial description',()=>{
  expect(hitTestMap(atlas,new Set(),true,{x:.5,y:.51},300,300)).toMatchObject({kind:'lane',index:0,x:.5,y:.5})
  expect(mapTooltipContent(atlas,{kind:'point',groupId:'crates',index:0,x:.25,y:.25})).toEqual({title:'Caja junto al puente',category:'Cajas',description:'Pueden aportar almas.'})
  expect(mapTooltipContent(atlas,{kind:'point',groupId:'missing',index:0,x:0,y:0})).toBeNull()
 })
 it('keeps the bubble inside the frame at every edge',()=>{
  for(const [x,y]of [[0,0],[240,0],[0,240],[240,240],[120,120]]){
   const p=placeMapTooltip(x,y,240,240,224,180)
   expect(p.left).toBeGreaterThanOrEqual(8);expect(p.left+224).toBeLessThanOrEqual(232)
   expect(p.top).toBeGreaterThanOrEqual(8);expect(p.top+180).toBeLessThanOrEqual(232)
  }
 })
})
