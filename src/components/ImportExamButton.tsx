import { useEffect } from 'react'
import shortid from 'shortid'
import useNewExam from '~/utils/useNewExam'

export default function ImportExamButton({
  className,
  children,
}: any) {
  const randomId = shortid.generate()
  const newExam = useNewExam()

  useEffect(() => {
    const fileSelector = document.getElementById(randomId)
    fileSelector?.addEventListener('change', () => {
      // @ts-ignore
      const file_to_read = fileSelector.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        // @ts-ignore
        const exam = JSON.parse(e.target.result)
        newExam({ ...exam, id: shortid.generate() })
      }
      reader.readAsText(file_to_read)
    })
  }, [])

  return (
    <div>
      <label htmlFor={randomId} className={className}>
        {children}
      </label>
      <input
        id={randomId}
        className='hidden'
        type='file'
        accept='.json'
      />
    </div>
  )
}
