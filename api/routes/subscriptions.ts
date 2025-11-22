import express from "express"
import { authenticate, requireRole } from "../middleware/auth"

const router = express.Router()

const PLANS = [
  {
    name: "Free Plan",
    price: 0,
    period: "month",
    features: ["Up to 10 products", "Standard delivery"],
    current: true,
  },
  {
    name: "Starter Plan",
    price: 17000,
    period: "month",
    features: ["Unlimited products", "Priority delivery"],
    current: false,
  },
  {
    name: "Growth Plan",
    price: 50000,
    period: "month",
    features: ["Advanced analytics", "Team access"],
    current: false,
  },
]

router.get("/plans", (req, res) => {
  res.json(PLANS)
})

router.get("/current", authenticate, requireRole("vendor"), (req, res) => {
  res.json({
    plan: PLANS[0],
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: "active",
  })
})

export default router
