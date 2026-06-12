import { createContext, useContext, useState, ReactNode } from 'react'

interface QuizAnswer {
  chapterId: string
  chapterTitle: string
  sectionId: string
  sectionTitle: string
  questionIndex: number
  prompt: string
  selectedAnswer: string
  isCorrect: boolean
  timestamp: string
}

interface QuizContextType {
  answers: QuizAnswer[]
  addAnswer: (answer: Omit<QuizAnswer, 'timestamp'>) => void
  clearAnswers: () => void
  exportAnswers: () => string
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<QuizAnswer[]>([])

  const addAnswer = (answer: Omit<QuizAnswer, 'timestamp'>) => {
    const newAnswer: QuizAnswer = {
      ...answer,
      timestamp: new Date().toISOString()
    }
    setAnswers(prev => {
      // Check if this question already has an answer
      const existingIndex = prev.findIndex(
        a => a.sectionId === answer.sectionId && a.questionIndex === answer.questionIndex
      )
      if (existingIndex !== -1) {
        // Replace existing answer
        const newAnswers = [...prev]
        newAnswers[existingIndex] = newAnswer
        return newAnswers
      }
      // Add new answer
      return [...prev, newAnswer]
    })
  }

  const clearAnswers = () => {
    setAnswers([])
  }

  const exportAnswers = () => {
    if (answers.length === 0) {
      return 'No quiz answers recorded yet.'
    }

    let output = '=== LeanProof Tutorial - Quiz Answers ===\n'
    output += `Generated: ${new Date().toISOString()}\n`
    output += `Total Questions Answered: ${answers.length}\n\n`

    // Group by chapter
    const grouped = answers.reduce((acc, answer) => {
      const key = `${answer.chapterId} - ${answer.chapterTitle}`
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(answer)
      return acc
    }, {} as Record<string, QuizAnswer[]>)

    for (const [chapter, chapterAnswers] of Object.entries(grouped)) {
      output += `\n${'='.repeat(60)}\n`
      output += `${chapter}\n`
      output += `${'='.repeat(60)}\n`

      // Group by section within chapter
      const sectionGroups = chapterAnswers.reduce((acc, answer) => {
        const key = answer.sectionTitle
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(answer)
        return acc
      }, {} as Record<string, QuizAnswer[]>)

      for (const [sectionTitle, sectionAnswers] of Object.entries(sectionGroups)) {
        output += `\n--- Section: ${sectionTitle} ---\n\n`
        for (const answer of sectionAnswers) {
          output += `Q${answer.questionIndex + 1}: ${answer.prompt}\n`
          output += `Answer: ${answer.selectedAnswer}\n`
          output += `Result: ${answer.isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}\n`
          output += `Time: ${answer.timestamp}\n\n`
        }
      }
    }

    output += `\n${'='.repeat(60)}\n`
    output += 'END OF REPORT\n'

    return output
  }

  return (
    <QuizContext.Provider value={{ answers, addAnswer, clearAnswers, exportAnswers }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider')
  }
  return context
}
