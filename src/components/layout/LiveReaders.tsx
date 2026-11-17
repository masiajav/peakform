'use client'

import Image from 'next/image'
import { useSiteReaders } from './ReaderPresenceProvider'
import type { ReaderPresence } from '@/lib/reader-presence'
import styles from './LiveReaders.module.css'

const format = new Intl.NumberFormat('es-ES')

export function ReaderCounter({ presence }: { presence: ReaderPresence }) {
  const count = presence.status === 'connected' ? presence.count : null
  const label = count === null
    ? `Visitantes de Replaid Lab: ${presence.status === 'connecting' ? 'conectando' : 'no disponible'}`
    : `${format.format(count)} ${count === 1 ? 'visitante' : 'visitantes'} en Replaid Lab`
  const explanation = count === null
    ? presence.status === 'connecting' ? 'Conectando con el contador de visitantes…' : 'El contador no está disponible ahora.'
    : 'Visitantes con alguna página de Replaid Lab visible. Cada navegador cuenta una sola vez, aunque abra varias pestañas o cambie de sección. La cifra puede tardar unos segundos en actualizarse.'

  return <div className={styles.readers} role="group" aria-label={label} title={explanation} data-reader-status={presence.status}>
    <Image src="/community/ow-training-bot.bb96a53951d3.webp" width={188} height={192} alt="" className={styles.mascot} unoptimized data-reader-mascot="overwatch" />
    <span className={styles.count} data-reader-total="" aria-hidden="true">{count === null ? '—' : format.format(count)}</span>
    <Image src="/community/deadlock-candle-trooper.d7fea4b1c90a.webp" width={97} height={192} alt="" className={`${styles.mascot} ${styles.deadlock}`} unoptimized data-reader-mascot="deadlock" />
  </div>
}

export default function LiveReaders() {
  const presence = useSiteReaders()
  return <ReaderCounter presence={presence} />
}
