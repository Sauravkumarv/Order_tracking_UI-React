import { columns } from "../config/Order.config"
import OrderCard from "../components/OrderCard"

const Order = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">All Orders</h1>
          <p className="text-sm text-neutral-400">Live overview</p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {columns.map((column) => {
              const orders = column.orders ?? []
              return (
              <section
                key={column.key}
                className="flex min-h-[420px] flex-col rounded-xl border border-neutral-800 bg-neutral-950 p-4"
              >
                <div className="mb-3 flex items-center justify-between border-b border-neutral-900 pb-3">
                  <h2 className="text-lg font-medium text-white">{column.title}</h2>
                  <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-xs text-neutral-200">
                    {orders.length}
                  </span>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                  {orders.map((order) => (
                    <OrderCard key={order.id} {...order} />
                  ))}
                  {orders.length === 0 && (
                    <p className="text-xs text-neutral-500">No orders in this lane.</p>
                  )}
                </div>
              </section>
            )})}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
