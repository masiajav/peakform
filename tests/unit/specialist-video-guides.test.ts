import { describe, expect, it } from 'vitest'
import type { GuideContent } from '@/lib/content'
import { applyReviewedGuideRevision, mergeReviewedGuideVideo, reviewedGuideVideoSource } from '@/lib/reviewed-guide-revisions'
import { guideQualityDecision } from '@/lib/indexing-policy'

for (const [hero,slug,source,id,updatedAt] of [
  ['tracer','tracer-presion-lateral-sin-morir-gratis','tracer-guia-video-overwatch','SRGJ7xZoZZ0','2026-10-20'],
  ['zarya','zarya-guia-overwatch-burbujas-energia','zarya-guia-video-overwatch','ssWnCfolWa0','2026-10-31'],
]) {
  describe(`${hero} existing guide and original video`, () => {
    const row: GuideContent = { id:'published-record',slug,title:'Resumen antiguo',body:'Texto anterior',hero,category:'Héroes',published:true,created_at:'2026-05-05' }
    const video = { ...row,slug:source,video_id:id,video_channel:'Original channel',video_published_at:'2025-01-01' }
    it('keeps source identity, original video attribution and date while replacing the repeated stub', () => {
      expect(reviewedGuideVideoSource(slug)).toBe(source)
      const revised = applyReviewedGuideRevision(mergeReviewedGuideVideo(row,video))
      expect(revised).toMatchObject({id:row.id,slug,created_at:row.created_at,updated_at:updatedAt,video_id:id,video_channel:video.video_channel,author:'Replaid Lab'})
      expect(revised.body).not.toContain('Plan de juego: qué pelea busca')
      expect(revised.body).toContain('## FAQ')
      expect(guideQualityDecision(revised)).toMatchObject({indexable:false,adsAllowed:false})
      expect(row.body).toBe('Texto anterior')
    })
  })
}

it('labels the Winston satire instead of attributing ranked advice to its author', () => {
  const row = {slug:'winston-guia-video-overwatch'}
  const revised = applyReviewedGuideRevision(row)
  expect(revised).toMatchObject({slug:row.slug,author:'Replaid Lab'})
  expect((revised as typeof revised & {body:string}).body).toContain('No. Es una parodia')
})
