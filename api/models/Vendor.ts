import mongoose, { Schema, Model } from 'mongoose';
import { Vendor as IVendor } from '../../lib/types';

const vendorSchema = new Schema<IVendor>(
  {
    ownerId: { type: String, required: true, ref: 'User' },
    businessName: { type: String, required: true },
    businessEmail: { type: String, required: true },
    businessPhone: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      lga: { type: String, required: true },
      state: { type: String, required: true },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    logo: { type: String },
    subscriptionPlan: { 
      type: String, 
      enum: ['free', 'basic', 'premium'], 
      default: 'free' 
    },
    subscriptionExpiry: { type: Date, required: true },
    products: [{ type: String, ref: 'Product' }],
    ratings: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

vendorSchema.index({ ownerId: 1 });
vendorSchema.index({ 'address.lga': 1 });
vendorSchema.index({ 'address.coordinates': '2dsphere' });

export const Vendor: Model<IVendor> = mongoose.models.Vendor || mongoose.model<IVendor>('Vendor', vendorSchema);
