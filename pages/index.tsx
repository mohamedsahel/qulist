import { useDB } from 'src/db'
import Header from '@components/Header'
import { useOpenedExam } from '@components/OpenedExamProvider'
import ExamEditor from '@components/ExamEditor'
import ExamCard from '@components/ExamCard'

export default function Home(): JSX.Element {
  const openedExam = useOpenedExam()
  const { exams, deleteExam } = useDB((state) => ({
    exams: state.exams,
    deleteExam: state.deleteExam,
  }))

  if (openedExam) {
    return (
      <div>
        <Header />
        <main className='mt-[4.4rem]'>
          <ExamEditor isShowing />
        </main>
      </div>
    )
  }

  exams.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  )

  return (
    <div>
      <Header />
      <main className='inner-container grid md:grid-cols-2 gap-6 mt-24'>
        {exams.map((exam, index) => (
          <ExamCard
            index={index}
            key={exam.id}
            exam={exam}
            deleteExam={() => deleteExam(exam.id)}
            isShowing
          />
        ))}
      </main>
    </div>
  )
}
