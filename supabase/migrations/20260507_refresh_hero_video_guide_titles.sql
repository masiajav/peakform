update guides
set
  title = case
    when hero = 'ana' then 'Ana en Overwatch: granadas, Nano y posicionamiento'
    when hero = 'genji' then 'Genji en Overwatch: dives, resets y Dragonblade'
    when hero = 'tracer' then 'Tracer en Overwatch: flancos, Pulse Bomb y duelos'
    when hero = 'kiriko' then 'Kiriko en Overwatch: Suzu, Kunai y Kitsune Rush'
    when hero = 'dva' then 'D.Va en Overwatch: Matrix, peel y control de high ground'
    when hero = 'reinhardt' then 'Reinhardt en Overwatch: engages, escudo y Fire Strike'
    when hero = 'widowmaker' then 'Widowmaker en Overwatch: lineas, rotaciones y picks'
    when hero = 'mercy' then 'Mercy en Overwatch: pocket, resurrect y supervivencia'
    when role = 'tank' then initcap(replace(hero, '-', ' ')) || ' en Overwatch: espacio, recursos y matchups'
    when role = 'support' then initcap(replace(hero, '-', ' ')) || ' en Overwatch: utilidad, posicionamiento y peel'
    else initcap(replace(hero, '-', ' ')) || ' en Overwatch: duelos, presion y counters'
  end,
  seo_title = case
    when role = 'tank' then 'Como jugar ' || initcap(replace(hero, '-', ' ')) || ' en Overwatch: counters, espacio y consejos'
    when role = 'support' then 'Como jugar ' || initcap(replace(hero, '-', ' ')) || ' en Overwatch: posicionamiento, cooldowns y counters'
    else 'Como jugar ' || initcap(replace(hero, '-', ' ')) || ' en Overwatch: guia, counters y mecanicas'
  end,
  updated_at = now()
where hero is not null
  and slug like '%-guia-video-overwatch';
