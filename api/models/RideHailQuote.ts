import mongoose, { Schema, Model } from 'mongoose';
import { RideHailQuote as IRideHailQuote } from '../../lib/types';

const rideHailQuoteSchema = new Schema<IRideHailQuote>({
  provider: { type: String, enum: ['uber', 'bolt'], required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  distance_km: { type: Number, required: true },
  eta: { type: Number, required: true },
  price_estimate: { type: Number, required: true },
  fetched_at: { type: Date, default: Date.now },
});

rideHailQuoteSchema.index({ from: 1, to: 1, fetched_at: -1 });
rideHailQuoteSchema.index({ fetched_at: 1 }, { expireAfterSeconds: 120 });

export const RideHailQuote: Model<IRideHailQuote> = 
  mongoose.models.RideHailQuote || mongoose.model<IRideHailQuote>('RideHailQuote', rideHailQuoteSchema);
