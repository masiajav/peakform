# Control editorial y AdSense

## Objetivo

Replaid Lab publica páginas que responden a una duda concreta de un jugador de Overwatch. Una URL no entra en el sitemap por existir ni por superar una cifra de palabras. Debe tener análisis propio, decisiones aplicables y una revisión editorial completa.

## Estado inicial (5 de septiembre de 2026)

- 104 URLs indexables detectadas antes de esta revisión.
- Las páginas de mapas y los clusters editoriales principales ya tenían una extensión suficiente.
- Las guías ranked de Ana, Kiriko, Genji, Cassidy, Reinhardt, D.Va y Winston compartían demasiada estructura y fragmentos.
- Las composiciones de Tracer y Zarya utilizaban contenido genérico pese a figurar como terminadas.
- Los hubs de Tank, DPS y Support necesitaban más contexto específico del rol.
- Las páginas genéricas de counters y composiciones ya estaban en `noindex, follow`; se mantienen accesibles mientras esperan revisión individual.
- La publicidad y sus placeholders estaban apagados. El código de verificación y el servicio de anuncios no estaban separados de forma explícita.

## Criterios para publicar

Una página editorial puede indexarse cuando cumple todos estos puntos:

1. Responde a una intención concreta desde el comienzo.
2. Incluye decisiones y ejemplos que no puedan intercambiarse con otra página.
3. No contiene notas internas, instrucciones de redacción ni texto provisional.
4. Tiene title, description, canonical, un H1 y datos estructurados que coinciden con el contenido visible.
5. Identifica a Replaid Lab y muestra una fecha de revisión real.
6. Sus imágenes, enlaces y navegación funcionan en móvil y escritorio.
7. No supera el umbral de similitud con otra URL del sitio.

Las páginas que todavía no lo cumplen siguen disponibles con `noindex, follow` y sin anuncios.

## Publicidad

- `NEXT_PUBLIC_ADSENSE_REVIEW_MODE=true` carga únicamente el script necesario para la revisión del sitio.
- `NEXT_PUBLIC_ADSENSE_APPROVED=true` no basta para mostrar anuncios.
- El servicio exige además `NEXT_PUBLIC_ADSENSE_CMP_READY=true`, una ruta editorial autorizada y un identificador de slot válido.
- Home, hubs, páginas legales, expertos y áreas privadas no son inventario publicitario.
- El CMP certificado se configura en la plataforma elegida y solo entonces se activa el flag correspondiente en producción.

## Auditoría automática

Con el servidor local activo:

```powershell
npm.cmd run audit:content
```

Para guardar el inventario completo:

```powershell
$env:AUDIT_OUTPUT='reports/content-audit.json'; npm.cmd run audit:content
```

La auditoría recorre el sitemap y los enlaces públicos que encuentra. Registra robots, metadatos, H1, palabras visibles, imágenes, enlaces, JSON-LD, texto interno y similitud entre páginas.
