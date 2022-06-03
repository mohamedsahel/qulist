import { useDB } from '~/db'
import { useOpenedExam } from '~/components/OpenedExamProvider'
import ExamEditor from '~/components/ExamEditor'
import ExamCard from '~/components/ExamCard'

export default function Home(): JSX.Element {
  const openedExam = useOpenedExam()
  const { exams, deleteExam } = useDB((state) => ({
    exams: state.exams,
    deleteExam: state.deleteExam,
  }))

  if (openedExam) {
    return (
      <main className='mt-[4.4rem]'>
        <ExamEditor isShowing />
      </main>
    )
  }

  exams.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <main className='inner-container mt-24'>
      <div className='grid md:grid-cols-2 gap-6 '>
        {exams.map((exam, index) => (
          <ExamCard
            index={index}
            key={exam.id}
            exam={exam}
            deleteExam={() => deleteExam(exam.id)}
            isShowing
          />
        ))}
      </div>
    </main>
  )
}
