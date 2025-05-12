import type { Coffee } from "@/lib/types"

interface OrderHistoryProps {
  orders: Coffee[]
}

export default function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <div className="bg-[#fdf6f0] p-4 rounded-xl mb-4">
      <h2 className="text-2xl font-bold text-[#3c2415] mb-4">History</h2>

      {orders.length > 0 ? (
        <div className="space-y-2">
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center gap-2">
              <span className="text-[#c08552] text-2xl">☕</span>
              <span>
                {order.type} ({order.size}, {order.strength})
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 italic">No order history</div>
      )}
    </div>
  )
}
