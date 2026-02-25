
'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ARTICLES as STATIC_ARTICLES, type Article } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

export default function ArtikelPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);
  const { firestore } = useFirestore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch dynamic articles from Firestore
  const articlesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'articles'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: dynamicArticles, loading: articlesLoading } = useCollection(articlesQuery);

  const categoryStyles: { [key: string]: string } = {
    'Web Development': 'bg-sky-100 text-sky-900 border-sky-200',
    'Social Media Management': 'bg-rose-100 text-rose-900 border-rose-200',
    'Branding & Design': 'bg-purple-100 text-purple-900 border-purple-200',
    'SEO': 'bg-emerald-100 text-emerald-900 border-emerald-200',
    'Content Marketing': 'bg-pink-100 text-pink-900 border-pink-200',
    'Ads Service': 'bg-amber-100 text-amber-900 border-amber-200',
    'Keuangan & Pajak': 'bg-slate-100 text-slate-900 border-slate-200',
  };

  // Combine static and dynamic articles
  const allArticles = useMemo(() => {
    const dynamic = (dynamicArticles || []) as Article[];
    return [...dynamic, ...STATIC_ARTICLES];
  }, [dynamicArticles]);

  const allCategories = [...new Set(allArticles.map(a => a.category))];

  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    const matchesSearch = searchTerm ? article.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1);
  
  const FilterControlsSkeleton = () => (
    <div className="grid md:grid-cols-3 gap-8 items-center">
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );

  return (
    <>
      <section className="py-4 border-b bg-card">
        <div className="container mx-auto">
           {!isClient ? (
             <FilterControlsSkeleton />
           ) : (
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div>
                  <h2 className="font-headline text-xl font-bold text-primary">Blog & Artikel</h2>
                  <p className="text-muted-foreground text-sm">Perluas wawasan digital Anda bersama kami</p>
                </div>
                <div>
                  <Select onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)} value={selectedCategory || 'all'}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      {allCategories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Cari judul artikel..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
           )}
        </div>
      </section>

      {articlesLoading && (
        <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 w-full" />)}
        </div>
      )}

      {featuredArticle && !articlesLoading && (
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

      {otherArticles.length > 0 && !articlesLoading && (
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
                    <Button asChild variant="link" className="px-0">
                      <Link href={`/artikel/${article.slug}`}>
                        Lanjutkan membaca <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {filteredArticles.length === 0 && !articlesLoading && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto text-center">
                <p className="text-lg text-muted-foreground">Tidak ada artikel yang ditemukan untuk kriteria pencarian ini.</p>
            </div>
          </section>
      )}

    </>
  );
}
