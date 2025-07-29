'use server';

/**
 * @fileOverview This file defines a Genkit flow for finding contradictions between uploaded documents.
 *
 * The flow takes two document strings as input and returns a report of logical and factual inconsistencies.
 * It exports:
 *   - findDocumentContradictions: The main function to initiate the contradiction finding process.
 *   - FindDocumentContradictionsInput: The input type for the findDocumentContradictions function.
 *   - FindDocumentContradictionsOutput: The output type for the findDocumentContradictions function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const FindDocumentContradictionsInputSchema = z.object({
  document1: z.string().describe('The first document to compare.'),
  document2: z.string().describe('The second document to compare.'),
});
export type FindDocumentContradictionsInput = z.infer<
  typeof FindDocumentContradictionsInputSchema
>;

const FindDocumentContradictionsOutputSchema = z.object({
  contradictionReport: z
    .string()
    .describe(
      'A report detailing the logical and factual inconsistencies found between the two documents.'
    ),
});
export type FindDocumentContradictionsOutput = z.infer<
  typeof FindDocumentContradictionsOutputSchema
>;

const findDocumentContradictionsPrompt = ai.definePrompt({
  name: 'findDocumentContradictionsPrompt',
  input: {schema: FindDocumentContradictionsInputSchema},
  output: {schema: FindDocumentContradictionsOutputSchema},
  model: googleAI.model('gemini-1.5-flash-latest'),
  prompt: `You are an expert legal analyst tasked with identifying contradictions between two documents.

  Analyze the two documents provided below and generate a detailed report outlining any logical or factual inconsistencies.
  The report should provide specific examples of contradictions and explain why they are contradictory.

  Document 1:
  {{document1}}

  Document 2:
  {{document2}}

  Contradiction Report:
`,
});

const findDocumentContradictionsFlow = ai.defineFlow(
  {
    name: 'findDocumentContradictionsFlow',
    inputSchema: FindDocumentContradictionsInputSchema,
    outputSchema: FindDocumentContradictionsOutputSchema,
  },
  async input => {
    const {output} = await findDocumentContradictionsPrompt(input);
    return output!;
  }
);

export async function findDocumentContradictions(
  input: FindDocumentContradictionsInput
): Promise<FindDocumentContradictionsOutput> {
  return findDocumentContradictionsFlow(input);
}
