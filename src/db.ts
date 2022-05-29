import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { DBType, ExamType, MethodType, QuestionType } from 'types'

export const newExam: MethodType<DBType['newExam']> =
  (set) => (exam: ExamType) => {
    set((state) => ({
      ...state,
      exams: [...state.exams, exam],
    }))
  }

export const editExam: MethodType<DBType['editExam']> =
  (set) => (examId, data) => {
    set((state) => ({
      ...state,
      exams: state.exams.map((exam) =>
        exam.id === examId ? { ...exam, ...data } : exam
      ),
    }))
  }

export const deleteExam: MethodType<DBType['deleteExam']> =
  (set) => (examId) => {
    set((state) => ({
      ...state,
      exams: state.exams.filter((exam) => exam.id !== examId),
    }))
  }

export const addQuestion: MethodType<DBType['addQuestion']> =
  (set) => (examId, question) => {
    set((state) => ({
      ...state,
      exams: state.exams.map((exam) =>
        exam.id === examId
          ? { ...exam, questions: [...exam.questions, question] }
          : exam
      ),
    }))
  }

export const deleteQuestion: MethodType<DBType['deleteQuestion']> =
  (set) => (examId, questionId) => {
    set((state) => ({
      ...state,
      exams: state.exams.map((exam) =>
        exam.id === examId
          ? {
              ...exam,
              questions: exam.questions.filter(
                (question) => question.id !== questionId
              ),
            }
          : exam
      ),
    }))
  }

export const editQuestion: MethodType<DBType['editQuestion']> =
  (set) => (examId, questionId, data) => {
    set((state) => ({
      ...state,
      exams: state.exams.map((exam) =>
        exam.id === examId
          ? {
              ...exam,
              questions: exam.questions.map((question) =>
                question.id === questionId
                  ? ({ ...question, ...data } as QuestionType)
                  : question
              ),
            }
          : exam
      ),
    }))
  }

export const useDB = create<DBType>(
  devtools(
    persist(
      (set, get): DBType => ({
        exams: [],
        newExam: newExam(set, get),
        deleteExam: deleteExam(set, get),
        editExam: editExam(set, get),
        addQuestion: addQuestion(set, get),
        deleteQuestion: deleteQuestion(set, get),
        editQuestion: editQuestion(set, get),
      }),
      {
        name: 'amc-qcm-storage',
      }
    )
  )
)
