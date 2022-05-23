import { VscChromeClose } from "react-icons/vsc"
import { AiFillDelete } from "react-icons/ai"
import { GrCheckmark } from "react-icons/gr"
import { MdModeEdit } from "react-icons/md"
import classnames from "classnames"
import { QuestionType, useStore } from "src/db"
import { useEffect, useState } from "react"
import "katex/dist/katex.min.css"
import Latex from "react-latex-next"
import ContentEditable from "react-contenteditable"

type QuestionProps = {
  question: QuestionType
  index?: number
}

const questionTypes = ["multiple", "boolean", "text"]

export default function Question({
  question,
  index,
}: QuestionProps): JSX.Element {
  const [updateQuestion, removeQuestion] = useStore((state) => [
    state.updateQuestion,
    state.removeQuestion,
  ])

  const updateType = (type: any) => {
    updateQuestion(question.id, { ...question, type })
  }

  const updateText = (text: string) => {
    updateQuestion(question.id, { ...question, question: text })
  }

  const toggleQuestion = () => {
    updateQuestion(question.id, { ...question, closed: !question.closed })
  }

  const updateOption = (option: any) => {
    updateQuestion(question.id, {
      ...question,
      options: question.options?.map((o) =>
        o.id === option.id ? option : o,
      ),
    })
  }

  const updateAndAddOption = (option: any) => {
    const newOption = {
      id: Math.random(),
      value: "",
      correct: false,
    }

    updateQuestion(question.id, {
      ...question,
      options: [
        ...(question.options?.map((o) => (o.id === option.id ? option : o)) ||
          []),
        newOption,
      ],
    })
  }

  const removeOption = (optionId: number) => {
    updateQuestion(question.id, {
      ...question,
      options: [...(question.options?.filter((o) => o.id !== optionId) || [])],
    })
  }

  const updateBoolean = (value: boolean) => {
    updateQuestion(question.id, { ...question, true: value })
  }

  const updateLines = (lines: number) => {
    updateQuestion(question.id, { ...question, lines })
  }

  const updateBareme = (bareme: number) => {
    updateQuestion(question.id, { ...question, bareme })
  }

  return (
    <div
      className={classnames(
        "bg-white px-5 py-4 pt-9 mt-12 rounded-lg relative",
        question.closed ? "shadow-sm" : "shadow-lg",
      )}
    >
      <div className="absolute -top-6 inset-x-4 flex justify-start">
        <span className="label mr-auto font-medium md:text-lg  bg-gray-200 px-3 md:px-4 rounded-full">
          Question {index}
        </span>
        <span
          className="label font-medium md:text-lg text-gray-700  bg-gray-200 px-3 md:px-4 rounded-full hover:bg-white border-4 border-gray-200 cursor-pointer "
          onClick={() => removeQuestion(question.id)}
        >
          <AiFillDelete />
        </span>
        <span
          className="label ml-3 font-medium md:text-lg text-gray-700  bg-gray-200 px-3 md:px-4 rounded-full hover:bg-white border-4 border-gray-200 cursor-pointer"
          onClick={() => toggleQuestion()}
        >
          {question.closed ? <MdModeEdit /> : <GrCheckmark />}
        </span>
      </div>

      {question.closed ? (
        <QuestionPreview question={question} index={index} />
      ) : (
        <>
          <div className="absolute inset-y-0 left-0 w-[0.4rem] bg-blue-500 rounded-l-full " />
          <div className="flex justify-between items-center pl-1">
            <select
              className="select select-bordered select-sm font-normal text-base "
              title="Question type"
              onChange={(e) => {
                updateType(e.target.value)
              }}
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

            <input
              type="text"
              placeholder="Bareme"
              className="input input-sm input-bordered max-w-[40%]"
              onChange={(e) => updateBareme(parseInt(e.target.value))}
              value={question.bareme}
            />
          </div>
          <div className="mt-6 pl-1">
            <div className="form-control  w-full">
              <ContentEditable
                className="bg-gray-50 p-3 pt-2 mb-4 border-b-2 focus:border-blue-500 outline-none"
                html={question.question}
                disabled={false}
                onChange={(e) => {
                  updateText(e.target.value)
                }}
                tagName="div"
              />
            </div>

            {question.type === "multiple" &&
              question.options?.map((option, index) => {
                const last = index === question.options?.length! - 1

                return (
                  <div className="flex items-center my-1" key={option.id}>
                    <div
                      className="form-control flex-row items-center w-full  bg-white py-1  rounded-md"
                      key={index}
                    >
                      <input
                        type="checkbox"
                        checked={last ? false : option.correct}
                        className="checkbox checkbox-accent checkbox-xs rounded-sm"
                        title="Correct"
                        onChange={(e) =>
                          updateOption({ ...option, correct: e.target.checked })
                        }
                      />
                      <input
                        id={`${question.id}-option-${option.id}`}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option.value}
                        onChange={(e) => {
                          console.log("option", option)
                          const updateFun = last
                            ? updateAndAddOption
                            : updateOption
                          updateFun({ ...option, value: e.target.value })
                        }}
                        className="input input-sm text-base w-full  focus:outline-none"
                      />
                    </div>
                    {!last && (
                      <button
                        className="btn btn-circle btn-ghost hover:bg-gray-200 btn-sm border-none ml-2"
                        title="remove"
                        onClick={() => removeOption(option.id)}
                      >
                        <VscChromeClose className="w-5 h-5 text-gray-600" />
                      </button>
                    )}
                  </div>
                )
              })}

            {question.type === "boolean" && (
              <div>
                <div className="form-control flex-row items-center">
                  <input
                    type="radio"
                    name="true"
                    className="radio checked:bg-accent-500"
                    checked={question.true}
                    onChange={() => updateBoolean(true)}
                    title="true"
                  />
                  <label className="label cursor-pointer ml-2">Vrai</label>
                </div>
                <div className="form-control flex-row items-center">
                  <input
                    type="radio"
                    name="false"
                    className="radio"
                    title="false"
                    onChange={() => updateBoolean(false)}
                    checked={!question.true}
                  />
                  <label className="label cursor-pointer ml-2">Faux</label>
                </div>
              </div>
            )}

            {question.type === "text" && (
              <div className="form-control">
                <label className="label">Lines</label>
                <input
                  type="number"
                  placeholder="3"
                  className="input input-bordered w-32"
                  value={question.lines}
                  onChange={(e) => updateLines(parseInt(e.target.value))}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function QuestionPreview({ question }: QuestionProps): JSX.Element {
  return (
    <div>
      <h3 className="text-lg mt-2 mb-3">
        <Latex>{question.question}</Latex>
      </h3>

      {question.type === "multiple" &&
        question.options
          ?.filter((o: any) => o.value.length)
          .map((option: any, index: number) => {
            const last = index === question.options?.length! - 1

            return (
              <div className="flex items-center my-1" key={option.id}>
                <div
                  className="form-control flex-row items-center w-full  bg-white py-1 my-1  rounded-md"
                  key={index}
                >
                  <input
                    type="checkbox"
                    checked={last ? false : option.correct}
                    className="checkbox checkbox-accent checkbox-xs rounded-sm cursor-default"
                    title="Correct"
                  />

                  <p className="pl-3">
                    <Latex>{option.value}</Latex>
                  </p>
                </div>
              </div>
            )
          })}

      {question.type === "boolean" && (
        <div>
          <div className="form-control flex-row items-center">
            <input
              type="radio"
              name="true"
              className="radio checked:bg-accent-500 cursor-default"
              checked={question.true}
              title="true"
            />
            <label className="label cursor-pointer ml-2">Vrai</label>
          </div>
          <div className="form-control flex-row items-center">
            <input
              type="radio"
              name="false"
              className="radio cursor-default"
              title="false"
              checked={!question.true}
            />
            <label className="label cursor-pointer ml-2">Faux</label>
          </div>
        </div>
      )}

      {question.type === "text" && (
        <div>
          <p className="">
            Lines: <span className="font-bold">{question.lines}</span>
          </p>
        </div>
      )}
    </div>
  )
}
