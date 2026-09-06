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
          Replaid Lab es una web en español dedicada a entender mejor Overwatch. Reúne guías de héroes, mapas, counters y composiciones con un servicio de revisión de partidas para quienes quieren saber por qué una pelea salió mal y qué pueden cambiar en la siguiente.
        </p>

        <section>
          <h2>Qué encontrarás aquí</h2>
          <p>
            Las guías parten de problemas que aparecen de verdad en ranked: entrar antes que el equipo, gastar una habilidad defensiva demasiado pronto, pelear desde un ángulo sin salida o cambiar de héroe sin entender qué está fallando. La intención es que cada página termine en una decisión que puedas probar, no en una lista de consejos aislados.
          </p>
        </section>

        <section>
          <h2>Cómo tratamos Overwatch</h2>
          <p>
            Usamos el vocabulario habitual de la comunidad cuando resulta más claro: ranked, peel, dive, poke, timing o cooldown. También distinguimos entre una regla general y algo que depende del parche. Si un cambio de balance altera un matchup o una composición, revisamos la explicación y dejamos visible la fecha de actualización.
          </p>
          <p>
            Replaid Lab no está afiliada a Blizzard Entertainment. Overwatch, sus héroes y sus materiales pertenecen a sus respectivos propietarios. El contenido de esta web es análisis independiente para jugadores.
          </p>
        </section>

        <section>
          <h2>Correcciones y responsabilidad</h2>
          <p>
            Una guía puede quedarse atrás después de un parche o no cubrir una situación concreta. Si detectas un dato incorrecto, indícanos la URL y el punto exacto. Revisamos las correcciones antes de actualizar el texto y no cambiamos fechas si el contenido no ha cambiado de verdad.
          </p>
        </section>

        <section>
          <h2>Contacto</h2>
          <p>
            Para correcciones, colaboraciones, dudas de privacidad o soporte puedes escribir a <a href="mailto:soporte@replaidlab.com">soporte@replaidlab.com</a>.
          </p>
        </section>

        <div className="trust-links">
          <Link href="/editorial-methodology">Metodología editorial</Link>
          <Link href="/privacy">Privacidad y cookies</Link>
          <Link href="/legal">Términos</Link>
        </div>
      </main>
    </div>
  )
}
