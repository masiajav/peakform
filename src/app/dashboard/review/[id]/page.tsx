import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import AppNav from '@/components/layout/AppNav'
import FollowupThread from '@/components/FollowupThread'
import RatingForm from './RatingForm'
import { TIER_CONFIG } from '@/types'

export default async function UserReviewPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, display_name')
    .eq('id', user.id)
    .single()

  const { data: order } = await supabase
    .from('orders')
    .select('*, expert:experts(display_name, peak_rank, main_role, battletag)')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (!order) notFound()
  if (order.status !== 'delivered') redirect('/dashboard')

  const { data: review } = await supabase
    .from('reviews')
    .select('*')
    .eq('order_id', order.id)
    .maybeSingle()

  if (!review) redirect('/dashboard')

  const { data: messages } = await supabase
    .from('followup_messages')
    .select('id, sender_id, message, created_at')
    .eq('order_id', order.id)
    .order('created_at', { ascending: true })

  const tierConfig = TIER_CONFIG[order.tier as keyof typeof TIER_CONFIG]

  const sections = [
    { label: 'RESUMEN EJECUTIVO',     key: 'summary',       color: 'var(--accent)' },
    { label: 'ERRORES IDENTIFICADOS', key: 'errors',        color: 'var(--danger)' },
    { label: 'PUNTOS FUERTES',        key: 'positives',     color: 'var(--green)' },
    { label: 'PLAN DE ACCIÓN',        key: 'action_plan',   color: 'var(--purple)' },
    ...(review.cross_analysis ? [{ label: 'ANÁLISIS CRUZADO', key: 'cross_analysis', color: 'var(--yellow)' }] : []),
    ...(review.roadmap        ? [{ label: 'HOJA DE RUTA',     key: 'roadmap',        color: 'var(--text2)' }] : []),
  ]

  const timestamps: { time: string; label: string; type: string }[] = review.timestamps ?? []

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <AppNav role="user" displayName={profile?.display_name || user.email} />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>

        <Link href="/dashboard" style={{
          fontSize: 13, color: 'var(--text2)', display: 'inline-flex',
          alignItems: 'center', gap: 6, marginBottom: 28, textDecoration: 'none',
        }}>
          ← Volver al dashboard
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11,
              fontWeight: 500,
              background: 'var(--surface3)',
              color: 'var(--text2)',
              border: '1px solid var(--border2)',
              padding: '3px 9px',
            }}>
              {tierConfig.label}
            </span>
            <span style={{ fontSize: 12, color: 'var(--green)' }}>● Entregado</span>
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: 'var(--text)', margin: 0, letterSpacing: 1 }}>
            TU ANÁLISIS DE REPLAY
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 14, margin: '6px 0 0' }}>
            por {order.expert?.display_name} · {order.expert?.peak_rank}
            {' · '}Entregado el {new Date(review.created_at).toLocaleDateString('es-ES')}
          </p>
        </div>

        {/* Review sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          {sections.map(({ label, key, color }) =>
            review[key] ? (
              <div key={key} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '24px' }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color, fontFamily: 'Bebas Neue, sans-serif', marginBottom: 14 }}>
                  {label}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                  {review[key]}
                </div>
              </div>
            ) : null
          )}
        </div>

        {/* Timestamps */}
        {timestamps.length > 0 && (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '24px', marginBottom: 32 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 16 }}>
              TIMESTAMPS ({timestamps.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {timestamps.map((ts, i) => {
                const typeColor = ts.type === 'error' ? 'var(--danger)' : ts.type === 'positive' ? 'var(--green)' : 'var(--text2)'
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: 15,
                      color: 'var(--accent)',
                      minWidth: 48,
                    }}>
                      {ts.time}
                    </span>
                    <span style={{ fontSize: 14, color: 'var(--text)', flex: 1 }}>
                      {ts.label}
                    </span>
                    <span style={{ fontSize: 11, color: typeColor, textTransform: 'uppercase', letterSpacing: 1 }}>
                      {ts.type}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <RatingForm
          reviewId={review.id}
          existingRating={review.rating ?? null}
          existingComment={review.rating_comment ?? null}
        />

        <FollowupThread
          orderId={order.id}
          currentUserId={user.id}
          otherPartyLabel={order.expert?.display_name ?? 'Experto'}
          initialMessages={messages ?? []}
        />

      </div>
    </div>
  )
}
