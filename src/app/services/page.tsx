'use client';

import { useState, type ElementType } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PRICING_DATA, type PricingPackage, SERVICES } from '@/lib/constants';
import { Check, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

type PricingPackageWithCategory = PricingPackage & {
  categoryName: string;
  categoryIcon: ElementType;
};

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPackageForTerms, setSelectedPackageForTerms] = useState<PricingPackageWithCategory | null>(null);

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

  const allPackages: PricingPackageWithCategory[] = PRICING_DATA.flatMap(category =>
    category.packages.map(pkg => ({
      ...pkg,
      categoryName: category.category,
      categoryIcon: category.icon,
    }))
  );

  const filteredPackages = selectedCategory
    ? allPackages.filter(pkg => pkg.categoryName === selectedCategory)
    : allPackages;

  const selectedService = selectedCategory
    ? SERVICES.find(s => s.title === selectedCategory)
    : null;

  return (
    <>
      <section className="bg-slate-800 text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Layanan &amp; Harga</h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-primary-foreground/90">
            Solusi digital yang transparan dan terukur untuk membantu bisnis Anda bertumbuh. Temukan paket yang paling sesuai dengan kebutuhan Anda.
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "group cursor-pointer rounded-lg bg-black/20 transition-all hover:bg-black/40 h-full",
                !selectedCategory && "ring-2 ring-accent"
              )}
            >
              <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                <h3 className="font-headline text-lg font-bold">Semua Layanan</h3>
                <p className="mt-1 text-sm text-primary-foreground/80">Lihat semua paket</p>
              </div>
            </div>

            {PRICING_DATA.map((category) => {
              const service = SERVICES.find((s) => s.title === category.category);
              const serviceImage = service ? PlaceHolderImages.find((img) => img.id === service.image) : null;
              const isActive = selectedCategory === category.category;

              return (
                <div
                  key={category.category}
                  onClick={() => setSelectedCategory(category.category)}
                  className={cn(
                    "group cursor-pointer overflow-hidden rounded-lg bg-black/20 transition-all hover:bg-black/30",
                    isActive && "ring-2 ring-accent"
                  )}
                >
                  <div className="relative aspect-video w-full">
                    {serviceImage ? (
                      <Image
                        src={serviceImage.imageUrl}
                        alt={category.category}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={serviceImage.imageHint ?? ''}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-black/10">
                        <category.icon className="h-10 w-10 text-primary-foreground/50" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-headline font-semibold leading-tight text-white">{category.category}</h3>
                  </div>
                </div>
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
                <div key={pkg.name} className="flex flex-col rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full overflow-hidden border h-full">
                    <div className={cn("p-6 text-card-foreground", categoryStyles[pkg.categoryName] || 'bg-card')}>
                        <Badge variant="outline" className="font-bold uppercase tracking-wider border-current/50 bg-transparent text-inherit">{pkg.name}</Badge>
                        
                        <div className="mt-6 text-center text-inherit">
                            {pkg.originalPrice && (
                              <p className="text-lg line-through opacity-80">{pkg.originalPrice}</p>
                            )}
                            <p className="text-3xl font-extrabold tracking-tight">{pkg.price}</p>
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
                        <Button
                            variant="link"
                            className="text-xs text-muted-foreground font-normal h-auto p-0 hover:underline w-full mt-6"
                            onClick={() => setSelectedPackageForTerms(pkg)}
                        >
                          Syarat &amp; Ketentuan
                        </Button>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedService && (
        <section className="py-16 md:py-24 bg-card border-t">
            <div className="container mx-auto space-y-16">
                
                <div>
                    <h2 className="text-3xl font-bold font-headline text-primary mb-4 text-center">{selectedService.title}</h2>
                    <div className="prose lg:prose-lg max-w-4xl mx-auto text-muted-foreground">
                        <p>{selectedService.longDescription}</p>
                    </div>
                </div>

                <Separator />
                
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div>
                        <h3 className="text-2xl font-bold font-headline text-primary mb-6">Our Approach</h3>
                        <div className="prose max-w-none text-muted-foreground">
                            <p>{selectedService.longDescription}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold font-headline text-primary mb-6">Key Benefits</h3>
                        <ul className="space-y-4">
                            {selectedService.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                                    <span className="text-muted-foreground">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
      )}

      {selectedPackageForTerms && (
        <Dialog open={!!selectedPackageForTerms} onOpenChange={(isOpen) => !isOpen && setSelectedPackageForTerms(null)}>
          <DialogContent className="sm:max-w-[425px] p-0">
            <DialogHeader className={cn(
              "p-6 text-left", 
              categoryStyles[selectedPackageForTerms.categoryName] || 'bg-muted'
            )}>
              <DialogTitle className={cn(
                "font-headline text-xl",
                categoryStyles[selectedPackageForTerms.categoryName] ? 'text-inherit' : ''
              )}>
                Syarat &amp; Ketentuan
              </DialogTitle>
              <DialogDescription className={cn(
                "pt-1",
                categoryStyles[selectedPackageForTerms.categoryName] ? 'text-inherit opacity-90' : ''
              )}>
                Paket: {selectedPackageForTerms.name}
              </DialogDescription>
            </DialogHeader>
            <div className="px-6 py-0 text-sm text-muted-foreground space-y-4 max-h-[60vh] overflow-y-auto">
              <p className="whitespace-pre-wrap">{selectedPackageForTerms.terms}</p>
            </div>
            <DialogFooter className="p-6">
              <DialogClose asChild>
                <Button type="button">Tutup</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
