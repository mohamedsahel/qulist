import create, { GetState, SetState } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import shortid from 'shortid'
import produce from 'immer'

export const FILIERES_LIST = ['SMIA', 'SMPC', 'GLNT'] as const

export const DEPARTEMENT_LIST = [
  'Informatique',
  'Physique',
  'Mathématiques',
] as const

export const FORMAT_LIST = ['A3', 'A4'] as const

export type BaremeType = {
  mouvaisChoix: number
  bonneChoix: number
}

export type OptionType = {
  id: string
  value: string
  correct: boolean
}

export type ParentQuestionType<T> = {
  id: string
  type: T
  question: string
  bareme: BaremeType
  ui: {
    closed: boolean
  }
}

export type MultipeChoixQuestionType =
  ParentQuestionType<'multipe_choix'> & {
    choix: {
      id: number
      value: string
      correct: boolean
    }[]
    alignementDeChoix: 'vertical' | 'horizontal' | 'caree'
  }

export type VraisFauxQuestionType =
  ParentQuestionType<'vrais_faux'> & {
    vrais: boolean
    alignementDeChoix: 'vertical' | 'horizontal'
  }

export type LongQuestionType = ParentQuestionType<'long'> & {
  lignes: number
}

export type QuestionType =
  | MultipeChoixQuestionType
  | VraisFauxQuestionType
  | LongQuestionType

export type ExamenType = {
  id: string
  module: string
  filiere: typeof FILIERES_LIST[number]
  departement: typeof DEPARTEMENT_LIST[number]
  session: string
  duree: string
  format: typeof FORMAT_LIST[number]
  baremeParDefaut: BaremeType
  questions: QuestionType[]
}

const attributes: ExamenType = {
  id: shortid.generate(),
  module: '',
  filiere: FILIERES_LIST[0],
  departement: DEPARTEMENT_LIST[0],
  session: '',
  duree: '',
  format: FORMAT_LIST[0],
  baremeParDefaut: {
    mouvaisChoix: 0,
    bonneChoix: 1,
  },
  questions: [],
}

export type BDType = {
  examens: ExamenType[]
  editerExamen: (examenId: string, data: Partial<ExamenType>) => void
  ajouterQuestion: (examenId: string, question: QuestionType) => void
  supprimerQuestion: (examenId: string, questionId: string) => void
  editerQuestion: (
    examenId: string,
    questionId: string,
    data: Partial<QuestionType>
  ) => void
}

export type MethodType<T> = (
  set: SetState<BDType>,
  get: GetState<BDType>
) => T

export const editerExamen: MethodType<BDType['editerExamen']> =
  (set) => (examenId, data) => {
    set((state) => ({
      ...state,
      examens: state.examens.map((examen) =>
        examen.id === examenId ? { ...examen, ...data } : examen
      ),
    }))
  }

export const ajouterQuestion: MethodType<BDType['ajouterQuestion']> =
  (set) => (examenId, question) => {
    set((state) => ({
      ...state,
      examens: state.examens.map((examen) =>
        examen.id === examenId
          ? { ...examen, questions: [...examen.questions, question] }
          : examen
      ),
    }))
  }

export const supprimerQuestion: MethodType<
  BDType['supprimerQuestion']
> = (set) => (examenId, questionId) => {
  set((state) => ({
    ...state,
    examens: state.examens.map((examen) =>
      examen.id === examenId
        ? {
            ...examen,
            questions: examen.questions.filter(
              (question) => question.id !== questionId
            ),
          }
        : examen
    ),
  }))
}

export const editerQuestion: MethodType<BDType['editerQuestion']> =
  (set) => (examenId, questionId, data) => {
    set((state) => ({
      ...state,
      examens: state.examens.map((examen) =>
        examen.id === examenId
          ? {
              ...examen,
              questions: examen.questions.map((question) =>
                question.id === questionId
                  ? ({ ...question, ...data } as QuestionType)
                  : question
              ),
            }
          : examen
      ),
    }))
  }

export const useBD = create<BDType>(
  persist(
    (set, get): BDType => ({
      examens: [],
      editerExamen: editerExamen(set, get),
      ajouterQuestion: ajouterQuestion(set, get),
      supprimerQuestion: supprimerQuestion(set, get),
      editerQuestion: editerQuestion(set, get),
    }),
    {
      name: 'amc-qcm-storage',
    }
  )
)
