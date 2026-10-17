import { COMMISSION_RATE, formatPrice } from '@/types'
import { hasPublicTrial, lowestStandardOffer, type ExpertPublicPricing } from '@/lib/expert-public-pricing'
import styles from './ExpertService.module.css'

export default function ExpertPriceSummary({ expert }: { expert: ExpertPublicPricing }) {
  const offer = lowestStandardOffer(expert)
  return (
    <div data-expert-price className={styles.price} style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, overflowWrap: 'anywhere' }}>
      {expert.service_paused ? 'Pedidos pausados' : offer ? <>
        <div>Desde <strong style={{ color: 'var(--text)' }}>{formatPrice(offer.total)}</strong> · {offer.label}</div>
        <div style={{ fontSize: 12 }}>Incluye el {COMMISSION_RATE * 100}% de comisión.</div>
      </> : hasPublicTrial(expert) ? 'Prueba disponible: consulta las condiciones en el perfil.' : 'Sin ofertas activas.'}
    </div>
  )
}
