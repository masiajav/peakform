import { describe, expect, it } from 'vitest'
import { emptyReviewMoment, emptyReviewNotebook, hasReviewNotes, parseReviewNotebook, reviewNotebookText, reviewPracticeCases, validReviewTime } from '@/lib/vod-review-notebook'

describe('local VOD notebook', () => {
  it('starts empty and round-trips notes without treating them as markup', () => {
    const review = emptyReviewNotebook()
    expect(hasReviewNotes(review)).toBe(false)
    review.question = '<img src=x> No encontraba una salida'
    review.moments[0].information = 'Vi a Winston en la altura'
    expect(parseReviewNotebook(JSON.stringify(review))).toEqual(review)
    expect(hasReviewNotes(review)).toBe(true)
  })

  it.each([
    '{broken', 'null', '[]', JSON.stringify({ ...emptyReviewNotebook(), version: 2 }),
    JSON.stringify({ ...emptyReviewNotebook(), role: 'invented' }),
    JSON.stringify({ ...emptyReviewNotebook(), hero: 2 }),
    JSON.stringify({ ...emptyReviewNotebook(), question: 'x'.repeat(601) }),
    JSON.stringify({ ...emptyReviewNotebook(), moments: [] }),
    JSON.stringify({ ...emptyReviewNotebook(), moments: Array.from({ length: 4 }, (_, i) => emptyReviewMoment(String(i))) }),
    JSON.stringify({ ...emptyReviewNotebook(), moments: [emptyReviewMoment('same'), emptyReviewMoment('same')] }),
    JSON.stringify({ ...emptyReviewNotebook(), moments: [{ ...emptyReviewMoment('first'), information: null }] }),
    JSON.stringify({ ...emptyReviewNotebook(), moments: [{ ...emptyReviewMoment('first'), alternative: 'x'.repeat(1201) }] }),
    'x'.repeat(30_001),
  ])('rejects malformed, oversized or unknown persisted formats (%#)', raw => {
    expect(parseReviewNotebook(raw)).toBeNull()
  })

  it('keeps the expected fields only, without copying arbitrary object keys', () => {
    const raw = JSON.stringify({ ...emptyReviewNotebook(), arbitrary: 'not a note', moments: [{ ...emptyReviewMoment('first'), extra: true }] })
    expect(parseReviewNotebook(raw)).toEqual(emptyReviewNotebook())
  })

  it.each(['', '00:00', '2:40', '59:59', '120:05'])('accepts a usable replay time: %s', time => {
    expect(validReviewTime(time)).toBe(true)
  })
  it.each(['2:90', '1:2', '-1:20', '1:00:00', 'abc', '1234:00'])('rejects an ambiguous replay time: %s', time => {
    expect(validReviewTime(time)).toBe(false)
  })

  it('exports every observation and the practice task, with the chosen hero name', () => {
    const review = { ...emptyReviewNotebook(), hero: 'ana', map: 'Numbani', question: 'Cuándo rotar', practice: 'Bajar antes del salto', moments: [{ id: 'a', time: '02:40', information: 'Winston había salido del choke', decision: 'Seguí disparando', alternative: 'Bajar por detrás' }, emptyReviewMoment('b')] }
    const text = reviewNotebookText(review, 'Ana')
    for (const value of ['Héroe: Ana', 'Mapa: Numbani', 'Pregunta: Cuándo rotar', 'PELEA 1 | 02:40', 'Seguí disparando', 'Bajar por detrás', 'PELEA 2', 'Bajar antes del salto']) expect(text).toContain(value)
    expect(text).not.toContain('Héroe: ana')
  })

  it('offers different practice situations rather than the same paragraph for each role', () => {
    expect(new Set(Object.values(reviewPracticeCases).map(item => item.situation)).size).toBe(3)
    for (const item of Object.values(reviewPracticeCases)) expect(item.checks).toHaveLength(3)
  })
})
