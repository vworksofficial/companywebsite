import Link from 'next/link';
import { Bot, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { NAV_LINKS, SERVICES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Bot className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl font-bold text-foreground">
                Vworks
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Driving Growth Through Digital Excellence.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Quick Links</h3>
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
                    Contact
                  </Link>
                </li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Services</h3>
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
            <h3 className="font-headline font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 Digital Avenue, Webville, 12345</li>
              <li>Email: contact@vworks.com</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Vworks Digital Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
