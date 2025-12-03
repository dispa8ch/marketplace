// Admin API functions for backend integration
import { apiClient } from "../api-client"

export interface AdminDashboardStats {
  totalVendors: number
  totalCustomers: number
  totalOrders: number
  platformRevenue: number
}

export interface Vendor {
  _id: string
  businessName: string
  email: string
  phone: string
  address: {
    street: string
    lga: string
    state: string
    city: string
  }
  verified: boolean
  createdAt: string
}

export interface Customer {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  createdAt: string
}

export interface LogisticsPartner {
  _id: string
  name: string
  email: string
  phone: string
  serviceArea: string
  activeOrders: number
}

export interface WithdrawalRequest {
  id: string
  vendorName: string
  amount: number
  bankName: string
  accountNumber: string
  accountName: string
  requestDate: string
  status: "pending" | "approved" | "rejected"
}

// Dashboard
export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  return apiClient.get("/api/admin/stats")
}

// Vendors
export async function getVendors(): Promise<Vendor[]> {
  return apiClient.get("/api/admin/vendors")
}

export async function getVendor(id: string): Promise<Vendor> {
  // Reusing the public vendor endpoint but could be admin specific if needed
  return apiClient.get(`/api/vendors/${id}`)
}

export async function approveVendor(id: string): Promise<void> {
  return apiClient.patch(`/api/admin/vendors/${id}/status`, { status: "verified" })
}

export async function suspendVendor(id: string, reason: string): Promise<void> {
  // Simplified to just unverify for now, real app would have suspended status
  return apiClient.patch(`/api/admin/vendors/${id}/status`, { status: "suspended", reason })
}

export async function restoreVendor(id: string): Promise<void> {
  return apiClient.patch(`/api/admin/vendors/${id}/status`, { status: "verified" })
}

// Customers
export async function getCustomers(): Promise<Customer[]> {
  return apiClient.get("/api/admin/customers")
}

// Logistics
export async function getLogisticsPartners(): Promise<LogisticsPartner[]> {
  return apiClient.get("/api/admin/logistics")
}

export async function addLogisticsPartner(data: Partial<LogisticsPartner>): Promise<void> {
  return apiClient.post("/api/admin/logistics", data)
}

// Withdrawals
export async function getWithdrawalRequests(): Promise<WithdrawalRequest[]> {
  return apiClient.get("/api/admin/withdrawals")
}

export async function approveWithdrawal(id: string): Promise<void> {
  return apiClient.patch(`/api/admin/withdrawals/${id}`, { status: "approved" })
}

export async function rejectWithdrawal(id: string): Promise<void> {
  return apiClient.patch(`/api/admin/withdrawals/${id}`, { status: "rejected" })
}

// Platform settings
export async function getPlatformFees(): Promise<any> {
  return apiClient.get("/api/admin/settings/fees")
}

export async function updatePlatformFees(fees: any): Promise<void> {
  return apiClient.post("/api/admin/settings/fees", fees)
}

// Announcements
export async function sendAnnouncement(data: any): Promise<void> {
  return apiClient.post("/api/admin/announcements", data)
}
