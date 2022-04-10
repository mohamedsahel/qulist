import React, { useState } from "react"
import Meta from "@components/Meta"
import QuestionsList from "@components/QuestionsList"
import latexSample from "src/latex-sample"
import Editor from "react-simple-code-editor"
// @ts-ignore
import { highlight, languages } from "prismjs/components/prism-core"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-latex"
import "prismjs/themes/prism-dark.css" //Example style, you can use another

const Home: React.FC = () => {
  const [code, setCode] = useState(latexSample)
  const [showCode, setShowCode] = useState(false)

  return (
    <div
      className="bg-yellow-200 min-h-screen pt-20 pb-32 px-5"
      spellCheck="false"
    >
      <div className="container ">
        {/* meta  */}
        <div>
          <Meta />
        </div>
        {/* questions */}
        <div
          id="questions-container"
          className="w-full rounded-b-md py-4 text-gray-700 relative"
        >
          <h2
            className="flex justify-center text-2xl font-medium mt-4 -mb-4 sticky top-0 z-10 py-4 bg-yellow-200 cursor-pointer"
            onClick={() => {
              document.getElementById("questions-container")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }}
          >
            Les questions
          </h2>
          <div className="">
            <QuestionsList />
          </div>
        </div>
        <span className="divider mt-10"></span>
        <div className="relative">
          <div className="flex justify-between sticky top-0 bg-yellow-200 py-3 z-10">
            <button
              className="btn btn-ghost"
              onClick={() => setShowCode((s) => !s)}
            >
              {showCode ? "Hide Latex" : "Show Latex"}
            </button>
            <button className="btn btn-primary ml-4">Download</button>
          </div>
          {showCode && (
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => highlight(code, languages.latex)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                color: "white",
              }}
              className="bg-gray-800 rounded-md"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
