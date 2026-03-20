# Project: Italian Restaurant SaaS

A Next.js application for an Italian restaurant with authentication, order management, and payment processing.

## Project Name
Italian Restaurant

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.0 | App Router framework |
| React | 19.2.4 | UI library (with React Compiler) |
| TypeScript | ^5 | Type safety (strict mode) |
| Tailwind CSS | ^4 | Styling |
| Clerk | ^7.0.5 | Authentication |
| Firebase Admin | ^13.7.0 | Server-side database operations |
| Firebase | ^12.11.0 | Client-side Firebase |
| Stripe | ^20.4.1 / ^8.11.0 | Payment processing |
| Svix | ^1.89.0 | Webhook verification |

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Directory Structure

```
src/
├── app/
│   ├── api/webhooks/clerk/    # Clerk webhook for user sync
│   ├── sign-in/[[...sign-in]]/ # Catch-all Clerk sign-in route
│   ├── sign-up/[[...sign-up]]/ # Catch-all Clerk sign-up route
│   ├── layout.tsx             # Root layout with ClerkProvider
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles (Tailwind v4)
├── lib/
│   └── firebase-admin.ts      # Firebase Admin SDK initialization
└── middleware.ts              # Route protection
```

### Authentication Flow

1. **Clerk** handles user authentication (sign-in, sign-up, sessions)
2. **Protected Routes**: `/checkout/*` and `/order-history/*` require authentication
3. **Middleware** (`src/middleware.ts`) enforces protection using `clerkMiddleware`

### User Synchronization

When users sign up, a Clerk webhook syncs their data to Firebase:

- **Endpoint**: `POST /api/webhooks/clerk`
- **Event Handled**: `user.created`
- **Firestore Collection**: `users` (document ID = Clerk user ID)
- **Stored Fields**: `id`, `email`, `firstName`, `lastName`, `imageUrl`, `createdAt`

### Firebase Admin SDK

Server-side Firebase operations use the Admin SDK (`src/lib/firebase-admin.ts`):

```typescript
import { db } from '@/lib/firebase-admin';

// Example: Query users collection
const usersSnapshot = await db.collection('users').get();
```

## Environment Variables

Required environment variables (see `.env.local.example`):

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk frontend key |
| `CLERK_SECRET_KEY` | Clerk backend secret |
| `CLERK_WEBHOOK_SECRET` | Svix webhook signing secret |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in URL (`/sign-in`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up URL (`/sign-up`) |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Post sign-in redirect (`/`) |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Post sign-up redirect (`/`) |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase private key (with `\n` for newlines) |
| `STRIPE_SECRET_KEY` | Stripe API secret |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe frontend key |

## Development Conventions

### Path Alias

Use `@/*` for imports from `src/`:

```typescript
import { db } from '@/lib/firebase-admin';
```

### React Compiler

React Compiler is enabled via `babel-plugin-react-compiler`. Avoid manual memoization (`useMemo`, `useCallback`) unless necessary—the compiler handles optimizations.

### Tailwind CSS v4

This project uses Tailwind v4 with new syntax:

```css
@import "tailwindcss";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}
```

Key differences from v3:
- Use `@import "tailwindcss"` instead of `@tailwind` directives
- Theme customization via `@theme inline { }`
- No `tailwind.config.js` needed (configuration in CSS)

### TypeScript

- Strict mode enabled
- Target: ES2017
- JSX: `react-jsx`

## Next.js Breaking Changes

> **WARNING**: This project uses Next.js 16.2.0, which may have breaking changes from your training data.

Always consult the Next.js documentation in `node_modules/next/dist/docs/` before writing code. Key areas to verify:

- App Router conventions
- Server/Client Component patterns
- API route handlers
- Middleware configuration

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/lib/firebase-admin.ts` | Firebase Admin initialization |
| `src/app/api/webhooks/clerk/route.ts` | User sync webhook |
| `src/middleware.ts` | Route protection middleware |
| `src/app/layout.tsx` | Root layout with ClerkProvider |
| `src/app/globals.css` | Tailwind v4 styles |

## Database Schema

### Users Collection

```typescript
// Collection: users
// Document ID: {clerkUserId}
{
  id: string;           // Clerk user ID
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  createdAt: string;     // ISO timestamp
}
```

## Notes

- Stripe is configured but payment implementation is pending
- The application title is "Italian Restaurant"
- Dark mode is supported via `prefers-color-scheme` media query