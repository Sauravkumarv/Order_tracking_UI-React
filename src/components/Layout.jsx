import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  const isDiscountPage = pathname === "/discount-wheel"

  return (
    <div className="flex min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Sidebar isMobileOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main
        className={`flex-1 md:ml-64 ${
          isDiscountPage ? "bg-white" : "bg-gradient-to-br from-white via-slate-50 to-white"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
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

          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
