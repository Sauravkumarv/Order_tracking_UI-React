import { columns } from "../config/Order.config"
import OrderCard from "../components/OrderCard"

const Order = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Live overview</p>
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Orders</h1>
        </div>
        {/* <button className="rounded-lg bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-800/30 transition hover:-translate-y-0.5 hover:shadow-orange-700/40">
          New Order
        </button> */}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 lg:p-6 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => {
            const orders = column.orders ?? []
            return (
            <section
              key={column.key}
              className="flex min-h-[320px] max-h-[65vh] flex-col rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_14px_40px_rgba(0,0,0,0.06)]"
            >
              <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-lg font-medium text-slate-900 sm:text-xl">{column.title}</h2>
                <span className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
                  {orders.length}
                </span>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto pr-1 scroll-smooth no-scrollbar">
                {orders.map((order) => (
                  <OrderCard key={order.id} {...order} />
                ))}
                {orders.length === 0 && (
                  <p className="text-xs text-slate-500 sm:text-sm">No orders in this lane.</p>
                )}
              </div>
            </section>
          )})}
        </div>
      </div>
    </div>
  )
}

export default Order
