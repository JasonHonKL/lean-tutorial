import { ContentBlock as ContentBlockType } from '../data/chapters'
import { CodeBlock } from './CodeBlock'

interface ContentBlockProps {
  block: ContentBlockType
}

export function ContentBlock({ block }: ContentBlockProps) {
  if (block.type === 'paragraph') {
    return <p className="content-paragraph">{block.text}</p>
  }

  if (block.type === 'theorem') {
    return (
      <div className="content-theorem">
        <div className="theorem-label">{block.name}</div>
        <CodeBlock code={block.code!} />
      </div>
    )
  }

  return null
}
