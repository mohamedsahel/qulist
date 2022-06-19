import {
  HiOutlineDocumentDownload,
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi'
import { useDB, useShowLatex } from '~/db'
import { download } from '~/utils/download'
import { generateLatex } from '~/utils/generate-latex'
import { useTranslation } from './I18nProvider'
import LangSwitcher from './LangSwitcher'
import useOpenedExam from '~/utils/useOpenedExam'
import useNewExam from '~/utils/useNewExam'
import Link from 'next/link'
import classNames from 'classnames'
import ImportExamButton from './ImportExamButton'

export default function Header(): JSX.Element {
  const openedExam = useOpenedExam()
  const { showLatex, toggleShowLatex } = useShowLatex((state) => ({
    showLatex: state.showLatex,
    toggleShowLatex: state.toggleShowLatex,
  }))
  const { t } = useTranslation()
  const newExam = useNewExam()

  const { exam, examsLength } = useDB((state) => ({
    exam: state.exams.find((e) => e.id === openedExam?.id),
    examsLength: state.exams.length,
  }))

  const HideIcon = showLatex ? HiOutlineEyeOff : HiOutlineEye

  const exportExam = () => {
    download(
      `${exam?.module} - ${exam?.session} _export_.json`,
      JSON.stringify(exam, null, 2)
    )
  }

  return (
    <header className='fixed bg-indigo-500 backdrop-blur-md bg-opacity-80 z-10 inset-x-0 top-0'>
      <div className='py-2 inner-container max-w-screen-lg flex items-center justify-between relative'>
        <div
          className={classNames(
            'flex items-center gap-3',
            examsLength === 0 && 'py-3'
          )}>
          <Link href='/'>
            <img
              src='/images/logo.svg'
              alt='Logo'
              className='cursor-pointer'
            />
          </Link>
          <LangSwitcher />
        </div>

        {examsLength === 0 ? null : openedExam ? (
          <div className='flex items-center gap-6'>
            <HideIcon
              className='text-2xl text-gray-100 cursor-pointer'
              onClick={toggleShowLatex}
              title={
                showLatex
                  ? t('header.hideLatex')
                  : t('header.showLatex')
              }
            />
            <HiOutlineDocumentDownload
              className='text-2xl text-gray-100 cursor-pointer'
              onClick={exportExam}
              title={t('header.exportExam')}
            />
            <button
              className='flex items-center rounded-full bg-white py-3 px-5 hover:scale-105 select-none'
              onClick={() =>
                download(
                  `${exam?.module} - ${exam?.session}.tex`,
                  generateLatex(exam as any)
                )
              }>
              <HiOutlineDownload className='text-xl' />
              <span className='pl-2 hidden sm:block'>
                {t('header.download')}
              </span>
            </button>
          </div>
        ) : (
          <div className='flex items-center gap-5'>
            <ImportExamButton className='cursor-pointer '>
              <HiOutlineDocumentDownload
                className='rotate-180 mr-2 transition-none text-2xl text-gray-100 hover:scale-105'
                title={t('header.importExam')}
              />
            </ImportExamButton>
            <button
              className='rounded-full bg-white py-3 px-6 hover:scale-105'
              onClick={() => newExam()}>
              {t('header.newExam')}
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
