import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { NAV_LINKS, SERVICES } from '@/lib/constants';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 md:pr-8">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="https://i.imgur.com/lC5Y4YF.png" alt="Vworks Logo" width={32} height={32} />
              <span className="font-headline text-2xl font-bold text-foreground">
                VWORKS.ID
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your Partner to Leap Together
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
               <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                    Kontak
                  </Link>
                </li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Layanan</h3>
            <ul className="space-y-2">
              {SERVICES.map(service => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-sm text-muted-foreground hover:text-primary">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Hubungi Kami</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Co-working Space HIPMI Wonosobo Jl. Sindoro No.921, Kab. Wonosobo, Jawa Tengah 56311</li>
              <li>Email: contact@vworks.com</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} VWORKS.ID. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
