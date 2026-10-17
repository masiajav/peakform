export const VOD_NOTEBOOK_KEY = 'replaid-vod-notebook-v1'
export const MAX_REVIEW_MOMENTS = 3
export type ReviewRole = 'tank' | 'dps' | 'support'
export type ReviewMoment = { id: string; time: string; information: string; decision: string; alternative: string }
export type ReviewNotebook = { version: 1; role: ReviewRole; hero: string; map: string; question: string; practice: string; moments: ReviewMoment[] }

export function emptyReviewMoment(id: string): ReviewMoment {
  return { id, time: '', information: '', decision: '', alternative: '' }
}

export function emptyReviewNotebook(): ReviewNotebook {
  return { version: 1, role: 'support', hero: '', map: '', question: '', practice: '', moments: [emptyReviewMoment('first')] }
}

export function parseReviewNotebook(value: string): ReviewNotebook | null {
  if (value.length > 30_000) return null
  try {
    const data = JSON.parse(value)
    if (!data || data.version !== 1 || !['tank', 'dps', 'support'].includes(data.role)
      || !Array.isArray(data.moments) || data.moments.length < 1 || data.moments.length > MAX_REVIEW_MOMENTS) return null
    const validText = (text: unknown, max: number): text is string => typeof text === 'string' && text.length <= max
    if (!validText(data.hero, 64) || !validText(data.map, 80) || !validText(data.question, 600) || !validText(data.practice, 600)) return null
    const ids = new Set<string>()
    const moments: ReviewMoment[] = []
    for (const moment of data.moments) {
      if (!moment || !validText(moment.id, 80) || !moment.id || ids.has(moment.id)
        || !validText(moment.time, 6) || !validText(moment.information, 1200)
        || !validText(moment.decision, 1200) || !validText(moment.alternative, 1200)) return null
      ids.add(moment.id)
      moments.push({ id: moment.id, time: moment.time, information: moment.information, decision: moment.decision, alternative: moment.alternative })
    }
    return { version: 1, role: data.role, hero: data.hero, map: data.map, question: data.question, practice: data.practice, moments }
  } catch { return null }
}

export function validReviewTime(time: string) {
  return !time.trim() || /^\d{1,3}:[0-5]\d$/.test(time)
}

export function hasReviewNotes(review: ReviewNotebook) {
  return Boolean(review.question.trim() || review.practice.trim() || review.map.trim() || review.hero
    || review.moments.some(moment => moment.time || moment.information.trim() || moment.decision.trim() || moment.alternative.trim()))
}

export function reviewNotebookText(review: ReviewNotebook, heroName: string) {
  const role = { tank: 'Tank', dps: 'DPS', support: 'Support' }[review.role]
  const text = ['REPLAID LAB | REVISIÓN DE PARTIDA', `Rol: ${role}`, `Héroe: ${heroName || 'Sin elegir'}`, `Mapa: ${review.map || 'Sin anotar'}`, '', `Pregunta: ${review.question || 'Sin anotar'}`]
  review.moments.forEach((moment, index) => text.push('', `PELEA ${index + 1}${moment.time ? ' | ' + moment.time : ''}`, `Información disponible: ${moment.information || 'Sin anotar'}`, `Decisión y resultado: ${moment.decision || 'Sin anotar'}`, `Alternativa: ${moment.alternative || 'Sin anotar'}`))
  text.push('', `PRÁCTICA PARA LA SIGUIENTE PARTIDA: ${review.practice || 'Sin anotar'}`)
  return text.join('\n')
}

export const reviewPracticeCases: Record<ReviewRole, { title: string; situation: string; checks: string[] }> = {
  support: {
    title: 'Ana pierde la altura ante Winston',
    situation: 'En Numbani, Ana dispara al Tank rival desde una altura. Winston llega y Ana cae después de fallar Sleep. El disparo fallado es visible; la decisión anterior también merece revisión.',
    checks: ['Vuelve a la cámara de Ana antes del salto: ¿había visto o escuchado a Winston?', 'Mira la ruta para bajar y dónde estaba su otro Support. ¿Podía rotar antes sin cruzar un tiro?', 'Compara una entrada que sobrevivió: ¿cambió la posición, la ayuda o solo acertó Sleep?'],
  },
  tank: {
    title: 'Winston aterriza sin ayuda',
    situation: 'En Gibraltar, Winston salta detrás de una pared para perseguir a un Support. Muere dentro de su burbuja mientras Ana sigue al otro lado. El replay no prueba que Ana pudiera curarlo.',
    checks: ['Pausa antes de saltar y mira desde la cámara de Ana qué parte del aterrizaje podía ver.', 'Comprueba si tus DPS podían llegar al mismo objetivo sin gastar toda la movilidad.', 'Busca un contacto más corto o una altura de preparación y anota qué salida conservarías.'],
  },
  dps: {
    title: 'Genji consigue una baja y no puede salir',
    situation: 'En King’s Row, Genji usa Dash para rematar detrás de una esquina. Consigue la baja, pero cae lejos del equipo y no participa en la disputa de la carga. Mira algo más que el intercambio del marcador.',
    checks: ['Antes de Dash, comprueba quién seguía vivo, dónde estaba la carga y qué aliados tenían tiro.', 'Localiza el destino y la cobertura de vuelta. No des por asegurado un reset antes de confirmar la eliminación.', 'Compara quedarse en el lateral con perseguir: ¿qué opción permitía seguir ayudando al objetivo?'],
  },
}
