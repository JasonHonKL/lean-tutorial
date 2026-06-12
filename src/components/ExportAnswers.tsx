import { Download } from 'lucide-react'
import { useQuiz } from './QuizContext'

export function ExportAnswers() {
  const { answers, exportAnswers } = useQuiz()

  const handleExport = () => {
    const content = exportAnswers()
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `leanproof-answers-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="export-section">
      <div className="export-card">
        <h3>Export Your Quiz Answers</h3>
        <p className="export-description">
          You have answered <strong>{answers.length}</strong> question{answers.length !== 1 ? 's' : ''} across all chapters.
          Export your answers to submit for review.
        </p>
        <button
          className="btn btn-primary export-btn"
          onClick={handleExport}
          disabled={answers.length === 0}
        >
          <Download size={16} />
          Export Answers
        </button>
        {answers.length === 0 && (
          <p className="export-hint">Complete some quiz questions to enable export</p>
        )}
      </div>
    </div>
  )
}
