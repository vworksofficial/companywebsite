'use client';

import { useState, useEffect, useCallback } from 'react';
import { summarizeContent } from '@/ai/flows/content-summarization';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { PersonStanding, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';

export default function ContentSummarizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSummarize = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      const content = document.body.innerText;
      if (!content) {
        throw new Error('Could not read page content.');
      }

      const result = await summarizeContent({ content });
      setSummary(result.summary);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError('Failed to generate summary. Please try again.');
      toast({
        title: 'Summarization Error',
        description: errorMessage,
        variant: 'destructive',
      });
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (isOpen) {
      handleSummarize();
    }
  }, [isOpen, handleSummarize]);

  return (
    <>
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-2xl z-50 bg-primary hover:bg-primary/90 transition-transform hover:scale-110"
        onClick={() => setIsOpen(true)}
        aria-label="Summarize page content"
      >
        <PersonStanding className="h-7 w-7" />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl font-headline">
              <Sparkles className="h-6 w-6 text-primary" />
              AI Page Summary
            </DialogTitle>
            <DialogDescription>
              Here is a concise, AI-generated summary of the content on this page for quick access.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 max-h-[60vh] overflow-y-auto pr-4">
            {isLoading && (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
              </div>
            )}
            {error && <p className="text-destructive">{error}</p>}
            {summary && !isLoading && (
              <div className="prose prose-sm dark:prose-invert">
                <ul className="list-disc space-y-2 pl-5">
                  {summary.split('\n').map((line, index) => {
                    const cleanLine = line.replace(/^[*-]\s*/, '').trim();
                    if (cleanLine) {
                      return <li key={index}>{cleanLine}</li>;
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
