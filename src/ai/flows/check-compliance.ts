'use server';

/**
 * @fileOverview This file defines a Genkit flow for checking document compliance against specified statutes.
 *
 * It exports:
 *   - checkCompliance: The main function to initiate the compliance check.
 *   - CheckComplianceInput: The input type for the checkCompliance function.
 *   - CheckComplianceOutput: The output type for the checkCompliance function.
 *   - ComplianceResult: The type for an individual compliance result.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const ComplianceResultSchema = z.object({
  statute: z.string().describe('The statute checked against.'),
  compliant: z.boolean().describe('Whether the document is compliant with the statute.'),
  details: z.string().describe('Details of the compliance check, highlighting non-compliant sections if any.'),
});
export type ComplianceResult = z.infer<typeof ComplianceResultSchema>;

const CheckComplianceInputSchema = z.object({
  documentText: z.string().describe('The text of the document to check.'),
  statutes: z.array(z.string()).describe('An array of statutes to check the document against.'),
});
export type CheckComplianceInput = z.infer<typeof CheckComplianceInputSchema>;

const CheckComplianceOutputSchema = z.object({
  results: z.array(ComplianceResultSchema).describe('An array of compliance results for each statute.'),
});
export type CheckComplianceOutput = z.infer<typeof CheckComplianceOutputSchema>;

export async function checkCompliance(input: CheckComplianceInput): Promise<CheckComplianceOutput> {
  return checkComplianceFlow(input);
}

const compliancePrompt = ai.definePrompt({
  name: 'compliancePrompt',
  input: {schema: CheckComplianceInputSchema},
  output: {schema: CheckComplianceOutputSchema},
  model: googleAI.model('gemini-pro'),
  prompt: `You are an expert legal AI specializing in compliance.
  Analyze the provided document text for compliance with the following Indian statutes: {{#each statutes}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.

  For each statute, determine if the document is compliant. Provide a boolean 'compliant' status and a 'details' string explaining your reasoning.
  If not compliant, specify which sections of the document are problematic.

  Document Text:
  {{{documentText}}}
  `,
});

const checkComplianceFlow = ai.defineFlow(
  {
    name: 'checkComplianceFlow',
    inputSchema: CheckComplianceInputSchema,
    outputSchema: CheckComplianceOutputSchema,
  },
  async (input) => {
    const { output } = await compliancePrompt(input);
    return output!;
  }
);
