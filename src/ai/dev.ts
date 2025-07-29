import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-document-analysis.ts';
import '@/ai/flows/generate-argument-chain.ts';
import '@/ai/flows/find-document-contradictions.ts';
import '@/ai/flows/translate-legal-documents.ts';
import '@/ai/flows/build-narrative-from-evidence.ts';
import '@/ai/flows/answer-legal-questions.ts';
import '@/ai/flows/check-compliance.ts';
