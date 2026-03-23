export const columns = [
  {
    key: 'new',
    title: 'New Orders',
    orders: [
      { id: 'Order #2411', customer: 'Anika R.', items: '2× Latte, 1× Croissant', eta: '3 mins' },
      { id: 'Order #2412', customer: 'Dev S.', items: '1× Americano', eta: '5 mins' },
      { id: 'Order #2413', customer: 'Ishan P.', items: '1× Mocha, 1× Bagel', eta: '7 mins' },
    ],
  },
  {
    key: 'prep',
    title: 'Preparing',
    orders: [
      { id: 'Order #2408', customer: 'Riya K.', items: '3× Cappuccino', eta: '4 mins' },
      { id: 'Order #2409', customer: 'Noah J.', items: '1× Iced Latte', eta: '6 mins' },
    ],
  },
  {
    key: 'pickup',
    title: 'Ready For Pickup',
    orders: [
      { id: 'Order #2405', customer: 'Meera V.', items: '2× Flat White', eta: 'Now' },
      { id: 'Order #2406', customer: 'Omar A.', items: '1× Espresso', eta: 'Now' },
    ],
  },
  {
    key: 'served',
    title: 'Completed / Served',
    orders: [
      { id: 'Order #2401', customer: 'Ava L.', items: '1× Iced Americano', eta: 'Done' },
      { id: 'Order #2402', customer: 'Liam P.', items: '1× Latte', eta: 'Done' },
      { id: 'Order #2403', customer: 'Sasha M.', items: '1× Cold Brew', eta: 'Done' },
    ],
  },
]

