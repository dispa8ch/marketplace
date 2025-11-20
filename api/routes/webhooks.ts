import express from 'express';
import { PaystackService } from '../services/paystack-service';
import { Payment } from '../models/Payment';
import { Order } from '../models/Order';
import { OrderDelivery } from '../models/OrderDelivery';
import { PricingEngine } from '../services/pricing-engine';

const router = express.Router();

router.post('/paystack', async (req, res) => {
  try {
    const signature = req.headers['x-paystack-signature'] as string;

    if (!signature) {
      return res.status(400).json({ error: 'No signature provided' });
    }

    const payload = JSON.stringify(req.body);
    const isValid = PaystackService.verifyWebhookSignature(payload, signature);

    if (!isValid) {
      console.error('[v0] Invalid webhook signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = req.body;
    console.log(`[v0] Paystack webhook received: ${event.event}`);

    switch (event.event) {
      case 'charge.success': {
        const { reference, amount, channel, paid_at } = event.data;

        const payment = await Payment.findOne({ paystackReference: reference });
        if (!payment) {
          console.error(`[v0] Payment not found for reference: ${reference}`);
          break;
        }

        if (payment.status === 'success') {
          console.log(`[v0] Payment already processed: ${reference}`);
          break;
        }

        payment.status = 'success';
        payment.channel = channel;
        payment.paidAt = new Date(paid_at);
        await payment.save();

        const order = await Order.findById(payment.orderId);
        if (order) {
          order.paymentStatus = 'paid';
          order.status = 'paid';
          await order.save();

          const estimates = await PricingEngine.estimate({
            pickup: order.address.coordinates,
            dropoff: order.address.coordinates,
            package: { weight: 1, volume: 1 },
            prefer: 'cheapest',
          });

          if (estimates.length > 0) {
            const bestEstimate = estimates[0];

            const delivery = new OrderDelivery({
              order_id: order._id.toString(),
              chosen_provider: bestEstimate.provider_name,
              provider_type: bestEstimate.provider_type,
              price: bestEstimate.price,
              estimated_time: bestEstimate.eta_minutes,
              status: 'assigned',
            });

            await delivery.save();

            order.status = 'assigned';
            order.deliveryPartnerId = bestEstimate.provider_id;
            await order.save();

            console.log(`[v0] Order ${order._id} assigned to ${bestEstimate.provider_name}`);
          }
        }

        console.log(`[v0] Payment successful: ${reference}`);
        break;
      }

      case 'charge.failed': {
        const { reference } = event.data;

        const payment = await Payment.findOne({ paystackReference: reference });
        if (payment) {
          payment.status = 'failed';
          await payment.save();

          const order = await Order.findById(payment.orderId);
          if (order) {
            order.paymentStatus = 'failed';
            await order.save();
          }
        }

        console.log(`[v0] Payment failed: ${reference}`);
        break;
      }

      case 'transfer.success': {
        console.log('[v0] Transfer successful');
        break;
      }

      case 'transfer.failed': {
        console.log('[v0] Transfer failed');
        break;
      }

      default:
        console.log(`[v0] Unhandled event type: ${event.event}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('[v0] Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;
