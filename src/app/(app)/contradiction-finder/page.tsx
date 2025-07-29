'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { findDocumentContradictions, FindDocumentContradictionsOutput } from '@/ai/flows/find-document-contradictions';
import { Skeleton } from '@/components/ui/skeleton';
import { GitCommitVertical, Search } from 'lucide-react';

export default function ContradictionFinderPage() {
    const [document1, setDocument1] = useState('');
    const [document2, setDocument2] = useState('');
    const [report, setReport] = useState<FindDocumentContradictionsOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    async function handleFindContradictions() {
        if (!document1.trim() || !document2.trim()) {
            toast({
                title: 'Error',
                description: 'Please provide content for both documents.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        setReport(null);

        try {
            const result = await findDocumentContradictions({ document1, document2 });
            setReport(result);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Search Failed',
                description: 'An error occurred while finding contradictions. Please try again.',
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
                        Contradiction Finder
                    </h1>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Document Comparison</CardTitle>
                        <CardDescription>
                            Paste two documents below to perform a deep semantic analysis and find logical and factual inconsistencies.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <div className="grid gap-3">
                            <Textarea
                                placeholder="Paste the first document here..."
                                className="min-h-[250px]"
                                value={document1}
                                onChange={(e) => setDocument1(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Textarea
                                placeholder="Paste the second document here..."
                                className="min-h-[250px]"
                                value={document2}
                                onChange={(e) => setDocument2(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button onClick={handleFindContradictions} disabled={isLoading}>
                            {isLoading ? 'Searching for Contradictions...' : 'Find Contradictions'}
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Contradiction Report</CardTitle>
                        <CardDescription>
                            A detailed report of inconsistencies, ready for cross-examination.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="min-h-[200px]">
                        {isLoading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                                <Skeleton className="h-4 w-full mt-4" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        ) : report ? (
                            <div className="prose prose-sm max-w-none text-foreground dark:prose-invert whitespace-pre-wrap">
                                <p>{report.contradictionReport}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                                <p className="text-sm text-muted-foreground">Your contradiction report will appear here.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
