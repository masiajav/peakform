# Estrategia de repositorio

Replaid se mantiene en este repositorio como monorepo ligero. La web principal, Pick Lab y el companion de Overwolf comparten marca, datos de producto y motor de recomendacion, asi que separarlos ahora duplicaria contexto antes de validar traccion.

## Organizacion actual

- La web principal vive en la raiz del repo con Next.js, Supabase, Stripe, Resend y el flujo de pedidos/reviews.
- La primera apuesta de producto es Pick Lab: recomendaciones de heroes por mapa, aliados y rivales visibles.
- El flujo existente de compra, envio de replay y revision de expertos permanece en la web; el analisis post-game automatizado queda aplazado.
- Las apps con runtime propio viven en `apps/*`. Hoy existe `apps/replaid-coach-overlay`.
- El overlay se empaqueta desde la raiz con `npm run overlay:build`.
- No se usan npm workspaces por ahora. El overlay no necesita dependencias complejas ni compartir paquetes versionados.

## Direccion de producto

El companion de Overwolf no debe convertirse en un coach completo en directo como primera apuesta. Su rol es mostrar durante la seleccion de heroe las mismas recomendaciones explicables que se pueden probar en la web.

El primer puente entre Overwolf y la web es el motor compartido de Pick Lab. La web permite validar escenarios manualmente y el companion puede completar mapa, rol y roster cuando Game Events Provider los exponga. Un timeline post-game solo se incorporara si la validacion del producto justifica esa segunda fase.

## Cuando separar repos

Crear otro repo solo si aparece una razon fuerte:

- Overwolf exige pipeline, firma, publicacion o tooling que ensucia el desarrollo web.
- El overlay se distribuye como producto autonomo con marca o roadmap propio.
- Hay equipos, permisos o responsabilidades separadas.
- Los ciclos de release de la web y del companion se vuelven incompatibles.

Hasta que ocurra algo de eso, nuevas piezas auxiliares deben entrar en `apps/*` solo si tienen runtime propio.

## Validacion esperada

- `npm run build` debe validar la web sin depender del overlay.
- `npm run overlay:build` debe generar `apps/replaid-coach-overlay/dist/manifest.json`.
- El `dist` de Overwolf debe seguir siendo cargable en el cliente de Overwolf.
- Cambios del overlay no deben romper compra, envio de replay ni entrega/lectura de reviews.
