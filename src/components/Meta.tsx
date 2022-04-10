import { QuestionType, useStore } from "src/store"
import Question from "./Question"

type MetaProps = {}

export default function Meta({}: MetaProps): JSX.Element {
  const [meta, updateMeta] = useStore((state) => [state.meta, state.updateMeta])

  return (
    <div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          className="input input-ghost w-full p-0 pr-4 font-bold text-3xl focus:bg-transparent focus:border-0 focus:outline-none "
          defaultValue={meta.title}
          title="title"
          placeholder="Titre Ici"
          onChange={(e) => updateMeta({ ...meta, title: e.target.value })}
        />
        <select
          className="select bg-primary text-white text-base w-20 min-h-[2.5rem] h-[2.5rem]"
          title="Format"
          onChange={(e) => updateMeta({ ...meta, format: e.target.value })}
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
            className="input input-base input-bordered h-10  w-full"
            defaultValue={meta.module}
            onChange={(e) => updateMeta({ ...meta, module: e.target.value })}
          />
        </div>
        <div className="form-control flex-row items-center w-full">
          <label className="label w-32">Semestre</label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-base input-bordered h-10  w-full"
            defaultValue={meta.semestre}
            onChange={(e) => updateMeta({ ...meta, semestre: e.target.value })}
          />
        </div>
        <div className="form-control flex-row items-center w-full">
          <label className="label w-32">Annee</label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-base input-bordered h-10  w-full"
            defaultValue={meta.year}
            onChange={(e) => updateMeta({ ...meta, year: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
