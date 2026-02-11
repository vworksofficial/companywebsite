import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Rocket, Gem, Users, BookOpen, MessageSquare, Briefcase, ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react';

const values = [
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

const teamMembers = [
  {
    name: 'Adam Doni Mauladi',
    role: 'Chief Executive Officer',
    imageUrl: 'https://i.imgur.com/AlH1rcA.png',
    imageHint: 'male portrait professional',
  },
  {
    name: 'M. Faisal Abda',
    role: 'Account Executive',
    imageUrl: 'https://i.imgur.com/XnaNbb5.png',
    imageHint: 'male portrait professional',
  },
  {
    name: 'Dinda Afifah K.',
    role: 'Chief Financial Officer',
    imageUrl: 'https://i.imgur.com/s4IDxnn.png',
    imageHint: 'female portrait professional',
  },
  {
    name: 'M. Fadli Rozi',
    role: 'Project Leader',
    imageUrl: 'https://i.imgur.com/Pvx2kMG.png',
    imageHint: 'male portrait tech',
  },
  {
    name: 'Ahmad Mustofa Halim',
    role: 'Fullstack Developer',
    imageUrl: 'https://i.imgur.com/pBcRQwW.png',
    imageHint: 'male portrait tech',
  },
  {
    name: 'Fitria Handayani',
    role: 'Account Executive',
    imageUrl: 'https://i.imgur.com/IZ16F0I.png',
    imageHint: 'female portrait professional',
  },
  {
    name: 'Panut',
    role: 'Chief Operational Officer',
    imageUrl: 'https://i.imgur.com/EMRRQKv.png',
    imageHint: 'male portrait professional',
  },
  {
    name: 'Febrianti Kurniasari',
    role: 'Account Executive',
    imageUrl: 'https://i.imgur.com/wplwCYx.png',
    imageHint: 'female portrait professional',
  },
  {
    name: 'Ifada Nur Alifah',
    role: 'Content Planner',
    imageUrl: 'https://i.imgur.com/JTxmLYe.png',
    imageHint: 'female portrait creative',
  },
  {
    name: 'Muhammad Ilham Akbar',
    role: 'Chief Technology Officer',
    imageUrl: 'https://i.imgur.com/WeRqPqU.png',
    imageHint: 'male portrait tech',
  },
];


export default function AboutPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">VWORKS.ID</h1>
          <p className="mt-4 text-lg font-semibold uppercase tracking-wider text-primary-foreground/80">PT VWORKS KOLABORASI BERSAMA</p>
          <p className="mt-2 max-w-2xl mx-auto text-sm text-primary-foreground/90">
            Pelajari tentang perjalanan kami, nilai-nilai kami, dan misi yang mendorong kami untuk memberikan keunggulan digital.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold font-headline text-primary mb-4">Cerita Kami</h2>
            <div className="space-y-4 text-muted-foreground">
                <p>
                    Vworks lahir dari semangat bertahan dan bertumbuh. Berawal dari masa perkuliahan di Universitas Indonesia, kami memulai Vworks bukan hanya untuk menambah pemasukan, tetapi untuk membantu sahabat, kolega, dan para pelaku UMKM membuka akses pasar yang lebih luas melalui digitalisasi.
                </p>
                <p>
                    Kami percaya bahwa bisnis kecil sekalipun berhak memiliki panggung yang besar. Dengan memaksimalkan kekuatan media sosial, e-commerce, dan strategi digital yang terarah, Vworks perlahan berkembang—mendampingi UMKM hingga perusahaan besar dalam memperluas jangkauan dan meningkatkan interaksi dengan pelanggan.
                </p>
                <p>
                    Hari ini, Vworks telah bertransformasi menjadi perusahaan digital marketing yang melayani UMKM, BUMN, hingga perusahaan swasta. Kami membantu brand menjadi lebih dekat dengan pelanggannya, lebih memahami pasarnya, dan lebih bertumbuh secara berkelanjutan.
                </p>
            </div>
            <p className="text-foreground font-semibold mt-6">
                Kami tidak sekedar menawarkan layanan.
                <br />
                Kami menawarkan kolaborasi dan akses ke ekosistem jaringan yang mendorong bisnis Anda naik kelas.
            </p>
            <div className="mt-8 border-l-4 border-accent pl-4">
                <p className="font-headline font-bold text-lg text-primary">PT Vworks Kolaborasi Bersama</p>
                <p className="text-muted-foreground font-semibold italic">Your Partner to Leap Together</p>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative group">
                <Image
                  src="https://i.imgur.com/mIgN8TX.png"
                  alt="Team brainstorming session"
                  width={400}
                  height={600}
                  className="rounded-lg object-cover h-full relative z-10"
                  data-ai-hint="team meeting"
                />
              </div>
          </div>
        </div>
      </section>
      
      <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-start">
           <div className="space-y-4">
            <h2 className="text-3xl font-bold font-headline text-primary mb-2">Visi</h2>
            <p className="text-muted-foreground">
              Menjadi digital agency yang terpercaya dan berdampak dalam membantu brand, UMKM, dan institusi berkembang melalui strategi digital yang efektif, terukur, dan berkelanjutan.
            </p>
           </div>
           <div className="space-y-4">
            <h2 className="text-3xl font-bold font-headline text-primary mb-2">Misi</h2>
            <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span>Menyediakan layanan digital marketing yang strategis, kreatif, dan berbasis data untuk meningkatkan visibilitas, leads, dan penjualan klien.</span>
                </li>
                <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span>Membangun kemitraan jangka panjang dengan klien melalui komunikasi yang transparan dan hasil kerja yang profesional.</span>
                </li>
                <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span>Menghadirkan solusi digital yang relevan dengan perkembangan teknologi dan perilaku pasar.</span>
                </li>
                <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span>Mengembangkan tim yang adaptif, kolaboratif, dan terus bertumbuh dalam ekosistem digital.</span>
                </li>
                <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span>Membantu bisnis lokal dan institusi pendidikan memanfaatkan potensi digital secara optimal.</span>
                </li>
            </ul>
           </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Temui Tim Kami</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Orang-orang penuh semangat di balik kesuksesan kami.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center overflow-hidden group shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={member.imageHint}
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="font-headline text-xl">{member.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-primary font-semibold text-sm">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Our Core Values</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Prinsip-prinsip ini adalah landasan budaya perusahaan kami dan memandu setiap keputusan yang kami buat.
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

      <section className="py-16 md:py-24">
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
