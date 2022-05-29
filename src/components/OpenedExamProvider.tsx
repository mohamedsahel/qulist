import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useState } from 'react'
import { useDB } from 'src/db'

const OpenedExamContext = createContext<
  | {
      openedExamId: string
      showLatex: boolean
      setShowLatex: (showLatex: boolean) => void
    }
  | null
>(null)
export const useOpenedExam = () => useContext(OpenedExamContext)

function OpenedExamProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [showLatex, setShowLatex] = useState(false)
  const { query } = useRouter()
  const { openedExam } = useDB((state) => ({
    openedExam: state.exams.find((e) => e.id === query.exam),
  }))


  return (
    <OpenedExamContext.Provider
      value={
        openedExam?.id ? {
          openedExamId: openedExam.id,
          showLatex,
          setShowLatex: (showLatex: boolean) => setShowLatex(showLatex),
        } : null
      }>
      {children}
    </OpenedExamContext.Provider>
  )
}

export default OpenedExamProvider
