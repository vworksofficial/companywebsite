'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, Target, Eye, Gem, Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SERVICES, PRICING_DATA, PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const CLIENT_LOGOS = [
  { name: 'Client 1', imageUrl: 'https://i.imgur.com/B0wMr9o.png' },
  { name: 'Client 2', imageUrl: 'https://i.imgur.com/RcDf1U4.png' },
  { name: 'Client 3', imageUrl: 'https://i.imgur.com/GTUoFnL.png' },
  { name: 'Client 4', imageUrl: 'https://i.imgur.com/Zz95630.png' },
  { name: 'Client 5', imageUrl: 'https://i.imgur.com/kzyQ7Rw.png' },
  { name: 'Client 6', imageUrl: 'https://i.imgur.com/nIXVn7F.png' },
  { name: 'Client 7', imageUrl: 'https://i.imgur.com/1Khgfk8.png' },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'vworks-hero');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const coreValues = [
    {
      icon: Gem,
      title: 'Profesionalisme',
      description: 'Kami menjunjung tinggi standar kualitas dan integritas untuk memberikan hasil terbaik bagi klien.',
    },
    {
      icon: Eye,
      title: 'Transparansi',
      description: 'Kami percaya pada komunikasi yang terbuka dan jujur. Anda akan selalu tahu apa yang kami kerjakan dan bagaimana kinerjanya.',
    },
    {
      icon: Rocket,
      title: 'Berorientasi Pertumbuhan',
      description: 'Kesuksesan Anda adalah fokus kami. Kami merancang strategi yang mendorong pertumbuhan bisnis secara berkelanjutan.',
    },
  ];
  
  const categoryStyles: { [key: string]: string } = {
    'Web Development': 'bg-sky-100 text-sky-900 border-sky-200',
    'Social Media Management': 'bg-rose-100 text-rose-900 border-rose-200',
    'Branding & Design': 'bg-purple-100 text-purple-900 border-purple-200',
    'SEO': 'bg-emerald-100 text-emerald-900 border-emerald-200',
    'Content Marketing': 'bg-pink-100 text-pink-900 border-pink-200',
    'Ads Service': 'bg-amber-100 text-amber-900 border-amber-200',
    'Keuangan & Pajak': 'bg-slate-100 text-slate-900 border-slate-200',
  };

  const filteredPortfolioItems = selectedCategory
    ? PORTFOLIO_ITEMS.filter(item => item.category === selectedCategory)
    : PORTFOLIO_ITEMS;

  return (
    <div className="flex flex-col">
      <section className="py-8 md:py-10 bg-primary text-primary-foreground bg-hero-texture">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold leading-tight">
              Your Partner to Leap Together
            </h1>
            <p className="mt-6 max-w-xl text-base text-primary-foreground/90">
              Kami membantu brand Anda ditemukan, dikenal, dan dipilih. VWORKS.ID menghadirkan solusi pemasaran digital mulai dari konten, media sosial, SEO, hingga iklan berbayar untuk mendorong pertumbuhan bisnis yang berkelanjutan.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">Dapatkan Konsultasi Gratis <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative group">
              {heroImage && (
                <div className="relative group rounded-lg">
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={320}
                    height={256}
                    className="rounded-lg relative z-10 transition-transform duration-500 ease-in-out group-hover:scale-105"
                    priority
                    data-ai-hint={heroImage.imageHint}
                  />
                </div>
              )}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/20 rounded-full z-0 transition-all duration-500 ease-in-out group-hover:scale-110"></div>
              <div className="absolute bottom-10 -left-10 w-40 h-40 border-8 border-primary/20 rounded-lg z-0 transform rotate-12 transition-all duration-500 ease-in-out group-hover:rotate-6 group-hover:scale-105"></div>
              <div className="absolute -bottom-8 right-12 w-24 h-24 bg-primary/10 rounded-full z-0 transition-all duration-500 ease-in-out group-hover:translate-x-4"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background border-y py-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-3">
            {PRICING_DATA.map((category) => (
              <div key={category.category} className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground">
                <category.icon className="h-4 w-4" />
                <span>{category.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="bg-background py-12">
        <div className="container">
          <h3 className="text-center text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-8">Dipercaya oleh Perusahaan Terkemuka</h3>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <div className="flex w-max animate-marquee">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
                <div key={`${logo.name}-${index}`} className="relative h-14 w-40 mx-6 flex-shrink-0">
                  <Image
                    src={logo.imageUrl}
                    alt={logo.name}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 opacity-60 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="vision-mission" className="py-16 md:py-24 bg-card">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-12 items-stretch">
          <div className="md:col-span-1 relative rounded-lg shadow-xl overflow-hidden">
            <Image
              src="https://i.imgur.com/jzK2W7D.png"
              alt="Team discussing vision and mission"
              fill
              className="object-cover"
              data-ai-hint="team collaboration"
            />
          </div>
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Eye className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-2xl md:text-3xl text-primary">Visi</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Menjadi digital agency yang terpercaya dan berdampak dalam membantu brand, UMKM, dan institusi berkembang melalui strategi digital yang efektif, terukur, dan berkelanjutan.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                   <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-2xl md:text-3xl text-primary">Misi</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Menyediakan layanan digital marketing yang strategis, kreatif, dan berbasis data untuk meningkatkan visibilitas, leads, dan penjualan klien.</span>
                  </li>
                   <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Membangun kemitraan jangka panjang dengan klien melalui komunikasi yang transparan dan hasil kerja yang profesional.</span>
                  </li>
                   <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Menghadirkan solusi digital yang relevan dengan perkembangan teknologi dan perilaku pasar.</span>
                  </li>
                   <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Mengembangkan tim yang adaptif, kolaboratif, dan terus bertumbuh dalam ekosistem digital.</span>
                  </li>
                   <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Membantu bisnis lokal dan institusi pendidikan memanfaatkan potensi digital secara optimal.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Layanan Utama Kami</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Kami menyediakan rangkaian lengkap solusi pemasaran digital yang disesuaikan dengan kebutuhan bisnis Anda.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => {
              const serviceImage = PlaceHolderImages.find(img => img.id === service.image);
              return (
                <Card key={service.slug} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardHeader className="p-0">
                    {serviceImage && (
                       <div className="relative w-full aspect-video">
                        <Image
                          src={serviceImage.imageUrl}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          data-ai-hint={serviceImage.imageHint}
                        />
                       </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                       <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <service.icon className="h-6 w-6" />
                       </div>
                      <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{service.description}</p>
                    <Button asChild variant="link" className="mt-4 px-0 text-primary">
                      <Link href={`/services/${service.slug}`}>Pelajari Selengkapnya <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Siapa Kami</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              VWORKS.ID adalah tim ahli digital yang bersemangat untuk membantu bisnis Anda berkembang di dunia online. Kami membangun kemitraan, bukan hanya daftar klien. Setiap strategi yang kami rancang disesuaikan secara unik untuk memenuhi tujuan spesifik Anda. Dengan pendekatan yang berpusat pada data dan kreativitas, kami siap menjadi motor penggerak kesuksesan digital Anda.
            </p>
            <div className="mt-6 space-y-6">
              {coreValues.map((value) => (
                <div key={value.title} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary mt-1 flex-shrink-0">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-headline text-lg font-bold text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild size="lg" variant="outline" className="mt-8 border-primary text-primary hover:bg-primary/10 hover:text-primary">
              <Link href="/about">Lebih Lanjut Tentang Kami</Link>
            </Button>
          </div>
          <div>
            <div className="relative group rounded-lg">
                <Image 
                  src="https://i.imgur.com/mIgN8TX.png"
                  alt="Our Team"
                  width={600}
                  height={400}
                  className="rounded-lg"
                  data-ai-hint="team meeting"
                />
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Our Work &amp; Portfolio</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              A showcase of our best work and the results we've delivered for our clients.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={!selectedCategory ? 'default' : 'outline'}
              className="rounded-full"
            >
              Semua Project
            </Button>
            {PORTFOLIO_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category.name;
              return (
                <Button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.name)}
                  variant={isActive ? 'default' : 'outline'}
                  className="rounded-full"
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>

          {filteredPortfolioItems.length > 0 ? (
            <>
              <Carousel
                opts={{
                  align: "start",
                  loop: filteredPortfolioItems.length > 4,
                }}
                className="w-full mt-12"
              >
                <CarouselContent>
                  {filteredPortfolioItems.map((item, index) => {
                    const categoryInfo = PORTFOLIO_CATEGORIES.find(cat => cat.name === item.category);
                    const CategoryIcon = categoryInfo?.icon;
                    return (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                        <div className="p-1 h-full">
                          <Card className="group flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                            <div className="relative aspect-square w-full">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={item.imageHint}
                                />
                            </div>
                            
                            <div className="p-6 flex flex-col flex-grow">
                                <Badge variant="outline" className={cn('w-fit mb-4 border-0', categoryStyles[item.category] || 'bg-gray-100')}>
                                    {CategoryIcon && <CategoryIcon className="h-4 w-4 mr-2" />}
                                    {item.category}
                                </Badge>
                                {item.link && (
                                    <div className="mt-auto flex justify-end">
                                        <Button asChild variant="link" className="px-0 text-primary font-bold">
                                            <Link href={item.link} target="_blank">Lihat Project <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                          </Card>
                        </div>
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
              <div className="mt-12 text-center">
                <Button asChild size="lg" variant="outline">
                  <Link href="/portfolio">Lihat Semua Portofolio <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </>
          ) : (
             <div className="text-center py-16 mt-12">
                <p className="text-muted-foreground text-lg">No projects found for this category.</p>
             </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Siap Mengembangkan Bisnis Anda?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-primary-foreground/90">
            Mari diskusikan bagaimana strategi digital kami dapat disesuaikan untuk memenuhi tujuan unik Anda.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 transition-transform hover:scale-105">
            <Link href="/contact">Mulai Proyek Bersama Kami <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
    

    

    

    

    

    
