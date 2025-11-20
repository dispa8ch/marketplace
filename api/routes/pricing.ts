import express from 'express';
import { z } from 'zod';
import { PricingEngine } from '../services/pricing-engine';
import { validate } from '../middleware/validate';

const router = express.Router();

const estimateSchema = z.object({
  pickup: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  dropoff: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  package: z.object({
    weight: z.number().positive(),
    volume: z.number().positive(),
  }),
  prefer: z.enum(['cheapest', 'fastest']).optional(),
});

router.post('/estimate', validate(estimateSchema), async (req, res, next) => {
  try {
    const estimates = await PricingEngine.estimate(req.body);
    res.json({ estimates });
  } catch (error) {
    next(error);
  }
});

export default router;
