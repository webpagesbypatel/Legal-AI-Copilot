'use server';

/**
 * @fileOverview An AI agent that generates potential argument chains based on a desired legal outcome.
 *
 * - generateArgumentChain - A function that generates argument chains.
 * - GenerateArgumentChainInput - The input type for the generateArgumentChain function.
 * - GenerateArgumentChainOutput - The return type for the generateArgumentChain function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const GenerateArgumentChainInputSchema = z.object({
  legalOutcome: z
    .string()
    .describe('The desired legal outcome for which to generate argument chains.'),
});
export type GenerateArgumentChainInput = z.infer<typeof GenerateArgumentChainInputSchema>;

const GenerateArgumentChainOutputSchema = z.object({
  argumentChains: z
    .array(z.string())
    .describe('An array of potential argument chains that lead to the desired legal outcome.'),
});
export type GenerateArgumentChainOutput = z.infer<typeof GenerateArgumentChainOutputSchema>;

export async function generateArgumentChain(input: GenerateArgumentChainInput): Promise<GenerateArgumentChainOutput> {
  return generateArgumentChainFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArgumentChainPrompt',
  input: {schema: GenerateArgumentChainInputSchema},
  output: {schema: GenerateArgumentChainOutputSchema},
  model: googleAI.model('gemini-pro'),
  prompt: `You are an expert legal strategist. Your task is to generate potential argument chains that lead to the desired legal outcome provided by the user.

  Desired Legal Outcome: {{{legalOutcome}}}

  Generate at least three distinct argument chains. Each argument chain should be a sequence of logical steps that, if successful, would result in achieving the desired legal outcome. Argument chains should be numbered.
  Argument chains should consider relevant legal precedents, statutes, and legal principles, referencing Indian law.
  Each step should be clear and concise, making use of a range of legal reasoning.
`,
});

const generateArgumentChainFlow = ai.defineFlow(
  {
    name: 'generateArgumentChainFlow',
    inputSchema: GenerateArgumentChainInputSchema,
    outputSchema: GenerateArgumentChainOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
