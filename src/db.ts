import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import shortid from 'shortid'
import { BDType, ExamenType, MethodType, QuestionType } from 'types'
import {
  DEPARTEMENT_LIST,
  FILIERES_LIST,
  FORMAT_LIST,
} from './constants'

const initialExamen: ExamenType = {
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

export const nouveauExamen: MethodType<BDType['nouveauExamen']> =
  (set) => () => {
    set((state) => ({
      ...state,
      examens: [...state.examens, initialExamen],
    }))
  }

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
  devtools(
    persist(
      (set, get): BDType => ({
        examens: [],
        nouveauExamen: nouveauExamen(set, get),
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
)
