import { Outlet, useLocation } from 'react-router-dom'
import OpenedExamProvider from '~/components/OpenedExamProvider'
import Header from '~/components/Header'
import I18nProvider from '~/components/I18nProvider'
import translations from '~/translations'
import { useEffect } from 'react'

function App() {
  const location = useLocation()

  useEffect(() => {
    // window.scrollTo(0, 0)
  }, [location])

  return (
    <I18nProvider translations={translations}>
      <OpenedExamProvider>
        <Header />
        <Outlet />
      </OpenedExamProvider>
    </I18nProvider>
  )
}

export default App
