import Meta from "@components/Meta"
import QuestionsList from "@components/QuestionsList"
import React from "react"

const Home: React.FC = () => {
  return (
    <div
      className="bg-gray-100 min-h-screen pt-20 pb-32 px-5"
      spellcheck="false"
    >
      <div className="container ">
        {/* meta  */}
        <div>
          <Meta />
        </div>
        {/* <div className="w-full bg-base-100 shadow-sm rounded-t-md px-5 py-4">
          <h2 className="text-xl font-medium">Questionnaire details</h2>
          <div className=""></div>
        </div> */}
        {/* questions */}
        <div className="w-full rounded-b-md py-4 text-gray-700">
          <h2 className="divider text-xl font-medium text-center my-8">
            Les questions
          </h2>
          <div className="mt-4">
            <QuestionsList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
