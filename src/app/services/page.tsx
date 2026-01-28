'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PRICING_DATA } from '@/lib/constants';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allPackages = PRICING_DATA.flatMap(category => 
    category.packages.map(pkg => ({
      ...pkg,
      categoryName: category.category,
      categoryIcon: category.icon,
    }))
  );

  const filteredPackages = selectedCategory
    ? allPackages.filter(pkg => pkg.categoryName === selectedCategory)
    : allPackages;

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
          <p className="mt-4 max-w-2xl mx-auto text-sm text-primary-foreground/90">
            Solusi digital yang transparan dan terukur untuk membantu bisnis Anda bertumbuh. Temukan paket yang paling sesuai dengan kebutuhan Anda.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={!selectedCategory ? 'secondary' : 'ghost'}
              className={cn('border border-primary-foreground/30', {
                'hover:bg-white/20 text-white': selectedCategory,
              })}
            >
              Semua Layanan
            </Button>
            {PRICING_DATA.map((category) => {
              const isActive = selectedCategory === category.category;
              return (
                <Button
                  key={category.category}
                  onClick={() => setSelectedCategory(category.category)}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn('border border-primary-foreground/30', {
                    'hover:bg-white/20 text-white': !isActive,
                  })}
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.category}
                </Button>
              );
            })}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 items-start">
            {filteredPackages.map((pkg) => {
              const includes = pkg.includes.split(',').map(item => item.trim()).filter(Boolean);
              const excludes = pkg.excludes.split(',').map(item => item.trim()).filter(Boolean);
              const CategoryIcon = pkg.categoryIcon;

              return (
                <Card key={pkg.name} className="relative flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full overflow-visible">
                  
                  <div className="absolute top-0 right-4 -translate-y-1/2 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg">
                      <p className="text-xl font-bold">{pkg.price}</p>
                  </div>

                  <CardHeader className="flex-grow-0 pt-8">
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                       <CategoryIcon className="h-5 w-5 flex-shrink-0" />
                       <span>{pkg.categoryName}</span>
                    </div>
                    <CardTitle className="font-headline text-xl">{pkg.name}</CardTitle>
                    <CardDescription>{pkg.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <div className="flex-grow-0">
                      <p className="text-sm text-muted-foreground">{pkg.description}</p>
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
      </section>
    </>
  );
}
