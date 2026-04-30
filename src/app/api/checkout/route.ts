import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { calculateTotal, TIER_CONFIG, OrderTier } from '@/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

type ExpertPriceRow = {
  id: string
  display_name: string
  price_starter: number
  price_pro: number
  price_deep_dive: number
}

const PRICE_FIELD: Record<OrderTier, keyof ExpertPriceRow> = {
  starter:   'price_starter',
  pro:       'price_pro',
  deep_dive: 'price_deep_dive',
}

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { expertId, tier } = await request.json() as { expertId: string; tier: OrderTier }

  if (!expertId || !['starter', 'pro', 'deep_dive'].includes(tier)) {
    return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 })
  }

  const { data: expert } = await supabase
    .from('experts')
    .select('id, display_name, price_starter, price_pro, price_deep_dive')
    .eq('id', expertId)
    .eq('status', 'active')
    .returns<ExpertPriceRow[]>()
    .single()

  if (!expert) return NextResponse.json({ error: 'Experto no encontrado' }, { status: 404 })

  const basePrice = expert[PRICE_FIELD[tier]] as number
  const { commission, total } = calculateTotal(basePrice)

  const origin = request.headers.get('origin') ?? 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: `Review ${TIER_CONFIG[tier].label} — ${expert.display_name}`,
          description: TIER_CONFIG[tier].description,
        },
        unit_amount: total,
      },
      quantity: 1,
    }],
    metadata: {
      user_id:           user.id,
      expert_id:         expertId,
      tier,
      amount_base:       String(basePrice),
      amount_commission: String(commission),
      amount_total:      String(total),
    },
    customer_email: user.email,
    success_url: `${origin}/dashboard?order=paid`,
    cancel_url:  `${origin}/experts/${expertId}`,
  })

  return NextResponse.json({ url: session.url })
}
