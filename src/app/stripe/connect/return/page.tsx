import Link from 'next/link'

export default function StripeConnectReturnPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 20 }}>✓</div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: 'var(--green)', letterSpacing: 1, margin: '0 0 12px' }}>
          CUENTA CONECTADA
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 32 }}>
          Tu cuenta de Stripe está vinculada. A partir de ahora recibirás los pagos directamente cuando entregues una review.
        </p>
        <Link href="/expert/dashboard" className="btn btn-primary">
          IR AL PANEL →
        </Link>
      </div>
    </div>
  )
}
