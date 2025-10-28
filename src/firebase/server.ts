'use server';

import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';

export async function initializeFirebaseAdmin() {
  if (!getApps().length) {
    try {
      // This will automatically use GOOGLE_APPLICATION_CREDENTIALS
      initializeApp();
    } catch (e) {
      console.error('Admin SDK initialization failed:', e);
      // Fallback for local dev if credentials aren't in env var
      if (process.env.NODE_ENV !== 'production' && process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
        try {
          const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
          initializeApp({
            credential: cert(serviceAccount)
          });
        } catch(jsonError) {
          console.error('Failed to parse GOOGLE_APPLICATION_CREDENTIALS_JSON:', jsonError);
        }
      }
    }
  }
  return getApp();
}
