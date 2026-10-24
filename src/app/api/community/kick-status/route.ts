import { NextResponse } from 'next/server'
import { getKickStatus } from '@/lib/kick-status-server'

export const runtime = 'nodejs'
export const maxDuration = 10

export async function GET() {
  const status = await getKickStatus()
  return NextResponse.json(status, {
    headers: {
      'Cache-Control': `public, max-age=0, s-maxage=${status.status === 'unknown' ? 10 : 30}, must-revalidate`,
      'X-Robots-Tag': 'noindex',
    },
  })
}
