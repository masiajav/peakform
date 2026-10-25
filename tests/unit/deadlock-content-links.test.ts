import {beforeEach,describe,expect,it,vi} from 'vitest'
import {renderToStaticMarkup} from 'react-dom/server'
import type {EditorialArticle} from '@/lib/editorial-record'
import launch from '@/lib/deadlock-launch.json'
const {published}=vi.hoisted(()=>({published:vi.fn()}))
vi.mock('@/lib/editorial-store',()=>({publishedEditorial:published}))
vi.mock('@/components/layout/PublicNav',()=>({default:()=>null}))
import GameEditorialArticle from '@/components/content/GameEditorialArticle'

const article:EditorialArticle={...launch[0] as EditorialArticle,kind:'counter',path:'/deadlock/counters/abrams',abilities:undefined,sections:[
 {title:'Héroes que ayudan',body:['Busca otro ángulo.'],table:{columns:['Héroe','Respuesta'],rows:[['Hiedra (Ivy)','Ayuda al compañero.'],['Vigila a Hiedra','Texto que no identifica una ficha.']]}},
 {title:'Objetos',body:['Elige según el daño recibido.']},
 {title:'Retirada',body:['Conserva cobertura.']},
]}
describe('Deadlock contextual links',()=>{
 beforeEach(()=>published.mockReset())
 it('links a precise alias only when the hero guide is published',async()=>{
  published.mockResolvedValue([{path:'/deadlock/heroes/ivy'}])
  const html=renderToStaticMarkup(await GameEditorialArticle({article}))
  expect(html.match(/href="\/deadlock\/heroes\/ivy"/g)).toHaveLength(1)
  expect(html).toContain('Hiedra (Ivy)')
  expect(html).toContain('Vigila a Hiedra')
 })
 it('keeps a known character as readable text when its guide is unpublished',async()=>{
  published.mockResolvedValue([])
  const html=renderToStaticMarkup(await GameEditorialArticle({article}))
  expect(html).not.toContain('href="/deadlock/heroes/ivy"')
  expect(html).toContain('Hiedra (Ivy)')
  expect(html).toContain('/deadlock/ivy.webp')
 })
})
