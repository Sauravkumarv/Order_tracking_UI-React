import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"
import { navItems } from "../config/nav.config"

const HeroNavbar = () => (
  <div className="fixed inset-x-0 top-0 z-40 transform bg-white border-b border-slate-200 shadow-lg transition-transform duration-500">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-base font-bold text-white shadow-lg">
          AI
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Apparotech</p>
          <p className="text-sm font-semibold text-slate-900">Hero mode</p>
        </div>
      </div>
      <nav className="flex flex-wrap items-center gap-2">
        {navItems.map((item) => (
          <a
            key={item.to}
            href={item.to}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-indigo-600 hover:text-white"
          >
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  </div>
)

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  const isDiscountPage = pathname === "/discount-wheel"
  const isHeroPage = pathname === "/hero"
  const showSidebar = !isHeroPage

  return (
    <div className="flex min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {showSidebar && <Sidebar isMobileOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
      {isHeroPage && <HeroNavbar />}

      <main
        className={`flex-1 ${showSidebar ? "md:ml-64" : ""} ${
          isDiscountPage ? "bg-white" : "bg-gradient-to-br from-white via-slate-50 to-white"
        }`}
      >
        {isHeroPage ? (
          <div className="w-full">
            <Outlet />
          </div>
        ) : (
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
            {showSidebar && (
              <div className="mb-4 flex items-center justify-between md:hidden">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="inline-flex flex-col items-start gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-indigo-500 hover:shadow-[0_6px_18px_rgba(79,70,229,0.15)]"
                >
                  <span className="block h-0.5 w-5 rounded-full bg-slate-900" />
                  <span className="block h-0.5 w-5 rounded-full bg-slate-900" />
                  <span className="block h-0.5 w-5 rounded-full bg-slate-900" />
                  <span className="sr-only">Open navigation</span>
                </button>
                <p className="text-sm font-semibold text-slate-600">Apparotech</p>
              </div>
            )}

            <Outlet />
          </div>
        )}
      </main>
    </div>
  )
}

export default Layout
