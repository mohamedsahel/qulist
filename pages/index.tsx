import React, { useEffect, useState } from "react"
import Meta from "@components/Meta"
import QuestionsList from "@components/QuestionsList"
import Editor from "react-simple-code-editor"
// @ts-ignore
import { highlight, languages } from "prismjs/components/prism-core"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-latex"
import "prismjs/themes/prism-dark.css" //Example style, you can use another
import { download } from "src/download"
import { generateLatex } from "src/generate-latex"
import { useStore } from "src/store"
import { Tab } from "@headlessui/react"
import classNames from "classnames"

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

const Home: React.FC = () => {
  const [meta, questions] = useStore((state) => [state.meta, state.questions])
  const [code, setCode] = useState("")

  const tabGenerateLatex = () => {
    setCode(generateLatex(meta, questions))
  }

  return (
    <div
      className="bg-gray-200 min-h-screen pt-20 pb-32 px-3 md:px-5"
      spellCheck="false"
    >
      <div className="container ">
        <Tab.Group onChange={tabGenerateLatex}>
          <Tab.List className="flex mb-6">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-1/2 text-center rounded-lg text-lg py-3",
                  selected
                    ? " bg-white text-black font-medium"
                    : "bg-transparent",
                )
              }
            >
              L'examen
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-1/2 text-center rounded-lg text-lg py-3",
                  selected
                    ? " bg-white text-black font-medium"
                    : "bg-transparent",
                )
              }
            >
              Latex
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="mt-16">
                <Meta />
              </div>
              {/* questions */}
              <div
                id="questions-container"
                className="w-full rounded-b-md py-4 mt-10 text-gray-700 relative"
              >
                <QuestionsList />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="relative">
                <div className="flex justify-between bg-gray-200 sticky top-0 py-3 z-10">
                  <button
                    className="btn btn-ghost"
                    onClick={() => copyToClipboard(code)}
                  >
                    Copier le code
                  </button>
                  <button
                    className="btn btn-primary bg-blue-600 text-white hover:bg-blue-700 hover:text-white  border-none  ml-4"
                    onClick={() => {
                      download(`examen-${meta.module}.tex`, code)
                    }}
                  >
                    Télécharger
                  </button>
                </div>
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
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default Home
