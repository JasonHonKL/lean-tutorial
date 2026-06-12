import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { ChapterPage } from './components/ChapterPage'
import { GlossaryPage } from './components/GlossaryPage'
import { AppLayout } from './components/AppLayout'
import { QuizProvider } from './components/QuizContext'

function LayoutWrapper() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}

export default function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutWrapper />}>
            <Route index element={<Navigate to="/introduction" replace />} />
            <Route path=":chapterId" element={<ChapterPage />} />
            <Route path="glossary" element={<GlossaryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  )
}
