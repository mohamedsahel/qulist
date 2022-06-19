import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {
  HiCheck,
  HiOutlinePhotograph,
  HiOutlineSelector,
  HiPlus,
  HiX,
} from 'react-icons/hi'
import { QUESTION_TYPES_LIST } from '~/constants'
import { useDB } from '~/db'
import { QuestionType, QuestionTypesType } from 'types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import shortid from 'shortid'

import 'katex/dist/katex.min.css'
import ReactTextareaAutosize from 'react-textarea-autosize'
import classNames from 'classnames'
import { useTranslation } from './I18nProvider'

type ImageType = {
  path: string
  scale: number
}

export const QuestionEditor = ({
  question,
  openedExamId,
  order,
  id,
}: {
  question: QuestionType
  openedExamId: string
  order: number
  id: string
}) => {
  const { t } = useTranslation()
  const { editQuestion } = useDB((state) => ({
    editQuestion: (data: Partial<QuestionType>) =>
      state.editQuestion(openedExamId, question.id, data),
  }))

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      className='rounded-3xl overflow-hidden cursor-default outline-none'
      data-long-press-delay='1000'
      ref={setNodeRef}
      style={style}
      {...attributes}>
      <div className='flex '>
        <div
          className='flex items-center bg-indigo-500 text-white px-5  md:px-8 text-lg font-bold cursor-move'
          title='drag to reorder, double click to delete'
          {...listeners}>
          {order}
        </div>
        <div className='grid grid-cols-2 gap-6 w-full bg-indigo-50 py-4 pl-4 pr-4 sm:pr-6'>
          <div className='mr-auto'>
            <QuestionTypeSelector
              onChange={(type) => editQuestion({ type })}
              value={question.type}
            />
          </div>
          <div className='flex justify-end gap-4'>
            {question.type === 'long' ? (
              <div className='flex items-center'>
                <label htmlFor='' className='label mr-2'>
                  {t('questionEditor.lines')}
                </label>
                <input
                  type='number'
                  className='w-20 px-2 py-2 rounded-lg rounded-b-none outline-none border-b-[3px]'
                  value={question.lines}
                  min={1}
                  onChange={(e) =>
                    // @ts-ignore
                    editQuestion({ lines: e.target.value })
                  }
                  placeholder='3'
                />
              </div>
            ) : (
              <>
                <input
                  type='number'
                  className='no-arrows-input w-16 px-2 rounded-lg rounded-b-none outline-none border-b-[3px] border-green-500'
                  value={question.bareme.correctChoice}
                  onChange={(e) =>
                    editQuestion({
                      bareme: {
                        ...question.bareme,
                        // @ts-ignore
                        correctChoice: e.target.value,
                      },
                    })
                  }
                  placeholder='1'
                />
                {question.type === 'multiple_choices' &&
                  question.choices.filter((choice) => choice.correct)
                    .length > 1 && (
                    <input
                      type='number'
                      className='no-arrows-input w-16 px-2 rounded-lg rounded-b-none outline-none border-b-[3px] border-red-400'
                      value={question.bareme.wrongChoice}
                      onChange={(e) =>
                        editQuestion({
                          bareme: {
                            ...question.bareme,
                            // @ts-ignore
                            wrongChoice: e.target.value,
                          },
                        })
                      }
                      placeholder='1'
                    />
                  )}
              </>
            )}
          </div>
          {question.type === 'long' && (
            <div className='col-span-2 flex gap-5 items-center justify-end overflow-x-auto overflow-y-hidden px-[2px]'>
              {question.longBareme.map((value, index) => (
                <div className='flex items-center'>
                  <span
                    className='mr-2 p-2 cursor-pointer rounded-full select-none hover:bg-gray-200'
                    title={t('questionEditor.dragTitle')}
                    onClick={() => {
                      editQuestion({
                        longBareme: question.longBareme.filter(
                          (_, i) => i !== index
                        ),
                      })
                    }}>
                    <HiX />
                  </span>
                  <input
                    type='number'
                    className={classNames(
                      'no-arrows-input w-12 px-2 py-1 rounded-lg rounded-b-none outline-none border-b-[3px]',
                      question.longBareme.length === index + 1
                        ? 'border-green-500'
                        : 'border-red-500'
                    )}
                    value={value}
                    onChange={(e) => {
                      const newBareme = [...question.longBareme]
                      newBareme[index] = e.target.value
                      editQuestion({
                        longBareme: newBareme,
                      })
                    }}
                    placeholder='1'
                  />
                </div>
              ))}
              {question.longBareme.length < 5 && (
                <button
                  className='bg-indigo-500 text-white p-2 rounded-lg hover:scale-105'
                  onClick={() => {
                    editQuestion({
                      longBareme: [
                        ...question.longBareme,
                        String(
                          +question.longBareme[
                            question.longBareme.length - 1
                          ] + 0.5 || 0
                        ),
                      ],
                    })
                  }}>
                  <HiPlus />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='p-5 md:p-8 border-2 border-indigo-100 bg-white border-t-0 rounded-b-3xl'>
        <ReactTextareaAutosize
          className='outline-none cursor-text text-lg w-full overflow-hidden resize-none'
          placeholder={t('questionEditor.questionPlaceholder')}
          onChange={(e) =>
            editQuestion({
              question: [e.target.value, question.question[1]],
            })
          }
          value={question.question[0]}
          maxRows={100}
          autoFocus
          autoCorrect='off'
        />
        <ImageField
          image={question.question[1] as ImageType}
          onChange={(newImage) =>
            editQuestion({
              question: [question.question[0], newImage],
            })
          }
        />
        {question.type === 'long' ? <div className='-mt-8' /> : (
          <div className='text-lg'>
            {question.type === 'multiple_choices' ? (
              <>
                <div className='grid'>
                  {question.choices.map((choice, index) => (
                    <div className='flex items-start mb-5' key={choice.id}>
                      <input
                        type='checkbox'
                        className='w-5 h-5 accent-indigo-500 mr-4 mt-1'
                        checked={choice.correct}
                        onChange={(e) => {
                          editQuestion({
                            choices: question.choices.map((c) =>
                              c.id === choice.id
                                ? { ...c, correct: e.target.checked }
                                : c
                            ),
                          })
                        }}
                      />
                      <ReactTextareaAutosize
                        className='outline-none cursor-text text-lg w-full max-w-full overflow-hidden resize-none'
                        placeholder={t(
                          'questionEditor.choicePlaceholder',
                          { index: index + 1 }
                        )}
                        value={choice.value}
                        onChange={(e) =>
                          editQuestion({
                            choices: question.choices.map((c) =>
                              c.id === choice.id
                                ? {
                                    ...c,
                                    value: e.target.value,
                                  }
                                : c
                            ),
                          })
                        }
                        maxRows={100}
                        autoFocus
                        autoCorrect='off'
                      />

                      <button
                        className='rounded-full hover:bg-gray-200 p-2 cursor-pointer -mt-2 ml-3'
                        onClick={() =>
                          editQuestion({
                            choices: question.choices.filter(
                              (c) => c.id !== choice.id
                            ),
                          })
                        }>
                        <HiX className='text-lg text-gray-600' />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  className='flex items-center rounded-full text-sm py-2 px-4  bg-indigo-100 text-gray-700 hover:scale-105'
                  onClick={() =>
                    editQuestion({
                      choices: [
                        ...question.choices,
                        {
                          id: shortid.generate(),
                          value: '',
                          correct: false,
                        },
                      ],
                    })
                  }>
                  <HiPlus className='mr-2 text-gray-600' />{' '}
                  {t('questionEditor.addChoice')}
                </button>
              </>
            ) : (
              <>
                <div className='grid gap-4'>
                  {[true, false].map((bool) => (
                    <div className='flex items-center' key={+bool}>
                      <input
                        id={'choice-' + question.id + '-' + bool}
                        type='radio'
                        className='w-5 h-5 accent-indigo-500 mr-4'
                        checked={question.true === bool}
                        onChange={() => {
                          editQuestion({
                            true: bool,
                          })
                        }}
                      />
                      <label
                        htmlFor={
                          'choice-' + question.id + '-' + bool
                        }>
                        {bool
                          ? t('questionEditor.true')
                          : t('questionEditor.false')}
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const QuestionTypeSelector = ({
  onChange,
  value,
}: {
  onChange: (typeId: QuestionTypesType) => void
  value: QuestionTypesType
}) => {
  const selected =
    QUESTION_TYPES_LIST.find((q) => q.id === value) ||
    QUESTION_TYPES_LIST[0]

  return (
    <div className='inline-block relative hover:bg-indigo-100 rounded-full'>
      <Listbox
        value={value}
        onChange={(selected) => onChange(selected)}>
        <div className='relative'>
          <Listbox.Button className='relative inline-flex items-center px-3 py-2 text-gray-700'>
            <span className='block truncate'>{selected.value}</span>
            <HiOutlineSelector
              className='h-5 w-5 ml-2'
              aria-hidden={'true'}
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Listbox.Options className='absolute -top-3 max-h-60  overflow-auto rounded-2xl bg-white border border-indigo-100 py-1  shadow-lg'>
              {QUESTION_TYPES_LIST.map((qType) => (
                <Listbox.Option
                  key={qType.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-6 ${
                      active ? 'bg-indigo-50' : 'text-gray-700'
                    }`
                  }
                  value={qType.id}>
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}>
                        {qType.value}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700'>
                          <HiCheck
                            className='h-5 w-5'
                            aria-hidden='true'
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

const ImageField = ({
  image,
  onChange,
}: {
  image: ImageType
  onChange: (newImg: ImageType) => void
}) => {
  const [opened, setOpened] = useState(image.path ? true : false)
  const { t } = useTranslation()
  const handleOpen = () => {
    setOpened(true)
    onChange({
      path: '',
      scale: 1,
    })
  }
  const handleClose = () => {
    setOpened(false)
    onChange({
      path: '',
      scale: 1,
    })
  }

  return (
    <div
      className={classNames(
        'flex mb-5 py-3 transition-none',
        opened &&
          'items-center px-4 mt-4 mb-8 rounded-md bg-indigo-50'
      )}>
      {opened ? (
        <div className='flex items-center w-full flex-wrap gap-6'>
          <input
            type='text'
            placeholder={t('questionEditor.ImagePlaceholder')}
            className={classNames(
              'px-4 py-2 rounded-lg rounded-b-none outline-none border-b-[3px] border-indigo-400 w-full sm:w-auto'
            )}
            onChange={(e) =>
              onChange({ ...image, path: e.target.value })
            }
            value={image.path}
            autoFocus
          />
          <label className=''>
            {t('questionEditor.ImageScaleLabel')}
            <input
              type='number'
              placeholder='1'
              className={classNames(
                'no-arrows-input w-14 ml-2 px-3 py-2 rounded-lg rounded-b-none outline-none border-b-[3px] border-indigo-400'
              )}
              value={image.scale}
              onChange={(e) =>
                onChange({ ...image, scale: +e.target.value })
              }
            />
          </label>
          <HiX
            onClick={handleClose}
            className='text-xl cursor-pointer text-gray-500 hover:scale-105 hover:text-gray-600 ml-auto mr-1'
          />
        </div>
      ) : (
        <HiOutlinePhotograph
          onClick={handleOpen}
          className='text-2xl cursor-pointer text-gray-500 hover:scale-105 hover:text-gray-600'
        />
      )}
    </div>
  )
}
