import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { publishedEditorial } from '@/lib/editorial-store'
import type { GameId } from '@/lib/games'
import type { EditorialKind } from '@/lib/editorial-record'
import styles from './EditorialUpdates.module.css'

const labels: Record<EditorialKind, string> = {
  hero: 'Héroes', counter: 'Counters', build: 'Builds', guide: 'Guía',
  news: 'Noticias', patch_note: 'Parche', map: 'Mapas', team_comp: 'Composiciones',
}
const dateFormat = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
})

export default async function EditorialUpdates({
  game, kinds, q = '', hero, limit = 9, variant = 'inline',
}: {
  game: GameId; kinds: EditorialKind[]; q?: string; hero?: string;
  limit?: number; variant?: 'inline' | 'landing';
}) {
  const newsOnly = variant === 'landing'
  const gameName = game === 'overwatch' ? 'Overwatch' : 'Deadlock'
  const newsHref = game === 'overwatch' ? '/news' : '/deadlock/news'
  const displayDate = (article: { publishedAt: string; updatedAt: string }) => newsOnly ? article.publishedAt : article.updatedAt
  const normalize = (s: string) => s.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const items = (await publishedEditorial(game))
    .filter(a => kinds.includes(a.kind) && (!newsOnly || a.kind === 'news' || a.kind === 'patch_note') && (!hero || a.hero === hero)
      && normalize(`${a.title} ${a.description}`).includes(normalize(q)))
    .sort((a, b) => Date.parse(displayDate(b)) - Date.parse(displayDate(a)))
    .slice(0, limit)
  if (!items.length) return null

  return (
    <section className={`${styles.root} ${newsOnly ? styles.landing : ''}`} aria-label={newsOnly ? `Últimas noticias de ${gameName}` : 'Publicaciones actualizadas'}>
      <header className={styles.heading}>
        <h2>{newsOnly ? `Últimas noticias de ${gameName}` : `Al día en ${gameName}`}</h2>
        {newsOnly ? <Link href={newsHref}>Ver noticias <ArrowUpRight size={16} aria-hidden="true" /></Link> : <span>{items.length === 1 ? 'La última lectura' : 'Últimas lecturas'}</span>}
      </header>
      <div className={styles.list}>
        {items.map(a => (
          <Link className={styles.card} key={a.path} href={a.path}>
            <div className={styles.meta}>
              <span className={styles.kind}>{labels[a.kind]}</span>
              <time dateTime={displayDate(a)} title={newsOnly ? 'Fecha de publicación' : 'Fecha de actualización'}>{dateFormat.format(new Date(displayDate(a)))}</time>
            </div>
            <div className={styles.copy}>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
            <span className={styles.action}>Leer artículo <ArrowUpRight size={20} aria-hidden="true" /></span>
          </Link>
        ))}
      </div>
    </section>
  )
}
