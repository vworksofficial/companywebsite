'use client';

import { useState } from 'react';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogOut, PenLine, Send, UserPlus, LogIn } from 'lucide-react';

const CATEGORIES = [
  'Web Development',
  'Social Media Management',
  'Branding & Design',
  'SEO',
  'Content Marketing',
  'Ads Service',
  'Keuangan & Pajak',
];

export default function ContributorPage() {
  const auth = useAuth();
  const { firestore } = useFirestore();
  const { user, loading: authLoading } = useUser();
  const { toast } = useToast();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Article Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: 'Login Berhasil', description: 'Selamat datang kembali, Kontributor!' });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login Gagal',
        description: 'Email atau password salah.',
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
      }
      toast({ title: 'Pendaftaran Berhasil', description: 'Akun kontributor Anda telah dibuat.' });
    } catch (error: any) {
      let message = 'Terjadi kesalahan saat mendaftar.';
      if (error.code === 'auth/email-already-in-use') message = 'Email sudah terdaftar.';
      if (error.code === 'auth/weak-password') message = 'Password terlalu lemah.';
      
      toast({
        variant: 'destructive',
        title: 'Pendaftaran Gagal',
        description: message,
      });
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
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    try {
      await addDoc(collection(firestore, 'articles'), {
        slug,
        title,
        category,
        excerpt,
        content: content.replace(/\n/g, '<br>'), // Simple HTML conversion
        imageUrl: imageUrl || 'https://picsum.photos/seed/default/800/450',
        imageHint: 'article cover',
        author: user.displayName || user.email?.split('@')[0] || 'Kontributor',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        createdAt: serverTimestamp(),
        userId: user.uid,
      });

      toast({ title: 'Artikel Terkirim!', description: 'Artikel Anda telah berhasil dipublikasikan.' });
      
      // Reset Form
      setTitle('');
      setCategory('');
      setExcerpt('');
      setContent('');
      setImageUrl('');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Gagal Mengirim',
        description: 'Terjadi kesalahan saat menyimpan artikel.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-20 flex justify-center px-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline font-bold text-primary">
              {isRegisterMode ? 'Daftar Kontributor' : 'Portal Kontributor'}
            </CardTitle>
            <CardDescription>
              {isRegisterMode 
                ? 'Bergabunglah dengan tim penulis kami sekarang.' 
                : 'Silakan login untuk mulai menulis artikel.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={isRegisterMode ? handleRegister : handleLogin} className="space-y-4">
              {isRegisterMode && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama Anda"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full h-11">
                {isRegisterMode ? (
                  <><UserPlus className="mr-2 h-4 w-4" /> Daftar Sekarang</>
                ) : (
                  <><LogIn className="mr-2 h-4 w-4" /> Masuk</>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isRegisterMode ? 'Sudah punya akun?' : 'Belum punya akun?'}
                <button 
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  className="ml-2 text-primary font-bold hover:underline"
                >
                  {isRegisterMode ? 'Masuk di sini' : 'Daftar jadi kontributor'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-2">
            <PenLine className="h-8 w-8" />
            Dashboard Kontributor
          </h1>
          <p className="text-muted-foreground">Halo, {user.displayName || user.email}. Tulis sesuatu yang luar biasa hari ini.</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" /> Keluar
        </Button>
      </div>

      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Buat Artikel Baru</CardTitle>
          <CardDescription>Isi detail artikel Anda di bawah ini.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitArticle} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Artikel</Label>
                <Input
                  id="title"
                  placeholder="Contoh: Strategi Marketing 2024"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL Gambar Sampul (Opsional)</Label>
              <Input
                id="imageUrl"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Gunakan link gambar dari Unsplash atau Picsum untuk hasil terbaik.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Ringkasan Singkat (Excerpt)</Label>
              <Textarea
                id="excerpt"
                placeholder="Berikan ringkasan singkat tentang apa yang dibahas dalam artikel ini..."
                className="h-20"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Isi Konten</Label>
              <Textarea
                id="content"
                placeholder="Tulis artikel lengkap Anda di sini..."
                className="min-h-[300px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full py-6 text-lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Terbitkan Artikel
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
