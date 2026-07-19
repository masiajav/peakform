import type { Metadata } from 'next'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Privacidad y cookies',
  description: 'Política de privacidad y cookies de Replaid Lab: datos de cuenta, pagos, analítica, consentimiento y contacto.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <PublicNav />
      <main className="trust-page">
        <div className="eyebrow">PRIVACIDAD</div>
        <h1>Privacidad y cookies</h1>
        <p className="trust-lead">
          Esta página resume qué datos usa Replaid Lab para operar la plataforma, cómo se gestionan los pagos y cuándo pueden activarse cookies de analítica o publicidad.
        </p>

        <section>
          <h2>Datos que tratamos</h2>
          <p>
            Podemos tratar datos de cuenta como email, nombre visible, rol de usuario, perfil de experto, pedidos, enlaces de replay enviados y comunicaciones necesarias para prestar el servicio. No almacenamos datos completos de tarjeta.
          </p>
        </section>

        <section>
          <h2>Pagos y proveedores</h2>
          <p>
            Los pagos se procesan mediante Stripe. La autenticación, base de datos y almacenamiento se apoyan en proveedores técnicos necesarios para que la web funcione con seguridad.
          </p>
        </section>

        <section>
          <h2>Cookies y publicidad</h2>
          <p>
            Replaid Lab puede usar cookies técnicas necesarias. Las cookies de analítica o publicidad solo se activarán cuando exista configuración y consentimiento aplicable. Los anuncios no deben bloquear el contenido principal ni mostrarse en páginas sin contenido editorial suficiente.
          </p>
        </section>

        <section>
          <h2>Derechos y contacto</h2>
          <p>
            Puedes solicitar acceso, rectificación o eliminación de tus datos escribiendo a <a href="mailto:soporte@replaidlab.com">soporte@replaidlab.com</a>.
          </p>
        </section>

        <div className="trust-links">
          <Link href="/about">Sobre Replaid Lab</Link>
          <Link href="/editorial-methodology">Metodología editorial</Link>
          <Link href="/legal">Términos</Link>
        </div>
      </main>
    </div>
  )
}
