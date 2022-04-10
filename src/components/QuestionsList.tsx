import { useStore } from "src/store"
import Question from "./Question"
import { HiOutlinePlus } from "react-icons/hi"

type QuestionsListProps = {}

export default function QuestionsList({}: QuestionsListProps): JSX.Element {
  const [questions, addQuestion] = useStore((state) => [
    state.questions,
    state.addQuestion,
  ])

  return (
    <div className="grid">
      {questions.map((question, index) => (
        <Question key={question.id} question={question} index={index + 1} />
      ))}
      <button
        className="flex items-center justify-center rounded-lg text-black font-medium  hover:bg-primary hover:bg-opacity-60 py-2 mt-4"
        onClick={() => addQuestion()}
      >
        <HiOutlinePlus className="text-xl mr-2" />
        Add Question
      </button>
    </div>
  )
}
