import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { HiCheck, HiOutlineSelector, HiPlus, HiX } from 'react-icons/hi'
import { LONG_BAREME_COLORS, QUESTION_TYPES_LIST } from '~/constants'
import { useDB } from '~/db'
import { getNewQuestion, getNextLongDegree } from '~/utils'
import { ExamType, QuestionType, QuestionTypesType } from 'types'
import { useOpenedExam } from './OpenedExamProvider'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import shortid from 'shortid'

import 'katex/dist/katex.min.css'
import classNames from 'classnames'

export default function QuestionsList() {
  const { openedExamId } = useOpenedExam() as any
  const { questions, addQuestion, editExam } = useDB((state) => ({
    questions: state.exams.find((e) => e.id === openedExamId)?.questions || [],
    addQuestion: () => state.addQuestion(openedExamId, getNewQuestion()),
    editExam: (data: Partial<ExamType>) => state.editExam(openedExamId, data),
  }))

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: any) {
    const { active, over } = event
    console.log('event :>> ', event)

    if (active.id !== over.id) {
      const oldIndex = questions.findIndex(({ id }) => active.id === id)
      const newIndex = questions.findIndex(({ id }) => over.id === id)

      editExam({
        questions: arrayMove(questions as any, oldIndex, newIndex),
      })
    }
  }

  return (
    <div className='grid gap-10'>
      {!questions.length ? null : (
        <div className='grid gap-10'>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={questions}
              strategy={verticalListSortingStrategy}
            >
              {questions.map((q, index) => (
                <QuestionEditor
                  key={q.id}
                  question={q}
                  openedExamId={openedExamId}
                  order={index + 1}
                  id={q.id}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}

      <button
        className='mx-auto rounded-full py-3 px-6 mt-10 bg-indigo-500 text-white hover:scale-105'
        onClick={addQuestion}
      >
        + Add Question
      </button>
    </div>
  )
}

const ContentEditable = ({
  className,
  placeholder,
  onChange,
  value,
}: {
  className?: string
  placeholder?: string
  onChange: (value: string) => void
  value?: string
}) => {
  return (
    <div
      className={classNames('outline-none cursor-text', className)}
      onInput={(e: any) => onChange(e.currentTarget.textContent || '')}
      data-ph={placeholder}
      contentEditable
      autoCorrect='off'
      // defaultValue={value}
      // @ts-ignore
      html={value}
    />
  )
}

const QuestionEditor = ({
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
  const { editQuestion, deleteQuestion } = useDB((state) => ({
    editQuestion: (data: Partial<QuestionType>) =>
      state.editQuestion(openedExamId, question.id, data),
    deleteQuestion: () => state.deleteQuestion(openedExamId, question.id),
  }))
  const nextLongDegree = getNextLongDegree(Object.keys(question.longBareme))

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleQuestionDeleteStart = () => {
    if (confirm('Are you sure you want to delete this question?')) {
      deleteQuestion()
    }
  }

  return (
    <div
      className='rounded-3xl overflow-hidden cursor-default'
      data-long-press-delay='1000'
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div className='flex '>
        <div
          className='flex items-center bg-indigo-500 text-white px-5  md:px-8 text-lg font-bold cursor-move'
          title='drag to reorder, double click to delete'
          onDoubleClick={handleQuestionDeleteStart}
          {...listeners}
        >
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
                  Lines
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
                {question.type === 'multiple_choices' && (
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
            <div className='col-span-2 flex gap-6 items-center justify-end overflow-auto px-[2px]'>
              {Object.entries(question.longBareme).map(([degree, value]) => (
                <div className=''>
                  <label
                    className='mr-2 label font-bold select-none'
                    title='double click to remove'
                    style={{
                      color: LONG_BAREME_COLORS[degree],
                    }}
                    onDoubleClick={() => {
                      delete question.longBareme[degree]
                      editQuestion({
                        longBareme: {
                          ...question.longBareme,
                        },
                      })
                    }}
                  >
                    {degree}
                  </label>
                  <input
                    type='number'
                    className='no-arrows-input w-12 px-2 py-1 rounded-lg rounded-b-none outline-none border-b-[3px]'
                    value={value}
                    onChange={(e) =>
                      editQuestion({
                        // @ts-ignore
                        longBareme: {
                          ...question.longBareme,
                          // @ts-ignore
                          [degree]: e.target.value,
                        },
                      })
                    }
                    placeholder='1'
                    style={{
                      borderColor: LONG_BAREME_COLORS[degree],
                    }}
                  />
                </div>
              ))}
              {nextLongDegree && (
                <button
                  className='bg-indigo-500 text-white p-2 rounded-lg hover:scale-105'
                  onClick={() =>
                    editQuestion({
                      longBareme: {
                        ...question.longBareme,
                        [nextLongDegree]: 0,
                      },
                    })
                  }
                >
                  <HiPlus />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='p-5 md:p-8 border-2 border-indigo-100 bg-white border-t-0 rounded-b-3xl'>
        <ContentEditable
          className='outline-none cursor-text text-lg'
          placeholder='type question'
          onChange={(value) =>
            editQuestion({
              question: value,
            })
          }
          value={question.question}
        />
        {question.type === 'long' ? null : (
          <div className='mt-7 text-lg'>
            {question.type === 'multiple_choices' ? (
              <>
                <div className='grid gap-4'>
                  {question.choices.map((choice, index) => (
                    <div className='flex items-start' key={choice.id}>
                      <input
                        type='checkbox'
                        className='w-5 h-5 accent-indigo-500 mr-4 mt-1'
                        checked={choice.correct}
                        onChange={(e) => {
                          editQuestion({
                            choices: question.choices.map((c, i) =>
                              c.id === choice.id
                                ? { ...c, correct: e.target.checked }
                                : c,
                            ),
                          })
                        }}
                      />
                      <input
                        className='w-full max-w-full outline-none'
                        placeholder={'Choice #' + (index + 1)}
                        value={choice.value}
                        onChange={(e) =>
                          editQuestion({
                            choices: question.choices.map((c, i) =>
                              c.id === choice.id
                                ? {
                                    ...c,
                                    value: e.target.value,
                                  }
                                : c,
                            ),
                          })
                        }
                      />
                      {/* <ContentEditable
                        className='w-full max-w-full'
                        placeholder={'Choice #' + (index + 1)}
                        value={choice.value}
                        onChange={(value) =>
                          editQuestion({
                            choices: question.choices.map((c, i) =>
                              c.id === choice.id
                                ? {
                                    ...c,
                                    value: value,
                                  }
                                : c
                            ),
                          })
                        }
                      /> */}
                      <button
                        className='rounded-full hover:bg-gray-200 p-2 cursor-pointer -mt-2 ml-3'
                        onClick={(e) =>
                          editQuestion({
                            choices: question.choices.filter(
                              (c) => c.id !== choice.id,
                            ),
                          })
                        }
                      >
                        <HiX className='text-lg text-gray-600' />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  className='flex items-center rounded-full text-sm py-2 px-4 mt-6 bg-indigo-100 text-gray-700 hover:scale-105'
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
                  }
                >
                  <HiPlus className='mr-2 text-gray-600' /> Choice
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
                        onChange={(e) => {
                          editQuestion({
                            true: bool,
                          })
                        }}
                      />
                      <label htmlFor={'choice-' + question.id + '-' + bool}>
                        {bool ? 'True' : 'False'}
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
    QUESTION_TYPES_LIST.find((q) => q.id === value) || QUESTION_TYPES_LIST[0]

  return (
    <div className='inline-block relative hover:bg-indigo-100 rounded-full'>
      <Listbox value={value} onChange={(selected) => onChange(selected)}>
        <div className='relative'>
          <Listbox.Button className='relative inline-flex items-center px-2 sm:px-3 py-2 text-gray-700'>
            <span className='block truncate'>{selected.value}</span>
            <HiOutlineSelector className='h-5 w-5 ml-2' aria-hidden='true' />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute -top-3 max-h-60  overflow-auto rounded-2xl bg-white border border-indigo-100 py-1  shadow-lg'>
              {QUESTION_TYPES_LIST.map((qType) => (
                <Listbox.Option
                  key={qType.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-6 ${
                      active ? 'bg-indigo-50' : 'text-gray-700'
                    }`
                  }
                  value={qType.id}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {qType.value}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700'>
                          <HiCheck className='h-5 w-5' aria-hidden='true' />
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

// const RemoveQuestionModal = ({
//   className,
//   deleteQuestion,
//   opened
// }: {
//   className?: string
//   deleteQuestion: any
//   opened: boolean
// }) => {
//   let confirmButtonRef = useRef(null)
//   const handleDelete = (closeModal: any) => {
//     deleteQuestion()
//     closeModal()
//   }

//   return (
//     <Modal initialFocus={confirmButtonRef} opened={opened}>
//       {({ closeModal }: any) => (
//         <div>
//           <h1 className='text-xl font-medium'>
//             Are you sure you want to delete this question?
//           </h1>
//           <div className='flex items-center justify-between mt-8'>
//             <button
//               onClick={closeModal}
//               className='text-gray-800 hover:text-black'>
//               Cancel
//             </button>
//             <button
//               ref={confirmButtonRef}
//               onClick={() => handleDelete(closeModal)}
//               className='rounded-full text-white bg-indigo-500 py-3 px-6 hover:bg-indigo-600'>
//               Confirm
//             </button>
//           </div>
//         </div>
//       )}
//     </Modal>
//   )
// }
