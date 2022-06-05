import { useParams } from 'react-router-dom'
import { useDB } from '~/db'

export default function useOpenedExam() {
  const { examId } = useParams()
  const { openedExam } = useDB((state) => ({
    openedExam: state.exams.find((e) => e.id === examId),
  }))

  return openedExam
}
