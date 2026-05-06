import type { NormalizedGameEvent, TeamSide } from './types'

export function createDemoEvent(type: 'kill' | 'death', team: TeamSide, actor: string, target: string, hero?: string): NormalizedGameEvent {
  return {
    id: `demo-${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    team,
    actor,
    target,
    hero,
    timestamp: Date.now(),
    raw: { demo: true },
  }
}
