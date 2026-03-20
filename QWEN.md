# Qwen CLI Project Context

## 1. Role and Tech Stack
You are an expert full-stack engineer building a highly scalable SaaS application. You write clean, typed, and production-ready code.
- **Framework:** Next.js (App Router), React, TypeScript.
- **Hosting:** Vercel.
- **Authentication:** Clerk.
- **Database:** Firebase (Firestore & Firebase Admin SDK).
- **Payments:** Stripe.
- **Styling:** Tailwind CSS + Shadcn UI.

## 2. Authentication Rules (Clerk)
- Use `@clerk/nextjs` for all authentication. 
- Do not build custom login/register pages; use Clerk's pre-built `<SignIn />` and `<SignUp />` components unless explicitly told otherwise.
- Protect server-side routes and API endpoints using `auth()` from Clerk.
- **User Syncing:** When a user is created in Clerk, listen for the `user.created` webhook to automatically create a corresponding user document in the Firebase `users` collection.
- Always retrieve the user's `userId` from Clerk before querying user-specific data in Firebase.

## 3. Database Rules (Firebase)
- Use the Firebase Admin SDK (`firebase-admin`) for all Server Actions and Route Handlers (backend).
- Use the standard Firebase Client SDK (`firebase/firestore`) only for client-side listeners if real-time subscriptions are required.
- Do not use Firebase Authentication. Clerk handles all auth.
- **Schema Design:** Store the Clerk `userId` as the primary Document ID in the `users` collection. 
- Never expose the Firebase Admin private keys to the client. Keep them securely in `.env.local`.

## 4. Payment Rules (Stripe)
- Use `stripe` (Node SDK) on the backend and `@stripe/stripe-js` on the frontend.
- **Checkout:** Always create Stripe Checkout Sessions on the server using Next.js Server Actions or API routes, then redirect the client to the returned URL.
- **Webhooks:** All Stripe webhook events must be verified using the `stripe-signature` header before processing. 
- **Customer Mapping:** When a user makes their first purchase, save their `stripe_customer_id` into their Firestore user document to map future subscriptions easily.

## 5. Deployment & Vercel Specifics
- Optimize Next.js code for Vercel deployment. Use Edge runtimes (`export const runtime = 'edge'`) for lightweight API routes and webhooks where appropriate.
- **Environment Variables:** Always check that environment variables are loaded (e.g., `process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`) and throw descriptive errors if they are missing.
- Use Next.js caching (`revalidate`, `unstable_cache`) appropriately to minimize unnecessary reads to Firebase.

## 6. Coding Standards
- Use strict TypeScript. Never use `any`; define explicit interfaces for Firestore documents and Stripe payloads.
- **File Structure:** 
  - `/app`: Next.js App Router pages and layouts.
  - `/app/api`: Webhooks and specific Route Handlers.
  - `/components`: Reusable UI components.
  - `/lib/firebase`: Firebase client and admin initialization.
  - `/lib/stripe`: Stripe configuration.
- Before writing any multi-file feature (like a checkout flow), output a brief step-by-step plan and ask for confirmation.
