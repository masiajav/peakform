type GuideVideoProps = {
  videoId: string
  title: string
  channel?: string | null
  language?: string | null
  url?: string | null
}

export default function GuideVideo({ videoId, title, channel, language, url }: GuideVideoProps) {
  return (
    <section className="guide-video">
      <div className="guide-video-meta">
        <span>VIDEO GUIA</span>
        {channel && <span>{channel}</span>}
        {language && <span>{language.toUpperCase()}</span>}
      </div>
      <div className="guide-video-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer" className="guide-video-source">
          Ver en YouTube
        </a>
      )}
    </section>
  )
}
