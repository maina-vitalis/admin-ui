import { api } from '@/shared/lib/api'
import type { DashboardStats, ApiResponse } from '@/shared/types'

export const dashboardApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await api.get('/admin/dashboard/stats')
    return response.data
  }
}