import * as admin from 'firebase-admin';

// Only initialize Firebase if all required env vars are present and valid
const hasFirebaseCredentials = 
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY &&
  process.env.FIREBASE_PRIVATE_KEY.includes('-----BEGIN PRIVATE KEY-----');

let db: admin.firestore.Firestore | null = null;
let auth: admin.auth.Auth | null = null;

if (hasFirebaseCredentials && !admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    db = admin.firestore();
    auth = admin.auth();
    console.log('✅ Firebase Admin initialized successfully');
  } catch (error) {
    console.error('❌ Firebase Admin Initialization Error:', error);
  }
}

export { db, auth };
