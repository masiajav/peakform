import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

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
    return NextResponse.json({ error: 'Solo accesible para expertos' }, { status: 403 })
  }

  const body = await request.json()
  const {
    price_starter,
    price_pro,
    price_deep_dive,
    description_starter,
    description_pro,
    description_deep_dive,
    tier_starter_enabled,
    tier_pro_enabled,
    tier_deep_dive_enabled,
  } = body

  const priceStarterCents  = Math.round(parseFloat(price_starter)  * 100)
  const priceProCents      = Math.round(parseFloat(price_pro)       * 100)
  const priceDeepDiveCents = Math.round(parseFloat(price_deep_dive) * 100)

  if (!Number.isFinite(priceStarterCents) || !Number.isFinite(priceProCents) || !Number.isFinite(priceDeepDiveCents)) {
    return NextResponse.json({ error: 'Precios invalidos' }, { status: 400 })
  }

  if (priceStarterCents < 200 || priceProCents < 500 || priceDeepDiveCents < 800) {
    return NextResponse.json({ error: 'Respeta los minimos: Starter 2 EUR, Pro 5 EUR, Deep Dive 8 EUR' }, { status: 400 })
  }

  const starterEnabled = !!tier_starter_enabled
  const proEnabled = !!tier_pro_enabled
  const deepDiveEnabled = !!tier_deep_dive_enabled

  if (!starterEnabled && !proEnabled && !deepDiveEnabled) {
    return NextResponse.json({ error: 'Deja al menos un tier estandar activo' }, { status: 400 })
  }

  const { error } = await supabase
    .from('experts')
    .update({
      price_starter: priceStarterCents,
      price_pro: priceProCents,
      price_deep_dive: priceDeepDiveCents,
      description_starter: description_starter?.trim() || null,
      description_pro: description_pro?.trim() || null,
      description_deep_dive: description_deep_dive?.trim() || null,
      tier_starter_enabled: starterEnabled,
      tier_pro_enabled: proEnabled,
      tier_deep_dive_enabled: deepDiveEnabled,
    })
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
