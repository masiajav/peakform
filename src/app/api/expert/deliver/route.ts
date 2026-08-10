import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { sendReviewReadyEmail } from '@/lib/email'

type DeliveredReviewResult = {
  review_id: string
  already_delivered: boolean
}

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { orderId, summary, errors, positives, action_plan, timestamps, cross_analysis, roadmap } = body

  if (!orderId || !summary?.trim() || !errors?.trim() || !positives?.trim() || !action_plan?.trim()) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  const { data: expert } = await supabase
    .from('experts')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!expert) return NextResponse.json({ error: 'No eres un experto' }, { status: 403 })

  const { data: order } = await supabase
    .from('orders')
    .select('id, user_id, status')
    .eq('id', orderId)
    .eq('expert_id', expert.id)
    .single()

  if (!order) return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 })

  const supabaseAdmin = createAdminClient()

  const { data: existingReviews, error: existingReviewError } = await supabaseAdmin
    .from('reviews')
    .select('id')
    .eq('order_id', orderId)
    .limit(1)

  if (existingReviewError) {
    console.error('[deliver] existing review lookup failed:', existingReviewError)
    return NextResponse.json({ error: existingReviewError.message }, { status: 500 })
  }

  const existingReview = existingReviews?.[0] ?? null

  if (order.status === 'delivered' && existingReview) {
    return NextResponse.json({ ok: true, orderId, reviewId: existingReview.id, alreadyDelivered: true })
  }

  if (order.status !== 'in_review') {
    return NextResponse.json({ error: 'El pedido no esta en revision' }, { status: 400 })
  }

  let reviewId: string | null = null
  const { data: deliveredReview, error: deliveryError } = await supabaseAdmin
    .rpc('deliver_expert_review', {
      p_order_id:       orderId,
      p_expert_id:      expert.id,
      p_summary:        summary.trim(),
      p_errors:         errors.trim(),
      p_positives:      positives.trim(),
      p_action_plan:    action_plan.trim(),
      p_timestamps:     timestamps ?? [],
      p_cross_analysis: cross_analysis ?? null,
      p_roadmap:        roadmap ?? null,
    })
    .maybeSingle()

  const rpcMissing = deliveryError?.code === 'PGRST202'
  const delivered = deliveredReview as DeliveredReviewResult | null

  if (!deliveryError && delivered) {
    reviewId = delivered.review_id
    if (delivered.already_delivered) {
      return NextResponse.json({ ok: true, orderId, reviewId, alreadyDelivered: true })
    }
  } else if (!rpcMissing) {
    console.error('[deliver] transactional delivery failed:', deliveryError)
    const message = deliveryError?.message ?? 'No se pudo entregar la review'
    const status = message.includes('revision') || message.includes('encontrado') ? 400 : 500
    return NextResponse.json({ error: message }, { status })
  }

  if (rpcMissing) {
    reviewId = existingReview?.id ?? null
    if (!reviewId) {
      const { data: insertedReview, error: reviewError } = await supabaseAdmin
        .from('reviews')
        .insert({
          order_id:      orderId,
          expert_id:     expert.id,
          user_id:       order.user_id,
          summary:       summary.trim(),
          errors:        errors.trim(),
          positives:     positives.trim(),
          action_plan:   action_plan.trim(),
          timestamps:    timestamps ?? [],
          cross_analysis: cross_analysis ?? null,
          roadmap:       roadmap ?? null,
        })
        .select('id')
        .single()

      if (reviewError) {
        console.error('[deliver] insert review failed:', reviewError)
        return NextResponse.json({ error: reviewError.message }, { status: 500 })
      }

      reviewId = insertedReview.id
    }

    const deliveredAt = new Date().toISOString()
    const { error: orderError } = await supabaseAdmin
      .from('orders')
      .update({ status: 'delivered', delivered_at: deliveredAt })
      .eq('id', orderId)
      .eq('expert_id', expert.id)

    if (orderError) {
      console.error('[deliver] update order failed:', orderError)
      return NextResponse.json({ error: orderError.message }, { status: 500 })
    }

    const { error: metricsError } = await supabaseAdmin.rpc('increment_expert_reviews', { p_expert_id: expert.id })
    if (metricsError) console.error('[deliver] metrics update failed:', metricsError)
  }

  try {
    const { data: userAuth } = await supabaseAdmin.auth.admin.getUserById(order.user_id)
    const userEmail = userAuth?.user?.email

    if (userEmail) {
      const { data: expertData } = await supabaseAdmin
        .from('experts')
        .select('display_name')
        .eq('id', expert.id)
        .single()

      const { data: orderData } = await supabaseAdmin
        .from('orders')
        .select('tier')
        .eq('id', orderId)
        .single()

      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
      await sendReviewReadyEmail({
        to:         userEmail,
        expertName: expertData?.display_name ?? 'Tu experto',
        tier:       orderData?.tier ?? 'pro',
        reviewUrl:  `${appUrl}/dashboard/review/${orderId}`,
      })
    }
  } catch (err) {
    console.error('[deliver] email to user failed:', err)
  }

  return NextResponse.json({ ok: true, orderId, reviewId })
}
