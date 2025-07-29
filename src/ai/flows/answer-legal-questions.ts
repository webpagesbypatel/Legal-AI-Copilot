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

const StructuredAnswerSchema = z.object({
    title: z.string().describe('A clear, descriptive title for the answer component.'),
    description: z.string().describe('A detailed explanation or the main body of the answer.'),
    steps: z.array(z.string()).optional().describe('A list of steps, actions, or key points, if applicable.'),
});

const AnswerLegalQuestionsOutputSchema = z.object({
  answer: z.string().optional().describe('The answer to the legal question as a single string.'),
  structuredAnswer: StructuredAnswerSchema.optional().describe('The answer in a structured format.'),
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

  Analyze the following legal question and provide a comprehensive answer.

  If the question can be broken down into a series of steps, points, or a structured explanation, provide the answer in the 'structuredAnswer' format. Use a descriptive title and provide a clear description.
  If the answer is simple and does not require a structured format, provide it as a single string in the 'answer' field.

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
