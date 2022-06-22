import classNames from 'classnames'
import { createElement, useEffect, useRef, useState } from 'react'
import {
  HiOutlineDuplicate,
  HiOutlinePlus,
  HiX,
} from 'react-icons/hi'
import { TbMathFunction } from 'react-icons/tb'
import Latex from 'react-latex-next'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
  // @ts-ignore
} from 'body-scroll-lock'
import { useTranslation } from './I18nProvider'
import { LATEX_MATH_EXPRESSIONS } from '~/constants'

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

export default function LatexManual() {
  const [isShowing, setIsShowing] = useState(false)
  const [value, setValue] = useState('')
  const manualContainerRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (isShowing) {
      disableBodyScroll(manualContainerRef?.current)
    } else {
      enableBodyScroll(manualContainerRef?.current)
    }

    return () => clearAllBodyScrollLocks()
  }, [isShowing])

  return (
    <>
      {isShowing && (
        <div
          className='fixed inset-0 bg-black bg-opacity-30 z-10 backdrop-blur-sm'
          onClick={() => setIsShowing(false)}
        />
      )}

      <div
        ref={manualContainerRef}
        className={classNames(
          'fixed right-0 top-12 bottom-3 z-10 border rounded-lg shadow-lg bg-white',
          isShowing
            ? 'translate-x-0  duration-200'
            : 'translate-x-full  duration-300'
        )}>
        <button
          onClick={() => setIsShowing((isShowing) => !isShowing)}
          className={classNames(
            'absolute  z-10 top-10 right-auto -left-[2.8rem]  py-2 px-3 rounded-full border  border-r-0 rounded-r-none bg-white outline-none',
            isShowing && '-top-11 left-1 rounded-r-full px-3'
          )}>
          {createElement(isShowing ? HiX : TbMathFunction, {
            className: 'text-xl',
          })}
        </button>
        <div className='w-screen max-w-[500px] bg-white h-full overflow-scroll rounded-lg'>
          <div className='sticky top-0 w-full pb-4 bg-white shadow-sm z-10 p-2'>
            <div className='flex items-center justify-between border-b-2 border-b-indigo-500'>
              <span>$</span>
              <input
                type='text'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className='py-2 px-1 w-full  outline-none font-mono'
                placeholder='e.g. \frac{a}{b}'
                autoFocus
              />
              <span>$</span>
            </div>
            <div className='mt-8 text-lg'>
              <Latex>{value ? '$' + value + '$' : ''}</Latex>
            </div>
            <button
              className='flex items-center justify-center w-full mt-8 bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-50 rounded-md py-1'
              onClick={() =>
                copyToClipboard(value ? '$' + value + '$' : '')
              }>
              <HiOutlineDuplicate className='text-lg text-gray-700 mr-2' />
              {t('latexManual.copy')}
            </button>
          </div>
          <div>
            <table className='w-full border rounded-lg overflow-scroll'>
              {LATEX_MATH_EXPRESSIONS.map((expression, index) => (
                <tr
                  className={classNames(
                    'w-full',
                    index % 2 !== 0 && 'bg-gray-50'
                  )}
                  key={index}>
                  <td className='p-4 text-lg'>
                    <Latex>{'$' + expression + '$'}</Latex>
                  </td>
                  <td
                    className={classNames(
                      ' p-4 text-gray-800 font-mono text-ellipsis'
                    )}>
                    {expression}
                  </td>
                  <td
                    className={classNames(
                      'text-right  text-gray-800 pr-2'
                    )}>
                    <button
                      onClick={() => setValue(value + expression)}
                      className='text-sm bg-indigo-50 p-1 rounded-full hover:bg-indigo-100'>
                      <HiOutlinePlus />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
              <a
                href='/latex-manual.pdf'
                target='_blank'
                className='text-blue-600 font-medium px-4'>
                more
              </a>
          </div>
        </div>
      </div>
    </>
  )
}
