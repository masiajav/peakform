import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'expert') {
    return NextResponse.json({ error: 'No eres un experto' }, { status: 403 })
  }

  const body = await request.json().catch(() => ({}))
  const servicePaused = Boolean(body.service_paused)
  const reason = typeof body.service_pause_reason === 'string'
    ? body.service_pause_reason.trim().slice(0, 240)
    : ''

  const payload = servicePaused
    ? {
        service_paused: true,
        service_paused_at: new Date().toISOString(),
        service_pause_reason: reason || null,
      }
    : {
        service_paused: false,
        service_paused_at: null,
        service_pause_reason: null,
      }

  const { data, error } = await supabase
    .from('experts')
    .update(payload)
    .eq('user_id', user.id)
    .select('service_paused, service_paused_at, service_pause_reason')
    .single()

  if (error) {
    console.error('[expert/availability] update failed:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, expert: data })
}
