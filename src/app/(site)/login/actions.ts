'use server';

import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeFirebaseAdmin } from '@/firebase/server';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type FormState = {
  message: string;
  success: boolean;
};

// This function now only creates the user profile on the server.
// The actual user creation (authentication) is handled on the client.
export async function createUserProfile(user: { uid: string, email: string | null, displayName: string | null, photoURL: string | null }) {
  try {
    await initializeFirebaseAdmin();
    const firestore = getFirestore();
    const userDocRef = firestore.collection('users').doc(user.uid);
    const userProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    await userDocRef.set(userProfile, { merge: true });
    return { success: true, message: 'User profile created successfully.' };
  } catch (error: any) {
    return { success: false, message: `Failed to create user profile: ${error.message}` };
  }
}

// This server action is kept for creating the user profile after client-side signup.
export async function handleSignup(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid email or password format. Password must be at least 6 characters.',
    };
  }
  
  // This action no longer creates the auth user, only the profile.
  // The client will need to call createUserProfile separately.
  // We'll leave this structure here but the main logic will be on the client.
  return {
    success: true,
    message: 'Validation successful. Proceed with client-side user creation.',
  };
}
