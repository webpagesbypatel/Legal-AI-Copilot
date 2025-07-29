'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { buildNarrativeFromEvidence, BuildNarrativeFromEvidenceOutput } from '@/ai/flows/build-narrative-from-evidence';
import { Skeleton } from '@/components/ui/skeleton';
import { Map, FileText } from 'lucide-react';

export default function EvidenceMapperPage() {
    const [evidenceText, setEvidenceText] = useState('');
    const [narrative, setNarrative] = useState<BuildNarrativeFromEvidenceOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    async function handleBuildNarrative() {
        if (!evidenceText.trim()) {
            toast({
                title: 'Error',
                description: 'Please provide some evidence to build a narrative.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        setNarrative(null);

        try {
            const evidenceArray = evidenceText.split('\n').filter(line => line.trim() !== '');
            const result = await buildNarrativeFromEvidence({ evidence: evidenceArray });
            setNarrative(result);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Narrative Building Failed',
                description: 'An error occurred while building the narrative. Please try again.',
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
                        Thematic Evidence Mapper & Narrative Builder
                    </h1>
                </div>

                <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Case Evidence</CardTitle>
                            <CardDescription>
                                Enter each piece of evidence on a new line. The AI will analyze and cluster the data to build a narrative.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder="Example: Witness statement from John Doe on Jan 1st.\nExample: Security camera footage from the bank."
                                className="min-h-[300px]"
                                value={evidenceText}
                                onChange={(e) => setEvidenceText(e.target.value)}
                                disabled={isLoading}
                            />
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button onClick={handleBuildNarrative} disabled={isLoading}>
                                {isLoading ? 'Building Narrative...' : 'Build Narrative'}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Generated Narrative</CardTitle>
                            <CardDescription>
                                A compelling story constructed from the provided evidence.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="min-h-[300px]">
                            {isLoading ? (
                                <div className="space-y-4">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-4/5" />
                                    <Skeleton className="h-4 w-full mt-4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                            ) : narrative ? (
                                <div className="prose prose-sm max-w-none text-foreground dark:prose-invert whitespace-pre-wrap">
                                    <p>{narrative.narrative}</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
                                    <p className="text-sm text-muted-foreground">Your generated narrative will appear here.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
