import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { OrderTier } from '@/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const DEADLINE_HOURS: Record<OrderTier, number> = {
  starter:   48,
  pro:       24,
  deep_dive: 72,
}

export async function POST(request: Request) {
  const body = await request.text()
  const sig  = request.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error('[webhook/stripe] signature verification failed:', err.message)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const meta = session.metadata!

    const tier     = meta.tier as OrderTier
    const paidAt   = new Date()
    const deadline = new Date(paidAt.getTime() + DEADLINE_HOURS[tier] * 3600 * 1000)

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase.from('orders').insert({
      user_id:           meta.user_id,
      expert_id:         meta.expert_id,
      status:            'paid',
      tier,
      amount_base:       parseInt(meta.amount_base),
      amount_commission: parseInt(meta.amount_commission),
      amount_total:      parseInt(meta.amount_total),
      stripe_session_id:     session.id,
      stripe_payment_intent: session.payment_intent as string,
      paid_at:     paidAt.toISOString(),
      deadline_at: deadline.toISOString(),
    })

    if (error) {
      console.error('[webhook/stripe] insert order failed:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
