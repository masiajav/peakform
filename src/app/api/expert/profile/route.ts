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
    bio, specialties,
    price_starter, price_pro, price_deep_dive,
    description_starter, description_pro, description_deep_dive,
    trial_enabled, trial_price, trial_refundable, trial_deadline_hours,
  } = body

  const priceStarterCents  = Math.round(parseFloat(price_starter)  * 100)
  const priceProCents      = Math.round(parseFloat(price_pro)       * 100)
  const priceDeepDiveCents = Math.round(parseFloat(price_deep_dive) * 100)

  if (priceStarterCents < 200 || priceProCents < 500 || priceDeepDiveCents < 800) {
    return NextResponse.json({ error: 'Precio demasiado bajo' }, { status: 400 })
  }

  let trialPriceCents: number | null = null
  if (trial_enabled && trial_price != null) {
    trialPriceCents = Math.round(parseFloat(trial_price) * 100)
    if (trialPriceCents < 200) {
      return NextResponse.json({ error: 'El precio de prueba mínimo es 2€' }, { status: 400 })
    }
  }

  const deadlineHours = trial_deadline_hours != null ? parseInt(trial_deadline_hours) : 48
  if (deadlineHours < 24 || deadlineHours > 168) {
    return NextResponse.json({ error: 'El plazo de prueba debe ser entre 24 y 168 horas' }, { status: 400 })
  }

  const { error } = await supabase
    .from('experts')
    .update({
      bio:             bio?.trim() || null,
      specialties:     Array.isArray(specialties)
                         ? specialties
                         : (specialties as string)?.split(',').map((s: string) => s.trim()).filter(Boolean),
      price_starter:   priceStarterCents,
      price_pro:       priceProCents,
      price_deep_dive: priceDeepDiveCents,
      description_starter:   description_starter?.trim() || null,
      description_pro:       description_pro?.trim()     || null,
      description_deep_dive: description_deep_dive?.trim() || null,
      trial_enabled:        !!trial_enabled,
      trial_price:          trialPriceCents,
      trial_refundable:     !!trial_refundable,
      trial_deadline_hours: deadlineHours,
    })
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
