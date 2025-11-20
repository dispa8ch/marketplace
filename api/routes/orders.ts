import express from 'express';
import { z } from 'zod';
import { Order } from '../models/Order';
import { authenticate, requireRole, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { AppError } from '../middleware/error-handler';

const router = express.Router();

const createOrderSchema = z.object({
  vendorId: z.string(),
  products: z.array(z.object({
    productId: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().int().positive(),
  })),
  total: z.number().positive(),
  deliveryFee: z.number().min(0),
  address: z.object({
    street: z.string(),
    lga: z.string(),
    state: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
});

router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const query: any = {};

    if (req.user!.role === 'customer') {
      query.customerId = req.user!.userId;
    } else if (req.user!.role === 'vendor') {
      query.vendorId = req.user!.userId;
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      throw new AppError('Order not found', 404);
    }

    if (
      req.user!.role === 'customer' && order.customerId !== req.user!.userId ||
      req.user!.role === 'vendor' && order.vendorId !== req.user!.userId
    ) {
      throw new AppError('Unauthorized', 403);
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  authenticate,
  requireRole('customer'),
  validate(createOrderSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const order = new Order({
        ...req.body,
        customerId: req.user!.userId,
      });

      await order.save();
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id/status',
  authenticate,
  async (req: AuthRequest, res, next) => {
    try {
      const { status } = req.body;
      const order = await Order.findById(req.params.id);

      if (!order) {
        throw new AppError('Order not found', 404);
      }

      if (req.user!.role === 'vendor' && order.vendorId !== req.user!.userId) {
        throw new AppError('Unauthorized', 403);
      }

      order.status = status;
      await order.save();

      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
