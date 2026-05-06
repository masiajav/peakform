import { buildRecommendation } from '../coach/rulesEngine'
import { createDemoEvent } from '../demoEvents'
import type { MatchState, NormalizedGameEvent } from '../types'

type DebugPanelProps = {
  state: MatchState
  onDemoEvent: (event: NormalizedGameEvent) => void
  onResetFight: () => void
}

export function DebugPanel({ state, onDemoEvent, onResetFight }: DebugPanelProps) {
  const recommendation = buildRecommendation(state)

  return (
    <main className="debug-shell">
      <header>
        <div>
          <span className="brand">REPLAID COACH DEBUG</span>
          <h1>Eventos y estado normalizado</h1>
        </div>
        <button type="button" onClick={onResetFight}>
          Reset fight
        </button>
      </header>

      <section className="debug-actions">
        <button type="button" onClick={() => onDemoEvent(createDemoEvent('kill', 'ally', 'Player', 'Enemy Ana'))}>
          Ally first kill
        </button>
        <button type="button" onClick={() => onDemoEvent(createDemoEvent('death', 'ally', 'Tracer', 'Player', 'tracer'))}>
          Player death by Tracer
        </button>
        <button type="button" onClick={() => onDemoEvent(createDemoEvent('death', 'ally', 'Tracer', 'Support', 'tracer'))}>
          Second ally death
        </button>
        <button type="button" onClick={() => onDemoEvent(createDemoEvent('kill', 'enemy', 'Enemy Tank', 'Player'))}>
          Enemy gets pick
        </button>
      </section>

      <section className="debug-grid">
        <article>
          <h2>Match State</h2>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </article>
        <article>
          <h2>Recommendation</h2>
          <pre>{JSON.stringify(recommendation, null, 2)}</pre>
        </article>
      </section>
    </main>
  )
}
