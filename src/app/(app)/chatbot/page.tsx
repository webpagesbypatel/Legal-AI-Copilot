'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { answerLegalQuestions } from '@/ai/flows/answer-legal-questions';
import { translateLegalDocument } from '@/ai/flows/translate-legal-documents';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, Languages, Send, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type ChatMode = 'question' | 'translate';

export default function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [sourceLang, setSourceLang] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<ChatMode>('question');
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || (mode === 'translate' && !sourceLang.trim())) {
            toast({
                title: 'Error',
                description: 'Please fill in all required fields.',
                variant: 'destructive',
            });
            return;
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: mode === 'translate' ? `Translate from ${sourceLang}:\n${input}` : input,
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        setInput('');

        try {
            let response: { answer?: string; translatedText?: string };
            if (mode === 'question') {
                response = await answerLegalQuestions({ question: input });
            } else {
                response = await translateLegalDocument({ documentText: input, sourceLanguage: sourceLang });
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.answer || response.translatedText || 'Sorry, I could not process that.',
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Request Failed',
                description: 'An error occurred. Please try again.',
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
                        AI Legal Assistant
                    </h1>
                </div>
                
                <Card className="h-[70vh] flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Bot className="h-6 w-6" />
                            <div>
                                <CardTitle>Chat</CardTitle>
                                <CardDescription>Ask questions or translate legal documents.</CardDescription>
                            </div>
                        </div>
                        <Select value={mode} onValueChange={(value) => setMode(value as ChatMode)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="question">Ask a Question</SelectItem>
                                <SelectItem value="translate">Translate</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-hidden">
                        <ScrollArea className="h-full" ref={scrollAreaRef}>
                            <div className="space-y-4 pr-4">
                            {messages.length === 0 ? (
                                <div className="flex h-full items-center justify-center">
                                    <p className="text-muted-foreground">Start a conversation to see messages.</p>
                                </div>
                            ) : (
                                messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={cn(
                                            'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                                            message.role === 'user'
                                                ? 'ml-auto bg-primary text-primary-foreground'
                                                : 'bg-muted'
                                        )}
                                    >
                                        <p className="whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                ))
                            )}
                            {isLoading && (
                                <div className="flex items-center space-x-2">
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                    <Skeleton className="h-6 w-[150px]" />
                                </div>
                            )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="pt-4 border-t">
                        <form
                            onSubmit={handleSendMessage}
                            className="flex w-full items-start space-x-4"
                        >
                             {mode === 'translate' && (
                                <Input
                                    className="w-[150px]"
                                    placeholder="Source Language"
                                    value={sourceLang}
                                    onChange={(e) => setSourceLang(e.target.value)}
                                    disabled={isLoading}
                                />
                            )}
                            <Textarea
                                className="flex-1 min-h-[40px] max-h-[120px]"
                                placeholder={mode === 'question' ? "Type your question here..." : "Paste text to translate..."}
                                value={input}
                                onKeyDown={(e) => {
                                  if(e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(e);
                                  }
                                }}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                            />
                            <Button type="submit" size="icon" disabled={isLoading}>
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Send</span>
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
