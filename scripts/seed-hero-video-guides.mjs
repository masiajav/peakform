import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const envText = await readFile(".env.local", "utf8");
const env = Object.fromEntries(
  envText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const index = line.indexOf("=");
      return [line.slice(0, index), line.slice(index + 1)];
    }),
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
}

const migrationSql = await readFile("supabase/migrations/20260506_seed_all_hero_video_guides.sql", "utf8");
const valuesBlock = migrationSql.match(/values\s+([\s\S]*?)\)\s*insert into guides/i)?.[1];

if (!valuesBlock) {
  throw new Error("Could not find hero_video_seed values in migration.");
}

function splitTuples(input) {
  const tuples = [];
  let inString = false;
  let depth = 0;
  let start = -1;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const next = input[i + 1];

    if (char === "'" && inString && next === "'") {
      i += 1;
      continue;
    }

    if (char === "'") {
      inString = !inString;
      continue;
    }

    if (inString) {
      continue;
    }

    if (char === "(") {
      if (depth === 0) {
        start = i + 1;
      }
      depth += 1;
    }

    if (char === ")") {
      depth -= 1;
      if (depth === 0 && start !== -1) {
        tuples.push(input.slice(start, i));
      }
    }
  }

  return tuples;
}

function splitFields(tuple) {
  const fields = [];
  let inString = false;
  let start = 0;

  for (let i = 0; i < tuple.length; i += 1) {
    const char = tuple[i];
    const next = tuple[i + 1];

    if (char === "'" && inString && next === "'") {
      i += 1;
      continue;
    }

    if (char === "'") {
      inString = !inString;
      continue;
    }

    if (!inString && char === ",") {
      fields.push(tuple.slice(start, i).trim());
      start = i + 1;
    }
  }

  fields.push(tuple.slice(start).trim());
  return fields;
}

function readSqlValue(field) {
  if (/^null$/i.test(field)) {
    return null;
  }

  const dateMatch = field.match(/^'([\d-]+)'::date$/);
  if (dateMatch) {
    return dateMatch[1];
  }

  const stringMatch = field.match(/^'([\s\S]*)'$/);
  if (!stringMatch) {
    throw new Error(`Unsupported SQL value: ${field}`);
  }

  return stringMatch[1].replaceAll("''", "'");
}

const tuples = splitTuples(valuesBlock);
const rows = tuples.map((tuple) => {
  const [
    hero_slug,
    hero_name,
    role,
    guide_slug,
    video_id,
    video_title,
    video_channel,
    video_language,
    video_published_at,
    video_summary,
  ] = splitFields(tuple).map(readSqlValue);

  const body = [
    `## Qué aprender de ${hero_name}`,
    "",
    "- Plan de juego: qué pelea busca, desde qué rango aporta más y qué errores castiga.",
    "- Prioridades: posicionamiento, cooldowns clave, objetivo principal y cuándo retirarte.",
    "- Revisión de VOD: muertes tempranas, recursos gastados sin ventana y peleas donde no convertiste ventaja.",
    "",
    "## Cómo usar esta guía",
    "",
    "Mira primero el vídeo y vuelve a esta página para quedarte con tres ideas accionables. Después, revisa una partida tuya buscando un patrón concreto: una muerte repetida, una mala ventana de cooldown o una pelea donde llegaste tarde.",
    "",
    "> **6V6**",
    `> En 6v6 hay más recursos, más peel y más cuerpos ocupando espacio. Con ${hero_name}, comprueba si tus ventanas siguen funcionando cuando el rival tiene un segundo tank o más herramientas defensivas.`,
  ].join("\n");

  return {
    title: `Guía de ${hero_name} en Overwatch: cómo jugar, counters y consejos`,
    slug: guide_slug,
    body,
    category: "Video guía",
    published: true,
    excerpt: video_summary,
    seo_title: `Guía de ${hero_name} en Overwatch: consejos, counters y vídeo`,
    seo_description: `Aprende a jugar ${hero_name} en Overwatch con una guía en vídeo, resumen práctico, prioridades, counters y nota para 6v6.`,
    author: video_channel ?? "Replaid Lab",
    hero: hero_slug,
    role,
    map: null,
    tags: [hero_slug, role, "video", "youtube", "6v6", "overwatch"],
    content_type: "guide",
    video_url: `https://www.youtube.com/watch?v=${video_id}`,
    video_platform: "youtube",
    video_id,
    video_title,
    video_channel,
    video_language,
    video_published_at,
    video_summary,
    updated_at: new Date().toISOString(),
  };
});

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

const { error } = await supabase.from("guides").upsert(rows, {
  onConflict: "slug",
});

if (error) {
  throw error;
}

console.log(`Seeded ${rows.length} hero video guides.`);
