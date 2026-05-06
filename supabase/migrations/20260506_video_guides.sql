-- Video-first guide support.

alter table guides
  add column if not exists video_url text,
  add column if not exists video_platform text,
  add column if not exists video_id text,
  add column if not exists video_title text,
  add column if not exists video_channel text,
  add column if not exists video_language text,
  add column if not exists video_published_at date,
  add column if not exists video_summary text;

create index if not exists guides_video_idx on guides(published, video_platform, video_language)
where video_id is not null;

update guides
set
  title = 'Ana: guia en video de Ivajpro para impactar mas',
  category = 'Video guia',
  excerpt = 'Guia en video de Ana por Ivajpro con un resumen rapido para entender posicionamiento, cooldowns y ventanas de Nano.',
  seo_title = 'Guia de Ana en Overwatch 2 en video - Ivajpro',
  seo_description = 'Aprende Ana en Overwatch 2 con una guia en video de Ivajpro y un resumen rapido sobre posicionamiento, cooldowns y Nano.',
  author = 'Ivajpro',
  video_url = 'https://www.youtube.com/watch?v=esfNxqdpGuE',
  video_platform = 'youtube',
  video_id = 'esfNxqdpGuE',
  video_title = 'COMPLETE GUIDE TO ANA OVERWATCH: THE MOST VERSATILE SUPPORT | Ivajpro',
  video_channel = 'Ivajpro',
  video_language = 'es',
  video_published_at = '2022-10-28',
  video_summary = 'Esta guia sirve como punto de entrada para Ana: explica que aporta el heroe, cuando elegirlo, como posicionarte para sobrevivir y como sacar valor de sleep, granada y Nano sin depender solo de jugadas mecanicas.',
  body = $md$
## Qué vas a sacar del video

- Cuándo Ana aporta más que otros supports y cuándo se vuelve vulnerable.
- Cómo pensar tu posición antes de cada pelea para curar, presionar y no regalarte a una dive.
- Qué valor buscar con sleep y granada: cortar una entrada, negar curación o convertir una ventana pequeña en pelea ganada.
- Cómo usar Nano como herramienta de tempo, no solo como combo espectacular.

## Para quién merece la pena

Si estás empezando con Ana o notas que haces mucha sanación pero mueres demasiado, este formato es más útil que una guía escrita larga: puedes ver ejemplos de distancia, líneas de visión y ritmo de cooldowns.

> **6V6**
> En 6v6 Ana suele encontrar más objetivos para granadas grupales y más valor en sleeps defensivos, pero también hay más barreras, peel y daño cruzado. La prioridad es jugar más paciente y no gastar sleep solo porque ves un tank cerca.
$md$,
  tags = array['ana','support','video','ivajpro','youtube','6v6'],
  updated_at = now()
where slug = 'ana-primeros-habitos-impactar-mas';
