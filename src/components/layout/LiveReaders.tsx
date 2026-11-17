'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gameForPath, type GameId, GAMES } from '@/lib/games'
import { useReaderPresence } from '@/lib/use-reader-presence'
import type { ReaderPresence } from '@/lib/reader-presence'
import styles from './LiveReaders.module.css'

const mascots = {
  overwatch: { src: '/community/ow-training-bot.bb96a53951d3.webp', width: 188, height: 192 },
  deadlock: { src: '/community/deadlock-candle-trooper.d7fea4b1c90a.webp', width: 97, height: 192 },
} as const
const format = new Intl.NumberFormat('es-ES')

export function ReaderBadges({ game, presence }: { game: GameId | null; presence: ReaderPresence }) {
  const games: GameId[] = game ? [game] : ['overwatch', 'deadlock']
  const connected = presence.status === 'connected' && presence.counts !== null
  const explanation = connected
    ? 'Sesiones con esta sección visible. Cada navegador cuenta una vez por juego. La cifra puede tardar unos segundos en actualizarse.'
    : presence.status === 'connecting' ? 'Conectando con el contador de lectores…' : 'El contador no está disponible ahora.'

  return <div className={styles.readers} aria-label="Lectores activos" data-reader-status={presence.status}>
    <span className={styles.legend}><span className={connected ? styles.liveDot : styles.waitingDot} aria-hidden="true" />LEYENDO AHORA</span>
    <div className={styles.badges}>
      {games.map(id => {
        const count = connected ? presence.counts![id] : null
        const label = count === null ? `Lectores de ${GAMES[id].name}: ${presence.status === 'connecting' ? 'conectando' : 'no disponible'}`
          : `${format.format(count)} ${count === 1 ? 'lector' : 'lectores'} en ${GAMES[id].name}`
        return <Link key={id} href={GAMES[id].href} className={`${styles.badge} ${styles[id]}`} title={explanation} aria-label={label} data-reader-game={id}>
          <Image {...mascots[id]} alt="" className={styles.mascot} unoptimized />
          <span className={styles.copy}><span className={styles.count}>{count === null ? '—' : format.format(count)}</span><span className={styles.game}>{GAMES[id].name}</span></span>
        </Link>
      })}
    </div>
  </div>
}

export default function LiveReaders() {
  const game = gameForPath(usePathname())
  const presence = useReaderPresence(game)
  return <ReaderBadges game={game} presence={presence} />
}
