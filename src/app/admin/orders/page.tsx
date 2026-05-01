import { createAdminClient } from '@/lib/supabase/admin'
import { formatPrice } from '@/types'

const STATUS_COLORS: Record<string, string> = {
  pending_payment: 'var(--text3)',
  paid:            'var(--yellow)',
  in_review:       'var(--accent)',
  delivered:       'var(--green)',
  disputed:        'var(--danger)',
}
const STATUS_LABELS: Record<string, string> = {
  pending_payment: 'Pendiente',
  paid:            'Pagado',
  in_review:       'En revisión',
  delivered:       'Entregado',
  disputed:        'Disputado',
}
const TIER_LABELS: Record<string, string> = {
  starter: 'Starter', pro: 'Pro', deep_dive: 'Deep Dive',
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const supabase = createAdminClient()
  const filter = searchParams.status ?? ''

  let query = supabase
    .from('orders')
    .select('id, status, tier, amount_base, amount_commission, amount_total, created_at, paid_at, delivered_at, expert_id, user_id')
    .order('created_at', { ascending: false })
    .limit(100)

  if (filter) query = query.eq('status', filter)

  const { data: orders } = await query

  // Fetch expert names separately
  const expertIds = Array.from(new Set((orders ?? []).map((o: any) => o.expert_id)))
  const { data: experts } = expertIds.length > 0
    ? await supabase.from('experts').select('id, display_name').in('id', expertIds)
    : { data: [] }

  const expertMap = Object.fromEntries((experts ?? []).map((e: any) => [e.id, e.display_name]))

  const statusFilters = [
    { key: '',                label: 'Todos' },
    { key: 'pending_payment', label: 'Pendiente' },
    { key: 'paid',            label: 'Pagado' },
    { key: 'in_review',       label: 'En revisión' },
    { key: 'delivered',       label: 'Entregado' },
    { key: 'disputed',        label: 'Disputado' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--yellow)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 6 }}>
          ADMINISTRACIÓN
        </div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 30, letterSpacing: 1, color: 'var(--text)', margin: 0 }}>
          PEDIDOS
        </h1>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 24, borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
        {statusFilters.map(({ key, label }) => (
          <a key={key} href={`/admin/orders${key ? `?status=${key}` : ''}`} style={{
            padding: '8px 16px',
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 13,
            letterSpacing: 1,
            textDecoration: 'none',
            color: filter === key ? 'var(--text)' : 'var(--text2)',
            borderBottom: filter === key ? '2px solid var(--yellow)' : '2px solid transparent',
            marginBottom: -1,
          }}>
            {label}
          </a>
        ))}
      </div>

      {!orders || orders.length === 0 ? (
        <div style={{ fontSize: 14, color: 'var(--text3)', padding: '32px 0' }}>
          No hay pedidos en este estado.
        </div>
      ) : (
        <div style={{ border: '1px solid var(--border)' }}>
          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '140px 1fr 1fr 80px 100px 120px',
            padding: '10px 20px', background: 'var(--surface2)',
            fontSize: 11, letterSpacing: 1, color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif',
          }}>
            <span>ID</span>
            <span>EXPERTO</span>
            <span>ESTADO</span>
            <span>TIER</span>
            <span>IMPORTE</span>
            <span>FECHA</span>
          </div>

          {orders.map((order: any) => (
            <div key={order.id} style={{
              display: 'grid', gridTemplateColumns: '140px 1fr 1fr 80px 100px 120px',
              padding: '12px 20px', borderTop: '1px solid var(--border)',
              alignItems: 'center', background: 'var(--surface)',
            }}>
              <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'monospace' }}>
                {order.id.slice(0, 8)}…
              </div>
              <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                {expertMap[order.expert_id] ?? '—'}
              </div>
              <div style={{ fontSize: 12, color: STATUS_COLORS[order.status] ?? 'var(--text2)' }}>
                ● {STATUS_LABELS[order.status] ?? order.status}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text2)' }}>
                {TIER_LABELS[order.tier] ?? order.tier}
              </div>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text)' }}>{formatPrice(order.amount_total)}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>comis. {formatPrice(order.amount_commission)}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text3)' }}>
                {new Date(order.created_at).toLocaleDateString('es-ES')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
