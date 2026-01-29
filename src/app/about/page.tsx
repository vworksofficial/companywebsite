import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Rocket, Gem, Users, BookOpen, MessageSquare, Briefcase, ShieldCheck, TrendingUp } from 'lucide-react';

const values = [
  {
    icon: Gem,
    title: 'Professionalism',
    description: 'We uphold the highest standards of quality and integrity in everything we do, ensuring our clients receive exceptional service and results.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'We believe in open and honest communication. You’ll always know what we’re doing, why we’re doing it, and how it’s performing.',
  },
  {
    icon: Rocket,
    title: 'Growth-Oriented',
    description: 'Your success is our success. We are relentlessly focused on strategies that drive sustainable growth and deliver a tangible return on investment.',
  },
];

const workCulture = [
    {
      icon: Users,
      title: 'Kolaboratif',
      description: 'Kami percaya hasil terbaik lahir dari kerja tim yang solid. Setiap ide dihargai, setiap peran saling melengkapi, dan setiap tantangan diselesaikan bersama demi mencapai tujuan yang sama.',
    },
    {
      icon: BookOpen,
      title: 'Continuous Learning',
      description: 'Kami mendorong setiap individu untuk terus belajar dan berkembang. Perubahan di dunia digital adalah peluang, dan peningkatan skill adalah bagian dari tanggung jawab profesional kami.',
    },
    {
      icon: MessageSquare,
      title: 'Clear Communication',
      description: 'Kami menjunjung komunikasi yang terbuka, jujur, dan langsung ke inti. Dengan komunikasi yang jelas, kami meminimalkan miskomunikasi dan mempercepat pengambilan keputusan.',
    },
    {
      icon: Briefcase,
      title: 'Professional & Empathetic',
      description: 'Kami bekerja secara profesional dengan tetap mengedepankan sikap saling menghargai dan memahami. Kinerja yang baik berjalan seiring dengan sikap manusiawi dalam berinteraksi.',
    },
    {
      icon: ShieldCheck,
      title: 'Integrity First',
      description: 'Kejujuran dan etika adalah fondasi utama dalam setiap keputusan dan tindakan. Kami membangun kepercayaan melalui transparansi dan tanggung jawab yang konsisten.',
    },
    {
      icon: TrendingUp,
      title: 'Growth-Oriented',
      description: 'Kami berorientasi pada pertumbuhan berkelanjutan—baik untuk klien, tim, maupun perusahaan. Tantangan adalah bagian dari proses menuju kualitas dan hasil yang lebih baik.',
    },
];


export default function AboutPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">About VWORKS.ID</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90">
            Learn about our journey, our values, and the mission that drives us to deliver digital excellence.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold font-headline text-primary mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              VWORKS.ID was founded with a simple yet powerful idea: to create a digital marketing agency that truly partners with its clients. We saw a gap between what businesses needed and what traditional agencies offered. Too often, we saw cookie-cutter solutions and a lack of transparency.
            </p>
            <p className="text-muted-foreground">
              We set out to be different. Our approach is built on a foundation of bespoke strategies, deep industry expertise, and a genuine commitment to our clients' growth. We are a collective of passionate marketers, designers, and developers united by a single purpose: to help you navigate the complexities of the digital world and achieve lasting success.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src="https://picsum.photos/seed/vworks-story/600/500"
              alt="Team brainstorming session"
              width={600}
              height={500}
              className="rounded-lg shadow-xl"
              data-ai-hint="brainstorming session"
            />
          </div>
        </div>
      </section>
      
      <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
           <div>
            <h2 className="text-3xl font-bold font-headline text-primary mb-2">Our Vision</h2>
            <p className="text-muted-foreground mb-6">
              To be the most trusted and results-driven digital growth partner for businesses of all sizes.
            </p>
           </div>
           <div>
            <h2 className="text-3xl font-bold font-headline text-primary mb-2">Our Mission</h2>
            <p className="text-muted-foreground">
              To empower our clients to achieve their full potential online through innovative, data-driven, and transparent digital marketing strategies.
            </p>
           </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Our Core Values</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              These principles are the bedrock of our company culture and guide every decision we make.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Corporate Culture VWORKS.ID</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Budaya kerja yang kami bangun adalah fondasi dari kolaborasi dan inovasi kami.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {workCulture.map((item) => (
              <Card key={item.title}>
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                        <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-headline font-bold">Ready to Work With a Team That Cares?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90">
            Let's start a conversation about your business goals and how we can help you achieve them.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
