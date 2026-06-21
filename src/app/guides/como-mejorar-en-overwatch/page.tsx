import type { Metadata } from 'next'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import JsonLd from '@/components/content/JsonLd'
import ArticleCta from '@/components/content/ArticleCta'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Cómo mejorar en Overwatch: revisar errores, roles y decisiones',
  description: 'Guía pilar para mejorar en Overwatch con método de revisión de VOD, errores comunes por rol, prioridades de práctica, 6v6 y checklist semanal.',
  path: '/guides/como-mejorar-en-overwatch',
  type: 'article',
})

const published = '2026-06-01'

export default function ImproveOverwatchGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Cómo mejorar en Overwatch: revisar errores, roles y decisiones',
    description: 'Método práctico para mejorar en Overwatch revisando decisiones, posicionamiento, recursos y errores repetidos.',
    datePublished: published,
    dateModified: published,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: absoluteUrl('/guides/como-mejorar-en-overwatch'),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Guías', item: absoluteUrl('/guides') },
      { '@type': 'ListItem', position: 2, name: 'Cómo mejorar en Overwatch', item: absoluteUrl('/guides/como-mejorar-en-overwatch') },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <PublicNav />

      <main className="guide-detail-main" style={{ maxWidth: 900 }}>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 28, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/guides" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Guías</Link>
          <span>/</span>
          <span>Cómo mejorar en Overwatch</span>
        </div>

        <header style={{ marginBottom: 38 }}>
          <div className="eyebrow">GUIA PILAR</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(38px, 7vw, 68px)', lineHeight: 0.98, letterSpacing: 1, margin: '0 0 18px' }}>
            Cómo mejorar en Overwatch sin depender solo de la mecánica
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 17, lineHeight: 1.7, margin: 0 }}>
            Mejorar no es jugar más partidas esperando que algo cambie. La forma más estable de subir es detectar un patrón repetido, entrenar una decisión concreta y medir si esa decisión aparece menos en tus siguientes VODs.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', color: 'var(--text3)', fontSize: 12, marginTop: 18 }}>
            <span>01 de junio de 2026</span>
            <span>Replaid Lab</span>
            <span>Actualizada: 1 de junio de 2026</span>
          </div>
        </header>

        <section className="guide-video-summary">
          <div>RESUMEN RAPIDO</div>
          <p>
            Elige una sola prioridad por semana: morir menos primero, gastar mejor cooldowns después y sincronizar engages cuando ya sobrevives. Si intentas arreglar aim, posición, ultimates y composición a la vez, no sabrás que cambio funciono.
          </p>
        </section>

        <article className="guide-body">
          <h2>1. Empieza por la primera muerte, no por el marcador</h2>
          <p>
            La estadística final suele llegar demasiado tarde. En una VOD, la pregunta más valiosa es por qué murió alguien primero y si esa muerte era evitable. Si tu primera muerte ocurre antes de que el equipo pueda gastar recursos, estás regalando una pelea aunque luego hagas mucho daño.
          </p>
          <p>
            Revisa tres peleas perdidas y apunta la causa principal de tu primera muerte: estabas sin cobertura, entraste antes que tu tank, gastaste movilidad para hacer daño, perseguiste una baja o no respetaste un cooldown rival. Si una causa se repite dos veces, esa es tu prioridad.
          </p>

          <h2>2. Separa mecánica de decisión</h2>
          <p>
            Fallar tiros importa, pero muchas partidas se pierden antes del disparo. Un DPS que juega un ángulo sin salida, un support que cura desde campo abierto o un tank que entra sin cooldown defensivo dependen de una jugada perfecta para sobrevivir. Eso no es un problema de aim; es un problema de decisión.
          </p>
          <p>
            La pregunta práctica es: si hubiera fallado menos, la posición seguía siendo buena? Si la respuesta es no, corrige posición y timing antes de dedicar la semana a mecánicas.
          </p>

          <h2>3. Prioridades por rol</h2>
          <p>
            Tank debe crear espacio sin cambiar toda su vida por nada. Antes de avanzar, decide que recurso rival quieres forzar y donde puede jugar tu equipo después. Si entras y todos te miran pero nadie de tu equipo gana ángulo, solo has comprado tiempo caro.
          </p>
          <p>
            DPS debe crear presión útil, no daño decorativo. Un buen ángulo obliga al rival a mirar dos sitios o a gastar recursos defensivos. Si disparas desde el mismo frente que tu tank durante toda la partida, probablemente estás facilitando la defensa rival.
          </p>
          <p>
            Support debe sobrevivir y negar condiciones de victoria. Curar mucho no compensa gastar Suzu, Sleep, Lamp o movilidad por ansiedad. Si tu cooldown principal no niega una amenaza real, revisa si podías resolver la situación con posición.
          </p>

          <h2>4. Como revisar cooldowns</h2>
          <p>
            El error más común es mirar solo si un cooldown acertó. La revisión buena pregunta si hacía falta gastarlo. Un Sleep que acierta a un tank sin follow-up puede ser peor que guardarlo para un flanker. Un dash que confirma una baja puede ser malo si te deja sin salida cuando la pelea aún no está ganada.
          </p>
          <p>
            Marca cada cooldown importante como defensivo, ofensivo o innecesario. Si más de un tercio cae en innecesario, tu mejora semanal es esperar medio segundo más antes de pulsar.
          </p>

          <h2>5. 6v6 cambia el margen de error</h2>
          <p>
            En 6v6 hay más cuerpos, más peel y más recursos defensivos. Las ventanas individuales duran menos y los engages necesitan más coordinación. Un héroe que puede castigar rápido en 5v5 puede necesitar forzar primero burbujas, matriz, escudo o peel adicional antes de buscar la baja.
          </p>
          <p>
            Si vienes de 5v5, revisa especialmente si estás entrando demasiado pronto. En 6v6 muchas peleas se ganan por segunda ventana: fuerzas recursos, sobrevives, reposicionas y vuelves a entrar cuando la defensa rival ya no tiene la misma respuesta.
          </p>

          <h2>Checklist semanal</h2>
          <ul>
            <li>Elige una prioridad única: primera muerte, cooldowns, posición o engages.</li>
            <li>Revisa tres peleas perdidas y escribe el patrón repetido.</li>
            <li>Juega diez partidas buscando solo esa corrección.</li>
            <li>Vuelve a revisar una VOD y comprueba si el error aparece menos.</li>
            <li>Si no mejora, simplifica la tarea: menos héroes, menos mapas o una regla más concreta.</li>
          </ul>

          <h2>Lecturas relacionadas</h2>
          <p>
            Si quieres bajar esto a un rol concreto, empieza por <Link href="/roles/tank">Tank</Link>, <Link href="/roles/dps">DPS</Link> o <Link href="/roles/support">Support</Link>. Para decisiones de matchup, usa <Link href="/counters">counters</Link>; para equipo y estilo de composición, revisa <Link href="/team-comps">composiciones</Link>.
          </p>
        </article>

        <ArticleCta />
      </main>
    </div>
  )
}
