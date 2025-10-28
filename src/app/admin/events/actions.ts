'use server';

import { z } from 'zod';
import { addDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { getSdks, initializeFirebase } from '@/firebase';

const eventSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format.' }),
  location: z.string().min(2, { message: 'Location must be at least 2 characters.' }),
  description: z.string().optional(),
  imageURL: z.string().url({ message: 'Please enter a valid image URL.' }).optional(),
});

export type FormState = {
  message: string;
  success: boolean;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function addEvent(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = eventSchema.safeParse(Object.fromEntries(formData.entries()));

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
    const eventsCollection = collection(firestore, 'events');
    addDocumentNonBlocking(eventsCollection, validatedFields.data);
    
    return {
      success: true,
      message: 'Event added successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to add event. Please try again.',
      fields: Object.fromEntries(formData.entries()),
    };
  }
}

export async function editEvent(
  eventId: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!eventId) {
    return {
      success: false,
      message: 'Event ID is missing.',
    };
  }
  
  const validatedFields = eventSchema.safeParse(Object.fromEntries(formData.entries()));

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
    const eventDocRef = doc(firestore, 'events', eventId);
    setDocumentNonBlocking(eventDocRef, validatedFields.data, { merge: true });
    
    return {
      success: true,
      message: 'Event updated successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to update event. Please try again.',
      fields: Object.fromEntries(formData.entries()),
    };
  }
}
