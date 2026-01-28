'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PRICING_DATA } from '@/lib/constants';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

// Function to generate a URL-friendly slug
const toSlug = (text: string) => {
  return text.toLowerCase()
    .replace(/ & /g, '-and-') // Replace " & " with "-and-"
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, ''); // Remove all non-word chars
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative text-primary-foreground py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
            alt="Digital marketing team working"
            fill
            className="object-cover"
            data-ai-hint="team meeting"
            priority
          />
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Layanan & Harga</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90">
            Solusi digital yang transparan dan terukur untuk membantu bisnis Anda bertumbuh. Temukan paket yang paling sesuai dengan kebutuhan Anda.
          </p>
        </div>
      </section>

      <section className="sticky top-16 bg-background/95 backdrop-blur-sm z-40 border-b">
        <div className="container mx-auto py-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PRICING_DATA.map((category) => (
              <Button key={category.category} asChild variant="ghost" size="sm">
                <Link href={`#${toSlug(category.category)}`}>
                  {category.category}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto space-y-16">
          {PRICING_DATA.map((category) => (
            <div key={category.category} id={toSlug(category.category)} className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-primary/10 p-3 rounded-full">
                  <category.icon className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-3xl font-bold font-headline text-primary">{category.category}</h2>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                {category.packages.map((pkg) => {
                  const includes = pkg.includes.split(',').map(item => item.trim()).filter(Boolean);
                  const excludes = pkg.excludes.split(',').map(item => item.trim()).filter(Boolean);
                  return (
                    <Card key={pkg.name} className="flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full max-w-sm">
                      <CardHeader className="flex-grow-0">
                        <CardTitle className="font-headline text-xl">{pkg.name}</CardTitle>
                        <CardDescription>{pkg.title}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-grow">
                        <div className="flex-grow-0">
                          <p className="text-3xl font-bold text-primary">{pkg.price}</p>
                          <p className="text-sm text-muted-foreground mt-1">{pkg.description}</p>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-4 flex-grow">
                          {includes.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2 text-sm">Termasuk:</h4>
                              <ul className="space-y-2">
                                {includes.map(item => (
                                  <li key={item} className="flex items-start gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {excludes.length > 0 && (
                            <div className="mt-4">
                              <h4 className="font-semibold mb-2 text-sm">Tidak Termasuk:</h4>
                              <ul className="space-y-2">
                                {excludes.map(item => (
                                  <li key={item} className="flex items-start gap-2 text-sm">
                                    <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-4 mt-auto">
                        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                          <Link href="/contact">Pesan Sekarang</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
