import type { NormalizedGameEvent, TeamSide } from '../types'

export const OVERWATCH_FEATURES = ['game_info', 'match_info', 'roster', 'kill', 'assist', 'death'] as const

export interface OverwolfGameEvent {
  name?: string
  data?: string | Record<string, unknown>
}

export interface GepAdapter {
  start: () => Promise<void>
  stop: () => void
}

type EventSink = (event: NormalizedGameEvent) => void
type StatusSink = (status: NormalizedGameEvent) => void

export function createGepAdapter(onEvent: EventSink, onStatus: StatusSink): GepAdapter {
  let newEventsListener: ((event: { events?: OverwolfGameEvent[] }) => void) | null = null
  let infoListener: ((event: { info?: Record<string, unknown> }) => void) | null = null

  function emitStatus(providerStatus: 'ready' | 'limited' | 'error', raw?: unknown) {
    onStatus({
      id: createEventId('provider_status'),
      type: 'provider_status',
      timestamp: Date.now(),
      team: 'unknown',
      raw: { providerStatus, raw },
    })
  }

  return {
    async start() {
      const eventsApi = window.overwolf?.games?.events
      if (!eventsApi?.setRequiredFeatures) {
        emitStatus('limited', 'Overwolf games.events API unavailable')
        return
      }

      await new Promise<void>((resolve) => {
        eventsApi.setRequiredFeatures([...OVERWATCH_FEATURES], (result) => {
          emitStatus(result.success ? 'ready' : 'limited', result)
          resolve()
        })
      })

      newEventsListener = ({ events }) => {
        for (const event of events ?? []) {
          const normalized = normalizeOverwolfEvent(event)
          if (normalized) onEvent(normalized)
        }
      }

      infoListener = ({ info }) => {
        if (!info) return
        onEvent({
          id: createEventId('match_info'),
          type: 'match_info',
          timestamp: Date.now(),
          team: 'unknown',
          raw: info,
        })
      }

      eventsApi.onNewEvents?.addListener(newEventsListener)
      eventsApi.onInfoUpdates2?.addListener(infoListener)
    },
    stop() {
      const eventsApi = window.overwolf?.games?.events
      if (newEventsListener) eventsApi?.onNewEvents?.removeListener?.(newEventsListener)
      if (infoListener) eventsApi?.onInfoUpdates2?.removeListener?.(infoListener)
      newEventsListener = null
      infoListener = null
    },
  }
}

export function normalizeOverwolfEvent(event: OverwolfGameEvent): NormalizedGameEvent | null {
  const name = normalizeEventName(event.name)
  if (!name) return null

  const data = parseEventData(event.data)
  const team = readTeamSide(data)

  return {
    id: createEventId(name),
    type: name,
    timestamp: Date.now(),
    actor: readString(data, ['attacker', 'killer', 'player', 'source', 'name']),
    target: readString(data, ['victim', 'target', 'assisted', 'player_death']),
    hero: readString(data, ['hero', 'attackerHero', 'victimHero', 'character']),
    team,
    raw: event,
  }
}

function normalizeEventName(name?: string): NormalizedGameEvent['type'] | null {
  if (!name) return null
  if (name.includes('kill')) return 'kill'
  if (name.includes('assist')) return 'assist'
  if (name.includes('death')) return 'death'
  if (name.includes('roster')) return 'roster'
  if (name.includes('match')) return 'match_info'
  if (name.includes('game')) return 'game_info'
  return null
}

function parseEventData(data: OverwolfGameEvent['data']): Record<string, unknown> {
  if (!data) return {}
  if (typeof data === 'object') return data
  try {
    const parsed = JSON.parse(data)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return { value: data }
  }
}

function readString(data: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = data[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return null
}

function readTeamSide(data: Record<string, unknown>): TeamSide {
  const value = readString(data, ['team', 'side', 'ownerTeam'])
  if (!value) return 'unknown'
  const normalized = value.toLowerCase()
  if (['ally', 'allies', 'blue', 'friendly', 'self', 'player'].includes(normalized)) return 'ally'
  if (['enemy', 'red', 'opponent', 'opponents'].includes(normalized)) return 'enemy'
  return 'unknown'
}

function createEventId(type: string) {
  return `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
