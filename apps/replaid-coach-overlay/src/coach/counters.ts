import type { OverwatchRole } from '../types'

type CounterPlan = {
  swaps: Partial<Record<OverwatchRole, string>>
  adjustment: string
}

export const COUNTER_PLANS: Record<string, CounterPlan> = {
  tracer: {
    swaps: { support: 'Brigitte', dps: 'Cassidy', tank: 'Winston', flex: 'Brigitte' },
    adjustment: 'Juega más cerca de peel y guarda una herramienta defensiva para su entrada.',
  },
  genji: {
    swaps: { support: 'Moira', dps: 'Mei', tank: 'Zarya', flex: 'Moira' },
    adjustment: 'Espera su dash antes de invertir recursos grandes y castiga cuando no tenga salida.',
  },
  widowmaker: {
    swaps: { tank: 'Winston', dps: 'Sombra', support: 'Kiriko', flex: 'Sombra' },
    adjustment: 'Evita sightlines largas y rota con cobertura hasta que alguien pueda presionarla.',
  },
  dva: {
    swaps: { tank: 'Zarya', dps: 'Mei', support: 'Brigitte', flex: 'Zarya' },
    adjustment: 'No le regales high ground gratis; fuerza matriz antes de invertir daño importante.',
  },
  reaper: {
    swaps: { tank: 'D.Va', dps: 'Pharah', support: 'Lucio', flex: 'D.Va' },
    adjustment: 'Marca sus flancos cortos y guarda movilidad para salir antes de que cierre distancia.',
  },
}

export function normalizeHeroName(value?: string | null) {
  return (value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function findCounterPlan(hero?: string | null) {
  return COUNTER_PLANS[normalizeHeroName(hero)]
}
