import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi'
import { useDB } from 'src/db'
import { getNewExam } from 'src/utils'
import { download } from 'src/utils/download'
import { generateLatex } from 'src/utils/generate-latex'
import Modal from './Modal'
import { useOpenedExam } from './OpenedExamProvider'

export default function Header(): JSX.Element {
  const { push } = useRouter()
  const openedExam = useOpenedExam()

  const { newExam, exam } = useDB((state) => ({
    newExam: state.newExam,
    exam: state.exams.find((e) => e.id === openedExam?.openedExamId),
  }))

  const handleNewExam = () => {
    const exam = getNewExam()
    newExam(exam)
    push('?exam=' + exam.id)
  }

  const HideIcon = openedExam?.showLatex
    ? HiOutlineEyeOff
    : HiOutlineEye

  return (
    <header className='fixed bg-indigo-500 backdrop-blur-md bg-opacity-80 z-10 inset-x-0 top-0'>
      <div className='py-2 inner-container max-w-screen-lg flex items-center justify-between relative'>
        <Link href='/' passHref>
          <img
            src='/images/logo.svg'
            alt='Logo'
            className='cursor-pointer'
          />
        </Link>

        {openedExam ? (
          <div className='flex items-center gap-6'>
            <LatexEditorModal className='absolute left-1/2 -translate-x-[65%]' />
            <HideIcon
              className='text-2xl text-gray-100 cursor-pointer'
              onClick={() =>
                openedExam.setShowLatex(!openedExam.showLatex)
              }
              title={
                openedExam?.showLatex ? 'Hide Latex' : 'Show Latex'
              }
            />
            <button
              className='flex items-center rounded-full bg-white py-3 px-5 hover:scale-105 select-none'
              onClick={() =>
                download(
                  `${exam?.module} - ${exam?.session} exam.tex`,
                  generateLatex(exam as any)
                )
              }>
              <HiOutlineDownload className='text-xl' />
              <span className='pl-2 hidden sm:block'>Download</span>
            </button>
          </div>
        ) : (
          <button
            className='rounded-full bg-white py-3 px-6 hover:scale-105'
            onClick={handleNewExam}>
            New Exam
          </button>
        )}
      </div>
    </header>
  )
}

const LatexEditorModal = ({ className }: { className: string }) => {
  return (
    <Modal
      button={
        <button className={classNames('rounded-lg bg-black bg-opacity-25 py-2 px-5 hover:bg-opacity-30 select-none text-white', className)}>
          open
        </button>
      }>
      {({ closeModal }: any) => (
        <div>
          <button onClick={closeModal}>close</button>
        </div>
      )}
    </Modal>
  )
}
