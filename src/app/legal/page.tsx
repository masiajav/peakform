import Link from 'next/link'

export const metadata = {
  title: 'Términos y Condiciones — Replaid Lab',
  description: 'Condiciones de uso, política de reembolsos y privacidad de Replaid Lab.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
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

      {/* Nav */}
      <nav style={{
        height: 52, background: 'var(--bg)', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', padding: '0 24px', gap: 20,
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Link href="/" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: 'var(--accent)', letterSpacing: 3, textDecoration: 'none' }}>
          REPLAID LAB
        </Link>
        <div style={{ flex: 1 }} />
        <Link href="/experts" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
        <Link href="/apply" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Ser experto</Link>
        <Link href="/login" className="btn btn-primary btn-sm">ENTRAR</Link>
      </nav>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px 96px' }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 12 }}>
            LEGAL
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 40, letterSpacing: 1, color: 'var(--text)', margin: '0 0 16px' }}>
            TÉRMINOS Y CONDICIONES
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text3)', margin: 0 }}>
            Última actualización: mayo de 2026
          </p>
        </div>

        <Section title="1. Objeto y partes">
          <p>
            Replaid Lab es un marketplace que conecta jugadores de Overwatch («Usuarios») con analistas especializados («Expertos») para la revisión de replays de juego. El servicio es operado por Replaid Lab («nosotros», «la plataforma»).
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
            Replaid Lab se reserva el derecho de suspender o eliminar cuentas que incumplan estos Términos, sin previo aviso y sin derecho a reembolso de saldos pendientes, salvo en los casos expresamente indicados en la política de reembolsos.
          </p>
        </Section>

        <Section title="3. El servicio de análisis">
          <p>
            Replaid Lab ofrece tres niveles de análisis («tiers»). Cada Experto fija libremente el precio y el contenido exacto que ofrece en cada tier, respetando los mínimos establecidos por la plataforma:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li><strong style={{ color: 'var(--text)' }}>Starter</strong> — Desde 2 € (precio base del experto). Plazo maximo de entrega: 7 dias desde la recepcion del replay.</li>
            <li><strong style={{ color: 'var(--text)' }}>Pro</strong> — Desde 5 € (precio base del experto). Plazo maximo de entrega: 7 dias.</li>
            <li><strong style={{ color: 'var(--text)' }}>Deep Dive</strong> — Desde 8 € (precio base del experto). Plazo maximo de entrega: 7 dias.</li>
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
            <strong style={{ color: 'var(--text)' }}>Una vez enviado el replay:</strong> el pedido pasa a estado «En revisión» y no es posible cancelarlo, ya que el Experto ha comenzado a trabajar en él.
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
            En ningún caso Replaid Lab será responsable de daños indirectos, lucro cesante o pérdida de datos derivados del uso o imposibilidad de uso del servicio.
          </p>
        </Section>

        <Section title="10. Protección de datos">
          <p>
            Replaid Lab recopila y trata los datos personales necesarios para la prestación del servicio (email, nombre de usuario, battletag) de conformidad con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos (LOPDGDD).
          </p>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición contactando en <a href="mailto:soporte@replaidlab.com" style={{ color: 'var(--accent)' }}>soporte@replaidlab.com</a>.
          </p>
          <p>
            Los datos de pago son gestionados íntegramente por Stripe y no se almacenan en los servidores de Replaid Lab.
          </p>
        </Section>

        <Section title="11. Modificaciones de los términos">
          <p>
            Replaid Lab se reserva el derecho de modificar estos Términos en cualquier momento. Los cambios relevantes serán comunicados por email con al menos 15 días de antelación. El uso continuado del servicio tras la entrada en vigor de los nuevos Términos implica su aceptación.
          </p>
        </Section>

        <Section title="12. Ley aplicable y jurisdicción">
          <p>
            Estos Términos se rigen por la legislación española. Para cualquier controversia derivada del uso de la plataforma, las partes se someten a los Juzgados y Tribunales de España, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
          </p>
          <p>
            Para consultas o reclamaciones: <a href="mailto:soporte@replaidlab.com" style={{ color: 'var(--accent)' }}>soporte@replaidlab.com</a>
          </p>
        </Section>

        <Section title="13. Patrocinios, afiliacion y cookies">
          <p>
            Algunas paginas publicas de la hemeroteca pueden incluir bloques patrocinados o enlaces de afiliado relacionados con Overwatch, perifericos, herramientas de entrenamiento o recursos para jugadores. Estos espacios se mostraran siempre identificados como patrocinados o afiliados y nunca bloquearan el acceso al contenido principal.
          </p>
          <p>
            Replaid Lab podra usar cookies tecnicas y, solo cuando se active y se solicite el consentimiento correspondiente, cookies de analitica o medicion comercial para entender el rendimiento de contenidos, conversiones y enlaces patrocinados.
          </p>
        </Section>

      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'var(--accent)', letterSpacing: 2 }}>
          REPLAID LAB
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          <Link href="/experts" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Expertos</Link>
          <Link href="/apply" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Ser experto</Link>
          <Link href="/legal" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Legal</Link>
          <Link href="/login" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Entrar</Link>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>© 2026 Replaid Lab</span>
      </footer>

    </div>
  )
}
