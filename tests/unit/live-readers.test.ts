import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ReaderCounter } from '@/components/layout/LiveReaders'
import type { ReaderPresence } from '@/lib/reader-presence'

const render = (presence: ReaderPresence) => renderToStaticMarkup(createElement(ReaderCounter, { presence }))

describe('site-wide visitor counter', () => {
  it('places one total between the Overwatch bot and Deadlock minion', () => {
    const html = render({ status: 'connected', count: 7 })
    expect(html).toContain('7 visitantes en Replaid Lab')
    expect(html.match(/data-reader-total=""/g)).toHaveLength(1)
    expect(html.indexOf('data-reader-mascot="overwatch"')).toBeLessThan(html.indexOf('data-reader-total'))
    expect(html.indexOf('data-reader-total')).toBeLessThan(html.indexOf('data-reader-mascot="deadlock"'))
    expect(html).not.toContain('data-reader-game=')
    expect(html).not.toContain('LEYENDO AHORA')
  })
  it.each(['connecting', 'unavailable'] as const)('does not show stale totals while %s', status => {
    const html = render({ status, count: 7 })
    expect(html).toContain('>—</span>')
    expect(html).not.toContain('7 visitantes')
    expect(html).not.toContain('0 visitantes')
  })
  it('shows a synchronized zero and singular for one visitor', () => {
    expect(render({ status: 'connected', count: 0 })).toContain('0 visitantes en Replaid Lab')
    expect(render({ status: 'connected', count: 1 })).toContain('1 visitante en Replaid Lab')
  })
})
