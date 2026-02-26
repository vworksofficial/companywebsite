'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth, useFirestore, useUser, useCollection } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, query, where, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogOut, PenLine, Send, UserPlus, LogIn, AlertCircle, FileText, List, PlusCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  'Web Development',
  'Social Media Management',
  'Branding & Design',
  'SEO',
  'Content Marketing',
  'Ads Service',
  'Keuangan & Pajak',
];

type View = 'tulisanmu' | 'buat-artikel';

export default function ContributorPage() {
  const auth = useAuth();
  const { firestore } = useFirestore();
  const { user, loading: authLoading } = useUser();
  const { toast } = useToast();

  const [isMounted, setIsMounted] = useState(false);
  const [activeView, setActiveView] = useState<View>('buat-artikel');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Article Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Fetch user's articles
  const userArticlesQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, 'articles'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
  }, [firestore, user]);

  const { data: myArticles, loading: articlesLoading } = useCollection(userArticlesQuery);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: 'Login Berhasil', description: 'Selamat datang kembali!' });
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }
      toast({ title: 'Pendaftaran Berhasil', description: 'Akun kontributor Anda telah dibuat.' });
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    toast({ title: 'Logout Berhasil', description: 'Sampai jumpa kembali!' });
  };

  const handleSubmitArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !user) return;

    setIsSubmitting(true);
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Math.random().toString(36).substring(2, 7);
    
    try {
      await addDoc(collection(firestore, 'articles'), {
        slug,
        title,
        category,
        excerpt,
        content: content.replace(/\n/g, '<br>'),
        imageUrl: imageUrl || 'https://picsum.photos/seed/' + slug + '/800/450',
        imageHint: 'article cover',
        author: user.displayName || user.email?.split('@')[0] || 'Kontributor',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        createdAt: serverTimestamp(),
        userId: user.uid,
      });

      toast({ title: 'Artikel Terbit!', description: 'Artikel Anda telah berhasil dipublikasikan.' });
      setTitle('');
      setCategory('');
      setExcerpt('');
      setContent('');
      setImageUrl('');
      setActiveView('tulisanmu');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Gagal Mengirim', description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-2 mb-8">
          <Image src="https://imgur.com/lC5Y4YF.png" alt="Vworks Logo" width={60} height={60} />
          <span className="font-headline text-3xl font-bold text-primary tracking-tight">VWORKS.ID</span>
        </div>
        <Card className="w-full max-w-md shadow-2xl border-t-4 border-primary overflow-hidden">
          <CardHeader className="text-center pb-2 bg-white">
            <CardTitle className="text-2xl font-headline font-bold">
              {isRegisterMode ? 'Daftar Kontributor' : 'Portal Kontributor'}
            </CardTitle>
            <CardDescription>
              {isRegisterMode ? 'Bergabunglah dengan tim penulis kami.' : 'Silakan login untuk mulai mengelola konten.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {errorMessage && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">{errorMessage}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={isRegisterMode ? handleRegister : handleLogin} className="space-y-4">
              {isRegisterMode && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input id="name" placeholder="Nama Anda" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Min. 6 karakter" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : isRegisterMode ? <UserPlus className="mr-2 h-4 w-4" /> : <LogIn className="mr-2 h-4 w-4" />}
                {isRegisterMode ? 'Daftar' : 'Masuk'}
              </Button>
            </form>
            <div className="mt-6 text-center pt-4 border-t">
              <button onClick={() => { setIsRegisterMode(!isRegisterMode); setErrorMessage(null); }} className="text-sm text-primary font-bold hover:underline">
                {isRegisterMode ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar jadi kontributor'}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground flex flex-col flex-shrink-0">
        <div className="p-6 flex flex-col gap-1 border-b border-primary-foreground/10">
          <div className="flex items-center gap-2">
            <Image src="https://imgur.com/lC5Y4YF.png" alt="Vworks Logo" width={32} height={32} className="brightness-0 invert" />
            <span className="font-headline font-bold text-xl tracking-tight text-white">VWORKS.ID</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/50 font-bold px-1 mt-1">Contributor Hub</p>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <Link href="/artikel" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-foreground/10 transition-colors">
            <FileText className="h-5 w-5" />
            <span className="text-sm font-medium">Artikel Utama</span>
          </Link>
          <div className="pt-4 pb-2 px-3">
            <p className="text-[10px] uppercase font-bold text-primary-foreground/40 tracking-wider">Navigasi</p>
          </div>
          <button
            onClick={() => setActiveView('tulisanmu')}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-lg transition-colors",
              activeView === 'tulisanmu' ? "bg-white/20" : "hover:bg-primary-foreground/10"
            )}
          >
            <List className="h-5 w-5" />
            <span className="text-sm font-medium">Tulisanmu</span>
          </button>
          <button
            onClick={() => setActiveView('buat-artikel')}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-lg transition-colors",
              activeView === 'buat-artikel' ? "bg-white/20" : "hover:bg-primary-foreground/10"
            )}
          >
            <PlusCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Buat Artikel</span>
          </button>
        </nav>
        <div className="p-4 border-t border-primary-foreground/10 bg-black/5">
          <div className="mb-4 px-3">
            <p className="text-[10px] uppercase font-bold text-primary-foreground/40 mb-1">Akun Anda</p>
            <p className="text-sm font-semibold truncate text-white">{user.displayName || user.email}</p>
          </div>
          <Button variant="destructive" className="w-full justify-start gap-3 bg-red-600 hover:bg-red-700" onClick={handleLogout}>
            <LogOut className="h-5 w-5" /> <span className="text-sm font-medium">Keluar</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-8">
        {activeView === 'buat-artikel' ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-headline font-bold text-slate-900">Buat Artikel Baru</h1>
              <p className="text-slate-500">Berbagilah wawasan dan inspirasi Anda kepada pembaca VWORKS.ID.</p>
            </div>
            <Card className="shadow-lg border-t-4 border-primary">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmitArticle} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Judul Artikel</Label>
                      <Input id="title" placeholder="Contoh: Strategi Bisnis 2024" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger><SelectValue placeholder="Pilih Kategori" /></SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">URL Gambar Sampul (Opsional)</Label>
                    <Input id="image" placeholder="https://unsplash.com/..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Ringkasan (Excerpt)</Label>
                    <Textarea id="excerpt" placeholder="Berikan ringkasan singkat..." value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required className="h-20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Konten Artikel</Label>
                    <Textarea id="content" placeholder="Tulis artikel Anda di sini..." value={content} onChange={(e) => setContent(e.target.value)} required className="min-h-[400px]" />
                  </div>
                  <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                    Terbitkan Sekarang
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-headline font-bold text-slate-900">Tulisanmu</h1>
                <p className="text-slate-500">Daftar artikel yang telah Anda terbitkan.</p>
              </div>
              <Button onClick={() => setActiveView('buat-artikel')}>
                <PlusCircle className="mr-2 h-4 w-4" /> Buat Artikel Baru
              </Button>
            </div>

            {articlesLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : myArticles && myArticles.length > 0 ? (
              <div className="grid gap-6">
                {myArticles.map((art: any) => (
                  <Card key={art.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-48 h-32">
                        <Image src={art.imageUrl} alt={art.title} fill className="object-cover" />
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-primary uppercase tracking-wider">{art.category}</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-400">{art.date}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 line-clamp-1">{art.title}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2">{art.excerpt}</p>
                      </div>
                      <div className="p-4 flex items-center gap-2 border-t md:border-t-0 md:border-l">
                         <Button asChild variant="outline" size="sm">
                            <Link href={`/artikel/${art.slug}`}>Lihat</Link>
                         </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="py-20 text-center bg-white">
                <CardContent>
                  <PenLine className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Belum ada tulisan</h3>
                  <p className="text-slate-500 mb-6">Anda belum pernah menerbitkan artikel. Mulailah menulis sekarang!</p>
                  <Button onClick={() => setActiveView('buat-artikel')}>Mulai Menulis</Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
}