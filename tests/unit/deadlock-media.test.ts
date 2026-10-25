import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import { createHash } from 'node:crypto'
import media from '@/lib/deadlock-media.json'
import manifest from '../../content/deadlock/ability-item-assets.json'
import { deadlockAbilitySection, getDeadlockCellMedia, getDeadlockHeroMedia } from '@/lib/deadlock-media'
import { editorialIssues, editorialVersion, type EditorialArticle } from '@/lib/editorial-record'
import launch from '@/lib/deadlock-launch.json'

describe('Deadlock media identity and local assets', () => {
  it('keeps four distinct signature slots and the correct character identities', () => {
    for (const hero of media.heroes) {
      expect(hero.abilities.map(ability => ability.slot)).toEqual([1, 2, 3, 4])
      expect(new Set(hero.abilities.map(ability => ability.id)).size).toBe(4)
    }
    expect(getDeadlockHeroMedia('ivy')?.name).toBe('Hiedra')
    expect(getDeadlockHeroMedia('ivy')?.abilities[3].englishName).toBe('Air Drop')
    expect(getDeadlockHeroMedia('kelvin')?.abilities[0].englishName).toBe('Frost Grenade')
    expect(getDeadlockHeroMedia('ana')).toBeUndefined()
  })
  it('serves the exact downloaded bytes instead of placeholder or mismatched icons', () => {
    expect(manifest.version).toBe(media.version)
    for (const asset of manifest.files) {
      const bytes = fs.readFileSync(`public${asset.path}`)
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(asset.sha256)
      expect(bytes.length).toBeGreaterThan(100)
      const entry = asset.kind === 'ability'
        ? media.heroes.flatMap(hero => hero.abilities).find(ability => ability.icon === asset.path)
        : media.items.find(item => item.icon === asset.path)
      expect(entry?.id).toBe(asset.id)
    }
    expect(manifest.files.find(asset => asset.key === 'ivy-4')?.url).toContain('tengu_lightning_crash')
  })
  it('matches explicit item labels and English aliases without guessing from prose', () => {
    expect(getDeadlockCellMedia('Maleficio Anticuración (Healbane)')?.icon).toBe('/deadlock/items/2603935618.webp')
    expect(getDeadlockCellMedia('Hiedra')?.icon).toBe('/deadlock/ivy.webp')
    expect(getDeadlockCellMedia('Ivy')?.icon).toBe('/deadlock/ivy.webp')
    expect(getDeadlockCellMedia('Hiedra (Ivy)')).toMatchObject({ type: 'hero', slug: 'ivy', icon: '/deadlock/ivy.webp' })
    expect(getDeadlockCellMedia('Apply Healbane before the next fight')).toBeUndefined()
  })
  it('links ability cards to their explanation across localized whitespace', () => {
    const hero = getDeadlockHeroMedia('kelvin')!
    const sections = [{ title: 'Granada de Escarcha: recuperar', body: ['Ayuda a tu compañero.'] }, { title: 'Senda Helada: la salida', body: ['Elige el destino.'] }]
    expect(deadlockAbilitySection(hero.abilities[0], sections)).toBe(0)
    expect(deadlockAbilitySection(hero.abilities[1], sections)).toBe(1)
    expect(deadlockAbilitySection(hero.abilities[3], sections)).toBeUndefined()
  })
  it('binds skill labels to the article version and rejects another hero’s icons', () => {
    const abilities = getDeadlockHeroMedia('abrams')!.abilities
    const article = { ...launch[0], abilities } as EditorialArticle
    expect(editorialIssues(article)).toEqual([])
    const changed = structuredClone(article)
    changed.abilities![0].name = 'Different ability'
    expect(editorialVersion(changed)).not.toBe(editorialVersion(article))
    changed.abilities![0].icon = '/deadlock/abilities/kelvin-1.webp'
    expect(editorialIssues(changed)).toContain('Habilidades visuales no válidas')
    expect(editorialIssues({ ...article, abilities: abilities.slice(0, 3) })).toContain('Habilidades visuales no válidas')
  })
})
