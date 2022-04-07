import create from "zustand"

export type QuestionType = {
  id?: number
  type: "multiple" | "boolean" | "text"
  question: string
  bareme: any
  options?: {
    value: string
    correct: boolean
  }[]
  lines?: number
  true?: boolean
}

const initial_meta = {
  title: "The first Quizz",
  module: "Algebre 1",
  semestre: "2019-2",
  year: "2019/2020",
  format: "A4", // A3
}

const initial_questions: QuestionType[] = [
  {
    id: 1,
    type: "multiple", // mutli, boolean, text
    question: "",
    options: [
      {
        value: "Option 1",
        correct: false,
      },
      {
        value: "Option 2",
        correct: false,
      },
    ],
    bareme: "",
  },
]

const initial_state = {
  meta: initial_meta,
  questions: initial_questions,
}

export const useStore = create((set: any) => ({
  meta: initial_meta,
  questions: initial_questions,
  addQuestion: (question: QuestionType) => {
    set((state: typeof initial_state) => ({
      ...state,
      questions: [...state.questions, question],
    }))
  },
  removeQuestion: (id: number) => {
    set((state: typeof initial_state) => ({
      ...state,
      questions: state.questions.filter((q) => q.id !== id),
    }))
  },
  updateQuestion: (id: number, question: QuestionType) => {
    set((state: typeof initial_state) => ({
      ...state,
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, ...question } : q,
      ),
    }))
  },
  updateMeta: (meta: typeof initial_meta) => {
    set((state: typeof initial_state) => ({
      ...state,
      meta: { ...state.meta, ...meta },
    }))
  },
}))
