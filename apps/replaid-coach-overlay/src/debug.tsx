import React from 'react'
import { createRoot } from 'react-dom/client'
import { useEffect, useState } from 'react'
import { DebugPanel } from './ui/DebugPanel'
import { overlayStore } from './App'
import type { MatchState, NormalizedGameEvent } from './types'
import './styles.css'

function DebugApp() {
  const [state, setState] = useState<MatchState>(() => overlayStore.getSnapshot())

  useEffect(() => overlayStore.subscribe(setState), [])

  return (
    <DebugPanel
      state={state}
      onDemoEvent={(event: NormalizedGameEvent) => overlayStore.dispatch(event)}
      onResetFight={() => overlayStore.resetFight()}
    />
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DebugApp />
  </React.StrictMode>,
)
