import media from './deadlock-media.json'

export const DEADLOCK_MEDIA_VERSION = media.version
export type DeadlockHeroMedia = (typeof media.heroes)[number]
export type DeadlockAbilityMedia = DeadlockHeroMedia['abilities'][number]

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').replace(/\s+/g, ' ').trim()
const heroesBySlug = new Map(media.heroes.map(hero => [hero.slug, hero]))
const heroesByName = new Map(media.heroes.flatMap(hero => hero.aliases.map(alias => [normalize(alias), hero] as const)))
const itemsByName = new Map(media.items.flatMap(item => item.aliases.map(alias => [normalize(alias), item] as const)))
const itemsById = new Map(media.items.map(item => [item.id, item]))

export function getDeadlockItemMedia(id: number) { return itemsById.get(id) }

export function getDeadlockHeroMedia(slug: string | undefined) {
  return slug ? heroesBySlug.get(slug) : undefined
}

export function getDeadlockCellMedia(label: string) {
  const englishAlias = label.match(/\(([^()]+)\)\s*$/)?.[1]
  const item = itemsByName.get(normalize(englishAlias ?? label))
  if (item) return { type: 'item' as const, icon: item.icon }
  const hero = heroesByName.get(normalize(label))
  if (hero) return { type: 'hero' as const, icon: hero.portrait }
  return undefined
}

export function deadlockAbilitySection(ability: DeadlockAbilityMedia, sections: { title: string; body: string[] }[]) {
  const names = [normalize(ability.name), normalize(ability.englishName)]
  const index = sections.findIndex(section => names.some(name => normalize(section.title).includes(name)))
  if (index >= 0) return index
  const combined = sections.findIndex(section => section.body.some(paragraph => names.some(name => normalize(paragraph).includes(name))))
  return combined >= 0 ? combined : undefined
}

export function deadlockAbilityForHeading(hero: DeadlockHeroMedia | undefined, title: string) {
  return hero?.abilities.find(ability => [ability.name, ability.englishName].some(name => normalize(title).startsWith(normalize(name))))
}

export function deadlockAbilityHeadingTitle(ability: DeadlockAbilityMedia | undefined, title: string) {
  if (!ability || normalize(title).includes(`(${normalize(ability.englishName)})`)) return title
  const colon = title.indexOf(':')
  return colon < 0 ? `${title} (${ability.englishName})` : `${title.slice(0, colon)} (${ability.englishName})${title.slice(colon)}`
}
