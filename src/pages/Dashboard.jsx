// import { stats } from "../config/stats.config"

const Dashboard = () => (
  // <div className="space-y-8">
  //   <header className="flex flex-wrap items-center justify-between gap-4">
  //     <div>
  //       <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Overview</p>
  //       <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
  //     </div>
  //     <button className="rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-300/40 transition hover:-translate-y-0.5 hover:shadow-blue-400/50">
  //       Generate Report
  //     </button>
  //   </header>

  //   <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
  //     {stats.map((stat) => (
  //       <div
  //         key={stat.label}
  //         className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
  //       >
  //         <div className={`inline-flex items-center rounded-full bg-gradient-to-r ${stat.color} px-3 py-1 text-xs font-semibold text-white shadow-sm`}>
  //           {stat.trend}
  //         </div>
  //         <p className="mt-4 text-sm text-slate-500">{stat.label}</p>
  //         <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
  //       </div>
  //     ))}
  //   </section>

  //   <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
  //     <div className="flex items-center justify-between">
  //       <h2 className="text-lg font-semibold text-slate-900">Activity</h2>
  //       <button className="text-sm text-blue-600 underline-offset-4 transition hover:text-blue-800 hover:underline">View all</button>
  //     </div>
  //     <ul className="mt-4 space-y-3 text-sm text-slate-700">
  //       <li className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 border border-slate-200">
  //         <span>New order batch imported</span>
  //         <span className="text-xs text-slate-500">2m ago</span>
  //       </li>
  //       <li className="flex items-center justify-between rounded-lg bg-white px-4 py-3 border border-slate-200">
  //         <span>Carrier delays cleared</span>
  //         <span className="text-xs text-slate-500">18m ago</span>
  //       </li>
  //       <li className="flex items-center justify-between rounded-lg bg-white px-4 py-3 border border-slate-200">
  //         <span>Inventory synced</span>
  //         <span className="text-xs text-slate-500">32m ago</span>
  //       </li>
  //     </ul>
  //   </section>
  // </div>
   <div className="space-y-4">
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Preferences</p>
      <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <p className="text-slate-600">Dashboard panel placeholder. Hook your forms here.</p>
    </div>
  </div>
)

export default Dashboard
