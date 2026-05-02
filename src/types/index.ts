// ============================================================
// PEAKFORM — Tipos TypeScript
// ============================================================

export type UserRole    = 'user' | 'expert' | 'admin'
export type ExpertStatus = 'pending' | 'active' | 'suspended'
export type OrderStatus  = 'pending_payment' | 'paid' | 'in_review' | 'delivered' | 'disputed'
export type OrderTier    = 'starter' | 'pro' | 'deep_dive' | 'trial'
export type PlayerRole   = 'tank' | 'dps' | 'support' | 'flex'

export interface Profile {
  id:           string
  role:         UserRole
  display_name: string | null
  avatar_url:   string | null
  battletag:    string | null
  created_at:   string
}

export interface Expert {
  id:           string
  user_id:      string
  status:       ExpertStatus
  display_name: string
  battletag:    string
  peak_sr:      number
  peak_rank:    string
  main_role:    PlayerRole
  bio:          string | null
  specialties:  string[]
  avatar_url:   string | null

  price_starter:   number   // en céntimos
  price_pro:       number
  price_deep_dive: number

  description_starter:   string | null
  description_pro:       string | null
  description_deep_dive: string | null

  // Análisis de prueba (opcional)
  trial_enabled:        boolean
  trial_price:          number | null  // en céntimos
  trial_refundable:     boolean
  trial_deadline_hours: number

  total_reviews:   number
  avg_rating:      number
  avg_delivery_hours: number

  created_at: string
  updated_at: string
}

export interface Order {
  id:         string
  user_id:    string
  expert_id:  string
  status:     OrderStatus
  tier:       OrderTier

  amount_base:       number
  amount_commission: number
  amount_total:      number

  replay_url:       string | null
  replay_file_path: string | null
  player_role:      PlayerRole | null
  focus_areas:      string[]
  user_notes:       string | null

  stripe_session_id:      string | null
  stripe_payment_intent:  string | null

  paid_at:               string | null
  delivered_at:          string | null
  deadline_at:           string | null
  refund_requested_at:   string | null
  refunded_at:           string | null
  created_at:            string
  updated_at:            string

  // Joins opcionales
  expert?: Partial<Expert>
  review?: Review
}

export interface Review {
  id:        string
  order_id:  string
  expert_id: string
  user_id:   string

  summary:      string | null
  errors:       string | null
  positives:    string | null
  action_plan:  string | null
  timestamps:   ReviewTimestamp[]

  cross_analysis: string | null
  roadmap:        string | null
  ai_draft:       AIDraft | null

  rating:         number | null
  rating_comment: string | null

  created_at: string
  updated_at: string
}

export interface ReviewTimestamp {
  time:  string   // "1:23"
  label: string   // "Error de posición"
  type:  'error' | 'positive' | 'note'
}

export interface AIDraft {
  summary:     string
  errors:      string
  positives:   string
  action_plan: string
  generated_at: string
}

export interface FollowupMessage {
  id:         string
  order_id:   string
  sender_id:  string
  message:    string
  created_at: string
  // Join
  sender?: Profile
}

// ============================================================
// TIER CONFIG — precios y características por tier
// ============================================================

export const TIER_CONFIG = {
  starter: {
    label:       'Starter',
    deliveryHours: 48,
    followups:   1,
    features:    ['Review escrita detallada', 'Entrega en 48h', '1 pregunta de seguimiento'],
    description: 'Review escrita + 1 pregunta',
  },
  pro: {
    label:       'Pro',
    deliveryHours: 24,
    followups:   3,
    features:    ['Review escrita detallada', 'Timestamps de vídeo', 'Entrega en 24h', '3 preguntas de seguimiento', 'Seguimiento de progreso'],
    description: 'Review + timestamps + 3 preguntas',
  },
  deep_dive: {
    label:       'Deep Dive',
    deliveryHours: 72,
    followups:   Infinity,
    features:    ['Análisis de 3 replays cruzados', 'Hoja de ruta personalizada', 'Seguimiento ilimitado 7 días', 'Re-review gratuita a las 2 semanas'],
    description: '3 replays + hoja de ruta + seguimiento 7d',
  },
  trial: {
    label:       'Prueba',
    deliveryHours: 48,
    followups:   1,
    features:    ['Review escrita detallada', '1 pregunta de seguimiento'],
    description: 'Análisis de prueba',
  },
} as const

export const COMMISSION_RATE = 0.15  // 15%

// Calcular total con comisión
export function calculateTotal(basePrice: number): {
  base: number
  commission: number
  total: number
} {
  const commission = Math.round(basePrice * COMMISSION_RATE)
  return { base: basePrice, commission, total: basePrice + commission }
}

// Formatear precio en euros
export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`
}

// Label del status de un pedido
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending_payment: 'Pendiente de pago',
  paid:            'Pagado',
  in_review:       'En revisión',
  delivered:       'Entregado',
  disputed:        'Disputado',
}
