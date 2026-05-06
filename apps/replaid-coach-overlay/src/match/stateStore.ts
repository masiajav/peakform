import type { MatchState, NormalizedGameEvent, PlayerContext } from '../types'

const MAX_RECENT_EVENTS = 40

export function createInitialMatchState(): MatchState {
  return {
    eventsAvailable: false,
    providerStatus: 'idle',
    player: { role: 'unknown', hero: null },
    roster: [],
    recentEvents: [],
    allyDeaths: 0,
    enemyDeaths: 0,
    lastUpdated: Date.now(),
  }
}

export function reduceMatchState(state: MatchState, event: NormalizedGameEvent): MatchState {
  const base: MatchState = {
    ...state,
    lastUpdated: event.timestamp,
    recentEvents: [event, ...state.recentEvents].slice(0, MAX_RECENT_EVENTS),
  }

  if (event.type === 'provider_status') {
    const raw = event.raw as { providerStatus?: MatchState['providerStatus'] } | undefined
    const providerStatus = raw?.providerStatus ?? 'limited'
    return {
      ...base,
      providerStatus,
      eventsAvailable: providerStatus === 'ready',
    }
  }

  if (event.type === 'manual_context') {
    const raw = event.raw as Partial<PlayerContext> | undefined
    return {
      ...base,
      player: {
        role: raw?.role ?? state.player.role,
        hero: raw?.hero ?? state.player.hero,
      },
    }
  }

  if (event.type === 'death') {
    if (event.team === 'ally') return { ...base, allyDeaths: state.allyDeaths + 1 }
    if (event.team === 'enemy') return { ...base, enemyDeaths: state.enemyDeaths + 1 }
  }

  if (event.type === 'kill') {
    if (event.team === 'ally') return { ...base, enemyDeaths: state.enemyDeaths + 1 }
    if (event.team === 'enemy') return { ...base, allyDeaths: state.allyDeaths + 1 }
  }

  return base
}

export class MatchStateStore {
  private state = createInitialMatchState()
  private listeners = new Set<(state: MatchState) => void>()

  getSnapshot() {
    return this.state
  }

  dispatch(event: NormalizedGameEvent) {
    this.state = reduceMatchState(this.state, event)
    this.emit()
  }

  setPlayerContext(player: Partial<PlayerContext>) {
    this.dispatch({
      id: `manual-${Date.now()}`,
      type: 'manual_context',
      timestamp: Date.now(),
      team: 'unknown',
      raw: player,
    })
  }

  resetFight() {
    this.state = {
      ...this.state,
      allyDeaths: 0,
      enemyDeaths: 0,
      recentEvents: [],
      lastUpdated: Date.now(),
    }
    this.emit()
  }

  subscribe(listener: (state: MatchState) => void) {
    this.listeners.add(listener)
    listener(this.state)
    return () => {
      this.listeners.delete(listener)
    }
  }

  private emit() {
    for (const listener of this.listeners) listener(this.state)
  }
}
