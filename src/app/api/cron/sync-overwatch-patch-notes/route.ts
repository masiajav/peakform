import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  BLIZZARD_PATCH_NOTES_URL,
  BLIZZARD_PATCH_SOURCE_NAME,
  parseBlizzardPatchNotes,
} from '@/lib/overwatch-patch-notes'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const authError = authorizeCron(request)
  if (authError) return authError

  const response = await fetch(BLIZZARD_PATCH_NOTES_URL, {
    cache: 'no-store',
    headers: {
      'user-agent': 'ReplaidLabBot/1.0 (+https://www.replaidlab.com)',
      accept: 'text/html',
    },
  })

  if (!response.ok) {
    return NextResponse.json({ error: `Blizzard responded ${response.status}` }, { status: 502 })
  }

  const html = await response.text()
  const notes = parseBlizzardPatchNotes(html, 5)
  if (notes.length === 0) {
    return NextResponse.json({ error: 'No patch notes detected' }, { status: 502 })
  }

  const admin = createAdminClient()
  const created: string[] = []
  const skipped: string[] = []
  const errors: { sourceId: string; error: string }[] = []

  for (const note of notes) {
    const { data: existing, error: lookupError } = await admin
      .from('announcements')
      .select('id')
      .eq('source_name', BLIZZARD_PATCH_SOURCE_NAME)
      .eq('source_id', note.sourceId)
      .maybeSingle()

    if (lookupError) {
      errors.push({ sourceId: note.sourceId, error: lookupError.message })
      continue
    }

    if (existing) {
      skipped.push(note.sourceId)
      continue
    }

    const { error: insertError } = await admin
      .from('announcements')
      .insert({
        title: note.title,
        slug: note.slug,
        body: note.body,
        published: true,
        excerpt: note.excerpt,
        seo_title: note.title,
        seo_description: note.excerpt,
        author: 'Replaid Lab / Blizzard',
        tags: ['overwatch', 'patch-notes', 'blizzard', 'auto-import'],
        content_type: 'patch_note',
        source_name: BLIZZARD_PATCH_SOURCE_NAME,
        source_url: note.sourceUrl,
        source_id: note.sourceId,
        source_published_at: note.sourcePublishedAt,
        auto_imported: true,
        created_at: note.sourcePublishedAt,
        updated_at: note.sourcePublishedAt,
      })

    if (insertError) {
      errors.push({ sourceId: note.sourceId, error: insertError.message })
      continue
    }

    created.push(note.sourceId)
  }

  return NextResponse.json({
    ok: errors.length === 0,
    found: notes.length,
    created,
    skipped,
    errors,
  }, { status: errors.length === notes.length ? 500 : 200 })
}

function authorizeCron(request: Request) {
  const secret = process.env.CRON_SECRET

  if (!secret && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'CRON_SECRET is required in production' }, { status: 500 })
  }

  if (!secret) return null

  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return null
}
