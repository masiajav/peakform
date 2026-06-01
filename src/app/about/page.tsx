import type { Metadata } from 'next'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import JsonLd from '@/components/content/JsonLd'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Sobre Replaid Lab',
  description: 'Conoce el objetivo editorial de Replaid Lab: guías, counters, composiciones y review de partidas de Overwatch con criterio experto.',
  path: '/about',
})

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Sobre Replaid Lab',
    url: absoluteUrl('/about'),
    inLanguage: 'es',
    publisher: { '@type': 'Organization', name: SITE_NAME },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={jsonLd} />
      <PublicNav />
      <main className="trust-page">
        <div className="eyebrow">REPLAID LAB</div>
        <h1>Sobre Replaid Lab</h1>
        <p className="trust-lead">
          Replaid Lab es una hemeroteca editorial y plataforma de review de VOD para jugadores de Overwatch. El objetivo no es acumular paginas por volumen, sino publicar recursos que ayuden a tomar mejores decisiones dentro de partida.
        </p>

        <section>
          <h2>Que publicamos</h2>
          <p>
            Publicamos guias por heroe, fundamentos por rol, counters, composiciones 5v5 y 6v6, noticias relevantes y recursos para revisar partidas. Cuando usamos un video externo, lo tratamos como apoyo: la pagina debe aportar contexto propio, errores frecuentes y una forma practica de aplicar lo aprendido.
          </p>
        </section>

        <section>
          <h2>Quien revisa el criterio</h2>
          <p>
            Las paginas prioritarias se preparan con estructura editorial y se revisan con criterio experto antes de tratarlas como contenido pilar. Cuando una guia depende de un parche o de cambios de balance, se actualiza por cambios reales, no solo para parecer reciente.
          </p>
        </section>

        <section>
          <h2>Contacto</h2>
          <p>
            Para correcciones, colaboraciones, dudas de privacidad o soporte puedes escribir a <a href="mailto:soporte@replaidlab.com">soporte@replaidlab.com</a>.
          </p>
        </section>

        <div className="trust-links">
          <Link href="/editorial-methodology">Metodologia editorial</Link>
          <Link href="/privacy">Privacidad y cookies</Link>
          <Link href="/legal">Terminos</Link>
        </div>
      </main>
    </div>
  )
}
