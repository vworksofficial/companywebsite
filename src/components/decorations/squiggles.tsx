import { cn } from '@/lib/utils';
import React from 'react';

const Squiggle = ({ className }: { className?: string }) => {
  return (
    <svg
      width="122"
      height="12"
      viewBox="0 0 122 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('transform-gpu', className)}
    >
      <path
        d="M1 5.42C18.42 16.6 35.83 16.6 53.25 5.42C70.67 -5.76 88.08 -5.76 105.5 5.42C122.92 16.6 140.33 16.6 157.75 5.42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export function SquiggleDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Squiggle className="absolute -left-20 top-80 text-primary/10 scale-[200%]" />
      <Squiggle className="absolute -right-20 bottom-80 text-accent/20 scale-[200%] rotate-12" />
      <Squiggle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/10 scale-[400%] rotate-45" />
    </div>
  );
}
