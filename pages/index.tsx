import { useDB } from 'src/db'
import Header from '@components/Header'
import { useOpenedExam } from '@components/OpenedExamProvider'
import ExamEditor from '@components/ExamEditor'
import ExamCard from '@components/ExamCard'

export default function Home(): JSX.Element {
  const openedExam = useOpenedExam()
  const { exams, deleteExam } = useDB((state) => ({
    exams: state.exams,
    deleteExam: state.deleteExam,
  }))

  if (openedExam) {
    return (
      <div>
        <Header />
        <main className='mt-[4.4rem]'>
          <ExamEditor isShowing />
        </main>
      </div>
    )
  }

  // if (!exams || !exams.length) {
  //   return (
  //     <div>
  //       <Header />
  //       <main className='inner-container mt-24'>
  //         <div className='flex flex-col justify-center text-center text-white py-32'>
  //           <p className='uppercase'>Good morning</p>
  //           <h1 className='font-bold text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-yellow-100 to-amber-500'>
  //             No more pain <br /> no more headache
  //           </h1>
  //           <p className='mt-6 text-xl'>
  //             The only tool you need to generate your next QMC Exam
  //             Latex
  //           </p>
  //         </div>
  //       </main>
  //     </div>
  //   )
  // }

  exams.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  )

  return (
    <div>
      <Header />
      <main className='inner-container mt-24'>
        <div className='grid md:grid-cols-2 gap-6 '>
          {exams.map((exam, index) => (
            <ExamCard
              index={index}
              key={exam.id}
              exam={exam}
              deleteExam={() => deleteExam(exam.id)}
              isShowing
            />
          ))}
        </div>
      </main>
    </div>
  )
}
