# Dispa8ch Marketplace

A hyper-local e-commerce marketplace connecting customers with nearby SMEs and intelligent delivery routing.

## Overview

Dispa8ch is a full-stack marketplace platform featuring:
- Customer Marketplace App (UI-first implementation)
- Vendor Dashboard (scaffold)
- Admin Console (scaffold)
- Mock LGA-based Logistics Pricing Engine
- Supabase-ready architecture
- Paystack Payment Integration (stubbed)

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- TypeScript
- TailwindCSS v4
- SF Pro Font (fallback to system fonts)
- SWR for data fetching
- Mock authentication with localStorage

### Backend (Scaffolded)
- Supabase for database/auth/storage (ready for integration)
- Serverless API stubs for payments, webhooks, complaints
- Mock data from JSON files

### Integrations (Stubbed for Phase 1)
- Paystack (Payments - UI only, mock flow)
- Supabase (Database - schema ready, using mock data)
- AWS S3 / Firebase Storage (for future image uploads)

## Project Structure

\`\`\`
/
├── app/                    # Next.js App Router
│   ├── (customer)/        # Customer marketplace pages
│   ├── (vendor)/          # Vendor dashboard pages (scaffold)
│   ├── (admin)/           # Admin console pages (scaffold)
│   └── api/               # Serverless API stubs
├── components/            # Shared React components
├── lib/                   # Utilities, types, pricing engine
├── data/seed/            # Mock JSON data (shops, products, logistics)
├── public/               # Static assets
└── supabase/             # SQL schemas and seed scripts (future)
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd dispa8ch-marketplace
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
cp .env.example .env.local
\`\`\`

**Note:** Phase 1 uses mock data and doesn't require live credentials. Update `.env.local` when ready to connect to real services:
- Supabase credentials (for database)
- Paystack test keys (for payments)
- See `.env.example` for all variables

4. Run development server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## Design System

### Colors (Exact per PDF)
- Primary: `#E41F47`
- Text: `#171717`
- Muted: `#757575`
- Accent: `#FFEDF0`
- Background: `#FDFDFD`
- Border: `#E6E6E6`

### Spacing Tokens
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- xxl: 32px

### Typography
- Font: SF Pro (fallback to system fonts)
- Weights: 400 (regular), 500 (medium), 700 (bold)
- Border radius: default 8px, buttons 6px

### Input Styling
- 1px border `#E6E6E6`
- No box shadows
- Focus ring: `rgba(228,31,71,0.12)` with smooth transition

## Features (Phase 1 - Customer Marketplace)

### Implemented
- Home page with flash sale, categories, featured shops
- Product listing with filters (location, category, price, ratings)
- Product detail page with variants, reviews, vendor info
- Vendor profile page (Instagram-style layout)
- Search with realtime dropdown (top 3 results)
- Cart with localStorage persistence
- Checkout flow (3-step UI with mock auth guard)
- Order tracking with timeline
- User settings (Account, Wallet, Orders, Notifications, Languages)
- Likes/Wishlist with localStorage
- Mock authentication (login/signup simulation with returnUrl)
- LGA-based delivery pricing engine
- Responsive design (mobile-first, matches PDF exactly)

### Mock Behavior
- **Authentication:** Stored in localStorage, simulates login/signup
- **Cart:** Persisted in localStorage across sessions
- **Likes:** Stored in localStorage, badge shows count > 0
- **Pricing:** Uses `data/seed/logistics-seed.json` for deterministic rates
- **Paystack:** Checkout UI only, no real payment processing
- **Search:** Filters local JSON data (shops.json, products.json)

## Data & Mocks

All data loads from `/data/seed/`:
- `shops.json` - 10 sample shops
- `products.json` - 50 sample products
- `logistics-seed.json` - 17 Lagos LGAs with zones, coordinates, and delivery rates

Mock pricing engine in `/lib/pricing/mock-pricing-engine.ts`:
- Haversine distance calculation
- Zone-based pricing (mainland, island, outskirts)
- Provider ranking (deterministic, sorted by price)

## Environment Variables

See `.env.example` for all required environment variables including:
- MongoDB connection string
- Paystack API keys (test keys pre-configured)
- AWS S3 credentials
- Email/SMS service keys

## Deployment

### Frontend (Vercel)
\`\`\`bash
vercel deploy
\`\`\`

### Backend (Render/Railway)
See backend deployment documentation.

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## Support

For issues: support@dispa8ch.com

## License

Proprietary - All rights reserved
