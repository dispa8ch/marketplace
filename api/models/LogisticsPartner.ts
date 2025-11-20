import mongoose, { Schema, Model } from 'mongoose';
import { LogisticsPartner as ILogisticsPartner } from '../../lib/types';

const logisticsPartnerSchema = new Schema<ILogisticsPartner>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    coverage: [{ type: String }],
    rate_table: {
      within_lga: { type: Number, required: true },
      to_island: { type: Number, required: true },
      outskirts: { type: Number, required: true },
    },
    base_fee: { type: Number, default: 0 },
    per_km: { type: Number, default: 0 },
    last_sync: { type: Date, default: Date.now },
    status: { 
      type: String, 
      enum: ['active', 'inactive'], 
      default: 'active' 
    },
    metadata: {
      source: { type: String },
    },
  },
  { timestamps: true }
);

logisticsPartnerSchema.index({ code: 1 });
logisticsPartnerSchema.index({ coverage: 1 });
logisticsPartnerSchema.index({ status: 1 });

export const LogisticsPartner: Model<ILogisticsPartner> = 
  mongoose.models.LogisticsPartner || mongoose.model<ILogisticsPartner>('LogisticsPartner', logisticsPartnerSchema);
