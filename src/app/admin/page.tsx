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
    { data: paidOrdersData },
    { data: topExperts },
    { count: completedPurchases },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'user'),
    supabase.from('experts').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('experts').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'delivered').is('refunded_at', null),
    supabase
      .from('orders')
      .select('created_at, paid_at, delivered_at, status, amount_base, amount_commission, amount_total, tier')
      .in('status', ['paid', 'in_review', 'delivered'])
      .is('refunded_at', null),
    supabase.from('experts').select('display_name, main_role, peak_rank, total_reviews, avg_rating').eq('status', 'active').order('total_reviews', { ascending: false }).limit(5),
    supabase.from('orders').select('*', { count: 'exact', head: true }).in('status', ['paid', 'in_review', 'delivered']).is('refunded_at', null),
  ])

  const paidRows = paidOrdersData ?? []
  const deliveredRows = paidRows.filter((o: any) => o.status === 'delivered')
  const activeRows = paidRows.filter((o: any) => o.status === 'paid' || o.status === 'in_review')

  const collectedCommission = paidRows.reduce((sum: number, r: any) => sum + (r.amount_commission || 0), 0)
  const realizedCommission = deliveredRows.reduce((sum: number, r: any) => sum + (r.amount_commission || 0), 0)
  const activeCommission = activeRows.reduce((sum: number, r: any) => sum + (r.amount_commission || 0), 0)
  const grossSales = paidRows.reduce((sum: number, r: any) => sum + (r.amount_total || 0), 0)
  const expertEarnings = paidRows.reduce((sum: number, r: any) => sum + (r.amount_base || 0), 0)

  // Monthly revenue — last 6 months
  const now = new Date()
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    const label = d.toLocaleString('es-ES', { month: 'short' }).toUpperCase()
    const orders = paidRows.filter((o: any) => {
      const od = new Date(o.paid_at ?? o.created_at)
      return od.getFullYear() === d.getFullYear() && od.getMonth() === d.getMonth()
    })
    return {
      label,
      revenue: orders.reduce((sum: number, o: any) => sum + (o.amount_commission ?? 0), 0),
      count: orders.length,
    }
  })
  const maxMonthRevenue = Math.max(...monthlyData.map(m => m.revenue), 1)

  // Tier distribution
  const tierDist = (['starter', 'pro', 'deep_dive'] as const).map(tier => ({
    tier,
    label: tier === 'deep_dive' ? 'Deep Dive' : tier.charAt(0).toUpperCase() + tier.slice(1),
    count: paidRows.filter((o: any) => o.tier === tier).length,
  }))
  const totalPaidRows = paidRows.length

  // Conversion rate (delivered vs all paid orders)
  const conversionRate = completedPurchases && completedPurchases > 0
    ? Math.round(((deliveredOrders ?? 0) / completedPurchases) * 100)
    : 0

  const { data: recentOrders } = await supabase
    .from('orders')
    .select('id, status, tier, amount_total, amount_commission, created_at, expert_id')
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
          { label: 'COMISIÓN COBRADA', value: formatPrice(collectedCommission), color: 'var(--accent)' },
          { label: 'COMISIÓN EN CURSO', value: formatPrice(activeCommission), color: 'var(--yellow)' },
          { label: 'VENTAS TOTALES', value: formatPrice(grossSales), color: 'var(--text)' },
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

      {/* Analytics */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 14 }}>
          ANALYTICS
        </div>

        {/* Monthly revenue chart */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif' }}>
              COMISIONES POR MES (últimos 6 meses)
            </div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>
              Total: <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{formatPrice(collectedCommission)}</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, marginBottom: 18 }}>
            <AdminMoneyPill label="Realizada" value={formatPrice(realizedCommission)} hint="Entregados, antes de fees Stripe" color="var(--green)" />
            <AdminMoneyPill label="En curso" value={formatPrice(activeCommission)} hint="Pagados o en revisión" color="var(--yellow)" />
            <AdminMoneyPill label="Para expertos" value={formatPrice(expertEarnings)} hint="Base sin comisión" color="var(--text2)" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {monthlyData.map(m => (
              <div key={m.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, alignItems: 'baseline' }}>
                  <span style={{ fontSize: 11, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1, minWidth: 36 }}>{m.label}</span>
                  <span style={{ fontSize: 11, color: m.revenue > 0 ? 'var(--text)' : 'var(--text3)' }}>
                    {formatPrice(m.revenue)}
                    {m.count > 0 && <span style={{ color: 'var(--text3)', marginLeft: 6 }}>({m.count} pedidos)</span>}
                  </span>
                </div>
                <div style={{ background: 'var(--surface3)', height: 6, border: '1px solid var(--border)' }}>
                  <div style={{
                    background: 'var(--accent)',
                    height: '100%',
                    width: `${(m.revenue / maxMonthRevenue) * 100}%`,
                    transition: 'width 0.3s',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier dist + Top experts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>

          {/* Tier distribution */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px 24px' }}>
            <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 18 }}>
              VENTAS POR TIER
            </div>
            {totalPaidRows === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--text3)', margin: 0 }}>Sin datos aún</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {tierDist.map(t => (
                  <div key={t.tier}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 13, color: 'var(--text2)' }}>{t.label}</span>
                      <span style={{ fontSize: 13, color: 'var(--text)', fontFamily: 'Bebas Neue, sans-serif' }}>
                        {t.count} <span style={{ fontSize: 11, color: 'var(--text3)' }}>({totalPaidRows > 0 ? Math.round((t.count / totalPaidRows) * 100) : 0}%)</span>
                      </span>
                    </div>
                    <div style={{ background: 'var(--surface3)', height: 5, border: '1px solid var(--border)' }}>
                      <div style={{
                        background: t.tier === 'deep_dive' ? 'var(--green)' : t.tier === 'pro' ? 'var(--accent)' : 'var(--text3)',
                        height: '100%',
                        width: `${totalPaidRows > 0 ? (t.count / totalPaidRows) * 100 : 0}%`,
                      }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 6, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: 'var(--text3)' }}>Tasa de entrega</span>
                  <span style={{ color: conversionRate >= 70 ? 'var(--green)' : 'var(--yellow)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 16 }}>
                    {conversionRate}%
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Top experts */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px 24px' }}>
            <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 18 }}>
              TOP EXPERTOS
            </div>
            {!topExperts || topExperts.filter((e: any) => e.total_reviews > 0).length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--text3)', margin: 0 }}>Sin datos aún</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {topExperts.filter((e: any) => e.total_reviews > 0).map((e: any, i: number) => (
                  <div key={e.display_name} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '10px 0', borderBottom: '1px solid var(--border)',
                  }}>
                    <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, color: i === 0 ? 'var(--accent)' : 'var(--text3)', minWidth: 18 }}>
                      {i + 1}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{e.display_name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text3)' }}>{e.peak_rank} · {e.main_role}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'var(--text)' }}>
                        {e.total_reviews} reviews
                      </div>
                      {e.avg_rating > 0 && (
                        <div style={{ fontSize: 12, color: 'var(--yellow)' }}>
                          {Number(e.avg_rating).toFixed(1)}★
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
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
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, color: 'var(--text2)' }}>{formatPrice(o.amount_total)}</div>
                    <div style={{ fontSize: 11, color: 'var(--accent)' }}>comis. {formatPrice(o.amount_commission ?? 0)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

function AdminMoneyPill({ label, value, hint, color }: { label: string; value: string; hint: string; color: string }) {
  return (
    <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', padding: '12px 14px' }}>
      <div style={{ fontSize: 11, letterSpacing: 1.2, color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 6 }}>
        {hint}
      </div>
    </div>
  )
}
