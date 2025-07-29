'use server';
/**
 * @fileOverview This file contains a Genkit flow for building a narrative from case evidence.
 *
 * - buildNarrativeFromEvidence - A function that takes case evidence as input and returns a narrative.
 * - BuildNarrativeFromEvidenceInput - The input type for the buildNarrativeFromEvidence function.
 * - BuildNarrativeFromEvidenceOutput - The return type for the buildNarrativeFromEvidence function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const BuildNarrativeFromEvidenceInputSchema = z.object({
  evidence: z.array(z.string()).describe('An array of strings, where each string is a piece of evidence from the case.'),
});
export type BuildNarrativeFromEvidenceInput = z.infer<typeof BuildNarrativeFromEvidenceInputSchema>;

const BuildNarrativeFromEvidenceOutputSchema = z.object({
  narrative: z.string().describe('A narrative built from the case evidence.'),
});
export type BuildNarrativeFromEvidenceOutput = z.infer<typeof BuildNarrativeFromEvidenceOutputSchema>;

export async function buildNarrativeFromEvidence(input: BuildNarrativeFromEvidenceInput): Promise<BuildNarrativeFromEvidenceOutput> {
  return buildNarrativeFromEvidenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'buildNarrativeFromEvidencePrompt',
  input: {schema: BuildNarrativeFromEvidenceInputSchema},
  output: {schema: BuildNarrativeFromEvidenceOutputSchema},
  model: googleAI.model('gemini-1.5-flash-latest'),
  prompt: `You are an expert legal professional skilled at constructing compelling legal narratives from provided evidence.

  Given the following evidence, construct a clear and concise narrative of the case.

  Evidence:
  {{#each evidence}}
  - {{{this}}}
  {{/each}}
  `,
});

const buildNarrativeFromEvidenceFlow = ai.defineFlow(
  {
    name: 'buildNarrativeFromEvidenceFlow',
    inputSchema: BuildNarrativeFromEvidenceInputSchema,
    outputSchema: BuildNarrativeFromEvidenceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
