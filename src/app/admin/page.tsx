import { createAdminClient } from '@/lib/supabase/admin'
import { formatPrice } from '@/types'

export default async function AdminPage() {
  const supabase = createAdminClient()

  const [
    { count: totalUsers },
    { count: activeExperts },
    { count: pendingExperts },
    { count: totalOrders },
    { count: deliveredOrders },
    { data: revenueRows },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'user'),
    supabase.from('experts').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('experts').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'delivered'),
    supabase.from('orders').select('amount_commission').eq('status', 'delivered'),
  ])

  const revenue = (revenueRows ?? []).reduce((sum: number, r: any) => sum + (r.amount_commission || 0), 0)

  const { data: recentOrders } = await supabase
    .from('orders')
    .select('id, status, tier, amount_total, created_at, expert_id')
    .order('created_at', { ascending: false })
    .limit(8)

  const { data: pendingExpertsList } = await supabase
    .from('experts')
    .select('id, display_name, battletag, peak_rank, main_role, created_at')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(5)

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

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--yellow)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 6 }}>
          ADMINISTRACIÓN
        </div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 30, letterSpacing: 1, color: 'var(--text)', margin: 0 }}>
          PANEL GENERAL
        </h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 40 }}>
        {[
          { label: 'USUARIOS',        value: totalUsers ?? 0,     color: 'var(--text)' },
          { label: 'EXPERTOS ACTIVOS', value: activeExperts ?? 0,  color: 'var(--green)' },
          { label: 'SOLICITUDES',      value: pendingExperts ?? 0, color: 'var(--yellow)' },
          { label: 'PEDIDOS TOTALES',  value: totalOrders ?? 0,    color: 'var(--text)' },
          { label: 'ENTREGADOS',       value: deliveredOrders ?? 0, color: 'var(--green)' },
          { label: 'INGRESOS (comis.)', value: formatPrice(revenue), color: 'var(--accent)' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '18px 20px' }}>
            <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 10 }}>
              {label}
            </div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color, letterSpacing: 1 }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

        {/* Pending applications */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--yellow)', fontFamily: 'Bebas Neue, sans-serif' }}>
              SOLICITUDES PENDIENTES
            </div>
            <a href="/admin/experts" style={{ fontSize: 12, color: 'var(--text2)', textDecoration: 'none' }}>
              Ver todas →
            </a>
          </div>
          {!pendingExpertsList || pendingExpertsList.length === 0 ? (
            <p style={{ fontSize: 13, color: 'var(--text3)', margin: 0 }}>No hay solicitudes pendientes</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pendingExpertsList.map((e: any) => (
                <div key={e.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 0', borderBottom: '1px solid var(--border)',
                }}>
                  <div>
                    <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{e.display_name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text2)' }}>{e.peak_rank} · {e.main_role}</div>
                  </div>
                  <a href="/admin/experts" style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none' }}>
                    Revisar
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent orders */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif' }}>
              PEDIDOS RECIENTES
            </div>
            <a href="/admin/orders" style={{ fontSize: 12, color: 'var(--text2)', textDecoration: 'none' }}>
              Ver todos →
            </a>
          </div>
          {!recentOrders || recentOrders.length === 0 ? (
            <p style={{ fontSize: 13, color: 'var(--text3)', margin: 0 }}>No hay pedidos</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {recentOrders.map((o: any) => (
                <div key={o.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '9px 0', borderBottom: '1px solid var(--border)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 12, color: 'var(--text2)' }}>
                      {TIER_LABELS[o.tier] ?? o.tier}
                    </span>
                    <span style={{ fontSize: 11, color: STATUS_COLORS[o.status] ?? 'var(--text2)' }}>
                      ● {STATUS_LABELS[o.status] ?? o.status}
                    </span>
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--text2)' }}>
                    {formatPrice(o.amount_total)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
