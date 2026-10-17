import type { Metadata } from 'next'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import { buildMetadata } from '@/lib/seo'
import GamePlayer from './GamePlayer'
import styles from './oversvivors.module.css'

export const metadata: Metadata = buildMetadata({
  title: 'Oversvivors: juega gratis en el navegador',
  description: 'Juega gratis con Tracer, Mei, Widowmaker, Cassidy y Junkrat en este fangame no oficial de supervivencia de Replaid Lab. Sin instalar nada.',
  path: '/arcade/oversvivors',
  image: '/arcade/oversvivors/cover.webp',
})

export default function OversvivorsPage() {
  return (
    <div className={styles.page}>
      <PublicNav />
      <main className={styles.main}>
        <div className={styles.breadcrumb}><Link href="/">REPLAID LAB</Link><span>/</span>ARCADE <span className={styles.alpha}>ALPHA</span></div>
        <header className={styles.heading}>
          <div><p className={styles.eyebrow}>UN HÉROE. TODA UNA HORDA.</p><h1>OVERSVIVORS<span>.</span></h1></div>
          <p>Tracer, Mei, Widowmaker, Cassidy y Junkrat.<br />Un fangame de supervivencia gratuito y no oficial.</p>
        </header>
        <GamePlayer />
        <section className={styles.guide} aria-label="Cómo jugar">
          <div className={styles.guideIntro}><p className={styles.eyebrow}>ANTES DE ENTRAR</p><h2>Muévete. Mejora.<br />Disputa el punto.</h2><p>Los anillos azules son objetivos opcionales: límpialos de enemigos y mantente dentro para ganar experiencia, vida y carga de definitiva. Combina mejoras de la misma familia y consulta tu build al pausar; en nivel 6 siempre se ofrece una legendaria.</p></div>
          <dl className={styles.controls}>
            <div><dt><kbd>W A S D</kbd> / <kbd>↑ ← ↓ →</kbd></dt><dd>Moverte por la arena</dd></div>
            <div><dt><kbd>SHIFT</kbd> + <kbd>E</kbd></dt><dd>Habilidades de tu héroe</dd></div>
            <div><dt><kbd>Q</kbd></dt><dd>Definitiva · se carga con bajas</dd></div>
            <div><dt><kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> / <kbd>R</kbd></dt><dd>Elegir mejora / volver a sortear</dd></div>
            <div><dt><kbd>ESC</kbd></dt><dd>Pausar y abrir opciones</dd></div>
          </dl>
          <div className={styles.notes}><span className={styles.dot} />GRATIS · SIN CUENTA<p>Pensado para ordenador con teclado y ratón. Los ataques son automáticos, salvo Widowmaker: apunta y mantén el clic izquierdo. Tras cinco segundos sin daño recuperas vida.</p><p>30 medallas de maestría: con cada héroe y en cada arena, gana una partida, captura tres puntos y derrota a los dos jefes. Puedes conseguir cada reto en partidas distintas.</p><p>Blink y Recall con Tracer; Cryo-Freeze y Blizzard con Mei; Infra-Sight con Widowmaker; Deadeye con Cassidy y RIP-Tire con Junkrat.</p><p>Los récords y medallas se guardan en este navegador. Borrar sus datos elimina el progreso local.</p></div>
        </section>
        <footer className={styles.footer}><span>Fangame gratuito y no oficial. Overwatch y sus personajes pertenecen a Blizzard Entertainment.</span><Link href="/pick-lab">Volver a Pick Lab ↗</Link></footer>
      </main>
    </div>
  )
}
