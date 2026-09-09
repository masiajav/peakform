import { ROLE_LABELS, getHero, getMap } from './lib/picker-data.js'
import { getViewModel, subscribe } from './lib/state.js'
import { escapeHtml } from './lib/dom.js'

const root = document.getElementById('root')

function render(state) {
  const { recommendations } = getViewModel(state)
  const map = getMap(state.picker.map)
  const status = state.connection.featuresReady ? 'LIVE' : 'MVP'

  root.innerHTML = `
    <section class="pick-overlay">
      <header>
        <div>
          <span class="brand">REPLAID PICK LAB</span>
          <strong>${escapeHtml(map.name)}</strong>
        </div>
        <div class="overlay-meta">
          <span>${ROLE_LABELS[state.picker.role]}</span>
          <b class="status-dot ${state.connection.featuresReady ? 'ready' : 'limited'}">${status}</b>
        </div>
      </header>

      <div class="compact-picks">
        ${recommendations.map((recommendation, index) => `
          <article class="compact-pick ${index === 0 ? 'is-best' : ''}">
            <span class="compact-rank">${index + 1}</span>
            <img src="${recommendation.hero.portrait}" alt="" />
            <div>
              <strong>${escapeHtml(recommendation.hero.name)}</strong>
              <p>${escapeHtml(recommendation.reasons[0])}</p>
            </div>
            <b class="compact-score">${recommendation.score}</b>
          </article>
        `).join('')}
      </div>

      <footer>
        <span>${state.picker.allies.length} aliados</span>
        <span>${state.picker.enemies.length} rivales visibles</span>
        <span>Sinergia + counter + mapa</span>
      </footer>
    </section>
  `
}

subscribe(render)
