# Revisión de AdSense, 26 de octubre de 2026

## Diagnóstico y alcance

La cuenta de AdSense muestra el rechazo del 17 de octubre por «Contenido de poco valor». No identifica URLs concretas. Los hallazgos siguientes son problemas observados en la web, no una atribución de la decisión de Google a una URL concreta.

El inventario previo reúne 529 páginas públicas descubiertas por sitemap, enlaces e inventario histórico, incluyendo las rutas editoriales y guías publicadas de la base de datos. El recorrido agotó su cola; todas las páginas respondieron con HTTP 200 tras redirecciones. Había 273 entradas de sitemap, 290 respuestas indexables (incluye rutas redirigidas) y 239 noindex. El rastreo automático no equivale a una revisión factual completa de todas las páginas. Las alertas de longitud son heurísticas para inspección, no requisitos de AdSense.

Evidencia local (ignorada por Git): `reports/adsense-2026-10-25/before.json`, `inventory-before.json`, `faq-changes.json`, `published.json` y capturas por candidato en `reports/editorial/`.

## Cambios publicados de contenido

- Revisión individual de las tres URLs existentes de dive, anti-dive y rush/brawl. Incluyen situaciones, decisiones de entrada y retirada, coordinación y ejercicios de repetición. Las fuentes oficiales de Blizzard sustentan las habilidades mencionadas; los ejemplos tácticos son análisis editorial. Se conservan la fecha de primera publicación y los registros originales de guías.
- Eliminación de doce respuestas FAQ que copiaban literalmente un párrafo: builds y counters de Abrams, Dínamo, Infernus, Bruma, Lash y Seven. El cuerpo y las demás respuestas permanecen disponibles.
- Retirada del código de importación 899427 de Bruma tras confirmar repetidamente HTTP 404 en la consulta actual de la build. Se conserva la guía de compras y se informa de la indisponibilidad; no se inventa un código alternativo. El publicador vuelve a verificar el 404 y se detiene si cambia el estado.
- Cada revisión se publicó mediante candidatos y evidencias de versión exacta, comprobando fuentes, enlaces internos, importaciones aplicables y vistas de 1440 y 390 píxeles. Tras cada publicación se comprobó la versión servida por la URL pública. Las doce revisiones de Deadlock también actualizan el respaldo local con esas mismas evidencias publicadas.

La automatización editorial diaria conserva su horario y queda temporalmente limitada a actualizar contenido existente, sin nuevas URLs, hasta confirmación humana de aprobación o cambio de instrucción.

## Inventario de anuncios compartido

Overwatch y Deadlock usan `ArticleAd`, `ArticleAdLayout` y los mismos tres slots: después del resumen, después de un vídeo real y lateral de escritorio. Las builds de Deadlock usan la categoría de guía. Índices, perfiles, páginas privadas y categorías no elegibles quedan excluidos. No se reserva espacio lateral en móvil o con anuncios bloqueados.

La cuenta no tenía bloques de anuncios existentes. Se crearon tres bloques display adaptables compartidos: resumen `4100872939`, vídeo `2787791265` y lateral `6535464588`. Los IDs públicos están asociados exclusivamente al publisher `ca-pub-8844760720809623`; las variables de entorno pueden sustituirlos o desactivar expresamente un slot. Crear bloques no cambia el estado de aprobación ni activa la carga de anuncios.

La elegibilidad editorial corresponde a la versión revisada. No activa publicidad por sí sola: siguen siendo necesarios el publisher válido, la aprobación del sitio, la configuración de consentimiento y salir del modo de revisión. No se ha activado publicidad durante estas correcciones. El ciclo del componente evita encolar dos veces el mismo elemento al repetir efectos de React.

Los nuevos controles de párrafos y FAQ duplicados se aplican al flujo de nuevas revisiones, sin endurecer retroactivamente la carga de páginas históricas ni convertirlas en 404. Se comprueban los destinos internos tanto durante la revisión como antes de publicar.

## Consentimiento y ads.txt

Se reutilizó el mensaje europeo existente, publicado desde mayo. El 26 de octubre se publicó la corrección de idioma predeterminado a español y del enlace de privacidad, que apuntaba a la portada HTTP, a `https://www.replaidlab.com/privacy`. Se conservaron las opciones de consentir, no consentir y gestionar opciones. La publicación del mensaje no prueba su ejecución en la web: la etiqueta de anuncios continúa bloqueada durante la revisión. Antes de activar anuncios se deberá comprobar el mensaje real, sus opciones y la retirada del consentimiento.

El pie de página incorpora la reapertura del mensaje mediante la API oficial `googlefc`, visible solo cuando la API está disponible. La prueba de integración usa una cola simulada y no afirma obtener consentimiento real de Google.

AdSense muestra `ads.txt` como no encontrado, pero las comprobaciones públicas de HTTP/HTTPS y dominio raíz/www terminan en HTTP 200 y el publisher correcto. Las redirecciones al subdominio www son compatibles con las instrucciones de Google. No se altera un archivo correcto para intentar forzar la actualización. Google documenta que la actualización puede tardar días, e incluso un mes con pocas solicitudes.

## Referencias

- [Requisitos y contenido de AdSense](https://support.google.com/adsense/answer/10015918?hl=es).
- [Rastreo de ads.txt](https://support.google.com/adsense/answer/7679060?hl=en).
- [Prueba de mensajes publicados](https://support.google.com/adsense/answer/10924669).
- [API de privacidad y reapertura del consentimiento](https://developers.google.com/funding-choices/fc-api-docs).

## Validación del código

La copia aislada de entrega excluye los cambios locales de mapas y sus pruebas, ajenos a esta tarea. Lint sin incidencias y 693 pruebas unitarias aprobadas. Seis pruebas adicionales de navegador comprueban las mismas ubicaciones y slots en OW y Deadlock, escritorio y móvil, y ausencia de anuncios en sus índices. Todas las solicitudes a Google están interceptadas en estas pruebas: no generan impresiones reales.

El estado del despliegue y de la solicitud de revisión debe comprobarse al finalizar. La aprobación corresponde exclusivamente a Google; este documento no la certifica.

## Cierre técnico del 27 de octubre

Se completó la validación en la copia aislada con el último cambio de YouTube ya integrado: lint sin incidencias, 694 pruebas unitarias y compilación de producción. Se verificaron 66 recorridos de guías, builds, navegación, pie y páginas legales; 62 comprobaciones adicionales de profundidad editorial y fechas; seis casos de anuncios simulados; y dos casos específicos del modo de revisión. La búsqueda de Mina también encuentra el texto de Holliday: se corrigió la expectativa de la prueba para comprobar la tarjeta y el recorrido del héroe solicitado, sin restringir artificialmente el buscador.

El modo de revisión se comprobó con publisher válido y los indicadores de aprobación y CMP simulados como verdaderos: aun así no ejecuta anuncios, no crea slots ni reserva columnas vacías. Las primeras ejecuciones locales detectaron una configuración de prueba sin publisher, una ruta de prueba incorrecta y falta de variables de servidor en la compilación de slots; se corrigieron esas configuraciones y se repitieron las comprobaciones afectadas. Las pruebas de slots interceptan las conexiones a Google.

Las cuatro builds restantes de Infernus, Bruma, Lash y Siete repetían la misma FAQ. El 27 de octubre se retiró únicamente esa respuesta genérica, conservando el contenido específico, las tablas, las fuentes y las fechas de publicación originales. Se prepararon revisiones mediante el CLI editorial, se verificaron las vistas previas en escritorio y móvil, los enlaces y los códigos reales de build (404 confirmado para el antiguo de Bruma); después se publicaron y comprobaron sus versiones públicas. No se crearon rutas ni se alteró la indexación. Se reflejaron como respaldo las seis builds publicadas actuales, incluidas las mejoras anteriores de Abrams y Dynamo. Esta intervención manual no avanza el cursor de investigación diaria.

El panel de AdSense seguía mostrando el rechazo del 17 de octubre por contenido de poco valor y no una revisión pendiente. La etiqueta meta pública coincide con la cuenta. Las cuatro variantes HTTP/HTTPS y raíz/www de ads.txt terminan en HTTP 200 con el vendedor correcto; robots.txt permite su rastreo. No se modificó el archivo correcto para forzar su actualización. La solicitud debe enviarse después del despliegue y de la comprobación pública final; la aprobación y el rastreo posterior corresponden a Google.
