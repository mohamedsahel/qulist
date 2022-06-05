import { useNavigate } from 'react-router-dom'
import { useDB } from '~/db'
import { getSampleExam } from '.'

export default function useNewExam() {
  const { newExam } = useDB((state) => ({
    newExam: state.newExam,
  }))
  const navigate = useNavigate()

  return (examId?: string) => {
    const exam = getSampleExam()

    if (examId) {
      exam.id = examId
    }

    newExam(exam)
    navigate('/exam/' + exam.id)
  }
}
