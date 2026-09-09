import { hideWindow, setupGameEvents, setupHotkeys, restoreWindow, toggleWindow } from './lib/overwolf.js'
import { dispatchEvent, setConnection, syncRoster, updateMatch } from './lib/state.js'

setConnection({
  overwolfAvailable: Boolean(window.overwolf),
  lastError: window.overwolf ? '' : 'Vista de desarrollo: el SDK de Overwolf no está inyectado.',
})

setupGameEvents({
  onEvent: dispatchEvent,
  onInfo: (matchUpdate) => {
    updateMatch(matchUpdate)
    if (matchUpdate.phase === 'role_select_screen_start' || matchUpdate.phase === 'game_loaded') {
      restoreWindow('ingame')
    }
    if (matchUpdate.phase === 'match_in_progress' || matchUpdate.phase === 'match_ended') {
      hideWindow('ingame')
    }
  },
  onRoster: syncRoster,
  onStatus: setConnection,
})

setupHotkeys({
  onToggleOverlay: () => toggleWindow('ingame'),
  onOpenDebug: () => restoreWindow('debug'),
})
