import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { dashboardApi } from '../api/dashboard.api'
import { DashboardStatsCards } from '../components/DashboardStats'
import { RecentOrders } from '../components/RecentOrders'
import { TopVendors } from '../components/TopVendors'

export function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardApi.getStats
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error || !data?.success) {
    return (
      <div className="text-center text-red-500 p-8">
        Failed to load dashboard data
      </div>
    )
  }

  const stats = data.data

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard
        </p>
      </div>

      <DashboardStatsCards stats={stats} />

      <div className="grid gap-6 md:grid-cols-2">
        <RecentOrders orders={stats.recentOrders} />
        <TopVendors vendors={stats.topVendors} />
      </div>
    </div>
  )
}