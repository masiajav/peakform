import { SECTION_KIND, type EditorialArticle } from './editorial-record'
import catalog from './deadlock-catalog.json'
import { absoluteUrl, buildMetadata } from './seo'

export const DEADLOCK_OG_IMAGE = '/deadlock/deadlock-social.png'
export function deadlockRobots(index = true) {
  return { index, follow: true, googleBot: { index, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1 } }
}

export const DEADLOCK_INDEX_COPY = {
  heroes: { title: 'Héroes de Deadlock: habilidades y guías en español', heading: 'Héroes de Deadlock', description: 'Encuentra a tu héroe por su nombre en español o inglés. Consulta sus habilidades, cómo jugarlo, sus counters y una build para importar al juego.' },
  guides: { title: 'Guías de Deadlock en español: aprende a jugar', heading: 'Guías de Deadlock', description: 'Cómo conseguir almas, jugar la línea, moverte por el mapa y elegir tus compras. Empieza por lo que más te cuesta en partida.' },
  counters: { title: 'Counters de Deadlock: héroes y objetos para responder', heading: 'Counters de Deadlock', description: '¿Te está ganando un héroe? Busca cómo frenar sus habilidades, qué objetos ayudan y cuándo puedes pelearle.' },
  builds: { title: 'Builds de Deadlock: códigos y compras por héroe', heading: 'Builds de Deadlock', description: 'Copia un código para importar la build en Deadlock. Aquí tienes las compras de inicio, los objetos principales y qué cambiar según el rival.' },
  maps: { title: 'Mapa de Deadlock: objetivos, campamentos y rutas', heading: 'El mapa de Deadlock', description: 'Explora las plantas de la ciudad y encuentra los objetivos, tiendas, campamentos y transportes. Aprende qué merece la pena disputar y cuándo.' },
  news: { title: 'Noticias de Deadlock en español', heading: 'Noticias de Deadlock', description: 'Nuevos héroes, anuncios de Valve y novedades de Deadlock, con las fechas y los detalles que necesitas para volver a jugar.' },
  'patch-notes': { title: 'Parches de Deadlock en español: cambios y balance', heading: 'Parches de Deadlock', description: 'Lee qué cambia en los parches de Deadlock y cómo afecta a tus héroes y compras. Cada análisis conserva la fecha del parche que explica.' },
} as const

export function deadlockHeroLabel(slug: string | undefined, english = false) {
  const hero = catalog.find(h => h.slug === slug)
  if (!hero) return ''
  const alias = hero.aliases.find(name => name.toLocaleLowerCase('es') !== hero.name.toLocaleLowerCase('es'))
  return english && alias ? `${hero.name} (${alias})` : hero.name
}

export function deadlockArticleMetadata(article: EditorialArticle) {
  const hero = deadlockHeroLabel(article.hero, true)
  const title = hero && article.kind === 'hero' ? `${hero} en Deadlock: guía y habilidades`
    : hero && article.kind === 'counter' ? `Counters de ${hero} en Deadlock`
    : hero && article.kind === 'build' ? `Build de ${hero} en Deadlock: código y objetos`
    : /deadlock/i.test(article.title) ? article.title : `${article.title} · Deadlock`
  return buildMetadata({ title, description: article.description, path: article.path, image: DEADLOCK_OG_IMAGE, type: 'article', robots: deadlockRobots() })
}

export function deadlockBreadcrumbs(items: { name: string; path: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.path) })) }
}

export function deadlockCollection(path: string, title: string, description: string, articles: EditorialArticle[]) {
  return {
    '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': absoluteUrl(path),
    url: absoluteUrl(path), name: title, description, inLanguage: 'es',
    mainEntity: { '@type': 'ItemList', numberOfItems: articles.length, itemListElement: articles.map((a, index) => ({ '@type': 'ListItem', position: index + 1, name: a.title, url: absoluteUrl(a.path) })) },
  }
}

export function deadlockHubModified(path: string, articles: EditorialArticle[]) {
  if (path !== '/deadlock' && !/^\/deadlock\/[^/]+$/.test(path)) return undefined
  const section = path.split('/')[2]
  const kind = section ? SECTION_KIND[section] : undefined
  if (section && !kind) return undefined
  const dates = articles.filter(a => a.game === 'deadlock' && (!kind || a.kind === kind)).map(a => a.updatedAt).filter(date => Number.isFinite(Date.parse(date)))
  return dates.sort((a, b) => Date.parse(b) - Date.parse(a))[0]
}
