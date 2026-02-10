'use client';

import { useState, type ElementType } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PRICING_DATA, type PricingPackage, SERVICES } from '@/lib/constants';
import { Check, X } from 'lucide-react';
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

type PricingPackageWithCategory = PricingPackage & {
  categoryName: string;
  categoryIcon: ElementType;
};

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPackageForTerms, setSelectedPackageForTerms] = useState<PricingPackageWithCategory | null>(null);

  const categoryStyles: { [key: string]: string } = {
    'Web Development': 'bg-sky-100 text-sky-900',
    'Digital Ads Service': 'bg-amber-100 text-amber-900',
    'Social Media Management': 'bg-rose-100 text-rose-900',
    'Branding & Design': 'bg-purple-100 text-purple-900',
    'SEO & Artikel': 'bg-emerald-100 text-emerald-900',
    'Content Creator': 'bg-pink-100 text-pink-900',
    'Keuangan & Pajak': 'bg-slate-200 text-slate-900',
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

  return (
    <>
      <section className="bg-slate-800 text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Layanan &amp; Harga</h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-primary-foreground/90">
            Solusi digital yang transparan dan terukur untuk membantu bisnis Anda bertumbuh. Temukan paket yang paling sesuai dengan kebutuhan Anda.
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* "All Services" Card */}
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

            {/* Service Category Cards */}
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
                <Card key={pkg.name} className="flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full overflow-hidden">
                  <div className={cn('p-3', categoryStyles[pkg.categoryName] || 'bg-gray-100')}>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <CategoryIcon className="h-5 w-5 flex-shrink-0" />
                        <span>{pkg.categoryName}</span>
                    </div>
                  </div>
                  
                  <CardHeader className="flex-grow-0 pt-6">
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
                  <CardFooter className="pt-4 mt-auto flex flex-col gap-4">
                    <div className="w-full text-center">
                        {pkg.originalPrice && (
                          <div className="inline-block bg-destructive/10 text-destructive text-sm font-semibold mb-2 px-2 py-1 rounded-md">
                              <span className="line-through">{pkg.originalPrice}</span>
                          </div>
                        )}
                        <div className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg">
                            <p className="text-xl font-bold">{pkg.price}</p>
                        </div>
                    </div>
                    <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link href="/contact">Pesan Sekarang</Link>
                    </Button>
                    <Button
                      variant="link"
                      className="text-sm text-muted-foreground font-normal h-auto p-0 hover:no-underline -mt-2"
                      onClick={() => setSelectedPackageForTerms(pkg)}
                    >
                      Syarat &amp; Ketentuan
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

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
