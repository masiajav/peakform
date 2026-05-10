# Plan: Emails editoriales y newsletter semanal

## Resumen

Replaid Lab incorporara emails editoriales usando Resend, con consentimiento opt-in y dos canales separados:

- Updates cuando se publique una noticia relevante.
- Newsletter semanal con consejos de Overwatch curada manualmente por admin.

No se enviaran emails de contenido a usuarios que no hayan activado explicitamente las preferencias.

## Cambios principales

### Preferencias de usuario

Anadir campos a `profiles`:

- `email_updates_enabled boolean default false`
- `email_weekly_tips_enabled boolean default false`
- `email_unsubscribe_token uuid`
- `email_unsubscribed_at timestamptz`

La pagina `/profile` debe mostrar dos checkboxes:

- Recibir noticias y updates importantes.
- Recibir consejo semanal de Overwatch.

### Baja de emails

Crear una ruta publica:

- `/unsubscribe?token=...`

La ruta debe:

- Validar el token.
- Desactivar `email_updates_enabled` y `email_weekly_tips_enabled`.
- Guardar `email_unsubscribed_at`.
- Mostrar confirmacion clara sin requerir login.

### Campanas editoriales

Crear tabla `email_campaigns` para emails de contenido:

- `id uuid primary key`
- `type text` con valores esperados `news_update` o `weekly_tip`
- `status text` con valores esperados `draft`, `scheduled`, `sending`, `sent`, `failed`
- `announcement_id uuid null`
- `subject text not null`
- `preheader text`
- `body text not null`
- `cta_label text`
- `cta_url text`
- `scheduled_for timestamptz`
- `sent_at timestamptz`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

Crear tabla `email_deliveries` para trazabilidad y anti-duplicados:

- `id uuid primary key`
- `campaign_id uuid references email_campaigns(id)`
- `user_id uuid references profiles(id)`
- `email text not null`
- `status text` con valores esperados `pending`, `sent`, `failed`, `skipped`
- `error text`
- `sent_at timestamptz`
- `created_at timestamptz default now()`

Debe existir una restriccion unica por `campaign_id` y `user_id`.

## Comportamiento de envio

### Noticias publicadas

Cuando una noticia pasa a `published=true`, se debe crear una campana `news_update`.

El envio se hara solo a usuarios con:

- `email_updates_enabled=true`
- `email_unsubscribed_at is null`

La misma noticia no debe reenviarse si se edita despues.

### Newsletter semanal

El admin creara manualmente el contenido semanal:

- Asunto.
- Preheader.
- Cuerpo.
- CTA opcional.
- Fecha programada.

El cron semanal solo enviara campanas `weekly_tip` en estado `scheduled` cuya fecha ya haya llegado.

Si no hay newsletter curada esa semana, no se envia nada.

### Resend

Extender `src/lib/email.ts` con helpers:

- `sendNewsUpdateEmail`
- `sendWeeklyTipEmail`
- `sendCampaignToSubscribers`

Todos los emails deben incluir:

- enlace de baja,
- enlace a Replaid Lab,
- asunto claro,
- CTA opcional a noticia, guia, Discord o expertos.

## Cron y seguridad

Anadir cron a `vercel.json`:

- ruta: `/api/cron/send-email-campaigns`
- frecuencia: semanal, lunes por la manana

Proteger el endpoint con `CRON_SECRET`.

Variables necesarias:

- `CRON_SECRET`
- `RESEND_API_KEY`
- opcional `EMAIL_FROM`, con fallback `Replaid Lab <hola@replaidlab.com>`

El envio debe ser por lotes y best-effort:

- registrar cada entrega en `email_deliveries`,
- continuar si falla un destinatario,
- marcar campana como `failed` solo si falla el proceso general.

## Test plan

- Usuario con preferencias desactivadas no recibe campanas.
- Usuario con updates activados recibe email al publicar una noticia nueva.
- Editar una noticia ya publicada no reenvia.
- Usuario con newsletter activada recibe una campana semanal aprobada.
- `/unsubscribe?token=...` desactiva ambos canales.
- `email_deliveries` evita duplicados.
- Ejecutar:
  - `npx.cmd tsc --noEmit`
  - `npm.cmd run lint`
  - `npm.cmd run build`

## Assumptions

- Solo usuarios con cuenta pueden suscribirse.
- El consentimiento sera opt-in.
- Los updates automaticos se limitan a noticias publicadas.
- La newsletter semanal sera curada manualmente por admin.
- No se compran listas ni se envia marketing a usuarios sin consentimiento.
