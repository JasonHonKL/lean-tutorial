import { useState } from 'react'
import { PracticeProblem as PracticeProblemType } from '../data/chapters'
import { CodeBlock } from './CodeBlock'
import { ChevronDown, CheckCircle2, XCircle, RotateCcw } from 'lucide-react'

interface PracticeProblemProps {
  problem: PracticeProblemType
}

export function PracticeProblem({ problem }: PracticeProblemProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selected, setSelected] = useState<Record<number, number>>({})
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})
  const [showSolution, setShowSolution] = useState(false)

  const totalSteps = problem.steps.length
  const allRevealed = Object.keys(revealed).length === totalSteps

  const handleSelect = (stepIndex: number, optionIndex: number) => {
    if (!revealed[stepIndex]) {
      setSelected(prev => ({ ...prev, [stepIndex]: optionIndex }))
    }
  }

  const handleCheckContinue = (stepIndex: number) => {
    setRevealed(prev => ({ ...prev, [stepIndex]: true }))
    if (stepIndex < totalSteps - 1) {
      setCurrentStep(stepIndex + 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setSelected({})
    setRevealed({})
    setShowSolution(false)
  }

  return (
    <div className="practice-problem">
      <p className="practice-desc">{problem.description}</p>
      <div className="practice-start-code">
        <CodeBlock code={problem.code} />
      </div>

      {problem.steps.map((step, sIndex) => {
        const isRevealedNow = revealed[sIndex]
        const choice = selected[sIndex]
        const isCorrect = isRevealedNow && step.options[choice!].correct
        const isWrong = isRevealedNow && !isCorrect

        const isVisible = sIndex <= currentStep || allRevealed

        return (
          <div
            key={sIndex}
            className={`practice-step ${isVisible ? 'visible' : 'locked'}`}
          >
            <div className="practice-step-header">
              <span className="step-badge">Line {sIndex + 1}</span>
              <span className="step-prompt">{step.prompt}</span>
            </div>

            {isVisible && (
              <div className="step-options">
                {step.options.map((option, oIndex) => {
                  let className = 'step-opt'
                  if (choice === oIndex && !isRevealedNow) className += ' selected'
                  if (isRevealedNow && option.correct) className += ' correct'
                  if (isRevealedNow && choice === oIndex && !option.correct) className += ' wrong'

                  return (
                    <button
                      key={oIndex}
                      className={className}
                      onClick={() => handleSelect(sIndex, oIndex)}
                      disabled={isRevealedNow}
                    >
                      <span className="step-letter">
                        {String.fromCharCode(65 + oIndex)}
                      </span>
                      <code className="step-code">{option.text}</code>
                      {isRevealedNow && option.correct && (
                        <CheckCircle2 size={14} className="opt-icon icon-ok" />
                      )}
                      {isRevealedNow && choice === oIndex && !option.correct && (
                        <XCircle size={14} className="opt-icon icon-no" />
                      )}
                    </button>
                  )
                })}
                {!isRevealedNow && choice !== undefined && (
                  <button
                    className="step-check-btn"
                    onClick={() => handleCheckContinue(sIndex)}
                  >
                    Check & Continue
                    <ChevronDown size={14} />
                  </button>
                )}
                {isRevealedNow && (
                  <div className={`step-feedback ${isCorrect ? 'ok' : 'no'}`}>
                    {step.options[choice!].text}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}

      {allRevealed && (
        <div className="practice-complete">
          <button
            className="btn btn-ghost"
            onClick={() => setShowSolution(!showSolution)}
          >
            <ChevronDown size={14} />
            {showSolution ? 'Hide' : 'Show'} Full Solution
          </button>
          {showSolution && (
            <div className="practice-solution">
              <CodeBlock code={problem.fullCode} />
            </div>
          )}
          <button className="btn btn-ghost" onClick={handleReset}>
            <RotateCcw size={14} />
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
