'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export default function ContentSummarizer() {
  return (
    <Button
      asChild
      size="icon"
      className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-2xl z-50 bg-green-500 text-white hover:bg-green-600 transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-7 w-7" />
      </a>
    </Button>
  );
}
