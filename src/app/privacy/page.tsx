import type { Metadata } from 'next'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Privacidad y cookies',
  description: 'Politica de privacidad y cookies de Replaid Lab: datos de cuenta, pagos, analitica, consentimiento y contacto.',
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
          Esta pagina resume que datos usa Replaid Lab para operar la plataforma, como se gestionan pagos y cuando pueden activarse cookies de analitica o publicidad.
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
            Los pagos se procesan mediante Stripe. La autenticacion, base de datos y almacenamiento se apoyan en proveedores tecnicos necesarios para que la web funcione con seguridad.
          </p>
        </section>

        <section>
          <h2>Cookies y publicidad</h2>
          <p>
            Replaid Lab puede usar cookies tecnicas necesarias. Las cookies de analitica o publicidad solo se activaran cuando exista configuracion y consentimiento aplicable. Los anuncios no deben bloquear el contenido principal ni mostrarse en paginas sin contenido editorial suficiente.
          </p>
        </section>

        <section>
          <h2>Derechos y contacto</h2>
          <p>
            Puedes solicitar acceso, rectificacion o eliminacion de tus datos escribiendo a <a href="mailto:soporte@replaidlab.com">soporte@replaidlab.com</a>.
          </p>
        </section>

        <div className="trust-links">
          <Link href="/about">Sobre Replaid Lab</Link>
          <Link href="/editorial-methodology">Metodologia editorial</Link>
          <Link href="/legal">Terminos</Link>
        </div>
      </main>
    </div>
  )
}
