'use server';

import { z } from 'zod';
import { addDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { getSdks, initializeFirebase } from '@/firebase';

const partnerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  logoUrl: z.string().url({ message: 'Please enter a valid logo URL.' }),
  websiteURL: z.string().url({ message: 'Please enter a valid website URL.' }).optional(),
  description: z.string().optional(),
});

export type FormState = {
  message: string;
  success: boolean;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function addPartner(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = partnerSchema.safeParse(Object.fromEntries(formData.entries()));

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
    const partnersCollection = collection(firestore, 'partners');
    await addDocumentNonBlocking(partnersCollection, validatedFields.data);
    
    return {
      success: true,
      message: 'Partner added successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to add partner. Please try again.',
      fields: Object.fromEntries(formData.entries()),
    };
  }
}

export async function editPartner(
  partnerId: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!partnerId) {
    return {
      success: false,
      message: 'Partner ID is missing.',
    };
  }
  
  const validatedFields = partnerSchema.safeParse(Object.fromEntries(formData.entries()));

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
    const partnerDocRef = doc(firestore, 'partners', partnerId);
    await setDocumentNonBlocking(partnerDocRef, validatedFields.data, { merge: true });
    
    return {
      success: true,
      message: 'Partner updated successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to update partner. Please try again.',
      fields: Object.fromEntries(formData.entries()),
    };
  }
}
