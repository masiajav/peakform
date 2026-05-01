import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { orderId, summary, errors, positives, action_plan, timestamps, cross_analysis, roadmap } = body

  if (!orderId || !summary?.trim() || !errors?.trim() || !positives?.trim() || !action_plan?.trim()) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  const { data: expert } = await supabase
    .from('experts')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!expert) return NextResponse.json({ error: 'No eres un experto' }, { status: 403 })

  const { data: order } = await supabase
    .from('orders')
    .select('id, user_id, status')
    .eq('id', orderId)
    .eq('expert_id', expert.id)
    .single()

  if (!order) return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 })
  if (order.status !== 'in_review') {
    return NextResponse.json({ error: 'El pedido no está en revisión' }, { status: 400 })
  }

  const { error: reviewError } = await supabase
    .from('reviews')
    .insert({
      order_id:      orderId,
      expert_id:     expert.id,
      user_id:       order.user_id,
      summary:       summary.trim(),
      errors:        errors.trim(),
      positives:     positives.trim(),
      action_plan:   action_plan.trim(),
      timestamps:    timestamps ?? [],
      cross_analysis: cross_analysis ?? null,
      roadmap:       roadmap ?? null,
    })

  if (reviewError) {
    console.error('[deliver] insert review failed:', reviewError)
    return NextResponse.json({ error: reviewError.message }, { status: 500 })
  }

  const supabaseAdmin = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error: orderError } = await supabaseAdmin
    .from('orders')
    .update({ status: 'delivered', delivered_at: new Date().toISOString() })
    .eq('id', orderId)

  if (orderError) {
    console.error('[deliver] update order failed:', orderError)
    return NextResponse.json({ error: orderError.message }, { status: 500 })
  }

  // best-effort stats increment — silent if RPC not yet created
  await supabaseAdmin.rpc('increment_expert_reviews', { p_expert_id: expert.id })

  return NextResponse.json({ ok: true })
}
