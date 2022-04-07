import { VscChromeClose } from "react-icons/vsc"
import classnames from "classnames"
import { QuestionType } from "src/store"
import { useState } from "react"
import "katex/dist/katex.min.css"
import Latex from "react-latex-next"

type QuestionProps = {
  question: QuestionType
}

const questionTypes = ["mutliple", "boolean", "text"]

export default function Question({ question }: QuestionProps): JSX.Element {
  return (
    <div className="bg-white px-5 py-4 pt-9 rounded-sm relative">
      <span className="label font-medium text-lg absolute -top-6 bg-gray-100 px-4 rounded-full">
        Question {question.id}
      </span>
      <div className="flex justify-between items-center">
        <select
          className="select select-bordered select-sm text-base w-32"
          title="Question type"
        >
          {questionTypes.map((questionType) => (
            <option
              key={questionType}
              value={questionType}
              selected={questionType === question.type}
            >
              {questionType}
            </option>
          ))}
        </select>

        <div className="form-control flex-row items-center w-full max-w-xs">
          <label className="label">Bareme</label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-sm input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      {/* <div className="divider mt-2 mb-1" /> */}
      <div className="mt-6">
        <div className="form-control  w-full">
          <div
            className="bg-gray-50 p-3 pt-2 mb-4 border-b-2 focus:border-primary outline-none"
            contentEditable
            onInput={(e) => console.log(e.currentTarget.textContent as string)}
          >
            La question 2
          </div>
        </div>

        {question.type === "multiple" &&
          question.options?.map((option, index) => (
            <div className="flex items-center">
              <div
                className="form-control flex-row items-center w-full  bg-white py-1  rounded-md"
                key={index}
              >
                <input
                  type="checkbox"
                  // checked={option.correct}
                  className="checkbox checkbox-accent checkbox-xs rounded-sm"
                  title="Correct"
                />
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  className="input input-sm text-base w-full  focus:outline-none"
                />
              </div>
              <button
                className="btn btn-circle btn-ghost btn-sm border-none ml-2"
                title="remove"
              >
                <VscChromeClose className="w-5 h-5" />
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

const QuestionField = ({ className, onChange }: any) => {
  const [latex, setLatex] = useState(
    "We give illustrations for the three processes $e^+e^-$, gluon-gluon and $\\gamma\\gamma \\to W t\\bar b$.",
  )

  return (
    <div
      className="bg-white p-3 pt-2 border-b outline-none"
      // contentEditable
      onInput={(e) => setLatex(e.currentTarget.textContent as string)}
    />
  )
}
