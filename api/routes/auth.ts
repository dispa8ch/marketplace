import express from 'express';
import { z } from 'zod';
import { User } from '../models/User';
import { Vendor } from '../models/Vendor';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { validate } from '../middleware/validate';
import { AppError } from '../middleware/error-handler';

const router = express.Router();

const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(8),
  role: z.enum(['customer', 'vendor']).default('customer'),
  businessInfo: z.object({
    businessName: z.string(),
    businessEmail: z.string().email(),
    businessPhone: z.string(),
    address: z.object({
      street: z.string(),
      lga: z.string(),
      state: z.string(),
      coordinates: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    }),
  }).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password, role, businessInfo } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    const passwordHash = await hashPassword(password);

    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      passwordHash,
      role,
    });

    await user.save();

    if (role === 'vendor' && businessInfo) {
      const vendor = new Vendor({
        ownerId: user._id.toString(),
        businessName: businessInfo.businessName,
        businessEmail: businessInfo.businessEmail,
        businessPhone: businessInfo.businessPhone,
        address: businessInfo.address,
        subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
      await vendor.save();
    }

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValidPassword = await comparePassword(password, user.passwordHash);
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
