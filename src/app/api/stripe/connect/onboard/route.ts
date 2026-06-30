import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getStripeErrorCode, getStripeConnectStatus, requestTransfersCapability } from '@/lib/stripe-connect'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'expert') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { data: expert } = await supabase.from('experts').select('id, stripe_account_id').eq('user_id', user.id).single()
  if (!expert) return NextResponse.json({ error: 'Expert not found' }, { status: 404 })

  const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  try {
    const stripe = getStripe()
    let accountId = expert.stripe_account_id

    const currentStatus = await getStripeConnectStatus(accountId)
    if (!accountId || !currentStatus.accountExists) {
      const account = await stripe.accounts.create({
        type: 'express',
        capabilities: { card_payments: { requested: true }, transfers: { requested: true } },
      })
      accountId = account.id
      await supabase.from('experts').update({ stripe_account_id: accountId }).eq('id', expert.id)
    } else if (!currentStatus.readyForDestinationCharges && !currentStatus.statusCheckFailed) {
      await requestTransfersCapability(accountId)
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${origin}/stripe/connect/refresh`,
      return_url:  `${origin}/stripe/connect/return`,
      type: 'account_onboarding',
    })

    return NextResponse.json({ url: accountLink.url })
  } catch (error) {
    console.error('[stripe/connect/onboard] Unable to continue onboarding', {
      code: getStripeErrorCode(error),
      expertId: expert.id,
    })
    return NextResponse.json({
      error: 'No hemos podido abrir la configuración de Stripe. Inténtalo de nuevo en unos minutos.',
    }, { status: 500 })
  }
}
