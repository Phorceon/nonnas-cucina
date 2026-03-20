import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase-admin';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('❌ STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as typeof stripe.checkout.sessions.Session;
      
      if (session.payment_status === 'paid') {
        const { clerkUserId, reservationData } = session.metadata || {};
        
        console.log('✅ Payment completed for user:', clerkUserId);
        console.log('📝 Reservation data:', reservationData);

        // Save reservation to Firestore
        if (db && clerkUserId && reservationData) {
          try {
            const parsedData = JSON.parse(reservationData);
            await db.collection('reservations').add({
              userId: clerkUserId,
              stripeSessionId: session.id,
              stripeCustomerId: session.customer as string,
              amount: session.amount_total,
              currency: session.currency,
              status: 'confirmed',
              ...parsedData,
              createdAt: new Date().toISOString(),
            });
            console.log('✅ Reservation saved to Firestore');
          } catch (error) {
            console.error('❌ Error saving reservation:', error);
          }
        }
        break;
      }
    }

    case 'customer.subscription.created': {
      const subscription = event.data.object as typeof stripe.subscriptions.Subscription;
      console.log('✅ Subscription created:', subscription.id);
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as typeof stripe.subscriptions.Subscription;
      console.log('✅ Subscription updated:', subscription.id);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as typeof stripe.subscriptions.Subscription;
      console.log('✅ Subscription deleted:', subscription.id);
      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as typeof stripe.paymentIntents.PaymentIntent;
      console.log('✅ PaymentIntent succeeded:', paymentIntent.id);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as typeof stripe.paymentIntents.PaymentIntent;
      console.log('❌ PaymentIntent failed:', paymentIntent.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
