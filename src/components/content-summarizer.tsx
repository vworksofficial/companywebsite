'use client';

import { MessageCircle, Phone } from 'lucide-react';

export default function ContentSummarizer() {
  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-4 right-4 z-50 h-16 w-16 shadow-2xl transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative h-full w-full">
        <MessageCircle
          className="h-full w-full text-green-500 transition-colors group-hover:text-green-600"
          fill="currentColor"
          strokeWidth={0}
        />
        <Phone
          className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-white"
          strokeWidth={2.5}
        />
      </div>
    </a>
  );
}
