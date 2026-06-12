import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Section } from '../data/chapters'
import { ChevronDown, CheckCircle2, XCircle } from 'lucide-react'
import { useQuiz } from './QuizContext'
import { chaptersData } from '../data/chapters'

interface ExerciseBlockProps {
  section: Section
}

export function ExerciseBlock({ section }: ExerciseBlockProps) {
  const [selected, setSelected] = useState<Record<number, number>>({})
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})
  const { addAnswer } = useQuiz()
  const { chapterId } = useParams<{ chapterId: string }>()

  const chapter = chaptersData.find(ch => ch.id === chapterId)

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (!revealed[questionIndex]) {
      setSelected(prev => ({ ...prev, [questionIndex]: optionIndex }))
    }
  }

  const handleReveal = (questionIndex: number) => {
    setRevealed(prev => ({ ...prev, [questionIndex]: true }))
  }

  const isCorrect = (questionIndex: number) => {
    const choice = selected[questionIndex]
    return choice !== undefined && section.questions![questionIndex].options[choice].correct
  }

  // Save answer when revealed
  useEffect(() => {
    if (chapter) {
      Object.keys(revealed).forEach(qIndexStr => {
        const qIndex = parseInt(qIndexStr)
        if (revealed[qIndex] && selected[qIndex] !== undefined) {
          const question = section.questions![qIndex]
          const selectedOption = question.options[selected[qIndex]]

          addAnswer({
            chapterId: chapter.id,
            chapterTitle: chapter.title,
            sectionId: section.id,
            sectionTitle: section.title,
            questionIndex: qIndex,
            prompt: question.prompt,
            selectedAnswer: selectedOption.text,
            isCorrect: selectedOption.correct
          })
        }
      })
    }
  }, [revealed, selected, section, chapter, addAnswer])

  return (
    <div className="exercise-block">
      {section.questions!.map((question, qIndex) => (
        <div key={qIndex} className="exercise-question">
          <p className="question-prompt">
            <span className="question-num">Q{qIndex + 1}</span>
            {question.prompt}
          </p>
          <div className="question-options">
            {question.options.map((option, oIndex) => {
              const isSelected = selected[qIndex] === oIndex
              const isRevealedNow = revealed[qIndex]
              const isCorrectOpt = option.correct
              const isWrong = isSelected && !isCorrectOpt && isRevealedNow

              let className = 'question-opt'
              if (isSelected && !isRevealedNow) className += ' selected'
              if (isRevealedNow && isCorrectOpt) className += ' correct'
              if (isWrong) className += ' wrong'

              return (
                <button
                  key={oIndex}
                  className={className}
                  onClick={() => handleSelect(qIndex, oIndex)}
                  disabled={isRevealedNow}
                >
                  <span className="opt-letter">
                    {String.fromCharCode(65 + oIndex)}
                  </span>
                  <span className="opt-text">{option.text}</span>
                  {isRevealedNow && isCorrectOpt && (
                    <CheckCircle2 size={16} className="opt-icon icon-ok" />
                  )}
                  {isWrong && (
                    <XCircle size={16} className="opt-icon icon-no" />
                  )}
                </button>
              )
            })}
          </div>
          {!revealed[qIndex] && selected[qIndex] !== undefined && (
            <button
              className="reveal-btn"
              onClick={() => handleReveal(qIndex)}
            >
              <ChevronDown size={14} />
              Check Answer
            </button>
          )}
          {revealed[qIndex] && (
            <div className={`explanation ${isCorrect(qIndex) ? 'ok' : 'no'}`}>
              {question.explanation}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
