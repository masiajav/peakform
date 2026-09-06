'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Check,
  Copy,
  RotateCcw,
  Search,
  Swords,
  ThumbsDown,
  ThumbsUp,
  Users,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { HERO_PORTRAITS } from '@/lib/overwatch-hero-portraits'
import { COUNTER_HEROES, type CounterPick } from '@/lib/overwatch-counters'
import {
  HEROES as PICKER_HEROES,
  MAPS as PICKER_MAPS,
} from '../../../apps/replaid-coach-overlay/src/lib/picker-data.js'
import { getPickRecommendations } from '../../../apps/replaid-coach-overlay/src/lib/picker-engine.js'
import styles from './PickLab.module.css'

type Role = 'tank' | 'dps' | 'support'
type SelectionSide = 'ally' | 'enemy'
type PickLabMode = 'recommend' | 'counters'

type Hero = {
  slug: string
  name: string
  role: Role
  styles: string[]
}

type MapEntry = {
  slug: string
  name: string
  mode: string
  styles: string[]
}

type Recommendation = {
  hero: Hero
  score: number
  synergy: number
  matchup: number
  mapFit: number
  reasons: string[]
}

type FeedbackChoice = 'synergy' | 'counter' | 'map' | 'missing'

type FeedbackRecord = {
  vote: 'up' | 'down'
  reason?: FeedbackChoice
}

const HEROES = PICKER_HEROES as Hero[]
const MAPS = PICKER_MAPS as MapEntry[]
const rankPicks = getPickRecommendations as unknown as (scenario: {
  role: Role
  map: string
  allies: string[]
  enemies: string[]
}) => Recommendation[]
const FEEDBACK_KEY = 'replaid-pick-lab-feedback-v1'

const ROLE_LABELS: Record<Role, string> = {
  tank: 'Tank',
  dps: 'DPS',
  support: 'Support',
}

const PRESETS = {
  brawl: {
    label: 'Brawl',
    role: 'support' as Role,
    map: 'kings-row',
    allies: ['reinhardt', 'mei', 'cassidy', 'lucio'],
    enemies: ['winston', 'tracer'],
  },
  dive: {
    label: 'Dive',
    role: 'dps' as Role,
    map: 'watchpoint-gibraltar',
    allies: ['winston', 'tracer', 'ana', 'kiriko'],
    enemies: ['brigitte', 'cassidy', 'torbjorn'],
  },
  poke: {
    label: 'Poke',
    role: 'tank' as Role,
    map: 'circuit-royal',
    allies: ['ashe', 'sojourn', 'baptiste', 'zenyatta'],
    enemies: ['reinhardt', 'cassidy', 'bastion', 'baptiste'],
  },
}

const NEGATIVE_REASONS: Array<{ value: FeedbackChoice; label: string }> = [
  { value: 'synergy', label: 'Mala sinergia' },
  { value: 'counter', label: 'Counter dudoso' },
  { value: 'map', label: 'No encaja en mapa' },
  { value: 'missing', label: 'Falta otro pick' },
]

export default function PickLab() {
  const [mode, setMode] = useState<PickLabMode>('recommend')
  const [role, setRole] = useState<Role>('support')
  const [mapSlug, setMapSlug] = useState('kings-row')
  const [allies, setAllies] = useState<string[]>(['reinhardt', 'mei', 'cassidy', 'lucio'])
  const [enemies, setEnemies] = useState<string[]>(['winston', 'tracer'])
  const [selectionSide, setSelectionSide] = useState<SelectionSide>('ally')
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all')
  const [query, setQuery] = useState('')
  const [feedback, setFeedback] = useState<Record<string, FeedbackRecord>>({})
  const [pendingNegative, setPendingNegative] = useState<string | null>(null)
  const [shareState, setShareState] = useState<'idle' | 'copied'>('idle')
  const [counterTarget, setCounterTarget] = useState('winston')
  const [counterRole, setCounterRole] = useState<Role | 'all'>('all')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlMode = params.get('mode')
    const urlRole = params.get('role') as Role | null
    const urlMap = params.get('map')
    const urlAllies = validHeroList(params.get('allies'))
    const urlEnemies = validHeroList(params.get('enemies'))

    if (urlMode === 'counters') setMode('counters')
    if (urlRole && ROLE_LABELS[urlRole]) setRole(urlRole)
    if (urlMap && MAPS.some(map => map.slug === urlMap)) setMapSlug(urlMap)
    if (params.has('allies')) setAllies(urlAllies.slice(0, 4))
    if (params.has('enemies')) setEnemies(urlEnemies.slice(0, 5))
    const urlTarget = params.get('target')
    const urlCounterRole = params.get('counterRole') as Role | 'all' | null
    if (urlTarget && COUNTER_HEROES.some(hero => hero.slug === urlTarget)) setCounterTarget(urlTarget)
    if (urlCounterRole && (urlCounterRole === 'all' || ROLE_LABELS[urlCounterRole])) setCounterRole(urlCounterRole)
  }, [])

  const recommendations = useMemo(
    () => rankPicks({ role, map: mapSlug, allies, enemies }),
    [role, mapSlug, allies, enemies],
  )

  const filteredHeroes = useMemo(() => {
    const term = normalize(query)
    return HEROES.filter(hero => {
      const matchesRole = roleFilter === 'all' || hero.role === roleFilter
      return matchesRole && (!term || normalize(hero.name).includes(term))
    })
  }, [query, roleFilter])

  const selectedMap = MAPS.find(map => map.slug === mapSlug) ?? MAPS[0]
  const selectedHeroes = selectionSide === 'ally' ? allies : enemies
  const selectedCounterHero = COUNTER_HEROES.find(hero => hero.slug === counterTarget) ?? COUNTER_HEROES[0]
  const counterPicks = useMemo(() => {
    const seen = new Set<string>()
    return [...selectedCounterHero.counters, ...selectedCounterHero.watchOutFor].filter(pick => {
      const hero = HEROES.find(item => item.slug === pick.slug)
      if (!hero || seen.has(pick.slug) || (counterRole !== 'all' && hero.role !== counterRole)) return false
      seen.add(pick.slug)
      return true
    })
  }, [selectedCounterHero, counterRole])

  function toggleHero(slug: string) {
    const current = selectionSide === 'ally' ? allies : enemies
    const limit = selectionSide === 'ally' ? 4 : 5
    const next = current.includes(slug)
      ? current.filter(heroSlug => heroSlug !== slug)
      : [...current, slug].slice(-limit)

    if (selectionSide === 'ally') setAllies(next)
    else setEnemies(next)
    clearEvaluation()
  }

  function removeHero(side: SelectionSide, slug: string) {
    if (side === 'ally') setAllies(current => current.filter(heroSlug => heroSlug !== slug))
    else setEnemies(current => current.filter(heroSlug => heroSlug !== slug))
    clearEvaluation()
  }

  function loadPreset(key: keyof typeof PRESETS) {
    const preset = PRESETS[key]
    setRole(preset.role)
    setMapSlug(preset.map)
    setAllies([...preset.allies])
    setEnemies([...preset.enemies])
    clearEvaluation()
  }

  function reset() {
    if (mode === 'counters') {
      setCounterTarget('winston')
      setCounterRole('all')
      setRoleFilter('all')
      setQuery('')
      clearEvaluation()
      return
    }
    loadPreset('brawl')
    setSelectionSide('ally')
    setRoleFilter('all')
    setQuery('')
  }

  function clearEvaluation() {
    setFeedback({})
    setPendingNegative(null)
  }

  function saveFeedback(heroSlug: string, vote: 'up' | 'down', reason?: FeedbackChoice) {
    const next = { ...feedback, [heroSlug]: { vote, ...(reason ? { reason } : {}) } }
    setFeedback(next)
    setPendingNegative(null)

    const payload = {
      createdAt: new Date().toISOString(),
      scenario: { role, map: mapSlug, allies, enemies },
      recommendations: recommendations.map(item => ({ hero: item.hero.slug, score: item.score })),
      evaluatedHero: heroSlug,
      vote,
      reason,
    }

    try {
      const stored = JSON.parse(window.localStorage.getItem(FEEDBACK_KEY) || '[]')
      window.localStorage.setItem(FEEDBACK_KEY, JSON.stringify([...stored, payload].slice(-100)))
    } catch {
      // The evaluation still remains visible if local storage is unavailable.
    }
  }

  async function copyScenario() {
    const url = new URL(window.location.href)
    url.search = mode === 'counters'
      ? new URLSearchParams({ mode: 'counters', target: counterTarget, counterRole }).toString()
      : new URLSearchParams({
          mode: 'recommend',
          role,
          map: mapSlug,
          allies: allies.join(','),
          enemies: enemies.join(','),
        }).toString()
    window.history.replaceState(null, '', url)

    try {
      await navigator.clipboard.writeText(url.toString())
      setShareState('copied')
      window.setTimeout(() => setShareState('idle'), 1800)
    } catch {
      setShareState('idle')
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1>Pick Lab</h1>
          <p>{mode === 'recommend' ? 'Tres picks razonados para la composición que tienes delante.' : 'Respuestas directas para el matchup que quieres resolver.'}</p>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.iconCommand} onClick={reset} title="Restablecer escenario" aria-label="Restablecer escenario">
            <RotateCcw size={17} />
          </button>
          <button type="button" className={styles.shareButton} onClick={copyScenario}>
            {shareState === 'copied' ? <Check size={16} /> : <Copy size={16} />}
            {shareState === 'copied' ? 'Copiado' : 'Compartir'}
          </button>
        </div>
      </header>

      <div className={styles.modeSwitch} role="tablist" aria-label="Modo de Pick Lab">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'recommend'}
          className={mode === 'recommend' ? styles.active : ''}
          onClick={() => { setMode('recommend'); setQuery(''); setRoleFilter('all'); clearEvaluation() }}
        >
          Recomendar pick
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'counters'}
          className={mode === 'counters' ? styles.active : ''}
          onClick={() => { setMode('counters'); setQuery(''); setRoleFilter('all'); clearEvaluation() }}
        >
          Counter rápido
        </button>
      </div>

      {mode === 'recommend' ? (
        <>
      <section className={styles.contextBar} aria-label="Contexto de partida">
        <div className={styles.controlGroup}>
          <span>Tu rol</span>
          <div className={styles.segmented}>
            {(Object.keys(ROLE_LABELS) as Role[]).map(value => (
              <button key={value} type="button" className={role === value ? styles.active : ''} onClick={() => { setRole(value); clearEvaluation() }}>
                {ROLE_LABELS[value]}
              </button>
            ))}
          </div>
        </div>

        <label className={styles.mapControl}>
          <span>Mapa</span>
          <select value={mapSlug} onChange={event => { setMapSlug(event.target.value); clearEvaluation() }}>
            {MAPS.map(map => <option key={map.slug} value={map.slug}>{map.name} · {map.mode}</option>)}
          </select>
        </label>

        <div className={styles.controlGroup}>
          <span>Escenarios</span>
          <div className={styles.presets}>
            {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map(key => (
              <button key={key} type="button" onClick={() => loadPreset(key)}>{PRESETS[key].label}</button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.lineups} aria-label="Composiciones">
        <Lineup
          title="Tu equipo"
          icon={<Users size={15} />}
          heroes={allies}
          limit={4}
          side="ally"
          onClear={() => { setAllies([]); clearEvaluation() }}
          onRemove={removeHero}
        />
        <Lineup
          title="Rivales visibles"
          icon={<Swords size={15} />}
          heroes={enemies}
          limit={5}
          side="enemy"
          onClear={() => { setEnemies([]); clearEvaluation() }}
          onRemove={removeHero}
        />
      </section>

      <div className={styles.workspace}>
        <section className={styles.heroPicker} aria-label="Selector de héroes">
          <div className={styles.panelHeading}>
            <div>
              <span className={styles.eyebrow}>AÑADIR HÉROES</span>
              <h2>{selectionSide === 'ally' ? 'Aliados' : 'Rivales'}</h2>
            </div>
            <div className={styles.sideToggle}>
              <button type="button" className={selectionSide === 'ally' ? styles.active : ''} onClick={() => setSelectionSide('ally')}>Aliados</button>
              <button type="button" className={selectionSide === 'enemy' ? styles.active : ''} onClick={() => setSelectionSide('enemy')}>Rivales</button>
            </div>
          </div>

          <div className={styles.heroToolbar}>
            <label className={styles.searchBox}>
              <Search size={16} />
              <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar héroe" aria-label="Buscar héroe" />
            </label>
            <div className={styles.roleFilters} aria-label="Filtrar héroes por rol">
              {(['all', 'tank', 'dps', 'support'] as const).map(value => (
                <button key={value} type="button" className={roleFilter === value ? styles.active : ''} onClick={() => setRoleFilter(value)}>
                  {value === 'all' ? 'Todos' : ROLE_LABELS[value]}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.heroGrid}>
            {filteredHeroes.map(hero => {
              const selected = selectedHeroes.includes(hero.slug)
              return (
                <button
                  key={hero.slug}
                  type="button"
                  className={`${styles.heroButton} ${selected ? styles.selectedHero : ''}`}
                  onClick={() => toggleHero(hero.slug)}
                  aria-pressed={selected}
                  title={`${selected ? 'Quitar' : 'Añadir'} ${hero.name}`}
                >
                  <span className={styles.heroPortrait}>
                    <Image src={HERO_PORTRAITS[hero.slug]} alt="" width={120} height={98} sizes="94px" />
                  </span>
                  <strong>{hero.name}</strong>
                  <small>{ROLE_LABELS[hero.role]}</small>
                </button>
              )
            })}
          </div>
        </section>

        <section className={styles.results} aria-live="polite">
          <div className={styles.resultsHeading}>
            <div>
              <span className={styles.eyebrow}>RECOMENDACIÓN</span>
              <h2>Top picks · {selectedMap.name}</h2>
            </div>
            <span className={styles.roleBadge}>{ROLE_LABELS[role]}</span>
          </div>

          <div className={styles.recommendationList}>
            {recommendations.map((recommendation, index) => (
              <RecommendationCard
                key={recommendation.hero.slug}
                recommendation={recommendation}
                index={index}
                feedback={feedback[recommendation.hero.slug]}
                showReasons={pendingNegative === recommendation.hero.slug}
                onPositive={() => saveFeedback(recommendation.hero.slug, 'up')}
                onNegative={() => setPendingNegative(recommendation.hero.slug)}
                onReason={reason => saveFeedback(recommendation.hero.slug, 'down', reason)}
              />
            ))}
          </div>

          <p className={styles.modelNote}>Puntuación orientativa basada en relaciones curadas; no utiliza win rates.</p>
        </section>
      </div>
        </>
      ) : (
        <section className={styles.counterWorkspace}>
          <div className={styles.heroPicker}>
            <div className={styles.panelHeading}>
              <div>
                <span className={styles.eyebrow}>HÉROE RIVAL</span>
                <h2>{selectedCounterHero.name}</h2>
              </div>
              <span className={styles.roleBadge}>{ROLE_LABELS[selectedCounterHero.role]}</span>
            </div>

            <div className={styles.heroToolbar}>
              <label className={styles.searchBox}>
                <Search size={16} />
                <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar rival" aria-label="Buscar héroe rival" />
              </label>
              <div className={styles.roleFilters} aria-label="Filtrar rivales por rol">
                {(['all', 'tank', 'dps', 'support'] as const).map(value => (
                  <button key={value} type="button" className={roleFilter === value ? styles.active : ''} onClick={() => setRoleFilter(value)}>
                    {value === 'all' ? 'Todos' : ROLE_LABELS[value]}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.heroGrid}>
              {filteredHeroes.map(hero => (
                <button
                  key={hero.slug}
                  type="button"
                  className={`${styles.heroButton} ${hero.slug === counterTarget ? styles.selectedHero : ''}`}
                  onClick={() => { setCounterTarget(hero.slug); clearEvaluation() }}
                  aria-pressed={hero.slug === counterTarget}
                  title={`Ver counters de ${hero.name}`}
                >
                  <span className={styles.heroPortrait}>
                    <Image src={HERO_PORTRAITS[hero.slug]} alt="" width={120} height={98} sizes="94px" />
                  </span>
                  <strong>{hero.name}</strong>
                  <small>{ROLE_LABELS[hero.role]}</small>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.counterResults} aria-live="polite">
            <div className={styles.counterResultsHeader}>
              <div>
                <span className={styles.eyebrow}>COUNTER RÁPIDO</span>
                <h2>Respuestas contra {selectedCounterHero.name}</h2>
              </div>
              <Link href={`/counters/${selectedCounterHero.slug}`}>Ver matchup completo</Link>
            </div>

            <div className={styles.counterRoleFilter} aria-label="Filtrar counters por rol">
              {(['all', 'tank', 'dps', 'support'] as const).map(value => (
                <button key={value} type="button" className={counterRole === value ? styles.active : ''} onClick={() => setCounterRole(value)}>
                  {value === 'all' ? 'Todos los roles' : ROLE_LABELS[value]}
                </button>
              ))}
            </div>

            {counterPicks.length ? (
              <div className={styles.counterList}>
                {counterPicks.map((pick, index) => (
                  <CounterResult
                    key={pick.slug}
                    pick={pick}
                    index={index}
                    targetName={selectedCounterHero.name}
                    feedback={feedback[pick.slug]}
                    showReasons={pendingNegative === pick.slug}
                    onPositive={() => saveCounterFeedback(pick, 'up')}
                    onNegative={() => setPendingNegative(pick.slug)}
                    onReason={reason => saveCounterFeedback(pick, 'down', reason)}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyCounters}>
                <strong>Sin counter directo en este rol</strong>
                <span>Prueba con todos los roles para ver las respuestas disponibles.</span>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  )

  function saveCounterFeedback(pick: CounterPick, vote: 'up' | 'down', reason?: FeedbackChoice) {
    const next = { ...feedback, [pick.slug]: { vote, ...(reason ? { reason } : {}) } }
    setFeedback(next)
    setPendingNegative(null)

    try {
      const stored = JSON.parse(window.localStorage.getItem(FEEDBACK_KEY) || '[]')
      const payload = {
        createdAt: new Date().toISOString(),
        mode: 'counters',
        target: selectedCounterHero.slug,
        counterRole,
        evaluatedHero: pick.slug,
        vote,
        reason,
      }
      window.localStorage.setItem(FEEDBACK_KEY, JSON.stringify([...stored, payload].slice(-100)))
    } catch {
      // The evaluation still remains visible if local storage is unavailable.
    }
  }
}

function Lineup({
  title,
  icon,
  heroes,
  limit,
  side,
  onClear,
  onRemove,
}: {
  title: string
  icon: React.ReactNode
  heroes: string[]
  limit: number
  side: SelectionSide
  onClear: () => void
  onRemove: (side: SelectionSide, slug: string) => void
}) {
  return (
    <div className={styles.lineupGroup}>
      <div className={styles.lineupHeader}>
        <h2>{icon}{title}</h2>
        <button type="button" onClick={onClear} disabled={!heroes.length}>Limpiar</button>
      </div>
      <div className={styles.slots} style={{ '--slot-count': limit } as CSSProperties}>
        {Array.from({ length: limit }, (_, index) => {
          const slug = heroes[index]
          const hero = slug ? HEROES.find(item => item.slug === slug) : null
          if (!hero) return <span key={`empty-${index}`} className={styles.emptySlot}>Vacío</span>
          return (
            <button key={hero.slug} type="button" className={styles.lineupHero} onClick={() => onRemove(side, hero.slug)} title={`Quitar ${hero.name}`}>
              <span><Image src={HERO_PORTRAITS[hero.slug]} alt="" width={60} height={60} sizes="32px" /></span>
              <strong>{hero.name}</strong>
              <X size={13} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function RecommendationCard({
  recommendation,
  index,
  feedback,
  showReasons,
  onPositive,
  onNegative,
  onReason,
}: {
  recommendation: Recommendation
  index: number
  feedback?: FeedbackRecord
  showReasons: boolean
  onPositive: () => void
  onNegative: () => void
  onReason: (reason: FeedbackChoice) => void
}) {
  const labels = ['MEJOR ENCAJE', 'ALTERNATIVA', 'PICK FLEXIBLE']
  return (
    <article className={`${styles.recommendation} ${index === 0 ? styles.bestRecommendation : ''}`}>
      <span className={styles.rank}>{index + 1}</span>
      <div className={styles.recommendationPortrait}>
        <Image src={HERO_PORTRAITS[recommendation.hero.slug]} alt={recommendation.hero.name} width={144} height={144} sizes="72px" />
      </div>
      <div className={styles.recommendationCopy}>
        <span>{labels[index]}</span>
        <h3>{recommendation.hero.name}</h3>
        <ul>
          {recommendation.reasons.slice(0, 2).map(reason => <li key={reason}>{reason}</li>)}
        </ul>
        <div className={styles.feedbackRow}>
          <span>¿Te parece útil?</span>
          <button type="button" className={feedback?.vote === 'up' ? styles.feedbackActive : ''} onClick={onPositive} title="Recomendación útil" aria-label={`Marcar ${recommendation.hero.name} como útil`}>
            <ThumbsUp size={14} />
          </button>
          <button type="button" className={feedback?.vote === 'down' ? styles.feedbackNegative : ''} onClick={onNegative} title="Recomendación poco útil" aria-label={`Marcar ${recommendation.hero.name} como poco útil`}>
            <ThumbsDown size={14} />
          </button>
          {feedback && <Check size={14} className={styles.feedbackCheck} aria-label="Feedback guardado" />}
        </div>
        {showReasons && (
          <div className={styles.negativeReasons}>
            {NEGATIVE_REASONS.map(reason => (
              <button key={reason.value} type="button" onClick={() => onReason(reason.value)}>{reason.label}</button>
            ))}
          </div>
        )}
      </div>
      <div className={styles.scoreBlock}>
        <strong>{recommendation.score}</strong>
        <span>Score</span>
        <Metric label="SIN" value={recommendation.synergy} />
        <Metric label="CTR" value={recommendation.matchup} />
        <Metric label="MAP" value={recommendation.mapFit} />
      </div>
    </article>
  )
}

function CounterResult({
  pick,
  index,
  targetName,
  feedback,
  showReasons,
  onPositive,
  onNegative,
  onReason,
}: {
  pick: CounterPick
  index: number
  targetName: string
  feedback?: FeedbackRecord
  showReasons: boolean
  onPositive: () => void
  onNegative: () => void
  onReason: (reason: FeedbackChoice) => void
}) {
  const hero = HEROES.find(item => item.slug === pick.slug)
  if (!hero) return null

  return (
    <article className={styles.counterResult}>
      <span className={styles.counterRank}>{index + 1}</span>
      <div className={styles.counterPortrait}>
        <Image src={HERO_PORTRAITS[pick.slug]} alt={pick.name} width={152} height={152} sizes="76px" />
      </div>
      <div className={styles.counterCopy}>
        <span>COUNTER DIRECTO · {ROLE_LABELS[hero.role]}</span>
        <h3>{pick.name}</h3>
        <p>{pick.reason}</p>
        <div className={styles.feedbackRow}>
          <span>¿Funciona contra {targetName}?</span>
          <button type="button" className={feedback?.vote === 'up' ? styles.feedbackActive : ''} onClick={onPositive} title="Counter útil" aria-label={`Marcar ${pick.name} como counter útil`}>
            <ThumbsUp size={14} />
          </button>
          <button type="button" className={feedback?.vote === 'down' ? styles.feedbackNegative : ''} onClick={onNegative} title="Counter dudoso" aria-label={`Marcar ${pick.name} como counter dudoso`}>
            <ThumbsDown size={14} />
          </button>
          {feedback && <Check size={14} className={styles.feedbackCheck} aria-label="Feedback guardado" />}
        </div>
        {showReasons && (
          <div className={styles.negativeReasons}>
            <button type="button" onClick={() => onReason('counter')}>Counter dudoso</button>
            <button type="button" onClick={() => onReason('missing')}>Falta otro pick</button>
          </div>
        )}
      </div>
    </article>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className={styles.metric}>
      <span>{label}</span>
      <i><b style={{ width: `${value}%` }} /></i>
      <em>{value}</em>
    </div>
  )
}

function validHeroList(value: string | null) {
  if (!value) return []
  const valid = new Set(HEROES.map(hero => hero.slug))
  return Array.from(new Set(value.split(',').filter(slug => valid.has(slug))))
}

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}
