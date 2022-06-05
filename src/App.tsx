import { Outlet, useLocation } from 'react-router-dom'
import Header from '~/components/Header'
import I18nProvider from '~/components/I18nProvider'
import translations from '~/translations'
import { useLayoutEffect } from 'react'
import { useShowLatex } from './db'

function App() {
  const location = useLocation()
  const { showLatex, toggleShowLatex } = useShowLatex()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    if (showLatex) {
      toggleShowLatex()
    }
  }, [location])

  return (
    <I18nProvider translations={translations}>
      <Header />
      <Outlet />
    </I18nProvider>
  )
}

export default App
