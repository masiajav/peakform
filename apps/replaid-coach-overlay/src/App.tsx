import { useEffect, useMemo, useState } from 'react'
import { buildRecommendation } from './coach/rulesEngine'
import { createGepAdapter } from './overwolf/gepAdapter'
import { MatchStateStore } from './match/stateStore'
import { OverlayPanel } from './ui/OverlayPanel'
import type { MatchState, NormalizedGameEvent, OverwatchRole } from './types'

const store = new MatchStateStore()

type AppProps = {
  debugMode?: boolean
}

export function App({ debugMode = false }: AppProps) {
  const [state, setState] = useState<MatchState>(() => store.getSnapshot())
  const [visible, setVisible] = useState(true)

  useEffect(() => store.subscribe(setState), [])

  useEffect(() => {
    const adapter = createGepAdapter(
      (event: NormalizedGameEvent) => store.dispatch(event),
      (event: NormalizedGameEvent) => store.dispatch(event),
    )
    adapter.start()

    window.overwolf?.settings?.hotkeys?.onPressed?.addListener((event) => {
      if (event.name === 'toggle_overlay') setVisible((current) => !current)
      if (event.name === 'open_debug') {
        window.overwolf?.windows?.obtainDeclaredWindow?.('debug', (result) => {
          if (result.success && result.window?.id) window.overwolf?.windows?.restore?.(result.window.id)
        })
      }
    })

    return () => adapter.stop()
  }, [])

  const recommendation = useMemo(() => buildRecommendation(state), [state])

  return (
    <OverlayPanel
      state={state}
      recommendation={recommendation}
      visible={visible || debugMode}
      onRoleChange={(role: OverwatchRole) => store.setPlayerContext({ role })}
      onHeroChange={(hero) => store.setPlayerContext({ hero: hero || null })}
      onResetFight={() => store.resetFight()}
    />
  )
}

export { store as overlayStore }
