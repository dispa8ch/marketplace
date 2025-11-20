import mongoose, { Schema, Model } from 'mongoose';
import { LGAZone as ILGAZone } from '../../lib/types';

const lgaZoneSchema = new Schema<ILGAZone>({
  _id: { type: String, required: true },
  type: { type: String, enum: ['LGA'], default: 'LGA' },
  centroid: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  polygon: { type: Schema.Types.Mixed },
});

lgaZoneSchema.index({ centroid: '2dsphere' });

export const LGAZone: Model<ILGAZone> = 
  mongoose.models.LGAZone || mongoose.model<ILGAZone>('LGAZone', lgaZoneSchema);
