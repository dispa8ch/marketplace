# Deployment Guide

## Architecture Overview

The Dispa8ch Marketplace uses a **separated architecture**:

- **Frontend (Next.js)** → Deploy to Vercel
- **Backend (Express API)** → Deploy separately to Railway/Render
- **Database (MongoDB)** → MongoDB Atlas

This separation avoids Vercel's 12-function limit and provides better scalability.

## Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Vercel account (frontend)
- Render/Railway account (backend)
- Paystack account

## Frontend Deployment (Vercel)

### 1. Push to GitHub

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
\`\`\`

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_BASE_URL`
   - `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
4. Deploy

## Backend Deployment (Render)

### 1. Create Render Web Service

1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Configure:
   - Build Command: `cd api && npm install && npm run build`
   - Start Command: `cd api && npm start`
   - Environment: Node

### 2. Add Environment Variables

Add all variables from `.env.example`:
- `MONGODB_URI`
- `JWT_SECRET`
- `PAYSTACK_SECRET_KEY`
- `PAYSTACK_WEBHOOK_SECRET`
- `AWS_*` variables
- `SENDGRID_API_KEY`
- `TWILIO_*` variables

### 3. Deploy

Click "Create Web Service"

## Database Setup

### 1. MongoDB Atlas

1. Create cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for testing)
4. Get connection string
5. Update `MONGODB_URI` in environment variables

### 2. Seed Database

\`\`\`bash
# Seed LGA zones
npm run seed:lga

# Seed logistics partners
npm run seed:partners
\`\`\`

## Paystack Configuration

### 1. Webhook Setup

1. Go to Paystack Dashboard → Settings → API Keys & Webhooks
2. Add webhook URL: `https://your-api-domain.com/api/webhooks/paystack`
3. Copy webhook secret
4. Update `PAYSTACK_WEBHOOK_SECRET`

### 2. Test Payment

Use Paystack test cards to verify payment flow

## Post-Deployment Checklist

- [ ] Frontend accessible
- [ ] Backend health check: `<api-url>/health`
- [ ] Database connection working
- [ ] Authentication working
- [ ] Paystack webhooks receiving events
- [ ] Email/SMS notifications working
- [ ] Logistics pricing engine returning estimates
- [ ] Admin can approve vendors
- [ ] Vendors can add products
- [ ] Customers can place orders
- [ ] Payment flow complete

## Monitoring

- Set up error tracking (Sentry)
- Monitor API performance
- Track database queries
- Monitor webhook delivery

## Scaling Considerations

- Enable database indexes
- Implement Redis caching
- Use CDN for images
- Optimize API queries
- Implement rate limiting
