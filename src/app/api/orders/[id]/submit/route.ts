import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { sendNewOrderEmail } from '@/lib/email'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { replay_url, player_role, focus_areas, user_notes } = await request.json()

  if (!replay_url?.trim()) {
    return NextResponse.json({ error: 'El enlace al replay es obligatorio' }, { status: 400 })
  }

  const { data: order } = await supabase
    .from('orders')
    .select('id, expert_id, tier, status, deadline_at')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (!order) return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 })
  if (order.status !== 'paid') return NextResponse.json({ error: 'El pedido no está en estado correcto' }, { status: 400 })

  const { error: updateError } = await supabase
    .from('orders')
    .update({
      replay_url:  replay_url.trim(),
      player_role: player_role ?? 'dps',
      focus_areas: focus_areas ?? [],
      user_notes:  user_notes?.trim() || null,
      status:      'in_review',
    })
    .eq('id', params.id)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  // Send email to expert — best-effort, don't fail the request
  try {
    const admin = createAdminClient()

    const { data: expert } = await admin
      .from('experts')
      .select('user_id')
      .eq('id', order.expert_id)
      .single()

    if (expert) {
      const { data: expertAuth } = await admin.auth.admin.getUserById(expert.user_id)
      const expertEmail = expertAuth?.user?.email

      if (expertEmail) {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
        await sendNewOrderEmail({
          to:         expertEmail,
          tier:       order.tier,
          playerRole: player_role ?? 'dps',
          deadline:   order.deadline_at,
          orderUrl:   `${appUrl}/expert/orders/${params.id}`,
        })
      }
    }
  } catch (err) {
    console.error('[submit] email to expert failed:', err)
  }

  return NextResponse.json({ ok: true })
}
