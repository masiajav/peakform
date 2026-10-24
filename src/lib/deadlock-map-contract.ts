export type DeadlockMapPoint = { x: number; y: number; label?: string; team?: 'amber' | 'sapphire' }
export type DeadlockMapGroup = {
  id: string; label: string; symbol: string; color: string; section: number
  description: string; points: DeadlockMapPoint[]; defaultVisible?: boolean; icon?: string
  category: 'objectives' | 'resources' | 'travel'
}
export type DeadlockMapAtlas = {
  name: string
  layers: { id: string; label: string; image: string }[]
  groups: DeadlockMapGroup[]
  lanes: { name: string; color: string; points: DeadlockMapPoint[] }[]
}
export type EditorialImage = { src: string; alt: string; width: number; height: number; caption?: string }

export const safeDeadlockMapImage = (value: unknown): value is string => typeof value === 'string' && /^\/deadlock\/map\/[a-z0-9-]+\.(?:png|webp|jpg)$/.test(value)
const text = (value: unknown, max: number) => typeof value === 'string' && value.trim().length > 0 && value.length <= max
const color = (value: unknown) => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value)
const point = (value: DeadlockMapPoint) => value && Number.isFinite(value.x) && value.x >= 0 && value.x <= 1
  && Number.isFinite(value.y) && value.y >= 0 && value.y <= 1 && (value.label === undefined || text(value.label, 100))
  && (value.team === undefined || ['amber', 'sapphire'].includes(value.team))
export function editorialImageValid(image: EditorialImage) {
  return image && safeDeadlockMapImage(image.src) && text(image.alt, 240)
    && Number.isInteger(image.width) && image.width > 0 && image.width <= 4000
    && Number.isInteger(image.height) && image.height > 0 && image.height <= 4000
    && (image.caption === undefined || text(image.caption, 300))
}
export function deadlockMapIssues(atlas: DeadlockMapAtlas, sectionCount: number): string[] {
  try {
    if (!atlas || !text(atlas.name, 120) || !Array.isArray(atlas.layers) || atlas.layers.length !== 3
      || atlas.layers.some(layer => !/^[a-z-]+$/.test(layer.id) || !text(layer.label, 80) || !safeDeadlockMapImage(layer.image))
      || new Set(atlas.layers.map(layer => layer.id)).size !== 3) return ['Capas de mapa no válidas']
    if (!Array.isArray(atlas.groups) || !atlas.groups.length || atlas.groups.length > 30
      || new Set(atlas.groups.map(group => group.id)).size !== atlas.groups.length
      || atlas.groups.some(group => !/^[a-z0-9-]+$/.test(group.id) || !text(group.label, 80) || !text(group.symbol, 3)
        || !['objectives', 'resources', 'travel'].includes(group.category) || (group.icon !== undefined && !safeDeadlockMapImage(group.icon))
        || !color(group.color) || !text(group.description, 350) || !Number.isInteger(group.section) || group.section < 0 || group.section >= sectionCount
        || (group.defaultVisible !== undefined && typeof group.defaultVisible !== 'boolean')
        || !Array.isArray(group.points) || !group.points.length || group.points.length > 1000 || group.points.some(p => !point(p)))
      || atlas.groups.reduce((sum, group) => sum + group.points.length, 0) > 2500) return ['Leyenda o posiciones de mapa no válidas']
    if (!Array.isArray(atlas.lanes) || atlas.lanes.length !== 3 || atlas.lanes.some(lane => !text(lane.name, 40) || !color(lane.color)
      || !Array.isArray(lane.points) || lane.points.length < 2 || lane.points.length > 500 || lane.points.some(p => !point(p)))) return ['Calles de mapa no válidas']
    return []
  } catch { return ['Estructura de mapa no válida'] }
}
