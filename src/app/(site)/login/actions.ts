'use server';

import { z } from 'zod';
import { getSdks, initializeFirebase } from '@/firebase';
import { initiateEmailSignIn, initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { AuthError } from 'firebase/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type FormState = {
  message: string;
  success: boolean;
};

function handleAuthError(error: unknown): FormState {
  if (error instanceof AuthError) {
    switch (error.code) {
      case 'auth/user-not-found':
        return { success: false, message: 'No user found with this email.' };
      case 'auth/wrong-password':
        return { success: false, message: 'Incorrect password. Please try again.' };
      case 'auth/email-already-in-use':
        return { success: false, message: 'This email is already in use.' };
      case 'auth/weak-password':
        return { success: false, message: 'The password is too weak.' };
      default:
        return { success: false, message: 'An unexpected error occurred. Please try again.' };
    }
  }
  return { success: false, message: 'An unknown error occurred.' };
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
    initiateEmailSignIn(auth, email, password);
    // Non-blocking, so we return a success message assuming the process starts.
    // The UI will react to the onAuthStateChanged listener.
    return {
      success: true,
      message: 'Login initiated. Redirecting...',
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
    initiateEmailSignUp(auth, email, password);
    return {
      success: true,
      message: 'Signup successful! Please log in.',
    };
  } catch (error) {
    return handleAuthError(error);
  }
}
