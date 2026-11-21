
import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Menu,
  X,
} from 'lucide-react'
import DashboardPage from './pages/DashboardPage'
import CustomersPage from './pages/CustomersPage'

type Page = 'dashboard' | 'customers'

function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const [menuOpen, setMenuOpen] = useState(false)

  function navigate(nextPage: Page) {
    setPage(nextPage)
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 모바일 상단 헤더 */}
      <header className="flex items-center justify-between bg-slate-900 p-4 text-white md:hidden">
        <h1 className="text-xl font-bold">BizFlow Admin</h1>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          className="rounded-lg p-2 hover:bg-slate-800"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <nav className="space-y-2 bg-slate-900 px-4 pb-4 text-white md:hidden">
          <button
            type="button"
            onClick={() => navigate('dashboard')}
            className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-slate-700"
          >
            <LayoutDashboard size={20} />
            대시보드
          </button>

          <button
            type="button"
            onClick={() => navigate('customers')}
            className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-slate-700"
          >
            <Users size={20} />
            고객 관리
          </button>
        </nav>
      )}

      {/* PC 사이드바 */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 bg-slate-900 p-5 text-white md:block">
        <h1 className="mb-10 text-2xl font-bold">
          BizFlow Admin
        </h1>

        <nav className="space-y-3">
          <button
            type="button"
            onClick={() => navigate('dashboard')}
            className={`flex w-full items-center gap-3 rounded-lg p-3 text-left ${
              page === 'dashboard'
                ? 'bg-slate-700'
                : 'hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard size={20} />
            대시보드
          </button>

          <button
            type="button"
            onClick={() => navigate('customers')}
            className={`flex w-full items-center gap-3 rounded-lg p-3 text-left ${
              page === 'customers'
                ? 'bg-slate-700'
                : 'hover:bg-slate-800'
            }`}
          >
            <Users size={20} />
            고객 관리
          </button>
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="min-w-0 p-4 sm:p-6 md:ml-60 md:p-8">
        {page === 'dashboard' ? (
          <DashboardPage />
        ) : (
          <CustomersPage />
        )}
      </main>
    </div>
  )
}

export default App
