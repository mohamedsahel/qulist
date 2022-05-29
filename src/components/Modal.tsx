import { Dialog, Transition } from '@headlessui/react'
import {
  cloneElement,
  Fragment,
  isValidElement,
  ReactNode,
  useEffect,
  useState,
} from 'react'

export default function Modal({
  button,
  children,
  opened = false,
  ...rest
}: {
  button?: JSX.Element
  children: ReactNode
  opened?: boolean
  [key: string]: any
}) {
  let [isOpen, setIsOpen] = useState(opened)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  let Button

  if (isValidElement(button)) {
    Button = cloneElement(button, {
      // @ts-ignore
      onClick: openModal,
    })
  }

  useEffect(() => {
    setIsOpen(opened)
  }, [opened])

  return (
    <>
      {Button}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={closeModal}
          {...rest}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-50' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Overlay className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  {/* @ts-ignore */}
                  {children({ closeModal, openModal })}
                </Dialog.Overlay>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
