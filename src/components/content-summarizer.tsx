'use client';

import { Phone } from 'lucide-react';

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
        <div className="flex h-full w-full items-center justify-center rounded-full rounded-bl-none bg-green-500 transition-colors group-hover:bg-green-600">
          <Phone
            className="h-7 w-7 text-white"
            strokeWidth={2.5}
          />
        </div>
      </div>
    </a>
  );
}
