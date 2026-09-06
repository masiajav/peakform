import type { Metadata } from 'next'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import JsonLd from '@/components/content/JsonLd'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Contacto editorial y soporte',
  description: 'Contacta con Replaid Lab para correcciones editoriales, privacidad, soporte, colaboraciones y dudas sobre contenido de Overwatch.',
  path: '/contact',
})

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contacto Replaid Lab',
    url: absoluteUrl('/contact'),
    inLanguage: 'es',
    publisher: { '@type': 'Organization', name: SITE_NAME },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={jsonLd} />
      <PublicNav />
      <main className="trust-page">
        <div className="eyebrow">CONTACTO</div>
        <h1>Contacto editorial y soporte</h1>
        <p className="trust-lead">
          Usa esta página para comunicar correcciones, problemas de privacidad, dudas de soporte o propuestas relacionadas con Replaid Lab.
        </p>

        <section>
          <h2>Correcciones editoriales</h2>
          <p>
            Si detectas una guía desactualizada, un counter que ya no funciona igual o un horario incorrecto, escribe a <a href="mailto:soporte@replaidlab.com">soporte@replaidlab.com</a>. Incluye la URL, la frase que debería revisarse y, si se trata de un cambio reciente, el parche en el que lo has visto.
          </p>
        </section>

        <section>
          <h2>Soporte y privacidad</h2>
          <p>
            Para pedidos, cuentas, privacidad, cookies o ejercicio de derechos RGPD, contacta en <a href="mailto:soporte@replaidlab.com">soporte@replaidlab.com</a>. Intentamos responder con el contexto necesario y sin pedir datos que no hagan falta.
          </p>
        </section>

        <section>
          <h2>Colaboraciones</h2>
          <p>
            Podemos colaborar con expertos, creadores o marcas relacionadas con Overwatch. Cualquier colaboración comercial se identificará con claridad y no cambiará las conclusiones de una guía.
          </p>
        </section>

        <div className="trust-links">
          <Link href="/about">Sobre Replaid Lab</Link>
          <Link href="/editorial-methodology">Metodología editorial</Link>
          <Link href="/privacy">Privacidad</Link>
          <Link href="/legal">Legal</Link>
        </div>
      </main>
    </div>
  )
}
