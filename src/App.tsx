import { Outlet } from 'react-router-dom'
import OpenedExamProvider from '~/components/OpenedExamProvider'
import Header from '~/components/Header'

function App() {
  return (
    <OpenedExamProvider>
      <Header />
      <Outlet />
    </OpenedExamProvider>
  )
}

export default App
