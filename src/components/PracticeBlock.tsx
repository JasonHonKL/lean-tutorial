import { useState } from 'react'
import { Section } from '../data/chapters'
import { PracticeProblem } from './PracticeProblem'

interface PracticeBlockProps {
  section: Section
}

export function PracticeBlock({ section }: PracticeBlockProps) {
  const [activeTab, setActiveTab] = useState(0)
  const problems = section.problems!

  return (
    <div className="practice-block">
      <div className="practice-tabs">
        {problems.map((problem, index) => (
          <button
            key={problem.id}
            className={`practice-tab ${index === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {problem.title}
          </button>
        ))}
      </div>
      {problems.map((problem, index) =>
        index === activeTab ? (
          <PracticeProblem key={problem.id} problem={problem} />
        ) : null
      )}
    </div>
  )
}
