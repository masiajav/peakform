import { expect, test } from 'vitest'
import { reviewedCounters } from '@/lib/reviewed-counters'
import { getCounterPillar } from '@/lib/seo-clusters'
import { editorialTopicQualityDecision, PILLAR_COUNTER_SLUGS, wordCount } from '@/lib/indexing-policy'
import { getCounterHero } from '@/lib/overwatch-counters'
import { MAP_PILLAR_SLUGS } from '@/lib/overwatch-maps'

test('reviewed counters only restore individually approved publication candidates, never ads', () => {
  for (const [slug, article] of Object.entries(reviewedCounters)) {
    expect(getCounterPillar(slug)).toBe(article)
    const revisionDate = ['sombra', 'roadhog', 'doctrine'].includes(slug) ? '2026-10-10' : ['genji', 'kiriko', 'freja', 'pharah', 'lifeweaver', 'juno', 'baptiste', 'illari', 'lucio', 'mercy', 'orisa', 'ramattra', 'sigma', 'jetpack-cat', 'wuyang', 'zenyatta', 'junker-queen', 'mauga', 'hazard', 'junkrat', 'soldier-76', 'wrecking-ball', 'venture', 'vendetta', 'anran', 'mizuki'].includes(slug) ? '2026-10-03' : '2026-10-02'
    expect(article.schemaDate).toBe(revisionDate)
    expect(wordCount(JSON.stringify(article))).toBeGreaterThan(1100)
    expect(article.threats).toHaveLength(['genji', 'kiriko'].includes(slug) ? 6 : 4)
    expect(article.examples).toHaveLength(3)
    expect(article.faqs).toHaveLength(3)
    expect(editorialTopicQualityDecision('counter', slug, article)).toMatchObject({ indexable: ['genji', 'kiriko', 'freja', 'pharah', 'lifeweaver', 'juno', 'baptiste', 'illari', 'lucio', 'mercy', 'orisa', 'ramattra', 'sigma', 'jetpack-cat', 'wuyang', 'zenyatta', 'junker-queen', 'mauga', 'hazard', 'junkrat', 'soldier-76', 'wrecking-ball', 'venture', 'vendetta', 'anran', 'mizuki', 'doctrine'].includes(slug), adsAllowed: false })
    for (const threat of article.threats) {
      const normalizeName = (name: string) => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      expect(normalizeName(getCounterHero(threat.href.slice('/heroes/'.length))?.name ?? '')).toBe(normalizeName(threat.name))
      for (const key of ['danger', 'signal', 'response'] as const) expect(wordCount(threat[key])).toBeGreaterThan(20)
    }
    for (const link of article.links) {
      if (link.href.startsWith('/maps/')) expect(MAP_PILLAR_SLUGS).toContain(link.href.slice('/maps/'.length))
    }
  }
})

test('counter revisions have distinct arguments, examples and metadata', () => {
  const paragraphs = Object.values(reviewedCounters).flatMap(article => [
    ...article.intro, ...article.adaptations, ...article.cooldownWindows.map(item => item.body),
    ...article.threats.flatMap(item => [item.danger, item.signal, item.response]), ...article.examples.map(item => item.body),
  ])
  expect(new Set(paragraphs).size).toBe(paragraphs.length)
  expect(new Set(Object.values(reviewedCounters).map(article => article.seoTitle)).size).toBe(Object.keys(reviewedCounters).length)
  expect(new Set(Object.values(reviewedCounters).map(article => article.seoDescription)).size).toBe(Object.keys(reviewedCounters).length)
})

test('Doctrine counters use launch defenses, conditional perks and antiheal distinctions', () => {
  const article = reviewedCounters.doctrine
  expect(article.analysisStatus).toBeUndefined()
  expect(article.intro.join(' ')).toContain('ya está disponible desde el 6 de octubre')
  expect(article.intro.join(' ')).toContain('8 segundos de cooldown')
  expect(article.intro.join(' ')).toContain('no protege de los críticos')
  expect(JSON.stringify(article)).toContain('Transfusión es una opción major')
  expect(JSON.stringify(article)).toContain('Succión sanguinaria es un minor opcional')
  expect(JSON.stringify(article)).toContain('Salvación es una opción minor')
  expect(JSON.stringify(article)).toContain('El precio de la vida es un major opcional')
  expect(article.cooldownWindows[3].body).toContain('6 segundos, con 4 segundos de declive')
  expect(article.threats[1].response).toContain('no quita la velocidad de ataque de los drones ni borra el overhealth')
  expect(article.links.map(link => link.href)).toContain('/team-comps/doctrine')
  expect(JSON.stringify(article)).not.toMatch(/conserva el kit del trial|balance de lanzamiento por confirmar|un major de la prueba|curación con drones.*invulnerabilidad/i)
  expect(editorialTopicQualityDecision('counter', 'doctrine', article)).toMatchObject({ indexable: true, adsAllowed: false })
  expect(editorialTopicQualityDecision('counter', 'doctrine', { ...article, h1: 'Changed without review' })).toMatchObject({ indexable: false, adsAllowed: false })
})

test('Mizuki counters separate both return positions, sanctuary borders and alternate perks from temporary modes', () => {
  const article = JSON.stringify(reviewedCounters.mizuki)
  expect(article).toContain('tanto al entrar como al salir')
  expect(article).toContain('Exposed Soul es un perk minor opcional')
  expect(article).toContain('aumenta el daño de Mizuki al objetivo')
  expect(article).toContain('Resonant Return es un perk major opcional')
  expect(article).toContain('es la alternativa a Quickstep')
  expect(article).toContain('Wellspring, un perk minor opcional')
  expect(article).not.toMatch(/Rule of Three|la cadena se engancha a paredes|Katashiro.*cura alrededor de la muñeca|Kekkai.*invulnerabilidad permanente/i)
})

test('Sombra counters use Support output reduction, preserved EMP and current perk alternatives', () => {
  const article = JSON.stringify(reviewedCounters.sombra)
  expect(reviewedCounters.sombra.role).toBe('Support')
  expect(article).toContain('Sombra ya es Support desde el 6 de octubre')
  expect(article).toContain('Weaken reduce el daño y la curación que produce el afectado')
  expect(article).toContain('no bloquea sus habilidades ni impide que reciba curación')
  expect(article).toContain('EMP conserva el hack de enemigos')
  expect(article).toContain('CTRL ALT ESC es un perk minor opcional')
  expect(article).toContain('Cybersecurity es un perk major opcional')
  expect(article).toContain('Data Packet es la alternativa major')
  expect(article).toContain('Life Hack es una opción minor')
  expect(article).not.toMatch(/Encrypted Upload|Viral Replication|High-Speed Bandwidth|Suzu limpia Virus|Si Sombra logra Hack sobre ti|EMP.*daño.*salud máxima/i)
})

test('Venture counters separate underground invulnerability, personal shields and alternate ranked perks', () => {
  const article = JSON.stringify(reviewedCounters.venture)
  expect(article).toContain('El cooldown de Drill Dash se acelera durante Burrow')
  expect(article).toContain('Anti no elimina los escudos ya obtenidos')
  expect(article).toContain('Deep Burrow es un perk minor opcional')
  expect(article).toContain('Covered In Dirt es un perk major opcional')
  expect(article).toContain('Su alternativa major, SMART Extender')
  expect(article).toContain('Excavation Exhilaration es un perk minor opcional')
  expect(article).not.toMatch(/Seismic Sense|SMART-R Excavator|Tectonic Shock.*congela|Burrow.*cura a aliados/i)
})

test('Vendetta counters distinguish directional blocking, melee deflection and current perk tiers', () => {
  const article = JSON.stringify(reviewedCounters.vendetta)
  expect(article).toContain('Warding Stance reduce daño frontal y desvía ataques melee')
  expect(article).toContain('Extra Edge es un perk minor opcional')
  expect(article).toContain('Raging Storm es un perk minor opcional')
  expect(article).toContain('Siphoning Strike es un perk major opcional')
  expect(article).toContain('Relentless es la alternativa major')
  expect(article).toContain('acertar anti tampoco cancela esa reducción')
  expect(article).not.toMatch(/Swift Vengeance|Siphoning Stance|Raging Storm es un perk major|Warding Stance.*invulnerabilidad/i)
})

test('Anran counters distinguish damage immunity, repeated burn and conditional revival', () => {
  const article = JSON.stringify(reviewedCounters.anran)
  expect(article).toContain('Durante Dancing Blaze, Anran evita todo el daño')
  expect(article).toContain('Smoulder es un perk minor opcional')
  expect(article).toContain('Heat Shield es un perk minor opcional')
  expect(article).toContain('Short Fuse es un perk major opcional')
  expect(article).toContain('es la alternativa a Hungering Blaze')
  expect(article).toContain('no una resurrección garantizada en cada baja')
  expect(article).not.toMatch(/revive automáticamente después de cada muerte|Suzu.*impide.*permanentemente|Dancing Blaze.*bloqueo frontal/i)
})

test('Junkrat counters keep normal mines and trap distinct from Stadium powers', () => {
  const article = JSON.stringify(reviewedCounters.junkrat)
  expect(article).toContain('Usar una Concussion Mine no demuestra que Junkrat haya agotado todas sus cargas')
  expect(article).toContain('Bomb Voyage es un perk minor opcional')
  expect(article).toContain('Mine Recycling, un perk major opcional')
  expect(article).toContain('Frag Cannon es un perk major opcional')
  expect(article).toContain('Nitro Boost es un perk minor opcional')
  expect(article).toContain('Total Mayhem evita el daño de sus propios explosivos')
  expect(article).not.toMatch(/Aluminum Frame|Tick Tock|Hot Potato|Trap II, Esquire|acumula scrap/i)
})

test('Soldier counters distinguish replacement healing and alternate ranked perks', () => {
  const article = JSON.stringify(reviewedCounters['soldier-76'])
  expect(article).toContain('Mientras corre, Soldier no dispara')
  expect(article).toContain('Stim Pack es un perk major opcional que sustituye Biotic Field')
  expect(article).toContain('Es la alternativa a Full Stride')
  expect(article).toContain('Helix Propulsion es un perk minor opcional')
  expect(article).toContain('Tactical Salvo es un perk minor opcional')
  expect(article).toContain('no permite disparar a través de paredes')
  expect(article).not.toMatch(/Peripheral Pulse|Cratered|Aura Cloud|Run and Gun|Double Helix/i)
})

test('Ball counters separate overhealth, optional barrier and peel from a permanent stun', () => {
  const article = JSON.stringify(reviewedCounters['wrecking-ball'])
  expect(article).toContain('Adaptive Shield da exceso de salud')
  expect(article).toContain('Adaptive Barrier es un perk major opcional')
  expect(article).toContain('es la alternativa a Hang Time')
  expect(article).toContain('Multi-Ball es un perk minor opcional')
  expect(article).toContain('Steamroller es un perk minor opcional')
  expect(article).toContain('Fuera de Rally, Shield Bash no aplica el stun')
  expect(article).not.toMatch(/Transfer Efficiency|minas manualmente|Piledriver.*cinco segundos de stun/i)
})

test('Junker Queen counters separate wounds, overhealth and optional Unstoppable from guaranteed interrupts', () => {
  const article = JSON.stringify(reviewedCounters['junker-queen'])
  expect(article).toContain('no quita el exceso de salud')
  expect(article).toContain('Battle Shout es un perk minor opcional')
  expect(article).toContain('Rampant Charge es un perk minor opcional')
  expect(article).toContain('Willy-Willy es un perk major opcional')
  expect(article).toContain('Savage Satiation es un perk major opcional')
  expect(article).toContain('confiar siempre en un control para cancelarla es arriesgado')
  expect(article).not.toMatch(/Bow Down|Blade Parade|Merciless Magnetism|Carnage.*lanza el hacha|Shout.*inmune a todo/i)
})

test('Mauga counters separate lifesteal, damage reduction, overhealth and charge from projectile mitigation', () => {
  const article = JSON.stringify(reviewedCounters.mauga)
  expect(article).toContain('No da esa reducción de daño a sus aliados')
  expect(article).toContain('Matrix no detiene el pisotón')
  expect(article).toContain('Kinetic Bandolier es un perk minor opcional')
  expect(article).toContain('Pyromaniac es un perk minor opcional')
  expect(article).toContain('Combat Fuel es un perk major opcional')
  expect(article).toContain('Firewalker es un perk major opcional')
  expect(article).not.toMatch(/Two Hearts|blobs of lava|convierte el daño recibido en curación|Overrun dura indefinidamente/i)
})

test('Hazard counters use the June ranked perk distribution and movement immobilization, not temporary modes', () => {
  const article = JSON.stringify(reviewedCounters.hazard)
  expect(article).toContain('Reconstitution es un perk minor opcional')
  expect(article).toContain('Anarchic Zeal es un perk minor opcional')
  expect(article).toContain('Deep Leap es un perk major opcional')
  expect(article).toContain('Explosive Impalements es la alternativa major')
  expect(article).toContain('La recuperación de munición de Spike Guard requiere hacer daño')
  expect(article).toContain('La inmovilización afecta al movimiento')
  expect(article).not.toMatch(/Reconstitution es un perk major|Deep Leap es un perk minor|Bonerot|Woof Woof|Bunny Hop|Downpour.*ya no inmoviliza/i)
})

test('Jetpack Cat counters distinguish permanent flight, transport and optional ranked perks', () => {
  const article = JSON.stringify(reviewedCounters['jetpack-cat'])
  expect(article).toContain('No. Tiene vuelo permanente')
  expect(article).toContain('Frenetic Flight le permite acelerar')
  expect(article).toContain('Ulterior Motive es un perk minor opcional')
  expect(article).toContain('Transport Shielding es un perk minor opcional')
  expect(article).toContain('Purrfect Form es un perk major opcional')
  expect(article).toContain('Claws Out es la alternativa')
  expect(article).not.toMatch(/grenade launcher|Territorial|Battle Fur-mation|Bell Bomb|Tomcat Reserves|Zoomies/i)
})

test('Wuyang counters separate movement, healing and optional returning wave from temporary modes', () => {
  const article = JSON.stringify(reviewedCounters.wuyang)
  expect(article).toContain('Rushing Torrent aumenta velocidad y salto; no es un teletransporte')
  expect(article).toContain('Overflow es un perk minor opcional')
  expect(article).toContain('Balance es un perk minor opcional')
  expect(article).toContain('Ebb and Flow es un perk major opcional')
  expect(article).toContain('Falling Rain es un perk major opcional')
  expect(article).toContain('tu granada no cancela')
  expect(article).not.toMatch(/Fallen Rain|Powerful Current|Bifurcation|Waveshatter|Puddle Stomp|limpia la anticuración\./i)
})

test('Zenyatta counters separate personal invulnerability, ally healing and ranked perks', () => {
  const article = JSON.stringify(reviewedCounters.zenyatta)
  expect(article).toContain('No cancela la ultimate ni elimina la invulnerabilidad de Zenyatta')
  expect(article).toContain('La curación de Transcendence tampoco convierte a todos sus aliados en invulnerables')
  expect(article).toContain('Focused Destruction es un perk major opcional')
  expect(article).toContain('Ascendance es un perk minor opcional')
  expect(article).toContain('Discordant Repair es la alternativa minor')
  expect(article).not.toMatch(/Harmonic Momentum|Transcendent Condemnation|Discord Inferno|Seeking Salvation|volar permanentemente/i)
})

test('Orisa counters distinguish Fortify, projectile interception and replacement perks', () => {
  const article = JSON.stringify(reviewedCounters.orisa)
  expect(article).toContain('no cancela Fortify ni su reducción de daño')
  expect(article).toContain('No evita la reducción de daño de Fortify')
  expect(article).toContain('Matrix intercepta Energy Javelin antes')
  expect(article).toContain('sustituye Javelin Spin por una barrera')
  expect(article).toContain('Mobile Fortification es un perk minor opcional')
  expect(article).toContain('Defense Protocol es un perk minor opcional')
  expect(article).toContain('Heavy Javelin es la alternativa')
  expect(article).not.toMatch(/Oladele-copter|Supercharger|Terra Surge.*permite volar|Javelin Spin.*refleja/i)
})

test('Ramattra counters use barrier piercing, directional Block and optional ranked perks', () => {
  const article = JSON.stringify(reviewedCounters.ramattra)
  expect(article).toContain('Pummel atraviesa barreras')
  expect(article).toContain('Block reduce daño desde delante')
  expect(article).toContain('Relentless Form es un perk minor opcional')
  expect(article).toContain('Nanite Repair es un perk major opcional')
  expect(article).toContain('Prolonged Barrier es un perk minor opcional')
  expect(article).toContain('es la alternativa major')
  expect(article).not.toMatch(/Ramparts|Recursion Relay|Retaliation|anticuración permanente|Block.*cura al absorber/i)
})

test('Sigma counters separate projectile absorption, Barrier and current ranked Flux', () => {
  const article = JSON.stringify(reviewedCounters.sigma)
  expect(article).toContain('Chain Hook puede interrumpir Grasp')
  expect(article).toContain('Experimental Barrier sigue bloqueando el gancho')
  expect(article).toContain('Kinetic Cycle es un perk minor opcional')
  expect(article).toContain('Hyper Regeneration es un perk minor opcional')
  expect(article).toContain('no se activa por disparar solo a una barrera')
  expect(article).toContain('Levitation es un perk major opcional')
  expect(article).toContain('Flux levanta a los enemigos antes de estrellarlos contra el suelo')
  expect(article).not.toContain('Community Crafted')
  expect(article).not.toMatch(/Event Horizon|Zero Gravity|Orbital Barrier|Grasp.*permite volar/i)
})

test('Lucio counters separate rush timing, overhealth and ranked perks from Stadium effects', () => {
  const article = JSON.stringify(reviewedCounters.lucio)
  expect(article).toContain('puede cambiar entre curación y velocidad')
  expect(article).toContain('no elimina el exceso de salud')
  expect(article).toContain('Soundwave Rider es un perk minor opcional')
  expect(article).toContain('Noise Violation es un perk major opcional')
  expect(article).toContain('Accelerando es la alternativa')
  expect(article).toContain('Beat Drop es un perk minor opcional')
  expect(article).toContain('no añade la explosión al aterrizar')
  expect(article).not.toMatch(/Bass Buildup|Radio Edit|Reverb|speed al robot|speed a la carga/)
})

test('Mercy counters use baseline Flash Heal and cast-time rescues, not older or temporary kits', () => {
  const article = JSON.stringify(reviewedCounters.mercy)
  expect(article).toContain('Flash Heal forma parte del kit base')
  expect(article).toContain('Double Dose es un perk major opcional')
  expect(article).toContain('Es la alternativa a Chain Boost')
  expect(article).toContain('Angelic Resurrection es un perk minor opcional')
  expect(article).toContain('Winged Reach es un perk minor opcional')
  expect(article).toContain('no convierte Resurrect en un rescate instantáneo')
  expect(article).toContain('no bloquea Resurrect')
  expect(article).not.toMatch(/Remote Resurrection|Divine Momentum|Guardian Angel puede volar hacia enemigos|resucita a cinco/)
})

test('Baptiste advice keeps the ranked kit and separates alternative perks from spent defenses', () => {
  const article = JSON.stringify(reviewedCounters.baptiste)
  expect(article).toContain('Immortality Field evita la muerte')
  expect(article).toContain('no los hace invulnerables ni limpia la anticuración')
  expect(article).toContain('Assault Burst es un perk minor opcional')
  expect(article).toContain('no le quita la curación')
  expect(article).toContain('Rocket Boots es un perk major opcional')
  expect(article).toContain('Es la alternativa a Rocket Boots')
  expect(article).not.toMatch(/Immortality Field (?:es|será|pasa a ser) (?:su |la )?(?:definitiva|ultimate)|homing|Biotic Reloader/i)
})

test('Illari advice distinguishes hitscan, projectile interception and current healing perks', () => {
  const article = JSON.stringify(reviewedCounters.illari)
  expect(article).toContain('no bloquea los tiros hitscan de Solar Rifle')
  expect(article).toContain('no limpia Sunstruck después')
  expect(article).toContain('Solar Flare es un perk major opcional')
  expect(article).toContain('ya no consume energía del rayo')
  expect(article).toContain('Es la alternativa a Sunburn')
  expect(article).toContain('Rapid Construction es un perk minor opcional')
  expect(article).toContain('Summer Solstice es un perk minor opcional')
  expect(article).not.toMatch(/Hinder|consume toda la energía|capturan el sol al mirar/i)
})

test('Lifeweaver counters cover base cleanse, recipient cancellation and persistent platform access', () => {
  const article = JSON.stringify(reviewedCounters.lifeweaver)
  expect(article).toContain('Life Grip ya limpia efectos negativos al rescatar en el kit normal')
  expect(article).toContain('El aliado puede cancelar Life Grip con el salto')
  expect(article).toContain('vuelve a bajar cuando deja de usarse')
  expect(article).toContain('Petal Protection es un perk opcional')
  expect(article).toContain('Dashing Escape es un perk opcional')
  expect(article).toContain('Superbloom es un perk opcional')
  expect(article).not.toMatch(/Cleansing Grasp es un perk|Life Cycle|recibe Grip.*inmortal/i)
})

test('Juno counters separate core ray and mutually exclusive ranked perks from Stadium changes', () => {
  const article = JSON.stringify(reviewedCounters.juno)
  expect(article).toContain('Lift Off es un perk opcional')
  expect(article).toContain('Locked On es un perk minor opcional')
  expect(article).toContain('Familiar Vitals es la alternativa')
  expect(article).toContain('no os hace daño directamente ni sigue a Juno')
  expect(article).toContain('No cancela el rayo ni elimina su aumento de daño')
  expect(article).not.toMatch(/Wormhole|Blink Boosts|Hyper Healer|Stellar Focus|Marswalking/)
})

test('Freja counters account for Take Aim refresh and optional movement perks, not Stadium powers', () => {
  const article = JSON.stringify(reviewedCounters.freja)
  expect(article).toContain('Quick Dash vuelve a habilitar Take Aim')
  expect(article).toContain('Rising Winds es un perk opcional')
  expect(article).toContain('Aerial Recovery es un perk opcional')
  expect(article).toContain('Momentum Boost también es opcional')
  expect(article).toContain('antes del impacto')
  expect(article).not.toMatch(/Lille Fælde|Redux|Seekerpoint|mini Bola|Bounty Hunting/)
})

test('Pharah counters cover moving Barrage, fuel and the supported hitscan position', () => {
  const article = JSON.stringify(reviewedCounters.pharah)
  expect(article).toContain('Barrage permite movimiento limitado en el kit normal')
  expect(article).toContain('Fuel Stores es un perk opcional')
  expect(article).toContain('Hover Jets recupera combustible en el suelo')
  expect(article).toContain('Jump Jet también aporta combustible')
  expect(article).toContain('Drift Thrusters ya no es un perk necesario')
  expect(article).not.toMatch(/Heat Seekers|Carpet Bomb|Cyclic Salvo|Nosedive|Barrage inmóvil/)
})

test('ranged counters distinguish normal abilities, optional perks and tactical responses', () => {
  const hanzo = JSON.stringify(reviewedCounters.hanzo)
  expect(hanzo).toContain('Storm Arrows ya tiene rebote en el kit normal')
  expect(hanzo).toContain('Scatter Arrows es un perk opcional')
  expect(hanzo).toContain('dragones ya desplegados')
  const widowmaker = JSON.stringify(reviewedCounters.widowmaker)
  expect(widowmaker).toContain('siga activa tras disparar')
  expect(widowmaker).toContain('no permite disparar a través de paredes normales')
  expect(reviewedCounters.widowmaker.threats.find(item => item.name === 'Lúcio')?.danger).toContain('No es un counter que tenga que ir a matar a Widow solo')
})

test('Sojourn and Emre counters do not treat perk modifications as base abilities', () => {
  const sojourn = JSON.stringify(reviewedCounters.sojourn)
  expect(sojourn).toContain('Deceleration Field es el perk que añade slow')
  expect(sojourn).toContain('no son efectos que tenga toda Sojourn al mismo tiempo')
  expect(sojourn).toContain('la energía se recarga automáticamente')
  const emre = JSON.stringify(reviewedCounters.emre)
  expect(emre).toContain('Heat Sink es un perk')
  expect(emre).toContain('Cyber Adhesion es el perk')
  expect(emre).toContain('Suppressive Security añade ese efecto')
})

test('counter dates remain explicit without invented publication dates', () => {
  for (const article of Object.values(reviewedCounters)) expect(article.publishedDate).toBeUndefined()
  for (const slug of PILLAR_COUNTER_SLUGS) {
    expect(getCounterPillar(slug)?.schemaDate, slug).toMatch(/^2026-\d{2}-\d{2}$/)
  }
  expect(getCounterPillar('genji')?.schemaDate).toBe('2026-10-03')
  expect(getCounterPillar('kiriko')?.schemaDate).toBe('2026-10-03')
})

test('Genji advice distinguishes melee blocks, elimination resets and optional perks', () => {
  const article = JSON.stringify(reviewedCounters.genji)
  expect(article).toContain('No tiene que dar siempre el último golpe')
  expect(article).toContain('Meditation es un perk opcional')
  expect(article).toContain('Swift Cuts es un perk opcional')
  expect(article).toContain('Dragon’s Thirst es un perk opcional')
  expect(article).toContain('Puede bloquearlos, pero no los devuelve')
  expect(article).toContain('Fuera de Rally')
  expect(article).not.toContain('Cancelling Dragonblade')
})

test('Kiriko advice distinguishes cleansing, prevention and already applied protection', () => {
  const article = JSON.stringify(reviewedCounters.kiriko)
  expect(article).toContain('no elimina un knockdown ya aplicado como Earthshatter')
  expect(article).toContain('Sleep es distinto y sí se limpia')
  expect(article).toContain('Matrix sobre el aliado no la borra')
  expect(article).toContain('Ready Step es un perk opcional')
  expect(article).toContain('Urgent Care es un perk opcional')
  expect(article).toContain('una barrera no borra el camino ni cancela sus buffs')
  expect(article).not.toMatch(/Shuffling|Kunai Mastery|Predatory Instincts|Two-Zu/)
})

test('peel and hook counters avoid self-targeted packs and use the released Roadhog rework', () => {
  const brigitte = JSON.stringify(reviewedCounters.brigitte)
  expect(brigitte).toContain('no puede lanzarse Repair Pack a sí misma')
  expect(brigitte).toContain('Inspiring Strike es un perk opcional')
  expect(brigitte).not.toContain('gastar un pack sobre sí misma')
  expect(brigitte).not.toContain('gira para ayudarte')
  const roadhog = JSON.stringify(reviewedCounters.roadhog)
  expect(roadhog).toContain('El rework de Season 5 está activo desde el 6 de octubre')
  expect(roadhog).toContain('Trash Compactor absorbe proyectiles de frente')
  expect(roadhog).toContain('6 segundos en 5v5 y 7 en 6v6')
  expect(roadhog).toContain('Here, Piggy Piggy, un perk minor')
  expect(roadhog).toContain('Toxic Exhaust, un perk major opcional')
  expect(roadhog).toContain('Take a Breather no limpia la anticuración')
  expect(roadhog).not.toMatch(/one.?shot garantizado|rework.*sigue pendiente|versión pendiente/i)
})

test('deployable counters distinguish optional perks and persistent ultimate hazards', () => {
  const symmetra = JSON.stringify(reviewedCounters.symmetra)
  expect(symmetra).toContain('Sentry Capacity es un perk opcional')
  expect(symmetra).toContain('Hovering Barrier es una elección de perk')
  expect(symmetra).toContain('no deshace el movimiento')
  expect(symmetra).not.toContain('Persiguir')
  const torbjorn = JSON.stringify(reviewedCounters.torbjorn)
  expect(torbjorn).toContain('Anchor Bolts es el perk')
  expect(torbjorn).toContain('Pre-Heated es un perk opcional')
  expect(torbjorn).toContain('Matrix no borra los charcos de Molten Core ya colocados')
  expect(torbjorn).not.toContain('torreta hitscan')
})

test('Moira counters separate orb interception, beams and vulnerable Fade exits', () => {
  const moira = JSON.stringify(reviewedCounters.moira)
  expect(moira).toContain('Moira puede usar Fade durante Coalescence')
  expect(moira).toContain('no dispares Sleep durante la invulnerabilidad de Fade')
  expect(moira).toContain('Matrix no bloquea esos beams')
  expect(moira).toContain('Reversal es el perk opcional')
  expect(moira).toContain('Phantom Step es un perk opcional')
  expect(moira).not.toContain('ha cruzado una pared')
  expect(moira).not.toContain('Necrotic Orb')
  expect(moira).not.toContain('Contamination')
})

test('Reaper counters account for base ranged fire and optional perk modifications', () => {
  const reaper = JSON.stringify(reviewedCounters.reaper)
  expect(reaper).toContain('Dire Triggers forma parte del kit normal')
  expect(reaper).toContain('Trigger Finger es el perk opcional')
  expect(reaper).toContain('Shadow Blink es un perk opcional')
  expect(reaper).toContain('Durante Wraith, Reaper es invulnerable y no dispara')
  expect(reaper).toContain('no protege durante toda la canalización')
  expect(reaper).not.toContain('Wretched Wings')
  expect(reaper).not.toContain('Death Step')
})

test('Echo and Sierra counters separate current perks from temporary mode changes', () => {
  const echo = JSON.stringify(reviewedCounters.echo)
  expect(echo).toContain('por debajo de la mitad de vida')
  expect(echo).toContain('Una esquina no elimina las bombas que ya tienes pegadas')
  expect(echo).toContain('Focused Rush es el perk opcional')
  expect(echo).toContain('no equivale a una ultimate disponible automáticamente')
  const sierra = JSON.stringify(reviewedCounters.sierra)
  expect(sierra).toContain('Tremor Charge produce una onda al impactar')
  expect(sierra).toContain('Locked In es el perk opcional')
  expect(sierra).toContain('Full Flight modifica el alcance')
  expect(sierra).not.toContain('Dart Redeployment')
  expect(sierra).not.toMatch(/Suzu (?:elimina|limpia) la marca/)
  expect(sierra).not.toContain('modo temporal')
  expect(`${echo} ${sierra}`).not.toMatch(/discutir (?:el ángulo|alturas|pasadas)|Discutir el vuelo/)
})

test('ranked counters account for perks without importing temporary Arcade changes', () => {
  const ashe = JSON.stringify(reviewedCounters.ashe)
  expect(ashe).toContain('otra activación')
  expect(ashe).toContain('reducción de cooldown de su subrol')
  const bastion = JSON.stringify(reviewedCounters.bastion)
  expect(bastion).toContain('Artillery')
  expect(bastion).not.toContain('Tuned Treads')
  expect(bastion).not.toContain('Configuration: Tank')
  expect(reviewedCounters.mei.threats.find(item => item.name === 'Kiriko')?.response).toContain('permanecer dentro del área')
  expect(reviewedCounters.mei.threats.find(item => item.name === 'Orisa')?.danger).toContain('No permite atravesar Ice Wall')
})

test('existing counter corrections retain original publication dates and face the target', () => {
  const originalDates: Record<string, string> = { shion: '2026-06-28', ana: '2026-06-28', zarya: '2026-07-12', tracer: '2026-07-12', domina: '2026-07-12' }
  for (const [slug, publishedDate] of Object.entries(originalDates)) {
    const article = getCounterPillar(slug)!
    expect(article).toMatchObject({ publishedDate, schemaDate: slug === 'ana' ? '2026-10-03' : '2026-10-02', updatedAt: slug === 'ana' ? '3 de octubre de 2026' : '2 de octubre de 2026' })
    expect(editorialTopicQualityDecision('counter', slug, article).indexable).toBe(false)
  }
  expect(getCounterPillar('shion')!.threats.find(item => item.name === 'Ana')!.response).toContain('Guarda Sleep')
  expect(getCounterPillar('zarya')!.threats.find(item => item.name === 'Zenyatta')!.response).toContain('Aplica Discord')
  expect(getCounterPillar('tracer')!.threats.find(item => item.name === 'Torbjörn')!.response).toContain('Coloca la torreta')
  expect(getCounterPillar('domina')!.threats.find(item => item.name === 'Bastion')!.response).toContain('Activa Assault')
  expect(JSON.stringify(getCounterPillar('ana'))).not.toMatch(/despiert[ao] a un aliado|Despertar inmediatamente a un aliado/)
  expect(getCounterPillar('ana')!.summary).toContain('Cubre al aliado dormido: tu daño no puede despertarlo.')
})
