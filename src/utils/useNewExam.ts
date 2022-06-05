import { useRouter } from 'next/router'
import { useDB } from '~/db'
import { getSampleExam } from '.'

export default function useNewExam() {
  const { newExam } = useDB((state) => ({
    newExam: state.newExam,
  }))
  const router = useRouter()

  return (examId?: string) => {
    const exam = getSampleExam()

    if (examId) {
      exam.id = examId
    }

    newExam(exam)
    router.push('/exam/' + exam.id)
  }
}
