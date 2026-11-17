import styles from './loading.module.css'

export default function Loading() {
  return (
    <div className={styles.screen} data-page-loading="" role="status" aria-live="polite" aria-atomic="true">
      <div className={styles.content}>
        <span className={styles.mark} aria-hidden="true"><span /><span /><span /></span>
        <span className={styles.brand} aria-hidden="true">REPLAID <span>LAB</span></span>
        <span className={styles.track} aria-hidden="true"><span /></span>
        <span className={styles.label}>Cargando página</span>
      </div>
    </div>
  )
}
