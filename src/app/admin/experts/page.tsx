import { createAdminClient } from '@/lib/supabase/admin'
import { formatPrice } from '@/types'
import ExpertActions from './ExpertActions'

const STATUS_COLORS: Record<string, string> = {
  pending:   'var(--yellow)',
  active:    'var(--green)',
  suspended: 'var(--danger)',
}
const STATUS_LABELS: Record<string, string> = {
  pending:   'Pendiente',
  active:    'Activo',
  suspended: 'Suspendido',
}

export default async function AdminExpertsPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const supabase = createAdminClient()
  const filter = searchParams.status ?? 'pending'

  const { data: experts } = await supabase
    .from('experts')
    .select('id, display_name, battletag, peak_rank, main_role, status, price_starter, price_pro, price_deep_dive, total_reviews, created_at, user_id')
    .eq('status', filter)
    .order('created_at', { ascending: false })

  const tabs = [
    { key: 'pending',   label: 'Pendientes' },
    { key: 'active',    label: 'Activos' },
    { key: 'suspended', label: 'Suspendidos' },
  ]

  const ROLE_LABELS: Record<string, string> = {
    tank: 'Tank', dps: 'DPS', support: 'Support', flex: 'Flex',
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--yellow)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 6 }}>
          ADMINISTRACIÓN
        </div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 30, letterSpacing: 1, color: 'var(--text)', margin: 0 }}>
          GESTIÓN DE EXPERTOS
        </h1>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 24, borderBottom: '1px solid var(--border)' }}>
        {tabs.map(({ key, label }) => (
          <a key={key} href={`/admin/experts?status=${key}`} style={{
            padding: '8px 18px',
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

      {!experts || experts.length === 0 ? (
        <div style={{ fontSize: 14, color: 'var(--text3)', padding: '32px 0' }}>
          No hay expertos en este estado.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)' }}>
          {/* Header row */}
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 100px 160px',
            padding: '10px 20px', background: 'var(--surface2)',
            fontSize: 11, letterSpacing: 1, color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif',
          }}>
            <span>EXPERTO</span>
            <span>NIVEL</span>
            <span>ROL</span>
            <span>PRECIOS</span>
            <span>REVIEWS</span>
            <span>ACCIÓN</span>
          </div>

          {experts.map((expert: any) => (
            <div key={expert.id} style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 100px 160px',
              padding: '14px 20px', borderTop: '1px solid var(--border)',
              alignItems: 'center', background: 'var(--surface)',
            }}>
              <div>
                <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>
                  {expert.display_name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>
                  {expert.battletag}
                </div>
                <div style={{ fontSize: 11, color: STATUS_COLORS[expert.status], marginTop: 3 }}>
                  ● {STATUS_LABELS[expert.status]}
                </div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text2)' }}>{expert.peak_rank}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', textTransform: 'capitalize' }}>
                {ROLE_LABELS[expert.main_role] ?? expert.main_role}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.7 }}>
                <div>S: {formatPrice(expert.price_starter)}</div>
                <div>P: {formatPrice(expert.price_pro)}</div>
                <div>D: {formatPrice(expert.price_deep_dive)}</div>
              </div>
              <div style={{ fontSize: 14, color: 'var(--text2)' }}>{expert.total_reviews}</div>
              <ExpertActions expertId={expert.id} currentStatus={expert.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
