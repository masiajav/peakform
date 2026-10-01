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
7. No repite desarrollo sustancial de otra URL sin aportar una respuesta distinta. Los avisos automáticos de similitud se comprueban leyendo ambas páginas.

Las páginas que todavía no lo cumplen siguen disponibles con `noindex, follow` y sin anuncios.

## Publicidad

- Un ID válido en `NEXT_PUBLIC_ADSENSE_CLIENT_ID` añade la meta de verificación `google-adsense-account` al HTML del servidor. No ejecuta anuncios. `ads.txt` se conserva.
- `NEXT_PUBLIC_ADSENSE_REVIEW_MODE=true` bloquea script e inventario aunque los flags de aprobación y CMP estén activados. El script de AdSense no es un modo de verificación inocuo: puede ejecutar Auto Ads configurados en la cuenta.
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

Para volver a comprobar todas las URLs del inventario anterior, incluidas las que ya no aparecen en menús, usa `AUDIT_SEED_FILE` con el informe JSON previo. El auditor conserva la ruta solicitada y registra el destino de las redirecciones. No recorre áreas privadas ni endpoints de API. Una página retirada de la navegación no se considera mejorada por desaparecer del siguiente rastreo.

## Limitaciones y revisión del 30 de septiembre de 2026

Un resultado sin incidencias automáticas no significa que una página esté terminada ni que AdSense vaya a aprobarla. La extensión y la similitud son indicadores para una revisión individual, no requisitos numéricos de Google.

Se corrigió un fallo del comparador: las secuencias de palabras se convertían en arrays, aunque la comparación esperaba conjuntos. Esto producía resultados no numéricos y dejaba siempre vacía la lista de similitudes. Los informes anteriores deben regenerarse.

Cuando una guía no tiene `main`, el análisis utiliza `article` si contiene el H1. En hubs sin esos contenedores se excluyen navegación y footer, sin perder la cabecera ni las tarjetas. El descubrimiento de enlaces recorre todo el documento. Las variantes con el mismo canonical no se presentan como artículos editoriales duplicados.

El diagnóstico de producción y las siguientes prioridades están en [la revisión de AdSense del 30 de septiembre](adsense-review-2026-09-30.md).
