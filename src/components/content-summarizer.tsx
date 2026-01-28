'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpenText, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { summarizeContent } from '@/ai/flows/content-summarization';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ContentSummarizer() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Reset summary when the path changes, so it refetches for the new page
    setSummary('');
    setIsLoading(false);
  }, [pathname, searchParams.toString()]);

  const handleSummarize = async () => {
    // Avoid re-fetching if summary is already available or if it's loading
    if (summary || isLoading) return;

    setIsLoading(true);
    try {
      // We target the main content area to avoid including nav, footer, etc.
      // This runs on the client when the dialog is opened.
      const contentElement = document.querySelector('main');
      const pageContent = contentElement ? contentElement.innerText : '';

      if (pageContent.trim().length < 100) {
        setSummary('<p>This page does not have enough content to summarize.</p>');
        setIsLoading(false);
        return;
      }

      const result = await summarizeContent({ content: pageContent });
      
      // Simple markdown to HTML for bullet points
      const formattedSummary = '<ul>' + result.summary
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => `<li>${line.replace(/^[*-]\s*/, '')}</li>`)
        .join('') + '</ul>';

      setSummary(formattedSummary);

    } catch (error) {
      console.error('Error summarizing content:', error);
      setSummary('<p>Sorry, we were unable to generate a summary at this time.</p>');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (open) {
      handleSummarize();
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-2xl z-50 bg-primary hover:bg-primary/90 transition-transform hover:scale-110"
          aria-label="Summarize page content for accessibility"
        >
          <BookOpenText className="h-7 w-7" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Page Summary</DialogTitle>
          <DialogDescription>
            An AI-generated summary of this page's content for accessibility.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-4">Generating summary...</p>
            </div>
          ) : (
            <div
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
