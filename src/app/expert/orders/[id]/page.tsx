import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import AppNav from '@/components/layout/AppNav'
import FollowupThread from '@/components/FollowupThread'
import { TIER_CONFIG } from '@/types'
import ReviewForm from './ReviewForm'

export default async function ExpertOrderPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, display_name, avatar_url')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'expert') redirect('/dashboard')

  const { data: expert } = await supabase
    .from('experts')
    .select('id, display_name, peak_rank')
    .eq('user_id', user.id)
    .single()

  if (!expert) redirect('/dashboard')

  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', params.id)
    .eq('expert_id', expert.id)
    .single()

  if (!order) notFound()

  const admin = createAdminClient()
  const { data: reviewRows } = await admin
    .from('reviews')
    .select('*')
    .eq('order_id', order.id)
    .order('created_at', { ascending: true })
    .limit(1)

  const review = reviewRows?.[0] ?? null

  const { data: messages } = order.status === 'delivered'
    ? await supabase
        .from('followup_messages')
        .select('id, sender_id, message, created_at')
        .eq('order_id', order.id)
        .order('created_at', { ascending: true })
    : { data: null }

  const tierConfig = TIER_CONFIG[order.tier as keyof typeof TIER_CONFIG]

  function deadlineLabel(dl: string | null): string {
    if (!dl) return ''
    const diff = new Date(dl).getTime() - Date.now()
    if (diff < 0) return 'VENCIDO'
    const h = Math.floor(diff / 3_600_000)
    if (h < 24) return `${h}h restantes`
    return `${Math.floor(h / 24)}d ${h % 24}h restantes`
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <AppNav role="expert" displayName={profile?.display_name || user.email} avatarUrl={profile?.avatar_url} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>

        <Link href="/expert/dashboard" style={{
          fontSize: 13, color: 'var(--text2)', display: 'inline-flex',
          alignItems: 'center', gap: 6, marginBottom: 28, textDecoration: 'none',
        }}>
          ← Volver al panel
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
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
            <span style={{ fontSize: 12, color: order.status === 'delivered' ? 'var(--green)' : 'var(--accent)' }}>
              ● {order.status === 'delivered' ? 'Entregado' : 'En revisión'}
            </span>
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: 'var(--text)', margin: 0, letterSpacing: 1 }}>
            REVIEW {(order.player_role ?? 'SIN ROL').toUpperCase()}
          </h1>
          {order.deadline_at && order.status !== 'delivered' && (
            <p style={{ color: 'var(--text2)', fontSize: 13, margin: '6px 0 0' }}>
              Plazo: {new Date(order.deadline_at).toLocaleString('es-ES')}
              {' · '}
              <span style={{ color: deadlineLabel(order.deadline_at).startsWith('VENC') ? 'var(--danger)' : 'var(--yellow)' }}>
                {deadlineLabel(order.deadline_at)}
              </span>
            </p>
          )}
        </div>

        {/* Context card */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '24px', marginBottom: 36 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 18 }}>
            CONTEXTO DEL PEDIDO
          </div>
          <div style={{ display: 'grid', gap: 18 }}>

            <ContextRow label="Replay">
              {order.replay_url ? (
                order.replay_url.startsWith('http') ? (
                  <a href={order.replay_url} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 14, color: 'var(--accent)', wordBreak: 'break-all', textDecoration: 'none' }}>
                    {order.replay_url}
                  </a>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 11, background: 'rgba(255,107,43,0.12)', color: 'var(--accent)', padding: '2px 7px', border: '1px solid rgba(255,107,43,0.3)', letterSpacing: 1 }}>
                      CÓDIGO OW
                    </span>
                    <span style={{ fontSize: 15, fontFamily: 'monospace', color: 'var(--text)', letterSpacing: 2 }}>
                      {order.replay_url}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--yellow)' }}>⚠ expira con parches</span>
                  </div>
                )
              ) : (
                <span style={{ fontSize: 14, color: 'var(--text3)' }}>Sin enlace</span>
              )}
            </ContextRow>

            <ContextRow label="Rol">
              <span style={{ fontSize: 14, color: 'var(--text)', textTransform: 'capitalize' }}>
                {order.player_role || '—'}
              </span>
            </ContextRow>

            {order.focus_areas?.length > 0 && (
              <ContextRow label="Áreas de mejora">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {order.focus_areas.map((area: string) => (
                    <span key={area} style={{
                      fontSize: 12,
                      background: 'var(--surface3)',
                      color: 'var(--text2)',
                      border: '1px solid var(--border2)',
                      padding: '4px 10px',
                    }}>
                      {area}
                    </span>
                  ))}
                </div>
              </ContextRow>
            )}

            {order.user_notes && (
              <ContextRow label="Notas del jugador">
                <div style={{
                  fontSize: 14, color: 'var(--text)', lineHeight: 1.6,
                  background: 'var(--surface2)', padding: '12px 14px',
                  border: '1px solid var(--border)', whiteSpace: 'pre-wrap',
                }}>
                  {order.user_notes}
                </div>
              </ContextRow>
            )}

          </div>
        </div>

        {/* Review section */}
        {order.status === 'delivered' ? (
          review ? (
            <>
              <DeliveredReview review={review} tier={order.tier} />
              <FollowupThread
                orderId={order.id}
                currentUserId={user.id}
                otherPartyLabel="Jugador"
                initialMessages={messages ?? []}
              />
            </>
          ) : (
            <DeliveredWithoutReview orderId={order.id} />
          )
        ) : (
          <ReviewForm
            orderId={order.id}
            tier={order.tier}
          />
        )}

      </div>
    </div>
  )
}

function ContextRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  )
}

function DeliveredWithoutReview({ orderId }: { orderId: string }) {
  return (
    <div style={{ background: 'rgba(255,68,68,0.06)', border: '1px solid rgba(255,68,68,0.24)', padding: '20px 24px' }}>
      <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--danger)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 10 }}>
        INCONSISTENCIA DE ENTREGA
      </div>
      <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>
        El pedido {orderId} aparece como entregado, pero no hay feedback asociado. No se muestra el formulario para evitar duplicados; revisa el pedido en Supabase o contacta con soporte.
      </p>
    </div>
  )
}

function DeliveredReview({ review, tier }: { review: any; tier: string }) {
  const timestamps = Array.isArray(review.timestamps) ? review.timestamps : []
  const sections = [
    { label: 'RESUMEN EJECUTIVO',    key: 'summary' },
    { label: 'ERRORES IDENTIFICADOS', key: 'errors' },
    { label: 'PUNTOS FUERTES',       key: 'positives' },
    { label: 'PLAN DE ACCIÓN',       key: 'action_plan' },
    ...(tier !== 'starter' && review.cross_analysis ? [{ label: 'ANÁLISIS CRUZADO', key: 'cross_analysis' }] : []),
    ...(tier === 'deep_dive' && review.roadmap ? [{ label: 'HOJA DE RUTA', key: 'roadmap' }] : []),
  ]

  return (
    <div>
      <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--green)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 18 }}>
        REVIEW ENTREGADA · {new Date(review.created_at).toLocaleDateString('es-ES')}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {(tier === 'pro' || tier === 'deep_dive') && timestamps.length > 0 && (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px 24px' }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 12 }}>
              TIMESTAMPS ENTREGADOS
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {timestamps.map((item: any, index: number) => (
                <div key={`${item.time}-${index}`} style={{ display: 'grid', gridTemplateColumns: '72px 92px 1fr', gap: 10, alignItems: 'center', fontSize: 13 }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'monospace' }}>{item.time || '--:--'}</span>
                  <span style={{ color: item.type === 'positive' ? 'var(--green)' : item.type === 'note' ? 'var(--yellow)' : 'var(--danger)', textTransform: 'uppercase', fontSize: 11 }}>
                    {item.type || 'note'}
                  </span>
                  <span style={{ color: 'var(--text2)' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {sections.map(({ label, key }) =>
          review[key] ? (
            <div key={key} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px 24px' }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 12 }}>
                {label}
              </div>
              <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {review[key]}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}
