import { ARTICLES } from '@/lib/constants';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan',
    };
  }

  return {
    title: `${article.title} - VWORKS.ID`,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const categoryStyles: { [key: string]: string } = {
    'Web Development': 'bg-sky-100 text-sky-900 border-sky-200',
    'Social Media Management': 'bg-rose-100 text-rose-900 border-rose-200',
    'Branding & Design': 'bg-purple-100 text-purple-900 border-purple-200',
    'SEO': 'bg-emerald-100 text-emerald-900 border-emerald-200',
    'Content Marketing': 'bg-pink-100 text-pink-900 border-pink-200',
    'Ads Service': 'bg-amber-100 text-amber-900 border-amber-200',
    'Keuangan': 'bg-slate-100 text-slate-900 border-slate-200',
  };

  return (
    <article className="py-8 md:py-16">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/artikel">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Semua Artikel
            </Link>
          </Button>

          <header>
            <Badge className={cn('w-fit mb-4', categoryStyles[article.category] || 'bg-gray-100')}>
              {article.category}
            </Badge>
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight">{article.title}</h1>
            <p className="text-muted-foreground text-sm">
              Ditulis oleh {article.author} pada {article.date}
            </p>
          </header>

          <div className="relative aspect-video w-full my-8 rounded-lg overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={article.imageHint}
            />
          </div>

          <div
            className="prose lg:prose-xl dark:prose-invert max-w-none mx-auto text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

        </div>
      </div>
    </article>
  );
}
