'use client'

import { useEffect, useId, useState } from 'react'
import { Download, Plus, Trash2 } from 'lucide-react'
import { emptyReviewMoment, emptyReviewNotebook, hasReviewNotes, MAX_REVIEW_MOMENTS, parseReviewNotebook, reviewNotebookText, reviewPracticeCases, validReviewTime, VOD_NOTEBOOK_KEY, type ReviewRole } from '@/lib/vod-review-notebook'
import styles from './VodReviewNotebook.module.css'

type HeroOption = { slug: string; name: string; role: ReviewRole }
type Props = { heroes: HeroOption[] }

export default function VodReviewNotebook({ heroes }: Props) {
  const prefix = useId()
  const [review, setReview] = useState(emptyReviewNotebook)
  const [storage, setStorage] = useState<'loading' | 'ready' | 'unavailable' | 'unsupported'>('loading')
  const [message, setMessage] = useState('')
  const [confirmClear, setConfirmClear] = useState(false)
  const practiceCase = reviewPracticeCases[review.role]
  const roleHeroes = heroes.filter(hero => hero.role === review.role)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(VOD_NOTEBOOK_KEY)
      if (saved !== null) {
        const parsed = parseReviewNotebook(saved)
        if (!parsed) { setStorage('unsupported'); return }
        if (!heroes.some(hero => hero.slug === parsed.hero && hero.role === parsed.role)) parsed.hero = ''
        setReview(parsed)
      }
      setStorage('ready')
    } catch { setStorage('unavailable') }
  }, [heroes])

  useEffect(() => {
    if (storage !== 'ready') return
    try {
      if (hasReviewNotes(review)) localStorage.setItem(VOD_NOTEBOOK_KEY, JSON.stringify(review))
      else localStorage.removeItem(VOD_NOTEBOOK_KEY)
    }
    catch { setStorage('unavailable') }
  }, [review, storage])

  function update(field: 'hero' | 'map' | 'question' | 'practice', value: string) {
    setReview(current => ({ ...current, [field]: value }))
    setMessage('')
  }

  function download() {
    if (review.moments.some(moment => !validReviewTime(moment.time))) {
      setMessage('Revisa los minutos: usa mm:ss, con segundos entre 00 y 59.')
      return
    }
    const heroName = heroes.find(hero => hero.slug === review.hero)?.name || ''
    const url = URL.createObjectURL(new Blob([reviewNotebookText(review, heroName)], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'replaid-lab-revision.txt'
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setMessage('Revisión exportada.')
  }

  function clear() {
    setReview(emptyReviewNotebook())
    setConfirmClear(false)
    setMessage('Revisión borrada.')
    try { localStorage.removeItem(VOD_NOTEBOOK_KEY); setStorage('ready') }
    catch { setStorage('unavailable') }
  }

  const persistence = storage === 'loading' ? 'Cargando revisión…' : storage === 'ready' ? 'Las notas se guardan en este navegador. No se envían a Replaid Lab.' : storage === 'unsupported' ? 'El borrador guardado no es compatible. No se ha sobrescrito.' : 'El guardado local no está disponible. Puedes exportar tus notas.'

  return (
    <section id="cuaderno-vod" aria-labelledby={`${prefix}-title`} className={styles.notebook}>
      <header className={styles.header}>
        <div><div className="eyebrow">TU PARTIDA</div><h2 id={`${prefix}-title`}>Cuaderno de revisión</h2></div>
        <div className={styles.tools}>
          <button type="button" title="Exportar revisión" aria-label="Exportar revisión" disabled={storage === 'loading' || !hasReviewNotes(review)} onClick={download}><Download size={18} aria-hidden="true" /></button>
          <button type="button" title="Borrar revisión" aria-label="Borrar revisión" disabled={storage === 'loading'} onClick={() => setConfirmClear(true)}><Trash2 size={18} aria-hidden="true" /></button>
        </div>
      </header>
      {confirmClear && <div role="group" aria-label="Borrar la revisión guardada" className={styles.confirm}>
        <p>¿Borrar esta revisión y sus notas?</p>
        <button type="button" onClick={() => setConfirmClear(false)}>Cancelar</button><button type="button" onClick={clear}>Borrar</button>
      </div>}
      <fieldset disabled={storage === 'loading'} className={styles.fields}>
        <legend className={styles.srOnly}>Datos de la revisión</legend>
        <div className={styles.context}>
          <div><span id={`${prefix}-role`} className={styles.label}>Rol</span><div role="group" aria-labelledby={`${prefix}-role`} className={styles.roles}>
            {(['tank', 'dps', 'support'] as const).map(role => <button key={role} type="button" aria-pressed={review.role === role} onClick={() => setReview(current => ({ ...current, role, hero: '' }))}>{role === 'tank' ? 'Tank' : role === 'dps' ? 'DPS' : 'Support'}</button>)}
          </div></div>
          <div className={styles.field}><label htmlFor={`${prefix}-hero`}>Héroe</label><select id={`${prefix}-hero`} value={review.hero} onChange={event => update('hero', event.target.value)}><option value="">Sin elegir</option>{roleHeroes.map(hero => <option key={hero.slug} value={hero.slug}>{hero.name}</option>)}</select></div>
          <div className={styles.field}><label htmlFor={`${prefix}-map`}>Mapa</label><input id={`${prefix}-map`} value={review.map} maxLength={80} onChange={event => update('map', event.target.value)} /></div>
        </div>
        <div className={`${styles.field} ${styles.question}`}><label htmlFor={`${prefix}-question`}>Pregunta de la revisión</label><textarea id={`${prefix}-question`} rows={2} maxLength={600} value={review.question} onChange={event => update('question', event.target.value)} /></div>
        <details className={styles.example}>
          <summary>Caso de práctica: {practiceCase.title}</summary>
          <p className={styles.exampleLabel}>Situación ficticia</p><p>{practiceCase.situation}</p>
          <ul>{practiceCase.checks.map(check => <li key={check}>{check}</li>)}</ul>
        </details>
        {review.moments.map((moment, index) => <fieldset key={moment.id} className={styles.moment}>
          <legend>Pelea {index + 1}</legend>
          <div className={`${styles.field} ${styles.time}`}><label htmlFor={`${prefix}-${moment.id}-time`}>Minuto (mm:ss)</label><input id={`${prefix}-${moment.id}-time`} value={moment.time} maxLength={6} inputMode="text" placeholder="02:40" aria-invalid={!validReviewTime(moment.time)} onChange={event => {
            const time = event.target.value
            setReview(current => ({ ...current, moments: current.moments.map(item => item.id === moment.id ? { ...item, time } : item) }))
            setMessage('')
          }} /></div>
          <div className={styles.observations}>
            {([
              ['information', 'Qué información tenías'], ['decision', 'Qué hiciste y qué pasó'], ['alternative', 'Qué alternativa había'],
            ] as const).map(([key, label]) => <div className={styles.field} key={key}><label htmlFor={`${prefix}-${moment.id}-${key}`}>{label}</label><textarea id={`${prefix}-${moment.id}-${key}`} rows={3} maxLength={1200} value={moment[key]} onChange={event => {
              const value = event.target.value
              setReview(current => ({ ...current, moments: current.moments.map(item => item.id === moment.id ? { ...item, [key]: value } : item) }))
              setMessage('')
            }} /></div>)}
          </div>
        </fieldset>)}
        <div className={styles.momentActions}>
          <button type="button" className={styles.add} disabled={review.moments.length >= MAX_REVIEW_MOMENTS} onClick={() => setReview(current => current.moments.length >= MAX_REVIEW_MOMENTS ? current : { ...current, moments: [...current.moments, emptyReviewMoment(crypto.randomUUID())] })}><Plus size={16} aria-hidden="true" /> Añadir pelea</button>
          {review.moments.length > 1 && <button type="button" className={styles.remove} onClick={() => setReview(current => ({ ...current, moments: current.moments.slice(0, -1) }))}>Quitar última pelea</button>}
        </div>
        <div className={`${styles.field} ${styles.practice}`}><label htmlFor={`${prefix}-practice`}>Qué practicarás en la siguiente partida</label><textarea id={`${prefix}-practice`} rows={2} maxLength={600} value={review.practice} onChange={event => update('practice', event.target.value)} /></div>
      </fieldset>
      <p className={styles.persistence} role="status">{message || persistence}</p>
    </section>
  )
}
