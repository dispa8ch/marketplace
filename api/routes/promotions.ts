import express from "express"
import { authenticate, requireRole } from "../middleware/auth"

const router = express.Router()

// Mock data for now as we don't have a Promotion model yet
const MOCK_PROMOTIONS = [
  {
    id: "PROMO-1",
    name: "Creamy Milkshake Fruit Parfait",
    type: "Sponsored Ad",
    spend: 7000,
    start: "2025-09-12",
    end: "2025-09-24",
    status: "active",
  },
  {
    id: "PROMO-2",
    name: "Holiday Combo Offer",
    type: "Banner Feature",
    spend: 7000,
    start: "2025-09-14",
    end: "2025-10-18",
    status: "scheduled",
  },
]

router.get("/", authenticate, requireRole("vendor"), (req, res) => {
  res.json(MOCK_PROMOTIONS)
})

router.post("/", authenticate, requireRole("vendor"), (req, res) => {
  const newPromo = {
    id: `PROMO-${Date.now()}`,
    ...req.body,
    status: "scheduled",
  }
  MOCK_PROMOTIONS.push(newPromo)
  res.status(201).json(newPromo)
})

export default router
