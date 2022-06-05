import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { HiCheck } from 'react-icons/hi'
import { LANGUAGES } from '~/translations'
import { useTranslation } from './I18nProvider'

export default function LangSwitcher() {
  const { language, setLanguage } = useTranslation()

  return (
    <div className='inline-block relative bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full'>
      <Listbox value={language} onChange={setLanguage}>
        <div className='relative'>
          <Listbox.Button className='relative inline-flex items-center px-3 py-1 text-white'>
            <span className='block truncate font-semibold'>{language}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute top-9 max-h-60  overflow-auto rounded-2xl bg-white border border-indigo-100 py-1  shadow-lg'>
              {LANGUAGES.map((lang) => (
                <Listbox.Option
                  key={lang}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-6 ${
                      active ? 'bg-indigo-50' : 'text-gray-700'
                    }`
                  }
                  value={lang}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {lang}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700'>
                          <HiCheck className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
