import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'vworks-hero');

  return (
    <div className="flex flex-col">
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-headline text-3xl md:text-4xl font-bold">
              Your Partner to Leap Together
            </h1>
            <p className="mt-6 max-w-xl text-sm text-primary-foreground/90">
              Kami Bantu Brand Anda Ditemukan, Dikenal, dan Dipilih. Vworks.id menghadirkan solusi digital marketing mulai dari konten, media sosial, SEO, hingga iklan berbayar untuk mendorong pertumbuhan bisnis secara berkelanjutan.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">Get Your Free Consultation <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
          <div className="flex justify-center">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={600}
                height={500}
                className="rounded-lg shadow-xl"
                priority
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Our Core Services</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We provide a complete suite of digital marketing solutions tailored to your business needs.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 5).map((service) => {
              const serviceImage = PlaceHolderImages.find(img => img.id === service.image);
              return (
                <Card key={service.slug} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
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
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                       <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <service.icon className="h-6 w-6" />
                       </div>
                      <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                    </div>
                    <p className="mt-4 text-muted-foreground">{service.description}</p>
                    <Button asChild variant="link" className="mt-4 px-0 text-primary">
                      <Link href={`/services/${service.slug}`}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Who We Are</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Vworks is a team of passionate digital experts committed to helping your business thrive in the online world. We believe in building partnerships, not just client lists.
            </p>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span><span className="font-bold text-foreground">Professional:</span> Upholding the highest standards in every project.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span><span className="font-bold text-foreground">Transparent:</span> Clear communication and honest reporting.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span><span className="font-bold text-foreground">Growth-Oriented:</span> Focused on strategies that scale your business.</span>
              </li>
            </ul>
            <Button asChild size="lg" variant="outline" className="mt-8 border-primary text-primary hover:bg-primary/10 hover:text-primary">
              <Link href="/about">More About Our Mission</Link>
            </Button>
          </div>
          <div>
            <Image 
              src="https://picsum.photos/seed/vworks-team/600/400"
              alt="Our Team"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="team meeting"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Ready to Grow Your Business?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90">
            Let's discuss how our digital strategies can be tailored to meet your unique goals.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 transition-transform hover:scale-105">
            <Link href="/contact">Start a Project With Us <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
