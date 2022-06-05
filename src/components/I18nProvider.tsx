import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import { nestedValue, renderTemplate } from '~/utils'
import Cookies from 'js-cookie'
import { LANGUAGES } from '~/translations'


const I18nContext = createContext<{
  language: typeof LANGUAGES[number]
  t: (key: string, options?: Record<string, any>) => string
  setLanguage: (language: typeof LANGUAGES[number]) => void
}>({
  language: 'en',
  t: (key: string) => key,
  setLanguage: (_) => {},
})

export const useTranslation = () => useContext(I18nContext)

export default function I18nProvider({
  children,
  translations,
}: {
  children: ReactNode
  translations: Record<
    typeof LANGUAGES[number],
    {
      [key: string]: string | Record<string, any>
    }
  >
}): JSX.Element {
  const [language, setLanguage] = useState<typeof LANGUAGES[number]>(
    LANGUAGES[0],
  )

  useEffect(() => {
    setLanguage(Cookies.get('preferred-lang') as any || LANGUAGES[0])
  }, [])


  const t = (key: string, options?: Record<string, any>) => {
    const value = nestedValue(translations[language], key) || key
    return renderTemplate(value, options)
  }

  const changeLanguage = (lang: typeof LANGUAGES[number]) => {
    setLanguage(lang)
    Cookies.set('preferred-lang', lang)
  }

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}
