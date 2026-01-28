import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SERVICES } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ServicesPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Our Services</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90">
            A comprehensive suite of digital marketing solutions designed to elevate your brand and drive growth.
          </p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
               const serviceImage = PlaceHolderImages.find(img => img.id === service.image);
               return (
                <Card key={service.slug} className="group flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardHeader className="p-0">
                    {serviceImage && (
                       <div className="relative h-48 w-full">
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
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4">
                       <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <service.icon className="h-6 w-6" />
                       </div>
                      <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="mt-4 flex-grow">{service.description}</CardDescription>
                    <Button asChild variant="link" className="mt-4 px-0 text-primary self-start">
                      <Link href={`/services/${service.slug}`}>
                        Explore Service <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
