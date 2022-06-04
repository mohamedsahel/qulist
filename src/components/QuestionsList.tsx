import { useDB } from '~/db'
import { getNewQuestion } from '~/utils'
import { ExamType, QuestionType } from 'types'
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
} from '@dnd-kit/sortable'

import 'katex/dist/katex.min.css'
import { QuestionEditor } from './QuestionEditor'
import { HiDuplicate, HiEye, HiPencil, HiTrash } from 'react-icons/hi'
import { createElement } from 'react'
import shortid from 'shortid'
import Latex from 'react-latex-next'
import { useTranslation } from './I18nProvider'

export default function QuestionsList() {
  const { t } = useTranslation()
  const { openedExamId } = useOpenedExam() as any
  const { questions, addQuestion, editExam, editQuestion, deleteQuestion } =
    useDB((state) => ({
      questions:
        state.exams.find((e) => e.id === openedExamId)?.questions || [],
      addQuestion: (question?: QuestionType) =>
        state.addQuestion(openedExamId, question || getNewQuestion()),
      editExam: (data: Partial<ExamType>) => state.editExam(openedExamId, data),
      editQuestion: (id: string, data: Partial<QuestionType>) =>
        state.editQuestion(openedExamId, id, data),
      deleteQuestion: (id: string) => state.deleteQuestion(openedExamId, id),
    }))

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = questions.findIndex(({ id }) => active.id === id)
      const newIndex = questions.findIndex(({ id }) => over.id === id)

      editExam({
        questions: arrayMove(questions as any, oldIndex, newIndex),
      })
    }
  }

  const handleQuestionDeleteStart = (questionId: string) => {
    if (confirm(t('questionsList.deleteConfirmation'))) {
      deleteQuestion(questionId)
    }
  }

  const duplicateQuestion = (question: QuestionType) => {
    addQuestion({ ...question, id: shortid.generate() })
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
                <div key={q.id} className='group'>
                  <div className='flex items-center justify-end px-4 py-1 gap-2 lg:translate-y-1/2 lg:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-400'>
                    <HiDuplicate
                      className='p-2 h-9 w-9 rounded-full text-indigo-400 cursor-pointer hover:bg-indigo-50 hover:text-indigo-500 transition-none'
                      onClick={() => duplicateQuestion(q)}
                      title={t('questionsList.titles.duplicate')}
                    />
                    <HiTrash
                      className='p-2 h-9 w-9 rounded-full text-indigo-400 cursor-pointer hover:bg-indigo-50 hover:text-indigo-500 transition-none'
                      onClick={() => handleQuestionDeleteStart(q.id)}
                      title={t('questionsList.titles.delete')}
                    />
                    {createElement(!q.previewMode ? HiEye : HiPencil, {
                      className:
                        'p-2 h-9 w-9 rounded-full text-indigo-400 cursor-pointer hover:bg-indigo-50 hover:text-indigo-500 transition-none',
                      onClick: () => {
                        editQuestion(q.id, {
                          previewMode: !q.previewMode,
                        })
                      },
                      title: t(`questionsList.titles.${q.previewMode ? 'edit' : 'preview'}`),
                    })}
                  </div>
                  {q.previewMode ? (
                    <QuestionPreview question={q} index={index + 1} />
                  ) : (
                    <QuestionEditor
                      key={q.id}
                      question={q}
                      openedExamId={openedExamId}
                      order={index + 1}
                      id={q.id}
                    />
                  )}
                </div>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}

      <button
        className='mx-auto rounded-full py-3 px-6 mt-10 bg-indigo-500 text-white hover:scale-105'
        onClick={() => addQuestion()}
      >
        + {t('questionsList.addQuestion')}
      </button>
    </div>
  )
}

export const QuestionPreview = ({
  question,
  index,
}: {
  question: QuestionType
  index: number
}) => {
  const multi =
    question.type === 'multiple_choices' &&
    question.choices.filter((choice) => choice.correct).length > 1

  return (
    <div className='p-5 md:p-8 border border-indigo-100 bg-white rounded-3xl text-gray-900'>
      <p className='text-lg pb-4 text-black font-medium'>
        <span className='pr-2'>
          {index}: {multi && '♣'}
        </span>{' '}
        <Latex>{question.question}</Latex>
      </p>
      {question.type === 'long' && (
        <div>
          <div className='flex justify-end gap-3'>
            {question.longBareme.map((_, i) => (
              <span
                className='w-5 h-5 border border-gray-500 rounded-sm'
                key={i}
              />
            ))}
          </div>
          <div className='grid gap-4 p-4 mt-2 border border-gray-600 rounded-sm'>
            {new Array(+question.lines).fill(1).map((_, i) => (
              <div
                className='text-gray-400 overflow-hidden w-full whitespace-nowrap'
                key={i}
              >
                {new Array(800).fill(1).map((_, __) => '. ')}
              </div>
            ))}
          </div>
        </div>
      )}
      {question.type === 'multiple_choices' && (
        <div className='grid gap-4 mt-2'>
          {question.choices.map((choice, i) => (
            <div className='flex items-center' key={i}>
              <span
                className='w-5 h-5 border border-gray-500 rounded-sm mr-3'
                key={i}
              />
              <p className='text-lg'>
                <Latex>{choice.value}</Latex>
              </p>
            </div>
          ))}
        </div>
      )}
      {question.type === 'true_false' && (
        <div className='grid gap-4 mt-2'>
          {['True', 'False'].map((choice, i) => (
            <div className='flex items-center' key={i}>
              <span
                className='w-5 h-5 border border-gray-500 rounded-sm mr-3'
                key={i}
              />
              <p className='text-lg'>
                <Latex>{choice}</Latex>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
