'use server';

/**
 * @fileOverview Summarizes the key findings from the Automated Document Analysis.
 *
 * - summarizeDocumentAnalysis - A function that summarizes the key findings from the Automated Document Analysis.
 * - SummarizeDocumentAnalysisInput - The input type for the summarizeDocumentAnalysis function.
 * - SummarizeDocumentAnalysisOutput - The return type for the summarizeDocumentAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const SummarizeDocumentAnalysisInputSchema = z.object({
  analysisResult: z
    .string()
    .describe('The analysis result from the Automated Document Analysis.'),
});
export type SummarizeDocumentAnalysisInput = z.infer<typeof SummarizeDocumentAnalysisInputSchema>;

const SummarizeDocumentAnalysisOutputSchema = z.object({
  summary: z.string().describe('A summary of the key findings.'),
});
export type SummarizeDocumentAnalysisOutput = z.infer<typeof SummarizeDocumentAnalysisOutputSchema>;

export async function summarizeDocumentAnalysis(
  input: SummarizeDocumentAnalysisInput
): Promise<SummarizeDocumentAnalysisOutput> {
  return summarizeDocumentAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDocumentAnalysisPrompt',
  input: {schema: SummarizeDocumentAnalysisInputSchema},
  output: {schema: SummarizeDocumentAnalysisOutputSchema},
  model: googleAI.model('gemini-1.5-flash-latest'),
  prompt: `You are a legal AI assistant. Please summarize the key findings from the following document analysis:\n\n{{{analysisResult}}}`,
});

const summarizeDocumentAnalysisFlow = ai.defineFlow(
  {
    name: 'summarizeDocumentAnalysisFlow',
    inputSchema: SummarizeDocumentAnalysisInputSchema,
    outputSchema: SummarizeDocumentAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
