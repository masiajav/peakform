# Footer publico: contraste y navegacion

Fecha: 2026-10-03. Revisor: Codex.

## Problema y alcance

La lectura manual de counters detecto enlaces legales y texto del footer con
`#404040` sobre `#141414`. Se sustituyen las variables secundarias dentro de
`.public-footer`, sin modificar colores globales ni los de areas privadas.

- Texto secundario `#b3b3b3` sobre `#141414`: contraste 8.79:1.
- Enlaces de columnas: altura minima 24px en escritorio y 44px en movil.
- Se conserva el foco global visible de teclado, con outline naranja de 2px.
- Se conservan todos los enlaces, rutas y exclusiones privadas.
- No se modifican pagos, cuentas, identidad legal, contenido ni publicidad.

## Evidencia

- `npm.cmd run verify`: lint, 283 unitarios, build y 654 E2E correctos
  sin retries; 8.2 minutos de E2E. TypeScript sin errores; diff check correcto.
- Unitarios: footer ausente en nueve prefijos privados y sus descendientes;
  presente en paginas publicas, incluidos `/experts` y sus perfiles.
- E2E escritorio/movil: home, Legal y counter de Sombra. Contraste de cada
  texto del footer, enlaces dentro del viewport, alturas tactiles, cinco
  destinos de confianza HTTP 200, sin overflow, pageerrors o anuncios.
- Navegacion por teclado a Legal, foco visible y H1 de destino comprobados.
  Guards anonimos de dashboard, expert, admin, profile y pedidos siguen
  exigiendo login, sin footer ni anuncios. No se certifica una compra real.
- Navegador interno: home 1440x900 y Legal 390x844, lectura y capturas del
  footer, clicks a Legal y Contacto con URL/H1 comprobados. Sin errores de
  consola observados. Se restaura el viewport.
- Build `LcGFfhL92XcidqCLN_Gx8`, preservado en
  `.next-editorial-built-preview/footer-accessibility-2026-10-03`.
- Informe y seis capturas finales:
  `reports/verification-footer-accessibility-2026-10-03`.
- Sitemap: mismas 105 URLs que el rastreo anterior, sin diferencias al
  normalizar URLs con el parser URI (incluida la barra final de la home).

No se ha hecho push, deploy ni solicitado AdSense. Este control se limita
al footer: no certifica el contraste de todos los articulos o el sitio
completo. Siguen pendientes revisiones individuales, datos del titular,
CMP certificado y comprobacion del despliegue y cuentas externas.
