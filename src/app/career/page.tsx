import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CareerPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Join Our Team</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90">
            We are always looking for passionate talent to join Vworks Digital Hub.
          </p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Openings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-8">
                There are currently no open positions. However, we are always interested in hearing from talented individuals. Feel free to send us your resume.
              </p>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
