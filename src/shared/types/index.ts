export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'super_admin'
  permissions: string[]
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface DashboardStats {
  totalVendors: number
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  recentOrders: Order[]
  topVendors: Vendor[]
}

export interface Vendor {
  id: string
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive' | 'pending'
  totalProducts: number
  totalOrders: number
  revenue: number
  createdAt: string
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  vendorId: string
  vendorName: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: OrderItem[]
  createdAt: string
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  vendorId: string
  vendorName: string
  category: string
  status: 'active' | 'inactive'
  stock: number
  images: string[]
  createdAt: string
}