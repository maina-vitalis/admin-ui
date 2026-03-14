import { api } from '@/shared/lib/api'
import type { User, ApiResponse } from '@/shared/types'

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

export const authApi = {
  validateToken: async (token: string): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.post('/auth/validate-admin-token', { token })
    return response.data
  },
  
  login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },
  
  logout: async (): Promise<ApiResponse> => {
    const response = await api.post('/auth/logout')
    localStorage.removeItem('admin_token')
    return response.data
  }
}