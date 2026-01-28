import { SERVICES } from '@/lib/constants';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export async function generateMetadata({ params: { slug } }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === slug);

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


export default function ServicePage({ params: { slug } }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceImage = PlaceHolderImages.find((img) => img.id === service.image);

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
      
      <section className="py-16 md:py-24">
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
             {serviceImage && (
              <Card className="sticky top-24">
                <CardHeader className="p-0">
                   <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={serviceImage.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover rounded-t-lg"
                        data-ai-hint={serviceImage.imageHint}
                      />
                   </div>
                </CardHeader>
                <CardContent className="p-6">
                    <CardTitle className="font-headline text-xl mb-4">Ready to boost your {service.title}?</CardTitle>
                    <p className="text-muted-foreground text-sm mb-6">Let's discuss how we can tailor our {service.title} expertise to your unique business needs.</p>
                    <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/contact">Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </CardContent>
              </Card>
            )}
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
