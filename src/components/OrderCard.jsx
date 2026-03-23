const OrderCard = ({ id, customer, items, eta }) => (
  <div className="rounded-lg border border-slate-200 bg-white w-full p-3 sm:p-4 lg:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_14px_40px_rgba(79,70,229,0.15)]">
    <p className="text-sm sm:text-base font-semibold text-slate-900">{id}</p>
    <p className="mt-1 text-xs sm:text-sm text-slate-600">{items}</p>
    <div className="mt-3 flex items-center justify-between text-xs sm:text-sm text-slate-500">
      <span>{customer}</span>
      <span className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm">{eta}</span>
    </div>
  </div>
)

export default OrderCard
