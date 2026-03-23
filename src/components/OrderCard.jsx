const OrderCard = ({ id, customer, items, eta }) => (
  <div className="rounded-lg border border-neutral-700 bg-neutral-900/80 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-500 hover:shadow-md">
    <p className="text-sm font-semibold text-white">{id}</p>
    <p className="mt-1 text-xs text-neutral-300">{items}</p>
    <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
      <span>{customer}</span>
      <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-[11px] text-neutral-200">{eta}</span>
    </div>
  </div>
)

export default OrderCard
