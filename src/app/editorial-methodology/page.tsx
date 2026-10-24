import type { Metadata } from 'next'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Cómo usar las guías de Overwatch y Deadlock',
  description: 'Encuentra tu héroe, prepara un matchup y adapta tus compras. Un punto de partida para aprovechar las guías de Overwatch y Deadlock.',
  path: '/editorial-methodology',
})

export default function EditorialMethodologyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <PublicNav />
      <main className="trust-page">
        <div className="eyebrow">TU PRÓXIMA PARTIDA</div>
        <h1>Cómo usar las guías</h1>
        <p className="trust-lead">
          Empieza por una situación que quieras resolver: sobrevivir a una entrada, aprovechar mejor una habilidad o llegar a un objetivo con recursos. Elige una decisión para practicar y comprueba después si te ayudó en partida.
        </p>

        <section>
          <h2>Elige tu juego y tu héroe</h2>
          <p>
            Entra en <Link href="/overwatch">Overwatch</Link> o <Link href="/deadlock">Deadlock</Link> desde la portada o el selector superior. En el catálogo puedes buscar el nombre del héroe o su alias en inglés. Abre su ficha para repasar habilidades y reconocer qué quieres conseguir con ellas.
          </p>
        </section>

        <section>
          <h2>Prepara una respuesta al rival</h2>
          <p>
            Desde una ficha puedes pasar a sus counters. Fíjate en la amenaza, el momento de responder y el límite de esa respuesta. Si necesitas guardar una habilidad defensiva, decide también qué cobertura usarás mientras esperas. Elegir un héroe favorable no garantiza ganar el duelo.
          </p>
        </section>

        <section>
          <h2>Importa una build de Deadlock y adáptala</h2>
          <p>
            En las <Link href="/deadlock/builds">builds de Deadlock</Link> encontrarás un código que puedes copiar y buscar entre las builds públicas de la tienda del juego. Los objetos ilustrados te ayudan a reconocer su enfoque. Usa después la tabla de compras para decidir qué adelantar según el daño, el control o la recuperación del rival; no compres todas las alternativas a la vez.
          </p>
        </section>

        <section>
          <h2>Une tus decisiones con el mapa</h2>
          <p>
            En Overwatch, consulta <Link href="/maps">el mapa</Link> y la <Link href="/team-comps">composición</Link> para elegir un acceso y reconocer dónde necesita ayuda tu equipo. En Deadlock, combina las guías de <Link href="/deadlock/guides/economia-almas">economía</Link> y <Link href="/deadlock/guides/rotaciones-objetivos">rotaciones y objetivos</Link> para decidir cuándo seguir consiguiendo almas y cuándo reunirte.
          </p>
        </section>

        <section>
          <h2>Practica un cambio y vuelve a mirar</h2>
          <p>
            Prueba una pauta concreta durante varias situaciones comparables: conservar una salida, esperar un control enemigo o llegar con una compra útil. Al revisar la partida, mira qué ocurrió antes de la pelea, además de su resultado. Consulta también la fecha y el parche que figuran en la guía si ha cambiado una habilidad.
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
