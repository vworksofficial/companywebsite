import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ContentSummarizer from '@/components/content-summarizer';
import { SquiggleDecorations } from '@/components/decorations/squiggles';

export const metadata: Metadata = {
  title: 'VWORKS.ID - Driving Growth Through Digital Excellence',
  description: 'VWORKS.ID offers expert SEO, SMM, Content Marketing, Paid Ads, and Web Development services to elevate your brand.',
  icons: {
    icon: 'https://imgur.com/lC5Y4YF.png',
    shortcut: 'https://imgur.com/lC5Y4YF.png',
    apple: 'https://imgur.com/lC5Y4YF.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <SquiggleDecorations />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <ContentSummarizer />
      </body>
    </html>
  );
}
