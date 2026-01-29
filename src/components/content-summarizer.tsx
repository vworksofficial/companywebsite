'use client';

import Image from 'next/image';

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
        <Image
          src="https://i.imgur.com/a7D8RbP.png"
          alt="Chat on WhatsApp"
          fill
          className="object-contain"
        />
      </div>
    </a>
  );
}
