import { useStore } from "src/db"
import Question from "./Question"
import { HiOutlinePlus } from "react-icons/hi"


export default function QuestionsList(): JSX.Element {
  const [questions, addQuestion] = useStore((state) => [
    state.questions,
    state.addQuestion,
  ])

  return (
    <div className="">
      {questions.map((question, index) => (
        <Question key={question.id} question={question} index={index + 1} />
      ))}
      <button
        className="flex items-center justify-center rounded-lg text-black font-medium hover:bg-gray-300 py-2 mt-8"
        onClick={() => addQuestion()}
      >
        <HiOutlinePlus className="text-xl mr-2" />
        Ajouter Question
      </button>
    </div>
  )
}
