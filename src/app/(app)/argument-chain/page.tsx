'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { generateArgumentChain, GenerateArgumentChainOutput } from '@/ai/flows/generate-argument-chain';
import { Skeleton } from '@/components/ui/skeleton';
import { GitFork, Lightbulb } from 'lucide-react';

export default function ArgumentChainPage() {
    const [legalOutcome, setLegalOutcome] = useState('');
    const [argumentChains, setArgumentChains] = useState<GenerateArgumentChainOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    async function handleGenerate() {
        if (!legalOutcome.trim()) {
            toast({
                title: 'Error',
                description: 'Please specify a desired legal outcome.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        setArgumentChains(null);

        try {
            const result = await generateArgumentChain({ legalOutcome });
            setArgumentChains(result);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Generation Failed',
                description: 'An error occurred while generating argument chains. Please try again.',
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
                        Argument Chain Reversal
                    </h1>
                </div>

                <div className="grid gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Desired Legal Outcome</CardTitle>
                            <CardDescription>
                                Describe the outcome you want to achieve. The AI will work backward to construct logical argument chains.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Input
                                placeholder="e.g., 'Dismissal of the complaint due to lack of evidence'"
                                value={legalOutcome}
                                onChange={(e) => setLegalOutcome(e.target.value)}
                                disabled={isLoading}
                            />
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button onClick={handleGenerate} disabled={isLoading}>
                                {isLoading ? 'Generating...' : 'Generate Chains'}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Generated Argument Chains</CardTitle>
                            <CardDescription>
                                Potential legal pathways to achieve your desired outcome.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="min-h-[200px]">
                            {isLoading ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-1/4" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-4/5" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-1/4" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-1/4" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-4/5" />
                                    </div>
                                </div>
                            ) : argumentChains ? (
                                <div className="space-y-6">
                                    {argumentChains.argumentChains.map((chain, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                <GitFork className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold">Argument Chain {index + 1}</h3>
                                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{chain}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <Lightbulb className="h-12 w-12 text-muted-foreground/50 mb-4" />
                                    <p className="text-sm text-muted-foreground">Your generated argument chains will appear here.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
