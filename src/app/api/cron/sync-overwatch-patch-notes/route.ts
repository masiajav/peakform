import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  BLIZZARD_PATCH_NOTES_URL,
  BLIZZARD_PATCH_SOURCE_NAME,
  extractBlizzardPatchArchiveUrls,
  parseBlizzardPatchNotes,
  type BlizzardPatchNote,
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
  const pagesScanned = [BLIZZARD_PATCH_NOTES_URL]
  let notes = parseBlizzardPatchNotes(html, 5, BLIZZARD_PATCH_NOTES_URL)

  if (notes.length < 5) {
    for (const archiveUrl of extractBlizzardPatchArchiveUrls(html)) {
      const archiveResponse = await fetch(archiveUrl, {
        cache: 'no-store',
        headers: {
          'user-agent': 'ReplaidLabBot/1.0 (+https://www.replaidlab.com)',
          accept: 'text/html',
        },
      })

      if (!archiveResponse.ok) continue
      pagesScanned.push(archiveUrl)
      const archiveNotes = parseBlizzardPatchNotes(await archiveResponse.text(), 5, archiveUrl)
      notes = mergeLatestPatchNotes(notes, archiveNotes, 5)
      if (notes.length >= 5) break
    }
  }

  if (notes.length === 0) {
    return NextResponse.json({ error: 'No patch notes detected', pagesScanned }, { status: 502 })
  }

  const dryRun = new URL(request.url).searchParams.get('dryRun') === '1'
  if (dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      found: notes.length,
      pagesScanned,
      notes: notes.map(note => ({
        sourceId: note.sourceId,
        sourceUrl: note.sourceUrl,
        sourcePublishedAt: note.sourcePublishedAt,
        sections: note.sections,
      })),
    })
  }

  const admin = createAdminClient()
  const createdDrafts: string[] = []
  const skipped: string[] = []
  const errors: { sourceId: string; error: string }[] = []
  let sourceColumnsAvailable = true

  for (const note of notes) {
    let existing = null
    let lookupError = null

    if (sourceColumnsAvailable) {
      const lookup = await admin
        .from('announcements')
        .select('id')
        .eq('source_name', BLIZZARD_PATCH_SOURCE_NAME)
        .eq('source_id', note.sourceId)
        .maybeSingle()

      existing = lookup.data
      lookupError = lookup.error

      if (isMissingSourceColumn(lookupError?.message)) {
        sourceColumnsAvailable = false
        existing = null
        lookupError = null
      }
    }

    if (!sourceColumnsAvailable) {
      const fallbackLookup = await admin
        .from('announcements')
        .select('id')
        .eq('slug', note.slug)
        .maybeSingle()

      existing = fallbackLookup.data
      lookupError = fallbackLookup.error
    }

    if (lookupError) {
      errors.push({ sourceId: note.sourceId, error: lookupError.message })
      continue
    }

    if (existing) {
      skipped.push(note.sourceId)
      continue
    }

    const baseInsert = {
      title: note.title,
      slug: note.slug,
      body: note.body,
      published: false,
      excerpt: note.excerpt,
      seo_title: note.title,
      seo_description: note.excerpt,
      author: 'Replaid Lab / Blizzard',
      tags: ['overwatch', 'patch-notes', 'blizzard', 'auto-import', 'editorial-draft'],
      content_type: 'patch_note',
      created_at: note.sourcePublishedAt,
      updated_at: note.sourcePublishedAt,
    }
    const sourceInsert = sourceColumnsAvailable
      ? {
        source_name: BLIZZARD_PATCH_SOURCE_NAME,
        source_url: note.sourceUrl,
        source_id: note.sourceId,
        source_published_at: note.sourcePublishedAt,
        auto_imported: true,
        source_sections: note.sections,
      }
      : {}

    let { error: insertError } = await admin
      .from('announcements')
      .insert({ ...baseInsert, ...sourceInsert })

    if (isMissingSourceColumn(insertError?.message)) {
      sourceColumnsAvailable = false
      const fallbackInsert = await admin
        .from('announcements')
        .insert(baseInsert)

      insertError = fallbackInsert.error
    }

    if (insertError) {
      errors.push({ sourceId: note.sourceId, error: insertError.message })
      continue
    }

    createdDrafts.push(note.sourceId)
  }

  return NextResponse.json({
    ok: errors.length === 0,
    found: notes.length,
    createdDrafts,
    skipped,
    errors,
    pagesScanned,
  }, { status: errors.length === notes.length ? 500 : 200 })
}

function mergeLatestPatchNotes(current: BlizzardPatchNote[], incoming: BlizzardPatchNote[], limit: number) {
  return Array.from(new Map([...current, ...incoming].map(note => [note.sourceId, note])).values())
    .sort((a, b) => b.sourcePublishedAt.localeCompare(a.sourcePublishedAt))
    .slice(0, limit)
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

function isMissingSourceColumn(message?: string) {
  return Boolean(message && (
    message.includes('announcements.source_name does not exist') ||
    message.includes('source_name') && message.includes('does not exist') ||
    message.includes('source_published_at') && message.includes('does not exist') ||
    message.includes('source_sections') && message.includes('does not exist')
  ))
}
