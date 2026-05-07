'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { COUNTER_HEROES, type CounterHero, type CounterRole } from '@/lib/overwatch-counters'

const ROLE_LABELS: Record<CounterRole | 'all', string> = {
  all: 'Todos',
  tank: 'Tank',
  dps: 'DPS',
  support: 'Support',
}

export default function CounterExplorer() {
  const [query, setQuery] = useState('')
  const [role, setRole] = useState<CounterRole | 'all'>('all')
  const [selectedSlug, setSelectedSlug] = useState('ana')

  const filteredHeroes = useMemo(() => {
    const term = normalize(query)
    return COUNTER_HEROES.filter(hero => {
      const matchesRole = role === 'all' || hero.role === role
      const matchesQuery = !term || normalize(hero.name).includes(term)
      return matchesRole && matchesQuery
    })
  }, [query, role])

  const selected = COUNTER_HEROES.find(hero => hero.slug === selectedSlug) ?? filteredHeroes[0] ?? COUNTER_HEROES[0]
  const related = selected.related
    .map(slug => COUNTER_HEROES.find(hero => hero.slug === slug))
    .filter(Boolean) as CounterHero[]

  return (
    <div className="counter-layout">
      <section className="counter-picker" aria-label="Selector de héroes">
        <div className="counter-toolbar">
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Buscar héroe..."
            aria-label="Buscar héroe"
          />
          <select value={role} onChange={event => setRole(event.target.value as CounterRole | 'all')} aria-label="Filtrar por rol">
            {Object.entries(ROLE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
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

      <aside className="counter-panel" aria-live="polite">
        <div className="counter-panel-header">
          <div>
            <div className="eyebrow">MATCHUP</div>
            <h2>{selected.name}</h2>
            <p>{ROLE_LABELS[selected.role]} · counters, amenazas y guías relacionadas.</p>
          </div>
          <div className="counter-panel-actions">
            <Link href={`/counters/${selected.slug}`} className="btn btn-secondary btn-sm">
              VER COUNTERS
            </Link>
            <Link href={`/guides/${selected.guideSlug}`} className="btn btn-primary btn-sm">
              GUÍA
            </Link>
          </div>
        </div>

        <CounterList title={`Counters fuertes contra ${selected.name}`} items={selected.counters} />
        <CounterList title="Ten cuidado con" items={selected.watchOutFor} />

        <section className="counter-related">
          <h3>Guías relacionadas</h3>
          <div>
            <Link href={`/heroes/${selected.slug}`}>Página de {selected.name}</Link>
            {related.map(hero => (
              <Link key={hero.slug} href={`/heroes/${hero.slug}`}>
                {hero.name}
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </div>
  )
}

function CounterList({ title, items }: { title: string; items: { slug: string; name: string; reason: string }[] }) {
  return (
    <section className="counter-list">
      <h3>{title}</h3>
      <div>
        {items.map(item => (
          <Link key={item.slug} href={`/heroes/${item.slug}`} className="counter-matchup">
            <strong>{item.name}</strong>
            <span>{item.reason}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}
