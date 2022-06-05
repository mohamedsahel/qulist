import ExamEditor from '~/components/ExamEditor'
import useOpenedExam from '~/utils/useOpenedExam'

export default function ExamId(): JSX.Element {
  const openedExam = useOpenedExam()

  if (!openedExam) {
    return <div>loading...</div>
  }

  return (
    <main className='mt-[4.4rem]'>
      <ExamEditor isShowing />
    </main>
  )
}
