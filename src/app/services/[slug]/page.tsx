import { SERVICES, PRICING_DATA } from '@/lib/constants';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle2, ArrowRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type ServicePageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} - Vworks Digital Hub`,
    description: service.description,
  };
}


export default function ServicePage({ params }: ServicePageProps) {
  const { slug } = params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const pricingCategory = PRICING_DATA.find(category => category.category === service.title);
  
  const categoryStyles: { [key: string]: string } = {
    'Web Development': 'bg-sky-100 text-black',
    'Digital Ads Service': 'bg-amber-100 text-black',
    'Social Media Management': 'bg-rose-100 text-black',
    'Branding & Design': 'bg-purple-100 text-black',
    'SEO & Artikel': 'bg-emerald-100 text-black',
    'Content Creator': 'bg-pink-100 text-black',
    'Keuangan & Pajak': 'bg-slate-200 text-black',
    'Foto Produk UMKM': 'bg-orange-100 text-black',
  };

  return (
    <>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">{service.title}</h1>
            <p className="mt-4 text-lg text-primary-foreground/90">{service.description}</p>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold font-headline text-primary mb-4">Our Approach</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
              <p>{service.longDescription}</p>
            </div>
            
            <h3 className="text-2xl font-bold font-headline text-primary mt-12 mb-6">Key Benefits for Your Business</h3>
            <ul className="space-y-4">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-8">
              {pricingCategory && pricingCategory.packages.length > 0 ? (
                pricingCategory.packages.map((pkg) => {
                  const includes = pkg.includes.split(',').map(item => item.trim()).filter(Boolean);
                  const excludes = pkg.excludes.split(',').map(item => item.trim()).filter(Boolean);
                  
                  return (
                    <div key={pkg.name} className="flex flex-col rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full overflow-hidden border">
                        <div className={cn("p-6", categoryStyles[pricingCategory.category] || 'bg-card')}>
                            <Badge variant="outline" className="font-bold uppercase tracking-wider border-current/50 bg-transparent text-inherit">{pkg.name}</Badge>
                            
                            <div className={cn("mt-6 text-center", categoryStyles[pricingCategory.category] ? 'text-black' : 'text-card-foreground')}>
                                {pkg.originalPrice && (
                                  <p className="text-lg line-through opacity-80">{pkg.originalPrice}</p>
                                )}
                                <p className="text-2xl font-extrabold tracking-tight">{pkg.price}</p>
                                <p className="mt-2 text-sm font-semibold opacity-90">{pkg.title}</p>
                                <p className="mt-1 text-sm opacity-90">{pkg.description}</p>
                            </div>

                            <Button asChild size="lg" className="w-full mt-6 rounded-xl font-bold bg-accent text-accent-foreground hover:bg-accent/90">
                                <Link href="/contact">Pesan Sekarang</Link>
                            </Button>
                        </div>

                        <div className="p-6 bg-muted/50 flex-grow flex flex-col">
                            <ul className="space-y-3 flex-grow">
                                {includes.map(item => (
                                    <li key={item} className="flex items-start gap-3 text-sm">
                                        <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                                        <span className="text-foreground">{item}</span>
                                    </li>
                                ))}
                                {excludes.map(item => (
                                    <li key={item} className="flex items-start gap-3 text-sm">
                                        <X className="h-4 w-4 text-destructive flex-shrink-0 mt-1" />
                                        <span className="text-muted-foreground line-through">{item}</span>
                                    </li>
                                ))}
                            </ul>
                             <p className="text-xs text-muted-foreground text-center w-full mt-6">
                                Syarat &amp; Ketentuan berlaku.
                            </p>
                        </div>
                    </div>
                  );
                })
              ) : (
                <Card>
                    <CardContent className="p-6">
                        <p className="text-muted-foreground">Detail harga untuk layanan ini akan segera tersedia. Silakan hubungi kami untuk informasi lebih lanjut.</p>
                        <Button asChild className="w-full mt-4">
                            <Link href="/contact">Hubungi Kami</Link>
                        </Button>
                    </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-headline font-bold text-primary">Explore Other Services</h2>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {SERVICES.filter(s => s.slug !== slug).map(otherService => (
                <Link key={otherService.slug} href={`/services/${otherService.slug}`}>
                  <div className="group flex flex-col items-center justify-center p-4 border rounded-lg h-full hover:bg-primary/5 hover:shadow-lg transition-all">
                      <div className="bg-primary/10 p-3 rounded-full text-primary mb-2 group-hover:scale-110 transition-transform">
                        <otherService.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-bold text-center text-foreground">{otherService.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
      </section>
    </>
  );
}
