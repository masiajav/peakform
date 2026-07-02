import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { canResetStripeConnection, getStripeConnectStatus } from '@/lib/stripe-connect'

export async function POST() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'expert') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data: expert } = await supabase
    .from('experts')
    .select('id, stripe_account_id')
    .eq('user_id', user.id)
    .single()

  if (!expert) return NextResponse.json({ error: 'Experto no encontrado' }, { status: 404 })
  if (!expert.stripe_account_id) return NextResponse.json({ unlinked: true })

  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('id')
    .eq('expert_id', expert.id)
    .limit(1)

  if (ordersError) {
    console.error('[stripe/connect/unlink] Unable to verify expert orders', {
      expertId: expert.id,
      code: ordersError.code,
    })
    return NextResponse.json({
      error: 'No hemos podido comprobar tus pedidos. Inténtalo de nuevo en unos minutos.',
    }, { status: 503 })
  }

  const status = await getStripeConnectStatus(expert.stripe_account_id)
  if (!canResetStripeConnection(status, (orders?.length ?? 0) > 0)) {
    return NextResponse.json({
      error: 'Esta cuenta tiene pedidos o actividad de cobro. Contacta con soporte para cambiarla de forma segura.',
    }, { status: 409 })
  }

  const { error: updateError } = await supabase
    .from('experts')
    .update({ stripe_account_id: null })
    .eq('id', expert.id)
    .eq('stripe_account_id', expert.stripe_account_id)

  if (updateError) {
    console.error('[stripe/connect/unlink] Unable to clear Stripe account', {
      expertId: expert.id,
      code: updateError.code,
    })
    return NextResponse.json({
      error: 'No hemos podido desvincular la cuenta antigua. Inténtalo de nuevo.',
    }, { status: 500 })
  }

  return NextResponse.json({ unlinked: true })
}
