'use server';

import { z } from 'zod';
import { generateEngagingContent } from '@/ai/flows/generate-engaging-content';

const formSchema = z.object({
  contentType: z.enum(['artist', 'event']),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  genre: z.string().optional(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  keyAttributes: z.string().optional(),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  data?: {
    description: string;
    socialMediaPost: string;
  };
};

export async function handleGenerateContent(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    const { errors } = validatedFields.error;
    return {
      message: 'Invalid form data.',
      fields: Object.fromEntries(formData.entries()),
      issues: errors.map((error) => `${error.path.join('.')} - ${error.message}`),
    };
  }

  try {
    const result = await generateEngagingContent(validatedFields.data);
    return {
      message: 'Content generated successfully!',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to generate content. Please try again.',
      fields: Object.fromEntries(formData.entries()),
    };
  }
}
