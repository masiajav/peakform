import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ReaderBadges } from '@/components/layout/LiveReaders'
import type { ReaderPresence } from '@/lib/reader-presence'

const live: ReaderPresence = { status: 'connected', counts: { overwatch: 2, deadlock: 5 } }
const render = (game: 'overwatch' | 'deadlock' | null, presence = live) => renderToStaticMarkup(createElement(ReaderBadges, { game, presence }))

describe('reader badges', () => {
  it('shows both game totals on the general page with separate destinations', () => {
    const html = render(null)
    expect(html).toContain('2 lectores en Overwatch')
    expect(html).toContain('5 lectores en Deadlock')
    expect(html).toContain('href="/overwatch"')
    expect(html).toContain('href="/deadlock"')
  })
  it.each(['overwatch', 'deadlock'] as const)('only shows %s inside that game', game => {
    const html = render(game)
    const other = game === 'overwatch' ? 'deadlock' : 'overwatch'
    expect(html).toContain(`data-reader-game="${game}"`)
    expect(html).not.toContain(`data-reader-game="${other}"`)
  })
  it.each(['connecting', 'unavailable'] as const)('uses an honest placeholder while %s', status => {
    const html = render('overwatch', { status, counts: null })
    expect(html).toContain('>—</span>')
    expect(html).not.toContain('0 lectores')
    expect(html).not.toContain('2 lectores')
  })
  it('shows a synchronized zero and uses the singular for one active reader', () => {
    const html = render(null, { status: 'connected', counts: { overwatch: 1, deadlock: 0 } })
    expect(html).toContain('1 lector en Overwatch')
    expect(html).toContain('0 lectores en Deadlock')
  })
})
