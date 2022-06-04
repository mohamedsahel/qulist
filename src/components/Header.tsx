import {
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { useDB } from '~/db'
import { download } from '~/utils/download'
import { generateLatex } from '~/utils/generate-latex'
import { getSampleExam } from '~/utils'
import { useOpenedExam } from './OpenedExamProvider'
import { useTranslation } from './I18nProvider'
import LangSwitcher from './LangSwitcher'

export default function Header(): JSX.Element {
  const navigate = useNavigate()
  const openedExam = useOpenedExam()
  const { t } = useTranslation()

  const { newExam, exam } = useDB((state) => ({
    newExam: state.newExam,
    exam: state.exams.find((e) => e.id === openedExam?.openedExamId),
  }))

  const handleNewExam = () => {
    const exam = getSampleExam()
    newExam(exam)
    navigate('?exam=' + exam.id)
  }

  const HideIcon = openedExam?.showLatex ? HiOutlineEyeOff : HiOutlineEye

  return (
    <header className='fixed bg-indigo-500 backdrop-blur-md bg-opacity-80 z-10 inset-x-0 top-0'>
      <div className='py-2 inner-container max-w-screen-lg flex items-center justify-between relative'>
        <div className='flex items-center gap-3'>
          <Link to='/'>
            <img src='/images/logo.svg' alt='Logo' className='cursor-pointer' />
          </Link>
          <LangSwitcher />
        </div>

        {openedExam ? (
          <div className='flex items-center gap-6'>
            <HideIcon
              className='text-2xl text-gray-100 cursor-pointer'
              onClick={() => openedExam.setShowLatex(!openedExam.showLatex)}
              title={
                openedExam?.showLatex
                  ? t('header.hideLatex')
                  : t('header.showLatex')
              }
            />
            <button
              className='flex items-center rounded-full bg-white py-3 px-5 hover:scale-105 select-none'
              onClick={() =>
                download(
                  `${exam?.module} - ${exam?.session} exam.tex`,
                  generateLatex(exam as any),
                )
              }
            >
              <HiOutlineDownload className='text-xl' />
              <span className='pl-2 hidden sm:block'>
                {t('header.download')}
              </span>
            </button>
          </div>
        ) : (
          <button
            className='rounded-full bg-white py-3 px-6 hover:scale-105'
            onClick={handleNewExam}
          >
            {t('header.newExam')}
          </button>
        )}
      </div>
    </header>
  )
}
