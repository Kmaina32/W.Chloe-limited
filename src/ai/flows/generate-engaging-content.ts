'use server';
/**
 * @fileOverview A tool for generating engaging content for artists and events.
 *
 * - generateEngagingContent - A function that generates engaging content based on input data.
 * - GenerateEngagingContentInput - The input type for the generateEngagingContent function.
 * - GenerateEngagingContentOutput - The return type for the generateEngagingContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEngagingContentInputSchema = z.object({
  contentType: z.enum(['artist', 'event']).describe('The type of content to generate: artist or event.'),
  name: z.string().describe('The name of the artist or event.'),
  genre: z.string().optional().describe('The genre of the artist or event (if applicable).'),
  description: z.string().describe('A detailed description of the artist or event.'),
  keyAttributes: z.string().optional().describe('Key attributes or highlights to emphasize.'),
});
export type GenerateEngagingContentInput = z.infer<typeof GenerateEngagingContentInputSchema>;

const GenerateEngagingContentOutputSchema = z.object({
  description: z.string().describe('A captivating description for the content.'),
  socialMediaPost: z.string().describe('A ready-to-use social media post.'),
});
export type GenerateEngagingContentOutput = z.infer<typeof GenerateEngagingContentOutputSchema>;

export async function generateEngagingContent(input: GenerateEngagingContentInput): Promise<GenerateEngagingContentOutput> {
  return generateEngagingContentFlow(input);
}

const generateEngagingContentPrompt = ai.definePrompt({
  name: 'generateEngagingContentPrompt',
  input: {schema: GenerateEngagingContentInputSchema},
  output: {schema: GenerateEngagingContentOutputSchema},
  prompt: `You are a creative marketing expert specializing in crafting engaging content for the African entertainment industry.

  Based on the information provided, generate a captivating description and a ready-to-use social media post.

  Content Type: {{contentType}}
  Name: {{name}}
  Genre: {{genre}}
  Description: {{description}}
  Key Attributes: {{keyAttributes}}

  Description:
  Social Media Post:`, //Crucially, you MUST NOT attempt to directly call functions, use await keywords, or perform any complex logic within the Handlebars template string.
});

const generateEngagingContentFlow = ai.defineFlow(
  {
    name: 'generateEngagingContentFlow',
    inputSchema: GenerateEngagingContentInputSchema,
    outputSchema: GenerateEngagingContentOutputSchema,
  },
  async input => {
    const {output} = await generateEngagingContentPrompt(input);
    return output!;
  }
);
