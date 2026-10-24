import { describe, expect, it } from 'vitest'
import { DEADLOCK_OG_IMAGE, deadlockArticleMetadata, deadlockBreadcrumbs, deadlockCollection, deadlockHubModified } from '@/lib/deadlock-seo'
import type { EditorialArticle } from '@/lib/editorial-record'
import launch from '@/lib/deadlock-launch.json'

describe('Deadlock search intent and discovery', () => {
  it('identifies the game, the localized hero and the English search alias', () => {
    const article = launch.find(a => a.hero === 'haze' && a.kind === 'hero') as EditorialArticle
    const metadata = deadlockArticleMetadata(article)
    expect(metadata.title).toBe('Bruma (Haze) en Deadlock: guía y habilidades')
    expect(metadata.alternates?.canonical).toBe('https://www.replaidlab.com/deadlock/heroes/haze')
    expect(metadata.openGraph?.images).toEqual([{ url: `https://www.replaidlab.com${DEADLOCK_OG_IMAGE}`, alt: metadata.title }])
  })
  it('gives hero, counter and build pages different search intents', () => {
    const articles = launch.filter(a => a.hero === 'abrams') as EditorialArticle[]
    const titles = articles.map(a => deadlockArticleMetadata(a).title)
    expect(new Set(titles).size).toBe(3)
    expect(titles.every(title => String(title).includes('Deadlock'))).toBe(true)
    expect(titles.some(title => String(title).includes('código y objetos'))).toBe(true)
  })
  it('uses the actual collection order and only the supplied published records', () => {
    const articles = launch.filter(a => a.kind === 'hero').slice(0, 2) as EditorialArticle[]
    const data = deadlockCollection('/deadlock/heroes', 'Héroes de Deadlock', 'Guías', articles)
    expect(data.mainEntity.numberOfItems).toBe(2)
    expect(data.mainEntity.itemListElement.map(item => item.url)).toEqual(articles.map(a => `https://www.replaidlab.com${a.path}`))
    expect(data.mainEntity.itemListElement.map(item => item.position)).toEqual([1, 2])
  })
  it('makes breadcrumbs use absolute canonical URLs in their visible order', () => {
    const data = deadlockBreadcrumbs([{ name: 'Deadlock', path: '/deadlock' }, { name: 'Héroes', path: '/deadlock/heroes' }])
    expect(data.itemListElement).toEqual([{ '@type': 'ListItem', position: 1, name: 'Deadlock', item: 'https://www.replaidlab.com/deadlock' }, { '@type': 'ListItem', position: 2, name: 'Héroes', item: 'https://www.replaidlab.com/deadlock/heroes' }])
  })
  it('dates hubs from their own published content without inventing freshness', () => {
    const hero = { ...launch[0], game: 'deadlock', kind: 'hero', updatedAt: '2026-10-20T10:00:00Z' } as EditorialArticle
    const build = { ...hero, kind: 'build', updatedAt: '2026-10-24T10:00:00Z' } as EditorialArticle
    const ow = { ...hero, game: 'overwatch', updatedAt: '2026-10-25T10:00:00Z' } as EditorialArticle
    expect(deadlockHubModified('/deadlock', [hero, build, ow])).toBe(build.updatedAt)
    expect(deadlockHubModified('/deadlock/heroes', [hero, build, ow])).toBe(hero.updatedAt)
    expect(deadlockHubModified('/deadlock/heroes/haze', [hero])).toBeUndefined()
    expect(deadlockHubModified('/overwatch', [hero])).toBeUndefined()
    expect(deadlockHubModified('/deadlock/news', [hero])).toBeUndefined()
  })
})
