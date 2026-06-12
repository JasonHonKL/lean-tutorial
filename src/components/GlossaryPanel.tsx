import { useState } from 'react'
import { glossaryData } from '../data/glossary'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'

export function GlossaryPanel() {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const filteredEntries = glossaryData.filter(
    entry =>
      entry.term.toLowerCase().includes(search.toLowerCase()) ||
      entry.definition.toLowerCase().includes(search.toLowerCase())
  )

  const toggleExpand = (term: string) => {
    setExpanded(prev => ({ ...prev, [term]: !prev[term] }))
  }

  return (
    <div className="glossary-panel">
      <div className="glossary-search">
        <Search size={14} />
        <input
          type="text"
          placeholder="Search tactics..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="glossary-list">
        {filteredEntries.map(entry => (
          <div key={entry.term} className="glossary-entry">
            <button
              className="glossary-term"
              onClick={() => toggleExpand(entry.term)}
            >
              {expanded[entry.term] ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
              <code>{entry.term}</code>
            </button>
            {expanded[entry.term] && (
              <div className="glossary-body">
                <p className="glossary-def">{entry.definition}</p>
                {entry.example && (
                  <div className="glossary-example">
                    <div className="glossary-example-label">Example</div>
                    <pre className="glossary-pre">
                      <code>{entry.example}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
