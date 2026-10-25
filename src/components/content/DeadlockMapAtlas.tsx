'use client'

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type {KeyboardEvent, MouseEvent, PointerEvent} from 'react'
import { Minus, Plus, RotateCcw, X } from 'lucide-react'
import type { DeadlockMapAtlas as MapAtlas, DeadlockMapGroup } from '@/lib/deadlock-map-contract'
import {hitTestMap, mapTargetKey, mapTooltipContent, placeMapTooltip, type MapTarget} from '@/lib/deadlock-map-interaction'
import styles from './DeadlockMapAtlas.module.css'

const presets = [{ id: 'objectives', label: 'Objetivos' }, { id: 'resources', label: 'Recursos' }, { id: 'travel', label: 'Rutas' }] as const
const teamColor = { amber: '#e3a054', sapphire: '#6db9e9' }

export default function DeadlockMapAtlas({ atlas }: { atlas: MapAtlas }) {
  const id = useId()
  const viewport = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const map = useRef<SVGSVGElement>(null)
  const bubble = useRef<HTMLDivElement>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const suppressedFocus = useRef<Element | null>(null)
  const dismissedHover = useRef<string | null>(null)
  const pointerType = useRef('mouse')
  const [hint, setHint] = useState<{target:MapTarget;pinned:boolean}|null>(null)
  const [position, setPosition] = useState({key:'',left:8,top:8,maxHeight:300})
  const [focusedPoints, setFocusedPoints] = useState<Record<string,number>>({})
  const [layer, setLayer] = useState(atlas.layers[0].id)
  const [visible, setVisible] = useState(() => new Set(atlas.groups.filter(group => group.defaultVisible).map(group => group.id)))
  const [selected, setSelected] = useState(atlas.groups[0].id)
  const [lanes, setLanes] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [team, setTeam] = useState<'amber' | 'sapphire'>('amber')
  const active = atlas.groups.find(group => group.id === selected) ?? atlas.groups[0]
  const image = atlas.layers.find(item => item.id === layer) ?? atlas.layers[0]
  const groups = useMemo(()=>atlas.groups.filter(group=>visible.has(group.id)),[atlas.groups,visible])
  const lanePaths = useMemo(()=>atlas.lanes.map(lane=>lane.points.map(p=>`${p.x*1000},${p.y*1000}`).join(' ')),[atlas.lanes])
  const content = hint ? mapTooltipContent(atlas,hint.target) : null
  const cancelHide = useCallback(()=>{if(hideTimer.current){clearTimeout(hideTimer.current);hideTimer.current=null}},[])
  const dismiss = useCallback((restoreFocus=false)=>{
    cancelHide()
    if(hint)dismissedHover.current=mapTargetKey(hint.target)
    if(restoreFocus&&hint){
      const trigger=map.current?.querySelector<SVGElement>(`[data-map-target="${mapTargetKey(hint.target)}"]`)
      if(trigger&&document.activeElement!==trigger){suppressedFocus.current=trigger;trigger.focus({preventScroll:true})}
    }
    setHint(null)
  },[cancelHide,hint])
  function show(target:MapTarget,force=false){
    if(force)dismissedHover.current=null
    cancelHide()
    setHint(previous=>{
      if(previous?.pinned&&!force)return previous
      return previous&&mapTargetKey(previous.target)===mapTargetKey(target)?previous:{target,pinned:false}
    })
  }
  function pin(target:MapTarget){
    if(hint?.pinned&&mapTargetKey(hint.target)===mapTargetKey(target)){dismiss();return}
    dismissedHover.current=null
    cancelHide();if(target.kind==='point')setSelected(target.groupId)
    const trigger=map.current?.querySelector<SVGElement>(`[data-map-target="${mapTargetKey(target)}"]`)
    if(trigger&&document.activeElement!==trigger)trigger.focus({preventScroll:true})
    setHint({target,pinned:true})
  }
  function scheduleHide(){
    if(hideTimer.current)return
    hideTimer.current=setTimeout(()=>{
      hideTimer.current=null
      const focusedKey=(document.activeElement as SVGElement|null)?.dataset?.mapTarget
      setHint(previous=>previous&&(previous.pinned||mapTargetKey(previous.target)===focusedKey)?previous:null)
    },180)
  }
  function hit(event:PointerEvent<SVGElement>|MouseEvent<SVGElement>){
    const rect=map.current?.getBoundingClientRect()
    if(!rect)return null
    let x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height
    if(team==='sapphire'){x=1-x;y=1-y}
    const input='pointerType' in event?event.pointerType:'pointerType' in event.nativeEvent?event.nativeEvent.pointerType:pointerType.current
    return hitTestMap(atlas,visible,lanes,{x,y},rect.width,rect.height,input==='touch'?18:10)
  }
  function keyPoint(event:KeyboardEvent<SVGGElement>,group:DeadlockMapGroup,index:number){
    if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();pin({kind:'point',groupId:group.id,index,...group.points[index]});return}
    const next=event.key==='Home'?0:event.key==='End'?group.points.length-1:['ArrowRight','ArrowDown'].includes(event.key)?(index+1)%group.points.length:['ArrowLeft','ArrowUp'].includes(event.key)?(index+group.points.length-1)%group.points.length:null
    if(next===null)return
    event.preventDefault();event.stopPropagation()
    const nextPoint=event.currentTarget.parentElement?.children.item(next) as SVGElement|null
    nextPoint?.focus()
  }
  useEffect(()=>()=>{if(hideTimer.current)clearTimeout(hideTimer.current)},[])
  useEffect(()=>{
    if(!hint)return
    function outside(event:globalThis.PointerEvent){if(!stage.current?.contains(event.target as Node))dismiss()}
    function escape(event:globalThis.KeyboardEvent){if(event.key==='Escape'&&!event.defaultPrevented){event.preventDefault();dismiss(Boolean(bubble.current?.contains(document.activeElement)))}}
    document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape)
    return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape)}
  },[hint,dismiss])
  useLayoutEffect(()=>{
    if(!hint||!stage.current||!map.current||!bubble.current)return
    const target=hint.target,key=mapTargetKey(target)
    function update(){
      if(!stage.current||!map.current||!bubble.current)return
      const frame=stage.current.getBoundingClientRect(),rect=map.current.getBoundingClientRect()
      const x=rect.left+(team==='sapphire'?1-target.x:target.x)*rect.width-frame.left,y=rect.top+(team==='sapphire'?1-target.y:target.y)*rect.height-frame.top
      if(x<0||y<0||x>frame.width||y>frame.height){setHint(current=>current&&mapTargetKey(current.target)===key?null:current);return}
      const tip=bubble.current.getBoundingClientRect(),next={key,...placeMapTooltip(x,y,frame.width,frame.height,tip.width,Math.min(tip.height,frame.height-16))}
      setPosition(previous=>previous.key===next.key&&Math.abs(previous.left-next.left)<.5&&Math.abs(previous.top-next.top)<.5&&previous.maxHeight===next.maxHeight?previous:next)
    }
    update()
    const observer=new ResizeObserver(update);observer.observe(stage.current);observer.observe(bubble.current)
    window.addEventListener('resize',update);window.addEventListener('scroll',update,true)
    return()=>{observer.disconnect();window.removeEventListener('resize',update);window.removeEventListener('scroll',update,true)}
  },[hint,team])
  function toggle(group: DeadlockMapGroup) {
    dismiss()
    setVisible(previous => { const next = new Set(previous); if (next.has(group.id)) next.delete(group.id); else next.add(group.id); return next })
    setSelected(group.id)
  }
  function preset(category: DeadlockMapGroup['category']) {
    dismiss()
    const groups = atlas.groups.filter(group => group.category === category)
    setVisible(new Set(groups.map(group => group.id)))
    setSelected(groups[0].id)
  }
  function changeZoom(value: number) {
    dismiss()
    const next = Math.max(1, Math.min(3, value))
    const container = viewport.current
    const center = container ? { x: (container.scrollLeft + container.clientWidth / 2) / zoom, y: (container.scrollTop + container.clientHeight / 2) / zoom } : null
    setZoom(next)
    if (container && center) requestAnimationFrame(() => container.scrollTo({ left: center.x * next - container.clientWidth / 2, top: center.y * next - container.clientHeight / 2 }))
  }
  return <section className={styles.atlas} aria-label="Explorar el mapa de Deadlock" data-deadlock-atlas>
    <div className={styles.heading}><div><p className={styles.eyebrow}>ELIGE QUÉ QUIERES ENCONTRAR</p><h2>{atlas.name}</h2></div><span className={styles.badge}>3 calles · 2 bases</span></div>
    <div className={styles.layers} role="group" aria-label="Plano del mapa">{atlas.layers.map(item => <button type="button" key={item.id} aria-pressed={layer === item.id} onClick={() => {dismiss();setLayer(item.id)}}>{item.label}</button>)}</div>
    <div className={styles.layers} role="group" aria-label="Orientación del mapa"><button type="button" aria-pressed={team === 'amber'} onClick={() => {dismiss();setTeam('amber')}}>Ámbar abajo</button><button type="button" aria-pressed={team === 'sapphire'} onClick={() => {dismiss();setTeam('sapphire')}}>Zafiro abajo</button></div>
    <div className={styles.tools}>
      <div className={styles.presets} role="group" aria-label="Selección rápida de capas">{presets.map(item => <button key={item.id} type="button" onClick={() => preset(item.id)}>{item.label}</button>)}<button type="button" onClick={() => {dismiss();setVisible(new Set())}}>Limpiar</button></div>
      <div className={styles.zoom} role="group" aria-label="Ampliación del mapa"><button type="button" aria-label="Alejar mapa" disabled={zoom === 1} onClick={() => changeZoom(zoom - .5)}><Minus size={16} aria-hidden /></button><output aria-live="polite">{Math.round(zoom * 100)} %</output><button type="button" aria-label="Acercar mapa" disabled={zoom === 3} onClick={() => changeZoom(zoom + .5)}><Plus size={16} aria-hidden /></button><button type="button" aria-label="Restablecer mapa" onClick={() => { changeZoom(1); setLayer(atlas.layers[0].id); setVisible(new Set(atlas.groups.filter(group => group.defaultVisible).map(group => group.id))); setSelected(atlas.groups[0].id); setLanes(true); setTeam('amber') }}><RotateCcw size={16} aria-hidden /></button></div>
    </div>
    <div className={styles.stage} ref={stage} data-map-stage>
    <div className={styles.viewport} ref={viewport} tabIndex={0} role="region" aria-label="Plano ampliable; usa las flechas para desplazarte" aria-describedby={`${id}-hint`}>
      <svg ref={map} data-map-canvas viewBox="0 0 1000 1000" className={styles.map} style={{ width: `${zoom * 100}%` }} role="group" aria-label={`${atlas.name}: ${image.label}; ${team === 'amber' ? 'Ámbar' : 'Zafiro'} abajo`}
        onPointerEnter={()=>{dismissedHover.current=null}}
        onPointerDown={event=>{pointerType.current=event.pointerType}}
        onPointerMove={event=>{if(event.pointerType==='touch'||hint?.pinned)return;const target=hit(event);if(target&&dismissedHover.current===mapTargetKey(target))return;dismissedHover.current=null;if(target)show(target);else scheduleHide()}}
        onPointerLeave={scheduleHide}
        onClick={event=>{const target=hit(event);if(target)pin(target);else dismiss()}}>
        <desc>La leyenda permite mostrar objetivos, recursos y rutas. Cada marcador tiene una explicación al pasar el ratón, tocarlo o enfocarlo con el teclado.</desc>
        <g data-map-orientation={team} transform={team === 'sapphire' ? 'rotate(180 500 500)' : undefined}>
        {layer !== atlas.layers[0].id && <image href={atlas.layers[0].image} x="0" y="0" width="1000" height="1000" opacity=".3" className={styles.floor} />}
        <image href={image.image} x="0" y="0" width="1000" height="1000" className={styles.floor} data-map-layer={image.id} />
        {lanes && atlas.lanes.map((lane,index) => <polyline key={lane.name} data-map-lane={lane.name} data-map-target={`lane-${index}`} points={lanePaths[index]} fill="none" stroke={lane.color} strokeWidth="5" strokeDasharray="10 7" opacity=".8"
          className={styles.lane} role="button" tabIndex={0} aria-label={`Tirolina de ${lane.name}`} aria-describedby={hint&&mapTargetKey(hint.target)===`lane-${index}`?`${id}-tooltip`:undefined}
          onFocus={event=>{if(suppressedFocus.current===event.currentTarget){suppressedFocus.current=null;return}const p=lane.points[Math.floor(lane.points.length/2)];show({kind:'lane',index,x:p.x,y:p.y},true)}}
          onBlur={event=>{if(!bubble.current?.contains(event.relatedTarget as Node))scheduleHide()}}
          onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();const p=lane.points[Math.floor(lane.points.length/2)];pin({kind:'lane',index,x:p.x,y:p.y})}}}
          onClick={event=>{event.stopPropagation();const p=lane.points[Math.floor(lane.points.length/2)];pin(event.detail?hit(event)??{kind:'lane',index,x:p.x,y:p.y}:{kind:'lane',index,x:p.x,y:p.y})}} />)}
        {groups.map(group => <g key={group.id} data-map-group={group.id} role="group" aria-label={group.label}>{group.points.map((p, i) => {
          const x = p.x * 1000, y = p.y * 1000, color = p.team ? teamColor[p.team] : group.color
          const large = group.points.length <= 16
          const upright = team === 'sapphire' ? `rotate(180 ${x} ${y})` : undefined
          const key=`${group.id}-${i}`,target:MapTarget={kind:'point',groupId:group.id,index:i,x:p.x,y:p.y}
          return <g key={i} data-map-point={key} data-map-target={key} data-active={hint&&mapTargetKey(hint.target)===key?true:undefined} className={styles.marker}
            role="button" tabIndex={(focusedPoints[group.id]??0)===i?0:-1} aria-label={`${p.label??group.label} · punto ${i+1} de ${group.points.length}`} aria-describedby={hint&&mapTargetKey(hint.target)===key?`${id}-tooltip`:undefined}
            onFocus={event=>{setFocusedPoints(previous=>previous[group.id]===i?previous:{...previous,[group.id]:i});if(suppressedFocus.current===event.currentTarget){suppressedFocus.current=null;return}show(target,true)}}
            onBlur={event=>{if(!bubble.current?.contains(event.relatedTarget as Node))scheduleHide()}}
            onKeyDown={event=>keyPoint(event,group,i)} onClick={event=>{event.stopPropagation();pin(target)}}>
            {group.icon ? <image href={group.icon} x={x - 11} y={y - 11} width="22" height="22" transform={upright} aria-hidden="true" /> : <><circle cx={x} cy={y} r={large ? 10 : 4} fill={color} stroke="#11170d" strokeWidth={large ? 2 : 1} aria-hidden="true" />{large && <text x={x} y={y} fill="#11170d" textAnchor="middle" dominantBaseline="central" fontSize="11" fontFamily="sans-serif" fontWeight="800" transform={upright} aria-hidden="true">{group.symbol}</text>}</>}</g>
        })}</g>)}
        </g>
      </svg>
    </div>
    {hint&&content&&<div ref={bubble} className={styles.bubble} style={{left:position.left,top:position.top,maxHeight:position.maxHeight,visibility:position.key===mapTargetKey(hint.target)?'visible':'hidden'}} data-map-bubble data-pinned={hint.pinned||undefined} onPointerEnter={cancelHide} onPointerLeave={scheduleHide}>
      <div id={`${id}-tooltip`} role="tooltip"><strong className={styles.bubbleTitle}>{content.title}</strong>{content.category&&<span className={styles.bubbleCategory}>{content.category}</span>}<p className={styles.bubbleDescription}>{content.description}</p></div>
      <button className={styles.close} type="button" aria-label="Cerrar explicación del mapa" onClick={()=>dismiss(true)}><X size={16} aria-hidden="true" /></button>
    </div>}
    </div>
    <p id={`${id}-hint`} className={styles.hint}>Pasa el ratón por un punto para ver qué es; haz clic o tócalo para fijar la explicación. Tab elige un grupo, las flechas recorren sus puntos y Esc cierra el bocadillo. Amplía para distinguirlos; los puntos se proyectan desde arriba y pueden estar a distinta altura.</p>
    <label className={styles.laneToggle}><input type="checkbox" checked={lanes} onChange={event => {dismiss();setLanes(event.target.checked)}} />Mostrar las tres tirolinas</label>
    <details className={styles.legend}><summary>Capas y leyenda <span>{visible.size} visibles</span></summary><div className={styles.checks}>{atlas.groups.map(group => <label key={group.id}><input type="checkbox" checked={visible.has(group.id)} onChange={() => toggle(group)} aria-label={`Mostrar ${group.label}`} /><span className={styles.symbol} style={{ color: group.color }}>{group.symbol}</span><span>{group.label}</span><small>{group.points.length}</small></label>)}</div></details>
    <div className={styles.explanation}>
      <label htmlFor={`${id}-detail`}>Qué significa cada elemento</label>
      <select id={`${id}-detail`} value={selected} onChange={event => { dismiss();const value = event.target.value; setSelected(value); setVisible(previous => new Set([...previous, value])) }}>{atlas.groups.map(group => <option key={group.id} value={group.id}>{group.label}</option>)}</select>
      <h3>{active.label}</h3><p>{active.description}</p><a href={`#apartado-${active.section}`}>Cómo funciona y cuándo disputarlo ↗</a>
    </div>
    <p className={styles.hint}>G: guardián de línea · W: Walker · P: Patrón · B: base. Ámbar en naranja; Zafiro en azul. Los puntos señalan ubicaciones posibles, no recursos que estén activos al mismo tiempo.</p>
  </section>
}
