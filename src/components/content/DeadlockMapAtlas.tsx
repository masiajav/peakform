'use client'

import { useId, useRef, useState } from 'react'
import { Minus, Plus, RotateCcw } from 'lucide-react'
import type { DeadlockMapAtlas as MapAtlas, DeadlockMapGroup } from '@/lib/deadlock-map-contract'
import styles from './DeadlockMapAtlas.module.css'

const presets = [{ id: 'objectives', label: 'Objetivos' }, { id: 'resources', label: 'Recursos' }, { id: 'travel', label: 'Rutas' }] as const
const teamColor = { amber: '#e3a054', sapphire: '#6db9e9' }

export default function DeadlockMapAtlas({ atlas }: { atlas: MapAtlas }) {
  const id = useId()
  const viewport = useRef<HTMLDivElement>(null)
  const [layer, setLayer] = useState(atlas.layers[0].id)
  const [visible, setVisible] = useState(() => new Set(atlas.groups.filter(group => group.defaultVisible).map(group => group.id)))
  const [selected, setSelected] = useState(atlas.groups[0].id)
  const [lanes, setLanes] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [team, setTeam] = useState<'amber' | 'sapphire'>('amber')
  const active = atlas.groups.find(group => group.id === selected) ?? atlas.groups[0]
  const image = atlas.layers.find(item => item.id === layer) ?? atlas.layers[0]
  function toggle(group: DeadlockMapGroup) {
    setVisible(previous => { const next = new Set(previous); if (next.has(group.id)) next.delete(group.id); else next.add(group.id); return next })
    setSelected(group.id)
  }
  function preset(category: DeadlockMapGroup['category']) {
    const groups = atlas.groups.filter(group => group.category === category)
    setVisible(new Set(groups.map(group => group.id)))
    setSelected(groups[0].id)
  }
  function changeZoom(value: number) {
    const next = Math.max(1, Math.min(3, value))
    const container = viewport.current
    const center = container ? { x: (container.scrollLeft + container.clientWidth / 2) / zoom, y: (container.scrollTop + container.clientHeight / 2) / zoom } : null
    setZoom(next)
    if (container && center) requestAnimationFrame(() => container.scrollTo({ left: center.x * next - container.clientWidth / 2, top: center.y * next - container.clientHeight / 2 }))
  }
  return <section className={styles.atlas} aria-label="Explorar el mapa de Deadlock" data-deadlock-atlas>
    <div className={styles.heading}><div><p className={styles.eyebrow}>ELIGE QUÉ QUIERES ENCONTRAR</p><h2>{atlas.name}</h2></div><span className={styles.badge}>3 calles · 2 bases</span></div>
    <div className={styles.layers} role="group" aria-label="Plano del mapa">{atlas.layers.map(item => <button type="button" key={item.id} aria-pressed={layer === item.id} onClick={() => setLayer(item.id)}>{item.label}</button>)}</div>
    <div className={styles.layers} role="group" aria-label="Orientación del mapa"><button type="button" aria-pressed={team === 'amber'} onClick={() => setTeam('amber')}>Ámbar abajo</button><button type="button" aria-pressed={team === 'sapphire'} onClick={() => setTeam('sapphire')}>Zafiro abajo</button></div>
    <div className={styles.tools}>
      <div className={styles.presets} role="group" aria-label="Selección rápida de capas">{presets.map(item => <button key={item.id} type="button" onClick={() => preset(item.id)}>{item.label}</button>)}<button type="button" onClick={() => setVisible(new Set())}>Limpiar</button></div>
      <div className={styles.zoom} role="group" aria-label="Ampliación del mapa"><button type="button" aria-label="Alejar mapa" disabled={zoom === 1} onClick={() => changeZoom(zoom - .5)}><Minus size={16} aria-hidden /></button><output aria-live="polite">{Math.round(zoom * 100)} %</output><button type="button" aria-label="Acercar mapa" disabled={zoom === 3} onClick={() => changeZoom(zoom + .5)}><Plus size={16} aria-hidden /></button><button type="button" aria-label="Restablecer mapa" onClick={() => { changeZoom(1); setLayer(atlas.layers[0].id); setVisible(new Set(atlas.groups.filter(group => group.defaultVisible).map(group => group.id))); setSelected(atlas.groups[0].id); setLanes(true); setTeam('amber') }}><RotateCcw size={16} aria-hidden /></button></div>
    </div>
    <div className={styles.viewport} ref={viewport} tabIndex={0} role="region" aria-label="Plano ampliable; usa las flechas para desplazarte" aria-describedby={`${id}-hint`}>
      <svg viewBox="0 0 1000 1000" className={styles.map} style={{ width: `${zoom * 100}%` }} role="img" aria-label={`${atlas.name}: ${image.label}; ${team === 'amber' ? 'Ámbar' : 'Zafiro'} abajo`}>
        <title>{`${atlas.name} · ${image.label}`}</title><desc>La leyenda permite mostrar objetivos, recursos y rutas. Puedes girar el plano para colocar tu equipo abajo.</desc>
        <g data-map-orientation={team} transform={team === 'sapphire' ? 'rotate(180 500 500)' : undefined}>
        {layer !== atlas.layers[0].id && <image href={atlas.layers[0].image} x="0" y="0" width="1000" height="1000" opacity=".3" className={styles.floor} />}
        <image href={image.image} x="0" y="0" width="1000" height="1000" className={styles.floor} data-map-layer={image.id} />
        {lanes && atlas.lanes.map(lane => <polyline key={lane.name} data-map-lane={lane.name} points={lane.points.map(p => `${p.x * 1000},${p.y * 1000}`).join(' ')} fill="none" stroke={lane.color} strokeWidth="5" strokeDasharray="10 7" opacity=".8"><title>{`Tirolina de ${lane.name}`}</title></polyline>)}
        {atlas.groups.filter(group => visible.has(group.id)).map(group => <g key={group.id} data-map-group={group.id} aria-hidden="true">{group.points.map((p, i) => {
          const x = p.x * 1000, y = p.y * 1000, color = p.team ? teamColor[p.team] : group.color
          const large = group.points.length <= 16
          const upright = team === 'sapphire' ? `rotate(180 ${x} ${y})` : undefined
          return <g key={i}><title>{p.label ?? group.label}</title>{group.icon ? <image href={group.icon} x={x - 11} y={y - 11} width="22" height="22" transform={upright} /> : <><circle cx={x} cy={y} r={large ? 10 : 4} fill={color} stroke="#11170d" strokeWidth={large ? 2 : 1} />{large && <text x={x} y={y} fill="#11170d" textAnchor="middle" dominantBaseline="central" fontSize="11" fontFamily="sans-serif" fontWeight="800" transform={upright}>{group.symbol}</text>}</>}</g>
        })}</g>)}
        </g>
      </svg>
    </div>
    <p id={`${id}-hint`} className={styles.hint}>Amplía para ver los detalles y desplaza el plano. Cambiar de capa muestra los accesos bajo las calles; los puntos se proyectan desde arriba y pueden estar a distinta altura.</p>
    <label className={styles.laneToggle}><input type="checkbox" checked={lanes} onChange={event => setLanes(event.target.checked)} />Mostrar las tres tirolinas</label>
    <details className={styles.legend}><summary>Capas y leyenda <span>{visible.size} visibles</span></summary><div className={styles.checks}>{atlas.groups.map(group => <label key={group.id}><input type="checkbox" checked={visible.has(group.id)} onChange={() => toggle(group)} aria-label={`Mostrar ${group.label}`} /><span className={styles.symbol} style={{ color: group.color }}>{group.symbol}</span><span>{group.label}</span><small>{group.points.length}</small></label>)}</div></details>
    <div className={styles.explanation}>
      <label htmlFor={`${id}-detail`}>Qué significa cada elemento</label>
      <select id={`${id}-detail`} value={selected} onChange={event => { const value = event.target.value; setSelected(value); setVisible(previous => new Set([...previous, value])) }}>{atlas.groups.map(group => <option key={group.id} value={group.id}>{group.label}</option>)}</select>
      <h3>{active.label}</h3><p>{active.description}</p><a href={`#apartado-${active.section}`}>Cómo funciona y cuándo disputarlo ↗</a>
    </div>
    <p className={styles.hint}>G: guardián de línea · W: Walker · P: Patrón · B: base. Ámbar en naranja; Zafiro en azul. Los puntos señalan ubicaciones posibles, no recursos que estén activos al mismo tiempo.</p>
  </section>
}
