import { AppProps } from 'next/app'
import '~/styles/global.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/800.css'
import I18nProvider from '~/components/I18nProvider'
import translations from '~/translations'
import Header from '~/components/Header'
import { useRouter } from 'next/router'
import { useLayoutEffect } from 'react'
import { useShowLatex } from '~/db'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { pathname } = useRouter()
  const { showLatex, toggleShowLatex } = useShowLatex()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    if (showLatex) {
      toggleShowLatex()
    }
  }, [pathname])

  return (
    <I18nProvider translations={translations}>
      <Header />
      <Component {...pageProps} />
    </I18nProvider>
  )
}

export default MyApp
