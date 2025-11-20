import express from 'express';
import { z } from 'zod';
import { Product } from '../models/Product';
import { authenticate, requireRole, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { AppError } from '../middleware/error-handler';

const router = express.Router();

const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  images: z.array(z.string()).optional(),
  category: z.string().min(1),
  stock: z.number().int().min(0),
});

router.get('/', async (req, res, next) => {
  try {
    const { vendorId, category, search, limit = 20, skip = 0 } = req.query;

    const query: any = { status: 'active' };
    if (vendorId) query.vendorId = vendorId;
    if (category) query.category = category;
    if (search) query.$text = { $search: search as string };

    const products = await Product.find(query)
      .limit(Number(limit))
      .skip(Number(skip))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.json({ products, total });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  authenticate,
  requireRole('vendor'),
  validate(createProductSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const product = new Product({
        ...req.body,
        vendorId: req.user!.userId,
      });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  authenticate,
  requireRole('vendor'),
  async (req: AuthRequest, res, next) => {
    try {
      const product = await Product.findOne({
        _id: req.params.id,
        vendorId: req.user!.userId,
      });

      if (!product) {
        throw new AppError('Product not found', 404);
      }

      Object.assign(product, req.body);
      await product.save();
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  authenticate,
  requireRole('vendor'),
  async (req: AuthRequest, res, next) => {
    try {
      const product = await Product.findOneAndDelete({
        _id: req.params.id,
        vendorId: req.user!.userId,
      });

      if (!product) {
        throw new AppError('Product not found', 404);
      }

      res.json({ message: 'Product deleted' });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
