import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { calculateTotal, TIER_CONFIG, OrderTier } from '@/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

type ExpertRow = {
  id: string
  display_name: string
  price_starter: number
  price_pro: number
  price_deep_dive: number
  tier_starter_enabled: boolean
  tier_pro_enabled: boolean
  tier_deep_dive_enabled: boolean
  trial_enabled: boolean
  trial_price: number | null
  trial_deadline_hours: number
  stripe_account_id: string | null
  service_paused: boolean
}

const PRICE_FIELD: Record<Exclude<OrderTier, 'trial'>, keyof ExpertRow> = {
  starter:   'price_starter',
  pro:       'price_pro',
  deep_dive: 'price_deep_dive',
}

const ENABLED_FIELD: Record<Exclude<OrderTier, 'trial'>, keyof ExpertRow> = {
  starter:   'tier_starter_enabled',
  pro:       'tier_pro_enabled',
  deep_dive: 'tier_deep_dive_enabled',
}

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { expertId, tier } = await request.json() as { expertId: string; tier: OrderTier }

  if (!expertId || !['starter', 'pro', 'deep_dive', 'trial'].includes(tier)) {
    return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 })
  }

  const { data: expert } = await supabase
    .from('experts')
    .select('id, display_name, price_starter, price_pro, price_deep_dive, tier_starter_enabled, tier_pro_enabled, tier_deep_dive_enabled, trial_enabled, trial_price, trial_deadline_hours, stripe_account_id, service_paused')
    .eq('id', expertId)
    .eq('status', 'active')
    .returns<ExpertRow[]>()
    .single()

  if (!expert) return NextResponse.json({ error: 'Experto no encontrado' }, { status: 404 })
  if (expert.service_paused) {
    return NextResponse.json({ error: 'Este experto ha pausado temporalmente nuevos pedidos' }, { status: 400 })
  }
  if (tier !== 'trial' && expert[ENABLED_FIELD[tier]] === false) {
    return NextResponse.json({ error: 'Este tier no esta disponible ahora mismo' }, { status: 400 })
  }
  if (!expert.stripe_account_id) return NextResponse.json({ error: 'Este experto aún no tiene cuenta de cobro configurada' }, { status: 400 })

  // Trial-specific validations
  if (tier === 'trial') {
    if (!expert.trial_enabled || expert.trial_price == null) {
      return NextResponse.json({ error: 'Este experto no ofrece análisis de prueba' }, { status: 400 })
    }
    const { data: existingTrial } = await supabase
      .from('orders')
      .select('id')
      .eq('user_id', user.id)
      .eq('expert_id', expertId)
      .eq('tier', 'trial')
      .maybeSingle()
    if (existingTrial) {
      return NextResponse.json({ error: 'Ya usaste tu análisis de prueba con este experto' }, { status: 400 })
    }
  }

  const basePrice = tier === 'trial'
    ? expert.trial_price!
    : (expert[PRICE_FIELD[tier]] as number)
  const { commission, total } = calculateTotal(basePrice)

  const origin = request.headers.get('origin') ?? 'http://localhost:3000'

  const trialDeadlineHours = tier === 'trial' ? expert.trial_deadline_hours : undefined

  let session
  try {
    session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${TIER_CONFIG[tier].label} — ${expert.display_name}`,
            description: TIER_CONFIG[tier].description,
          },
          unit_amount: total,
        },
        quantity: 1,
      }],
      payment_intent_data: {
        application_fee_amount: commission,
        transfer_data: { destination: expert.stripe_account_id },
      },
      metadata: {
        user_id:           user.id,
        expert_id:         expertId,
        tier,
        amount_base:       String(basePrice),
        amount_commission: String(commission),
        amount_total:      String(total),
        ...(trialDeadlineHours != null && { trial_deadline_hours: String(trialDeadlineHours) }),
      },
      customer_email: user.email,
      success_url: `${origin}/dashboard?order=paid`,
      cancel_url:  `${origin}/experts/${expertId}`,
    })
  } catch (err: any) {
    console.error('[checkout] Stripe error:', err)
    return NextResponse.json({ error: err.message ?? 'Error al crear sesión de pago' }, { status: 500 })
  }

  return NextResponse.json({ url: session.url })
}
