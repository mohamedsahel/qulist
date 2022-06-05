import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './index.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/800.css'
import App from './App'

import IndexRoute from '~/pages/index'
import ExamIdRoute from '~/pages/examId'
// styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<IndexRoute />} />
        <Route path='exam/:examId' element={<ExamIdRoute />} />
        <Route path='*' element={<Navigate to={`/`} />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
