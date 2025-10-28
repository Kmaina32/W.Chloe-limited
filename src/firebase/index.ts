'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, deleteUser } from 'firebase/auth';
import { getFirestore, collection, doc, addDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    // Always initialize with the explicit config.
    // The automatic detection `initializeApp()` is unreliable outside of Firebase Hosting.
    const firebaseApp = initializeApp(firebaseConfig);
    return getSdks(firebaseApp);
  }

  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  const firestore = getFirestore(firebaseApp);
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore,
    collection: (path: string) => collection(firestore, path),
    doc: (path: string) => doc(firestore, path),
  };
}

// Re-exporting key functions and types
export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './errors';
export * from './error-emitter';

// Re-exporting core Firebase SDK functions we use
export { addDoc, setDoc, updateDoc, deleteDoc, deleteUser };
