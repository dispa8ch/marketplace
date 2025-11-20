import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(uri);
    console.log('[v0] MongoDB connected successfully');
  } catch (error) {
    console.error('[v0] MongoDB connection error:', error);
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('[v0] MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('[v0] MongoDB error:', err);
});
