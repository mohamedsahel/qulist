import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ExamEditor from '~/components/ExamEditor'
import useNewExam from '~/utils/useNewExam'
import useOpenedExam from '~/utils/useOpenedExam'

export default function ExamId(): JSX.Element {
  const { examId } = useParams()
  const openedExam = useOpenedExam()
  const newExam = useNewExam()

  useEffect(() => {
    if (!openedExam) {
      newExam(examId)
    }
  }, [openedExam, examId])

  if (!openedExam) {
    return <div>loading...</div>
  }

  return (
    <main className='mt-[4.4rem]'>
      <ExamEditor isShowing />
    </main>
  )
  // const { newExam } = useDB((state) => ({
  //   newExam: state.newExam,
  // }))

  // useLayoutEffect(() => {
  //   if (!openedExam) {
  //     const exam = getSampleExam()
  //     newExam(exam)
  //   }
  // }, [])

  // if (openedExam) {
  //   return (
  //     <main className='mt-[4.4rem]'>
  //       <ExamEditor isShowing />
  //     </main>
  //   )
  // } else {
  //   return null
  // }
}
