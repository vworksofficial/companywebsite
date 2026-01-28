'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ARTICLES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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

  const featuredArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1);
  
  const allCategories = [...new Set(ARTICLES.map(a => a.category))];
  
  return (
    <>
      <section className="py-6 border-b bg-card">
        <div className="container mx-auto">
           <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                onClick={() => setSelectedCategory(null)}
                variant={!selectedCategory ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
              >
                Semua Kategori
              </Button>
              {allCategories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                );
              })}
            </div>
        </div>
      </section>

      {featuredArticle && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-10 gap-8 items-center">
              <div className="md:col-span-7">
                <Link href={`/artikel/${featuredArticle.slug}`}>
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <Image
                      src={featuredArticle.imageUrl}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={featuredArticle.imageHint}
                      priority
                    />
                  </div>
                </Link>
              </div>
              <div className="md:col-span-3 flex flex-col justify-center">
                 <Badge className={cn('w-fit mb-4', categoryStyles[featuredArticle.category] || 'bg-gray-100')}>
                    {featuredArticle.category}
                  </Badge>
                  <Link href={`/artikel/${featuredArticle.slug}`}>
                    <h2 className="font-headline text-3xl font-bold text-primary mb-4 leading-tight hover:text-primary/80 transition-colors">
                        {featuredArticle.title}
                    </h2>
                  </Link>
                  <p className="text-muted-foreground mb-6 text-sm">
                    {featuredArticle.excerpt}
                  </p>
                  <Button asChild variant="link" className="px-0 text-primary font-semibold self-start">
                    <Link href={`/artikel/${featuredArticle.slug}`}>
                      Lanjutkan membaca <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {otherArticles.length > 0 && (
        <section className="py-12 md:py-16 bg-card">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherArticles.map((article) => (
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
      )}

      {filteredArticles.length === 0 && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto text-center">
                <p className="text-lg text-muted-foreground">Tidak ada artikel yang ditemukan untuk kategori ini.</p>
            </div>
          </section>
      )}

    </>
  );
}
