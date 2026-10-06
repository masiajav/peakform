import type { Metadata } from 'next'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import { buildMetadata } from '@/lib/seo'
import { SITE_OPERATOR, TRUST_REVIEW_DATE } from '@/lib/site-operator'
import styles from '@/components/content/TrustDocument.module.css'

export const metadata: Metadata = buildMetadata({
  title: 'Privacidad y cookies',
  description: 'Política de privacidad y cookies de Replaid Lab: datos de cuenta, pagos, analítica, consentimiento y contacto.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <PublicNav />
      <main className={`trust-page ${styles.page}`}>
        <div className="eyebrow">PRIVACIDAD</div>
        <h1>Privacidad y cookies</h1>
        <p className="trust-lead">
          Puedes leer nuestras guías sin crear una cuenta. Si te registras, compras una revisión o trabajas como experto, necesitamos algunos datos para gestionar ese servicio. Aquí explicamos cuáles son, quién los recibe y cómo puedes ejercer tus derechos.
        </p>
        <p>Última revisión: <time dateTime={TRUST_REVIEW_DATE}>5 de octubre de 2026</time>.</p>

        <section>
          <h2>Responsable del tratamiento</h2>
          <p>El responsable de los datos que gestiona Replaid Lab es {SITE_OPERATOR.name}, conocido públicamente como {SITE_OPERATOR.publicName}. Su domicilio de contacto es {SITE_OPERATOR.address}.</p>
          <p>Para consultas sobre tus datos o para ejercer tus derechos, escribe a <a href={`mailto:${SITE_OPERATOR.email}`}>{SITE_OPERATOR.email}</a>. No es necesario publicar tu solicitud ni tus datos en una página de la web. Puedes consultar también los datos del titular y las condiciones del servicio en el <Link href="/legal">aviso legal</Link>.</p>
        </section>

        <section>
          <h2>Cuenta, perfil y pedidos</h2>
          <p>
            Al registrarte recibimos tu email y los datos de perfil que facilites, como nombre visible, avatar o BattleTag. Si utilizas un proveedor de inicio de sesión, este comparte los datos necesarios para identificar tu cuenta. Las cookies de sesión permiten mantener el acceso a tu panel.
          </p>
          <p>En un pedido guardamos el experto elegido, el servicio, el importe, el estado del pago y de la entrega, los enlaces de replay, las notas que envías y la review correspondiente. Si valoras el servicio, también tratamos tu puntuación y comentario. No envíes contraseñas, documentos de identidad ni información ajena a la partida en tus notas o replays.</p>
          <p>El perfil de experto muestra públicamente la información que describe su servicio: nombre, avatar, especialidades, biografía, precios y valoraciones. Los pedidos y las reviews no se publican como artículos de la web.</p>
        </section>

        <section>
          <h2>Para qué usamos esos datos</h2>
          <p>Gestionamos la cuenta, el pedido, la entrega del análisis y las comunicaciones relacionadas para prestar el servicio que solicitas. El experto asignado necesita ver el replay y tus indicaciones para preparar la review. El equipo que administra la plataforma puede acceder a la información necesaria para atender incidencias, disputas o solicitudes de soporte.</p>
          <p>El tratamiento necesario para contratar y ejecutar el servicio se basa en esa relación contractual. También pueden existir obligaciones legales de conservación y controles de seguridad para prevenir accesos indebidos o fraude. Los tratamientos opcionales que requieran consentimiento no deben activarse por el mero hecho de visitar la web; ese consentimiento puede retirarse sin afectar a los usos necesarios para gestionar un pedido.</p>
        </section>

        <section>
          <h2>Pagos y proveedores</h2>
          <p>
            Stripe procesa los pagos y la configuración de cobro de los expertos. Replaid Lab guarda identificadores de pago, importes y estados para relacionar cada operación con su pedido, pero no almacena el número completo de tu tarjeta ni su código de seguridad. Los datos bancarios y de verificación que un experto introduce en Stripe se gestionan en ese servicio.
          </p>
          <p>Supabase proporciona autenticación, base de datos y almacenamiento; Vercel aloja la web; y Resend envía comunicaciones del servicio, como avisos de entrega. Estos proveedores intervienen en sus respectivas funciones, no para publicar tus pedidos.</p>
          <p>Los proveedores pueden tratar información desde distintos países. Sus condiciones de protección de datos describen las ubicaciones y las garantías aplicables a transferencias internacionales. Puedes consultar la <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">privacidad de Supabase</a>, la <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">privacidad de Vercel</a>, la <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">privacidad de Resend</a> y la <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">privacidad de Stripe</a>.</p>
        </section>

        <section>
          <h2>Cookies, analítica y preferencias locales</h2>
          <p>
            Las cookies técnicas de autenticación son necesarias para entrar en tu cuenta. Si las bloqueas, algunas funciones del panel pueden dejar de funcionar. Puedes borrar las cookies desde tu navegador o cerrar la sesión cuando termines de usar un dispositivo compartido.
          </p>
          <p>La web integra Vercel Web Analytics para conocer de forma agregada qué páginas se visitan. Según la documentación de Vercel, esta herramienta no utiliza cookies de terceros para identificar visitantes. Puedes leer cómo funciona en su <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">información sobre privacidad de Analytics</a>. Esto no significa que la web carezca de cookies técnicas o de conexiones con otros proveedores.</p>
          <p>Pick Lab guarda en el almacenamiento local del navegador el feedback que introduces en la herramienta. Este historial permanece en ese dispositivo y puede eliminarse borrando los datos del sitio desde el navegador. No es una cookie publicitaria.</p>
        </section>

        <section>
          <h2>Vídeos y enlaces externos</h2>
          <p>Algunas guías incluyen vídeos de YouTube mediante su dominio de privacidad mejorada, youtube-nocookie.com. Al cargarse el reproductor se establece una conexión con YouTube, y al reproducir el vídeo se aplican sus condiciones. Puedes usar el enlace al vídeo para verlo directamente en esa plataforma. Los enlaces a Blizzard, Discord y otros sitios te llevan a servicios con sus propias políticas de privacidad.</p>
        </section>

        <section>
          <h2>Publicidad y consentimiento</h2>
          <p>La verificación del dominio para AdSense no equivale a activar anuncios. La publicidad permanece bloqueada durante la revisión del sitio. Antes de habilitarla deberán configurarse las opciones de privacidad y el consentimiento correspondientes, incluida una plataforma de gestión del consentimiento certificada por Google e integrada con el TCF para servir anuncios a usuarios del Espacio Económico Europeo, Reino Unido y Suiza.</p>
          <p>Si se activa publicidad de Google, Google y sus partners podrán usar cookies u otros identificadores conforme a las opciones de consentimiento. La política de esta página y los controles de privacidad deberán reflejar esa configuración antes de que empiece a funcionar. Puedes consultar cómo Google utiliza los datos de los sitios que usan sus servicios en <a href="https://policies.google.com/technologies/partner-sites?hl=es" target="_blank" rel="noopener noreferrer">Privacidad y condiciones de Google</a>.</p>
        </section>

        <section>
          <h2>Conservación y eliminación</h2>
          <p>Los datos de la cuenta permiten mantener tu acceso y el historial del servicio. Al solicitar la eliminación se debe valorar qué información puede suprimirse y cuál debe conservarse para atender obligaciones legales, operaciones de pago o reclamaciones pendientes. El cierre de una cuenta no implica borrar automáticamente todos los registros de una compra ni los datos que un proveedor de pago deba conservar por obligación propia.</p>
          <p>Para pedir el cierre o conocer la conservación aplicable a tu caso, escribe al contacto indicado a continuación. No es necesario publicar tus datos en Discord ni en una valoración para tramitar una solicitud.</p>
        </section>

        <section>
          <h2>Derechos y contacto</h2>
          <p>
            Puedes solicitar acceso, rectificación, supresión, limitación, oposición o portabilidad cuando proceda escribiendo a <a href="mailto:soporte@replaidlab.com">soporte@replaidlab.com</a>. Indica qué solicitas y el email vinculado a tu cuenta. Puede ser necesario comprobar tu identidad antes de facilitar datos o modificar una cuenta; no adjuntes documentación sensible sin que se te pida por un canal adecuado.
          </p>
          <p>También puedes presentar una reclamación ante la <a href="https://www.aepd.es/" target="_blank" rel="noopener noreferrer">Agencia Española de Protección de Datos</a> si consideras que tus derechos no se han atendido correctamente. Para dudas sobre pedidos o privacidad, utiliza el mismo email de soporte o la <Link href="/contact">página de contacto</Link>.</p>
        </section>

        <div className="trust-links">
          <Link href="/about">Sobre Replaid Lab</Link>
          <Link href="/editorial-methodology">Metodología editorial</Link>
          <Link href="/legal">Términos</Link>
        </div>
      </main>
    </div>
  )
}
