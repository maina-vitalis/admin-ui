import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Order } from '@/shared/types'

interface RecentOrdersProps {
  orders: Order[]
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
              <div className="space-y-1">
                <p className="text-sm font-medium">#{order.orderNumber}</p>
                <p className="text-sm text-muted-foreground">{order.customerName}</p>
                <p className="text-xs text-muted-foreground">{order.vendorName}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm font-medium">${order.total.toFixed(2)}</p>
                <Badge className={statusColors[order.status]}>
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}