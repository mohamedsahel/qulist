import Head from 'next/head'
import ExamEditor from '~/components/ExamEditor'
import LatexManual from '~/components/LatexManual'
import useOpenedExam from '~/utils/useOpenedExam'

export default function ExamId(): JSX.Element {
  const openedExam = useOpenedExam()

  if (!openedExam) {
    return <div>loading...</div>
  }

  return (
    <main className='mt-[3.7rem]'>
      <Head>
        <title>{`${openedExam.module} - ${openedExam.session}`}</title>
      </Head>
      <LatexManual />
      <ExamEditor isShowing />
    </main>
  )
}
