import { Combobox, Switch, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useDB, useShowLatex } from '~/db'
import { HiOutlineCheck, HiOutlineSelector } from 'react-icons/hi'
import { FORMAT_LIST } from '~/constants'
import QuestionsList from './QuestionsList'
import { generateLatex } from '~/utils/generate-latex'
import { ExamType } from 'types'
// @ts-ignore
import SyntaxHighlighter from 'react-syntax-highlighter'
import codeStyle from '~/utils/get-code-style'
import classNames from 'classnames'
import { useTranslation } from './I18nProvider'
import useOpenedExam from '~/utils/useOpenedExam'

export default function ExamEditor({ isShowing }: { isShowing: boolean }) {
  const openedExam = useOpenedExam() as any
  const { editExam, exam } = useDB((state) => ({
    exam: state.exams.find((e) => e.id === openedExam.id) as ExamType,
    editExam: (data: Partial<ExamType>) =>
      state.editExam(openedExam.id, data),
  }))
  const { showLatex } = useShowLatex((state) => ({
    showLatex: state.showLatex,
  }))
  const { t } = useTranslation()

  return (
    <Transition
      as={Fragment}
      appear={true}
      show={isShowing}
      enter='transform transition duration-[600ms]'
      enterFrom='opacity-0 translate-y-[100px]'
      enterTo='opacity-100 translate-y-0'
      leave='transform duration-200 transition ease-in-out'
      leaveFrom='opacity-100 translate-y-0'
      leaveTo='opacity-0 translate-y-[100px]'
    >
      <div
        className={classNames(
          'outer-container rounded-t-[2.5rem] min-h-[92vh] py-8 md:py-12 shadow-2xl bg-white',
        )}
      >
        {showLatex ? (
          <div className='inner-container'>
            <SyntaxHighlighter language='latex' style={codeStyle}>
              {generateLatex(exam)}
            </SyntaxHighlighter>
          </div>
        ) : (
          <div className='inner-container'>
            <div className='px-0 grid md:grid-cols-2 gap-8'>
              {/* department */}
              <div className='field'>
                <label htmlFor='departement' className='label'>
                  {t('examEditor.department.label')}
                </label>
                <input
                  type='text'
                  placeholder={t('examEditor.department.placeholder')}
                  className='input'
                  value={exam.department}
                  onChange={(e) => editExam({ department: e.target.value })}
                />
              </div>
              {/* filiere */}
              <div className='field'>
                <label htmlFor='filiere' className='label'>
                  {t('examEditor.filiere.label')}
                </label>
                <input
                  type='text'
                  id='filiere'
                  placeholder={t('examEditor.filiere.placeholder')}
                  className='input'
                  value={exam.filiere}
                  onChange={(e) => editExam({ filiere: e.target.value })}
                />
              </div>
              {/* session */}
              <div className='field'>
                <label htmlFor='session' className='label'>
                  {t('examEditor.session.label')}
                </label>
                <input
                  type='text'
                  id='session'
                  placeholder={t('examEditor.session.placeholder')}
                  className='input'
                  value={exam.session}
                  onChange={(e) => editExam({ session: e.target.value })}
                />
              </div>
              {/* module */}
              <div className='field'>
                <label htmlFor='module' className='label'>
                  {t('examEditor.module.label')}
                </label>
                <input
                  type='text'
                  id='module'
                  placeholder={t('examEditor.module.placeholder')}
                  className='input'
                  value={exam.module}
                  onChange={(e) => editExam({ module: e.target.value })}
                />
              </div>
              {/* duration */}
              <div className='field'>
                <label htmlFor='duration' className='label'>
                  {t('examEditor.duration.label')}
                </label>
                <input
                  type='text'
                  id='duration'
                  placeholder={t('examEditor.duration.placeholder')}
                  className='input'
                  value={exam.duration}
                  onChange={(e) => editExam({ duration: e.target.value })}
                />
              </div>
              <FormatField />
              <ShuffleQuestionsSwitch
                enabled={exam.shuffleQuestions}
                onChange={(enabled) => {
                  editExam({ shuffleQuestions: enabled })
                }}
              />
            </div>
            <div className='py-12'>
              <QuestionsList />
            </div>
          </div>
        )}
      </div>
    </Transition>
  )
}

const ShuffleQuestionsSwitch = ({
  enabled,
  onChange,
}: {
  enabled: boolean
  onChange: (enabled: boolean) => void
}) => {
  const { t } = useTranslation()
  return (
    <div className='flex items-center mt-3'>
      <Switch
        id='shuffle-questions-option'
        checked={enabled}
        onChange={onChange}
        className={`${enabled ? 'bg-indigo-500' : 'bg-indigo-300'}
          relative inline-flex h-[33px] w-[65px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none mr-3`}
      >
        <span className='sr-only'>{t('examEditor.shuffle.label')}</span>
        <span
          aria-hidden='true'
          className={`${enabled ? 'translate-x-8' : 'translate-x-0'}
            pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <label htmlFor='shuffle-questions-option'>
        {t('examEditor.shuffle.label')}
      </label>
    </div>
  )
}

const FormatField = () => {
  const openedExam = useOpenedExam() as any
  const { format, editExam } = useDB((state) => ({
    format: state.exams.find((e) => e.id === openedExam.id)?.format,
    editExam: state.editExam,
  }))

  const handleValueChange = (value: typeof format) => {
    editExam(openedExam.id, { format: value })
  }

  const { t } = useTranslation()

  return (
    <DropdownField
      label={t('examEditor.format.label')}
      list={FORMAT_LIST}
      value={format}
      onChange={handleValueChange}
    />
  )
}

const DropdownField = ({ label, list, value, onChange }: any) => {
  const [query, setQuery] = useState('')

  const filtredList: string[] = list.filter((item: string) =>
    item.toLowerCase().includes(query.toLowerCase()),
  )

  const { t } = useTranslation()

  return (
    <div className='field'>
      <label className='label'>{label}</label>
      <Combobox value={value} onChange={onChange}>
        <div className='relative  w-full'>
          <Combobox.Input
            className='input'
            displayValue={value}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete='none'
            placeholder={t('examEditor.format.placeholder')}
          />
          <Combobox.Button className='absolute inset-y-0 right-3 flex items-center pr-2'>
            <HiOutlineSelector
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </Combobox.Button>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-2xl bg-white border border-indigo-100 py-1 z-10 shadow-md'>
              {filtredList.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                  {t('examEditor.format.noResult')}
                </div>
              ) : (
                filtredList.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative cursor-default select-none py-3 pl-10 pr-4 transition-none ${
                        active ? 'bg-indigo-500 text-white' : 'text-gray-700'
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate transition-none ${
                            selected ? 'font-bold' : 'font-normal'
                          }`}
                        >
                          {item}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 transition-none`}
                          >
                            <HiOutlineCheck
                              className='h-5 w-5 transition-none'
                              aria-hidden='true'
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
