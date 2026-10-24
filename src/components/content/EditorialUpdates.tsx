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
  const normalize = (s: string) => s.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const items = (await publishedEditorial(game))
    .filter(a => kinds.includes(a.kind) && (!hero || a.hero === hero)
      && normalize(`${a.title} ${a.description}`).includes(normalize(q)))
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    .slice(0, limit)
  if (!items.length) return null

  return (
    <section className={`${styles.root} ${variant === 'landing' ? styles.landing : ''}`} aria-label="Publicaciones actualizadas">
      <header className={styles.heading}>
        <h2>Al día en {game === 'overwatch' ? 'Overwatch' : 'Deadlock'}</h2>
        <span>{items.length === 1 ? 'La última lectura' : 'Últimas lecturas'}</span>
      </header>
      <div className={styles.list}>
        {items.map(a => (
          <Link className={styles.card} key={a.path} href={a.path}>
            <div className={styles.meta}>
              <span className={styles.kind}>{labels[a.kind]}</span>
              <time dateTime={a.updatedAt} title="Fecha de actualización">{dateFormat.format(new Date(a.updatedAt))}</time>
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
