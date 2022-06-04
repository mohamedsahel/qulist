import create, { GetState, SetState } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import shortid from 'shortid'


import {
  DEPARTMENTS_LIST,
  DURATION_LIST,
  FILIERES_LIST,
  FORMAT_LIST,
  MODULE_LIST,
  SESSION_LIST,
} from 'src/constants'

export type QuestionTypesType = 'true_false' | 'long' | 'multipe_choices'

export type BaremeType = {
  wrongChoice: number
  correctChoice: number
}

export type OptionType = {
  id: string
  value: string
  correct: boolean
}


export type QuestionType = {
  id: string
  type: QuesttionTypesType
  question: string
  choices: {
    id: string
    value: string
    correct: boolean
  }[]
  true: boolean
  choicesAlignement: 'multicols' | 'horizontal' | 'vertical'
  bareme: BaremeType
  longBareme: string[]
  lines: number
  previewMode: boolean
}


export type ExamType = {
  id: string
  module: string
  filiere: string
  department: string
  session: string
  duration: string
  format: typeof FORMAT_LIST[number]
  questions: QuestionType[]
  shuffleQuestions: boolean
  createdAt: string
}

export type DBType = {
  exams: ExamType[]
  newExam: (exam: ExamType) => void
  editExam: (examId: string, data: Partial<ExamType>) => void
  deleteExam: (examId: string) => void
  addQuestion: (examId: string, question: QuestionType) => void
  deleteQuestion: (examId: string, questionId: string) => void
  editQuestion: (
    examId: string,
    questionId: string,
    data: Partial<QuestionType>
  ) => void
}

export type MethodType<T> = (
  set: SetState<DBType>,
  get: GetState<DBType>
) => T
