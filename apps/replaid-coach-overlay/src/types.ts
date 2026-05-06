export type FightState = 'neutral' | 'advantage' | 'danger' | 'lost' | 'won' | 'reset'

export type TeamSide = 'ally' | 'enemy' | 'unknown'

export type OverwatchRole = 'tank' | 'dps' | 'support' | 'flex' | 'unknown'

export type NormalizedGameEventType =
  | 'game_info'
  | 'match_info'
  | 'roster'
  | 'kill'
  | 'assist'
  | 'death'
  | 'provider_status'
  | 'manual_context'

export interface NormalizedGameEvent {
  id: string
  type: NormalizedGameEventType
  timestamp: number
  actor?: string | null
  target?: string | null
  team: TeamSide
  hero?: string | null
  raw?: unknown
}

export interface PlayerContext {
  role: OverwatchRole
  hero?: string | null
}

export interface RosterPlayer {
  id: string
  name: string
  team: TeamSide
  hero?: string | null
  role?: OverwatchRole
}

export interface MatchState {
  matchId?: string | null
  map?: string | null
  mode?: string | null
  eventsAvailable: boolean
  providerStatus: 'idle' | 'ready' | 'limited' | 'error'
  player: PlayerContext
  roster: RosterPlayer[]
  recentEvents: NormalizedGameEvent[]
  allyDeaths: number
  enemyDeaths: number
  lastUpdated: number
}

export interface CoachRecommendation {
  primaryThreat: string | null
  fightState: FightState
  recommendedSwap: string | null
  playstyleAdjustment: string
  ultimateAdvice: string
  confidence: number
  reason: string
  updatedAt: number
}

export interface PostMatchReportDraft {
  matchId?: string | null
  map?: string | null
  mode?: string | null
  player: PlayerContext
  recommendations: CoachRecommendation[]
  eventsSeen: number
  createdAt: string
}
