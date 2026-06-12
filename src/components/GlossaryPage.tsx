import { GlossaryPanel } from './GlossaryPanel'

export function GlossaryPage() {
  return (
    <div className="chapter-page">
      <div className="chapter-header">
        <div className="chapter-number">Reference</div>
        <h1>Tactic Glossary</h1>
      </div>
      <div className="chapter-content">
        <GlossaryPanel />
      </div>
    </div>
  )
}
