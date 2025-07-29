'use server';

/**
 * @fileOverview A legal question answering AI agent.
 *
 * - answerLegalQuestions - A function that handles the legal question answering process.
 * - AnswerLegalQuestionsInput - The input type for the answerLegalQuestions function.
 * - AnswerLegalQuestionsOutput - The return type for the answerLegalQuestions function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const AnswerLegalQuestionsInputSchema = z.object({
  question: z.string().describe('The legal question to be answered.'),
});
export type AnswerLegalQuestionsInput = z.infer<typeof AnswerLegalQuestionsInputSchema>;

const AnswerLegalQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the legal question.'),
});
export type AnswerLegalQuestionsOutput = z.infer<typeof AnswerLegalQuestionsOutputSchema>;

export async function answerLegalQuestions(input: AnswerLegalQuestionsInput): Promise<AnswerLegalQuestionsOutput> {
  return answerLegalQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerLegalQuestionsPrompt',
  input: {schema: AnswerLegalQuestionsInputSchema},
  output: {schema: AnswerLegalQuestionsOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
  prompt: `You are a legal assistant chatbot. A user will ask a question and you will answer it.

Question: {{{question}}}`,
});

const answerLegalQuestionsFlow = ai.defineFlow(
  {
    name: 'answerLegalQuestionsFlow',
    inputSchema: AnswerLegalQuestionsInputSchema,
    outputSchema: AnswerLegalQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
