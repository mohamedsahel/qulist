import { useDB } from '~/db'
import ExamCard from '~/components/ExamCard'
import { useEffect } from 'react'
import useNewExam from '~/utils/useNewExam'

export default function Home(): JSX.Element {
  const { exams, deleteExam } = useDB((state) => ({
    exams: state.exams,
    deleteExam: state.deleteExam,
  }))
  const newExam = useNewExam()

  useEffect(() => {
    if (exams.length === 0) {
      newExam()
    }
  }, [exams.length])

  exams.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <main className='inner-container my-24'>
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
