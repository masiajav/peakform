import type { Metadata } from 'next'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Metodología editorial',
  description: 'Cómo Replaid Lab decide qué guías de Overwatch publicar, revisar, actualizar e indexar.',
  path: '/editorial-methodology',
})

export default function EditorialMethodologyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <PublicNav />
      <main className="trust-page">
        <div className="eyebrow">CRITERIO EDITORIAL</div>
        <h1>Metodología editorial</h1>
        <p className="trust-lead">
          Nuestra prioridad es que cada página tenga una utilidad clara para jugadores reales. Una página solo debe crecer en visibilidad cuando aporta criterio propio, enlaces útiles y una respuesta suficientemente completa.
        </p>

        <section>
          <h2>Cómo elegimos temas</h2>
          <p>
            Priorizamos búsquedas con intención práctica: cómo jugar un rol, cómo corregir errores de un héroe, qué counters respetar y qué composiciones tienen sentido en 5v5 o 6v6. No publicamos páginas nuevas solo por cubrir volumen.
          </p>
        </section>

        <section>
          <h2>Cómo usamos vídeos externos</h2>
          <p>
            Los vídeos de creadores se usan como referencia de aprendizaje, pero la página debe explicar qué mirar, cómo aplicarlo en una VOD propia y qué errores revisar después. No consideramos suficiente embeber un vídeo sin análisis propio.
          </p>
        </section>

        <section>
          <h2>Cuándo actualizamos</h2>
          <p>
            Actualizamos una guía cuando cambia el parche, el meta, el vídeo recomendado o el criterio experto. No cambiamos fechas sin una mejora real del contenido.
          </p>
        </section>

        <section>
          <h2>Puerta de calidad SEO</h2>
          <p>
            Las páginas pilar deben tener contenido propio, navegación interna, resumen claro, ejemplos aplicables, autor o revisor y ausencia de señales de página vacía. Las páginas de filtro o búsqueda interna se mantienen fuera del índice.
          </p>
        </section>

        <div className="trust-links">
          <Link href="/about">Sobre Replaid Lab</Link>
          <Link href="/privacy">Privacidad</Link>
          <Link href="/guides/como-mejorar-en-overwatch">Guía pilar</Link>
        </div>
      </main>
    </div>
  )
}
