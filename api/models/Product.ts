import mongoose, { Schema, Model } from 'mongoose';
import { Product as IProduct } from '../../lib/types';

const productSchema = new Schema<IProduct>(
  {
    vendorId: { type: String, required: true, ref: 'Vendor' },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    status: { 
      type: String, 
      enum: ['active', 'inactive'], 
      default: 'active' 
    },
  },
  { timestamps: true }
);

productSchema.index({ vendorId: 1 });
productSchema.index({ category: 1 });
productSchema.index({ name: 'text', description: 'text' });

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);
