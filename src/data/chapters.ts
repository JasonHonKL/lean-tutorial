export interface ContentBlock {
  type: 'paragraph' | 'theorem'
  text?: string
  name?: string
  code?: string
}

export interface QuestionOption {
  text: string
  correct: boolean
}

export interface Question {
  prompt: string
  options: QuestionOption[]
  explanation: string
}

export interface PracticeStep {
  prompt: string
  options: QuestionOption[]
}

export interface PracticeProblem {
  id: string
  title: string
  description: string
  code: string
  steps: PracticeStep[]
  fullCode: string
}

export interface Section {
  id: string
  title: string
  kind: 'explanation' | 'exercise' | 'practice'
  content?: ContentBlock[]
  intro?: ContentBlock[]
  questions?: Question[]
  problems?: PracticeProblem[]
}

export interface Chapter {
  id: string
  number: number
  title: string
  tacticTags: string[]
  sections: Section[]
}

export const chaptersData: Chapter[] = [
  {
    id: 'introduction',
    number: 0,
    title: 'Introduction to Lean 4',
    tacticTags: ['overview', 'setup', 'basics'],
    sections: [
      {
        id: 'what-is-lean',
        title: 'What is Lean 4?',
        kind: 'explanation',
        content: [
          {
            type: 'paragraph',
            text: 'Lean 4 is an open-source programming language and proof assistant that combines functional programming with formal verification. It allows you to write verified software and mathematical proofs that are mechanically checked for correctness.'
          },
          {
            type: 'paragraph',
            text: 'Unlike traditional programming languages, Lean 4 has a powerful type system that can express complex properties. If your code type-checks, it\'s guaranteed to satisfy those properties. This makes it invaluable for critical systems where correctness matters.'
          },
          {
            type: 'paragraph',
            text: 'Lean 4 represents a major evolution from Lean 3, with significant improvements in performance, metaprogramming capabilities, and language design. It\'s rapidly becoming the premier tool for formal verification and proof engineering.'
          }
        ]
      },
      {
        id: 'proofs-as-code',
        title: 'Proofs as Code',
        kind: 'explanation',
        content: [
          {
            type: 'paragraph',
            text: 'In Lean 4, proofs are written using tactics—commands that guide the proof assistant to construct a formal proof. Think of tactics as a programming language for proofs, where you build logical arguments step by step.'
          },
          {
            type: 'paragraph',
            text: 'The structure of a Lean proof follows the `by ...` block syntax. Inside, you use tactics to manipulate your proof state until the goal is achieved. This interactive approach makes theorem proving accessible and intuitive.'
          }
        ]
      },
      {
        id: 'first-proof',
        title: 'Your First Proof',
        kind: 'explanation',
        content: [
          {
            type: 'paragraph',
            text: 'Let\'s look at a simple example: proving that if a proposition P implies Q, and P implies Q implies R, then P implies R. This is a straightforward chain of logical implications.'
          },
          {
            type: 'theorem',
            name: 'Example',
            code: `example (p q r : Prop) (hpq : p → q) (hqr : q → r) : p → r := by
  intro hp
  apply hqr
  exact hpq hp`
          },
          {
            type: 'paragraph',
            text: 'This proof demonstrates three fundamental tactics: `intro` to introduce assumptions, `apply` to work backward from the goal, and `exact` to provide the exact term needed to close the goal.'
          }
        ]
      },
      {
        id: 'intro-quiz',
        title: 'Check Your Understanding',
        kind: 'exercise',
        intro: [
          {
            type: 'paragraph',
            text: 'Test your understanding of Lean 4 basics with these questions.'
          }
        ],
        questions: [
          {
            prompt: 'What is Lean 4 primarily used for?',
            options: [
              { text: 'Web development only', correct: false },
              { text: 'Functional programming and formal verification', correct: true },
              { text: 'Machine learning', correct: false },
              { text: 'Database management', correct: false }
            ],
            explanation: 'Lean 4 is designed for functional programming combined with formal verification, allowing you to write code that is mechanically proven correct.'
          },
          {
            prompt: 'What are tactics in Lean 4?',
            options: [
              { text: 'Commands for proving theorems', correct: true },
              { text: 'Variable declarations', correct: false },
              { text: 'Comments in the code', correct: false },
              { text: 'Import statements', correct: false }
            ],
            explanation: 'Tactics are commands that guide the proof assistant, allowing you to construct formal proofs step by step through interactive manipulation of the proof state.'
          },
          {
            prompt: 'What does the `by` keyword indicate in Lean?',
            options: [
              { text: 'Start of a tactic-based proof', correct: true },
              { text: 'End of a theorem', correct: false },
              { text: 'A variable definition', correct: false },
              { text: 'A type annotation', correct: false }
            ],
            explanation: 'The `by` keyword marks the beginning of a tactic-based proof, where subsequent tactics will be used to construct the formal proof.'
          }
        ]
      }
    ]
  },
  {
    id: 'direct-proof',
    number: 1,
    title: 'Direct Proof',
    tacticTags: ['apply', 'exact', 'rfl'],
    sections: [
      {
        id: 'what-is-proof',
        title: 'What is a Proof?',
        kind: 'explanation',
        content: [
          {
            type: 'paragraph',
            text: 'A proof is a logical argument that demonstrates a statement is true. In Lean 4, we write proofs using tactics, which are commands that transform our proof state step by step until we reach the goal.'
          },
          {
            type: 'paragraph',
            text: 'The simplest form of proof is a direct proof: we start with given assumptions and apply logical rules to reach the desired conclusion.'
          }
        ]
      },
      {
        id: 'intro-and-exact',
        title: 'Intro and Exact',
        kind: 'explanation',
        content: [
          {
            type: 'paragraph',
            text: 'The `intro` tactic introduces a hypothesis from an implication in the goal. If your goal is `P → Q`, `intro` will add `P` to your context and change the goal to `Q`.'
          },
          {
            type: 'paragraph',
            text: 'The `exact` tactic closes a goal when you have exactly the right term or hypothesis available. It\'s the "final answer" of your proof.'
          }
        ]
      },
      {
        id: 'intro-exercise',
        title: 'Exercise: Using Intro',
        kind: 'exercise',
        intro: [
          {
            type: 'paragraph',
            text: 'Test your understanding of the `intro` tactic. What does it do when applied to an implication goal?'
          }
        ],
        questions: [
          {
            prompt: 'If the goal is `P → Q`, what does `intro h` do?',
            options: [
              { text: 'Adds `h : P` to the context and changes goal to `Q`', correct: true },
              { text: 'Adds `h : Q` to the context and changes goal to `P`', correct: false },
              { text: 'Changes the goal to `P → Q → h`', correct: false },
              { text: 'Nothing, intro is not a valid tactic', correct: false }
            ],
            explanation: 'The `intro` tactic takes the assumption from the left side of an implication (`P` in `P → Q`) and adds it to the context with the name you provide (here `h`). The goal becomes the right side (`Q`).'
          },
          {
            prompt: 'When should you use `exact`?',
            options: [
              { text: 'To introduce a new hypothesis', correct: false },
              { text: 'When you have exactly the term needed to close the goal', correct: true },
              { text: 'To rewrite using an equality', correct: false },
              { text: 'To apply a theorem to the goal', correct: false }
            ],
            explanation: '`exact` is used when you have a term or hypothesis that precisely matches the goal type. It "closes" the goal by providing the required proof term.'
          }
        ]
      }
    ]
  },
  {
    id: 'rewrite-tactics',
    number: 2,
    title: 'Rewrite Tactics',
    tacticTags: ['rw', 'simp'],
    sections: [
      {
        id: 'understanding-rw',
        title: 'Understanding rw',
        kind: 'explanation',
        content: [
          {
            type: 'paragraph',
            text: 'The `rw` tactic (rewrite) is one of the most commonly used tactics in Lean. It transforms your goal or hypotheses using equalities.'
          },
          {
            type: 'paragraph',
            text: 'If you have `h : a = b` and your goal contains `a`, you can use `rw [h]` to replace all occurrences of `a` with `b`. To rewrite in a hypothesis instead of the goal, use `rw [h] at hypName`.'
          }
        ]
      },
      {
        id: 'rw-practice',
        title: 'Practice: Rewriting',
        kind: 'practice',
        intro: [
          {
            type: 'paragraph',
            text: 'Practice your rewriting skills with this step-by-step problem.'
          }
        ],
        problems: [
          {
            id: 'basic-rewrite',
            title: 'Basic Rewrite',
            description: 'Complete the proof by rewriting with the given hypothesis',
            code: `example (a b : Nat) (h : a = b) : a + 1 = b + 1 := by
  -- Fill in the tactic
  sorry`,
            steps: [
              {
                prompt: 'What tactic rewrites using the hypothesis h?',
                options: [
                  { text: 'rw [h]', correct: true },
                  { text: 'exact h', correct: false },
                  { text: 'apply h', correct: false },
                  { text: 'simp [h]', correct: false }
                ]
              }
            ],
            fullCode: `example (a b : Nat) (h : a = b) : a + 1 = b + 1 := by
  rw [h]`
          }
        ]
      }
    ]
  },
  {
    id: 'induction',
    number: 3,
    title: 'Mathematical Induction',
    tacticTags: ['induction'],
    sections: [
      {
        id: 'induction-basics',
        title: 'Induction Basics',
        kind: 'explanation',
        content: [
          {
            type: 'paragraph',
            text: 'Mathematical induction is a proof technique for statements about natural numbers. It has two steps: a base case (prove for 0) and an inductive step (prove that if it holds for n, it holds for n+1).'
          },
          {
            type: 'paragraph',
            text: 'In Lean, use `induction n with` to perform induction on variable `n`. This will create two subgoals: the base case and the inductive step with an inductive hypothesis available.'
          }
        ]
      },
      {
        id: 'induction-practice',
        title: 'Practice: Induction',
        kind: 'practice',
        intro: [
          {
            type: 'paragraph',
            text: 'Practice proving a simple property by induction.'
          }
        ],
        problems: [
          {
            id: 'add-zero',
            title: 'Add Zero',
            description: 'Prove that n + 0 = n for all natural numbers n',
            code: `theorem add_zero (n : Nat) : n + 0 = n := by
  -- Start the induction
  sorry`,
            steps: [
              {
                prompt: 'Which tactic starts the induction on n?',
                options: [
                  { text: 'induction n', correct: false },
                  { text: 'induction n with', correct: true },
                  { text: 'induct n', correct: false },
                  { text: 'exact n', correct: false }
                ]
              },
              {
                prompt: 'For the base case (zero), what closes the goal 0 + 0 = 0?',
                options: [
                  { text: 'rfl', correct: true },
                  { text: 'simp', correct: false },
                  { text: 'done', correct: false },
                  { text: 'exact 0', correct: false }
                ]
              },
              {
                prompt: 'For the inductive step, what do we use the inductive hypothesis for?',
                options: [
                  { text: 'To prove the base case', correct: false },
                  { text: 'To prove n + 0 = n from n.succ + 0 = n.succ', correct: true },
                  { text: 'To introduce a new variable', correct: false },
                  { text: 'To rewrite using simp', correct: false }
                ]
              }
            ],
            fullCode: `theorem add_zero (n : Nat) : n + 0 = n := by
  induction n with
  | zero => rfl
  | succ n ih => simp [Nat.add_succ]; exact ih`
          }
        ]
      }
    ]
  },
  {
    id: 'contradiction',
    number: 4,
    title: 'Proof by Contradiction',
    tacticTags: ['by_contra', 'by_cases', 'push_neg'],
    sections: [
      {
        id: 'understanding-contradiction',
        title: 'Understanding Proof by Contradiction',
        kind: 'explanation',
        content: [
          {
            type: 'paragraph',
            text: 'Proof by contradiction is a powerful technique where we assume the negation of what we want to prove, then show that this assumption leads to a logical contradiction (False). If assuming ¬P leads to False, then P must be true.'
          },
          {
            type: 'paragraph',
            text: 'In Lean 4, the `by_contra` tactic implements proof by contradiction. If your goal is to prove proposition `P`, then `by_contra h` introduces a hypothesis `h : ¬P` (the negation of P) and changes your goal to proving `False`.'
          },
          {
            type: 'paragraph',
            text: 'This technique is particularly useful when a direct proof seems difficult, but assuming the opposite leads quickly to a contradiction with known facts.'
          }
        ]
      },
      {
        id: 'by-contra-basics',
        title: 'The by_contra Tactic',
        kind: 'explanation',
        content: [
          {
            type: 'paragraph',
            text: 'The `by_contra` tactic follows a clear pattern. After calling `by_contra h`, you have `h : ¬P` in your context and need to prove `False`. To succeed, you must derive a contradiction using `h` together with your other hypotheses.'
          },
          {
            type: 'theorem',
            name: 'Example: Double Negation',
            code: `example (P : Prop) : ¬¬P → P := by
  intro h
  by_contra np
  -- h : ¬¬P, np : ¬P
  -- Goal: False
  exact h np`
          },
          {
            type: 'paragraph',
            text: 'In this example, we assume `P` is false (introducing `np : ¬P`), then use the double negation `h : ¬¬P` (which is a function `¬P → False`) with `np` to derive `False` directly.'
          }
        ]
      },
      {
        id: 'by-cases-tactic',
        title: 'The by_cases Tactic',
        kind: 'explanation',
        content: [
          {
            type: 'paragraph',
            text: 'The `by_cases` tactic is a related tool that splits your proof into two cases. For a proposition `P`, `by_cases h : P` creates two subgoals: one where `P` is true, and another where `¬P` is true.'
          },
          {
            type: 'paragraph',
            text: 'This exhaustive case split is useful when you need to consider all possibilities. Combined with proof by contradiction in one branch, it can establish your result holds in all cases.'
          },
          {
            type: 'theorem',
            name: 'Example: Case Analysis',
            code: `example (P Q : Prop) (h : ¬P → Q) : Q := by
  by_cases hp : P
  · -- Case 1: P is true, but we need Q
    -- This path won't work, so we need another approach
    sorry
  · -- Case 2: ¬P is true
    exact h hp`
          }
        ]
      },
      {
        id: 'push-neg-tactic',
        title: 'The push_neg Tactic',
        kind: 'explanation',
        content: [
          {
            type: 'paragraph',
            text: 'When working with negations and complex logical expressions, the `push_neg` tactic is invaluable. It systematically pushes negations inward using logical equivalences, transforming expressions into more manageable forms.'
          },
          {
            type: 'paragraph',
            text: 'Key transformations performed by `push_neg` include: ¬∀ becomes ∃¬ (not for all = there exists not), ¬∃ becomes ∀¬ (not exists = for all not), ¬(A ∧ B) becomes A → ¬B, and ¬(A ∨ B) becomes ¬A ∧ ¬B.'
          },
          {
            type: 'paragraph',
            text: 'Using `push_neg at h` applies these transformations to a hypothesis `h` in your context, making it easier to work with in your proof.'
          }
        ]
      },
      {
        id: 'contradiction-exercise',
        title: 'Exercise: Proof by Contradiction',
        kind: 'exercise',
        intro: [
          {
            type: 'paragraph',
            text: 'Test your understanding of proof by contradiction techniques.'
          }
        ],
        questions: [
          {
            prompt: 'If your goal is `⊢ P`, what does `by_contra h` do?',
            options: [
              { text: 'Adds `h : P` to the context and changes goal to `False`', correct: false },
              { text: 'Adds `h : ¬P` to the context and changes goal to `False`', correct: true },
              { text: 'Changes the goal to `¬P`', correct: false },
              { text: 'Adds `h : P → False` to the context', correct: false }
            ],
            explanation: 'The `by_contra h` tactic introduces the negation of your goal as a hypothesis (`h : ¬P`) and changes the goal to proving `False`. To complete the proof, you must derive a contradiction from `h`.'
          },
          {
            prompt: 'What does `by_cases h : P` do?',
            options: [
              { text: 'Adds `h : P` to the context', correct: false },
              { text: 'Creates two subgoals: one with `h : P`, another with `h : ¬P`', correct: true },
              { text: 'Proves P by contradiction', correct: false },
              { text: 'Changes goal to `P ∨ ¬P`', correct: false }
            ],
            explanation: 'The `by_cases h : P` tactic performs case analysis on `P`, creating two separate subgoals: one where `P` holds (adding `h : P`), and another where `P` does not hold (adding `h : ¬P`). You must prove your goal in both cases.'
          },
          {
            prompt: 'What is the purpose of `push_neg`?',
            options: [
              { text: 'To introduce a new hypothesis', correct: false },
              { text: 'To push negations inward using logical equivalences', correct: true },
              { text: 'To apply a contradiction directly', correct: false },
              { text: 'To split a goal into cases', correct: false }
            ],
            explanation: 'The `push_neg` tactic transforms negated expressions by pushing negations inward, converting complex logical forms into simpler equivalents. For example, it transforms ¬∀ into ∃¬ and ¬∃ into ∀¬.'
          }
        ]
      },
      {
        id: 'contradiction-practice',
        title: 'Practice: Proof by Contradiction',
        kind: 'practice',
        intro: [
          {
            type: 'paragraph',
            text: 'Practice your proof by contradiction skills with this step-by-step problem.'
          }
        ],
        problems: [
          {
            id: 'basic-contradiction',
            title: 'Basic Contradiction',
            description: 'Complete the proof using by_contra',
            code: `example (P : Prop) (h : ¬¬P) : P := by
  -- Start the proof by contradiction
  sorry`,
            steps: [
              {
                prompt: 'Which tactic starts a proof by contradiction?',
                options: [
                  { text: 'by_contra', correct: true },
                  { text: 'by_cases', correct: false },
                  { text: 'push_neg', correct: false },
                  { text: 'exact', correct: false }
                ]
              },
              {
                prompt: 'After `by_contra np`, what hypothesis do we have?',
                options: [
                  { text: 'np : P', correct: false },
                  { text: 'np : ¬P', correct: true },
                  { text: 'np : ¬¬P', correct: false },
                  { text: 'np : False', correct: false }
                ]
              },
              {
                prompt: 'How do we close the goal using h : ¬¬P and np : ¬P?',
                options: [
                  { text: 'exact h np', correct: true },
                  { text: 'exact np h', correct: false },
                  { text: 'apply h', correct: false },
                  { text: 'rfl', correct: false }
                ]
              }
            ],
            fullCode: `example (P : Prop) (h : ¬¬P) : P := by
  by_contra np
  exact h np`
          },
          {
            id: 'push-neg-practice',
            title: 'Push Negation Practice',
            description: 'Use push_neg to transform a negated universal statement',
            code: `example (P : Nat → Prop) (h : ¬∀ n, P n) : ∃ n, ¬P n := by
  -- Transform the negation
  sorry`,
            steps: [
              {
                prompt: 'What tactic transforms ¬∀ into ∃¬?',
                options: [
                  { text: 'by_contra', correct: false },
                  { text: 'push_neg', correct: true },
                  { text: 'by_cases', correct: false },
                  { text: 'rw', correct: false }
                ]
              },
              {
                prompt: 'After `push_neg at h`, what does h become?',
                options: [
                  { text: 'h : ∃ n, P n', correct: false },
                  { text: 'h : ∃ n, ¬P n', correct: true },
                  { text: 'h : ∀ n, ¬P n', correct: false },
                  { text: 'h : ¬∃ n, P n', correct: false }
                ]
              },
              {
                prompt: 'What completes the proof after push_neg?',
                options: [
                  { text: 'exact h', correct: true },
                  { text: 'rfl', correct: false },
                  { text: 'apply h', correct: false },
                  { text: 'by_contra', correct: false }
                ]
              }
            ],
            fullCode: `example (P : Nat → Prop) (h : ¬∀ n, P n) : ∃ n, ¬P n := by
  push_neg at h
  exact h`
          }
        ]
      }
    ]
  },
  {
    id: 'ai-proofs',
    number: 5,
    title: 'Proof with AI',
    tacticTags: ['AI', 'automation', 'aiprover'],
    sections: [
      {
        id: 'ai-in-lean',
        title: 'AI and Automated Theorem Proving',
        kind: 'explanation',
        content: [
          {
            type: 'paragraph',
            text: 'The intersection of AI and formal theorem proving is one of the most exciting frontiers in mathematics and computer science. Lean 4 has become a leading platform for developing and testing AI-powered theorem provers.'
          },
          {
            type: 'paragraph',
            text: 'Recent advances in 2025-2026 have demonstrated that AI systems can now assist with formal proofs at unprecedented levels. From auto-completing proof steps to suggesting entire proof strategies, AI is transforming how we approach formal verification.'
          },
          {
            type: 'paragraph',
            text: 'Major developments include benchmarks like SorryDB for evaluating AI provers, systems like Aristotle and Ax-Prover that use multi-agent approaches, and autonomous provers like AxiomProver that have solved previously unsolved problems.'
          }
        ]
      },
      {
        id: 'ai-assisted-proving',
        title: 'AI-Assisted Proving in Practice',
        kind: 'explanation',
        content: [
          {
            type: 'paragraph',
            text: 'AI-assisted proving in Lean 4 takes several forms. The most common is proof step suggestion, where the AI analyzes your current proof state and suggests relevant tactics or lemmas that might advance your proof.'
          },
          {
            type: 'paragraph',
            text: 'More advanced systems can generate entire proofs automatically. These systems use large language models trained on vast corpora of formal mathematics, combined with verification loops that ensure each suggested step is correct before proceeding.'
          },
          {
            type: 'paragraph',
            text: 'The integration of AI with Lean 4\'s tactic framework enables a new paradigm: interactive theorem proving where human intuition guides the overall strategy while AI handles routine steps and suggests creative approaches when stuck.'
          }
        ]
      },
      {
        id: 'leandojo-platform',
        title: 'The LeanDojo Platform',
        kind: 'explanation',
        content: [
          {
            type: 'paragraph',
            text: 'LeanDojo is a comprehensive platform for AI-assisted theorem proving in Lean 4. It provides tools for training, evaluating, and deploying AI models that can interact with Lean\'s proof environment.'
          },
          {
            type: 'paragraph',
            text: 'The platform offers datasets of formal proofs, evaluation benchmarks, and interfaces that allow AI models to receive feedback from Lean\'s type checker. This closed-loop system ensures that AI suggestions are always verified before acceptance.'
          },
          {
            type: 'paragraph',
            text: 'Researchers use LeanDojo to develop and compare different approaches to AI theorem proving, driving rapid advancement in the field. The platform has become the standard for evaluating AI provers on real formal mathematics.'
          }
        ]
      },
      {
        id: 'future-directions',
        title: 'Future Directions',
        kind: 'explanation',
        content: [
          {
            type: 'paragraph',
            text: 'The future of AI in theorem proving points toward more sophisticated collaboration between human mathematicians and AI systems. Emerging approaches include multi-agent systems where specialized AI components handle different aspects of proving.'
          },
          {
            type: 'paragraph',
            text: 'Another frontier is auto-formalization—using AI to translate informal mathematical text into formal Lean code. This could dramatically accelerate the formalization of research-level mathematics.'
          },
          {
            type: 'paragraph',
            text: 'As these technologies mature, we may see AI systems that can not only prove theorems but also discover new mathematical conjectures and contribute to the advancement of mathematics itself.'
          }
        ]
      },
      {
        id: 'ai-quiz',
        title: 'Check Your Understanding',
        kind: 'exercise',
        intro: [
          {
            type: 'paragraph',
            text: 'Test your understanding of AI-assisted theorem proving.'
          }
        ],
        questions: [
          {
            prompt: 'What is LeanDojo?',
            options: [
              { text: 'A new proof tactic in Lean 4', correct: false },
              { text: 'A platform for AI-assisted theorem proving', correct: true },
              { text: 'A theorem about dojo construction', correct: false },
              { text: 'A type of proof strategy', correct: false }
            ],
            explanation: 'LeanDojo is a comprehensive platform for training, evaluating, and deploying AI models that can assist with theorem proving in Lean 4.'
          },
          {
            prompt: 'What is a key advantage of AI-assisted proving?',
            options: [
              { text: 'It replaces the need for human mathematicians', correct: false },
              { text: 'It can suggest tactics and complete proof steps automatically', correct: true },
              { text: 'It guarantees correctness without verification', correct: false },
              { text: 'It works without any formal proof framework', correct: false }
            ],
            explanation: 'AI-assisted proving can suggest tactics, complete proof steps, and even generate entire proofs, but all suggestions are verified by Lean\'s type checker for correctness.'
          },
          {
            prompt: 'What is auto-formalization?',
            options: [
              { text: 'Automatic theorem proving', correct: false },
              { text: 'Converting informal mathematics to formal Lean code', correct: true },
              { text: 'Formal proof verification', correct: false },
              { text: 'Tactic suggestion', correct: false }
            ],
            explanation: 'Auto-formalization is the process of using AI to translate informal mathematical text into formal Lean code, potentially accelerating the formalization of research mathematics.'
          }
        ]
      }
    ]
  }
]
