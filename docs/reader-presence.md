# Lectores por juego

La franja pública muestra ambos juegos en la portada general y solo el correspondiente en las secciones de Overwatch o Deadlock. Se integra con la franja de comunidad existente. Las rutas en las que ya se oculta esa franja no abren una conexión de presencia.

## Medición

Supabase Realtime Presence publica únicamente el juego y una clave aleatoria efímera, con un cliente aislado que no carga ni guarda la sesión de cuenta. No se usan cookies, almacenamiento persistente, rutas exactas, correos ni identificadores de usuario para el contador. La política de privacidad describe el tratamiento y el proveedor de conexión.

Solo participa una pestaña visible por juego y contexto del navegador mediante Web Locks. Las demás observan y pueden relevar a la primera. Un navegador con ambos juegos visibles puede contar una vez en cada uno. La portada general observa sin atribuirse a un juego.

La cifra aproxima sesiones visibles; no prueba que sean personas distintas o que estén leyendo. Excluye clientes sin JavaScript o APIs compatibles y puede retrasarse al perderse una conexión. Al ser un canal público, no es una métrica certificada frente a bots o clientes manipulados. No se usa para publicidad, facturación o estadísticas de audiencia verificadas.

Los valores aparecen después de suscripción y sincronización reales. Durante conexión o fallo se muestra «—», nunca un cero inventado. Los cambios de juego invalidan el snapshot anterior desde el primer render. Ocultar o cerrar la página retira la presencia y cancela las esperas de bloqueo.

Los dos dominios de producción usan `replaid-readers-v1`; localhost y previews usan `replaid-readers-preview-v1`. El bloqueo local incluye ese mismo nombre de canal. Las pruebas locales no suman visitas a producción. No hacen falta migraciones, nuevos proveedores ni cambios de plan.

## Ilustraciones

Dos ilustraciones propias generadas con ImageGen integrado, con referencias visuales del bot de entrenamiento y del trooper de vela. Los originales PNG y prompts se conservan en `reports/reader-presence-2026-11-16/art/` fuera del commit. Las copias de entrega conservan transparencia y se codifican en WebP:

- `/community/ow-training-bot.bb96a53951d3.webp`: 188 × 192, 14.934 bytes.
- `/community/deadlock-candle-trooper.d7fea4b1c90a.webp`: 97 × 192, 10.358 bytes.

Los SHA-256 completos están en el registro privado `art/assets.json`. No se cargan imágenes de terceros desde la cabecera. El movimiento es discreto y se desactiva cuando el navegador pide reducir animaciones.

## Verificación

15 pruebas del transporte y 29 de presentación e integración con comunidad, privacidad y clasificación por juego aprobadas durante la implementación. Revisión técnica independiente sin bloqueos después de corregir el snapshot anterior en transiciones. Las capturas y comprobaciones finales de navegador, conexión remota y despliegue se conservan en el directorio privado de esta tarea.

## Fuentes técnicas

- [Supabase Presence](https://supabase.com/docs/guides/realtime/presence).
- [Web Locks](https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API).
