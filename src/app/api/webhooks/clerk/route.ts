import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.log('⚠️ Clerk webhook received (no secret configured - development mode)')
    return new Response('', { status: 200 })
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error -- no svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', { status: 400 })
  }

  const eventType = evt.type

  // Dynamic import Firebase Admin only if credentials are available
  let db = null;
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY?.includes('-----BEGIN')) {
    const { db: firebaseDb } = await import('@/lib/firebase-admin');
    db = firebaseDb;
  }

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data
    const primaryEmail = email_addresses.find((e: any) => e.id === evt.data.primary_email_address_id)?.email_address || email_addresses[0]?.email_address

    if (db) {
      try {
        await db.collection('users').doc(id).set({
          id,
          email: primaryEmail || null,
          firstName: first_name || null,
          lastName: last_name || null,
          imageUrl: image_url || null,
          createdAt: new Date().toISOString(),
          stripeCustomerId: null,
        })
        console.log(`✅ User ${id} successfully synced to Firestore`)
      } catch (error) {
        console.error('❌ Error syncing user to Firestore:', error)
        return new Response('Error syncing user', { status: 500 })
      }
    } else {
      console.log('📝 New user created:', { id, email: primaryEmail, firstName: first_name, lastName: last_name })
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data
    const primaryEmail = email_addresses.find((e: any) => e.id === evt.data.primary_email_address_id)?.email_address || email_addresses[0]?.email_address

    if (db) {
      try {
        await db.collection('users').doc(id).update({
          email: primaryEmail || null,
          firstName: first_name || null,
          lastName: last_name || null,
          imageUrl: image_url || null,
          updatedAt: new Date().toISOString(),
        })
        console.log(`✅ User ${id} successfully updated in Firestore`)
      } catch (error) {
        console.error('❌ Error updating user in Firestore:', error)
      }
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    if (db && id) {
      try {
        await db.collection('users').doc(id).delete()
        console.log(`✅ User ${id} successfully deleted from Firestore`)
      } catch (error) {
        console.error('❌ Error deleting user from Firestore:', error)
      }
    }
  }

  return new Response('', { status: 200 })
}
