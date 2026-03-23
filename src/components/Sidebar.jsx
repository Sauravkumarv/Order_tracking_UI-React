import { NavLink } from "react-router-dom"
import { navItems } from "../config/nav.config"

const Sidebar = ({ isMobileOpen = false, onClose = () => {} }) => (
  <>
    {/* Desktop sidebar */}
    <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-20 md:w-64 md:bg-white md:backdrop-blur-xl md:border-r md:border-slate-200 md:shadow-[8px_0_30px_rgba(0,0,0,0.08)] md:block">
      <SidebarContent />
    </aside>

    {/* Mobile drawer */}
    <div
      className={[
        "fixed inset-0 z-30 transition",
        isMobileOpen ? "pointer-events-auto" : "pointer-events-none"
      ].join(" ")}
      aria-hidden={!isMobileOpen}
    >
      <div
        className={[
          "absolute inset-0 bg-black/30 transition-opacity",
          isMobileOpen ? "opacity-100" : "opacity-0"
        ].join(" ")}
        onClick={onClose}
      />
      <div
        className={[
          "absolute inset-y-0 left-0 w-64 transform bg-white backdrop-blur-xl border-r border-slate-200 shadow-[8px_0_30px_rgba(0,0,0,0.15)] transition",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        ].join(" ")}
      >
        <SidebarContent onClose={onClose} />
      </div>
    </div>
  </>
)

const SidebarContent = ({ onClose }) => (
  <div className="flex h-full flex-col">
    <div className="flex items-center justify-between px-6 pb-6 pt-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-xl font-bold text-white shadow-lg">
          AI
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Apparotech</p>
          <p className="text-base font-semibold text-slate-900">Operations Hub</p>
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="md:hidden rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 transition hover:border-indigo-500"
        >
          Close
        </button>
      )}
    </div>

    <nav className="flex-1 px-4">
      <div className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition duration-200",
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200/40"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              ].join(" ")
            }
            end={item.to === "/"}
            onClick={onClose}
          >
            <span className="flex h-2 w-2 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 transition duration-200 group-hover:scale-110" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>

    <div className="px-6 pb-8 pt-4 border-t border-slate-200">
      <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-600 border border-slate-200">
        <p className="font-semibold text-slate-900">Status</p>
        <p className="mt-1 text-slate-500">All systems operational</p>
      </div>
    </div>
  </div>
)

export default Sidebar
