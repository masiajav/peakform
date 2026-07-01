import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getStripeConnectStatus, isStripeAccountReadyForCheckout } from '@/lib/stripe-connect'

export default async function StripeConnectReturnPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: expert } = user
    ? await supabase.from('experts').select('stripe_account_id').eq('user_id', user.id).maybeSingle()
    : { data: null }
  const stripeStatus = await getStripeConnectStatus(expert?.stripe_account_id)
  const ready = isStripeAccountReadyForCheckout(stripeStatus)
  const unavailable = stripeStatus.statusCheckFailed

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 20 }}>{ready ? 'OK' : '...'}</div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: ready ? 'var(--green)' : 'var(--accent)', letterSpacing: 1, margin: '0 0 12px' }}>
          {ready ? 'CUENTA CONECTADA' : unavailable ? 'COMPROBACIÓN PENDIENTE' : 'CONFIGURACIÓN RECIBIDA'}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 32 }}>
          {ready
            ? 'Tu cuenta de Stripe está lista para recibir los pagos de tus pedidos.'
            : unavailable
              ? 'Tu cuenta sigue vinculada, pero no hemos podido comprobar su estado en este momento. Revisa el panel de nuevo en unos minutos.'
              : 'Stripe todavía necesita revisar o completar algún dato antes de que puedas recibir pedidos. Entra en tu panel para continuar la configuración.'}
        </p>
        <Link href="/expert/dashboard" className="btn btn-primary">
          IR AL PANEL →
        </Link>
      </div>
    </div>
  )
}
