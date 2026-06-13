import ReactMarkdown from 'react-markdown'
import { CodeBlock } from './CodeBlock'

interface MarkdownContentProps {
  markdown: string
}

export function MarkdownContent({ markdown }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          if (match?.[1] === 'lean') {
            const raw = String(children).replace(/\n$/, '')
            const lines = raw.split('\n')
            const firstLine = lines[0]?.trim() ?? ''
            const hasLabel = firstLine.startsWith('--')
            const label = hasLabel ? firstLine.replace(/^--\s*/, '').trim() : null
            const code = hasLabel ? lines.slice(1).join('\n').trim() : raw
            return (
              <div className="content-theorem">
                {label && <div className="theorem-label">{label}</div>}
                <CodeBlock code={code} />
              </div>
            )
          }
          return (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}
    >
      {markdown.trim()}
    </ReactMarkdown>
  )
}
