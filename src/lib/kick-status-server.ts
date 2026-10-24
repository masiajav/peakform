import 'server-only'
import { KICK_CHANNEL, parseKickChannel, unknownKickStatus, type KickStatus } from './kick-status'

export async function getKickStatus(): Promise<KickStatus> {
  try {
    const response = await fetch(`https://kick.com/api/v2/channels/${KICK_CHANNEL}`, {
      headers: { Accept: 'application/json', 'User-Agent': 'ReplaidLab/1.0 (+https://www.replaidlab.com)' },
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(7000),
    })
    if (!response.ok) return unknownKickStatus(new Date().toISOString())
    return parseKickChannel(await response.json(), new Date().toISOString())
  } catch {
    return unknownKickStatus(new Date().toISOString())
  }
}
