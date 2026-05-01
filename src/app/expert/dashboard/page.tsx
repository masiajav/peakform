import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AppNav from '@/components/layout/AppNav'

export default async function ExpertDashboardPage({
  searchParams,
}: {
  searchParams: { delivered?: string }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, display_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'expert') redirect('/dashboard')

  const { data: expert } = await supabase
    .from('experts')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!expert) redirect('/dashboard')

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('expert_id', expert.id)
    .order('created_at', { ascending: false })

  const paid      = orders?.filter(o => o.status === 'paid')      ?? []
  const inReview  = orders?.filter(o => o.status === 'in_review') ?? []
  const delivered = orders?.filter(o => o.status === 'delivered') ?? []

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <AppNav role="expert" displayName={profile?.display_name || user.email} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 36, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: 'var(--text)', margin: 0, letterSpacing: 1 }}>
              PANEL EXPERTO
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: 14, margin: '6px 0 0' }}>
              {expert.display_name} · {expert.peak_rank} · {expert.main_role}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 28 }}>
            <Stat label="EN REVISIÓN" value={inReview.length} color="var(--accent)" />
            <Stat label="ENTREGADOS"  value={delivered.length} color="var(--green)" />
            <Stat
              label="VALORACIÓN"
              value={expert.avg_rating > 0 ? `${Number(expert.avg_rating).toFixed(1)}★` : '—'}
            />
          </div>
        </div>

        {/* Banner entrega completada */}
        {searchParams.delivered === '1' && (
          <div style={{
            background: 'rgba(0,214,127,0.06)', border: '1px solid rgba(0,214,127,0.3)',
            padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ color: 'var(--green)', fontSize: 18 }}>✓</span>
            <div>
              <div style={{ fontSize: 14, color: 'var(--green)', fontWeight: 600 }}>¡Review entregada!</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>
                El cliente ha recibido su análisis.
              </div>
            </div>
          </div>
        )}

        {/* Esperando replay */}
        {paid.length > 0 && (
          <Section label={`ESPERANDO REPLAY (${paid.length})`} color="var(--yellow)">
            {paid.map(order => <ExpertOrderCard key={order.id} order={order} />)}
          </Section>
        )}

        {/* En revisión */}
        <Section label={`EN REVISIÓN (${inReview.length})`} color="var(--accent)">
          {inReview.length === 0 ? (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '32px', textAlign: 'center', color: 'var(--text3)', fontSize: 14 }}>
              No tienes pedidos pendientes de revisar
            </div>
          ) : (
            inReview.map(order => <ExpertOrderCard key={order.id} order={order} />)
          )}
        </Section>

        {/* Historial */}
        {delivered.length > 0 && (
          <Section label={`HISTORIAL (${delivered.length})`} color="var(--text2)">
            {delivered.map(order => <ExpertOrderCard key={order.id} order={order} />)}
          </Section>
        )}

        {/* Empty state */}
        {(!orders || orders.length === 0) && (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '48px 32px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, color: 'var(--text2)', marginBottom: 12 }}>
              AÚN NO TIENES PEDIDOS
            </div>
            <p style={{ color: 'var(--text3)', fontSize: 14 }}>
              Los clientes te asignarán pedidos cuando compren una review contigo.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

function Stat({ label, value, color }: { label: string; value: number | string; color?: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: color ?? 'var(--text)', lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text2)', letterSpacing: 1, marginTop: 4 }}>{label}</div>
    </div>
  )
}

function Section({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 11, letterSpacing: 2, color, fontFamily: 'Bebas Neue, sans-serif', marginBottom: 12 }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {children}
      </div>
    </div>
  )
}

function ExpertOrderCard({ order }: { order: any }) {
  const TIER_LABELS: Record<string, string> = {
    starter: 'Starter', pro: 'Pro', deep_dive: 'Deep Dive',
  }
  const STATUS_COLORS: Record<string, string> = {
    paid:      'var(--yellow)',
    in_review: 'var(--accent)',
    delivered: 'var(--green)',
  }
  const STATUS_LABELS: Record<string, string> = {
    paid:      'Esperando replay',
    in_review: 'En revisión',
    delivered: 'Entregado',
  }

  function deadlineLabel(dl: string | null): string {
    if (!dl) return ''
    const diff = new Date(dl).getTime() - Date.now()
    if (diff < 0) return 'VENCIDO'
    const h = Math.floor(diff / 3_600_000)
    if (h < 24) return `${h}h restantes`
    return `${Math.floor(h / 24)}d ${h % 24}h restantes`
  }

  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${order.status === 'in_review' ? 'var(--accent)' : 'var(--border)'}`,
      padding: '18px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap',
    }}>
      <span style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 11,
        fontWeight: 500,
        background: 'var(--surface3)',
        color: 'var(--text2)',
        border: '1px solid var(--border2)',
        padding: '3px 9px',
        minWidth: 72,
        textAlign: 'center',
      }}>
        {TIER_LABELS[order.tier] || order.tier}
      </span>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500, textTransform: 'capitalize' }}>
          {order.player_role || 'Sin rol'}
          {order.focus_areas?.length > 0 && (
            <span style={{ color: 'var(--text2)', fontWeight: 400 }}>
              {' · '}{order.focus_areas.slice(0, 2).join(', ')}
              {order.focus_areas.length > 2 ? ` +${order.focus_areas.length - 2}` : ''}
            </span>
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 3 }}>
          {new Date(order.created_at).toLocaleDateString('es-ES')}
        </div>
      </div>

      {order.status !== 'delivered' && order.deadline_at && (
        <div style={{ fontSize: 12, color: 'var(--text2)' }}>
          {deadlineLabel(order.deadline_at)}
        </div>
      )}

      <div style={{ fontSize: 12, color: STATUS_COLORS[order.status] ?? 'var(--text2)', fontWeight: 500, minWidth: 110, textAlign: 'right' }}>
        {STATUS_LABELS[order.status] || order.status}
      </div>

      {order.status === 'in_review' && (
        <Link href={`/expert/orders/${order.id}`} className="btn btn-primary btn-sm">
          REVISAR →
        </Link>
      )}
      {order.status === 'delivered' && (
        <Link href={`/expert/orders/${order.id}`} className="btn btn-secondary btn-sm">
          VER →
        </Link>
      )}
    </div>
  )
}
