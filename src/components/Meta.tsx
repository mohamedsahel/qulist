import { QuestionType, useStore } from "src/store"
import Question from "./Question"

type MetaProps = {}

export default function Meta({}: MetaProps): JSX.Element {
  const meta = useStore((state) => state.meta)

  return (
    <div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          className="input input-ghost w-full p-0 pr-4 font-bold text-3xl focus:bg-transparent focus:border-0 focus:outline-none "
          defaultValue={meta.title}
          title="title"
          placeholder="Titre Ici"
        />
        <select
          className="select select-bordered select-base text-base w-20"
          title="Format"
        >
          {["A4", "A3"].map((format) => (
            <option
              key={format}
              value={format}
              selected={format === meta.format}
            >
              {format}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 justify-between mt-6 gap-x-10 gap-y-4">
        <div className="form-control flex-row items-center w-full">
          <label className="label w-32">Module</label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-sm input-bordered w-full"
            defaultValue={meta.module}
          />
        </div>
        <div className="form-control flex-row items-center w-full">
          <label className="label w-32">Semestre</label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-sm input-bordered w-full"
            defaultValue={meta.semestre}
          />
        </div>
        <div className="form-control flex-row items-center w-full">
          <label className="label w-32">Annee</label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-sm input-bordered w-full"
            defaultValue={meta.year}
          />
        </div>
      </div>
    </div>
  )
}
