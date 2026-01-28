'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ArrowRight, Building } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const categoryStyles: { [key: string]: string } = {
    'Web Development': 'bg-sky-100 text-sky-900',
    'Social Media Management': 'bg-rose-100 text-rose-900',
    'Branding & Design': 'bg-purple-100 text-purple-900',
    'SEO': 'bg-emerald-100 text-emerald-900',
    'Content Marketing': 'bg-pink-100 text-pink-900',
    'Ads Service': 'bg-amber-100 text-amber-900',
    'Keuangan': 'bg-slate-200 text-slate-900',
  };

  const filteredItems = selectedCategory
    ? PORTFOLIO_ITEMS.filter(item => item.category === selectedCategory)
    : PORTFOLIO_ITEMS;
  
  const CategoryFiltersSkeleton = () => (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Skeleton className="h-10 w-24 rounded-full" />
      <Skeleton className="h-10 w-40 rounded-full" />
      <Skeleton className="h-10 w-48 rounded-full" />
      <Skeleton className="h-10 w-32 rounded-full" />
      <Skeleton className="h-10 w-20 rounded-full" />
    </div>
  );
  
  return (
    <>
      <section className="relative text-primary-foreground py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
            alt="Professional team in a meeting, symbolizing VWorks' collaborative approach to projects"
            fill
            className="object-cover"
            data-ai-hint="team meeting"
            priority
          />
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Our Portfolio</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90">
            A showcase of our best work and success stories.
          </p>
          <div className="mt-8">
            {!isClient ? <CategoryFiltersSkeleton /> : (
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button
                    onClick={() => setSelectedCategory(null)}
                    variant={!selectedCategory ? 'secondary' : 'ghost'}
                    className={cn(
                        'rounded-full',
                        !selectedCategory
                        ? ''
                        : 'border border-primary-foreground/30 text-primary-foreground bg-black/20 hover:bg-black/40 hover:text-primary-foreground'
                    )}
                    >
                    Semua Project
                    </Button>
                    {PORTFOLIO_CATEGORIES.map((category) => {
                    const isActive = selectedCategory === category.name;
                    return (
                        <Button
                        key={category.slug}
                        onClick={() => setSelectedCategory(category.name)}
                        variant={isActive ? 'secondary' : 'ghost'}
                        className={cn(
                            'rounded-full',
                            isActive
                            ? ''
                            : 'border border-primary-foreground/30 text-primary-foreground bg-black/20 hover:bg-black/40 hover:text-primary-foreground'
                        )}
                        >
                        <category.icon className="mr-2 h-4 w-4" />
                        {category.name}
                        </Button>
                    );
                    })}
                </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredItems.map((item) => {
                const categoryInfo = PORTFOLIO_CATEGORIES.find(cat => cat.name === item.category);
                const CategoryIcon = categoryInfo ? categoryInfo.icon : Building;
                return (
                  <Card key={item.slug} className="group grid md:grid-cols-2 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 md:aspect-square">
                    {/* Left Column - Text */}
                    <div className="flex flex-col">
                      {categoryInfo && (
                        <div className={cn('p-3', categoryStyles[item.category] || 'bg-gray-100')}>
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <CategoryIcon className="h-5 w-5 flex-shrink-0" />
                            <span>{item.category}</span>
                          </div>
                        </div>
                      )}
                      <div className="p-6 flex flex-col justify-center flex-grow">
                        <div>
                            <div className="flex items-center gap-4 my-4">
                                {/* Client Logo Placeholder */}
                                <div className="bg-muted p-3 rounded-lg">
                                    <Building className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <h3 className="font-headline text-2xl font-bold">{item.title}</h3>
                            </div>
                            <p className="text-muted-foreground text-sm mb-6">
                                {item.description}
                            </p>
                        </div>
                        {item.link && (
                            <div className="mt-auto">
                                <Button asChild variant="link" className="px-0 text-primary font-bold">
                                    <Link href={item.link} target="_blank">View Project <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                            </div>
                        )}
                      </div>
                    </div>

                    {/* Right Column - Image */}
                    <div className="relative aspect-video md:aspect-auto order-first md:order-last">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={item.imageHint}
                        />
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
             <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No projects found for this category.</p>
             </div>
          )}
        </div>
      </section>
    </>
  );
}
