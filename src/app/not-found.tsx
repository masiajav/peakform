import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      color: 'var(--text)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{ maxWidth: 520, textAlign: 'center' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', letterSpacing: 2, fontSize: 12, marginBottom: 12 }}>
          404
        </div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 48, letterSpacing: 1, margin: '0 0 14px' }}>
          NO HEMOS ENCONTRADO ESTA PAGINA
        </h1>
        <p style={{ color: 'var(--text2)', lineHeight: 1.6, margin: '0 0 28px' }}>
          Puede que el articulo haya cambiado de URL o que la hemeroteca aun no tenga esta entrada.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/guides" className="btn btn-primary">VER GUIAS</Link>
          <Link href="/experts" className="btn btn-secondary">VER EXPERTOS</Link>
        </div>
      </div>
    </main>
  )
}
