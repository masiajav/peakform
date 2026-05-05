import ReactMarkdown from 'react-markdown'

export default function GuideMarkdown({ children }: { children: string }) {
  return (
    <div className="guide-body">
      <ReactMarkdown
        components={{
          blockquote({ children }) {
            return <blockquote className="guide-callout">{children}</blockquote>
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
