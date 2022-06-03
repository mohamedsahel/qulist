import { ExamType } from 'types'
import { AiOutlineDelete } from 'react-icons/ai'
import { Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { formatDistance } from 'date-fns'
import classNames from 'classnames'
import Modal from './Modal'
import { Link } from 'react-router-dom'

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
          <Link to={'?exam=' + exam.id}>
            <div className='cursor-pointer hover:text-indigo-600'>
              <h1 className='text-xl font-medium'>
                {exam.module} exam
              </h1>
              <span className='text-gray-600'>
                {formatDistance(
                  new Date(exam.createdAt),
                  new Date(),
                  {
                    addSuffix: true,
                  }
                )}
              </span>
            </div>
          </Link>

          <div className='mt-12 flex justify-between'>
            <span className='text-gray-900 font-medium'>
              {exam.questions.length} Questions
            </span>
            {/* <RemoveExamModal deleteExam={deleteExam} /> */}
          </div>
        </div>
      </div>
    </Transition>
  )
}

// const RemoveExamModal = ({
//   className,
//   deleteExam,
// }: {
//   className?: string
//   deleteExam: any
// }) => {
//   let confirmButtonRef = useRef(null)
//   const handleDelete = (closeModal: any) => {
//     deleteExam()
//     closeModal()
//   }

//   return (
//     <Modal
//       button={
//         <button
//           className={classNames(
//             'rounded-full hover:bg-red-100 p-3 cursor-pointer -mt-2 ml-3',
//             className
//           )}>
//           <AiOutlineDelete className='text-xl text-red-600' />
//         </button>
//       }
//       initialFocus={confirmButtonRef}>
//         <div>ho</div>
//       {/* {({ closeModal }: any) => (
//         <div>
//           <h1 className='text-xl font-medium'>
//             Are you sure you want to delete this exam?
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
//       )} */}
//     </Modal>
//   )
// }
