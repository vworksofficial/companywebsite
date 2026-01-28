
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, Target, Eye, Building, Factory, Ship, Store, Globe, Network } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SERVICES, PRICING_DATA } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const DUMMY_LOGOS = [
  { name: 'Quantum Inc', icon: Building },
  { name: 'Stellar Solutions', icon: Globe },
  { name: 'Apex Industries', icon: Factory },
  { name: 'Maritime Co', icon: Ship },
  { name: 'Digital Emporium', icon: Store },
  { name: 'Nexus Network', icon: Network },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'vworks-hero');

  return (
    <div className="flex flex-col">
      <section className="py-12 md:py-16 bg-primary text-primary-foreground bg-hero-texture">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold leading-tight">
              Partner Anda untuk Melompat Bersama
            </h1>
            <p className="mt-6 max-w-xl text-base text-primary-foreground/90">
              Kami bantu brand Anda ditemukan, dikenal, dan dipilih. VWORKS.ID menghadirkan solusi digital marketing mulai dari konten, media sosial, SEO, hingga iklan berbayar untuk mendorong pertumbuhan bisnis secara berkelanjutan.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">Dapatkan Konsultasi Gratis <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative group">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={600}
                  height={500}
                  className="rounded-lg shadow-xl relative z-10 transition-transform duration-500 ease-in-out group-hover:scale-105"
                  priority
                  data-ai-hint={heroImage.imageHint}
                />
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
      
      <section className="bg-background pt-4 pb-16">
        <div className="container">
          <h3 className="text-center text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-8">Dipercaya oleh Perusahaan Terkemuka</h3>
          <div className="w-full flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
            <ul className="flex items-center animate-marquee flex-shrink-0">
              {DUMMY_LOGOS.map((logo, index) => (
                <li key={`${logo.name}-${index}`} className="mx-8">
                  <logo.icon className="h-8 w-auto text-muted-foreground/70" title={logo.name} />
                </li>
              ))}
            </ul>
            <ul className="flex items-center animate-marquee flex-shrink-0" aria-hidden="true">
              {DUMMY_LOGOS.map((logo, index) => (
                <li key={`${logo.name}-${index}-2`} className="mx-8">
                  <logo.icon className="h-8 w-auto text-muted-foreground/70" title={logo.name} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="vision-mission" className="py-16 md:py-24 bg-card">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="https://picsum.photos/seed/vision-mission/600/700"
              alt="Team discussing vision and mission"
              width={600}
              height={700}
              className="rounded-lg shadow-xl"
              data-ai-hint="team collaboration"
            />
          </div>
          <div className="space-y-8">
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
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground text-sm">Menyediakan layanan digital marketing yang strategis, kreatif, dan berbasis data untuk meningkatkan visibilitas, leads, dan penjualan klien.</span>
                  </li>
                   <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground text-sm">Membangun kemitraan jangka panjang dengan klien melalui komunikasi yang transparan dan hasil kerja yang profesional.</span>
                  </li>
                   <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground text-sm">Menghadirkan solusi digital yang relevan dengan perkembangan teknologi dan perilaku pasar.</span>
                  </li>
                   <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground text-sm">Mengembangkan tim yang adaptif, kolaboratif, dan terus bertumbuh dalam ekosistem digital.</span>
                  </li>
                   <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground text-sm">Membantu bisnis lokal dan institusi pendidikan memanfaatkan potensi digital secara optimal.</span>
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
              VWORKS.ID adalah tim ahli digital yang bersemangat untuk membantu bisnis Anda berkembang di dunia online. Kami percaya dalam membangun kemitraan, bukan hanya daftar klien.
            </p>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span><span className="font-bold text-foreground">Profesional:</span> Menjunjung tinggi standar tertinggi di setiap proyek.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span><span className="font-bold text-foreground">Transparan:</span> Komunikasi yang jelas dan pelaporan yang jujur.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span><span className="font-bold text-foreground">Berorientasi Pertumbuhan:</span> Fokus pada strategi yang menskalakan bisnis Anda.</span>
              </li>
            </ul>
            <Button asChild size="lg" variant="outline" className="mt-8 border-primary text-primary hover:bg-primary/10 hover:text-primary">
              <Link href="/about">Lebih Lanjut Tentang Misi Kami</Link>
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
