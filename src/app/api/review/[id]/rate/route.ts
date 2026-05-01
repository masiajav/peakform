import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { rating, comment } = await request.json()
  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Valoración inválida' }, { status: 400 })
  }

  // Verify the review belongs to this user
  const { data: review } = await supabase
    .from('reviews')
    .select('id, expert_id, rating')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (!review) return NextResponse.json({ error: 'Review no encontrada' }, { status: 404 })
  if (review.rating) return NextResponse.json({ error: 'Ya has valorado esta review' }, { status: 400 })

  const admin = createAdminClient()

  const { error } = await admin
    .from('reviews')
    .update({ rating, rating_comment: comment?.trim() || null })
    .eq('id', params.id)

  if (error) {
    console.error('[rate] update failed:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Recalculate expert avg_rating and total_reviews
  const { data: allRatings } = await admin
    .from('reviews')
    .select('rating')
    .eq('expert_id', review.expert_id)
    .not('rating', 'is', null)

  if (allRatings && allRatings.length > 0) {
    const avg = allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length
    await admin
      .from('experts')
      .update({
        avg_rating: Math.round(avg * 100) / 100,
        total_reviews: allRatings.length,
      })
      .eq('id', review.expert_id)
  }

  return NextResponse.json({ ok: true })
}
