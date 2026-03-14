import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Vendor } from '@/shared/types'

interface TopVendorsProps {
  vendors: Vendor[]
}

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800'
}

export function TopVendors({ vendors }: TopVendorsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Vendors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
              <div className="space-y-1">
                <p className="text-sm font-medium">{vendor.name}</p>
                <p className="text-sm text-muted-foreground">{vendor.email}</p>
                <div className="flex items-center gap-2">
                  <Badge className={statusColors[vendor.status]}>
                    {vendor.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {vendor.totalProducts} products
                  </span>
                </div>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm font-medium">${vendor.revenue.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{vendor.totalOrders} orders</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}