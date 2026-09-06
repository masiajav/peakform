const OVERWATCH_FEATURES = ['gep_internal', 'game_info', 'match_info', 'kill', 'assist', 'death', 'roster']

function parseData(data) {
  if (!data) return {}
  if (typeof data === 'object') return data

  try {
    return JSON.parse(data)
  } catch {
    return { value: data }
  }
}

function pick(source, keys, fallback = '') {
  for (const key of keys) {
    if (source[key] !== undefined && source[key] !== null && source[key] !== '') {
      return String(source[key])
    }
  }

  return fallback
}

function detectTeam(data, eventName) {
  const team = pick(data, ['team', 'killer_team', 'attacker_team', 'victim_team'])
    .toLowerCase()
    .replace('local', 'ally')
    .replace('opponent', 'enemy')

  if (team.includes('enemy')) return 'enemy'
  if (team.includes('ally') || team.includes('friendly') || team.includes('blue')) return 'ally'
  if (eventName === 'kill' || eventName === 'assist') return 'ally'
  return 'unknown'
}

export function normalizeGameEvent(gameEvent) {
  const data = parseData(gameEvent.data)
  const type = String(gameEvent.name || data.event || 'unknown').toLowerCase()
  const actor = pick(data, ['killer', 'attacker', 'actor', 'player', 'source', 'name'], type === 'death' ? 'Enemy' : 'Player')
  const target = pick(data, ['victim', 'target', 'target_name', 'player_name'], type === 'death' ? 'Player' : 'Enemy')

  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    team: detectTeam(data, type),
    actor,
    target,
    hero: pick(data, ['hero', 'character', 'killer_hero', 'attacker_hero', 'victim_hero'], ''),
    timestamp: Date.now(),
    raw: gameEvent,
  }
}

export function normalizeInfoUpdate(infoUpdate) {
  const info = infoUpdate?.info ?? infoUpdate ?? {}
  const categoryUpdate = infoUpdate?.category && infoUpdate?.key
    ? { [infoUpdate.category]: { [infoUpdate.key]: infoUpdate.value ?? infoUpdate.data } }
    : {}
  const matchInfo = parseData(info.match_info ?? categoryUpdate.match_info)
  const gameInfo = parseData(info.game_info ?? categoryUpdate.game_info)

  return {
    map: pick(matchInfo, ['map', 'map_name'], pick(gameInfo, ['map', 'map_name'], 'unknown')),
    mode: pick(gameInfo, ['game_mode'], pick(matchInfo, ['mode', 'game_mode', 'game_type'], 'unknown')),
    phase: pick(gameInfo, ['game_state'], pick(matchInfo, ['phase', 'match_state', 'state'], 'unknown')).toLowerCase(),
  }
}

export function normalizeRosterUpdates(infoUpdate) {
  const entries = []
  const info = infoUpdate?.info ?? {}

  if (infoUpdate?.category === 'roster' && String(infoUpdate.key || '').startsWith('roster_')) {
    entries.push(toRosterEntry(infoUpdate.key, infoUpdate.value ?? infoUpdate.data))
  }

  const roster = parseData(info.roster)
  if (roster && typeof roster === 'object') {
    for (const [key, value] of Object.entries(roster)) {
      if (key.startsWith('roster_')) entries.push(toRosterEntry(key, value))
    }
  }

  return entries.filter(Boolean)
}

export function setupGameEvents({ onEvent, onInfo, onRoster, onStatus }) {
  if (!window.overwolf?.games?.events) {
    onStatus({
      overwolfAvailable: false,
      featuresReady: false,
      features: OVERWATCH_FEATURES,
      lastError: 'Overwolf no está disponible fuera del cliente.',
    })
    return () => {}
  }

  const eventsApi = window.overwolf.games.events
  const onNewEvents = (eventBatch) => {
    for (const gameEvent of eventBatch?.events ?? []) {
      onEvent(normalizeGameEvent(gameEvent))
    }
  }
  const onInfoUpdates = (infoUpdate) => {
    onInfo(normalizeInfoUpdate(infoUpdate))
    const rosterEntries = normalizeRosterUpdates(infoUpdate)
    if (rosterEntries.length) onRoster?.(rosterEntries)
  }
  const onError = (error) => onStatus({ lastError: error?.error || error?.reason || 'Error de Game Events' })

  eventsApi.setRequiredFeatures(OVERWATCH_FEATURES, (result) => {
    onStatus({
      overwolfAvailable: true,
      featuresReady: Boolean(result?.success),
      features: OVERWATCH_FEATURES,
      lastError: result?.success ? '' : result?.error || 'No se pudieron activar los eventos de Overwatch.',
    })
  })

  eventsApi.onNewEvents.addListener(onNewEvents)
  eventsApi.onInfoUpdates2.addListener(onInfoUpdates)
  eventsApi.onError.addListener(onError)

  return () => {
    eventsApi.onNewEvents.removeListener(onNewEvents)
    eventsApi.onInfoUpdates2.removeListener(onInfoUpdates)
    eventsApi.onError.removeListener(onError)
  }
}

function toRosterEntry(id, value) {
  const data = parseData(value)
  if (!data || typeof data !== 'object') return null

  const hero = pick(data, ['hero_name', 'hero', 'character'])
  const role = normalizeRole(pick(data, ['hero_role', 'role']))
  return {
    id,
    hero,
    role,
    isLocal: toBoolean(data.is_local),
    isTeammate: toBoolean(data.is_teammate),
  }
}

function normalizeRole(value) {
  const role = String(value || '').toLowerCase()
  if (role.includes('tank')) return 'tank'
  if (role.includes('damage') || role.includes('dps')) return 'dps'
  if (role.includes('support')) return 'support'
  return ''
}

function toBoolean(value) {
  return value === true || value === 1 || String(value).toLowerCase() === 'true'
}

export function setupHotkeys({ onToggleOverlay, onOpenDebug }) {
  if (!window.overwolf?.settings?.hotkeys) return () => {}

  const onPressed = (event) => {
    if (event.name === 'toggle_overlay') onToggleOverlay()
    if (event.name === 'open_debug') onOpenDebug()
  }

  window.overwolf.settings.hotkeys.onPressed.addListener(onPressed)
  return () => window.overwolf.settings.hotkeys.onPressed.removeListener(onPressed)
}

export function restoreWindow(name) {
  window.overwolf?.windows?.obtainDeclaredWindow(name, (result) => {
    if (result?.success && result.window?.id) {
      window.overwolf.windows.restore(result.window.id)
    }
  })
}

export function toggleWindow(name) {
  window.overwolf?.windows?.obtainDeclaredWindow(name, (result) => {
    if (!result?.success || !result.window?.id) return

    window.overwolf.windows.getWindowState(result.window.id, (stateResult) => {
      if (stateResult?.window_state === 'normal') {
        window.overwolf.windows.hide(result.window.id)
        return
      }

      window.overwolf.windows.restore(result.window.id)
    })
  })
}

export function hideWindow(name) {
  window.overwolf?.windows?.obtainDeclaredWindow(name, (result) => {
    if (result?.success && result.window?.id) {
      window.overwolf.windows.hide(result.window.id)
    }
  })
}
