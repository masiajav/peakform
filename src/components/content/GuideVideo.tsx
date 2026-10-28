type GuideVideoProps = {
  videoId: string
  title: string
  channel?: string | null
  language?: string | null
  url?: string | null
  externalOnly?: boolean
}

export default function GuideVideo({ videoId, title, channel, language, url, externalOnly = false }: GuideVideoProps) {
  return (
    <section className="guide-video">
      <div className="guide-video-meta">
        <span>VÍDEO</span>
        {channel && <span>{channel}</span>}
        {language && <span>{language.toUpperCase()}</span>}
      </div>
      {externalOnly ? (
        <p style={{ lineHeight: 1.7 }}>
          <a href={url || `https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="guide-video-source">
            Ver en YouTube: {title}
          </a>
        </p>
      ) : (
        <div className="guide-video-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )}
      {url && !externalOnly && (
        <a href={url} target="_blank" rel="noopener noreferrer" className="guide-video-source">
          Ver en YouTube
        </a>
      )}
    </section>
  )
}
