import { useDB } from '~/db'
import ExamCard from '~/components/ExamCard'
import useNewExam from '~/utils/useNewExam'
import { useTranslation } from '~/components/I18nProvider'
import { HiOutlineDocumentDownload } from 'react-icons/hi'
import ImportExamButton from '~/components/ImportExamButton'
import { useEffect, useState } from 'react'

export default function Home(): JSX.Element {
  const { exams, deleteExam } = useDB((state) => ({
    exams: state.exams,
    deleteExam: state.deleteExam,
  }))

  exams.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  )

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [exams.length])

  return (
    <main className='inner-container my-24'>
      {mounted && exams.length === 0 ? (
        <EmptyState />
      ) : (
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
      )}
    </main>
  )
}

const EmptyState = () => {
  const { t } = useTranslation()
  const newExam = useNewExam()

  return (
    <div className='text-center py-20 mt-12  rounded-xl px-6 bg-white bg-opacity-5 text-white'>
      <p className='text-2xl font-medium'>{t('emptyState.title')}</p>
      <p className='text-lg pt-3 font-normal text-gray-100'>
        {t('emptyState.description')}
      </p>
      <div className='flex flex-col sm:flex-row  gap-4 items-center justify-center mt-12'>
        <button
          className='rounded-full text-gray-800 bg-white py-3 px-6 hover:scale-105'
          onClick={() => newExam()}>
          {t('header.newExam')}
        </button>
        <span className='text-gray-200'>
          {t('emptyState.or')}
        </span>

        <ImportExamButton className='flex py-3 px-6 bg-white bg-opacity-10 rounded-md hover:bg-opacity-20 cursor-pointer'>
          <HiOutlineDocumentDownload
            className='rotate-180 mr-2 transition-none text-2xl text-gray-100'
            title={'upload exam'}
          />
          {t('emptyState.importExam')}
        </ImportExamButton>
      </div>
    </div>
  )
}
