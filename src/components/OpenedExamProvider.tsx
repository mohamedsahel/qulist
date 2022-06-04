import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDB } from '~/db'
import { getSampleExam } from '~/utils'

const OpenedExamContext = createContext<{
  openedExamId: string
  showLatex: boolean
  setShowLatex: (showLatex: boolean) => void
} | null>(null)
export const useOpenedExam = () => useContext(OpenedExamContext)

function OpenedExamProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [showLatex, setShowLatex] = useState(false)
  const [searchParams] = useSearchParams()
  const { openedExam, exams, newExam } = useDB((state) => ({
    openedExam: state.exams.find((e) => e.id === searchParams.get('exam')),
    exams: state.exams,
    newExam: state.newExam,
  }))
  const navigate = useNavigate()

  useEffect(() => {
    if (exams.length === 0) {
      const exam = getSampleExam()
      navigate('?exam=' + exam.id)
      newExam(exam)
    }
  }, [exams.length])

  useEffect(() => {
    setShowLatex(false)
  }, [searchParams])

  return (
    <OpenedExamContext.Provider
      value={
        openedExam?.id
          ? {
              openedExamId: openedExam.id,
              showLatex,
              setShowLatex: (showLatex: boolean) => setShowLatex(showLatex),
            }
          : null
      }
    >
      {children}
    </OpenedExamContext.Provider>
  )
}

export default OpenedExamProvider
