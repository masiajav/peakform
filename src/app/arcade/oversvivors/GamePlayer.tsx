'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './oversvivors.module.css'

const GAME_URL = '/games/oversvivors/index.html'

export default function GamePlayer() {
  const [started, setStarted] = useState(false)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [fullscreenError, setFullscreenError] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)
  const player = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow || event.data?.source !== 'oversvivors') return
      if (event.data.type === 'ready') setStatus('ready')
      if (event.data.type === 'error') setStatus('error')
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  async function enterFullscreen() {
    setFullscreenError(false)
    try {
      if (!document.fullscreenElement) await player.current?.requestFullscreen()
      frame.current?.focus()
    } catch {
      setFullscreenError(true)
    }
  }

  return (
    <section className={styles.arcade} aria-label="Jugar a Oversvivors">
      <div className={styles.toolbar}>
        <span><span className={styles.dot} />{started ? status === 'ready' ? 'ARENA LISTA' : status === 'error' ? 'NO SE HA PODIDO INICIAR' : 'CARGANDO ARENA…' : 'LISTO PARA ENTRAR'}</span>
        <span className={styles.specs}>5 HÉROES <i>/</i> 2 ARENAS <i>/</i> 10 MIN</span>
        {started ? <button type="button" onClick={enterFullscreen}>PANTALLA COMPLETA ↗</button> : <span className={styles.version}>WEB ALPHA 01</span>}
      </div>
      <div className={styles.player} ref={player}>
        {started ? (
          <iframe ref={frame} className={styles.frame} src={GAME_URL} title="Oversvivors: juego de supervivencia" allow="autoplay; fullscreen; gamepad" onLoad={() => frame.current?.contentWindow?.postMessage({ source: 'replaidlab', type: 'status' }, window.location.origin)} />
        ) : (
          <div className={styles.cover}>
            <div className={styles.coverCopy}><span className={styles.coverTag}>REPLAID LAB PRESENTA</span><h2>LA NOCHE<br />ES TUYA.</h2><p>Cinco héroes. Oleadas sin descanso.<br />Una build que solo tú puedes crear.</p><button type="button" className={styles.play} onClick={() => setStarted(true)}>JUGAR GRATIS <span aria-hidden="true">↗</span></button><span className={styles.loadNote}>Sin instalación ni registro · Primera carga: unos 40 MB</span></div>
            <span className={styles.coverStamp}>FOREST RUINS<br /><b>01 / 02</b></span>
          </div>
        )}
      </div>
      <div className={styles.playerFoot} role="status"><span>{fullscreenError ? 'Tu navegador no permite pantalla completa aquí. Puedes seguir jugando en esta ventana.' : started ? 'Haz clic dentro del juego para usar el teclado. ESC para pausar.' : 'Recomendado: ordenador · teclado y ratón · navegador con WebGL 2'}</span>{started ? <a href={GAME_URL} target="_blank" rel="noopener noreferrer">Abrir en otra pestaña ↗</a> : <span>MEJOR CON SONIDO</span>}</div>
    </section>
  )
}
