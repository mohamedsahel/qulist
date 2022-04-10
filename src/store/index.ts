import create from "zustand"
import { devtools, persist } from "zustand/middleware"


export type QuestionType = {
  id: number
  type: "multiple" | "boolean" | "text"
  question: string
  bareme: any
  options?: {
    id: number
    value: string
    correct: boolean
  }[]
  lines?: number
  true?: boolean
  closed: boolean
}

const initial_meta = {
  title: "The first Quizz",
  module: "Algebre 1",
  semestre: "S5",
  year: "2019/2020",
  format: "A4", // A3
}

const initial_question: QuestionType = {
  id: 1,
  type: "multiple", // mutli, boolean, text
  question: "Porqoui cette question est vide",
  options: [
    {
      id: 1,
      value: "Option 1",
      correct: false,
    },
    {
      id: 2,
      value: "",
      correct: false,
    },
  ],
  true: true,
  bareme: "",
  lines: 3,
  closed: false,
}

const initial_state = {
  meta: initial_meta,
  questions: [initial_question],
}

export const useStore = create(
  devtools(
    persist(
      (set: any) => ({
        ...initial_state,
        addQuestion: (question: QuestionType = initial_question) => {
          const newQuestion = {
            ...question,
            id: Math.random(),
          }
          set((state: typeof initial_state) => ({
            ...state,
            questions: [...state.questions, newQuestion],
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
        setFocusedQuestion: (id: number) => {
          set((state: typeof initial_state) => ({
            ...state,
            focused_question: id,
          }))
        },
      }),
      {
        name: "amc-qcm-storage",
      },
    ),
  ),
)
