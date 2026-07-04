export const MAP_MODE_ORDER = ['Control', 'Escolta', 'Flashpoint', 'Híbrido', 'Push'] as const

export type MapMode = (typeof MAP_MODE_ORDER)[number]

export type MapCatalogEntry = {
  slug: string
  name: string
  mode: MapMode
  location: string
}

export const MAP_CATALOG: MapCatalogEntry[] = [
  { slug: 'antarctic-peninsula', name: 'Antarctic Peninsula', mode: 'Control', location: 'Antártida' },
  { slug: 'busan', name: 'Busan', mode: 'Control', location: 'Corea del Sur' },
  { slug: 'ilios', name: 'Ilios', mode: 'Control', location: 'Grecia' },
  { slug: 'lijiang-tower', name: 'Lijiang Tower', mode: 'Control', location: 'China' },
  { slug: 'nepal', name: 'Nepal', mode: 'Control', location: 'Nepal' },
  { slug: 'oasis', name: 'Oasis', mode: 'Control', location: 'Irak' },
  { slug: 'samoa', name: 'Samoa', mode: 'Control', location: 'Samoa' },
  { slug: 'circuit-royal', name: 'Circuit Royal', mode: 'Escolta', location: 'Montecarlo, Mónaco' },
  { slug: 'dorado', name: 'Dorado', mode: 'Escolta', location: 'México' },
  { slug: 'havana', name: 'Havana', mode: 'Escolta', location: 'Cuba' },
  { slug: 'junkertown', name: 'Junkertown', mode: 'Escolta', location: 'Australia' },
  { slug: 'rialto', name: 'Rialto', mode: 'Escolta', location: 'Venecia, Italia' },
  { slug: 'route-66', name: 'Route 66', mode: 'Escolta', location: 'Estados Unidos' },
  { slug: 'shambali-monastery', name: 'Shambali Monastery', mode: 'Escolta', location: 'Nepal' },
  { slug: 'watchpoint-gibraltar', name: 'Watchpoint: Gibraltar', mode: 'Escolta', location: 'Gibraltar' },
  { slug: 'aatlis', name: 'Aatlis', mode: 'Flashpoint', location: 'Marruecos' },
  { slug: 'new-junk-city', name: 'New Junk City', mode: 'Flashpoint', location: 'Australia' },
  { slug: 'suravasa', name: 'Suravasa', mode: 'Flashpoint', location: 'India' },
  { slug: 'blizzard-world', name: 'Blizzard World', mode: 'Híbrido', location: 'Estados Unidos' },
  { slug: 'eichenwalde', name: 'Eichenwalde', mode: 'Híbrido', location: 'Alemania' },
  { slug: 'hollywood', name: 'Hollywood', mode: 'Híbrido', location: 'Los Ángeles, Estados Unidos' },
  { slug: 'kings-row', name: "King's Row", mode: 'Híbrido', location: 'Londres, Reino Unido' },
  { slug: 'midtown', name: 'Midtown', mode: 'Híbrido', location: 'Nueva York, Estados Unidos' },
  { slug: 'neon-junction', name: 'Neon Junction', mode: 'Híbrido', location: 'Tokio, Japón' },
  { slug: 'numbani', name: 'Numbani', mode: 'Híbrido', location: 'Numbani' },
  { slug: 'paraiso', name: 'Paraíso', mode: 'Híbrido', location: 'Río de Janeiro, Brasil' },
  { slug: 'colosseo', name: 'Colosseo', mode: 'Push', location: 'Roma, Italia' },
  { slug: 'esperanca', name: 'Esperança', mode: 'Push', location: 'Portugal' },
  { slug: 'new-queen-street', name: 'New Queen Street', mode: 'Push', location: 'Toronto, Canadá' },
  { slug: 'runasapi', name: 'Runasapi', mode: 'Push', location: 'Perú' },
]

export function getMapsByMode(mode: MapMode) {
  return MAP_CATALOG.filter(map => map.mode === mode)
}
