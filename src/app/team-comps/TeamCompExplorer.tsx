'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  TEAM_COMP_HEROES,
  TEAM_COMP_STYLE_LABELS,
  bestDefaultStyle,
  getTeamCompsForHero,
  type TeamCompFormat,
  type TeamCompRecommendation,
  type TeamCompStyle,
} from '@/lib/overwatch-team-comps'
import type { CounterRole } from '@/lib/overwatch-counters'

const ROLE_LABELS: Record<CounterRole | 'all', string> = {
  all: 'Todos',
  tank: 'Tank',
  dps: 'DPS',
  support: 'Support',
}

export default function TeamCompExplorer({ initialHero = 'ana' }: { initialHero?: string }) {
  const [query, setQuery] = useState('')
  const [role, setRole] = useState<CounterRole | 'all'>('all')
  const [format, setFormat] = useState<TeamCompFormat>('5v5')
  const [style, setStyle] = useState<TeamCompStyle | 'all'>('all')
  const [selectedSlug, setSelectedSlug] = useState(initialHero)

  const filteredHeroes = useMemo(() => {
    const term = normalize(query)
    return TEAM_COMP_HEROES.filter(hero => {
      const matchesRole = role === 'all' || hero.role === role
      const matchesQuery = !term || normalize(hero.name).includes(term)
      return matchesRole && matchesQuery
    })
  }, [query, role])

  const selected = TEAM_COMP_HEROES.find(hero => hero.slug === selectedSlug) ?? filteredHeroes[0] ?? TEAM_COMP_HEROES[0]
  const activeStyle = style === 'all' ? bestDefaultStyle(selected) : style
  const comps = getTeamCompsForHero(selected.slug, format, activeStyle)

  return (
    <div className="team-comp-layout">
      <section className="counter-picker" aria-label="Selector de heroes para composiciones">
        <div className="team-comp-toolbar">
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Buscar heroe..."
            aria-label="Buscar heroe"
          />
          <select value={role} onChange={event => setRole(event.target.value as CounterRole | 'all')} aria-label="Filtrar por rol">
            {Object.entries(ROLE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <select value={style} onChange={event => setStyle(event.target.value as TeamCompStyle | 'all')} aria-label="Filtrar por estilo">
            {Object.entries(TEAM_COMP_STYLE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="team-comp-format-tabs" role="tablist" aria-label="Formato de composicion">
          {(['5v5', '6v6'] as const).map(value => (
            <button
              key={value}
              type="button"
              className={format === value ? 'is-active' : ''}
              onClick={() => setFormat(value)}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="counter-hero-grid">
          {filteredHeroes.map(hero => (
            <button
              key={hero.slug}
              className={`counter-hero-button ${hero.slug === selected.slug ? 'is-active' : ''}`}
              onClick={() => setSelectedSlug(hero.slug)}
              type="button"
            >
              <span>{hero.name}</span>
              <small>{ROLE_LABELS[hero.role]}</small>
            </button>
          ))}
        </div>
      </section>

      <aside className="team-comp-panel" aria-live="polite">
        <div className="counter-panel-header">
          <div>
            <div className="eyebrow">COMPOSICION {format}</div>
            <h2>{selected.name}</h2>
            <p>{ROLE_LABELS[selected.role]} · {TEAM_COMP_STYLE_LABELS[activeStyle]} recomendado para este heroe.</p>
          </div>
          <div className="counter-panel-actions">
            <Link href={`/team-comps/${selected.slug}`} className="btn btn-secondary btn-sm">
              VER PAGINA
            </Link>
            <Link href={`/counters/${selected.slug}`} className="btn btn-primary btn-sm">
              COUNTERS
            </Link>
          </div>
        </div>

        <div className="team-comp-list">
          {comps.map(comp => (
            <TeamCompCard key={comp.id} comp={comp} />
          ))}
        </div>
      </aside>
    </div>
  )
}

function TeamCompCard({ comp }: { comp: TeamCompRecommendation }) {
  return (
    <article className="team-comp-card">
      <div className="team-comp-card-header">
        <div>
          <span>{comp.format}</span>
          <span>{TEAM_COMP_STYLE_LABELS[comp.style]}</span>
        </div>
        <h3>{comp.title}</h3>
        <p>{comp.description}</p>
      </div>

      <CompLine label={comp.format === '6v6' ? 'Tanks' : 'Tank'} heroes={comp.tanks} />
      <CompLine label="DPS" heroes={comp.dps} />
      <CompLine label="Supports" heroes={comp.supports} />

      <div className="team-comp-notes">
        <p><strong>Condicion:</strong> {comp.winCondition}</p>
        <p><strong>Evitala si:</strong> {comp.avoidWhen}</p>
        {comp.alternatives.length > 0 && (
          <p><strong>Alternativas:</strong> {comp.alternatives.join(', ')}</p>
        )}
      </div>
    </article>
  )
}

function CompLine({ label, heroes }: { label: string; heroes: string[] }) {
  return (
    <div className="team-comp-line">
      <span>{label}</span>
      <div>
        {heroes.map(hero => <strong key={hero}>{hero}</strong>)}
      </div>
    </div>
  )
}

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}
