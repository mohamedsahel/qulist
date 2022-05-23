import create, { GetState, SetState } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import shortid from 'shortid'
import produce from 'immer'
import {
  DEPARTEMENT_LIST,
  FILIERES_LIST,
  FORMAT_LIST,
} from 'src/constants'

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

export type BDType = {
  examens: ExamenType[]
  nouveauExamen: () => void
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
