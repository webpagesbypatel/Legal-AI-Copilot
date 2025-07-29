'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldCheck, FileWarning, FileCheck2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { checkCompliance, ComplianceResult } from '@/ai/flows/check-compliance';

const statutes = [
    { id: "it-act", label: "IT Act, 2000" },
    { id: "dpdp-act", label: "DPDP Act, 2023" },
    { id: "sebi-regs", label: "SEBI Regulations" },
];

export default function ComplianceCheckerPage() {
    const [documentText, setDocumentText] = useState('');
    const [selectedStatutes, setSelectedStatutes] = useState<string[]>([]);
    const [results, setResults] = useState<ComplianceResult[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleCheckboxChange = (id: string, checked: boolean | 'indeterminate') => {
        setSelectedStatutes(prev =>
            checked ? [...prev, id] : prev.filter(s => s !== id)
        );
    };

    const handleCheckCompliance = async () => {
        if (!documentText.trim() || selectedStatutes.length === 0) {
            toast({
                title: 'Error',
                description: 'Please provide document text and select at least one statute.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        setResults(null);

        try {
            const statuteLabels = selectedStatutes.map(id => statutes.find(s => s.id === id)!.label);
            const response = await checkCompliance({ documentText, statutes: statuteLabels });
            setResults(response.results);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Compliance Check Failed',
                description: 'An error occurred during the compliance check. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 font-headline">
                        Automated Compliance Checker
                    </h1>
                </div>

                <div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Document & Statutes</CardTitle>
                                <CardDescription>
                                    Paste your document and select the relevant statutes to check for compliance.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <Textarea
                                    placeholder="Paste your document content here..."
                                    className="min-h-[300px]"
                                    value={documentText}
                                    onChange={(e) => setDocumentText(e.target.value)}
                                    disabled={isLoading}
                                />
                                <div>
                                    <h3 className="text-sm font-medium mb-4">Select Statutes for Compliance Check:</h3>
                                    <div className="flex flex-col space-y-3">
                                        {statutes.map(statute => (
                                            <div key={statute.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={statute.id}
                                                    onCheckedChange={(checked) => handleCheckboxChange(statute.id, checked)}
                                                    disabled={isLoading}
                                                />
                                                <Label htmlFor={statute.id} className="text-sm font-normal">
                                                    {statute.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button onClick={handleCheckCompliance} disabled={isLoading}>
                                    {isLoading ? 'Checking...' : 'Check Compliance'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Compliance Report</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                {isLoading ? (
                                    <div className="space-y-4">
                                        <Skeleton className="h-8 w-full" />
                                        <Skeleton className="h-8 w-full" />
                                        <Skeleton className="h-8 w-full" />
                                    </div>
                                ) : results ? (
                                    results.map(result => (
                                        <div key={result.statute}>
                                            <div className="flex items-center gap-3">
                                                {result.compliant ? (
                                                    <FileCheck2 className="h-6 w-6 text-green-600" />
                                                ) : (
                                                    <FileWarning className="h-6 w-6 text-destructive" />
                                                )}
                                                <div className="flex-1">
                                                    <p className="font-semibold">{result.statute}</p>
                                                    <p className="text-sm text-muted-foreground">{result.details}</p>
                                                </div>
                                            </div>
                                            <Separator className="my-4" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-center text-sm text-muted-foreground h-40">
                                        <ShieldCheck className="h-10 w-10 mb-3" />
                                        <p>Your compliance report will appear here.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
