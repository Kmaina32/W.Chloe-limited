'use server';

import { z } from 'zod';
import { getSdks, initializeFirebase } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type FormState = {
  message: string;
  success: boolean;
};

function handleAuthError(error: any): FormState {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return { success: false, message: 'Invalid credentials. Please try again.' };
      case 'auth/email-already-in-use':
        return { success: false, message: 'This email is already registered.' };
      case 'auth/weak-password':
        return { success: false, message: 'The password is too weak. Please use at least 6 characters.' };
      case 'auth/invalid-email':
        return { success: false, message: 'The email address is not valid.' };
      case 'auth/operation-not-allowed':
        return { success: false, message: 'Email/password accounts are not enabled.' };
      default:
        return { success: false, message: 'An unexpected authentication error occurred.' };
    }
  }
  return { success: false, message: error.message || 'An unknown error occurred.' };
}

export async function handleLogin(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid email or password format.',
    };
  }
  const { email, password } = validatedFields.data;

  try {
    const { auth } = getSdks(initializeFirebase().firebaseApp);
    await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      message: 'Login successful! Redirecting...',
    };
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function handleSignup(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid email or password format. Password must be at least 6 characters.',
    };
  }
  const { email, password } = validatedFields.data;

  try {
    const { auth } = getSdks(initializeFirebase().firebaseApp);
    await createUserWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      message: 'Signup successful! You are now logged in.',
    };
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function handleGoogleLogin(): Promise<void> {
  // This function redirects, so it doesn't return a state.
  // The result is handled by onAuthStateChanged after the redirect.
  try {
    const { auth } = getSdks(initializeFirebase().firebaseApp);
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  } catch (error) {
    // This error will likely not be seen by the user due to the redirect,
    // but it's good practice to handle it.
    console.error("Google Sign-In Error:", handleAuthError(error).message);
  }
}
