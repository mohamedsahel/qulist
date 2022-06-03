import { Combobox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useDB } from '~/db'
import { useOpenedExam } from './OpenedExamProvider'
import { HiOutlineCheck, HiOutlineSelector } from 'react-icons/hi'
import {
  DEPARTEMENT_LIST,
  DURATION_LIST,
  FILIERES_LIST,
  FORMAT_LIST,
  MODULE_LIST,
  SESSION_LIST,
} from '~/constants'
import QuestionsList from './QuestionsList'
import { generateLatex } from '~/utils/generate-latex'
import { ExamType } from 'types'
// @ts-ignore
import SyntaxHighlighter from 'react-syntax-highlighter'
import codeStyle from '~/utils/get-code-style'
import classNames from 'classnames'

export default function ExamEditor({
  isShowing,
}: {
  isShowing: boolean
}) {
  const { showLatex, openedExamId } = useOpenedExam() as any
  const { exam } = useDB((state) => ({
    exam: state.exams.find((e) => e.id === openedExamId),
  })) as { exam: ExamType }

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
      leaveTo='opacity-0 translate-y-[100px]'>
      <div
        className={classNames(
          'outer-container rounded-t-[2.5rem] min-h-[90vh] py-8 lg:py-12 shadow-2xl bg-white'
        )}>
        {showLatex ? (
          <div className='inner-container'>
            <SyntaxHighlighter language='latex' style={codeStyle}>
              {generateLatex(exam)}
            </SyntaxHighlighter>
          </div>
        ) : (
          <div className='inner-container'>
            <div className='px-0 grid md:grid-cols-2 gap-8'>
              <DepartmentField />
              <FiliereField />
              <ModuleField />
              <SessionField />
              <DurationField />
              <FormatField />
            </div>
            <div className='py-24'>
              <QuestionsList />
            </div>
          </div>
        )}
      </div>
    </Transition>
  )
}

const ModuleField = () => {
  const { openedExamId } = useOpenedExam() as any
  const { module, editExam } = useDB((state) => ({
    module: state.exams.find((e) => e.id === openedExamId)?.module,
    editExam: state.editExam,
  }))

  const handleValueChange = (value: typeof module) => {
    editExam(openedExamId, { module: value })
  }

  return (
    <DropdownField
      label='Module'
      list={MODULE_LIST}
      value={module}
      onChange={handleValueChange}
    />
  )
}

const SessionField = () => {
  const { openedExamId } = useOpenedExam() as any
  const { session, editExam } = useDB((state) => ({
    session: state.exams.find((e) => e.id === openedExamId)?.session,
    editExam: state.editExam,
  }))

  const handleValueChange = (value: typeof session) => {
    editExam(openedExamId, { session: value })
  }

  return (
    <DropdownField
      label='Session'
      list={SESSION_LIST}
      value={session}
      onChange={handleValueChange}
    />
  )
}

const DepartmentField = () => {
  const { openedExamId } = useOpenedExam() as any
  const { department, editExam } = useDB((state) => ({
    department: state.exams.find((e) => e.id === openedExamId)
      ?.department,
    editExam: state.editExam,
  }))

  const handleValueChange = (value: string) => {
    editExam(openedExamId, { department: value })
  }

  return (
    <DropdownField
      label='Department'
      list={DEPARTEMENT_LIST}
      value={department}
      onChange={handleValueChange}
    />
  )
}

const FiliereField = () => {
  const { openedExamId } = useOpenedExam() as any
  const { filiere, editExam } = useDB((state) => ({
    filiere: state.exams.find((e) => e.id === openedExamId)?.filiere,
    editExam: state.editExam,
  }))

  const handleValueChange = (value: typeof filiere) => {
    editExam(openedExamId, { filiere: value })
  }

  return (
    <DropdownField
      label='Filiere'
      list={FILIERES_LIST}
      value={filiere}
      onChange={handleValueChange}
    />
  )
}

const DurationField = () => {
  const { openedExamId } = useOpenedExam() as any
  const { duration, editExam } = useDB((state) => ({
    duration: state.exams.find((e) => e.id === openedExamId)
      ?.duration,
    editExam: state.editExam,
  }))

  const handleValueChange = (value: typeof duration) => {
    editExam(openedExamId, { duration: value })
  }

  return (
    <DropdownField
      label='Duration'
      list={DURATION_LIST}
      value={duration}
      onChange={handleValueChange}
    />
  )
}

const FormatField = () => {
  const { openedExamId } = useOpenedExam() as any
  const { format, editExam } = useDB((state) => ({
    format: state.exams.find((e) => e.id === openedExamId)?.format,
    editExam: state.editExam,
  }))

  const handleValueChange = (value: typeof format) => {
    editExam(openedExamId, { format: value })
  }

  return (
    <DropdownField
      label='Format'
      list={FORMAT_LIST}
      value={format}
      onChange={handleValueChange}
    />
  )
}

const DropdownField = ({ label, list, value, onChange }: any) => {
  const [query, setQuery] = useState('')

  const filtredList: string[] = list.filter((item: string) =>
    item.toLowerCase().includes(query.toLowerCase())
  )

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
            placeholder='Select country'
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
            afterLeave={() => setQuery('')}>
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-2xl bg-white border border-indigo-100 py-1 z-10 shadow-md'>
              {filtredList.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                  No {label} found
                </div>
              ) : (
                filtredList.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative cursor-default select-none py-3 pl-10 pr-4 transition-none ${
                        active
                          ? 'bg-indigo-500 text-white'
                          : 'text-gray-700'
                      }`
                    }
                    value={item}>
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate transition-none ${
                            selected ? 'font-bold' : 'font-normal'
                          }`}>
                          {item}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 transition-none`}>
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
