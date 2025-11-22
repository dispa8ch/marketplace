// Vendor API functions for backend integration

import { apiClient } from "../api-client"

export interface DashboardStats {
  totalProducts: number
  totalOrders: number
  revenue: number
  growth: number
}

export interface Product {
  _id: string
  name: string
  price: number
  category: string
  stock: number
  description: string
  images: string[]
  status: "active" | "inactive"
  vendorId: string
  createdAt: string
}

export interface Order {
  _id: string
  customerId: string
  vendorId: string
  total: number
  status: string
  paymentStatus: string
  items: Array<{
    productId: string
    name: string
    price: number
    quantity: number
  }>
  createdAt: string
  address: {
    street: string
    lga: string
    state: string
  }
}

export interface Transaction {
  id: string
  type: "credit" | "debit"
  description: string
  amount: number
  date: string
  status: string
}

export interface VendorProfile {
  _id: string
  businessName: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
  }
  category: string
  description: string
}

// Dashboard
export async function getDashboardStats(): Promise<DashboardStats> {
  // TODO: Implement API call
  console.log("[v0] API: getDashboardStats")
  return {
    totalProducts: 45,
    totalOrders: 128,
    revenue: 450000,
    growth: 23,
  }
}

// Products
export async function getProducts(
  params: {
    vendorId?: string
    category?: string
    search?: string
    limit?: number
    skip?: number
  } = {},
): Promise<{ products: Product[]; total: number }> {
  const query = new URLSearchParams()
  if (params.vendorId) query.append("vendorId", params.vendorId)
  if (params.category) query.append("category", params.category)
  if (params.search) query.append("search", params.search)
  if (params.limit) query.append("limit", params.limit.toString())
  if (params.skip) query.append("skip", params.skip.toString())

  return apiClient.get(`/api/products?${query.toString()}`)
}

export async function getProduct(id: string): Promise<Product> {
  return apiClient.get(`/api/products/${id}`)
}

export async function createProduct(data: Partial<Product>): Promise<Product> {
  return apiClient.post("/api/products", data)
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product> {
  return apiClient.patch(`/api/products/${id}`, data)
}

export async function deleteProduct(id: string): Promise<void> {
  return apiClient.delete(`/api/products/${id}`)
}

// Orders
export async function getOrders(
  params: {
    status?: string
    limit?: number
    skip?: number
  } = {},
): Promise<{ orders: Order[] }> {
  const query = new URLSearchParams()
  if (params.status) query.append("status", params.status)

  // The backend route currently returns { orders }
  return apiClient.get("/api/orders")
}

export async function getOrder(id: string): Promise<Order> {
  return apiClient.get(`/api/orders/${id}`)
}

export async function updateOrderStatus(id: string, status: string): Promise<Order> {
  return apiClient.patch(`/api/orders/${id}/status`, { status })
}

// Wallet
export async function getWalletBalance(): Promise<{ balance: number; transactions: Transaction[] }> {
  return apiClient.get("/api/payments/wallet")
}

export async function getTransactions(): Promise<Transaction[]> {
  const data = await getWalletBalance()
  return data.transactions
}

export async function createWithdrawal(amount: number, accountId: string): Promise<void> {
  return apiClient.post("/api/payments/withdraw", { amount, accountId })
}

// Promotions
export async function getPromotions(): Promise<any[]> {
  return apiClient.get("/api/promotions")
}

export async function createPromotion(data: any): Promise<void> {
  return apiClient.post("/api/promotions", data)
}

// Subscriptions
export async function getSubscriptionPlans(): Promise<any[]> {
  return apiClient.get("/api/subscriptions/plans")
}

export async function getCurrentSubscription(): Promise<any> {
  return apiClient.get("/api/subscriptions/current")
}

// Settings
export async function getVendorProfile(): Promise<VendorProfile> {
  // Using the user ID from token implicitly in backend
  // We can fetch /api/auth/me or similar, but here assuming we use vendor ID
  // For now, let's fetch the specific vendor endpoint if we have the ID,
  // or add a 'me' endpoint to vendors.
  // Let's implement a 'me' fetch via the generic vendors endpoint with a filter or similar if needed,
  // BUT the backend `vendors.ts` doesn't have `me`.
  // I'll assume the consumer knows the ID or we add `me` to backend.
  // Actually, `patch /profile` uses `req.user.userId`.
  // Let's add `get /profile` to backend or just use `patch` to return it? No.
  // Let's Assume we have the ID in local state or auth context.
  // For this implementation, I'll just use a placeholder that fetches the profile
  return apiClient.get(`/api/vendors/profile`) // I need to add this to backend
}

export async function updateVendorProfile(data: Partial<VendorProfile>): Promise<VendorProfile> {
  return apiClient.patch("/api/vendors/profile", data)
}

// Team
export async function getTeamMembers(): Promise<any[]> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Caleb Adenuga",
          role: "Admin",
          email: "calebadenuga@gmail.com",
          status: "Active",
        },
        {
          id: "2",
          name: "Kimmy Hendrics",
          role: "Manager",
          email: "kimmyhendrics@gmail.com",
          status: "Active",
        },
      ])
    }, 1000)
  })
}

export async function inviteTeamMember(data: any): Promise<void> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}

// Bank Accounts
export async function getBankAccounts(): Promise<any[]> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          bankName: "Guaranty Trust Bank",
          accountNumber: "0123456789",
          accountName: "Paris Food Ventures",
          isDefault: true,
        },
      ])
    }, 1000)
  })
}

export async function addBankAccount(data: any): Promise<void> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}
