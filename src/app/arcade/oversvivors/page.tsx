import type { Metadata } from 'next'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import { buildMetadata } from '@/lib/seo'
import GamePlayer from './GamePlayer'
import styles from './oversvivors.module.css'

export const metadata: Metadata = buildMetadata({
  title: 'Oversvivors: juega gratis en el navegador',
  description: 'El arcade de Replaid Lab. Elige entre cinco héroes, combina habilidades y sobrevive diez minutos en Oversvivors. Gratis y sin instalar nada.',
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
          <p>Cinco héroes inspirados en Overwatch.<br />Captura puntos y sobrevive diez minutos.</p>
        </header>
        <GamePlayer />
        <section className={styles.guide} aria-label="Cómo jugar">
          <div className={styles.guideIntro}><p className={styles.eyebrow}>ANTES DE ENTRAR</p><h2>Muévete. Mejora.<br />Disputa el punto.</h2><p>Los anillos azules son objetivos opcionales: límpialos de enemigos y mantente dentro para ganar experiencia, vida y carga de definitiva. Recoge botiquines y busca tus combinaciones de mejoras; en nivel 6 siempre se ofrece una legendaria.</p></div>
          <dl className={styles.controls}>
            <div><dt><kbd>W A S D</kbd> / <kbd>↑ ← ↓ →</kbd></dt><dd>Moverte por la arena</dd></div>
            <div><dt><kbd>SHIFT</kbd> + <kbd>E</kbd></dt><dd>Habilidades de tu héroe</dd></div>
            <div><dt><kbd>Q</kbd></dt><dd>Definitiva · se carga con bajas</dd></div>
            <div><dt><kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> / <kbd>R</kbd></dt><dd>Elegir mejora / volver a sortear</dd></div>
            <div><dt><kbd>ESC</kbd></dt><dd>Pausar y abrir opciones</dd></div>
          </dl>
          <div className={styles.notes}><span className={styles.dot} />GRATIS · SIN CUENTA<p>Pensado para ordenador con teclado y ratón. Los ataques son automáticos, salvo Viper: apunta y mantén el clic izquierdo. Tras cinco segundos sin daño recuperas vida.</p><p>Spectra · Tracer / Glacier · Mei / Viper · Widowmaker / Ranger · Cassidy / Scramble · Junkrat.</p><p>Los récords se guardan en este navegador. Borrar sus datos elimina el progreso local.</p></div>
        </section>
        <footer className={styles.footer}><span>Un experimento jugable de Replaid Lab · Versión alpha</span><Link href="/pick-lab">Volver a Pick Lab ↗</Link></footer>
      </main>
    </div>
  )
}
