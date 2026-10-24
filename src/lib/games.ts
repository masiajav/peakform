export type GameId = 'overwatch' | 'deadlock'
export const GAMES = {
  overwatch: { name: 'Overwatch', href: '/overwatch', accent: '#ff6b2b', description: 'Héroes, mapas y decisiones para mejorar en cada partida.' },
  deadlock: { name: 'Deadlock', href: '/deadlock', accent: '#c5d99b', description: 'Guías de héroes, builds para importar y el mapa de la ciudad.' },
} as const
export const DEADLOCK_SECTIONS = [
  { slug: 'heroes', label: 'Héroes', description: 'Habilidades, planes de partida y errores que puedes corregir.' },
  { slug: 'guides', label: 'Guías', description: 'Economía, movimiento, líneas y decisiones de equipo.' },
  { slug: 'counters', label: 'Counters', description: 'Respuestas concretas a las amenazas del equipo rival.' },
  { slug: 'builds', label: 'Builds', description: 'Qué comprar, por qué y cuándo cambiar de plan.' },
  { slug: 'maps', label: 'Mapa', description: 'Calles, objetivos, recursos y rutas para entender la ciudad.' },
  { slug: 'news', label: 'Noticias', description: 'Novedades confirmadas y contexto para entenderlas.' },
  { slug: 'patch-notes', label: 'Parches', description: 'Cambios oficiales explicados para tu próxima partida.' },
] as const
export function isGameId(value: unknown): value is GameId { return value === 'overwatch' || value === 'deadlock' }
export function gamePath(game: GameId, section?: string, slug?: string) {
  if (!section) return GAMES[game].href
  return `${game === 'deadlock' ? '/deadlock' : ''}/${section}${slug ? `/${slug}` : ''}`
}
export function gameForPath(path: string | null | undefined): GameId | null {
  if (!path) return null
  if (path === '/deadlock' || path.startsWith('/deadlock/')) return 'deadlock'
  if (path === '/overwatch' || /^\/(heroes|guides|counters|team-comps|maps|roles|news|patch-notes|pick-lab|experts|arcade)(\/|$)/.test(path)
    || /overwatch|blizzcon/.test(path)) return 'overwatch'
  return null
}
