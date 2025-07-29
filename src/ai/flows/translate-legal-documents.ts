'use server';

/**
 * @fileOverview A legal document translation AI agent.
 *
 * - translateLegalDocument - A function that handles the legal document translation process.
 * - TranslateLegalDocumentInput - The input type for the translateLegalDocument function.
 * - TranslateLegalDocumentOutput - The return type for the translateLegalDocument function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const TranslateLegalDocumentInputSchema = z.object({
  documentText: z.string().describe('The legal document text to translate.'),
  sourceLanguage: z.string().describe('The language of the legal document.'),
});
export type TranslateLegalDocumentInput = z.infer<typeof TranslateLegalDocumentInputSchema>;

const TranslateLegalDocumentOutputSchema = z.object({
  translatedText: z.string().describe('The translated legal document text in English.'),
});
export type TranslateLegalDocumentOutput = z.infer<typeof TranslateLegalDocumentOutputSchema>;

export async function translateLegalDocument(
  input: TranslateLegalDocumentInput
): Promise<TranslateLegalDocumentOutput> {
  return translateLegalDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateLegalDocumentPrompt',
  input: {schema: TranslateLegalDocumentInputSchema},
  output: {schema: TranslateLegalDocumentOutputSchema},
  model: googleAI.model('gemini-1.5-flash-latest'),
  prompt: `You are a legal expert specializing in translating legal documents from various Indian regional languages to English.

  Translate the following legal document text from {{sourceLanguage}} to English.  Ensure the translation maintains the original meaning and intent of the document.

  Legal Document Text:
  {{documentText}}`,
});

const translateLegalDocumentFlow = ai.defineFlow(
  {
    name: 'translateLegalDocumentFlow',
    inputSchema: TranslateLegalDocumentInputSchema,
    outputSchema: TranslateLegalDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
