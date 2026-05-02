import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const REFUND_WINDOW_MS = 7 * 24 * 60 * 60 * 1000 // 7 días

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { data: order } = await supabase
    .from('orders')
    .select('id, tier, status, delivered_at, refund_requested_at, stripe_payment_intent, expert_id')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (!order) return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 })
  if (order.tier !== 'trial')     return NextResponse.json({ error: 'Solo disponible para análisis de prueba' }, { status: 400 })
  if (order.status !== 'delivered') return NextResponse.json({ error: 'La review aún no ha sido entregada' }, { status: 400 })
  if (order.refund_requested_at)  return NextResponse.json({ error: 'Ya solicitaste un reembolso para este pedido' }, { status: 400 })

  if (!order.delivered_at) return NextResponse.json({ error: 'Fecha de entrega no disponible' }, { status: 400 })
  const deliveredMs = new Date(order.delivered_at).getTime()
  if (Date.now() - deliveredMs > REFUND_WINDOW_MS) {
    return NextResponse.json({ error: 'El plazo de 7 días para solicitar el reembolso ha expirado' }, { status: 400 })
  }

  // Verificar que el experto tiene reembolso garantizado
  const { data: expert } = await supabase
    .from('experts')
    .select('trial_refundable')
    .eq('id', order.expert_id)
    .single()

  if (!expert?.trial_refundable) {
    return NextResponse.json({ error: 'Este análisis de prueba no incluye reembolso garantizado' }, { status: 400 })
  }

  if (!order.stripe_payment_intent) {
    return NextResponse.json({ error: 'No se encontró la referencia de pago' }, { status: 400 })
  }

  try {
    await stripe.refunds.create({ payment_intent: order.stripe_payment_intent })
  } catch (err: any) {
    console.error('[refund] stripe error:', err.message)
    return NextResponse.json({ error: 'Error al procesar el reembolso en Stripe' }, { status: 500 })
  }

  const now = new Date().toISOString()
  const { error: updateError } = await supabase
    .from('orders')
    .update({ refund_requested_at: now, refunded_at: now })
    .eq('id', params.id)

  if (updateError) {
    console.error('[refund] db update failed:', updateError.message)
    return NextResponse.json({ error: 'Reembolso procesado pero no se pudo actualizar el estado' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
