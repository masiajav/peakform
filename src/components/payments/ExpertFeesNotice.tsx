import { STRIPE_PLATFORM_COUNTRY, stripeCountryLabel } from '@/lib/stripe-countries'

type Props = {
  country?: string | null
  compact?: boolean
}

export default function ExpertFeesNotice({ country, compact = false }: Props) {
  const isInternational = !!country && country !== STRIPE_PLATFORM_COUNTRY

  return (
    <section
      aria-label="Información sobre pagos y comisiones"
      style={{
        borderLeft: '2px solid var(--accent)',
        padding: compact ? '4px 0 4px 14px' : '14px 0 14px 18px',
        margin: 0,
      }}
    >
      <div style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: 15,
        letterSpacing: 1,
        color: 'var(--text)',
        marginBottom: 8,
      }}>
        QUÉ COBRAS Y QUÉ COMISIONES EXISTEN
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 6 }}>
        <li style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.55 }}>
          El precio que defines para cada servicio es tu parte del pago.
        </li>
        <li style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.55 }}>
          Replaid Lab añade un 20 % al precio que paga el cliente; no se descuenta de tu precio.
        </li>
        <li style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.55 }}>
          Replaid Lab asume la comisión de procesamiento de Stripe para estos pagos.
        </li>
        <li style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.55 }}>
          {isInternational
            ? `En ${stripeCountryLabel(country)}, Stripe liquida el cobro según la moneda y el calendario de tu cuenta. El cambio de divisa y posibles costes del banco pueden variar el importe final recibido.`
            : 'Si tu cuenta liquida en una moneda distinta del euro, el cambio de divisa y posibles costes del banco pueden variar el importe final recibido.'}
        </li>
      </ul>
    </section>
  )
}
