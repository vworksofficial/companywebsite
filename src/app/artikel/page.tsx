import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ArtikelPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Artikel</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90">
            Baca artikel-artikel terbaru dari kami seputar dunia digital.
          </p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Kami sedang menyiapkan artikel-artikel menarik untuk Anda. Silakan kembali lagi nanti!</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
