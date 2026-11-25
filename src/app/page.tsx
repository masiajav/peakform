import Image from 'next/image'
import Link from '@/components/layout/NavigationLink'
import PublicNav from '@/components/layout/PublicNav'
import { buildMetadata } from '@/lib/seo'
import styles from './home-practice.module.css'

export const metadata = buildMetadata({
  title: 'Guías y herramientas de Overwatch y Deadlock en español',
  description: 'Prepara una composición con Pick Lab, revisa una repetición de Overwatch o explora las rutas y objetivos del mapa interactivo de Deadlock.',
  path: '/',
})
export default function Page() {
  return <><PublicNav /><main className="game-selector">
    <p className="eyebrow">REPLAID LAB</p>
    <h1>Tu juego.<br /><span>Tus guías.</span></h1>
    <p className="game-lead">Busca a tu héroe, consulta sus counters o aprende lo que te falta para tu próxima partida.</p>
    <div className="game-choice-grid">
      <Link href="/overwatch" className="game-choice choice-overwatch">
        <div className="game-choice-art" aria-hidden="true"><Image src="/heroes/tracer.png" alt="" width={220} height={220} /><span>OW</span></div>
        <div className="game-choice-copy"><h2>Overwatch</h2>
          <p>Habilidades, counters, composiciones y mapas. Busca la guía del héroe con el que juegas.</p>
          <span className="game-choice-tags">HÉROES · GUÍAS · PICK LAB</span><strong>Entrar en Overwatch ↗</strong>
        </div>
      </Link>
      <Link href="/deadlock" className="game-choice choice-deadlock">
        <div className="game-choice-art" aria-hidden="true"><Image src="/deadlock/abrams.webp" alt="" width={170} height={220} /><span>DL</span></div>
        <div className="game-choice-copy"><h2>Deadlock</h2>
          <p>Habilidades en español e inglés, builds con código para importar y un mapa para encontrar objetivos, tiendas y campamentos.</p>
          <span className="game-choice-tags">HÉROES · BUILDS · COUNTERS</span><strong>Entrar en Deadlock ↗</strong>
        </div>
      </Link>
    </div>
    <section className={styles.section} aria-labelledby="practice-heading">
      <h2 id="practice-heading">Qué practicar en tu próxima partida</h2>
      <div className={styles.grid}>
        <article className={styles.overwatch}>
          <h3>Overwatch · Coordina la entrada</h3>
          <p>Si Winston salta y cae antes de que el equipo pueda ayudarlo, pausa la repetición justo antes del salto. Mira si Tracer estaba en posición para presionar al mismo objetivo y si Ana tenía línea de visión. Elige una señal de entrada que los tres puedan reconocer, como esperar a que Tracer confirme que ya está en el ángulo.</p>
          <ul>
            <li><Link href="/pick-lab">Probar una composición en Pick Lab</Link></li>
            <li><Link href="/guides/review-vod-overwatch-espanol#cuaderno-vod">Abrir el cuaderno de repeticiones</Link></li>
          </ul>
        </article>
        <article className={styles.deadlock}>
          <h3>Deadlock · Sal de línea con tiempo</h3>
          <p>Si quieres ayudar en otra línea, mira primero dónde chocarán los siguientes soldados. Si tu guardián está bajo presión, resuelve esa oleada antes de salir. Abre el mapa, elige el acceso por el que llegarás y localiza un segundo camino para volver si encuentras al rival en el primero.</p>
          <ul>
            <li><Link href="/deadlock/maps/la-ciudad">Explorar las rutas en el mapa interactivo</Link></li>
            <li><Link href="/deadlock/guides/fase-de-lineas">Practicar la fase de líneas</Link></li>
          </ul>
        </article>
      </div>
    </section>
  </main></>
}
