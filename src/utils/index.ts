import shortid from 'shortid'
import {
  DEPARTEMENT_LIST,
  DURATION_LIST,
  FILIERES_LIST,
  FORMAT_LIST,
  MODULE_LIST,
  SESSION_LIST,
} from 'src/constants'
import { ExamType, QuestionType } from 'types'

export const getNewExam = (): ExamType => {
  return {
    id: shortid.generate(),
    module: MODULE_LIST[0],
    filiere: FILIERES_LIST[0],
    department: DEPARTEMENT_LIST[0],
    session: SESSION_LIST[0],
    duration: DURATION_LIST[0],
    format: FORMAT_LIST[0],
    questions: [],
    createdAt: new Date().toISOString(),
  }
}

export const getNewQuestion = (): QuestionType => {
  return {
    id: shortid.generate(),
    type: 'multiple_choices',
    question: '',
    bareme: {
      wrongChoice: 0,
      correctChoice: 1,
    },
    longBareme: {
      A: 0,
      B: 1,
      C: 2,
    },
    choices: [],
    choicesAlignement: 'multicols',
    true: false,
    lines: 3,
  } as QuestionType
}

const degreesList = ['A', 'B', 'C', 'D', 'E', 'F']

export const getNextLongDegree = (degreesArray: string[]) => {
  const lastDegree = degreesArray[degreesArray.length - 1]
  const nextDegreeIndex = degreesList.indexOf(lastDegree) + 1

  return degreesList[nextDegreeIndex]
}
