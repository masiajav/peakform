import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'PeakForm <onboarding@resend.dev>'

const TIER_LABELS: Record<string, string> = {
  starter:   'Starter',
  pro:       'Pro',
  deep_dive: 'Deep Dive',
}

export async function sendReviewReadyEmail({
  to,
  expertName,
  tier,
  reviewUrl,
}: {
  to: string
  expertName: string
  tier: string
  reviewUrl: string
}) {
  const tierLabel = TIER_LABELS[tier] ?? tier

  await resend.emails.send({
    from: FROM,
    to,
    subject: `Tu análisis está listo — PeakForm`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e0e0e0;">
        <!-- Header -->
        <tr>
          <td style="padding:28px 32px;border-bottom:3px solid #ff6b2b;">
            <span style="font-size:22px;font-weight:700;color:#0a0a0a;letter-spacing:2px;">PEAKFORM</span>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#0a0a0a;">
              Tu análisis está listo
            </h1>
            <p style="margin:0 0 20px;font-size:15px;color:#444;line-height:1.6;">
              <strong>${expertName}</strong> ha completado tu análisis de replay <strong>${tierLabel}</strong>.
              Ya puedes ver el feedback completo en tu dashboard.
            </p>
            <a href="${reviewUrl}" style="display:inline-block;padding:12px 28px;background:#ff6b2b;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:1px;">
              VER MI ANÁLISIS →
            </a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #e0e0e0;">
            <p style="margin:0;font-size:12px;color:#999;">
              PeakForm · Análisis de replays de Overwatch · <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#ff6b2b;text-decoration:none;">peakform.gg</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
    `.trim(),
  })
}

export async function sendNewOrderEmail({
  to,
  tier,
  playerRole,
  deadline,
  orderUrl,
}: {
  to: string
  tier: string
  playerRole: string
  deadline: string
  orderUrl: string
}) {
  const tierLabel = TIER_LABELS[tier] ?? tier
  const deadlineDate = new Date(deadline).toLocaleString('es-ES', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  await resend.emails.send({
    from: FROM,
    to,
    subject: `Nuevo pedido asignado — PeakForm`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e0e0e0;">
        <!-- Header -->
        <tr>
          <td style="padding:28px 32px;border-bottom:3px solid #ff6b2b;">
            <span style="font-size:22px;font-weight:700;color:#0a0a0a;letter-spacing:2px;">PEAKFORM</span>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#0a0a0a;">
              Nuevo pedido asignado
            </h1>
            <p style="margin:0 0 20px;font-size:15px;color:#444;line-height:1.6;">
              Tienes un nuevo análisis de replay <strong>${tierLabel}</strong> esperando.
              El jugador ha subido su replay y está listo para revisar.
            </p>
            <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;width:100%;background:#f9f9f9;border:1px solid #e0e0e0;">
              <tr>
                <td style="padding:14px 18px;font-size:13px;color:#666;border-bottom:1px solid #e0e0e0;">Tier</td>
                <td style="padding:14px 18px;font-size:13px;color:#0a0a0a;font-weight:600;border-bottom:1px solid #e0e0e0;">${tierLabel}</td>
              </tr>
              <tr>
                <td style="padding:14px 18px;font-size:13px;color:#666;border-bottom:1px solid #e0e0e0;">Rol</td>
                <td style="padding:14px 18px;font-size:13px;color:#0a0a0a;font-weight:600;border-bottom:1px solid #e0e0e0;">${playerRole}</td>
              </tr>
              <tr>
                <td style="padding:14px 18px;font-size:13px;color:#666;">Plazo</td>
                <td style="padding:14px 18px;font-size:13px;color:#ff6b2b;font-weight:600;">${deadlineDate}</td>
              </tr>
            </table>
            <a href="${orderUrl}" style="display:inline-block;padding:12px 28px;background:#ff6b2b;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:1px;">
              VER PEDIDO →
            </a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #e0e0e0;">
            <p style="margin:0;font-size:12px;color:#999;">
              PeakForm · Análisis de replays de Overwatch · <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#ff6b2b;text-decoration:none;">peakform.gg</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
    `.trim(),
  })
}
