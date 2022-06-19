import { useRouter } from 'next/router'
import { ExamType } from 'types'
import { useDB } from '~/db'
import { getSampleExam } from '.'

export default function useNewExam() {
  const { newExam } = useDB((state) => ({
    newExam: state.newExam,
  }))
  const router = useRouter()

  return (exam?: ExamType) => {
    let theExam = typeof exam === 'object' ? exam : getSampleExam()

    newExam(theExam)
    router.push('/exam/' + theExam.id)
  }
}
