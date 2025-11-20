# Paystack Integration Setup Guide

## Overview

The Dispa8ch marketplace uses Paystack for:
1. Customer checkout payments
2. Vendor subscription billing
3. Vendor payout transfers

## Environment Variables

Add these to your `.env` file:

\`\`\`bash
# Pre-configured Test Keys for Dispa8ch
PAYSTACK_SECRET_KEY=sk_test_55cd9d0106af3f2a6f70980f7be131debe685341
PAYSTACK_PUBLIC_KEY=pk_test_b222ed1e17c0a29f08ff4dc267d9e3ed87154da1
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_b222ed1e17c0a29f08ff4dc267d9e3ed87154da1
PAYSTACK_WEBHOOK_SECRET=your_webhook_secret_from_dashboard
\`\`\`

## Getting API Keys

1. Sign up at [https://paystack.com](https://paystack.com)
2. Go to Settings > API Keys & Webhooks
3. Copy your Test keys for development
4. Copy your Live keys for production

## Webhook Setup

1. Go to Settings > API Keys & Webhooks
2. Add webhook URL: `https://dispa8h.vercel.app/api/webhooks/paystack`
3. Copy the webhook secret and update `PAYSTACK_WEBHOOK_SECRET` in your `.env`
4. Select events to listen for:
   - charge.success
   - charge.failed
   - transfer.success
   - transfer.failed

## Testing

Use Paystack test cards:

### Successful Payment
- Card: 4084 0840 8408 4081
- CVV: Any 3 digits
- Expiry: Any future date
- PIN: 1234

### Insufficient Funds
- Card: 5060 6666 6666 6666 4963
- CVV: Any 3 digits
- Expiry: Any future date

### PIN Required
- Card: 5078 5078 5078 5078 12
- CVV: Any 3 digits  
- Expiry: Any future date
- PIN: 1111

## Payment Flow

1. Customer places order
2. Frontend calls `/api/payments/initiate`
3. Backend creates Paystack transaction
4. Customer redirected to Paystack checkout
5. On success, Paystack calls webhook
6. Webhook updates order status
7. Pricing engine assigns delivery partner
8. Customer redirected to success page

## Security

- Always verify webhook signatures
- Use HTTPS in production
- Never expose secret keys in frontend
- Validate all amounts server-side

## Support

For issues: https://paystack.com/docs
