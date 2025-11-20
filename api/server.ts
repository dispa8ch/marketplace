import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './config/database';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import vendorRoutes from './routes/vendors';
import suggestionsRoutes from './routes/suggestions';
import orderRoutes from './routes/orders';
import pricingRoutes from './routes/pricing';
import paymentRoutes from './routes/payments';
import webhookRoutes from './routes/webhooks';
import { errorHandler } from './middleware/error-handler';

const app = express();
const PORT = process.env.PORT || 3001;

// Webhook route must come before express.json() for raw body
app.use('/api/webhooks', express.raw({ type: 'application/json' }), webhookRoutes);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/suggestions', suggestionsRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`[v0] Backend API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('[v0] Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
