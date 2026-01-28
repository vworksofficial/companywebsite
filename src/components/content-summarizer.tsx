'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContentSummarizer() {
  return (
    <Button
      asChild
      size="icon"
      className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-2xl z-50 bg-primary hover:bg-primary/90 transition-transform hover:scale-110"
      aria-label="Chat with us"
    >
      <Link href="/contact">
        <MessageCircle className="h-7 w-7" />
      </Link>
    </Button>
  );
}
