import type { DeadlockBuildImport } from './editorial-record'

/** Validate a fresh Game Coordinator response, never a build-search summary. */
export function deadlockBuildSnapshotIssues(build: DeadlockBuildImport, expectedHeroId: number, input: unknown, activeItemIds: ReadonlySet<number>): string[] {
  if (!input || typeof input !== 'object') return ['Respuesta de build no válida']
  const snapshot = (input as { hero_build?: Record<string, unknown> }).hero_build
  if (!snapshot || snapshot.hero_id !== expectedHeroId || build.heroId !== expectedHeroId) return ['La build pertenece a otro héroe']
  const issues: string[] = []
  if (snapshot.hero_build_id !== build.code || snapshot.version !== build.version) issues.push('El código o la versión de build ha cambiado')
  if (snapshot.development_build === true) issues.push('La build no está publicada')
  const timestamp = snapshot.last_updated_timestamp
  if (typeof timestamp !== 'number' || !Number.isFinite(timestamp) || timestamp <= 0 || timestamp * 1000 > Date.parse(build.checkedAt)) issues.push('La build cambió después de su comprobación')
  const categories = (snapshot.details as { mod_categories?: unknown } | undefined)?.mod_categories
  if (!Array.isArray(categories)) return [...issues, 'La build no contiene compras']
  const ids = categories.flatMap(category => Array.isArray(category?.mods) ? category.mods.map((mod: { ability_id?: unknown }) => mod?.ability_id) : [])
  if (!ids.length || ids.some(id => typeof id !== 'number' || !activeItemIds.has(id))) issues.push('La build contiene objetos no disponibles')
  if (build.coreItems.some(id => !ids.includes(id))) issues.push('Las compras principales no están en la build')
  return issues
}
