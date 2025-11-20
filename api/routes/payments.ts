import express from 'express';
import { z } from 'zod';
import { Order } from '../models/Order';
import { Payment } from '../models/Payment';
import { User } from '../models/User';
import { PaystackService } from '../services/paystack-service';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { AppError } from '../middleware/error-handler';

const router = express.Router();

const initiatePaymentSchema = z.object({
  orderId: z.string(),
});

router.post(
  '/initiate',
  authenticate,
  validate(initiatePaymentSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const { orderId } = req.body;

      const order = await Order.findById(orderId);
      if (!order) {
        throw new AppError('Order not found', 404);
      }

      if (order.customerId !== req.user!.userId) {
        throw new AppError('Unauthorized', 403);
      }

      if (order.paymentStatus === 'paid') {
        throw new AppError('Order already paid', 400);
      }

      const user = await User.findById(req.user!.userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      const reference = `ORD-${orderId}-${Date.now()}`;
      const totalAmount = order.total + order.deliveryFee;

      const payment = new Payment({
        orderId: order._id.toString(),
        customerId: user._id.toString(),
        amount: totalAmount,
        paystackReference: reference,
        status: 'pending',
      });

      await payment.save();

      order.paystackReference = reference;
      await order.save();

      const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/orders/${orderId}/payment-callback`;

      const paystackResponse = await PaystackService.initializeTransaction({
        email: user.email,
        amount: totalAmount,
        reference,
        callback_url: callbackUrl,
        metadata: {
          orderId: order._id.toString(),
          customerId: user._id.toString(),
        },
      });

      res.json({
        authorization_url: paystackResponse.data.authorization_url,
        access_code: paystackResponse.data.access_code,
        reference: paystackResponse.data.reference,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/verify/:reference', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { reference } = req.params;

    const payment = await Payment.findOne({ paystackReference: reference });
    if (!payment) {
      throw new AppError('Payment not found', 404);
    }

    if (payment.customerId !== req.user!.userId && req.user!.role !== 'admin') {
      throw new AppError('Unauthorized', 403);
    }

    const verification = await PaystackService.verifyTransaction(reference);

    if (verification.data.status === 'success') {
      payment.status = 'success';
      payment.channel = verification.data.channel;
      payment.paidAt = new Date(verification.data.paid_at);
      await payment.save();

      const order = await Order.findById(payment.orderId);
      if (order) {
        order.paymentStatus = 'paid';
        order.status = 'paid';
        await order.save();
      }
    } else {
      payment.status = 'failed';
      await payment.save();

      const order = await Order.findById(payment.orderId);
      if (order) {
        order.paymentStatus = 'failed';
        await order.save();
      }
    }

    res.json({
      status: payment.status,
      amount: payment.amount,
      reference: payment.paystackReference,
      paidAt: payment.paidAt,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
