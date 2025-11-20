# Dispa8ch Marketplace API

Express + TypeScript + MongoDB backend for the Dispa8ch Marketplace.

## Features

- JWT authentication with role-based access (customer, vendor, admin)
- MongoDB with Mongoose ODM
- Logistics pricing engine with LGA zone matching
- Paystack payment integration with webhooks
- Ride-hail API adapter (Uber, Bolt)
- File upload support (AWS S3)
- Rate limiting and security middleware

## Local Development

\`\`\`bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env

# Edit .env with your credentials
# Start MongoDB locally or use MongoDB Atlas

# Run development server
pnpm run dev

# API available at http://localhost:5000
\`\`\`

## Production Deployment

See [../docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md) for full deployment instructions.

**Quick Deploy to Railway:**

\`\`\`bash
# Install Railway CLI
npm install -g @railway/cli

# Login and initialize
railway login
railway init

# Deploy
railway up
\`\`\`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user (requires auth)

### Products
- GET `/api/products` - List all products
- GET `/api/products/:id` - Get product details
- POST `/api/products` - Create product (vendor only)
- PUT `/api/products/:id` - Update product (vendor only)
- DELETE `/api/products/:id` - Delete product (vendor only)

### Orders
- POST `/api/orders` - Create order (customer)
- GET `/api/orders` - List user orders
- GET `/api/orders/:id` - Get order details
- PUT `/api/orders/:id/status` - Update order status (vendor/admin)

### Pricing
- POST `/api/pricing/estimate` - Get delivery price estimates

### Payments
- POST `/api/payments/initialize` - Initialize Paystack payment
- GET `/api/payments/:reference/verify` - Verify payment

### Webhooks
- POST `/api/webhooks/paystack` - Paystack payment webhook

### Vendors (Admin only)
- GET `/api/vendors` - List all vendors
- GET `/api/vendors/:id` - Get vendor details
- PUT `/api/vendors/:id/approve` - Approve vendor

## Environment Variables

See `.env.example` for all required environment variables.

## Testing

\`\`\`bash
# Run unit tests
pnpm test

# Run with coverage
pnpm test:coverage
\`\`\`

## Database Seeding

\`\`\`bash
# Seed Lagos LGA zones
pnpm run seed:lga-zones

# Seed logistics partners
pnpm run seed:logistics-partners
