import express from 'express'
import { Product } from '../models/Product'
import { Vendor } from '../models/Vendor'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const { q = '', limit = 6 } = req.query
    const l = Number(limit) || 6

    const productQuery: any = { status: 'active' }
    if (q) productQuery.$text = { $search: q as string }

    const products = await Product.find(productQuery).limit(l).select('name category images').lean()

    // If vendor name matches are desired, do a text search on Vendors too
    const vendorQuery: any = {}
    if (q) vendorQuery.$text = { $search: q as string }
    const vendors = await Vendor.find(vendorQuery).limit(l).select('businessName logo').lean()

    // Mix results: products first, then vendors (truncate to limit)
    const items: any[] = []
    for (const p of products) {
      items.push({ id: p._id, type: 'product', title: p.name, subtitle: p.category, image: p.images && p.images[0] })
      if (items.length >= l) break
    }
    if (items.length < l) {
      for (const v of vendors) {
        items.push({ id: v._id, type: 'vendor', title: v.businessName, subtitle: 'Vendor', image: v.logo })
        if (items.length >= l) break
      }
    }

    res.json({ items })
  } catch (err) {
    next(err)
  }
})

export default router
