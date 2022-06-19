import { ExamType } from 'types'
import { AiOutlineDelete } from 'react-icons/ai'
import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { formatDistance } from 'date-fns'
import classNames from 'classnames'
import { useTranslation } from './I18nProvider'
import * as locales from 'date-fns/locale'
import Link from 'next/link'
import { HiOutlineDocumentDownload } from 'react-icons/hi'
import { download } from '~/utils/download'

export default function ExamCard({
  exam,
  deleteExam,
  isShowing,
  index,
}: {
  exam: ExamType
  deleteExam: () => void
  isShowing: boolean
  index: number
}) {
  const { t, language } = useTranslation()
  // @ts-ignore
  const locale = locales[language]

  const handleExamDeleteStart = () => {
    if (confirm(t('examCard.deleteConfirmation'))) {
      deleteExam()
    }
  }

  const exportExam = () => {
    download(
      `${exam?.module}-exam.json`,
      JSON.stringify(exam, null, 2)
    )
  }

  return (
    <Transition
      as={Fragment}
      appear={true}
      show={isShowing}
      enter={`transform transition duration-[${
        600 + index * 800
      }ms] delay-300`}
      enterFrom={`opacity-0 translate-y-[40px]`}
      enterTo={`opacity-100 translate-y-0`}
      leave='transform duration-200 transition ease-in-out'
      leaveFrom={`opacity-100 translate-y-0`}
      leaveTo={`opacity-0 translate-y-[40px]`}>
      <div className='bg-white rounded-2xl px-6 py-5 duration-300 shadow-md'>
        <div className=''>
          <Link href={'/exam/' + exam.id}>
            <div className='cursor-pointer hover:text-indigo-600'>
              <h1 className='text-xl font-medium'>
                {t('examCard.title', { module: exam.module })}
              </h1>
              <span className='text-gray-600'>
                {formatDistance(
                  new Date(exam.createdAt),
                  new Date(),
                  {
                    addSuffix: true,
                    locale,
                  }
                )}
              </span>
            </div>
          </Link>

          <div className='mt-12 flex justify-between'>
            <span className='text-gray-900 font-medium'>
              {t('examCard.questions', {
                count: exam.questions.length,
              })}
            </span>

            <button
              className={classNames(
                'rounded-full hover:bg-indigo-50 p-3 cursor-pointer -mt-2 ml-auto'
              )}
              onClick={exportExam}>
              <HiOutlineDocumentDownload
                className='text-xl text-gray-600'
                title={'Export Exam'}
              />
            </button>
            <button
              className={classNames(
                'rounded-full hover:bg-red-100 p-3 cursor-pointer -mt-2 ml-2'
              )}
              onClick={handleExamDeleteStart}>
              <AiOutlineDelete className='text-xl text-red-600' />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  )
}
