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
  module: "",
  filiere: "",
  departement: "",
  session: "",
  duree: "",
  format: "", // A3
  defaultBareme: "",
}

export type MetaType = typeof initial_meta

type InitialStateType = {
  meta: MetaType
  questions: QuestionType[]
}

const initial_question: QuestionType = {
  id: 1,
  type: "multiple", // mutli, boolean, text
  question: "",
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
  bareme: initial_meta.defaultBareme,
  lines: 3,
  closed: false,
}

const initial_state: InitialStateType = {
  meta: initial_meta,
  questions: [],
}


export const useStore = create(
  devtools(
    persist(
      (set: any, get) => ({
        ...initial_state,
        addQuestion: (question: QuestionType = initial_question) => {
          set((state: any) => {
            const newQuestion = {
              ...question,
              id: Math.random(),
              bareme: (get() as any).meta.defaultBareme,
            }

            return {
              ...state,
              questions: [...state.questions, newQuestion],
            }
          })
        },
        removeQuestion: (id: number) => {
          set((state: typeof initial_state) => ({
            ...state,
            questions: state.questions.filter((q: QuestionType) => q.id !== id),
          }))
        },
        updateQuestion: (id: number, question: QuestionType) => {
          set((state: typeof initial_state) => ({
            ...state,
            questions: state.questions.map((q: QuestionType) =>
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
