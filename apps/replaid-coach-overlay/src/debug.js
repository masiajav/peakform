import { HEROES, MAPS, ROLE_LABELS, getHero, getMap } from './lib/picker-data.js'
import {
  clearPickerSide,
  getState,
  getViewModel,
  loadPickerScenario,
  resetPicker,
  setPicker,
  subscribe,
  togglePickerHero,
} from './lib/state.js'
import { escapeHtml } from './lib/dom.js'

const root = document.getElementById('root')
let heroRoleFilter = 'all'

const SCENARIOS = {
  brawl: {
    role: 'support',
    map: 'kings-row',
    allies: ['reinhardt', 'mei', 'cassidy', 'lucio'],
    enemies: ['winston', 'tracer'],
  },
  dive: {
    role: 'dps',
    map: 'watchpoint-gibraltar',
    allies: ['winston', 'tracer', 'ana', 'kiriko'],
    enemies: ['brigitte', 'cassidy', 'torbjorn'],
  },
  poke: {
    role: 'tank',
    map: 'circuit-royal',
    allies: ['ashe', 'sojourn', 'baptiste', 'zenyatta'],
    enemies: ['reinhardt', 'cassidy', 'bastion', 'baptiste'],
  },
}

function render(state) {
  const { recommendations } = getViewModel(state)
  const picker = state.picker
  const selectedSide = picker.selectionSide === 'enemy' ? 'enemy' : 'ally'
  const selectedSlugs = selectedSide === 'enemy' ? picker.enemies : picker.allies
  const statusLabel = state.connection.featuresReady ? 'Overwolf conectado' : 'Modo manual'

  root.innerHTML = `
    <main class="advisor-shell">
      <header class="advisor-header">
        <div>
          <span class="brand">REPLAID PICK LAB</span>
          <h1>Sinergias y counters</h1>
          <p>Compara la composición y encuentra tres picks explicables.</p>
        </div>
        <div class="header-actions">
          <span class="connection-badge ${state.connection.featuresReady ? 'is-live' : ''}">${statusLabel}</span>
          <button class="quiet-button" type="button" data-action="reset">Restablecer</button>
        </div>
      </header>

      <section class="setup-band" aria-label="Contexto de partida">
        <div class="control-group">
          <span class="control-label">Tu rol</span>
          <div class="segmented-control">
            ${Object.entries(ROLE_LABELS).map(([role, label]) => `
              <button type="button" data-picker-role="${role}" class="${picker.role === role ? 'is-active' : ''}">${label}</button>
            `).join('')}
          </div>
        </div>

        <label class="control-group map-control">
          <span class="control-label">Mapa</span>
          <select data-picker-map>
            ${MAPS.map((map) => `<option value="${map.slug}" ${picker.map === map.slug ? 'selected' : ''}>${escapeHtml(map.name)} · ${map.mode}</option>`).join('')}
          </select>
        </label>

        <div class="control-group scenario-control">
          <span class="control-label">Escenarios</span>
          <div class="scenario-buttons">
            <button type="button" data-scenario="brawl">Brawl</button>
            <button type="button" data-scenario="dive">Dive</button>
            <button type="button" data-scenario="poke">Poke</button>
          </div>
        </div>
      </section>

      <section class="lineups" aria-label="Composiciones">
        ${renderLineup('Tu equipo', 'ally', picker.allies, 4)}
        ${renderLineup('Rivales visibles', 'enemy', picker.enemies, 5)}
      </section>

      <section class="workspace-grid">
        <section class="hero-picker" aria-label="Selector de héroes">
          <div class="panel-heading">
            <div>
              <span class="section-kicker">AÑADIR HÉROES</span>
              <h2>${selectedSide === 'enemy' ? 'Rivales' : 'Aliados'}</h2>
            </div>
            <div class="segmented-control compact">
              <button type="button" data-selection-side="ally" class="${selectedSide === 'ally' ? 'is-active' : ''}">Aliados</button>
              <button type="button" data-selection-side="enemy" class="${selectedSide === 'enemy' ? 'is-active' : ''}">Rivales</button>
            </div>
          </div>

          <div class="hero-toolbar">
            <input type="search" data-hero-search placeholder="Buscar héroe" aria-label="Buscar héroe" />
            <div class="role-filters" aria-label="Filtrar héroes por rol">
              ${renderRoleFilter('all', 'Todos')}
              ${Object.entries(ROLE_LABELS).map(([role, label]) => renderRoleFilter(role, label)).join('')}
            </div>
          </div>

          <div class="hero-grid">
            ${HEROES.filter((hero) => heroRoleFilter === 'all' || hero.role === heroRoleFilter).map((hero) => renderHeroButton(hero, selectedSlugs)).join('')}
          </div>
        </section>

        <aside class="recommendation-panel" aria-live="polite">
          <div class="panel-heading">
            <div>
              <span class="section-kicker">RECOMENDACIÓN</span>
              <h2>Top picks · ${escapeHtml(getMap(picker.map).name)}</h2>
            </div>
            <span class="role-chip">${ROLE_LABELS[picker.role]}</span>
          </div>
          <div class="recommendation-list">
            ${recommendations.map((recommendation, index) => renderRecommendation(recommendation, index)).join('')}
          </div>
          <p class="model-note">Puntuación orientativa basada en relaciones curadas para el MVP; no utiliza win rates.</p>
        </aside>
      </section>
    </main>
  `
}

function renderLineup(title, side, slugs, limit) {
  const slots = Array.from({ length: limit }, (_, index) => {
    const hero = getHero(slugs[index])
    if (!hero) return '<div class="lineup-slot is-empty"><span>Vacío</span></div>'
    return `
      <button type="button" class="lineup-slot" data-remove-hero="${hero.slug}" data-remove-side="${side}" title="Quitar ${escapeHtml(hero.name)}">
        <img src="${hero.portrait}" alt="" />
        <span>${escapeHtml(hero.name)}</span>
        <b aria-hidden="true">&times;</b>
      </button>
    `
  }).join('')

  return `
    <article class="lineup-block">
      <header>
        <h2>${title}</h2>
        <button type="button" data-clear-side="${side}" class="text-button">Limpiar</button>
      </header>
      <div class="lineup-slots">${slots}</div>
    </article>
  `
}

function renderRoleFilter(role, label) {
  return `<button type="button" data-hero-role-filter="${role}" class="${heroRoleFilter === role ? 'is-active' : ''}">${label}</button>`
}

function renderHeroButton(hero, selectedSlugs) {
  const selected = selectedSlugs.includes(hero.slug)
  return `
    <button type="button" class="hero-button ${selected ? 'is-selected' : ''}" data-add-hero="${hero.slug}" data-search-name="${escapeHtml(hero.name.toLowerCase())}" title="${selected ? 'Quitar' : 'Añadir'} ${escapeHtml(hero.name)}">
      <img src="${hero.portrait}" alt="" />
      <span>${escapeHtml(hero.name)}</span>
      <small>${ROLE_LABELS[hero.role]}</small>
    </button>
  `
}

function renderRecommendation(recommendation, index) {
  const labels = ['Mejor encaje', 'Alternativa', 'Pick flexible']
  return `
    <article class="recommendation-card ${index === 0 ? 'is-best' : ''}">
      <div class="recommendation-rank">${index + 1}</div>
      <img src="${recommendation.hero.portrait}" alt="" />
      <div class="recommendation-copy">
        <span>${labels[index]}</span>
        <h3>${escapeHtml(recommendation.hero.name)}</h3>
        <p>${escapeHtml(recommendation.reasons[0])}</p>
        ${recommendation.reasons[1] ? `<small>${escapeHtml(recommendation.reasons[1])}</small>` : ''}
      </div>
      <div class="score-column">
        <strong>${recommendation.score}</strong>
        <span>score</span>
        ${metric('SIN', recommendation.synergy)}
        ${metric('CTR', recommendation.matchup)}
        ${metric('MAP', recommendation.mapFit)}
      </div>
    </article>
  `
}

function metric(label, value) {
  return `<div class="metric"><span>${label}</span><i><b style="width:${value}%"></b></i><em>${value}</em></div>`
}

root.addEventListener('click', (event) => {
  const button = event.target.closest('button')
  if (!button) return

  if (button.dataset.action === 'reset') resetPicker()
  if (button.dataset.pickerRole) setPicker({ role: button.dataset.pickerRole })
  if (button.dataset.selectionSide) setPicker({ selectionSide: button.dataset.selectionSide })
  if (button.dataset.addHero) togglePickerHero(getState().picker.selectionSide, button.dataset.addHero)
  if (button.dataset.removeHero) togglePickerHero(button.dataset.removeSide, button.dataset.removeHero)
  if (button.dataset.clearSide) clearPickerSide(button.dataset.clearSide)
  if (button.dataset.scenario) loadPickerScenario(SCENARIOS[button.dataset.scenario])
  if (button.dataset.heroRoleFilter) {
    heroRoleFilter = button.dataset.heroRoleFilter
    render(getState())
  }
})

root.addEventListener('change', (event) => {
  if (event.target.matches('[data-picker-map]')) setPicker({ map: event.target.value })
})

root.addEventListener('input', (event) => {
  if (!event.target.matches('[data-hero-search]')) return
  const query = event.target.value.trim().toLowerCase()
  for (const button of root.querySelectorAll('[data-search-name]')) {
    button.hidden = query && !button.dataset.searchName.includes(query)
  }
})

subscribe(render)
