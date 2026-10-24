import Image from 'next/image'
import type { DeadlockBuildImport as BuildImport } from '@/lib/editorial-record'
import { getDeadlockItemMedia } from '@/lib/deadlock-media'
import DeadlockBuildCode from './DeadlockBuildCode'
import styles from './DeadlockBuildImport.module.css'

export default function DeadlockBuildImport({ build, heroName }: { build: BuildImport; heroName: string }) {
  return <section className={styles.card} aria-label={`Build importable de ${heroName}`} data-build-code={build.code}>
    <p className={styles.eyebrow}>LISTA PARA EL JUEGO · {heroName}</p>
    <h2>Importa una build para empezar</h2>
    <p>{build.focus}</p>
    <DeadlockBuildCode key={build.code} code={build.code} />
    <ol className={styles.steps}>
      <li>Abre la tienda y entra en el buscador de builds.</li>
      <li>Selecciona las builds públicas, pega el código y elige la de {heroName}.</li>
      <li>Actívala para ver sus compras en la tienda.</li>
    </ol>
    <p className={styles.label}>Compras incluidas en esta base</p>
    <ul className={styles.items}>{build.coreItems.map(id => {
      const item = getDeadlockItemMedia(id)
      return item ? <li key={id}><Image src={item.icon} alt="" width={40} height={40} unoptimized /><span>{item.name}</span></li> : null
    })}</ul>
    <p className={styles.note}>Build comunitaria. Las compras de abajo ayudan a adaptarla a la partida; no necesitas comprar todas las alternativas.</p>
  </section>
}
