import axios from 'axios'

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API calls
export const authApi = {
  validateToken: async (token: string) => {
    const response = await api.post('/auth/validate-admin-token', { token })
    return response.data
  },
  
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },
  
  logout: async () => {
    await api.post('/auth/logout')
    localStorage.removeItem('admin_token')
  }
}

// Admin API calls
export const adminApi = {
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard/stats')
    return response.data
  },
  
  getVendors: async () => {
    const response = await api.get('/admin/vendors')
    return response.data
  },
  
  getOrders: async () => {
    const response = await api.get('/admin/orders')
    return response.data
  },
  
  getProducts: async () => {
    const response = await api.get('/admin/products')
    return response.data
  }
}