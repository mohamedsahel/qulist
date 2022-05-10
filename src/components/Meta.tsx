import { QuestionType, useStore } from 'src/store'
import Question from './Question'

type MetaProps = {}

export default function Meta({}: MetaProps): JSX.Element {
  const [meta, updateMeta] = useStore((state) => [
    state.meta,
    state.updateMeta,
  ])

  return (
    <div className='grid sm:grid-cols-2 justify-between mt-6 gap-x-10 gap-y-4'>
      <MetaField
        value={meta.departement}
        name='Département'
        placeholder='ex: Informatique'
        onChange={(e: any) =>
          updateMeta({ ...meta, departement: e.target.value })
        }
      />
      <MetaField
        value={meta.filiere}
        name='Filière'
        placeholder='ex: SMI'
        onChange={(e: any) =>
          updateMeta({ ...meta, filiere: e.target.value })
        }
      />
      <MetaField
        value={meta.session}
        name='Session'
        placeholder='ex: Automne 2021-2022'
        onChange={(e: any) =>
          updateMeta({ ...meta, session: e.target.value })
        }
      />
      <MetaField
        value={meta.session}
        name='Module'
        placeholder='ex: Algebre 1'
        onChange={(e: any) =>
          updateMeta({ ...meta, session: e.target.value })
        }
      />
      <MetaField
        value={meta.duree}
        name='Durée'
        placeholder='ex: 1h'
        onChange={(e: any) =>
          updateMeta({ ...meta, duree: e.target.value })
        }
      />
      <MetaField
        value={meta.defaultBareme}
        name='Barème par default'
        placeholder='ex: b=1'
        onChange={(e: any) =>
          updateMeta({ ...meta, defaultBareme: e.target.value })
        }
      />
      <div className='form-control flex-row items-center w-full py-4'>
        <label className='label w-48'>Format</label>
        <select
          className='input input-base input-bordered h-10 pr-6 w-full'
          title='Format'
          defaultValue={meta.format}
          onChange={(e) =>
            updateMeta({ ...meta, format: e.target.value })
          }>
          {['A4', 'A3'].map((format) => (
            <option
              key={format}
              value={format}
              selected={format === meta.format}>
              {format}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

const MetaField = ({
  name,
  onChange,
  value,
  placeholder,
}: {
  name: string
  onChange: any
  value: string
  placeholder: string
}) => {
  return (
    <div className='form-control  w-full'>
      <label className='label w-48'>{name}</label>
      <input
        type='text'
        placeholder={placeholder}
        className='input input-bordered h-10  w-full'
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
