import mongoose, { Schema, Model } from 'mongoose';

export interface Payment {
  _id: string;
  orderId: string;
  customerId: string;
  amount: number;
  paystackReference: string;
  status: 'pending' | 'success' | 'failed';
  channel?: string;
  paidAt?: Date;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<Payment>(
  {
    orderId: { type: String, required: true, ref: 'Order' },
    customerId: { type: String, required: true, ref: 'User' },
    amount: { type: Number, required: true },
    paystackReference: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    channel: { type: String },
    paidAt: { type: Date },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

paymentSchema.index({ orderId: 1 });
paymentSchema.index({ paystackReference: 1 });
paymentSchema.index({ customerId: 1 });

export const Payment: Model<Payment> =
  mongoose.models.Payment || mongoose.model<Payment>('Payment', paymentSchema);
