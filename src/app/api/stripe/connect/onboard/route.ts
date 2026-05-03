import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

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
    let accountId = expert.stripe_account_id

    if (!accountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        capabilities: { transfers: { requested: true } },
      })
      accountId = account.id
      await supabase.from('experts').update({ stripe_account_id: accountId }).eq('id', expert.id)
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${origin}/stripe/connect/refresh`,
      return_url:  `${origin}/stripe/connect/return`,
      type: 'account_onboarding',
    })

    return NextResponse.json({ url: accountLink.url })
  } catch (err: any) {
    console.error('[stripe/connect/onboard]', err)
    return NextResponse.json({ error: err.message ?? 'Error al conectar Stripe' }, { status: 500 })
  }
}
