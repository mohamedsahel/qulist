import { useRouter } from 'next/router'
import { useDB } from '~/db'

export default function useOpenedExam() {
  const query = useRouter().query
  const { examId } = query
  const { openedExam } = useDB((state) => ({
    openedExam: state.exams.find((e) => e.id === examId),
  }))

  return openedExam
}
