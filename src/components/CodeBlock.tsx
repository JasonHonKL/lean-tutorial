import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  title?: string
}

export function CodeBlock({ code, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block">
      {title && (
        <div className="code-block-header">
          <span className="code-block-lang">Lean 4</span>
          <span className="code-block-title">{title}</span>
          <button
            className="code-copy-btn"
            onClick={handleCopy}
            aria-label="Copy code"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      <pre className="code-pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}
