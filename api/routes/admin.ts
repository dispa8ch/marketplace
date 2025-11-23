import express from "express"
import { authenticate, requireRole } from "../middleware/auth"
import { User } from "../models/User"
import { Vendor } from "../models/Vendor"
import { Order } from "../models/Order"
import { LogisticsPartner } from "../models/LogisticsPartner"

const router = express.Router()

// Middleware to ensure only admins can access these routes
router.use(authenticate, requireRole("admin"))

// Dashboard Stats
router.get("/stats", async (req, res) => {
  try {
    const totalVendors = await Vendor.countDocuments()
    const totalCustomers = await User.countDocuments({ role: "customer" })
    const totalOrders = await Order.countDocuments()

    // Calculate platform revenue (assuming a commission, e.g. 5% of paid orders)
    const paidOrders = await Order.find({ status: "paid" })
    const platformRevenue = paidOrders.reduce((acc, order) => acc + order.total * 0.05, 0)

    res.json({
      totalVendors,
      totalCustomers,
      totalOrders,
      platformRevenue,
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" })
  }
})

// Vendors Management
router.get("/vendors", async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 })
    res.json(vendors)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vendors" })
  }
})

router.patch("/vendors/:id/status", async (req, res) => {
  try {
    const { status } = req.body // verified, suspended
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      {
        verified: status === "verified",
      },
      { new: true },
    )

    res.json(vendor)
  } catch (error) {
    res.status(500).json({ error: "Failed to update vendor status" })
  }
})

// Customers Management
router.get("/customers", async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" }).sort({ createdAt: -1 })
    res.json(customers)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customers" })
  }
})

// Logistics Management
router.get("/logistics", async (req, res) => {
  try {
    const partners = await LogisticsPartner.find()
    res.json(partners)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch logistics partners" })
  }
})

router.post("/logistics", async (req, res) => {
  try {
    const partner = new LogisticsPartner(req.body)
    await partner.save()
    res.status(201).json(partner)
  } catch (error) {
    res.status(500).json({ error: "Failed to create logistics partner" })
  }
})

// Withdrawals (Mock Implementation as we don't have a Withdrawal model yet)
const MOCK_WITHDRAWALS = [
  {
    id: "WD-001",
    vendorName: "Paris Food Ventures",
    amount: 50000,
    bankName: "GTBank",
    accountNumber: "0123456789",
    accountName: "Paris Food Ventures",
    requestDate: "2024-01-15T10:00:00Z",
    status: "pending",
  },
  // ... more mock data
]

router.get("/withdrawals", (req, res) => {
  res.json(MOCK_WITHDRAWALS)
})

router.patch("/withdrawals/:id", (req, res) => {
  const { status } = req.body
  const withdrawal = MOCK_WITHDRAWALS.find((w) => w.id === req.params.id)
  if (withdrawal) {
    withdrawal.status = status
    res.json(withdrawal)
  } else {
    res.status(404).json({ error: "Withdrawal not found" })
  }
})

// Platform Settings
router.get("/settings/fees", (req, res) => {
  res.json({
    commission: 5,
    transactionFee: 50,
    withdrawalFee: 100,
  })
})

router.post("/settings/fees", (req, res) => {
  // In a real app, update database config
  res.json(req.body)
})

router.post("/announcements", (req, res) => {
  // In a real app, send emails/notifications
  res.json({ message: "Announcement sent" })
})

export default router
