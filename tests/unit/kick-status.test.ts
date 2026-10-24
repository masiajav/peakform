import { afterEach, describe, expect, it, vi } from 'vitest'
import { isKickStatus, KICK_CHANNEL_URL, parseKickChannel, showKickNoticeOnPath, unknownKickStatus } from '@/lib/kick-status'
import { getKickStatus } from '@/lib/kick-status-server'
import { GET } from '@/app/api/community/kick-status/route'

const checkedAt = '2026-10-24T09:00:00.000Z'
const live = { slug: 'ivajpro', livestream: { id: 1234, is_live: true, session_title: '  Deadlock   con la comunidad  ' } }
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks() })

describe('Kick state truthfulness', () => {
  it('only exposes an explicitly live stream belonging to ivajpro', () => {
    expect(parseKickChannel(live, checkedAt)).toEqual({ channel: 'ivajpro', status: 'live', streamId: '1234', title: 'Deadlock con la comunidad', checkedAt })
    expect(KICK_CHANNEL_URL).toBe('https://kick.com/ivajpro')
    expect(parseKickChannel({ ...live, slug: 'another-channel' }, checkedAt).status).toBe('unknown')
  })
  it('distinguishes confirmed offline from a missing or malformed payload', () => {
    expect(parseKickChannel({ slug: 'ivajpro', livestream: null }, checkedAt).status).toBe('offline')
    expect(parseKickChannel({ ...live, livestream: { ...live.livestream, is_live: false } }, checkedAt).status).toBe('offline')
    for (const payload of [null, [], { slug: 'ivajpro' }, { ...live, livestream: {} }, { ...live, livestream: { ...live.livestream, is_live: 'true' } }]) {
      expect(parseKickChannel(payload, checkedAt)).toEqual(unknownKickStatus(checkedAt))
    }
  })
  it.each([0, -1, '1234', Number.MAX_SAFE_INTEGER + 1])('rejects unsafe stream identity %s', id => {
    expect(parseKickChannel({ ...live, livestream: { ...live.livestream, id } }, checkedAt).status).toBe('unknown')
  })
  it('bounds untrusted title text and validates responses received by the browser', () => {
    const status = parseKickChannel({ ...live, livestream: { ...live.livestream, session_title: 'x'.repeat(1000) } }, checkedAt)
    expect(status.title).toHaveLength(180)
    expect(isKickStatus(status)).toBe(true)
    expect(isKickStatus({ ...status, streamId: null })).toBe(false)
    expect(isKickStatus({ ...status, streamId: '0' })).toBe(false)
    expect(isKickStatus({ ...status, channel: 'someone-else' })).toBe(false)
    expect(isKickStatus({ ...status, checkedAt: 'invalid' })).toBe(false)
    expect(isKickStatus({ ...status, status: 'advertisement' })).toBe(false)
  })
  it('keeps private areas and the arcade free of the notice without hiding the public expert listing', () => {
    for (const path of ['/login', '/admin', '/dashboard/orders', '/editorial-preview/id', '/expert/settings', '/arcade/oversvivors']) expect(showKickNoticeOnPath(path)).toBe(false)
    for (const path of ['/', '/deadlock', '/overwatch', '/experts', '/heroes/ana']) expect(showKickNoticeOnPath(path)).toBe(true)
  })
})

describe('Kick public status boundary', () => {
  it('requests only the fixed public channel and returns a minimal status', async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json({ ...live, user: { unnecessary: 'discarded' } }))
    vi.stubGlobal('fetch', fetcher)
    const result = await getKickStatus()
    expect(result.status).toBe('live')
    expect(Object.keys(result).sort()).toEqual(['channel', 'checkedAt', 'status', 'streamId', 'title'])
    expect(fetcher).toHaveBeenCalledWith('https://kick.com/api/v2/channels/ivajpro', expect.objectContaining({ cache: 'no-store', redirect: 'error', signal: expect.any(AbortSignal) }))
  })
  it.each([403, 429, 500])('treats upstream HTTP %s as unknown, never offline or live', async code => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: code })))
    expect((await getKickStatus()).status).toBe('unknown')
  })
  it('fails closed on malformed JSON or a network timeout', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('<html>unavailable</html>')))
    expect((await getKickStatus()).status).toBe('unknown')
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new DOMException('Timed out', 'TimeoutError')))
    expect((await getKickStatus()).status).toBe('unknown')
  })
  it('gives valid states short CDN caching and unknown states a shorter retry interval', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json(live)))
    const response = await GET()
    expect((await response.json()).status).toBe('live')
    expect(response.headers.get('cache-control')).toContain('s-maxage=30')
    expect(response.headers.get('x-robots-tag')).toBe('noindex')
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    expect((await GET()).headers.get('cache-control')).toContain('s-maxage=10')
  })
})
