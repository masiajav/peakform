export const KICK_CHANNEL = 'ivajpro'
export const KICK_CHANNEL_URL = `https://kick.com/${KICK_CHANNEL}`

export type KickStatus = {
  channel: typeof KICK_CHANNEL
  status: 'live' | 'offline' | 'unknown'
  streamId: string | null
  title: string | null
  checkedAt: string
}

const record = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value)

export function unknownKickStatus(checkedAt: string): KickStatus {
  return { channel: KICK_CHANNEL, status: 'unknown', streamId: null, title: null, checkedAt }
}

export function parseKickChannel(value: unknown, checkedAt: string): KickStatus {
  const unknown = unknownKickStatus(checkedAt)
  if (!record(value) || value.slug !== KICK_CHANNEL) return unknown
  if (value.livestream === null) return { ...unknown, status: 'offline' }
  if (!record(value.livestream)) return unknown
  const stream = value.livestream
  if (stream.is_live === false) return { ...unknown, status: 'offline' }
  if (stream.is_live !== true || !Number.isSafeInteger(stream.id) || Number(stream.id) <= 0) return unknown
  const title = typeof stream.session_title === 'string' ? stream.session_title.replace(/\s+/g, ' ').trim().slice(0, 180) : null
  return { ...unknown, status: 'live', streamId: String(stream.id), title: title || null }
}

export function isKickStatus(value: unknown): value is KickStatus {
  return record(value) && value.channel === KICK_CHANNEL
    && ['live', 'offline', 'unknown'].includes(String(value.status))
    && (value.streamId === null || (typeof value.streamId === 'string' && /^[1-9]\d*$/.test(value.streamId)))
    && (value.title === null || (typeof value.title === 'string' && value.title.length <= 180))
    && typeof value.checkedAt === 'string' && Number.isFinite(Date.parse(value.checkedAt))
    && (value.status !== 'live' || Boolean(value.streamId))
}

export function showKickNoticeOnPath(pathname: string) {
  return !['/admin', '/apply', '/arcade', '/auth', '/dashboard', '/editorial-preview', '/expert', '/login', '/orders', '/profile', '/stripe']
    .some(prefix => pathname === prefix || pathname.startsWith(`${prefix}/`))
}
