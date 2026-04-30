import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AppNav from '@/components/layout/AppNav'

export default async function DashboardPage({ searchParams }: { searchParams: { order?: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: orders } = await supabase
    .from('orders')
    .select('*, expert:experts(display_name, peak_rank, main_role)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <AppNav role="user" displayName={profile?.display_name || user.email} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: 'var(--text)', margin: 0, letterSpacing: 1 }}>
            MIS REPLAYS
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 14, margin: '6px 0 0' }}>
            Sigue el progreso de tus análisis
          </p>
        </div>

        {/* Banner de confirmación post-pago */}
        {searchParams.order === 'paid' && (
          <div style={{
            background: 'rgba(0,214,127,0.06)', border: '1px solid rgba(0,214,127,0.3)',
            padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ color: 'var(--green)', fontSize: 18 }}>✓</span>
            <div>
              <div style={{ fontSize: 14, color: 'var(--green)', fontWeight: 600 }}>¡Pago completado!</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>
                Ahora sube tu replay para que el experto empiece.
              </div>
            </div>
          </div>
        )}

        {/* CTA si no hay pedidos */}
        {(!orders || orders.length === 0) ? (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border2)',
            padding: '48px 32px',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, color: 'var(--text2)', marginBottom: 12 }}>
              AÚN NO TIENES ANÁLISIS
            </div>
            <p style={{ color: 'var(--text3)', fontSize: 14, marginBottom: 24 }}>
              Elige un experto y envía tu primer replay para empezar a mejorar.
            </p>
            <a href="/experts" className="btn btn-primary">
              VER EXPERTOS →
            </a>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {orders.map((order: any) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function OrderCard({ order }: { order: any }) {
  const STATUS_COLORS: Record<string, string> = {
    pending_payment: 'var(--yellow)',
    paid:            'var(--accent)',
    in_review:       'var(--purple)',
    delivered:       'var(--green)',
    disputed:        'var(--danger)',
  }

  const STATUS_LABELS: Record<string, string> = {
    pending_payment: 'Pendiente de pago',
    paid:            'Pagado — esperando revisión',
    in_review:       'En revisión',
    delivered:       'Entregado',
    disputed:        'Disputado',
  }

  const TIER_LABELS: Record<string, string> = {
    starter:   'Starter',
    pro:       'Pro',
    deep_dive: 'Deep Dive',
  }

  const isNew = order.status === 'delivered' && !order.review_seen

  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${isNew ? 'var(--accent)' : 'var(--border)'}`,
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
    }}>
      {/* Tier */}
      <div style={{ minWidth: 100 }}>
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 11,
          fontWeight: 500,
          background: 'var(--surface3)',
          color: 'var(--text2)',
          border: '1px solid var(--border2)',
          padding: '3px 9px',
        }}>
          {TIER_LABELS[order.tier] || order.tier}
        </span>
      </div>

      {/* Experto */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>
          {order.expert?.display_name || 'Experto'}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>
          {order.expert?.peak_rank} · {order.expert?.main_role}
        </div>
      </div>

      {/* Total */}
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, color: 'var(--text)' }}>
        €{(order.amount_total / 100).toFixed(2)}
      </div>

      {/* Status */}
      <div style={{
        fontSize: 12,
        color: STATUS_COLORS[order.status] || 'var(--text2)',
        fontWeight: 500,
        minWidth: 140,
        textAlign: 'right',
      }}>
        {isNew && <span style={{ color: 'var(--accent)', marginRight: 6 }}>● NUEVO</span>}
        {STATUS_LABELS[order.status] || order.status}
      </div>

      {/* CTA */}
      {order.status === 'paid' && (
        <a href={`/orders/${order.id}/submit`} className="btn btn-primary btn-sm">
          SUBIR REPLAY →
        </a>
      )}
      {order.status === 'delivered' && (
        <a href={`/dashboard/review/${order.id}`} className="btn btn-primary btn-sm">
          VER REVIEW
        </a>
      )}
    </div>
  )
}
