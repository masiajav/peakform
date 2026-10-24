'use client'

import { useId, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import styles from './DeadlockBuildCode.module.css'

export default function DeadlockBuildCode({ code }: { code: number }) {
  const inputId = useId()
  const input = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<'idle' | 'copied' | 'manual'>('idle')
  async function copy() {
    try {
      await navigator.clipboard.writeText(String(code))
      setStatus('copied')
    } catch {
      input.current?.focus()
      input.current?.select()
      setStatus('manual')
    }
  }
  return <div className={styles.copy}>
    <label htmlFor={inputId}>Código de build</label>
    <div className={styles.row}>
      <input ref={input} id={inputId} value={code} readOnly inputMode="numeric" onFocus={event => event.currentTarget.select()} />
      <button type="button" onClick={copy}>{status === 'copied' ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />}{status === 'copied' ? 'Copiado' : 'Copiar código'}</button>
    </div>
    <p className={styles.status} role="status">{status === 'copied' ? 'Código copiado. Ya puedes pegarlo en el juego.' : status === 'manual' ? 'Seleccionado. Copia el número con el menú de tu dispositivo.' : 'Busca este número en las builds públicas de la tienda del juego.'}</p>
  </div>
}
