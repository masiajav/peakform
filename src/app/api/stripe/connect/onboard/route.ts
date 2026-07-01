import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import {
  getStripeErrorCode,
  getStripeConnectStatus,
  requestDestinationChargeCapabilities,
} from '@/lib/stripe-connect'
import { isSupportedStripeCountry, normalizeStripeCountry } from '@/lib/stripe-countries'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'expert') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { data: expert } = await supabase
    .from('experts')
    .select('id, stripe_account_id')
    .eq('user_id', user.id)
    .single()
  if (!expert) return NextResponse.json({ error: 'Expert not found' }, { status: 404 })

  let body: { country?: string } = {}
  try {
    body = await request.json()
  } catch {}

  const requestedCountry = body.country?.toUpperCase() ?? 'ES'
  if (!isSupportedStripeCountry(requestedCountry)) {
    return NextResponse.json({ error: 'Selecciona un país compatible antes de conectar Stripe' }, { status: 400 })
  }
  const country = normalizeStripeCountry(requestedCountry)

  const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  try {
    const stripe = getStripe()
    let accountId = expert.stripe_account_id

    const currentStatus = await getStripeConnectStatus(accountId)
    let createNewAccount = !accountId || !currentStatus.accountExists

    if (accountId && currentStatus.statusCheckFailed) {
      return NextResponse.json({
        error: 'No hemos podido comprobar tu cuenta actual de Stripe. Inténtalo de nuevo en unos minutos.',
      }, { status: 503 })
    }

    const countryMismatch = accountId
      && currentStatus.country
      && currentStatus.country !== country

    if (countryMismatch) {
      const supportedReplacement = currentStatus.country === 'ES' && country === 'CL'
      if (!supportedReplacement) {
        return NextResponse.json({
          error: 'Este cambio de país necesita revisión manual. Contacta con soporte.',
        }, { status: 409 })
      }
      if (currentStatus.detailsSubmitted || currentStatus.readyForDestinationCharges) {
        return NextResponse.json({
          error: 'Esta cuenta de Stripe ya tiene actividad y no puede cambiar de país automáticamente. Contacta con soporte.',
        }, { status: 409 })
      }
      createNewAccount = true
    }

    if (createNewAccount) {
      const account = await stripe.accounts.create({
        type: 'express',
        country,
        email: user.email,
        capabilities: { card_payments: { requested: true }, transfers: { requested: true } },
        metadata: {
          expert_id: expert.id,
          ...(accountId ? { replaces_account: accountId } : {}),
        },
      }, {
        idempotencyKey: `connect-account-${expert.id}-${country}-${accountId ?? 'new'}`,
      })
      accountId = account.id
      const { error: updateError } = await supabase
        .from('experts')
        .update({ stripe_account_id: accountId })
        .eq('id', expert.id)
      if (updateError) throw updateError
    } else if (accountId) {
      await requestDestinationChargeCapabilities(accountId)
    }

    if (!accountId) throw new Error('Stripe account was not created')

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
