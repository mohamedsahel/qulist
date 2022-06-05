import shortid from 'shortid'
import { QuestionType } from 'types'
import { ExamType } from 'types'
import { FORMAT_LIST } from '~/constants'

export const getSampleExam = () => {
  return {
    id: shortid.generate(),
    module: 'Networks',
    filiere: 'SMI Semester 6',
    department: 'Computer Science',
    session: 'Ordinary Autumn 2021/2022',
    duration: '60min',
    format: FORMAT_LIST[0],
    questions: [],
    createdAt: new Date().toISOString(),
    shuffleQuestions: true,
  } as ExamType
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
    longBareme: ['0', '0.5', '1'],
    choices: [],
    choicesAlignement: 'multicols',
    true: false,
    lines: 3,
    previewMode: false,
  } as QuestionType
}

export const escapeRegExp = (input: string): string => {
  return (input || '').replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1')
}

export const renderTemplate = (
  template: string,
  options?: Record<string, any>,
) => {
  if (!options) {
    return template
  }

  return Object.keys(options).reduce((acc, option) => {
    const regex = new RegExp('{{\\s*' + escapeRegExp(option) + '\\s*}}', 'g')
    return acc.replace(regex, options[option])
  }, template)
}

export const nestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}
