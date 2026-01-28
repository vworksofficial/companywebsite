'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ARTICLES, PORTFOLIO_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function ArtikelPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryStyles: { [key: string]: string } = {
    'Web Development': 'bg-sky-100 text-sky-900 border-sky-200',
    'Social Media Management': 'bg-rose-100 text-rose-900 border-rose-200',
    'Branding & Design': 'bg-purple-100 text-purple-900 border-purple-200',
    'SEO': 'bg-emerald-100 text-emerald-900 border-emerald-200',
    'Content Marketing': 'bg-pink-100 text-pink-900 border-pink-200',
    'Ads Service': 'bg-amber-100 text-amber-900 border-amber-200',
    'Keuangan': 'bg-slate-100 text-slate-900 border-slate-200',
  };

  const filteredArticles = selectedCategory
    ? ARTICLES.filter(item => item.category === selectedCategory)
    : ARTICLES;

  const allCategories = [...new Set(ARTICLES.map(a => a.category))];
  const categoryDetails = allCategories.map(catName => 
    PORTFOLIO_CATEGORIES.find(catDetail => catDetail.name === catName)
  ).filter(Boolean);

  return (
    <>
      <section className="border-b">
        <div className="grid md:grid-cols-10 min-h-[400px]">
          <div className="md:col-span-7 bg-primary text-primary-foreground flex flex-col justify-center px-8 py-16 md:p-20">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Wawasan Digital</h1>
              <p className="mt-4 text-sm text-primary-foreground/90">
                Jelajahi artikel, tips, dan tren terbaru seputar dunia digital marketing untuk mendorong bisnis Anda.
              </p>
            </div>
          </div>
          
          <div className="md:col-span-3 bg-card text-card-foreground flex flex-col justify-center p-8 md:p-12">
            <h3 className="font-headline text-lg font-semibold mb-6">Telusuri per Kategori</h3>
            <nav>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={cn(
                      'w-full text-left text-base hover:text-primary transition-colors',
                      !selectedCategory ? 'font-bold text-primary' : 'font-medium text-muted-foreground'
                    )}
                  >
                    Semua Kategori
                  </button>
                </li>
                {categoryDetails.map((category) => {
                  if (!category) return null;
                  const isActive = selectedCategory === category.name;
                  return (
                    <li key={category.slug}>
                      <button
                        onClick={() => setSelectedCategory(category.name)}
                        className={cn(
                          'w-full text-left text-base hover:text-primary transition-colors flex items-center gap-3',
                          isActive ? 'font-bold text-primary' : 'font-medium text-muted-foreground'
                        )}
                      >
                        <category.icon className="h-4 w-4 flex-shrink-0" />
                        <span>{category.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Card key={article.slug} className="group flex flex-col overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                <Link href={`/artikel/${article.slug}`} className="block">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={article.imageHint}
                    />
                  </div>
                </Link>
                <CardHeader>
                  <Badge className={cn('w-fit', categoryStyles[article.category] || 'bg-gray-100')}>
                    {article.category}
                  </Badge>
                  <Link href={`/artikel/${article.slug}`}>
                    <CardTitle className="mt-2 font-headline text-xl leading-tight group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                  </Link>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm">{article.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">{article.date}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
