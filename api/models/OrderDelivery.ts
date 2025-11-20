import mongoose, { Schema, Model } from 'mongoose';
import { OrderDelivery as IOrderDelivery } from '../../lib/types';

const orderDeliverySchema = new Schema<IOrderDelivery>(
  {
    order_id: { type: String, required: true, ref: 'Order' },
    chosen_provider: { type: String, required: true },
    provider_type: { 
      type: String, 
      enum: ['partner', 'ride_hail'], 
      required: true 
    },
    price: { type: Number, required: true },
    estimated_time: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['assigned', 'in_transit', 'delivered', 'cancelled'], 
      default: 'assigned' 
    },
    tracking_url: { type: String },
    provider_reference: { type: String },
  },
  { timestamps: true }
);

orderDeliverySchema.index({ order_id: 1 });
orderDeliverySchema.index({ status: 1 });

export const OrderDelivery: Model<IOrderDelivery> = 
  mongoose.models.OrderDelivery || mongoose.model<IOrderDelivery>('OrderDelivery', orderDeliverySchema);
