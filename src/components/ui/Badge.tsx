import { clsx } from 'clsx'
import type { OrderStatus, ExpertStatus } from '@/types'

type BadgeVariant = 'accent' | 'success' | 'warning' | 'muted' | 'danger' | 'ai' | 'purple'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  style?: React.CSSProperties
}

const VARIANT_STYLES: Record<BadgeVariant, React.CSSProperties> = {
  accent:  { background: 'rgba(255,107,43,0.10)', color: '#ff6b2b',  border: '1px solid rgba(255,107,43,0.25)' },
  success: { background: 'rgba(0,214,127,0.08)',  color: '#00d67f',  border: '1px solid rgba(0,214,127,0.22)' },
  warning: { background: 'rgba(245,166,35,0.10)', color: '#f5a623',  border: '1px solid rgba(245,166,35,0.25)' },
  muted:   { background: 'var(--surface3)',        color: 'var(--text2)', border: '1px solid var(--border2)' },
  danger:  { background: 'rgba(255,68,68,0.08)',   color: '#ff4444',  border: '1px solid rgba(255,68,68,0.2)' },
  ai:      { background: 'rgba(155,109,255,0.10)', color: '#9b6dff',  border: '1px solid rgba(155,109,255,0.25)' },
  purple:  { background: 'rgba(155,109,255,0.10)', color: '#9b6dff',  border: '1px solid rgba(155,109,255,0.25)' },
}

export function Badge({ label, variant = 'muted', style }: BadgeProps) {
  return (
    <span style={{
      ...VARIANT_STYLES[variant],
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 11,
      fontWeight: 500,
      padding: '3px 9px',
      letterSpacing: 0.2,
      whiteSpace: 'nowrap',
      ...style,
    }}>
      {label}
    </span>
  )
}

// Helpers para badges de status
export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const map: Record<OrderStatus, { label: string; variant: BadgeVariant }> = {
    pending_payment: { label: 'Pendiente pago', variant: 'warning' },
    paid:            { label: 'Pagado',          variant: 'accent'  },
    in_review:       { label: 'En revisión',     variant: 'purple'  },
    delivered:       { label: 'Entregado',       variant: 'success' },
    disputed:        { label: 'Disputado',       variant: 'danger'  },
  }
  const { label, variant } = map[status]
  return <Badge label={label} variant={variant} />
}

export function ExpertStatusBadge({ status }: { status: ExpertStatus }) {
  const map: Record<ExpertStatus, { label: string; variant: BadgeVariant }> = {
    pending:   { label: 'Pendiente',  variant: 'warning' },
    active:    { label: 'Activo',     variant: 'success' },
    suspended: { label: 'Suspendido', variant: 'danger'  },
  }
  const { label, variant } = map[status]
  return <Badge label={label} variant={variant} />
}

export function TierBadge({ tier }: { tier: string }) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    starter:   { label: 'Starter',    variant: 'muted'   },
    pro:       { label: 'Pro',        variant: 'accent'  },
    deep_dive: { label: 'Deep Dive',  variant: 'purple'  },
  }
  const config = map[tier] ?? { label: tier, variant: 'muted' as BadgeVariant }
  return <Badge label={config.label} variant={config.variant} />
}
