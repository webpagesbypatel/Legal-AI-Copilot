'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { summarizeDocumentAnalysis, SummarizeDocumentAnalysisOutput } from '@/ai/flows/summarize-document-analysis';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, FileText, AlertTriangle } from 'lucide-react';

export default function DocumentAnalysisPage() {
    const [documentText, setDocumentText] = useState('');
    const [analysisResult, setAnalysisResult] = useState<SummarizeDocumentAnalysisOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    async function handleAnalysis() {
        if (!documentText.trim()) {
            toast({
                title: 'Error',
                description: 'Please paste some document text to analyze.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        setAnalysisResult(null);

        try {
            const result = await summarizeDocumentAnalysis({ analysisResult: documentText });
            setAnalysisResult(result);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Analysis Failed',
                description: 'An error occurred while analyzing the document. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 font-headline">
                        Automated Document Analysis
                    </h1>
                </div>

                <div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Document Input</CardTitle>
                                <CardDescription>
                                    Paste the content of your legal document below. The AI will analyze it for risky clauses, ambiguities, and provide a summary.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    placeholder="Paste your legal document here..."
                                    className="min-h-[400px]"
                                    value={documentText}
                                    onChange={(e) => setDocumentText(e.target.value)}
                                    disabled={isLoading}
                                />
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button onClick={handleAnalysis} disabled={isLoading}>
                                    {isLoading ? 'Analyzing...' : 'Analyze Document'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Analysis Results</CardTitle>
                                <CardDescription>Key findings and suggestions from the AI.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="space-y-4">
                                        <Skeleton className="h-6 w-1/3" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-4/5" />
                                        <div className="pt-4">
                                            <Skeleton className="h-6 w-1/2" />
                                            <Skeleton className="h-4 w-full mt-2" />
                                            <Skeleton className="h-4 w-full mt-2" />
                                        </div>
                                    </div>
                                ) : analysisResult ? (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-semibold flex items-center gap-2"><Bot className="h-5 w-5" /> AI Summary</h3>
                                            <p className="text-sm text-muted-foreground mt-2">{analysisResult.summary}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold flex items-center gap-2 text-destructive/80"><AlertTriangle className="h-5 w-5" /> Potentially Risky Clauses</h3>
                                            <p className="text-sm text-muted-foreground mt-2">No risky clauses identified in this summary. Full analysis would provide detailed redlining.</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold flex items-center gap-2 text-primary/80"><FileText className="h-5 w-5" /> Suggested Clauses</h3>
                                            <p className="text-sm text-muted-foreground mt-2">Clause suggestion feature is in development. Check back soon!</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">Your analysis results will appear here.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
