import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDB } from '~/db'

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
  const { openedExam } = useDB((state) => ({
    openedExam: state.exams.find((e) => e.id === searchParams.get('exam')),
  }))

  console.log('searchParams :>> ', searchParams)

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
