// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useLayoutEffect,
//   useState,
// } from 'react'
// import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
// import { useDB } from '~/db'
// import { getSampleExam } from '~/utils'

// const OpenedExamContext = createContext<{
//   openedExamId: string
//   showLatex: boolean
//   setShowLatex: (showLatex: boolean) => void
// } | null>(null)
// export const useOpenedExam = () => useContext(OpenedExamContext)

// function OpenedExamProvider({
//   children,
// }: {
//   children: ReactNode
// }): JSX.Element {
//   const [showLatex, setShowLatex] = useState(false)
//   const { examId } = useParams()
//   const { openedExam, exams, newExam } = useDB((state) => ({
//     openedExam: state.exams.find((e) => e.id === searchParams.get('exam')),
//     exams: state.exams,
//     newExam: state.newExam,
//   }))
//   const navigate = useNavigate()

//   useLayoutEffect(() => {
//     if (exams.length === 0) {
//       const exam = getSampleExam()
//       console.log('exam :>> ', exam)
//       navigate('?exam=' + exam.id)
//       // newExam(exam)
//     }
//   }, [exams.length])

//   useEffect(() => {
//     setShowLatex(false)
//   }, [examId])

//   return (
//     <OpenedExamContext.Provider
//       value={
//         openedExam?.id
//           ? {
//               openedExamId: openedExam.id,
//               showLatex,
//               setShowLatex: (showLatex: boolean) => setShowLatex(showLatex),
//             }
//           : null
//       }
//     >
//       {children}
//     </OpenedExamContext.Provider>
//   )
// }

// export default OpenedExamProvider
export default function() {}