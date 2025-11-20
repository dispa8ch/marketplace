import mongoose, { Schema, Model } from 'mongoose';
import { Order as IOrder } from '../../lib/types';

const orderSchema = new Schema<IOrder>(
  {
    customerId: { type: String, required: true, ref: 'User' },
    vendorId: { type: String, required: true, ref: 'Vendor' },
    products: [{
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    }],
    total: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    deliveryPartnerId: { type: String },
    status: { 
      type: String, 
      enum: ['pending', 'paid', 'assigned', 'in_transit', 'delivered', 'cancelled'], 
      default: 'pending' 
    },
    paymentStatus: { 
      type: String, 
      enum: ['pending', 'paid', 'failed'], 
      default: 'pending' 
    },
    address: {
      street: { type: String, required: true },
      lga: { type: String, required: true },
      state: { type: String, required: true },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    paystackReference: { type: String },
  },
  { timestamps: true }
);

orderSchema.index({ customerId: 1 });
orderSchema.index({ vendorId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paystackReference: 1 });

export const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);
