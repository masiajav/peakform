import type { Metadata } from 'next'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Cómo revisamos las guías de Overwatch',
  description: 'Así preparamos y actualizamos las guías de Replaid Lab: utilidad en partida, lenguaje claro, comprobación de cambios y corrección de errores.',
  path: '/editorial-methodology',
})

export default function EditorialMethodologyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <PublicNav />
      <main className="trust-page">
        <div className="eyebrow">CÓMO TRABAJAMOS</div>
        <h1>Cómo revisamos las guías</h1>
        <p className="trust-lead">
          Una guía de Replaid Lab debe ayudarte a reconocer una situación dentro de la partida y decidir qué hacer. Si un texto solo repite la descripción de una habilidad o enumera héroes sin explicar el matchup, todavía no está terminado.
        </p>

        <section>
          <h2>Empezamos por una pregunta concreta</h2>
          <p>
            Cada artículo intenta resolver un problema reconocible: cuándo entrar con Winston, cómo guardar Suzu contra una ultimate, por qué una composición de poke no cruza un espacio cerrado o qué ruta permite atacar un high ground. La respuesta importante aparece al principio y después se desarrolla con ejemplos.
          </p>
        </section>

        <section>
          <h2>Comprobamos nombres, fechas y cambios</h2>
          <p>
            Para noticias y cambios de balance comprobamos la información oficial antes de presentarla como confirmada. Cuando todavía faltan datos, lo decimos. No convertimos rumores en hechos ni actualizamos una fecha para que una guía parezca más reciente.
          </p>
        </section>

        <section>
          <h2>Tono de las guías</h2>
          <p>
            Escribimos en español natural, con lenguaje de jugador y sin traducir a la fuerza términos que la comunidad usa en inglés. Palabras como ranked, pick, peel, dive, poke, brawl, timing, matchup, cooldown, backline, flanker, reset, off-angle o VOD se mantienen cuando hacen la explicación más clara.
          </p>
        </section>

        <section>
          <h2>Revisamos si el consejo sigue funcionando</h2>
          <p>
            Un cambio de daño, alcance o cooldown puede alterar un duelo completo. Revisamos las páginas afectadas cuando cambia el juego y también cuando encontramos una explicación más precisa. La fecha visible corresponde a una revisión real del contenido.
          </p>
        </section>

        <section>
          <h2>Corregimos lo que no esté claro</h2>
          <p>
            Buscamos frases que suenen traducidas, consejos que podrían servir para cualquier héroe y explicaciones que no indiquen cuándo actuar. También comprobamos que los enlaces funcionen y que la página se pueda leer bien en móvil. Puedes comunicar cualquier error desde la página de contacto.
          </p>
        </section>

        <div className="trust-links">
          <Link href="/about">Sobre Replaid Lab</Link>
          <Link href="/privacy">Privacidad</Link>
          <Link href="/guides/como-mejorar-en-overwatch">Cómo mejorar en Overwatch</Link>
        </div>
      </main>
    </div>
  )
}
