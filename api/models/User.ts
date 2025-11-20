import mongoose, { Schema, Model } from 'mongoose';
import { User as IUser } from '../../lib/types';

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['customer', 'vendor', 'admin'], 
      default: 'customer' 
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
