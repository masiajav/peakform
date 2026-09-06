import { getPickRecommendations } from './picker-engine.js'
import { MAPS, normalizeHeroSlug } from './picker-data.js'

const STORAGE_KEY = 'replaid-pick-advisor-state-v1'
const CHANNEL_NAME = 'replaid-pick-advisor'
const MAX_EVENTS = 12
const channel = 'BroadcastChannel' in window ? new BroadcastChannel(CHANNEL_NAME) : null

function defaultState() {
  return {
    connection: {
      overwolfAvailable: Boolean(window.overwolf),
      featuresReady: false,
      features: [],
      lastError: '',
      updatedAt: Date.now(),
    },
    match: {
      map: 'kings-row',
      mode: 'unknown',
      phase: 'hero_select',
      roster: [],
    },
    picker: {
      role: 'support',
      map: 'kings-row',
      allies: ['reinhardt', 'mei', 'cassidy', 'lucio'],
      enemies: ['winston', 'tracer'],
      selectionSide: 'ally',
    },
    events: [],
  }
}

function readPersistedState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const persisted = JSON.parse(raw)
    const defaults = defaultState()
    return {
      ...defaults,
      ...persisted,
      connection: { ...defaults.connection, ...persisted.connection },
      match: { ...defaults.match, ...persisted.match },
      picker: { ...defaults.picker, ...persisted.picker },
    }
  } catch {
    return defaultState()
  }
}

let state = readPersistedState()

function persist(nextState) {
  state = nextState

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
  } catch {
    // Local storage can be disabled in development previews.
  }

  channel?.postMessage({ type: 'state', state: nextState })
  window.dispatchEvent(new CustomEvent('replaid-state', { detail: nextState }))
}

export function getState() {
  return state
}

export function subscribe(listener) {
  listener(state)

  const onLocalState = (event) => listener(event.detail)
  const onBroadcast = (event) => {
    if (event.data?.type === 'state') {
      state = event.data.state
      listener(state)
    }
  }
  const onStorage = (event) => {
    if (event.key !== STORAGE_KEY || !event.newValue) return
    state = JSON.parse(event.newValue)
    listener(state)
  }

  window.addEventListener('replaid-state', onLocalState)
  window.addEventListener('storage', onStorage)
  channel?.addEventListener('message', onBroadcast)

  return () => {
    window.removeEventListener('replaid-state', onLocalState)
    window.removeEventListener('storage', onStorage)
    channel?.removeEventListener('message', onBroadcast)
  }
}

export function setConnection(partialConnection) {
  persist({
    ...state,
    connection: {
      ...state.connection,
      ...partialConnection,
      updatedAt: Date.now(),
    },
  })
}

export function updateMatch(partialMatch) {
  const nextMap = resolveMapSlug(partialMatch.map)
  persist({
    ...state,
    match: { ...state.match, ...withoutEmptyValues(partialMatch), ...(nextMap ? { map: nextMap } : {}) },
    picker: nextMap ? { ...state.picker, map: nextMap } : state.picker,
  })
}

export function setPicker(partialPicker) {
  persist({
    ...state,
    picker: { ...state.picker, ...partialPicker },
  })
}

export function togglePickerHero(side, slug) {
  const key = side === 'enemy' ? 'enemies' : 'allies'
  const limit = side === 'enemy' ? 5 : 4
  const current = state.picker[key]
  const next = current.includes(slug)
    ? current.filter((heroSlug) => heroSlug !== slug)
    : [...current, slug].slice(-limit)

  setPicker({ [key]: next })
}

export function clearPickerSide(side) {
  setPicker({ [side === 'enemy' ? 'enemies' : 'allies']: [] })
}

export function loadPickerScenario(scenario) {
  setPicker({
    role: scenario.role,
    map: scenario.map,
    allies: [...scenario.allies],
    enemies: [...scenario.enemies],
  })
}

export function syncRoster(rosterEntries) {
  if (!rosterEntries?.length) return

  const rosterById = new Map(state.match.roster.map((entry) => [entry.id, entry]))
  for (const entry of rosterEntries) rosterById.set(entry.id, { ...rosterById.get(entry.id), ...entry })
  const roster = [...rosterById.values()]
  const localPlayer = roster.find((entry) => entry.isLocal)
  const allies = uniqueHeroes(roster.filter((entry) => entry.isTeammate && !entry.isLocal))
  const enemies = uniqueHeroes(roster.filter((entry) => !entry.isTeammate && !entry.isLocal))

  persist({
    ...state,
    match: { ...state.match, roster },
    picker: {
      ...state.picker,
      ...(localPlayer?.role ? { role: localPlayer.role } : {}),
      ...(allies.length ? { allies: allies.slice(0, 4) } : {}),
      ...(enemies.length ? { enemies: enemies.slice(0, 5) } : {}),
    },
  })
}

export function dispatchEvent(event) {
  persist({
    ...state,
    events: [event, ...state.events].slice(0, MAX_EVENTS),
  })
}

export function resetPicker() {
  const defaults = defaultState()
  persist({
    ...state,
    picker: defaults.picker,
    match: { ...state.match, map: defaults.match.map },
    events: [],
  })
}

export function getViewModel(currentState = state) {
  return {
    state: currentState,
    recommendations: getPickRecommendations(currentState.picker),
  }
}

function uniqueHeroes(entries) {
  return [...new Set(entries.map((entry) => normalizeHeroSlug(entry.hero)).filter(Boolean))]
}

function resolveMapSlug(value) {
  if (!value || value === 'unknown') return ''
  const normalized = String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
  return MAPS.find((entry) => {
    const slug = entry.slug.replace(/[^a-z0-9]+/g, '')
    const name = entry.name.toLowerCase().replace(/[^a-z0-9]+/g, '')
    return normalized === slug || normalized === name
  })?.slug ?? ''
}

function withoutEmptyValues(object) {
  return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== '' && value !== undefined && value !== null && value !== 'unknown'))
}
