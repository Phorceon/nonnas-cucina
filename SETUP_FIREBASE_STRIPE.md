# Firebase & Stripe Setup Guide

## Quick Start

This project now includes Firebase (database) and Stripe (payments) integration.

## 1. Firebase Setup

### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"** → Name: `nonnas-cucina`
3. Click **"Create project"**

### Enable Firestore
1. Click **"Firestore Database"** → **"Create database"**
2. Select **"Start in test mode"**
3. Choose location (e.g., `us-central`)
4. Click **Enable**

### Get Credentials
1. Go to **⚙️ Settings** → **Project settings**
2. Scroll to **"Service accounts"**
3. Click **"Generate new private key"**
4. Download JSON file

### Add to `.env.local`
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

## 2. Stripe Setup

### Create Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your API keys from **Developers → API keys**

### Create Products & Prices
1. Go to **Products** → **Add product**
2. Create:
   - **Standard Reservation Deposit** - $25 (one-time)
   - **Private Room Deposit** - $100 (one-time)
3. Copy the Price IDs (start with `price_...`)

### Add to `.env.local`
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STANDARD_DEPOSIT=price_...
STRIPE_PRICE_VIP_DEPOSIT=price_...
```

### Set Up Stripe Webhook
1. Go to **Developers → Webhooks** → **Add endpoint**
2. Endpoint URL: `https://nonnas-cucina.vercel.app/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy the **Signing secret** to `STRIPE_WEBHOOK_SECRET`

## 3. Clerk Webhook Setup

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. **Webhooks** → **Add endpoint**
3. Endpoint URL: `https://nonnas-cucina.vercel.app/api/webhooks/clerk`
4. Select events: `user.created`, `user.updated`, `user.deleted`
5. Copy **Signing secret** to `CLERK_WEBHOOK_SECRET`

## 4. Deploy to Vercel

### Add Environment Variables
```bash
vercel env add FIREBASE_PROJECT_ID
vercel env add FIREBASE_CLIENT_EMAIL  
vercel env add FIREBASE_PRIVATE_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add STRIPE_PRICE_STANDARD_DEPOSIT
vercel env add STRIPE_PRICE_VIP_DEPOSIT
vercel env add CLERK_WEBHOOK_SECRET
```

### Redeploy
```bash
vercel --prod
```

## Database Schema

### Collections

**users** (auto-synced from Clerk)
```
{
  id: string (Clerk user ID)
  email: string
  firstName: string
  lastName: string
  imageUrl: string
  stripeCustomerId: string
  createdAt: string
  updatedAt: string
}
```

**reservations** (created on payment)
```
{
  userId: string
  stripeSessionId: string
  stripeCustomerId: string
  amount: number
  currency: string
  status: 'confirmed' | 'cancelled'
  date: string
  time: string
  guests: string
  seating: 'indoor' | 'patio' | 'private'
  firstName: string
  lastName: string
  email: string
  phone: string
  specialRequests: string
  createdAt: string
}
```

## Testing

### Test Payment Flow
1. Use Stripe test cards: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC

### Test Webhooks Locally
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Troubleshooting

### Firebase not initializing
- Check private key format (should include `\n` for newlines)
- Verify service account has Firestore access

### Stripe checkout fails
- Verify Price IDs are correct
- Check Stripe secret key is from test mode

### Webhooks not firing
- Verify webhook URLs are publicly accessible (use Vercel URL, not localhost)
- Check webhook secrets match exactly
