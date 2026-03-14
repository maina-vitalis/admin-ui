import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authApi, type LoginCredentials } from '../api/auth.api'
import type { User } from '@/shared/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  validateToken: () => Promise<boolean>
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authApi.login(credentials)
          if (response.success && response.data) {
            const { user, token } = response.data
            
            localStorage.setItem('admin_token', token)
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null
            })
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Login failed',
            isLoading: false,
            isAuthenticated: false
          })
          throw error
        }
      },

      logout: async () => {
        try {
          await authApi.logout()
        } catch (error) {
          console.error('Logout error:', error)
        } finally {
          localStorage.removeItem('admin_token')
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null
          })
        }
      },

      validateToken: async () => {
        const { token } = get()
        if (!token) return false

        set({ isLoading: true })
        try {
          const response = await authApi.validateToken(token)
          if (response.success && response.data) {
            const { user } = response.data
            
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null
            })
            return true
          }
          return false
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Token validation failed'
          })
          localStorage.removeItem('admin_token')
          return false
        }
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'admin-auth-storage',
      partialize: (state) => ({ 
        token: state.token,
        user: state.user 
      })
    }
  )
)