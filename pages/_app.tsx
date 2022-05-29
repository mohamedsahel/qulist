import { AppProps } from 'next/app'
import '@styles/global.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import OpenedExamProvider from '@components/OpenedExamProvider'



function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <OpenedExamProvider>
      <Component {...pageProps} />
    </OpenedExamProvider>
  )
}

export default MyApp
