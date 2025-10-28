'use server';

import { z } from 'zod';
import { addDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { getSdks } from '@/firebase';
import { initializeFirebase } from '@/firebase';

const artistSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  genre: z.string().min(2, { message: 'Genre must be at least 2 characters.' }),
  country: z.string().min(2, { message: 'Country must be at least 2 characters.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
  description: z.string().optional(),
});

export type FormState = {
  message: string;
  success: boolean;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function addArtist(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = artistSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    const { errors } = validatedFields.error;
    return {
      success: false,
      message: 'Invalid form data.',
      fields: Object.fromEntries(formData.entries()),
      issues: errors.map(error => `${error.path.join('.')} - ${error.message}`),
    };
  }

  try {
    const { firestore } = getSdks(initializeFirebase().firebaseApp);
    const artistsCollection = collection(firestore, 'artists');
    addDocumentNonBlocking(artistsCollection, validatedFields.data);
    
    return {
      success: true,
      message: 'Artist added successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to add artist. Please try again.',
      fields: Object.fromEntries(formData.entries()),
    };
  }
}

export async function editArtist(
  artistId: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!artistId) {
    return {
      success: false,
      message: 'Artist ID is missing.',
    };
  }
  
  const validatedFields = artistSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    const { errors } = validatedFields.error;
    return {
      success: false,
      message: 'Invalid form data.',
      fields: Object.fromEntries(formData.entries()),
      issues: errors.map(error => `${error.path.join('.')} - ${error.message}`),
    };
  }

  try {
    const { firestore } = getSdks(initializeFirebase().firebaseApp);
    const artistDocRef = doc(firestore, 'artists', artistId);
    setDocumentNonBlocking(artistDocRef, validatedFields.data, { merge: true });
    
    return {
      success: true,
      message: 'Artist updated successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to update artist. Please try again.',
      fields: Object.fromEntries(formData.entries()),
    };
  }
}
