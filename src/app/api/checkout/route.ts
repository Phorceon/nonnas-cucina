import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { reservationData, priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID required' }, { status: 400 });
    }

    // Get or create Stripe customer
    let stripeCustomerId: string | null = null;

    if (db) {
      const userDoc = await db.collection('users').doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        stripeCustomerId = userData?.stripeCustomerId || null;
      }
    }

    let customer;
    if (stripeCustomerId) {
      customer = await stripe.customers.retrieve(stripeCustomerId);
    } else {
      const userDoc = await db?.collection('users').doc(userId).get();
      const email = userDoc?.data()?.email;
      
      customer = await stripe.customers.create({
        email: email,
        metadata: {
          clerkUserId: userId,
        },
      });

      // Save Stripe customer ID to Firestore
      if (db) {
        await db.collection('users').doc(userId).update({
          stripeCustomerId: customer.id,
        });
      }
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://nonnas-cucina.vercel.app'}/reservations?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://nonnas-cucina.vercel.app'}/reservations?canceled=true`,
      metadata: {
        clerkUserId: userId,
        reservationData: JSON.stringify(reservationData),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
