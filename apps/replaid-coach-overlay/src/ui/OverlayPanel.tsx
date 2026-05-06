import type { CoachRecommendation, MatchState, OverwatchRole } from '../types'

type OverlayPanelProps = {
  state: MatchState
  recommendation: CoachRecommendation
  visible: boolean
  onRoleChange: (role: OverwatchRole) => void
  onHeroChange: (hero: string) => void
  onResetFight: () => void
}

const roleOptions: OverwatchRole[] = ['unknown', 'tank', 'dps', 'support', 'flex']

export function OverlayPanel({
  state,
  recommendation,
  visible,
  onRoleChange,
  onHeroChange,
  onResetFight,
}: OverlayPanelProps) {
  if (!visible) return null

  return (
    <main className="overlay-shell" aria-label="Replaid Coach Overlay">
      <header className="overlay-header">
        <div>
          <span className="brand">REPLAID COACH</span>
          <strong>{fightStateLabel(recommendation.fightState)}</strong>
        </div>
        <span className={`status-dot ${state.eventsAvailable ? 'ready' : 'limited'}`}>
          {state.eventsAvailable ? 'GEP' : 'LIMITADO'}
        </span>
      </header>

      <section className="coach-callout">
        <span>Amenaza</span>
        <strong>{recommendation.primaryThreat ?? 'Sin señal clara'}</strong>
        <p>{recommendation.playstyleAdjustment}</p>
      </section>

      <section className="coach-grid">
        <div>
          <span>Swap</span>
          <strong>{recommendation.recommendedSwap ?? 'No forzado'}</strong>
        </div>
        <div>
          <span>Ultimate</span>
          <strong>{recommendation.ultimateAdvice}</strong>
        </div>
      </section>

      <section className="coach-reason">
        <div className="confidence">
          <span>Confianza</span>
          <meter min="0" max="1" value={recommendation.confidence} />
          <b>{Math.round(recommendation.confidence * 100)}%</b>
        </div>
        <p>{recommendation.reason}</p>
      </section>

      <footer className="overlay-controls">
        <select value={state.player.role} onChange={(event) => onRoleChange(event.target.value as OverwatchRole)}>
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role === 'unknown' ? 'Rol manual' : role.toUpperCase()}
            </option>
          ))}
        </select>
        <input
          value={state.player.hero ?? ''}
          onChange={(event) => onHeroChange(event.target.value)}
          placeholder="Héroe manual"
          aria-label="Héroe manual"
        />
        <button type="button" onClick={onResetFight}>
          Reset fight
        </button>
      </footer>
    </main>
  )
}

function fightStateLabel(value: CoachRecommendation['fightState']) {
  const labels: Record<CoachRecommendation['fightState'], string> = {
    neutral: 'Pelea neutral',
    advantage: 'Ventaja',
    danger: 'Peligro',
    lost: 'Reset',
    won: 'Ganada',
    reset: 'Modo limitado',
  }
  return labels[value]
}
