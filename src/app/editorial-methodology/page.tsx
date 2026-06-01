import type { Metadata } from 'next'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Metodologia editorial',
  description: 'Como Replaid Lab decide que guias de Overwatch publicar, revisar, actualizar e indexar.',
  path: '/editorial-methodology',
})

export default function EditorialMethodologyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <PublicNav />
      <main className="trust-page">
        <div className="eyebrow">CRITERIO EDITORIAL</div>
        <h1>Metodologia editorial</h1>
        <p className="trust-lead">
          Nuestra prioridad es que cada pagina tenga una utilidad clara para jugadores reales. Una pagina solo debe crecer en visibilidad cuando aporta criterio propio, enlaces utiles y una respuesta suficientemente completa.
        </p>

        <section>
          <h2>Como elegimos temas</h2>
          <p>
            Priorizamos busquedas con intencion practica: como jugar un rol, como corregir errores de un heroe, que counters respetar y que composiciones tienen sentido en 5v5 o 6v6. No publicamos paginas nuevas solo por cubrir volumen.
          </p>
        </section>

        <section>
          <h2>Como usamos videos externos</h2>
          <p>
            Los videos de creadores se usan como referencia de aprendizaje, pero la pagina debe explicar que mirar, como aplicarlo en una VOD propia y que errores revisar despues. No consideramos suficiente embeber un video sin analisis propio.
          </p>
        </section>

        <section>
          <h2>Cuando actualizamos</h2>
          <p>
            Actualizamos una guia cuando cambia el parche, el meta, el video recomendado o el criterio experto. No cambiamos fechas sin una mejora real del contenido.
          </p>
        </section>

        <section>
          <h2>Puerta de calidad SEO</h2>
          <p>
            Las paginas pilar deben tener contenido propio, navegacion interna, resumen claro, ejemplos aplicables, autor o revisor y ausencia de señales de pagina vacia. Las paginas de filtro o busqueda interna se mantienen fuera del indice.
          </p>
        </section>

        <div className="trust-links">
          <Link href="/about">Sobre Replaid Lab</Link>
          <Link href="/privacy">Privacidad</Link>
          <Link href="/guides/como-mejorar-en-overwatch">Guia pilar</Link>
        </div>
      </main>
    </div>
  )
}
