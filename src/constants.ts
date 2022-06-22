// @ts-ignore
import colors from 'tailwindcss/colors'

export const FILIERES_LIST = ['SMI', 'SMPC', 'GLNT'] as const

export const DEPARTEMENT_LIST = [
  'Computer Science',
  'Physics',
  'Mathematics',
] as const

export const FORMAT_LIST = ['A3', 'A4'] as const

export const DURATION_LIST = ['1h', '1.5h', '2h'] as const

export const MODULE_LIST = [
  'Networks',
  'Module 2',
  'Module 3',
] as const

export const SESSION_LIST = (() => {
  const d = new Date()
  let year = d.getFullYear()
  return [
    `Autumn ${year}/${year - 1}`,
    `Spring ${year}/${year - 1}`,
    `Autumn ${year}/${year + 1}`,
    `Spring ${year}/${year + 1}`,
    `Autumn ${year}/${year + 2}`,
    `Spring ${year}/${year + 2}`,
    `Autumn ${year}/${year + 3}`,
    `Spring ${year}/${year + 3}`,
  ] as const
})()

export const QUESTION_TYPES_LIST = [
  {
    id: 'multiple_choices',
    value: 'Multiple',
  },
  {
    id: 'true_false',
    value: 'True/False',
  },
  {
    id: 'long',
    value: 'Long',
  },
] as const

export const LONG_BAREME_COLORS: Record<string, string> = {
  A: colors.green[500],
  B: colors.blue[500],
  C: colors.yellow[500],
  D: colors.purple[500],
  E: colors.violet[500],
  F: colors.teal[500],
}

export const LATEX_MATH_EXPRESSIONS = [
  '\\textbf{bold}',
  '\\textit{italic}',
  '\\underline{underline}',
  '[\\quad]',
  //
  '\\alpha',
  '\\beta',
  '\\Delta',
  '\\theta',
  '\\pi',
  '\\Leftarrow',
  '\\Rightarrow',
  '\\Leftrightarrow',
  '\\emptyset',
  //
  '\\frac{a}{b}',
  '\\sqrt{a}',
  '\\sqrt[n]{a}',
  'a^{b}',
  'a_{b}',
  '\\sum_{i=1}^{n}',
  '\\prod_{n=1}^{\\infty}',
  '\\lim_{x\\to\\infty}',
  '\\bigcup_{n=1}^{10}',
  '\\bigcap_{n=1}^{10}',
  '\\log_{a}b',
  '\\int_{a}^{b}',
  '\\infty',
  '\\sin{a}',
  '\\overrightarrow{AB}',
  '\\overline{AB}',
  '\\widehat{AB}',
  //
  '\\le',
  '\\ge',
  '\\equiv',
  '\\ne',
  '\\pm',
  '\\div',
  '\\times',
]
