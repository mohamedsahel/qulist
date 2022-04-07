import { QuestionType, useStore } from "src/store"
import Question from "./Question"

type QuestionsListProps = {}

export default function QuestionsList({}: QuestionsListProps): JSX.Element {
  const questions = useStore((state) => state.questions)

  return (
    <div>
      {questions.map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </div>
  )
}
