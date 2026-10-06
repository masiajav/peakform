import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import { buildMetadata } from '@/lib/seo'
import { SITE_OPERATOR, TRUST_REVIEW_DATE } from '@/lib/site-operator'
import styles from '@/components/content/TrustDocument.module.css'

export const metadata: Metadata = buildMetadata({
  title: 'Términos y condiciones',
  description: 'Términos y condiciones de Replaid Lab: uso de la plataforma, pedidos de revisión, pagos con Stripe, cancelaciones, reembolsos y responsabilidades.',
  path: '/legal',
})

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{
        fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1,
        color: 'var(--accent)', margin: '0 0 16px',
      }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, color: 'var(--text2)', lineHeight: 1.7 }}>
        {children}
      </div>
    </section>
  )
}

export default function LegalPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>

      <PublicNav />

      <main className={styles.page} style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px 96px' }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 12 }}>
            LEGAL
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 40, letterSpacing: 1, color: 'var(--text)', margin: '0 0 16px' }}>
            TÉRMINOS Y CONDICIONES
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>
            Última revisión: <time dateTime={TRUST_REVIEW_DATE}>5 de octubre de 2026</time>
          </p>
        </div>

        <Section title="1. Objeto y partes">
          <p>
            El titular de Replaid Lab es <strong style={{ color: 'var(--text)' }}>{SITE_OPERATOR.name}</strong>, conocido públicamente como {SITE_OPERATOR.publicName}. Domicilio de contacto: {SITE_OPERATOR.address}. Puedes escribir a <a href={`mailto:${SITE_OPERATOR.email}`} style={{ color: 'var(--accent)' }}>{SITE_OPERATOR.email}</a> o utilizar la <Link href="/contact" style={{ color: 'var(--accent)' }}>página de contacto</Link>.
          </p>
          <p>
            Replaid Lab publica guías de Overwatch y ofrece un marketplace que conecta jugadores («Usuarios») con analistas especializados («Expertos») para la revisión de replays de juego. En estas condiciones, «nosotros» y «la plataforma» se refieren al servicio operado por su titular.
          </p>
          <p>
            El acceso y uso de la plataforma implica la aceptación íntegra de los presentes Términos y Condiciones. Si no estás de acuerdo con alguno de ellos, debes abstenerte de utilizar el servicio.
          </p>
        </Section>

        <Section title="2. Registro y cuenta">
          <p>
            Para realizar compras o solicitar acceso como Experto es necesario crear una cuenta mediante GitHub OAuth o enlace mágico de email. Eres responsable de mantener la confidencialidad de tu cuenta y de todas las actividades realizadas desde ella.
          </p>
          <p>
            Replaid Lab puede restringir cuentas que incumplan estos términos para proteger a los usuarios y el servicio. Las incidencias con pedidos o importes pendientes deben revisarse por separado: una suspensión no supone una renuncia automática a los derechos que correspondan al usuario.
          </p>
        </Section>

        <Section title="3. El servicio de análisis">
          <p>
            Replaid Lab ofrece tres niveles de análisis («tiers»). Cada Experto fija libremente el precio y el contenido exacto que ofrece en cada tier, respetando los mínimos establecidos por la plataforma:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li><strong style={{ color: 'var(--text)' }}>Starter</strong> - Desde 2 € (precio base del experto). Plazo máximo de entrega: 7 días desde la recepción del replay.</li>
            <li><strong style={{ color: 'var(--text)' }}>Pro</strong> - Desde 5 € (precio base del experto). Plazo máximo de entrega: 7 días.</li>
            <li><strong style={{ color: 'var(--text)' }}>Deep Dive</strong> - Desde 8 € (precio base del experto). Plazo máximo de entrega: 7 días.</li>
          </ul>
          <p>
            El contenido exacto que incluye cada tier (secciones del análisis, timestamps de vídeo, número de replays, preguntas de seguimiento, etc.) lo determina cada Experto y queda descrito en su perfil público antes de realizar la compra.
          </p>
          <p>
            Algunos Expertos ofrecen adicionalmente un <strong style={{ color: 'var(--text)' }}>Análisis de Prueba</strong> a precio reducido, disponible una única vez por Usuario y Experto.
          </p>
          <p>
            Los plazos de entrega comienzan a contar desde que el Usuario envía el replay y el pedido pasa al estado «En revisión». Replaid Lab actúa como intermediario y no garantiza resultados concretos de mejora en el rendimiento del jugador.
          </p>
        </Section>

        <Section title="4. Precios, pagos y comisión">
          <p>
            Cada Experto fija libremente sus precios dentro de los rangos permitidos por la plataforma. El precio que paga el Usuario es el precio base del Experto más una comisión del 20% de Replaid Lab. El desglose completo (precio experto + comisión + total) es siempre visible antes de confirmar la compra.
          </p>
          <p>
            Los pagos se procesan de forma segura a través de Stripe. Replaid Lab no almacena datos de tarjeta. Al completar el pago aceptas también las <a href="https://stripe.com/es/legal/consumer" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Condiciones de uso de Stripe</a>.
          </p>
          <p>
            Los precios se muestran en euros (€) e incluyen los impuestos aplicables según la normativa vigente en España.
          </p>
        </Section>

        <Section title="5. Política de cancelación y reembolsos">
          <p>
            <strong style={{ color: 'var(--text)' }}>Antes de enviar el replay:</strong> puedes cancelar tu pedido y solicitar el reembolso completo mientras el estado sea «Pendiente de replay». Contacta con nosotros en soporte@replaidlab.com.
          </p>
          <p>
            <strong style={{ color: 'var(--text)' }}>Una vez enviado el replay:</strong> el pedido pasa a estado «En revisión». Si necesitas cancelar o comunicar una incidencia, escribe a soporte@replaidlab.com e indica el pedido. El estado del panel describe el trabajo realizado; no elimina por sí solo los derechos legales de desistimiento o reclamación que puedan corresponderte.
          </p>
          <p>
            <strong style={{ color: 'var(--text)' }}>Análisis de Prueba con reembolso garantizado:</strong> si el Experto ha activado esta opción, el Usuario puede solicitar el reembolso completo dentro de los 7 días naturales siguientes a la fecha de entrega de la review, sin necesidad de justificación. El reembolso se tramita en un plazo de 5-10 días hábiles.
          </p>
          <p>
            <strong style={{ color: 'var(--text)' }}>Incumplimiento de plazo:</strong> si el Experto supera el plazo de entrega acordado, el Usuario puede abrir una disputa. Replaid Lab evaluará cada caso y podrá emitir un reembolso parcial o total a su criterio.
          </p>
        </Section>

        <Section title="6. Obligaciones del Experto">
          <p>
            Al solicitar y ser aprobado como Experto en Replaid Lab, te comprometes a:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li>Entregar análisis honestos, de calidad y dentro del plazo acordado.</li>
            <li>Mantener actualizados tus datos de perfil (rango, especialidades, precios).</li>
            <li>No ofrecer ni aceptar pagos fuera de la plataforma para servicios iniciados en Replaid Lab.</li>
            <li>No revelar datos personales de los Usuarios a terceros.</li>
          </ul>
          <p>
            Replaid Lab puede suspender o retirar el acceso de cualquier Experto que incumpla estas obligaciones o que reciba valoraciones reiteradamente negativas.
          </p>
        </Section>

        <Section title="7. Obligaciones del Usuario">
          <p>
            Como Usuario de Replaid Lab te comprometes a:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li>Enviar replays que sean tuyos o para los que tengas permiso de uso.</li>
            <li>No compartir contenido ofensivo, ilegal o que infrinja derechos de terceros.</li>
            <li>Usar el sistema de mensajes de seguimiento únicamente para comunicarte con el Experto sobre tu pedido.</li>
            <li>No abusar del sistema de valoraciones enviando reseñas falsas o malintencionadas.</li>
          </ul>
        </Section>

        <Section title="8. Propiedad intelectual">
          <p>
            El contenido de los análisis entregados por los Expertos es para uso personal del Usuario. No está permitida su reproducción, distribución o publicación sin el consentimiento expreso del Experto y de Replaid Lab.
          </p>
          <p>
            El nombre, logotipo y marca «Replaid Lab» son propiedad exclusiva de la plataforma. Queda prohibido su uso sin autorización escrita.
          </p>
        </Section>

        <Section title="9. Limitación de responsabilidad">
          <p>
            Replaid Lab actúa como intermediario entre Usuarios y Expertos. No somos parte en el contrato de prestación del servicio de análisis y no asumimos responsabilidad por la calidad del contenido entregado más allá de los mecanismos de disputa previstos en estos Términos.
          </p>
          <p>
            Estas condiciones no excluyen las responsabilidades ni los derechos del consumidor que no puedan limitarse legalmente. Una review ofrece recomendaciones para practicar; no garantiza una subida de rango ni un resultado determinado en tus partidas.
          </p>
        </Section>

        <Section title="10. Protección de datos">
          <p>
            Replaid Lab recopila y trata los datos personales necesarios para la prestación del servicio (email, nombre de usuario, battletag) de conformidad con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos (LOPDGDD).
          </p>
          <p>
            Puedes consultar el tratamiento de cuentas, pedidos, vídeos, proveedores y tus derechos en la <Link href="/privacy" style={{ color: 'var(--accent)' }}>política de privacidad</Link>. Para solicitudes relacionadas con tus datos, escribe a <a href="mailto:soporte@replaidlab.com" style={{ color: 'var(--accent)' }}>soporte@replaidlab.com</a>.
          </p>
          <p>
            Stripe procesa los datos de tarjeta y de cobro bancario. Replaid Lab sí conserva identificadores de transacciones, importes y estados para gestionar los pedidos; no almacena el número completo de tarjeta ni su código de seguridad.
          </p>
        </Section>

        <Section title="11. Modificaciones de los términos">
          <p>
            Replaid Lab se reserva el derecho de modificar estos Términos en cualquier momento. Los cambios relevantes serán comunicados por email con al menos 15 días de antelación. El uso continuado del servicio tras la entrada en vigor de los nuevos Términos implica su aceptación.
          </p>
        </Section>

        <Section title="12. Ley aplicable y jurisdicción">
          <p>
            Estos términos se rigen por la legislación española, sin perjuicio de las normas imperativas aplicables al usuario. Las controversias se atenderán ante los órganos competentes conforme a la ley, respetando los derechos de los consumidores. No se exige renunciar al fuero que legalmente corresponda.
          </p>
          <p>
            Para consultas o reclamaciones: <a href="mailto:soporte@replaidlab.com" style={{ color: 'var(--accent)' }}>soporte@replaidlab.com</a>
          </p>
        </Section>

        <Section title="13. Patrocinios, afiliación y cookies">
          <p>
            Algunas páginas públicas de la hemeroteca pueden incluir bloques patrocinados o enlaces de afiliado relacionados con Overwatch, periféricos, herramientas de entrenamiento o recursos para jugadores. Estos espacios se mostrarán siempre identificados como patrocinados o afiliados y nunca bloquearán el acceso al contenido principal.
          </p>
          <p>
            Replaid Lab podrá usar cookies técnicas y, solo cuando se active y se solicite el consentimiento correspondiente, cookies de analítica o medición comercial para entender el rendimiento de contenidos, conversiones y enlaces patrocinados.
          </p>
        </Section>

      </main>

    </div>
  )
}
