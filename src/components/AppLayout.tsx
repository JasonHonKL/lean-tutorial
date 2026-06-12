import { useState } from 'react'
import { Link, NavLink, useLocation, Outlet } from 'react-router-dom'
import { Menu, X, BookOpen } from 'lucide-react'
import { chaptersData } from '../data/chapters'

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-left">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="logo">
              LeanProof
            </Link>
          </div>

          <nav className="header-chapters">
            {chaptersData.map(chapter => (
              <NavLink
                key={chapter.id}
                to={`/${chapter.id}`}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {chapter.number}. {chapter.title}
              </NavLink>
            ))}
            <NavLink
              to="/glossary"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <BookOpen size={14} />
              Glossary
            </NavLink>
          </nav>
        </div>
      </header>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-inner">
          {chaptersData.map(chapter => (
            <div key={chapter.id} className="sidebar-chapter">
              <div className="sidebar-chapter-title">
                {chapter.number}. {chapter.title}
              </div>
              {chapter.sections.map(section => (
                <NavLink
                  key={section.id}
                  to={`/${chapter.id}#${section.id}`}
                  className={`sidebar-section ${
                    location.hash === `#${section.id}` ? 'current' : ''
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {section.kind === 'exercise' && (
                    <span className="sidebar-q-dot" />
                  )}
                  {section.title}
                </NavLink>
              ))}
            </div>
          ))}
          <div className="sidebar-chapter">
            <NavLink
              to="/glossary"
              className="sidebar-chapter-title"
              onClick={() => setSidebarOpen(false)}
            >
              Tactic Glossary
            </NavLink>
          </div>
        </div>
      </aside>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
