export interface GlossaryEntry {
  term: string
  definition: string
  example?: string
}

export const glossaryData: GlossaryEntry[] = [
  {
    term: "intro",
    definition: "Introduces a new hypothesis into the proof state. Use intro h to name the hypothesis h, or intro to let Lean choose a name.",
    example: `-- Goal: P → Q
theorem intro_ex (h : P) : Q := by
  intro hp   -- hp : P is added to context
  -- Now hp : P and h : P are available
  sorry`
  },
  {
    term: "apply",
    definition: "Applies a function or theorem to the goal, potentially simplifying it. Used when you know what theorem/lemma to use.",
    example: `-- h : a = b
-- Goal: f a = f b
theorem apply_ex (h : a = b) : f a = f b := by
  apply congrArg f  -- applies function congruence
  exact h          -- now goal is a = b which we have`
  },
  {
    term: "exact",
    definition: "Closes a goal by providing an exact proof term -- h is exactly what we need",
    example: `-- Goal: ∃ n : Nat, n > 0
theorem ex : ∃ n : Nat, n > 0 := by
  use 1       -- provide witness
  -- Goal is now: 1 > 0
  decide`
  },
  {
    term: "rw",
    definition: "Rewrites the goal (or a hypothesis with rw [...] at h) using an equality. Replaces the left side with the right.",
    example: `-- h : a = b
-- Goal: f a = f b
theorem baz (h : a = b) : f a = f b := by
  rw [h]      -- rewrites a → b in the goal
  -- Goal is now: f b = f b
  rfl`
  },
  {
    term: "by_contra",
    definition: "Begins a proof by contradiction. Assumes the negation of the goal and asks you to derive False.",
    example: `-- Goal: P
theorem contra : P := by
  by_contra h  -- h : ¬P is now in context
  -- ... derive False from h ...
  -- exact some_proof_of_false`
  },
  {
    term: "by_cases",
    definition: "Splits a proof into two cases based on a proposition. Creates two subgoals: one with the proposition true, another with its negation true.",
    example: `-- Goal: Q
theorem cases_ex (h1 : P → Q) (h2 : ¬P → Q) : Q := by
  by_cases h : P
  · exact h1 h    -- case 1: P is true
  · exact h2 h    -- case 2: ¬P is true`
  },
  {
    term: "push_neg",
    definition: "Pushes a negation inward. Transforms ¬∀ into ∃¬, ¬∃ into ∀¬, ¬(A ∧ B) into A → ¬B, etc.",
    example: `-- h : ¬(∃ x, P x)
-- After push_neg:
-- h : ∀ x, ¬(P x)
theorem push_ex (h : ¬(∃ x : Nat, P x)) : ∀ x, ¬(P x) := by
  push_neg at h
  exact h`
  },
  {
    term: "rfl",
    definition: "Closes a goal of the form a = a. Works when both sides are definitionally equal (compute to the same term).",
    example: `-- Goal: 0 + 0 = 0
theorem rfl_ex : 0 + 0 = 0 := by
  rfl   -- 0 + 0 computes to 0`
  },
  {
    term: "ring",
    definition: "Solves equalities in commutative rings by normalizing both sides. Works for polynomial arithmetic over Nat, Int, etc.",
    example: `-- Goal: (a + b) * (a + b) = a*a + 2*a*b + b*b
theorem ring_ex (a b : Nat) :
    (a + b) * (a + b) = a*a + 2*a*b + b*b := by
  ring    -- normalizes both sides and checks equality`
  },
  {
    term: "omega",
    definition: "Solves linear arithmetic goals over Nat and Int. Handles inequalities, modular arithmetic, and bounded quantifiers.",
    example: `-- Goal: a < b → a + 1 ≤ b
theorem omega_ex (a b : Nat) (h : a < b) : a + 1 ≤ b := by
  omega   -- handles the linear arithmetic automatically`
  },
  {
    term: "induction",
    definition: "Performs structural induction on a variable. Creates a base case and an inductive step with the inductive hypothesis.",
    example: `-- Prove n + 0 = n by induction on n
theorem add_zero (n : Nat) : n + 0 = n := by
  induction n with
  | zero => rfl           -- base: 0 + 0 = 0
  | succ n ih =>
    simp [Nat.add_succ]   -- inductive step
    exact ih               -- uses ih : n + 0 = n`
  },
  {
    term: "have",
    definition: "Introduces an intermediate lemma or fact into the proof. Useful for breaking complex proofs into smaller steps.",
    example: `-- Goal: c
theorem have_ex (ha : a) (hab : a → b) (hbc : b → c) : c := by
  have hb : b := hab ha   -- introduce intermediate fact
  exact hbc hb             -- use it to close the goal`
  },
  {
    term: "calc",
    definition: "Performs a calculational proof — a chain of equalities or inequalities with a justification for each step.",
    example: `-- Goal: a + b + c = c + b + a
theorem calc_ex (a b c : Nat) :
    a + b + c = c + b + a := by
  calc a + b + c = c + (a + b) := by ring
    _ = c + (b + a)         := by rw [Nat.add_comm a b]
    _ = c + b + a           := by ring`
  },
  {
    term: "simp",
    definition: "Simplifies the goal using a database of equational lemmas. Can be given specific lemmas to use with simp [lemma1, lemma2].",
    example: `-- Goal: list.reverse (list.reverse xs) = xs
theorem simp_ex (xs : List Nat) :
    xs.reverse.reverse = xs := by
  simp    -- applies known lemmas about List.reverse automatically`
  },
  {
    term: "use",
    definition: "Provides a witness for an existential goal (∃). After use, you must still prove the witness satisfies the property.",
    example: `-- Goal: ∃ n : Nat, n > 0
theorem ex : ∃ n : Nat, n > 0 := by
  use 1       -- provide witness
  -- Goal is now: 1 > 0
  decide`
  }
]
